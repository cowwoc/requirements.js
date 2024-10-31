/*
 * Copyright (c) 2016 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import type {Change} from "diff";
import {diffChars} from "diff";
import stripAnsi from "strip-ansi";
import {
	DiffResult,
	Node16Colors,
	Node16MillionColors,
	Node256Colors,
	TerminalEncoding,
	TextOnly,
	AbstractColorWriter,
	AssertionError,
	EOS_MARKER,
	type DiffWriter,
	assert,
	internalValueToString,
	containsOnly,
	lastIndexOf,
	requireThatValueIsNotNull
} from "../../internal.mjs";

/**
 * Improve the readability of diff by avoiding many diffs per word or short diffs in a short word.
 *
 * ```stdout
 * Good:
 * -----=====-----
 * -----+++++=====
 * =====-----+++++
 *
 * Bad:
 * =====-----=====-----
 * +++++=====+++++=====
 * -----++++++----=====
 *
 * Good:
 * football
 * ----====++++
 *     ballroom
 *
 * Bad:
 * 123
 * -+=
 * 133
 * ```
 * <p>
 * Bad deltas are replaced with a single `[DELETE actual, INSERT expected]` pair.
 */
class SimplifyDeltas
{
	// A "word" is defined as one or more characters that are surrounded by word delimiters.
	//
	// \p{Zs} matches any Unicode whitespace: https://www.regular-expressions.info/unicode.html
	private static readonly WORD_DELIMITER = SimplifyDeltas.getWordDelimiter();

	private static getWordDelimiter(): RegExp
	{
		const whitespace = "\\p{Zs}+";
		const newline = "\r\n|[\r\n]";
		const specialCharacters = "[\\[\\](){}/\\\\*+\\-#:;.]";
		return new RegExp(whitespace + "|" +
			newline + "|" +
			specialCharacters, "u");
	}

	/**
	 * The deltas to process.
	 * <ul>
	 *   <li>A word may span one or more deltas.</li>
	 *   <li>The first delta it appears in is called the "start delta".</li>
	 *   <li>The last delta it appears in is called the "end delta".</li>
	 *   <li>Any deltas in between are called the "middle deltas".</li>
	 *   <li>If a word is fully contained within a single delta, its start and end deltas are the same, and
	 *   it has no middle deltas.</li>
	 * </ul>
	 */
	private deltas: Change[] = [];
	/**
	 * The index of the start delta in the list of all deltas.
	 */
	private indexOfStartDelta = 0;
	/**
	 * The index of the end delta in the list of all deltas.
	 */
	private indexOfEndDelta = 0;
	/**
	 * The index of the word in the start delta.
	 */
	private startOfWord = 0;
	/**
	 * The index right after the last character of the word in the end delta.
	 */
	private endOfWord = 0;
	/**
	 * The index of the next word in the end delta. If there are no more words, points to the end of the
	 * string.
	 */
	private startOfNextWord = 0;

