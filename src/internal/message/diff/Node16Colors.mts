import chalk from "chalk";
import {AbstractColorWriter} from "../../internal.mjs";

/**
 * A node terminal that supports 16 colors.
 */
class Node16Colors extends AbstractColorWriter
{
	public constructor()
	{
		super();
	}

	public decorateInsertedText(text: string): string
	{
		return chalk.bgGreen(chalk.whiteBright(text));
	}

	public decorateDeletedText(text: string): string
	{
		return chalk.bgRed(chalk.whiteBright(text));
	}

	protected afterFlush()
	{
	}

	public decorateEqualText(text: string): string
	{
		return text;
	}

	public decoratePadding(text: string): string
	{
		return text;
	}
}

export {Node16Colors};