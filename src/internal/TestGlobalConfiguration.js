import AbstractGlobalConfiguration from "./AbstractGlobalConfiguration.js";
import Terminal from "./Terminal";
import TerminalEncoding from "../TerminalEncoding.js";
import DiffGenerator from "./diff/DiffGenerator.js";

class TestGlobalConfiguration extends AbstractGlobalConfiguration
{
	constructor(terminalEncoding)
	{
		super();

		Object.defineProperty(this, "terminal",
			{
				value: new Terminal()
			});
		Object.defineProperty(this, "terminalEncoding",
			{
				value: terminalEncoding
			});
		Object.defineProperty(this, "diffGenerator",
			{
				value: new DiffGenerator(this)
			});
	}

	/**
	 * Returns the encodings supported by the terminal.
	 *
	 * @return {Array<TerminalEncoding>} the encodings supported by the terminal (defaults to the auto-detected
	 *   encoding)
	 * @see #withTerminalEncoding(TerminalEncoding)
	 * @see #withDefaultTerminalEncoding()
	 */
	listTerminalEncodings()
	{
		return [this.terminalEncoding];
	}

	/**
	 * Returns the current terminal encoding.
	 *
	 * @return {TerminalEncoding} the current terminal encoding (defaults to the auto-detected encoding)
	 */
	getTerminalEncoding()
	{
		return this.terminalEncoding;
	}

	/**
	 * Indicates that the terminal encoding should be auto-detected.
	 *
	 * @return {TestGlobalConfiguration} this
	 * @see #.withTerminalEncoding
	 */
	withDefaultTerminalEncoding()
	{
		return this;
	}

	/**
	 * Indicates the type of encoding that the terminal supports.
	 * <p>
	 * This feature can be used to force the use of colors even when their support is not detected.
	 *
	 * @param {TerminalEncoding} encoding the type of encoding that the terminal supports
	 * @return {TestGlobalConfiguration} this
	 * @throws TypeError if <code>encoding</code> is null
	 * @see #.withDefaultTerminalEncoding
	 */
	withTerminalEncoding(encoding)
	{
		if (encoding !== this.terminalEncoding)
		{
			throw new RangeError("Test only supports one encoding: " + this.terminalEncoding + ".\n" +
				"Actual: " + encoding);
		}
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {TestGlobalConfiguration as default};