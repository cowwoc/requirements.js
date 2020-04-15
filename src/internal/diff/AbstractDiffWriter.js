import Objects from "../Objects.js";
import IllegalStateError from "../IllegalStateError.js";
import {NEWLINE_MARKER, NEWLINE_PATTERN} from "./DiffConstants";

/**
 * Base implementation for all diff writers.
 *
 * @ignore
 */
class AbstractDiffWriter
{
	/**
	 * @param {string} paddingMarker a padding character used to align values vertically
	 * @throws {TypeError}  if any of the arguments are null
	 */
	constructor(paddingMarker)
	{
		Objects.assertThatTypeOf(paddingMarker, "paddingMarker", "string");
		Object.defineProperty(this, "lineToActualLine",
			{
				value: new Map(),
				writable: true
			});
		Object.defineProperty(this, "lineToExpectedLine",
			{
				value: new Map(),
				writable: true
			});
		Object.defineProperty(this, "actualLineNumber",
			{
				value: 0,
				writable: true
			});
		Object.defineProperty(this, "expectedLineNumber",
			{
				value: 0,
				writable: true
			});
		Object.defineProperty(this, "paddingMarker",
			{
				value: paddingMarker
			});
		Object.defineProperty(this, "actualLines",
			{
				value: [],
				writable: true
			});
		Object.defineProperty(this, "expectedLines", {
			value: [],
			writable: true
		});
		Object.defineProperty(this, "closed",
			{
				value: false,
				writable: true
			});
	}

	/**
	 * Splits text into one or more lines, invoking {@link #writeNewline()} in place of each newline character.
	 *
	 * @param {string} text           some text
	 * @param {Function} lineConsumer consumes one line at a time
	 * @param {Function} writeNewLine ends the current line
	 */
	splitLines(text, lineConsumer, writeNewLine)
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
	 * @param {string} text the padding
	 * @return {string} the (possibly decorated) text
	 */
	decoratePadding(text)
	{
		return this.paddingMarker.repeat(text);
	}

	/**
	 * @param {string} text the text that did not change
	 * @return {string} the (possibly decorated) text
	 */
	decorateEqualText(text)
	{
		return text;
	}

	/**
	 * @param {string} text the text that was inserted
	 * @return {string} the (possibly decorated) text
	 */
	decorateInsertedText(text)
	{
		return text;
	}

	/**
	 * @param {string} text the text that was deleted
	 * @return {string} the (possibly decorated) text
	 */
	decorateDeletedText(text)
	{
		return text;
	}

	/**
	 * Invoked before closing the writer.
	 */
	beforeClose()
	{
	}

	/**
	 * Invoked after closing the writer.
	 */
	afterClose()
	{
	}

	/**
	 * @return {string} a padding character used to align values vertically
	 */
	getPaddingMarker()
	{
		return this.paddingMarker;
	}

	/**
	 * Populates the state of lineTo* variables for a new actual line.
	 *
	 * @param {number} number the line number to initialize
	 */
	initActualLine(number)
	{
		if (!this.lineToActualLine.get(number))
			this.lineToActualLine.set(number, "");
	}

	/**
	 * Populates the state of lineTo* variables for a new expected line.
	 *
	 * @param {number} number the line number to initialize
	 */
	initExpectedLine(number)
	{
		if (!this.lineToExpectedLine.get(number))
			this.lineToExpectedLine.set(number, "");
	}

	/**
	 * Ends the current line.
	 */
	writeActualNewline()
	{
		++this.actualLineNumber;
		this.initActualLine(this.actualLineNumber);
		if (!this.lineToExpectedLine.get(this.actualLineNumber))
			this.initExpectedLine(this.actualLineNumber);
	}

	/**
	 * Ends the current line.
	 */
	writeExpectedNewline()
	{
		++this.expectedLineNumber;
		this.initExpectedLine(this.expectedLineNumber);
		if (!this.lineToActualLine.get(this.expectedLineNumber))
			this.initActualLine(this.expectedLineNumber);
	}

	/* eslint-disable no-unused-vars */
	/**
	 * Adds text that did not change.
	 *
	 * @param {string} text the text
	 * @throws {IllegalStateError} if the writer is closed
	 */
	writeEqual(text)
	{
		throw new Error("Method must be overridden by subclass");
	}

	/**
	 * Deletes text that is present in <code>actual</code> but not <code>expected</code>.
	 *
	 * @param {string} text the text
	 * @throws {IllegalStateError} if the writer is closed
	 */
	writeDeleted(text)
	{
		throw new Error("Method must be overridden by subclass");
	}

	/**
	 * Adds text that is present in <code>expected</code> but not <code>actual</code>.
	 *
	 * @param {string} text the text
	 * @throws {IllegalStateError} if the writer is closed
	 */
	writeInserted(text)
	{
		throw new Error("Method must be overridden by subclass");
	}

	/* eslint-enable no-unused-vars */

	/**
	 * Releases any resources associated with this object.
	 *
	 * @return {undefined}
	 */
	close()
	{
		if (this.closed)
			return;
		this.closed = true;
		this.beforeClose();

		let lineNumbers = Array.from(this.lineToActualLine.keys());
		lineNumbers.sort();
		for (const lineNumber of lineNumbers)
			this.actualLines.push(this.lineToActualLine.get(lineNumber));
		Object.freeze(this.actualLines);

		lineNumbers = Array.from(this.lineToExpectedLine.keys());
		lineNumbers.sort();
		for (const lineNumber of lineNumbers)
			this.expectedLines.push(this.lineToExpectedLine.get(lineNumber));
		Object.freeze(this.expectedLines);
		this.afterClose();
	}

	/**
	 * @return {Array<string>} the lines of the actual value
	 * @throws {IllegalStateError} if the writer was closed
	 */
	getActualLines()
	{
		if (!this.closed)
			throw new IllegalStateError("Writer must be closed");
		return this.actualLines;
	}

	/**
	 * @return {Array<string>} the lines to display after "actual" and before "expected" (empty lines should not
	 *   be displayed)
	 * @throws {RangeError} if the writer is open
	 */
	getDiffLines()
	{
		if (!this.closed)
			throw new RangeError("Writer must be closed");
		return [];
	}

	/**
	 * @return {Array<string>} the lines of the expected value
	 * @throws {IllegalStateError} if the writer was closed
	 */
	getExpectedLines()
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