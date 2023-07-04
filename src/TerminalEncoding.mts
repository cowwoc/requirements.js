import
{
	AbstractColorWriter,
	Node16Colors,
	Node16MillionColors,
	Node256Colors,
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
	 * @param {TerminalEncoding} first the first encoding
	 * @param {TerminalEncoding} second the second encoding
	 * @return {number} a negative number if <code>first</code> supports more colors than <code>second</code>.
	 *   <code>0</code> if the encodings support the same number of colors. A positive number if
	 *   <code>first</code> supports less colors than <code>second</code>.
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
	 * @param {TerminalEncoding} terminalEncoding the encoding to use for the terminal
	 * @return {TextOnly | Node16Colors | Node256Colors | Node16MillionColors} a writer that generates a diff
	 */
	static createDiffWriter(terminalEncoding: TerminalEncoding):
		TextOnly | Node16Colors | Node256Colors | Node16MillionColors
	{
		switch (terminalEncoding)
		{
			case TerminalEncoding.NONE:
				return new TextOnly();
			case TerminalEncoding.NODE_16_COLORS:
				return new Node16Colors();
			case TerminalEncoding.NODE_256_COLORS:
				return new Node256Colors();
			case TerminalEncoding.NODE_16MILLION_COLORS:
				return new Node16MillionColors();
			default:
				throw new RangeError(Objects.toString(terminalEncoding));
		}
	}

	/**
	 * @param {TerminalEncoding} terminalEncoding the encoding to use for the terminal
	 * @return {string} the padding character used to align values vertically
	 * @ignore
	 */
	static getPaddingMarker(terminalEncoding: TerminalEncoding): string
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

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export
{
	TerminalEncoding,
	TerminalEncodings
};