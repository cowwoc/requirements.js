import type {Change} from "diff";
import {diffChars} from "diff";
import stripAnsi from "strip-ansi";
import {
	DiffResult,
	Node16Colors,
	Node16MillionColors,
	Node256Colors,
	Objects,
	Strings,
	TerminalEncoding,
	TerminalEncodings,
	TextOnly
} from "../internal.mjs";

/**
 * Character denoting the end of string.
 */
const EOS_MARKER = "\\0";
// See https://www.regular-expressions.info/unicode.html for an explanation of \p{Zs}.
// https://stackoverflow.com/a/12002085/14731: Surrounding the regex with parenthesis causes the delimited to
// be returned.
const WORDS = /(\p{Zs}+|\r?\n|[.[\](){}/\\*+\-#])/u;

/**
 * @param deltas - a list of deltas
 * @returns the number of deltas that indicate that text was not equal
 */
function numberOfUnequalDeltas(deltas: Change[]): number
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
 * @param delta - a delta
 * @param writer - the writer to write into
 */
function writeDelta(delta: Change, writer: TextOnly | Node16Colors | Node256Colors | Node16MillionColors):
	void
{
	if (delta.added)
		writer.writeInserted(delta.value);
	else if (delta.removed)
		writer.writeDeleted(delta.value);
	else
		writer.writeEqual(delta.value);
}

/**
 * For every word that is associated with 2 or more unequal deltas, replace the deltas with a single
 * <code>[DELETE actual, INSERT expected]</code> pair.
 */
class ReduceDeltasPerWord
{
	/**
	 * The deltas to process.
	 *
	 * Syntax: [optional] (mandatory)
	 *
	 * word: (start-delta) (end-delta)
	 * start-delta: [pre-word] [delimiter] (word-in-start-delta)
	 * end-delta: (word-in-end-delta) [delimiter] [post-word]
	 * delimiter: whitespace found in EQUAL deltas
	 */
	private deltas: Change[] = [];
	/**
	 * The length of <code>deltas</code>.
	 */
	private numberOfDeltas = 0;
	/**
	 * The index of the start delta.
	 */
	private indexOfStartDelta = 0;
	/**
	 * The index of the word in the start delta.
	 */
	private indexOfWordInStartDelta = 0;
	/**
	 * The index of the end delta.
	 */
	private indexOfEndDelta = 0;
	/**
	 * The index of the delimiter in the end delta. If there is no delimiter, points to the end of the string.
	 */
	private indexOfDelimiterInEndDelta = 0;
	/**
	 * the start of the next word in the end delta.
	 * If there are no followup words, points to the end of the string.
	 */
	private indexOfNextWordInEndDelta = 0;
	private actualBuilder = "";
	private expectedBuilder = "";

	/**
	 * @param deltas - the deltas to update
	 */
	accept(deltas: Change[]): void
	{
		this.deltas = deltas;
		this.numberOfDeltas = deltas.length;
		// We are looking for words that span multiple deltas. If the current delta contains multiple
		// words, we are interested in the latest one.
		this.findFirstWord();
		if (this.indexOfStartDelta === this.numberOfDeltas)
			return;
		do
		{
			this.findEndOfWord();
			this.updateDeltas();
		} while (this.findNextWord());
	}

	/**
	 * Finds the first word.
	 */
	findFirstWord(): void
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
	findEndOfWord(): void
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
	updateDeltas(): void
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
		const updatedDeltas: Change[] = [];
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
	 * @param updatedDeltas - a list to insert updated deltas into
	 */
	processStartDelta(updatedDeltas: Change[]): void
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
	processMiddleDeltas(): void
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
	 * @param updatedDeltas - a list to insert updated deltas into
	 */
	processEndDelta(updatedDeltas: Change[]): void
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

		const deleteActual: Change = {
			value: this.actualBuilder,
			added: false,
			removed: true
		};
		const insertExpected: Change = {
			value: this.expectedBuilder,
			added: true,
			removed: false
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
	 * @returns <code>false</code> if there are no more words to be found
	 */
	findNextWord(): boolean
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
				throw new Error("Expecting result to be equal to indexOfNextWordInEndDelta (" +
					this.indexOfNextWordInEndDelta + ") or later.\n" +
					"delta.value: " + delta.value);
			}
			this.indexOfWordInStartDelta = result.end;
		}
		return true;
	}
}

/**
 * Generates a diff of two strings.
 */
class DiffGenerator
{
	private readonly terminalEncoding: TerminalEncoding;
	private readonly paddingMarker: string;
	private readonly reduceDeltasPerWord: ReduceDeltasPerWord;

	/**
	 * @param terminalEncoding - the terminal encoding
	 */
	constructor(terminalEncoding: TerminalEncoding)
	{
		this.terminalEncoding = terminalEncoding;
		this.paddingMarker = TerminalEncodings.getPaddingMarker(terminalEncoding);
		this.reduceDeltasPerWord = new ReduceDeltasPerWord();
	}

	/**
	 * Generates the diff of two strings.
	 * <p>
	 * <b>NOTE</b>: Colors may be disabled when stdin or stdout are redirected.
	 * To override this behavior, use {@link GlobalRequirements.withTerminalEncoding}.
	 *
	 * @param actual - the actual value
	 * @param expected - the expected value
	 * @returns the calculated diff
	 * @throws TypeError if any of the arguments are null
	 */
	diff(actual: string, expected: string): DiffResult
	{
		Objects.assertThatTypeOf(actual, "actual", "string");
		Objects.assertThatTypeOf(expected, "expected", "string");

		// Mark the end of the string to guard against cases that end with whitespace
		const actualWithEos = actual + EOS_MARKER;
		const expectedWithEos = expected + EOS_MARKER;
		const writer = this.createDiffWriter(this.terminalEncoding);
		const deltas = diffChars(actualWithEos, expectedWithEos);
		this.reduceDeltasPerWord.accept(deltas);
		for (const delta of deltas)
			writeDelta(delta, writer);
		writer.close();
		return new DiffResult(writer.getActualLines(), writer.getDiffLines(), writer.getExpectedLines(),
			writer.getPaddingMarker());
	}

	/**
	 * @param terminalEncoding - the encoding to use for the terminal
	 * @returns a writer that generates a diff
	 */
	createDiffWriter(terminalEncoding: TerminalEncoding):
		TextOnly | Node16Colors | Node256Colors | Node16MillionColors
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
	 * @param line - a line
	 * @returns if <code>line</code> only contains padding characters
	 */
	isEmpty(line: string): boolean
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

export
{
	DiffGenerator,
	EOS_MARKER
};