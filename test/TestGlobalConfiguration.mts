import {
	TerminalEncoding,
	type GlobalConfiguration
} from "../src/index.mjs";

class TestGlobalConfiguration implements GlobalConfiguration
{
	private readonly _terminalEncoding: TerminalEncoding;

	/**
	 * Creates a new test configuration.
	 *
	 * @param terminalEncoding - the encoding of the terminal
	 */
	constructor(terminalEncoding: TerminalEncoding)
	{
		this._terminalEncoding = terminalEncoding;
	}

	supportedTerminalEncodings(): Set<TerminalEncoding>
	{
		return new Set<TerminalEncoding>([this._terminalEncoding]);
	}

	terminalEncoding(): TerminalEncoding;
	terminalEncoding(encoding: TerminalEncoding): GlobalConfiguration;
	terminalEncoding(encoding?: TerminalEncoding): TerminalEncoding | GlobalConfiguration
	{
		if (typeof (encoding) === "undefined")
			return this._terminalEncoding;
		if (encoding !== this._terminalEncoding)
		{
			throw new RangeError("Test only supports one encoding: " + this.terminalEncoding + "\n" +
				"Actual: " + encoding);
		}
		return this;
	}
}

export {TestGlobalConfiguration};