	/**
	 * @param deltas - the deltas to update
	 */
	accept(deltas: Change[])
	{
		this.deltas = deltas;
		// We are looking for words that span multiple deltas. If the first delta contains multiple
		// words, we are interested in the last one.
		this.findFirstWord();
		if (this.indexOfStartDelta === this.deltas.length)
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
	findFirstWord()
	{
		// Words start after a whitespace delimiter within an EQUAL delta. If none is found, the start
		// of the first delta acts as a word boundary.
		const delta = this.deltas[0];
		this.indexOfStartDelta = 0;
		const match = lastIndexOf(delta.value, SimplifyDeltas.WORD_DELIMITER);
		if (match === null)
			this.startOfWord = 0;
		else
			this.startOfWord = match.end;
	}

	/**
	 * Finds the end of the word.
	 */
	findEndOfWord()
	{
		// Words end at a whitespace delimiter found within an EQUAL delta. If none is found, the end of the
		// last delta acts as a word boundary.
		for (let i = this.indexOfStartDelta + 1; i < this.deltas.length; ++i)
		{
			const delta = this.deltas[i];
			const isEqual = !delta.removed && !delta.added;
			if (isEqual)
			{
				const match = SimplifyDeltas.WORD_DELIMITER.exec(delta.value);
				if (match)
				{
					this.endOfWord = match.index;
					this.startOfNextWord = match.index + match[0].length;
					this.indexOfEndDelta = i;
					return;
				}
			}
		}
		this.indexOfEndDelta = this.deltas.length - 1;
	}

	/**
	 * Update the deltas if necessary.
	 */
	updateDeltas()
	{
		assert(this.deltas.length !== 0, undefined, JSON.stringify(this.deltas, null, 2));
		const deltasInWord = this.deltas.slice(this.indexOfStartDelta, this.indexOfEndDelta + 1);
		if (deltasInWord.length < 2)
			return;
		if (this.numberOfUnequalDeltas(deltasInWord) <= 2 &&
			(this.shortestDelta(deltasInWord) >= 3 || this.longestWord(deltasInWord) >= 5))
		{
			// Diff is already good
			return;
		}
		// Otherwise, replace the deltas with a single [DELETE, INSERT] pair
		const updatedDeltas: Change[] = [];
		let actualBuilder = "";
		let expectedBuilder = "";
		[actualBuilder, expectedBuilder] = this.processStartDelta(actualBuilder, expectedBuilder, updatedDeltas);
		[actualBuilder, expectedBuilder] = this.processMiddleDeltas(actualBuilder, expectedBuilder);
		this.processEndDelta(actualBuilder, expectedBuilder, updatedDeltas);

		const deltasRemoved = deltasInWord.length - updatedDeltas.length;
		// Remove deltasInWord and insert updatedDeltas in its place:
		// https://stackoverflow.com/a/17511398/14731
		this.deltas.splice(this.indexOfStartDelta, deltasInWord.length, ...updatedDeltas);
		this.indexOfEndDelta -= deltasRemoved;
		this.startOfNextWord -= this.endOfWord;
	}

	/**
	 * @param deltas - a list of deltas
	 * @returns the number of deltas whose type is not EQUAL
	 */
	numberOfUnequalDeltas(deltas: Change[]): number
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
	 * Processes the start delta.
	 *
	 * @param actualBuilder - a buffer to insert the actual value of the word into
	 * @param expectedBuilder - a buffer to insert the expected value of the word into
	 * @param updatedDeltas - a list to insert updated deltas into
	 * @returns the updated values of `actualBuilder` and `expectedBuilder`
	 */
	processStartDelta(actualBuilder: string, expectedBuilder: string, updatedDeltas: Change[]):
		[actualBuilder: string, expectedBuilder: string]
	{
		const delta = this.deltas[this.indexOfStartDelta];
		let actualWord;
		let expectedWord;
		let beforeWord;

		if (delta.added)
		{
			actualWord = "";
			expectedWord = delta.value;
			beforeWord = "";
		}
		else if (delta.removed)
		{
			const actual = delta.value;
			actualWord = actual.substring(this.startOfWord);
			expectedWord = "";
			beforeWord = actual.substring(0, this.startOfWord);
		}
		else
		{
			const actual = delta.value;
			actualWord = actual.substring(this.startOfWord);
			expectedWord = actualWord;
			beforeWord = actual.substring(0, this.startOfWord);
		}

		actualBuilder += actualWord;
		expectedBuilder += expectedWord;

		if (this.startOfWord > 0)
		{
			updatedDeltas.push(
				{
					added: delta.added,
					removed: delta.removed,
					value: beforeWord
				});
		}
		return [actualBuilder, expectedBuilder];
	}

	/**
	 * Processes the middle deltas.
	 * @param actualBuilder - a buffer to insert the actual value of the word into
	 * @param expectedBuilder - a buffer to insert the expected value of the word into
	 * @returns the updated values of `actualBuilder` and `expectedBuilder`
	 */
	processMiddleDeltas(actualBuilder: string, expectedBuilder: string)
	{
		for (let i = this.indexOfStartDelta + 1; i < this.indexOfEndDelta; ++i)
		{
			const delta = this.deltas[i];
			if (!delta.added)
			{
				// Deleted or equal
				actualBuilder += delta.value;
			}
			if (!delta.removed)
			{
				// Inserted or equal
				expectedBuilder += delta.value;
			}
		}
		return [actualBuilder, expectedBuilder];
	}

	/**
	 * Processes the end delta.
	 *
	 * @param actualBuilder - a buffer to insert the actual value of the word into
	 * @param expectedBuilder - a buffer to insert the expected value of the word into
	 * @param updatedDeltas - a list to insert updated deltas into
	 */
	processEndDelta(actualBuilder: string, expectedBuilder: string, updatedDeltas: Change[])
	{
		const delta = this.deltas[this.indexOfEndDelta];

		// Extract the first word in the delta
		let actualWord: string;
		let expectedWord: string;
		if (delta.added)
		{
			actualWord = delta.value.substring(0, this.endOfWord);
			expectedWord = "";
		}
		else if (delta.removed)
		{
			actualWord = "";
			expectedWord = delta.value.substring(0, this.endOfWord);
		}
		else
		{
			// Equal
			actualWord = expectedWord = delta.value.substring(0, this.endOfWord);
		}
		actualBuilder += actualWord;
		expectedBuilder += expectedWord;

		const deleteActual: Change = {
			value: actualBuilder,
			added: false,
			removed: true
		};
		const insertExpected: Change = {
			value: expectedBuilder,
			added: true,
			removed: false
		};
		updatedDeltas.push(deleteActual);
		updatedDeltas.push(insertExpected);

		// Add the remaining part of the delta
		if (this.endOfWord < delta.value.length)
		{
			updatedDeltas.push(
				{
					added: delta.added,
					removed: delta.removed,
					value: delta.value.substring(this.endOfWord)
				});
		}
	}

	/**
	 * Finds the next word.
	 *
	 * @returns `false` if there are no more words to be found
	 */
	findNextWord(): boolean
	{
		this.indexOfStartDelta = this.indexOfEndDelta;
		if (this.indexOfStartDelta === this.deltas.length - 1)
			return false;

		// Similar logic as findFirstWord()
		const delta = this.deltas[this.indexOfStartDelta];
		if (!delta.added && !delta.removed)
		{
			// Equal
			const result = lastIndexOf(delta.value, SimplifyDeltas.WORD_DELIMITER);
			if (result === null)
			{
				throw new Error(`Expecting result to be equal to indexOfNextWordInEndDelta (${this.startOfNextWord}) or later.
delta.value: ${delta.value}`);
			}
			this.startOfWord = result.end;
		}
		return true;
	}

	/**
	 * @param deltas - a list of deltas
	 * @returns the length of the shortest delta
	 */
	private shortestDelta(deltas: Change[]): number
	{
		assert(this.deltas.length !== 0, undefined, JSON.stringify(this.deltas, null, 2));
		let result = Number.MAX_VALUE;
		for (const delta of deltas)
			result = Math.min(result, delta.value.length);
		return result;
	}

	/**
	 * @param deltas - a list of deltas
	 * @returns the length of the longest word (source or target) spanned by the deltas
	 */
	private longestWord(deltas: Change[]): number
	{
		let lengthOfSource = 0;
		let lengthOfTarget = 0;
		for (const delta of deltas)
		{
			const length = delta.value.length;
			if (delta.added)
				lengthOfTarget += length;
			else if (delta.removed)
				lengthOfSource += length;
			else
			{
				lengthOfSource += length;
				lengthOfTarget += length;
			}
		}
		let result = Math.max(lengthOfSource, lengthOfTarget);
		// Trim text before the first delta and after the last delta
		result -= this.startOfWord;
		const lastDelta = deltas[deltas.length - 1];
		const actual = lastDelta.value;
		result -= actual.length - this.startOfNextWord;
		return Math.max(0, result);
	}
}

/**
 * Generates a diff of two Strings.
 */
class DiffGenerator
{
	private readonly encoding: TerminalEncoding;
	private readonly paddingMarker: string;
	private readonly simplifyDeltas = new SimplifyDeltas();

