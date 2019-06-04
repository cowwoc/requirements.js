import Objects from "../Objects.js";
import IllegalStateError from "../IllegalStateError.js";
import {NEWLINE_MARKER, NEWLINE_PATTERN} from "./DiffConstants.js";

/**
 * Base implementation for all diff writers.
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
		Object.defineProperty(this, "paddingMarker",
			{
				value: paddingMarker
			});
		Object.defineProperty(this, "actualLineBuilder",
			{
				value: "",
				writable: true
			});
		Object.defineProperty(this, "actualLinesBuilder",
			{
				value: [],
				writable: true
			});
		Object.defineProperty(this, "expectedLineBuilder",
			{
				value: "",
				writable: true
			});
		Object.defineProperty(this, "expectedLinesBuilder",
			{
				value: [],
				writable: true
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

	/* eslint-disable */
	/**
	 * @param {number} length the number of characters to pad
	 * @return {string} the (possibly decorated) text
	 */
	decoratePadding(length)
	{
		return this.paddingMarker.repeat(length);
	}

	/**
	 * @param {string} text the text that did not change
	 * @return {string} the (possibly decorated) text
	 */
	decorateUnchangedText(text)
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

	/* eslint-enable require-returns */

	/**
	 * Adds text that did not change.
	 *
	 * @param {string} text the text
	 * @throws {IllegalStateError} if the writer is closed
	 */
	writeUnchanged(text)
	{
		if (this.closed)
			throw new IllegalStateError("Writer must be open");
		this.actualLineBuilder += this.decorateUnchangedText(text);
		this.expectedLineBuilder += this.decorateUnchangedText(text);
	}

	/**
	 * Inserts a line that is present in <code>expected</code> but not <code>actual</code>.
	 *
	 * @param {string} text the text
	 * @throws {IllegalStateError} if the writer is closed
	 */
	writeInserted(text)
	{
		if (this.closed)
			throw new IllegalStateError("Writer must be open");
		this.actualLineBuilder += this.decoratePadding(text.length);
		this.expectedLineBuilder += this.decorateInsertedText(text);
	}

	/**
	 * Deletes a line that is present in <code>actual</code> but not <code>expected</code>.
	 *
	 * @param {string} text the text
	 * @throws {IllegalStateError} if the writer is closed
	 */
	writeDeleted(text)
	{
		if (this.closed)
			throw new IllegalStateError("Writer must be open");
		this.actualLineBuilder += this.decorateDeletedText(text);
		this.expectedLineBuilder += this.decoratePadding(text.length);
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
	 * @param {string} text the text to keep in <code>Actual</code>
	 * @throws {IllegalStateError} if the writer was closed
	 */
	keep(text)
	{
		if (this.closed)
			throw new IllegalStateError("Writer must be open");
		const lines = text.split(NEWLINE_PATTERN, -1);
		for (let i = 0, size = lines.length; i < size; ++i)
		{
			let line = lines[i];
			if (i < size - 1)
				line += NEWLINE_MARKER;
			this.writeUnchanged(line);

			if (i < size - 1)
			{
				// (i == size - 1) does not necessarily indicate the end of a line
				this.writeNewline();
			}
		}
	}

	/**
	 * Ends the current line.
	 */
	writeNewline()
	{
		this.actualLinesBuilder.push(this.actualLineBuilder);
		this.actualLineBuilder = "";

		this.expectedLinesBuilder.push(this.expectedLineBuilder);
		this.expectedLineBuilder = "";
	}

	/**
	 * @param {string} text the text that needs to be inserted into <code>Actual</code>
	 * @throws {IllegalStateError} if the writer was closed
	 */
	insert(text)
	{
		if (this.closed)
			throw new IllegalStateError("Writer must be open");
		const lines = text.split(NEWLINE_PATTERN, -1);

		for (let i = 0, size = lines.length; i < size; ++i)
		{
			let line = lines[i];

			if (i < size - 1)
				line += NEWLINE_MARKER;
			if (line.length > 0)
				this.writeInserted(line);

			if (i < size - 1)
			{
				// (i == size - 1) does not necessarily indicate the end of a line
				this.writeNewline();
			}
		}
	}

	/**
	 * @param {string} text the text that needs to be deleted from <code>Actual</code>
	 * @throws {IllegalStateError} if the writer was closed
	 */
	delete(text)
	{
		if (this.closed)
			throw new IllegalStateError("Writer must be open");
		const lines = text.split(NEWLINE_PATTERN, -1);

		for (let i = 0, size = lines.length; i < size; ++i)
		{
			let line = lines[i];
			if (i < size - 1)
				line += NEWLINE_MARKER;

			if (line.length > 0)
				this.writeDeleted(line);

			if (i < size - 1)
			{
				// (i == size - 1) does not necessarily indicate the end of a line
				this.writeNewline();
			}
		}
	}

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
		this.writeNewline();

		this.actualLines = this.actualLinesBuilder;
		Object.freeze(this.actualLines);

		this.expectedLines = this.expectedLinesBuilder;
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
	 * @return {Array<string>} the lines to optionally display after "actual" and before "expected" (the lines are
	 *         empty if they should not be displayed)
	 * @throws {RangeError} if the writer is open
	 */
	getMiddleLines()
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
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {AbstractDiffWriter as default};