import AbstractColorWriter from "./AbstractColorWriter.js";
import chalk from "chalk";

/**
 * An node terminal that supports 16 colors.
 *
 * @ignore
 */
class Node16Colors extends AbstractColorWriter
{
	decorateInsertedText(text)
	{
		return chalk.bgGreen(chalk.whiteBright(text));
	}

	decorateDeletedText(text)
	{
		return chalk.bgRed(chalk.whiteBright(text));
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {Node16Colors as default};