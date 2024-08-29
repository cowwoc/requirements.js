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
 * Returns a comparator that sorts encodings based on the number of colors that they support, from the most
 * to the least number of colors.
 *
 * @param first - the first encoding
 * @param second - the second encoding
 * @returns a negative number if `first` supports more colors than `second`.
 *   `0` if the encodings support the same number of colors. A positive number if
 *   `first` supports fewer colors than `second`.
 */
const sortByDecreasingRank = (first: TerminalEncoding, second: TerminalEncoding): number => second - first;

export
{
	TerminalEncoding,
	sortByDecreasingRank
};