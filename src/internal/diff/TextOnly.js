/*
 * Copyright (c) 2016 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */

import AbstractDiffWriter from "./AbstractDiffWriter.js";

/**
 * A padding character used to align values vertically.
 * @ignore
 */
const PADDING_MARKER = " ";
/**
 * Indicates a character is equal in the actual and expected values.
 * @ignore
 */
const DIFF_EQUAL = "=";
/**
 * Indicates a character to delete from the actual value.
 * @ignore
 */
const DIFF_DELETE = " ";
/**
 * Indicates a character to insert into the actual value.
 * @ignore
 */
const DIFF_INSERT = "^";

/**
 * A diff representation that does not use ANSI escape codes.
 * <h3>Basic Rules</h3>
 * <ul>
 * <li>Space (&nbsp;) indicates characters that needs to be deleted from Actual.</li>
 * <li>Equal sign (<code>=</code>) indicates characters that are equal in Actual and Expected.</li>
 * <li>Up arrowhead (<code>^</code>) indicates characters that needs to be inserted into Actual.</li>
 * <li>"Diff" is omitted for lines that are identical.</li>
 * <li>Characters in the opposite direction of '&nbsp;' or '{<code>^</code>>}' are padded to line up the
 * strings vertically. This padding does not contribute any characters to the string it is found in.
 * Read on for concrete examples.</li>
 * </ul>
 * <h3>Example 1: insert</h3>
 * <pre><code>
 * Actual   = ""
 * Expected = "text"
 * </code></pre>results in the following diff:
 * <pre><code>
 *
 * Actual  :
 * Diff    : ^^^^
 * Expected: text
 * </code></pre>
 * Meaning, to go from <code>Actual</code> to <code>Expected</code> we need to insert "text".
 * <h3>Example 2: delete</h3>
 * <pre><code>
 * Actual   = "text"
 * Expected = ""
 * </code></pre>
 * results in the following diff:
 * <pre><code>
 *
 * Actual  : text
 * Diff    :
 * Expected:
 * </code></pre>
 * Meaning, to go from <code>Actual</code> to <code>Expected</code> we need to delete "text".
 * <h3>Example 3: padding</h3>
 * <pre><code>
 * Actual   = "foo"
 * Expected = "   foo"
 * </code></pre>
 * results in the following diff:
 * <pre><code>
 *
 * Actual  :    foo
 * Diff    : ^^^===
 * Expected:    foo
 * </code>
 * </code></pre>
 * Meaning:
 * <ul>
 * <li>To go from <code>Actual</code> to <code>Expected</code> we need to insert three spaces at the beginning
 * of <code>Actual</code>.</li>
 * <li>There is no whitespace in <code>Expected</code> in front of "foo". This padding is used to line up
 * the strings vertically.</li>
 * </ul>
 * <h3>Example 4: delete, keep, insert</h3>
 * <pre><code>
 * Actual   = "foosball"
 * Expected = "ballroom"
 * </code></pre>
 * results in the following diff:
 * <pre><code>
 *
 * Actual  : foosball
 * Diff    :     ====^^^^
 * Expected:     ballroom
 * </code></pre>
 * Meaning, we need to:
 * <ul>
 * <li>Delete "foos".</li>
 * <li>Keep "ball".</li>
 * <li>Insert "room".</li>
 * <li>There is no whitespace before "ballroom" or after "foosball". This padding is used to line up
 * the strings vertically.</li>
 * </ul>
 * <h3>Multi-line Strings</h3>
 * When comparing multi-line strings:
 * <ul>
 * <li>We display the diff on a per-line basis.</li>
 * <li><code>Actual</code> and <code>Expected</code> are followed by a line number.</li>
 * <li>Lines that are identical (with the exception of the first and last line) are omitted.</li>
 * </ul>
 * For example:
 * <pre><code>
 *
 * Actual   = "first\nsecond\nfoo\nforth\nfifth"
 * Expected = "first\nsecond\nbar\nforth\nfifth"
 * </code></pre>
 * results in the following diff:
 * <pre><code>
 *
 * Actual@1  : first
 * Expected@1: first
 *
 * [...]
 *
 * Actual@3  : foo   \n
 * Diff      :    ^^^==
 * Expected@3:    bar\n
 *
 * [...]
 *
 * Actual@5  : fifth\0
 * Expected@5: fifth\0
 * </code></pre>
 * Meaning:
 * <ul>
 * <li>Lines 1-2 were equal.</li>
 * <li>On line 3, we need to delete "foo" and insert "bar".</li>
 * <li>Lines 4-5 were equal.</li>
 * </ul>
 * <p>
 * Lines always end with <code>\n</code> or <code>\0</code>. The former denotes a newline. The latter denotes
 * the end of the string.
 * <p>
 * Lines ending with "\n\n" or "\0\0" represents the literal string "\n" followed by a newline
 * character, or the literal string "\0" followed by the end of string, respectively.
 * <h3>Example 5: Missing Line Numbers</h3>
 * When <code>Actual</code> or <code>Expected</code> contain a line that does not have a corresponding line on
 * the other side we omit the latter's line number.
 * <pre><code>
 * Actual   = "Foo\nBar"
 * Expected = "Bar"
 * </code></pre>
 * results in the following diff:
 * <pre><code>
 *
 * Actual@1  : Foo\n
 * Diff      :
 * Expected  :
 *
 * Actual@2  : Bar\0
 * Expected@1: Bar\0
 * </code></pre>
 * Meaning:
 * <ul>
 * <li>Actual contained more lines than Expected.</li>
 * <li>Expected did not have a line that corresponded to Actual line 1.</li>
 * <li>We need to delete line 1 and retain line 2 unchanged.</li>
 * </ul>
 * @ignore
 */
class TextOnly extends AbstractDiffWriter
{
	constructor()
	{
		super(PADDING_MARKER);
		Object.defineProperty(this, "middleLineBuilder",
			{
				writable: true,
				value: ""
			});
		Object.defineProperty(this, "middleLinesBuilder",
			{
				writable: true,
				value: []
			});
		Object.defineProperty(this, "middleLines",
			{
				writable: true,
				value: []
			});
	}

	writeUnchanged(text)
	{
		super.writeUnchanged(text);
		this.middleLineBuilder += DIFF_EQUAL.repeat(text.length);
	}

	writeInserted(text)
	{
		super.writeInserted(text);
		this.middleLineBuilder += DIFF_INSERT.repeat(text.length);
	}

	writeDeleted(text)
	{
		super.writeDeleted(text);
		this.middleLineBuilder += DIFF_DELETE.repeat(text.length);
	}

	writeNewline()
	{
		super.writeNewline();
		this.middleLinesBuilder.push(this.middleLineBuilder);
		this.middleLineBuilder = "";
	}

	afterClose()
	{
		this.middleLines = this.middleLinesBuilder;
		Object.freeze(this.middleLines);
	}

	getMiddleLines()
	{
		if (!this.closed)
			throw new RangeError("Writer must be closed");
		return this.middleLines;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {TextOnly as default};