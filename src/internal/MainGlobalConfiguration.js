import AbstractGlobalConfiguration from "./AbstractGlobalConfiguration.js";
import Terminal from "./Terminal";

const terminal = new Terminal();

class MainGlobalConfiguration extends AbstractGlobalConfiguration
{
	constructor()
	{
		super();

		Object.defineProperty(this, "terminalEncoding",
			{
				value: terminal.getEncoding()
			});
	}

	listTerminalEncodings()
	{
		return terminal.listSupportedTypes();
	}

	getTerminalEncoding()
	{
		return terminal.getEncoding();
	}

	withDefaultTerminalEncoding()
	{
		terminal.useBestEncoding();
		return this;
	}

	withTerminalEncoding(encoding)
	{
		terminal.setEncoding(encoding);
		return this;
	}

	getTerminalWidth()
	{
		return terminal.getWidth();
	}

	withDefaultTerminalWidth()
	{
		terminal.useBestWidth();
		return this;
	}

	withTerminalWidth(width)
	{
		terminal.setWidth(width);
		return this;
	}
}

MainGlobalConfiguration.INSTANCE = new MainGlobalConfiguration();

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {MainGlobalConfiguration as default};