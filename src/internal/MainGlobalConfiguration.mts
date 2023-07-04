import
{
	AbstractGlobalConfiguration,
	Terminal,
	TerminalEncoding
} from "./internal.mjs";

const terminal = new Terminal();

class MainGlobalConfiguration extends AbstractGlobalConfiguration
{
	private readonly terminalEncoding: TerminalEncoding;
	static readonly INSTANCE: MainGlobalConfiguration = new MainGlobalConfiguration(false, true,
		terminal.getEncoding());

	/**
	 * Creates a new global configuration.
	 *
	 * @param {boolean} assertionsEnabled true if <code>assertThat()</code> should invoke
	 *   <code>requireThat()</code>
	 * @param {boolean} diffEnabled true if exceptions should show the difference between the actual and
	 *   expected values
	 * @param {TerminalEncoding} terminalEncoding the encoding of the terminal
	 * @private
	 */
	private constructor(assertionsEnabled: boolean, diffEnabled: boolean, terminalEncoding: TerminalEncoding)
	{
		super(assertionsEnabled, diffEnabled);
		this.terminalEncoding = terminalEncoding;
	}

	listTerminalEncodings(): TerminalEncoding[]
	{
		return terminal.listSupportedTypes();
	}

	getTerminalEncoding(): TerminalEncoding
	{
		return terminal.getEncoding();
	}

	withDefaultTerminalEncoding(): this
	{
		terminal.useBestEncoding();
		return this;
	}

	withTerminalEncoding(encoding: TerminalEncoding): this
	{
		terminal.setEncoding(encoding);
		return this;
	}

	getTerminalWidth(): number
	{
		return terminal.getWidth();
	}

	withDefaultTerminalWidth(): this
	{
		terminal.useBestWidth();
		return this;
	}

	withTerminalWidth(width: number): this
	{
		terminal.setWidth(width);
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {MainGlobalConfiguration as default};