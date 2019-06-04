import Objects from "./internal/Objects.js";

/**
 * The ANSI escape codes supported by the terminal.
 *
 * @property {number} ordinal the position in an enum declaration, where the initial constant is assigned an ordinal of
 * zero
 */
class TerminalEncoding
{
	/**
	 * @param {number} ordinal the position in an enum declaration, where the initial constant is assigned an ordinal of
	 * zero
	 * @param {string} name the name of the enum
	 * @throws {TypeError} if <code>ordinal</code> is not a number. If <code>name</code> is not a string.
	 */
	constructor(ordinal, name)
	{
		Objects.assertThatTypeOf(ordinal, "ordinal", "number");
		Objects.assertThatTypeOf(name, "name", "string");
		Object.defineProperty(this, "ordinal",
			{
				value: ordinal
			});
		Object.defineProperty(this, "name",
			{
				value: name
			});
	}

	toString()
	{
		return "TerminalEncoding." + this.name;
	}
}

let value = 0;
/**
 * A terminal that does not support any colors.
 */
TerminalEncoding.NONE = new TerminalEncoding(value++, "NONE");

/**
 * Node terminal supports a 16-color palette.
 */
TerminalEncoding.NODE_16_COLORS = new TerminalEncoding(value++, "NODE_16_COLORS");

/**
 * Node terminal supports a 256-color palette.
 */
TerminalEncoding.NODE_256_COLORS = new TerminalEncoding(value++, "NODE_256_COLORS");

/**
 * Node terminal supports a 24-bit color palette.
 */
TerminalEncoding.NODE_16MILLION_COLORS = new TerminalEncoding(value++, "NODE_16MILLION_COLORS");

/**
 * @param {TerminalEncoding} first the first encoding
 * @param {TerminalEncoding} second the second encoding
 * @return {number} a negative number if <code>first</code> supports more colors than <code>second</code>.
 * <code>0</code> if the encodings support the same number of colors. A positive number if <code>first</code>
 * supports less colors than <code>second</code>.
 */
TerminalEncoding.sortByDecreasingRank = (first, second) =>
{
	if (first.ordinal < second.ordinal)
		return 1;
	if (first.ordinal > second.ordinal)
		return -1;
	return 0;
};

Object.freeze(TerminalEncoding);

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {TerminalEncoding as default};