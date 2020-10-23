import {Objects} from "../internal";

/**
 * The result of calculating the difference between two strings.
 */
class DiffResult
{
	private readonly actualLines: string[];
	private readonly diffLines: string[];
	private readonly expectedLines: string[];
	private readonly paddingMarker: string;

	/**
	 * @param {string[]} actualLines    the lines of the actual string
	 * @param {string[]} diffLines      optional lines denoting the difference between "actual" and "expected"
	 * @param {string[]} expectedLines  the lines of the expected string
	 * @param {string} paddingMarker a padding character used to align values vertically
	 * @throws {TypeError}     if any of the arguments are null
	 */
	constructor(actualLines: string[], diffLines: string[], expectedLines: string[], paddingMarker: string)
	{
		Objects.assertThatTypeOf(actualLines, "actualLines", "Array");
		Objects.assertThatTypeOf(diffLines, "diffLines", "Array");
		Objects.assertThatTypeOf(expectedLines, "expectedLines", "Array");
		Objects.assertThatTypeOf(paddingMarker, "paddingMarker", "string");

		this.actualLines = actualLines;
		this.diffLines = diffLines;
		this.expectedLines = expectedLines;
		this.paddingMarker = paddingMarker;
	}

	/**
	 * @return {string[]} the lines of the actual string
	 */
	getActualLines(): string[]
	{
		return this.actualLines;
	}


	/**
	 * @return {string[]} the lines to display between "actual" and "expected". If the list is empty, no lines
	 * should be displayed.
	 */
	getDiffLines(): string[]
	{
		return this.diffLines;
	}

	/**
	 * @return {string[]} the lines of the expected string
	 */
	getExpectedLines(): string[]
	{
		return this.expectedLines;
	}

	/**
	 * @return {string} a padding character used to align values vertically
	 */
	getPaddingMarker(): string
	{
		return this.paddingMarker;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {DiffResult as default};