import {
	AbstractColorWriter,
	Objects,
	TextOnly
} from "./internal/internal.mjs";

/**
 * The encodings supported by the terminal.
 */
enum TerminalEncoding
{
	/**
	 * A terminal that does not support any colors.
	 */
	NONE,
	/**
	 * Node terminal supports a 16-color palette.
	 */
	NODE_16_COLORS,
	/**
	 * Node terminal supports a 256-color palette.
	 */
	NODE_256_COLORS,
	/**
	 * Node terminal supports a 24-bit color palette.
	 */
	NODE_16MILLION_COLORS
}

/**
 * Helper functions for TerminalEncodings.
 */
class TerminalEncodings
{
	/**
	 * @param first - the first encoding
	 * @param second - the second encoding
	 * @returns a negative number if <code>first</code> supports more colors than <code>second</code>.
	 *   <code>0</code> if the encodings support the same number of colors. A positive number if
	 *   <code>first</code> supports fewer colors than <code>second</code>.
	 */
	static readonly sortByDecreasingRank = (first: TerminalEncoding, second: TerminalEncoding): number =>
	{
		if (first < second)
			return 1;
		if (first > second)
			return -1;
		return 0;
	};

	/**
	 * @param terminalEncoding - the encoding to use for the terminal
	 * @returns the padding character used to align values vertically
	 */
	static getPaddingMarker(terminalEncoding: TerminalEncoding)
	{
		switch (terminalEncoding)
		{
			case TerminalEncoding.NONE:
				return TextOnly.DIFF_PADDING;
			case TerminalEncoding.NODE_16_COLORS:
			case TerminalEncoding.NODE_256_COLORS:
			case TerminalEncoding.NODE_16MILLION_COLORS:
				return AbstractColorWriter.DIFF_PADDING;
			default:
				throw new RangeError(Objects.toString(terminalEncoding));
		}
	}
}

export
{
	TerminalEncoding,
	TerminalEncodings
};