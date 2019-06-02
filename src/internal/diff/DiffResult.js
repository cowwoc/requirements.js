import Objects from "../Objects";

/**
 * The result of calculating the difference between two strings.
 */
class DiffResult
{
	/**
	 * @param {Array<string>} actualLines        the lines of the actual string
	 * @param {Array<string>} middleLines        the optional lines to display between "actual" and "expected"
	 * @param {Array<string>} expectedLines      the lines of the expected string
	 * @param {string} paddingMarker a padding character used to align values vertically
	 * @throws {TypeError}     if any of the arguments are null
	 * @throws {RangeError} if <code>paddingMarker</code> is empty
	 */
	constructor(actualLines, middleLines, expectedLines, paddingMarker)
	{
		Objects.assertThatTypeOf(actualLines, "actualLines", "Array");
		Objects.assertThatTypeOf(middleLines, "middleLines", "Array");
		Objects.assertThatTypeOf(expectedLines, "expectedLines", "Array");
		Objects.requireThatStringNotEmpty(paddingMarker, "paddingMarker");

		Object.defineProperty(this, "actualLines",
			{
				value: actualLines
			});
		Object.defineProperty(this, "middleLines",
			{
				value: middleLines
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
	 * @return {Array<string>} the lines to display between "actual" and "expected". If the list is empty, no lines
	 * should be displayed.
	 */
	getMiddleLines()
	{
		return this.middleLines;
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
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {DiffResult as default};