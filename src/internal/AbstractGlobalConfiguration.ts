import type {
	GlobalConfiguration,
	TerminalEncoding
} from "./internal";

abstract class AbstractGlobalConfiguration implements GlobalConfiguration
{
	abstract getTerminalEncoding(): TerminalEncoding;

	abstract getTerminalWidth(): number;

	abstract listTerminalEncodings(): TerminalEncoding[];

	abstract withDefaultTerminalEncoding(): GlobalConfiguration;

	abstract withDefaultTerminalWidth(): GlobalConfiguration;

	abstract withTerminalEncoding(encoding: TerminalEncoding): GlobalConfiguration;

	abstract withTerminalWidth(width: number): GlobalConfiguration;

	protected assertionsEnabled: boolean;
	protected diffEnabled: boolean;

	/**
	 * Creates a new global configuration.
	 *
	 * @param {boolean} assertionsEnabled true if <code>assertThat()</code> should invoke
	 *   <code>requireThat()</code>
	 * @param {boolean} diffEnabled true if exceptions should show the difference between the actual and
	 *   expected values
	 */
	protected constructor(assertionsEnabled: boolean, diffEnabled: boolean)
	{
		this.assertionsEnabled = assertionsEnabled;
		this.diffEnabled = diffEnabled;
	}

	assertionsAreEnabled(): boolean
	{
		return this.assertionsEnabled;
	}

	withAssertionsEnabled(): this
	{
		this.assertionsEnabled = true;
		return this;
	}

	withAssertionsDisabled(): this
	{
		this.assertionsEnabled = false;
		return this;
	}

	isDiffEnabled(): boolean
	{
		return this.diffEnabled;
	}

	withDiff(): this
	{
		this.diffEnabled = true;
		return this;
	}

	withoutDiff(): this
	{
		this.diffEnabled = false;
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {AbstractGlobalConfiguration as default};