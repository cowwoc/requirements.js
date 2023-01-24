import
{
	AbstractDiffWriter,
	IllegalStateError,
	Maps
} from "../internal.js";
import chalk from "chalk";

/**
 * Possible types of decorations.
 */
enum DecorationType
{
	UNDECORATED,
	DELETE,
	INSERT,
	EQUAL
}

/**
 * An node terminal that supports colors.
 */
abstract class AbstractColorWriter extends AbstractDiffWriter
{
	/**
	 * A padding character used to align values vertically.
	 */
	static readonly DIFF_PADDING = "/";
	/**
	 * Maps from a line number in the actual value to the decoration at the end of the line.
	 *
	 * @private
	 */
	private lineToActualDecoration: Map<number, DecorationType> = new Map<number, DecorationType>();
	/**
	 * Maps from a line number in the expected value to the decoration at the end of the line.
	 *
	 * @private
	 */
	private lineToExpectedDecoration: Map<number, DecorationType> = new Map<number, DecorationType>();

	protected constructor()
	{
		super(AbstractColorWriter.DIFF_PADDING);
		this.initActualLine(0);
		this.initExpectedLine(0);
	}

	/**
	 * @param {number} length the length of the padding
	 * @return {string} the (possibly decorated) padding
	 */
	decoratePadding(length: number): string
	{
		return chalk.bgBlack(super.decoratePadding(length));
	}

	initActualLine(number: number): void
	{
		super.initActualLine(number);
		if (!this.lineToActualDecoration.get(number))
			this.lineToActualDecoration.set(number, DecorationType.UNDECORATED);
	}

	initExpectedLine(number: number): void
	{
		super.initExpectedLine(number);
		if (!this.lineToExpectedDecoration.get(number))
			this.lineToExpectedDecoration.set(number, DecorationType.UNDECORATED);
	}

	writeEqual(text: string): void
	{
		if (this.closed)
			throw new IllegalStateError("Writer must be open");
		if (text.length === 0)
			return;
		this.splitLines(text, (line: string) =>
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
				const padding = this.decoratePadding(length);
				Maps.appendToValue(this.lineToExpectedLine, this.actualLineNumber, padding);
				this.lineToExpectedDecoration.set(this.actualLineNumber, DecorationType.EQUAL);

				Maps.appendToValue(this.lineToActualLine, this.expectedLineNumber, padding);
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

	writeDeleted(text: string): void
	{
		if (this.closed)
			throw new IllegalStateError("Writer must be open");
		if (text.length === 0)
			return;
		this.splitLines(text, (line: string) =>
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
			if (expectedDecoration === DecorationType.DELETE)
			{
				Maps.appendToValue(this.lineToExpectedLine, this.expectedLineNumber,
					super.decoratePadding(line.length));
			}
			else
			{
				Maps.appendToValue(this.lineToExpectedLine, this.expectedLineNumber,
					this.decoratePadding(line.length));
				this.lineToExpectedDecoration.set(this.expectedLineNumber, DecorationType.DELETE);
			}
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
			const actualDecoration = this.lineToActualDecoration.get(this.actualLineNumber);
			if (actualDecoration === DecorationType.INSERT)
				Maps.appendToValue(this.lineToActualLine, this.actualLineNumber, super.decoratePadding(line.length));
			else
			{
				Maps.appendToValue(this.lineToActualLine, this.actualLineNumber, this.decoratePadding(line.length));
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
export {AbstractColorWriter as default};