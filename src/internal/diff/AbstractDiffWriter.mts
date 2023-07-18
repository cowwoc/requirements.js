import {
	IllegalStateError,
	Maps,
	NEWLINE_MARKER,
	NEWLINE_PATTERN,
	Objects
} from "../internal.mjs";

/**
 * Base implementation for all diff writers.
 */
abstract class AbstractDiffWriter
{
	protected lineToActualLine: Map<number, string> = new Map<number, string>();
	protected lineToExpectedLine: Map<number, string> = new Map<number, string>();
	protected actualLineNumber = 0;
	protected expectedLineNumber = 0;
	private readonly paddingMarker: string;
	private actualLines: string[] = [];
	private expectedLines: string[] = [];
	protected closed = false;

	/**
	 * Adds text that did not change.
	 *
	 * @param text - the text
	 * @throws IllegalStateError if the writer is closed
	 */
	abstract writeEqual(text: string): void;

	/**
	 * Deletes text that is present in <code>actual</code> but not <code>expected</code>.
	 *
	 * @param text - the text
	 * @throws IllegalStateError if the writer is closed
	 */
	abstract writeDeleted(text: string): void;

	/**
	 * Adds text that is present in <code>expected</code> but not <code>actual</code>.
	 *
	 * @param text - the text
	 * @throws IllegalStateError if the writer is closed
	 */
	abstract writeInserted(text: string): void;

	/**
	 * @param paddingMarker - a padding character used to align values vertically
	 * @throws TypeError if any of the arguments are null
	 */
	protected constructor(paddingMarker: string)
	{
		Objects.assertThatTypeOf(paddingMarker, "paddingMarker", "string");
		this.paddingMarker = paddingMarker;
	}

	/**
	 * Splits text into one or more lines, invoking <code>writeNewline()</code> in place of each newline
	 * character.
	 *
	 * @param text - some text
	 * @param lineConsumer - consumes one line at a time
	 * @param writeNewLine - ends the current line
	 */
	splitLines(text: string, lineConsumer: (line: string) => void, writeNewLine: () => void): void
	{
		const lines = text.split(NEWLINE_PATTERN);
		let line;
		for (let i = 0; i < lines.length; ++i)
		{
			const isLastLine = i === lines.length - 1;
			line = "";
			line += lines[i];
			if (!isLastLine)
				line += NEWLINE_MARKER;
			if (line.length > 0)
				lineConsumer(line);
			if (!isLastLine)
				writeNewLine();
		}
	}

	/**
	 * @param length - the length of the padding
	 * @returns the (possibly decorated) padding
	 */
	decoratePadding(length: number): string
	{
		return this.paddingMarker.repeat(length);
	}

	/**
	 * @param text - the text that did not change
	 * @returns the (possibly decorated) text
	 */
	decorateEqualText(text: string): string
	{
		return text;
	}

	/**
	 * @param text - the text that was inserted
	 * @returns the (possibly decorated) text
	 */
	decorateInsertedText(text: string): string
	{
		return text;
	}

	/**
	 * @param text - the text that was deleted
	 * @returns the (possibly decorated) text
	 */
	decorateDeletedText(text: string): string
	{
		return text;
	}

	/**
	 * Invoked before closing the writer.
	 */
	beforeClose(): void
	{
		// do nothing
	}

	/**
	 * Invoked after closing the writer.
	 */
	afterClose(): void
	{
		// do nothing
	}

	/**
	 * @returns a padding character used to align values vertically
	 */
	getPaddingMarker(): string
	{
		return this.paddingMarker;
	}

	/**
	 * Populates the state of lineTo* variables for a new actual line.
	 *
	 * @param number - the line number to initialize
	 */
	initActualLine(number: number): void
	{
		if (!this.lineToActualLine.get(number))
			this.lineToActualLine.set(number, "");
	}

	/**
	 * Populates the state of lineTo* variables for a new expected line.
	 *
	 * @param number - the line number to initialize
	 */
	initExpectedLine(number: number): void
	{
		if (!this.lineToExpectedLine.get(number))
			this.lineToExpectedLine.set(number, "");
	}

	/**
	 * Ends the current line.
	 */
	writeActualNewline(): void
	{
		++this.actualLineNumber;
		this.initActualLine(this.actualLineNumber);
		if (!this.lineToExpectedLine.get(this.actualLineNumber))
			this.initExpectedLine(this.actualLineNumber);
	}

	/**
	 * Ends the current line.
	 */
	writeExpectedNewline(): void
	{
		++this.expectedLineNumber;
		this.initExpectedLine(this.expectedLineNumber);
		if (!this.lineToActualLine.get(this.expectedLineNumber))
			this.initActualLine(this.expectedLineNumber);
	}

	/**
	 * Releases any resources associated with this object.
	 */
	close(): void
	{
		if (this.closed)
			return;
		this.closed = true;
		this.beforeClose();

		for (const actualLine of Maps.sortByKeys(this.lineToActualLine).values())
			this.actualLines.push(actualLine);
		Object.freeze(this.actualLines);

		for (const expectedLine of Maps.sortByKeys(this.lineToExpectedLine).values())
			this.expectedLines.push(expectedLine);
		Object.freeze(this.expectedLines);
		this.afterClose();
	}

	/**
	 * @returns the lines of the actual value
	 * @throws IllegalStateError if the writer was closed
	 */
	getActualLines(): string[]
	{
		if (!this.closed)
			throw new IllegalStateError("Writer must be closed");
		return this.actualLines;
	}

	/**
	 * @returns the lines to display after "actual" and before "expected" (empty lines should not be displayed)
	 * @throws RangeError if the writer is open
	 */
	getDiffLines(): string[]
	{
		if (!this.closed)
			throw new RangeError("Writer must be closed");
		return [];
	}

	/**
	 * @returns the lines of the expected value
	 * @throws IllegalStateError if the writer was closed
	 */
	getExpectedLines(): string[]
	{
		if (!this.closed)
			throw new IllegalStateError("Writer must be closed");
		return this.expectedLines;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {AbstractDiffWriter as default};