	/**
	 * @param encoding - the terminal encoding
	 * @throws AssertionError if `encoding` is `undefined` or `null`
	 */
	constructor(encoding: TerminalEncoding)
	{
		requireThatValueIsNotNull(encoding, "encoding");

		this.encoding = encoding;
		this.paddingMarker = this.getPaddingMarker();
	}

	/**
	 * @returns the padding character used to align values vertically
	 */
	private getPaddingMarker()
	{
		switch (this.encoding)
		{
			case TerminalEncoding.NONE:
				return TextOnly.DIFF_PADDING;
			case TerminalEncoding.NODE_16_COLORS:
			case TerminalEncoding.NODE_256_COLORS:
			case TerminalEncoding.NODE_16MILLION_COLORS:
				return AbstractColorWriter.DIFF_PADDING;
			default:
				throw new AssertionError(internalValueToString(this.encoding));
		}
	}

	/**
	 * Generates the diff of two strings.
	 * <p>
	 * <b>NOTE</b>: Colors may be disabled when stdin or stdout are redirected. To override this
	 * behavior, use {@link GlobalConfiguration.terminalEncoding}.
	 *
	 * @param actual   - the actual value
	 * @param expected - the expected value
	 * @returns the calculated diff
	 */
	diff(actual: string, expected: string)
	{
		// Mark the end of the string to guard against cases that end with whitespace
		const actualWithEos = actual + EOS_MARKER;
		const expectedWithEos = expected + EOS_MARKER;
		const writer = this.createDiffWriter();
		// diffChars() returns a list of deltas, where each delta is associated with a list of characters.
		const deltas = diffChars(actualWithEos, expectedWithEos);
		this.simplifyDeltas.accept(deltas);
		for (const delta of deltas)
			this.writeDelta(delta, writer);
		writer.flush();
		return new DiffResult(writer.getActualLines(), writer.getDiffLines(), writer.getExpectedLines(),
			writer.getEqualLines());
	}

	/**
	 * Write a single delta.
	 *
	 * @param delta  - a delta
	 * @param writer - the writer to write into
	 */
	private writeDelta(delta: Change, writer: DiffWriter)
	{
		if (delta.added)
			writer.writeInserted(delta.value);
		else if (delta.removed)
			writer.writeDeleted(delta.value);
		else
			writer.writeEqual(delta.value);
	}

	/**
	 * @returns a new writer
	 */
	private createDiffWriter()
	{
		switch (this.encoding)
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
				throw new AssertionError(internalValueToString(this.encoding));
		}
	}

	/**
	 * @param line - a line
	 * @returns true if `line` is empty once all colors and padding characters are removed
	 */
	public isEmpty(line: string)
	{
		switch (this.encoding)
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
				throw new AssertionError(internalValueToString(this.encoding));
		}
		return containsOnly(line, this.paddingMarker);
	}
}

export {DiffGenerator};