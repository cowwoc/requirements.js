import {AbstractColorWriter} from "../internal.mjs";
import chalk from "chalk";

/**
 * A node terminal that supports 16 colors.
 */
class Node16Colors extends AbstractColorWriter
{
	constructor()
	{
		super();
	}

	decorateInsertedText(text: string): string
	{
		return chalk.bgGreen(chalk.whiteBright(text));
	}

	decorateDeletedText(text: string): string
	{
		return chalk.bgRed(chalk.whiteBright(text));
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {Node16Colors as default};