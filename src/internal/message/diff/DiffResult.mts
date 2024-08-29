import {
	Type,
	assertThatType
} from "../../internal.mjs";

/**
 * The result of calculating the difference between two strings.
 */
class DiffResult
{
	private readonly actualLines: string[];
	private readonly diffLines: string[];
	private readonly expectedLines: string[];
	private readonly equalLines: boolean[];

	/**
	 * @param actualLines - the lines of the actual string
	 * @param diffLines - the difference between the actual and expected values (empty list if omitted)
	 * @param expectedLines - the lines of the expected string
	 * @param equalLines - indicates if the actual and expected values are equal for each line
	 * @throws TypeError if any of the arguments are `null`
	 */
	constructor(actualLines: string[], diffLines: string[], expectedLines: string[], equalLines: boolean[])
	{
		assertThatType(actualLines, "actualLines", Type.ARRAY);
		assertThatType(diffLines, "diffLines", Type.ARRAY);
		assertThatType(expectedLines, "expectedLines", Type.ARRAY);
		assertThatType(equalLines, "equalLines", Type.ARRAY);

		this.actualLines = actualLines;
		this.diffLines = diffLines;
		this.expectedLines = expectedLines;
		this.equalLines = equalLines;
	}

	/**
	 * @returns the lines of the actual string
	 */
	getActualLines(): string[]
	{
		return this.actualLines;
	}

	/**
	 * @returns the difference between "Actual" and "Expected". If the list is empty, no lines should be
	 * displayed.
	 */
	getDiffLines(): string[]
	{
		return this.diffLines;
	}

	/**
	 * Returns the lines of the expected string.
	 *
	 * @returns the lines of the expected string
	 */
	getExpectedLines(): string[]
	{
		return this.expectedLines;
	}

	/**
	 * @returns a list that indicates whether the actual and expected values are equal on each line
	 */
	public getEqualLines(): boolean[]
	{
		return this.equalLines;
	}

	public toString(): string
	{
		return `\
actual  : ${this.actualLines.toString()}
diff    : ${this.diffLines.toString()}
expected: ${this.expectedLines.toString()}
equal   : ${this.equalLines.toString()}`;
	}
}

export {DiffResult};