import chalk from "chalk";
import {AbstractColorWriter} from "../internal.mjs";

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

export {Node16Colors};