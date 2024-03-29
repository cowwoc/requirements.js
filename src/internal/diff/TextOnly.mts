import {
	AbstractDiffWriter,
	IllegalStateError,
	Maps
} from "../internal.mjs";

// WORKAROUND: https://github.com/microsoft/tsdoc/issues/362
/* eslint-disable tsdoc/syntax */
/**
 * A diff representation that does not use colors.
 * <h3>Basic Rules</h3>
 * <ul>
 * <li>Minus (<code>-</code>) denotes a character that needs to be removed from Actual.</li>
 * <li>Space ( ) denotes a character that is equal in Actual and Expected.</li>
 * <li>Plus (<code>+</code>) denotes a character that needs to be added to Actual.</li>
 * <li>"Diff" is omitted for lines that are identical.</li>
 * <li>When '<code>-</code>' is present, <code>Actual</code> is padded to line up vertically with
 * <code>Expected</code>.</li>
 * <li>When '<code>+</code>' is present, <code>Expected</code> is padded to line up vertically with
 * <code>Actual</code>.</li>
 * <li>The padding is not part of <code>Actual</code> and <code>Expected</code>'s value, respectively. Read
 * on for concrete examples.
 * <li>Lines always end with <code>\n</code> or <code>\0</code>. The former denotes a newline. The latter
 * denotes the end of the string.</li>
 * <li>Lines ending with "\n\n" or "\0\0" represents the literal string "\n" followed by a newline
 * character, or the literal string "\0" followed by the end of string, respectively.</li>
 * </ul>
 * <h3>Example 1: insert</h3>
 * <pre><code>
 * Actual   = ""
 * Expected = "text"
 * </code></pre>results in the following diff:
 * <pre><code>
 *
 * Actual  :     \0
 * Diff    : ++++
 * Expected: text\0
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
 * Actual  : text\0
 * Diff    : ----
 * Expected:     \0
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
 * Actual  :    foo\0
 * Diff    : +++
 * Expected:    foo\0
 * </code>
 * </code></pre>
 * Meaning:
 * <ul>
 * <li>To go from <code>Actual</code> to <code>Expected</code> we need to insert three spaces at the
 * beginning
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
 * Actual  : foosball    \0
 * Diff    :     ====++++
 * Expected:     ballroom\0
 * </code></pre>
 * Meaning, we need to:
 * <ul>
 * <li>Delete "foos".</li>
 * <li>Keep "ball".</li>
 * <li>Insert "room".</li>
 * <li>There is no whitespace before "ballroom" or after "foosball". This padding is used to line up
 * the strings vertically.</li>
 * </ul>
 * <h3>Example 5: Multi-line Strings</h3>
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
 * Actual@1  : first\n
 * Expected@1: first\n
 *
 * [...]
 *
 * Actual@3  : foo   \n
 * Diff      : ---+++
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
 * <h3>Example 6: Missing Line Numbers</h3>
 * When <code>Actual</code> or <code>Expected</code> contain a line that does not have a corresponding line
 * on
 * the other side we omit the latter's line number.
 * <pre><code>
 * Actual   = "Foo\nBar"
 * Expected = "Bar"
 * </code></pre>
 * results in the following diff:
 * <pre><code>
 *
 * Actual@1  : Foo\n
 * Diff      : -----
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
 */

/* eslint-enable tsdoc/syntax */
class TextOnly extends AbstractDiffWriter
{
	/**
	 * A padding character used to align values vertically.
	 */
	static readonly DIFF_PADDING = " ";
	/**
	 * Indicates a character is equal in the actual and expected values.
	 */
	static readonly DIFF_EQUAL = " ";
	/**
	 * Indicates a character to delete from the actual value.
	 */
	static readonly DIFF_DELETE = "-";
	/**
	 * Indicates a character to insert into the actual value.
	 */
	static readonly DIFF_INSERT = "+";
	private lineToDiffLine: Map<number, string> = new Map<number, string>();
	private diffLines: string[] = [];

	constructor()
	{
		super(TextOnly.DIFF_PADDING);
		this.initActualLine(0);
		this.initExpectedLine(0);
	}

	initActualLine(number: number): void
	{
		super.initActualLine(number);
		if (!this.lineToDiffLine.get(number))
			this.lineToDiffLine.set(number, "");
	}

	initExpectedLine(number: number): void
	{
		super.initExpectedLine(number);
		if (!this.lineToDiffLine.get(number))
			this.lineToDiffLine.set(number, "");
	}

	writeEqual(text: string): void
	{
		if (this.closed)
			throw new IllegalStateError("Writer must be open");
		if (text.length === 0)
			return;
		this.splitLines(text, (line: string) =>
		{
			Maps.appendToValue(this.lineToActualLine, this.actualLineNumber, line);

			const length = line.length;
			if (this.expectedLineNumber === this.actualLineNumber)
				Maps.appendToValue(this.lineToDiffLine, this.actualLineNumber, TextOnly.DIFF_EQUAL.repeat(length));
			else
			{
				const paddingMarker = this.getPaddingMarker();
				Maps.appendToValue(this.lineToExpectedLine, this.actualLineNumber, paddingMarker.repeat(length));
				Maps.appendToValue(this.lineToDiffLine, this.actualLineNumber, TextOnly.DIFF_EQUAL.repeat(length));

				Maps.appendToValue(this.lineToActualLine, this.expectedLineNumber, paddingMarker.repeat(length));
				Maps.appendToValue(this.lineToDiffLine, this.expectedLineNumber, TextOnly.DIFF_EQUAL.repeat(length));
			}
			Maps.appendToValue(this.lineToExpectedLine, this.expectedLineNumber, line);
		}, () =>
		{
			this.writeActualNewline();
			this.writeExpectedNewline();
		});
	}

	writeDeleted(text: string): void
	{
		if (this.closed)
			throw new IllegalStateError("Writer must be open");
		if (text.length === 0)
			return;
		this.splitLines(text, (line: string) =>
		{
			Maps.appendToValue(this.lineToActualLine, this.actualLineNumber, line);
			const length = line.length;
			Maps.appendToValue(this.lineToDiffLine, this.actualLineNumber, TextOnly.DIFF_DELETE.repeat(length));
			Maps.appendToValue(this.lineToExpectedLine, this.actualLineNumber,
				this.getPaddingMarker().repeat(length));
		}, this.writeActualNewline.bind(this));
	}

	writeInserted(text: string): void
	{
		if (this.closed)
			throw new IllegalStateError("Writer must be open");
		if (text.length === 0)
			return;
		this.splitLines(text, (line: string) =>
		{
			const length = line.length;
			Maps.appendToValue(this.lineToActualLine, this.expectedLineNumber,
				this.getPaddingMarker().repeat(length));
			Maps.appendToValue(this.lineToDiffLine, this.expectedLineNumber, TextOnly.DIFF_INSERT.repeat(length));
			Maps.appendToValue(this.lineToExpectedLine, this.expectedLineNumber, line);
		}, this.writeExpectedNewline.bind(this));
	}

	afterClose(): void
	{
		for (const diffLine of Maps.sortByKeys(this.lineToDiffLine).values())
			this.diffLines.push(diffLine);
		Object.freeze(this.diffLines);
	}

	getDiffLines(): string[]
	{
		if (!this.closed)
			throw new RangeError("Writer must be closed");
		return this.diffLines;
	}
}

export {TextOnly};