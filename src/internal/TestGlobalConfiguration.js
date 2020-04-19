import AbstractGlobalConfiguration from "./AbstractGlobalConfiguration.js";

class TestGlobalConfiguration extends AbstractGlobalConfiguration
{
	constructor(terminalEncoding, terminalWidth)
	{
		super();

		Object.defineProperty(this, "terminalEncoding",
			{
				value: terminalEncoding
			});
		Object.defineProperty(this, "terminalWidth",
			{
				value: terminalWidth || 80
			});
	}

	listTerminalEncodings()
	{
		return [this.terminalEncoding];
	}

	getTerminalEncoding()
	{
		return this.terminalEncoding;
	}

	withDefaultTerminalEncoding()
	{
		return this;
	}

	withTerminalEncoding(encoding)
	{
		if (encoding !== this.terminalEncoding)
		{
			throw new RangeError("Test only supports one encoding: " + this.terminalEncoding + ".\n" +
				"Actual: " + encoding);
		}
		return this;
	}

	getTerminalWidth()
	{
		return this.terminalWidth;
	}

	withDefaultTerminalWidth()
	{
		return this;
	}

	withTerminalWidth(width)
	{
		if (width !== this.terminalWidth)
		{
			throw new RangeError("Test only supports one width: " + this.terminalWidth + ".\n" +
				"Actual: " + width);
		}
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {TestGlobalConfiguration as default};