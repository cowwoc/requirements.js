import {Node16MillionColors} from "../internal.mjs";

/**
 * A node terminal that supports 256 colors.
 */
class Node256Colors extends Node16MillionColors
{
	constructor()
	{
		super();
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {Node256Colors as default};