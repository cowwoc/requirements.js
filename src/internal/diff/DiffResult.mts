import {Objects} from "../internal.mjs";

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
	 * @param actualLines - the lines of the actual string
	 * @param diffLines - optional lines denoting the difference between "actual" and "expected"
	 * @param expectedLines - the lines of the expected string
	 * @param paddingMarker - a padding character used to align values vertically
	 * @throws TypeError if any of the arguments are null
	 */
	constructor(actualLines: string[], diffLines: string[], expectedLines: string[], paddingMarker: string)
	{
		Objects.assertThatTypeOf(actualLines, "actualLines", "array");
		Objects.assertThatTypeOf(diffLines, "diffLines", "array");
		Objects.assertThatTypeOf(expectedLines, "expectedLines", "array");
		Objects.assertThatTypeOf(paddingMarker, "paddingMarker", "string");

		this.actualLines = actualLines;
		this.diffLines = diffLines;
		this.expectedLines = expectedLines;
		this.paddingMarker = paddingMarker;
	}

	/**
	 * @returns the lines of the actual string
	 */
	getActualLines(): string[]
	{
		return this.actualLines;
	}

	/**
	 * @returns the lines to display between "actual" and "expected". If the list is empty, no lines should be
	 *   displayed.
	 */
	getDiffLines(): string[]
	{
		return this.diffLines;
	}

	/**
	 * @returns the lines of the expected string
	 */
	getExpectedLines(): string[]
	{
		return this.expectedLines;
	}

	/**
	 * @returns a padding character used to align values vertically
	 */
	getPaddingMarker(): string
	{
		return this.paddingMarker;
	}
}

export {DiffResult};