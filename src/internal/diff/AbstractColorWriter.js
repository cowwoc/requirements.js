import AbstractDiffWriter from "./AbstractDiffWriter.js";
import chalk from "chalk";
import Objects from "../Objects";
import IllegalStateError from "../IllegalStateError";
import Maps from "../Maps";

/**
 * A padding character used to align values vertically.
 *
 * @ignore
 */
const DIFF_PADDING = "/";

/**
 * Possible types of decorations.
 *
 * @property {number} ordinal the position in an enum declaration, where the initial constant is assigned an
 *   ordinal of zero
 */
class DecorationType
{
	/**
	 * @param {number} ordinal the position in an enum declaration, where the initial constant is assigned an
	 *   ordinal of zero
	 * @param {string} name the name of the enum
	 * @throws {TypeError} if <code>ordinal</code> is not a number. If <code>name</code> is not a string.
	 */
	constructor(ordinal, name)
	{
		Objects.assertThatTypeOf(ordinal, "ordinal", "number");
		Objects.assertThatTypeOf(name, "name", "string");
		Object.defineProperty(this, "ordinal",
			{
				value: ordinal
			});
		Object.defineProperty(this, "name",
			{
				value: name
			});
	}

	toString()
	{
		return "DecorationType." + this.name;
	}
}

let decorationTypeOrdinal = 0;
DecorationType.UNDECORATED = new DecorationType(decorationTypeOrdinal++, "UNDECORATED");
DecorationType.DELETE = new DecorationType(decorationTypeOrdinal++, "DELETE");
DecorationType.INSERT = new DecorationType(decorationTypeOrdinal++, "INSERT");
DecorationType.EQUAL = new DecorationType(decorationTypeOrdinal++, "EQUAL");

/**
 * An node terminal that supports colors.
 *
 * @ignore
 */
class AbstractColorWriter extends AbstractDiffWriter
{
	constructor()
	{
		super(DIFF_PADDING);
		Object.defineProperty(this, "lineToActualDecoration",
			{
				value: new Map(),
				writable: true
			});
		Object.defineProperty(this, "lineToExpectedDecoration",
			{
				value: new Map(),
				writable: true
			});
		this.initActualLine(0);
		this.initExpectedLine(0);
	}

	/**
	 * @param {string} text the padding
	 * @return {string} the (possibly decorated) text
	 */
	decoratePadding(text)
	{
		return chalk.bgBlack(super.decoratePadding(text));
	}

	initActualLine(number)
	{
		super.initActualLine(number);
		if (!this.lineToActualDecoration.get(number))
			this.lineToActualDecoration.set(number, DecorationType.UNDECORATED);
	}

	initExpectedLine(number)
	{
		super.initExpectedLine(number);
		if (!this.lineToExpectedDecoration.get(number))
			this.lineToExpectedDecoration.set(number, DecorationType.UNDECORATED);
	}

	writeEqual(text)
	{
		if (this.closed)
			throw new IllegalStateError("Writer must be open");
		if (text.length === 0)
			return;
		this.splitLines(text, line =>
		{
			const actualDecoration = this.lineToActualDecoration.get(this.actualLineNumber);
			if (actualDecoration === DecorationType.EQUAL)
				Maps.appendToValue(this.lineToActualLine, this.actualLineNumber, line);
			else
			{
				Maps.appendToValue(this.lineToActualLine, this.actualLineNumber, this.decorateEqualText(line));
				this.lineToActualDecoration.set(this.actualLineNumber, DecorationType.EQUAL);
			}

			if (this.expectedLineNumber !== this.actualLineNumber)
			{
				const length = line.length;
				const paddingMarker = this.getPaddingMarker();
				Maps.appendToValue(this.lineToExpectedLine, this.actualLineNumber,
					this.decoratePadding(this.paddingMarker.repeat(length)));
				this.lineToExpectedDecoration.set(this.actualLineNumber, DecorationType.EQUAL);

				Maps.appendToValue(this.lineToActualLine, this.expectedLineNumber,
					this.decoratePadding(paddingMarker.repeat(length)));
				this.lineToActualDecoration.set(this.expectedLineNumber, DecorationType.EQUAL);
			}

			const expectedDecoration = this.lineToExpectedDecoration.get(this.expectedLineNumber);
			if (expectedDecoration === DecorationType.EQUAL)
				Maps.appendToValue(this.lineToExpectedLine, this.expectedLineNumber, line);
			else
			{
				Maps.appendToValue(this.lineToExpectedLine, this.expectedLineNumber, this.decorateEqualText(line));
				this.lineToExpectedDecoration.set(this.expectedLineNumber, DecorationType.EQUAL);
			}
		}, () =>
		{
			this.writeActualNewline();
			this.writeExpectedNewline();
		});
	}

	writeDeleted(text)
	{
		if (this.closed)
			throw new IllegalStateError("Writer must be open");
		if (text.length === 0)
			return;
		this.splitLines(text, line =>
		{
			const actualDecoration = this.lineToActualDecoration.get(this.actualLineNumber);
			if (actualDecoration === DecorationType.DELETE)
				Maps.appendToValue(this.lineToActualLine, this.actualLineNumber, line);
			else
			{
				Maps.appendToValue(this.lineToActualLine, this.actualLineNumber, this.decorateDeletedText(line));
				this.lineToActualDecoration.set(this.actualLineNumber, DecorationType.DELETE);
			}

			const expectedDecoration = this.lineToExpectedDecoration.get(this.expectedLineNumber);
			const padding = this.getPaddingMarker().repeat(line.length);
			if (expectedDecoration === DecorationType.DELETE)
				Maps.appendToValue(this.lineToExpectedLine, this.expectedLineNumber, padding);
			else
			{
				Maps.appendToValue(this.lineToExpectedLine, this.expectedLineNumber, this.decoratePadding(padding));
				this.lineToExpectedDecoration.set(this.expectedLineNumber, DecorationType.DELETE);
			}
		}, this.writeActualNewline.bind(this));
	}

	writeInserted(text)
	{
		if (this.closed)
			throw new IllegalStateError("Writer must be open");
		if (text.length === 0)
			return;
		this.splitLines(text, line =>
		{
			const actualDecoration = this.lineToActualDecoration.get(this.actualLineNumber);
			const padding = this.getPaddingMarker().repeat(line.length);
			if (actualDecoration === DecorationType.INSERT)
				Maps.appendToValue(this.lineToActualLine, this.actualLineNumber, this.decoratePadding(padding));
			else
			{
				Maps.appendToValue(this.lineToActualLine, this.actualLineNumber, this.decoratePadding(padding));
				this.lineToActualDecoration.set(this.actualLineNumber, DecorationType.INSERT);
			}

			const expectedDecoration = this.lineToExpectedDecoration.get(this.expectedLineNumber);
			if (expectedDecoration === DecorationType.INSERT)
				Maps.appendToValue(this.lineToExpectedLine, this.expectedLineNumber, line);
			else
			{
				Maps.appendToValue(this.lineToExpectedLine, this.expectedLineNumber, this.decorateInsertedText(line));
				this.lineToExpectedDecoration.set(this.expectedLineNumber, DecorationType.INSERT);
			}
		}, this.writeExpectedNewline.bind(this));
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {AbstractColorWriter as default, DIFF_PADDING};