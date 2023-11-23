import type {TerminalEncoding} from "../src/index.mjs";
import {AbstractGlobalConfiguration} from "../src/internal/internal.mjs";

class TestGlobalConfiguration extends AbstractGlobalConfiguration
{
	private readonly terminalEncoding: TerminalEncoding;
	private readonly terminalWidth: number;

	/**
	 * Creates a new test configuration.
	 *
	 * @param terminalEncoding - the encoding of the terminal
	 * @param terminalWidth - (optional) the width of the terminal
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

export {TestGlobalConfiguration};