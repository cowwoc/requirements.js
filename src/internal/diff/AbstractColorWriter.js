import AbstractDiffWriter from "./AbstractDiffWriter.js";
import chalk from "chalk";

/**
 * A padding character used to align values vertically.
 */
const PADDING_MARKER = "/";

/**
 * An node terminal that supports colors.
 */
class AbstractColorWriter extends AbstractDiffWriter
{
	constructor()
	{
		super(PADDING_MARKER);
	}

	/**
	 * @param {number} length the number of characters to pad
	 * @return {string} the (possibly decorated) text
	 */
	decoratePadding(length)
	{
		return chalk.bgBlack(super.decoratePadding(length));
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {AbstractColorWriter as default};