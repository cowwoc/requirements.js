import chalk from "chalk";
import {AbstractColorWriter} from "../internal";

const greenBackground = chalk.bgRgb(0, 135, 0);
const redBackground = chalk.bgRgb(175, 0, 0);

/**
 * A node terminal that supports 16 million colors.
 *
 * @see <a href="https://gist.github.com/XVilka/8346728">https://gist.github.com/XVilka/8346728</a>
 */
class Node16MillionColors extends AbstractColorWriter
{
	constructor()
	{
		super();
	}

	decorateInsertedText(text: string): string
	{
		return greenBackground(chalk.whiteBright(text));
	}

	decorateDeletedText(text: string): string
	{
		return redBackground(chalk.whiteBright(text));
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {Node16MillionColors as default};