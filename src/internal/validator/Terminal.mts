import chalk from "chalk";
import {
	TerminalEncoding,
	sortByDecreasingRank,
	Type,
	assertThatType
} from "../internal.mjs";


/**
 * The terminal associated with the process.
 */
class Terminal
{
	private supportedTypes: Set<TerminalEncoding> | undefined;
	private encoding: TerminalEncoding | undefined;

	/**
	 * @returns the encodings supported by the terminal
	 */
	getSupportedTypes()
	{
		if (this.supportedTypes === undefined)
		{
			this.supportedTypes = new Set<TerminalEncoding>();
			this.supportedTypes.add(TerminalEncoding.NONE);
			// https://stackoverflow.com/a/4224668/14731
			if (typeof (globalThis.window) === "undefined")
			{
				// Node
				switch (chalk.level)
				{
					case 3:
						this.supportedTypes.add(TerminalEncoding.NODE_16MILLION_COLORS);
					// fallthrough
					case 2:
						this.supportedTypes.add(TerminalEncoding.NODE_256_COLORS);
					// fallthrough
					case 1:
						this.supportedTypes.add(TerminalEncoding.NODE_16_COLORS);
					// fallthrough
					case 0:
						break;
					default:
					{
						throw new RangeError(`chalk.level had an unexpected value.
Actual: ${String(chalk.level)}`);
					}
				}
			}
			else
			{
				// Browsers support colors using console.log() but error messages do not support any colors.
			}
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
	 * @throws TypeError if `encoding` is not a `TerminalEncoding`.
	 * If `force` is not a `boolean`.
	 * @see Terminal.useBestEncoding
	 */
	private setEncodingImpl(encoding: TerminalEncoding, force: boolean)
	{
		assertThatType(force, "force", Type.BOOLEAN);
		console.debug("setEncodingImpl(%s, %s)", encoding, force);

		if (!this.getSupportedTypes().has(encoding) && !force)
		{
			this.encoding = TerminalEncoding.NONE;
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
	 * @throws TypeError if `encoding` is not a `TerminalEncoding`
	 * @see Terminal.useBestEncoding
	 */
	setEncoding(encoding: TerminalEncoding)
	{
		this.setEncodingImpl(encoding, true);
	}

	/**
	 * Indicates that verifiers should output the best encoding supported by the terminal.
	 *
	 * @see Terminal.setEncoding
	 */
	useBestEncoding()
	{
		const supportedTypes = this.getSupportedTypes();
		const sortedTypes: TerminalEncoding[] = [...supportedTypes].sort(sortByDecreasingRank);
		this.setEncodingImpl(sortedTypes[0], false);
	}

	/**
	 * @returns the encoding that the terminal should use (defaults to the best available encoding)
	 */
	getEncoding()
	{
		let result = this.encoding;
		if (result === undefined)
		{
			this.useBestEncoding();
			result = this.encoding;
		}
		return result as TerminalEncoding;
	}
}

export {Terminal};