import chalk from "chalk";
import TerminalEncoding from "../TerminalEncoding.js";
import Objects from "./Objects.js";

/**
 * @return {Array<TerminalEncoding>} the encodings supported by the terminal
 * @ignore
 */
function listSupportedTypesImpl()
{
	const result = [TerminalEncoding.NONE];
	// https://stackoverflow.com/a/4224668/14731
	if (typeof (window) === "undefined")
	{
		// Node
		switch (chalk.level)
		{
			case 3:
				result.push(TerminalEncoding.NODE_16MILLION_COLORS);
			// fallthrough
			case 2:
				result.push(TerminalEncoding.NODE_256_COLORS);
			// fallthrough
			case 1:
				result.push(TerminalEncoding.NODE_16_COLORS);
			// fallthrough
			case 0:
				break;
			default:
			{
				throw new RangeError("chalk.level had an unexpected value.\n" +
					"Actual: " + chalk.level);
			}
		}
	}
	else
	{
		// Browsers support colors using console.log() but exception messages do not support any colors.
	}
	result.sort(TerminalEncoding.sortByDecreasingRank);
	return result;
}

/**
 * Indicates the type of encoding that the terminal should use.
 * <p>
 * This feature can be used to force the use of an encoding even when its support is not detected.
 *
 * @param {Terminal} terminal an instance of the terminal
 * @param {TerminalEncoding} encoding the type of encoding that the terminal should use
 * @param {boolean} force true if the encoding should be forced regardless of what the system supports
 * @throws {TypeError} if <code>encoding</code> is not a <code>TerminalEncoding</code>. If <code>force</code>
 *   is not a <code>boolean</code>.
 * @see #useBestEncoding
 * @ignore
 */
function setEncodingImpl(terminal, encoding, force)
{
	Objects.assertThatTypeOf(terminal, "terminal", "Terminal");
	Objects.assertThatTypeOf(encoding, "encoding", "TerminalEncoding");
	Objects.assertThatTypeOf(force, "force", "boolean");
	console.debug("setEncodingImpl(%s, %s)", encoding, force);

	if (!terminal.listSupportedTypes().includes(encoding))
	{
		console.debug("User forced the use of an unsupported encoding: %s", encoding);
		terminal.encoding = encoding;
		return;
	}
	terminal.encoding = encoding;
	console.debug("Setting encoding to %s", encoding);
}

/**
 * The terminal associated with the JVM.
 */
class Terminal
{
	constructor()
	{
		Object.defineProperty(this, "supportedTypes",
			{
				value: null,
				writable: true
			});
		Object.defineProperty(this, "encoding",
			{
				value: null,
				writable: true
			});
	}

	/**
	 * @return {Array<TerminalEncoding>} the encodings supported by the terminal
	 */
	listSupportedTypes()
	{
		if (this.supportedTypes === null)
			this.supportedTypes = listSupportedTypesImpl();
		return this.supportedTypes;
	}

	/**
	 * Indicates the type of encoding that the terminal should use.
	 * <p>
	 * This feature can be used to force the use of an encoding even when its support is not detected.
	 *
	 * @param {TerminalEncoding} encoding the type of encoding that the terminal should use
	 * @throws {TypeError} if <code>encoding</code> is not a <code>TerminalEncoding</code>
	 * @see #useBestEncoding
	 */
	setEncoding(encoding)
	{
		setEncodingImpl(this, encoding, true);
	}

	/**
	 * Indicates that verifiers should output the best encoding supported by the terminal.
	 *
	 * @see #setEncoding
	 */
	useBestEncoding()
	{
		const supportedTypes = this.listSupportedTypes();
		const sortedTypes = supportedTypes.sort(TerminalEncoding.sortByDecreasingRank);
		setEncodingImpl(this, sortedTypes[0], false);
	}

	/**
	 * @return {TerminalEncoding} the encoding that the terminal should use (defaults to the best available
	 *   encoding)
	 */
	getEncoding()
	{
		let result = this.encoding;
		if (result === null)
		{
			this.useBestEncoding();
			result = this.encoding;
		}
		return result;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {Terminal as default};