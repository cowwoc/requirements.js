import Objects from "../Objects.js";
import TerminalEncoding from "../../TerminalEncoding.js";
import AbstractDiffWriter from "./AbstractDiffWriter.js";
import {default as TextOnly, DIFF_PADDING as TextOnlyDiffPadding} from "./TextOnly.js";
import {DIFF_PADDING as ColorDiffPadding} from "./AbstractColorWriter.js";
import Node16Colors from "./Node16Colors.js";
import Node256Colors from "./Node256Colors.js";
import Node16MillionColors from "./Node16MillionColors.js";
import DiffResult from "./DiffResult.js";
import Strings from "../Strings.js";
import stripAnsi from "strip-ansi";
import * as Diff from "diff";

/**
 * Character denoting the end of string.
 *
 * @ignore
 */
const EOS_MARKER = "\\0";
// See https://www.regular-expressions.info/unicode.html for an explanation of \p{Zs}.
// https://stackoverflow.com/a/12002085/14731: Surrounding the regex with parenthesis causes the delimited to
// be returned.
const WORDS = /(\p{Zs}+|\r?\n|[.[\](){}/\\*+\-#])/u;

/**
 * @param {TerminalEncoding} terminalEncoding the encoding to use for the terminal
 * @return {AbstractDiffWriter} a writer that generates a diff
 * @ignore
 */
function createDiffWriter(terminalEncoding)
{
	switch (terminalEncoding)
	{
		case TerminalEncoding.NONE:
			return new TextOnly();
		case TerminalEncoding.NODE_16_COLORS:
			return new Node16Colors();
		case TerminalEncoding.NODE_256_COLORS:
			return new Node256Colors();
		case TerminalEncoding.NODE_16MILLION_COLORS:
			return new Node16MillionColors();
		default:
			throw new RangeError(Objects.toString(terminalEncoding));
	}
}

/**
 * @param {Array<{value: string, added: boolean, removed: boolean}>} deltas a list of deltas
 * @return {number} the number of deltas that indicate that text was not equal
 * @ignore
 */
function numberOfUnequalDeltas(deltas)
{
	let result = 0;
	for (const delta of deltas)
	{
		if (delta.removed || delta.added)
			++result;
	}
	return result;
}

/**
 * Write a single word.
 *
 * @param {{value: string, added: boolean, removed: boolean}} delta a delta
 * @param {AbstractDiffWriter} writer the writer to write into
 */
function writeDelta(delta, writer)
{
	if (delta.added)
		writer.writeInserted(delta.value);
	else if (delta.removed)
		writer.writeDeleted(delta.value);
	else
		writer.writeEqual(delta.value);
}

/**
 * @param {TerminalEncoding} terminalEncoding the encoding to use for the terminal
 * @return {string} the padding character used to align values vertically
 * @ignore
 */
function getPaddingMarker(terminalEncoding)
{
	switch (terminalEncoding)
	{
		case TerminalEncoding.NONE:
			return TextOnlyDiffPadding;
		case TerminalEncoding.NODE_16_COLORS:
		case TerminalEncoding.NODE_256_COLORS:
		case TerminalEncoding.NODE_16MILLION_COLORS:
			return ColorDiffPadding;
		default:
			throw new RangeError(Objects.toString(terminalEncoding));
	}
}

/**
 * For every word associated with 2 or more unequal deltas, replace the deltas with a single
 * <code>[DELETE actual, INSERT expected]</code> pair.
 *
 * @property {number} indexOfStartDelta the index of the start delta
 * @property {number} indexOfWordInStartDelta the index of the word in the start delta
 * @property {number} indexOfEndDelta the index of the end delta
 * @property {number} indexOfDelimiterInEndDelta the index of the delimiter in the end delta. If there is no
 * delimiter, points to the end of the string.
 * @property {number} indexOfNextWordInEndDelta The index of the start of the next word in the end delta. If
 * there are no followup words, points to the end of the string.
 */
class ReduceDeltasPerWord
{
	// Format: [optional] (mandatory)
	//
	// word: (start-delta) (end-delta)
	// start-delta: [pre-word] [delimiter] (word-in-start-delta)
	// end-delta: (word-in-end-delta) [delimiter] [post-word]
	// delimiter: whitespace found in EQUAL deltas
	constructor()
	{
		Object.defineProperty(this, "deltas",
			{
				writable: true
			});
		Object.defineProperty(this, "numberOfDeltas",
			{
				writable: true
			});
		Object.defineProperty(this, "indexOfStartDelta",
			{
				writable: true
			});
		Object.defineProperty(this, "indexOfWordInStartDelta",
			{
				writable: true
			});
		Object.defineProperty(this, "indexOfEndDelta",
			{
				writable: true
			});
		Object.defineProperty(this, "indexOfDelimiterInEndDelta",
			{
				writable: true
			});
		Object.defineProperty(this, "indexOfNextWordInEndDelta",
			{
				writable: true
			});
		Object.defineProperty(this, "actualBuilder",
			{
				value: "",
				writable: true
			});
		Object.defineProperty(this, "expectedBuilder",
			{
				value: "",
				writable: true
			});
	}

	/**
	 * @param {Array<{value: string, added: boolean, removed: boolean}>} deltas the deltas to update
	 */
	accept(deltas)
	{
		this.deltas = deltas;
		this.numberOfDeltas = deltas.length;
		// We are looking for words that span multiple deltas. If the current delta contains multiple
		// words, we are interested in the latest one.
		this.findFirstWord();
		if (this.indexOfStartDelta === this.numberOfDeltas)
			return;
		while (true)
		{
			this.findEndOfWord();
			this.updateDeltas();
			if (!this.findNextWord())
				return;
		}
	}

	/**
	 * Finds the first word.
	 */
	findFirstWord()
	{
		// Words start after a whitespace delimiter within an EQUAL delta. If none is found, the start
		// of the first delta acts as a word boundary.
		const delta = this.deltas[0];
		this.indexOfStartDelta = 0;
		const result = Strings.lastIndexOf(delta.value, WORDS);
		if (result === null)
			this.indexOfWordInStartDelta = 0;
		else
			this.indexOfWordInStartDelta = result.end;
	}

	/**
	 * Finds the end of the word.
	 */
	findEndOfWord()
	{
		// Words end at a whitespace delimiter found within an EQUAL delta. If none is found, the end of the
		// last delta acts as a word boundary.
		for (let i = this.indexOfStartDelta + 1; i < this.numberOfDeltas; ++i)
		{
			const delta = this.deltas[i];
			if (!delta.removed && !delta.added)
			{
				const match = WORDS.exec(delta.value);
				if (match)
				{
					this.indexOfDelimiterInEndDelta = match.index;
					this.indexOfNextWordInEndDelta = match.index + match[0].length;
					this.indexOfEndDelta = i;
					return;
				}
			}
		}
		this.indexOfEndDelta = this.numberOfDeltas - 1;
	}

	/**
	 * Update the deltas if necessary.
	 */
	updateDeltas()
	{
		const deltasInWord = this.deltas.slice(this.indexOfStartDelta, this.indexOfEndDelta + 1);
		if (numberOfUnequalDeltas(deltasInWord) <= 2)
		{
			// If the word contains 2 or less unequal deltas then provide character-level granularity.
			//
			// Good:
			// -----=====-----
			// -----+++++=====
			// =====-----+++++
			//
			// Bad:
			// =====-----=====-----
			// +++++=====+++++=====
			// -----++++++----=====
			return;
		}
		// Otherwise, replace the deltas with a single [DELETE, INSERT] pair
		const updatedDeltas = [];
		this.actualBuilder = "";
		this.expectedBuilder = "";
		this.processStartDelta(updatedDeltas);
		this.processMiddleDeltas();
		this.processEndDelta(updatedDeltas);

		const deltasRemoved = deltasInWord.length - updatedDeltas.length;
		// https://stackoverflow.com/a/17511398/14731
		this.deltas.splice(this.indexOfStartDelta, deltasInWord.length, ...updatedDeltas);
		this.numberOfDeltas -= deltasRemoved;
		this.indexOfEndDelta -= deltasRemoved;
		this.indexOfNextWordInEndDelta -= this.indexOfDelimiterInEndDelta;
	}

	/**
	 * Processes the start delta.
	 *
	 * @param {Array<{value: string, added: boolean, removed: boolean}>} updatedDeltas a list to insert updated
	 *   deltas into
	 */
	processStartDelta(updatedDeltas)
	{
		const delta = this.deltas[this.indexOfStartDelta];
		let actualWord;
		let expectedWord;
		let beforeWord;

		if (!delta.added && !delta.removed)
		{
			// Equal
			const actual = delta.value;
			actualWord = actual.substring(this.indexOfWordInStartDelta);
			expectedWord = actualWord;
			beforeWord = actual.substring(0, this.indexOfWordInStartDelta);
		}
		else if (delta.added)
		{
			// Insert
			actualWord = "";
			expectedWord = delta.value;
			beforeWord = "";
		}
		else
		{
			// Delete
			const actual = delta.value;
			actualWord = actual.substring(this.indexOfWordInStartDelta);
			expectedWord = "";
			beforeWord = actual.substring(0, this.indexOfWordInStartDelta);
		}
		this.actualBuilder += actualWord;
		this.expectedBuilder += expectedWord;

		if (this.indexOfWordInStartDelta > 0)
		{
			updatedDeltas.push(
				{
					added: delta.added,
					removed: delta.removed,
					value: beforeWord
				});
		}
	}

	/**
	 * Processes the middle deltas.
	 */
	processMiddleDeltas()
	{
		for (let i = this.indexOfStartDelta + 1; i < this.indexOfEndDelta; ++i)
		{
			const delta = this.deltas[i];
			if (!delta.added)
			{
				// Deleted or equal
				this.actualBuilder += delta.value;
			}
			if (!delta.removed)
			{
				// Inserted or equal
				this.expectedBuilder += delta.value;
			}
		}
	}

	/**
	 * Processes the end delta.
	 *
	 * @param {Array<{value: string, added: boolean|undefined, removed: boolean|undefined}>} updatedDeltas a
	 * list to insert updated deltas into
	 */
	processEndDelta(updatedDeltas)
	{
		const delta = this.deltas[this.indexOfEndDelta];
		const actual = delta.value;
		const actualWord = actual.substring(0, this.indexOfDelimiterInEndDelta);

		// Word before delimiter
		this.actualBuilder += actualWord;
		if (!delta.removed)
		{
			// Insert or equal
			this.expectedBuilder += delta.value.substring(0, this.indexOfDelimiterInEndDelta);
		}

		const deleteActual = {
			removed: true,
			value: this.actualBuilder
		};
		const insertExpected = {
			added: true,
			value: this.expectedBuilder
		};
		updatedDeltas.push(deleteActual);
		updatedDeltas.push(insertExpected);

		// Word after delimiter
		if (this.indexOfDelimiterInEndDelta < actual.length)
		{
			updatedDeltas.push(
				{
					added: delta.added,
					removed: delta.removed,
					value: delta.value.substring(this.indexOfDelimiterInEndDelta)
				});
		}
	}

	/**
	 * Finds the next word.
	 *
	 * @return {boolean} <code>false</code> if there are no more words to be found
	 */
	findNextWord()
	{
		this.indexOfStartDelta = this.indexOfEndDelta;
		if (this.indexOfStartDelta === this.numberOfDeltas - 1)
			return false;

		// Similar logic as findFirstWord()
		const delta = this.deltas[this.indexOfStartDelta];
		if (!delta.added && !delta.removed)
		{
			// Equal
			const result = Strings.lastIndexOf(delta.value, WORDS);
			if (result === null)
			{
				throw new Error("Expecting result to be equal to " +
					"indexOfNextWordInEndDelta (" + this.indexOfNextWordInEndDelta + ") or later.\n" +
					"delta.value: '" + delta.value + "'");
			}
			this.indexOfWordInStartDelta = result.end;
		}
		return true;
	}
}

/**
 * Generates a diff of two strings.
 *
 * @ignore
 */
class DiffGenerator
{
	/**
	 * @param {TerminalEncoding} terminalEncoding the terminal encoding
	 */
	constructor(terminalEncoding)
	{
		Objects.assertThatInstanceOf(terminalEncoding, "terminalEncoding", TerminalEncoding);
		Object.defineProperty(this, "terminalEncoding",
			{
				value: terminalEncoding
			});
		Object.defineProperty(this, "paddingMarker",
			{
				value: getPaddingMarker(terminalEncoding)
			});
		Object.defineProperty(this, "reduceDeltasPerWord",
			{
				value: new ReduceDeltasPerWord()
			});
	}

	/**
	 * Generates the diff of two strings.
	 * <p>
	 * <b>NOTE</b>: Colors may be disabled when stdin or stdout are redirected. To override this
	 * behavior, use {@link GlobalRequirements#withConsoleType(ConsoleType)}.
	 *
	 * @param {string} actual   the actual value
	 * @param {string} expected the expected value
	 * @return {DiffResult} the calculated diff
	 * @throws {TypeError} if any of the arguments are null
	 */
	diff(actual, expected)
	{
		Objects.assertThatTypeOf(actual, "actual", "string");
		Objects.assertThatTypeOf(expected, "expected", "string");

		// Mark the end of the string to guard against cases that end with whitespace
		const actualWithEos = actual + EOS_MARKER;
		const expectedWithEos = expected + EOS_MARKER;
		const writer = createDiffWriter(this.terminalEncoding);
		const deltas = Diff.diffChars(actualWithEos, expectedWithEos);
		this.reduceDeltasPerWord.accept(deltas);
		for (const delta of deltas)
			writeDelta(delta, writer);
		writer.close();
		return new DiffResult(writer.getActualLines(), writer.getDiffLines(), writer.getExpectedLines(),
			writer.getPaddingMarker());
	}

	/**
	 * @param {string} line a line
	 * @return {boolean} if <code>line</code> only contains padding characters
	 */
	isEmpty(line)
	{
		switch (this.terminalEncoding)
		{
			case TerminalEncoding.NONE:
				break;
			case TerminalEncoding.NODE_16_COLORS:
			case TerminalEncoding.NODE_256_COLORS:
			case TerminalEncoding.NODE_16MILLION_COLORS:
			{
				line = stripAnsi(line);
				break;
			}
			default:
				throw new RangeError(Objects.toString(this.terminalEncoding));
		}
		return Strings.containsOnly(line, this.paddingMarker);
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {DiffGenerator as default, EOS_MARKER};