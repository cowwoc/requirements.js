import chalk from "chalk";
import {
	Objects,
	TerminalEncoding,
	TerminalEncodings
} from "./internal.mjs";


/**
 * The terminal associated with the JVM.
 */
class Terminal
{
	private supportedTypes: TerminalEncoding[] | undefined;
	private encoding: TerminalEncoding | undefined;
	private width: number | undefined;

	/**
	 * @returns the encodings supported by the terminal
	 */
	listSupportedTypes()
	{
		if (typeof (this.supportedTypes) === "undefined")
		{
			this.supportedTypes = [TerminalEncoding.NONE];
			// https://stackoverflow.com/a/4224668/14731
			if (typeof (window) === "undefined")
			{
				// Node
				switch (chalk.level)
				{
					case 3:
						this.supportedTypes.push(TerminalEncoding.NODE_16MILLION_COLORS);
					// fallthrough
					case 2:
						this.supportedTypes.push(TerminalEncoding.NODE_256_COLORS);
					// fallthrough
					case 1:
						this.supportedTypes.push(TerminalEncoding.NODE_16_COLORS);
					// fallthrough
					case 0:
						break;
					default:
					{
						throw new RangeError("chalk.level had an unexpected value.\n" +
							"Actual: " + String(chalk.level));
					}
				}
			}
			else
			{
				// Browsers support colors using console.log() but exception messages do not support any colors.
			}
			this.supportedTypes.sort(TerminalEncodings.sortByDecreasingRank);
		}
		return this.supportedTypes;
	}

	/**
	 * Indicates the type of encoding that the terminal should use.
	 * <p>
	 * This feature can be used to force the use of colors even when their support is not detected.
	 *
	 * @param encoding - the type of encoding that the terminal should use
	 * @param force - true if the encoding should be forced regardless of what the system supports
	 * @throws TypeError if <code>encoding</code> is not a <code>TerminalEncoding</code>.
	 * If <code>force</code> is not a <code>boolean</code>.
	 * @see #useBestEncoding
	 */
	private setEncodingImpl(encoding: TerminalEncoding, force: boolean)
	{
		Objects.assertThatTypeOf(force, "force", "boolean");
		console.debug("setEncodingImpl(%s, %s)", encoding, force);

		if (!this.listSupportedTypes().includes(encoding))
		{
			console.debug("User forced the use of an unsupported encoding: %s", encoding);
			this.encoding = encoding;
			return;
		}
		this.encoding = encoding;
		console.debug("Setting encoding to %s", encoding);
	}

	/**
	 * Indicates the type of encoding that the terminal should use.
	 * <p>
	 * This feature can be used to force the use of colors even when their support is not detected.
	 *
	 * @param encoding - the type of encoding that the terminal should use
	 * @throws TypeError if <code>encoding</code> is not a <code>TerminalEncoding</code>
	 * @see #useBestEncoding
	 */
	setEncoding(encoding: TerminalEncoding)
	{
		this.setEncodingImpl(encoding, true);
	}

	/**
	 * Indicates that verifiers should output the best encoding supported by the terminal.
	 *
	 * @see #setEncoding
	 */
	useBestEncoding()
	{
		const supportedTypes = this.listSupportedTypes();
		const sortedTypes = supportedTypes.sort(TerminalEncodings.sortByDecreasingRank);
		this.setEncodingImpl(sortedTypes[0], false);
	}

	/**
	 * @returns the encoding that the terminal should use (defaults to the best available encoding)
	 */
	getEncoding()
	{
		let result = this.encoding;
		if (typeof (result) === "undefined")
		{
			this.useBestEncoding();
			result = this.encoding;
		}
		return result as TerminalEncoding;
	}

	/**
	 * Indicates the width that the terminal should use.
	 * <p>
	 * This feature can be used to override the default terminal width when it cannot be auto-detected.
	 *
	 * @param width - the width that the terminal should use
	 * @throws TypeError if <code>width</code> is not a number
	 * @throws RangeError if <code>width</code> is zero or negative
	 * @see #useBestWidth
	 */
	setWidth(width: number)
	{
		Objects.assertThatTypeOf(width, "width", "number");
		if (width <= 0)
			throw new RangeError("width must be positive");
		this.width = width;
	}

	/**
	 * Indicates that verifiers should use the best width supported by the terminal. If the width cannot be
	 * auto-detected, a value of <code>80</code> is used.
	 *
	 * @see #setWidth(int)
	 */
	useBestWidth()
	{
		// Node: https://stackoverflow.com/a/30335724/14731
		this.width = process.stdout.columns || 80;
	}

	/**
	 * @returns the width of the terminal in characters (defaults to the auto-detected width)
	 */
	getWidth()
	{
		if (typeof (this.width) === "undefined")
			this.useBestWidth();
		return this.width as number;
	}
}

export {Terminal};