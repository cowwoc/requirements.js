import {
	AbstractGlobalConfiguration,
	TerminalEncoding
} from "./internal";

class TestGlobalConfiguration extends AbstractGlobalConfiguration
{
	private readonly terminalEncoding: TerminalEncoding;
	private readonly terminalWidth: number;

	/**
	 * Creates a new test configuration.
	 *
	 * @param {TerminalEncoding} terminalEncoding the encoding of the terminal
	 * @param {number} [terminalWidth] the width of the terminal
	 */
	constructor(terminalEncoding: TerminalEncoding, terminalWidth = 80)
	{
		super(false, true);
		this.terminalEncoding = terminalEncoding;
		this.terminalWidth = terminalWidth;
	}

	listTerminalEncodings(): TerminalEncoding[]
	{
		return [this.terminalEncoding];
	}

	getTerminalEncoding(): TerminalEncoding
	{
		return this.terminalEncoding;
	}

	withDefaultTerminalEncoding(): this
	{
		return this;
	}

	withTerminalEncoding(encoding: TerminalEncoding): this
	{
		if (encoding !== this.terminalEncoding)
		{
			throw new RangeError("Test only supports one encoding: " + this.terminalEncoding + "\n" +
				"Actual: " + encoding);
		}
		return this;
	}

	getTerminalWidth(): number
	{
		return this.terminalWidth;
	}

	withDefaultTerminalWidth(): this
	{
		return this;
	}

	withTerminalWidth(width: number): this
	{
		if (width !== this.terminalWidth)
		{
			throw new RangeError("Test only supports one width: " + this.terminalWidth + "\n" +
				"Actual: " + width);
		}
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {TestGlobalConfiguration as default};