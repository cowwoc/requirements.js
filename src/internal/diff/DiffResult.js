import Objects from "../Objects.js";

/**
 * The result of calculating the difference between two strings.
 *
 * @ignore
 */
class DiffResult
{
	/**
	 * @param {Array<string>} actualLines        the lines of the actual string
	 * @param {Array<string>} diffLines          optional lines denoting the difference between "actual" and
	 *   "expected"
	 * @param {Array<string>} expectedLines      the lines of the expected string
	 * @param {string} paddingMarker a padding character used to align values vertically
	 * @throws {TypeError}     if any of the arguments are null
	 */
	constructor(actualLines, diffLines, expectedLines, paddingMarker)
	{
		Objects.assertThatTypeOf(actualLines, "actualLines", "Array");
		Objects.assertThatTypeOf(diffLines, "diffLines", "Array");
		Objects.assertThatTypeOf(expectedLines, "expectedLines", "Array");
		Objects.assertThatTypeOf(paddingMarker, "paddingMarker", "string");

		Object.defineProperty(this, "actualLines",
			{
				value: actualLines
			});
		Object.defineProperty(this, "diffLines",
			{
				value: diffLines
			});
		Object.defineProperty(this, "expectedLines",
			{
				value: expectedLines
			});
		Object.defineProperty(this, "paddingMarker",
			{
				value: paddingMarker
			});
	}

	/**
	 * @return {Array<string>} the lines of the actual string
	 */
	getActualLines()
	{
		return this.actualLines;
	}


	/**
	 * @return {Array<string>} the lines to display between "actual" and "expected". If the list is empty, no
	 *   lines should be displayed.
	 */
	getDiffLines()
	{
		return this.diffLines;
	}

	/**
	 * @return {Array<string>} the lines of the expected string
	 */
	getExpectedLines()
	{
		return this.expectedLines;
	}

	/**
	 * @return {string} a padding character used to align values vertically
	 */
	getPaddingMarker()
	{
		return this.paddingMarker;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {DiffResult as default};