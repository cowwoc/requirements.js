import isEqual from "lodash/isEqual.js";
import type {Configuration} from "../internal.mjs";
import {
	ContextLine,
	DiffGenerator,
	Objects,
	TextOnly
} from "../internal.mjs";

/**
 * Returns the difference between two values as an exception context.
 */
class ContextGenerator
{
	/**
	 * A regular expression that matches lines that are not equal.
	 */
	private static readonly LINES_NOT_EQUAL = new RegExp("[^" + TextOnly.DIFF_EQUAL + "]+");
	/**
	 * A pattern matching the end of a line or stream.
	 */
	private static readonly EOL_PATTERN = /\\n|\\0$/;
	private readonly config: Configuration;
	private readonly diffGenerator: DiffGenerator;

	/**
	 * @param configuration - the instance configuration
	 * @throws TypeError if <code>configuration</code> is null
	 */
	constructor(configuration: Configuration)
	{
		Objects.assertThatObjectOf(configuration, "configuration", "Configuration");

		this.config = configuration;
		this.diffGenerator = new DiffGenerator(configuration.getGlobalConfiguration().getTerminalEncoding());
	}

	/**
	 * Updates the last context entry to indicate that duplicate lines were skipped.
	 *
	 * @param entries - the exception context
	 */
	private skipDuplicateLines(entries: ContextLine[])
	{
		entries.push(new ContextLine(this.config, "", ""));
		entries.push(new ContextLine(this.config, "", "[...]"));
	}

	/**
	 * @param actualLine - the actual lines
	 * @param expectedLine - the expected lines
	 * @param diffLine - the diff associated with the line
	 * @returns true if the lines being compared are equal to each other
	 */
	private static linesAreEqual(actualLine: string, expectedLine: string, diffLine: string): boolean
	{
		if (diffLine.length !== 0)
			return !ContextGenerator.LINES_NOT_EQUAL.test(diffLine);
		return actualLine === expectedLine;
	}

	/**
	 * @param actualLines - the lines of the actual value
	 * @param expectedLines - the lines of the expected value
	 * @returns true
	 * @throws RangeError if the number of lines does not match
	 */
	private static requireThatNumberOfLinesAreEqual(actualLines: string[], expectedLines: string[])
	{
		if (actualLines.length !== expectedLines.length)
		{
			throw new RangeError("actualLines.size() !== expectedLines\n" +
				"actualLines: " + actualLines.length + "\n" +
				"expectedLines: " + expectedLines.length);
		}
		return true;
	}

	/**
	 * @param actualName - the name of the actual value
	 * @param actualValue - the actual value
	 * @param expectedName - the name of the expected value
	 * @param expectedValue - the expected value
	 * @param expectedInMessage - true if the expected value is already mentioned in the failure message
	 * @param compareTypes - true if the actual and expected types (classes) should be compared if their values
	 *   are equal (Default: true)
	 * @returns the list of name-value pairs to append to the exception message
	 * @throws TypeError if <code>actualName</code> or <code>expectedName</code> are not a string
	 * @throws RangeError if <code>actualName</code> or <code>expectedName</code> are empty; if
	 * <code>expectedInMessage</code> is not a boolean
	 */
	// eslint-disable-next-line max-statements
	getContext(actualName: string, actualValue: unknown, expectedName: string,
		expectedValue: unknown, expectedInMessage: boolean, compareTypes = true): ContextLine[]
	{
		Objects.assertThatStringNotEmpty(actualName, "actualName");
		Objects.assertThatStringNotEmpty(expectedName, "expectedName");
		Objects.assertThatTypeOf(expectedInMessage, "expectedInMessage", "boolean");

		const actualInfo = Objects.getTypeInfo(actualValue);
		const expectedInfo = Objects.getTypeInfo(expectedValue);
		if (actualInfo.type === "array" && expectedInfo.type === "array")
		{
			return this.getContextForArrays(actualName, actualValue as unknown[], expectedName,
				expectedValue as unknown[], expectedInMessage);
		}
		// Don't diff booleans
		const typeIsDiffable = (actualInfo.type !== "boolean");
		if (!typeIsDiffable || !this.config.isDiffEnabled())
		{
			const result: ContextLine[] = [];
			result.push(new ContextLine(this.config, actualName, actualValue));
			if (!expectedInMessage)
				result.push(new ContextLine(this.config, expectedName, expectedValue));
			return result;
		}
		const actualIsString = this.config.convertToString(actualValue);
		const expectedIsString = this.config.convertToString(expectedValue);
		const lines = this.diffGenerator.diff(actualIsString, expectedIsString);
		const actualLines = lines.getActualLines();
		const expectedLines = lines.getExpectedLines();
		const diffLines = lines.getDiffLines();
		Objects.assert(ContextGenerator.requireThatNumberOfLinesAreEqual(actualLines, expectedLines));
		const numberOfLines = actualLines.length;
		const result: ContextLine[] = [];
		if (numberOfLines === 1)
		{
			const actualLine = actualLines[0];
			const expectedLine = expectedLines[0];
			let diffLine;
			if (diffLines.length === 0)
				diffLine = "";
			else
				diffLine = diffLines[0];
			const stringsAreEqual = ContextGenerator.linesAreEqual(actualLine, expectedLine, diffLine);
			result.push(new ContextLine(this.config, "", ""));
			result.push(new ContextLine(this.config, actualName, actualLine));
			if (diffLine.length !== 0 && !stringsAreEqual)
				result.push(new ContextLine(this.config, "Diff", diffLine));
			result.push(new ContextLine(this.config, expectedName, expectedLine));
			if (compareTypes && ContextGenerator.linesAreEqual(actualLine, expectedLine, diffLine))
			{
				// If the String representation of the values is equal, output getClass(), hashCode(),
				// or System.identityHashCode()] that differ.
				result.push(...this.compareTypes(actualName, actualValue, expectedName, expectedValue));
			}
			return result;
		}
		let actualLineNumber = 0;
		let expectedLineNumber = 0;
		// Indicates if the previous line was identical
		let skippedDuplicates = false;
		for (let i = 0; i < numberOfLines; ++i)
		{
			const actualLine = actualLines[i];
			let expectedLine;
			if (expectedLines.length > i)
				expectedLine = expectedLines[i];
			else
				expectedLine = "";
			let diffLine;
			if (diffLines.length === 0)
				diffLine = "";
			else
				diffLine = diffLines[i];
			const currentLineIsEqual = ContextGenerator.linesAreEqual(actualLine, expectedLine, diffLine);
			if (i !== 0 && i !== numberOfLines - 1 && currentLineIsEqual)
			{
				// Skip identical lines, unless they are the first or last line.
				skippedDuplicates = true;
				++actualLineNumber;
				++expectedLineNumber;
				continue;
			}
			let actualNameForLine;
			if (this.diffGenerator.isEmpty(actualLine))
				actualNameForLine = actualName;
			else
			{
				actualNameForLine = actualName + "@" + actualLineNumber;
				if (ContextGenerator.EOL_PATTERN.test(actualLine))
					++actualLineNumber;
			}
			if (skippedDuplicates)
			{
				skippedDuplicates = false;
				this.skipDuplicateLines(result);
			}
			result.push(new ContextLine(this.config, "", ""));
			result.push(new ContextLine(this.config, actualNameForLine, actualLine));
			if (diffLine.length !== 0 && !currentLineIsEqual)
				result.push(new ContextLine(this.config, "Diff", diffLine));
			let expectedNameForLine;
			if (this.diffGenerator.isEmpty(expectedLine))
				expectedNameForLine = expectedName;
			else
			{
				expectedNameForLine = expectedName + "@" + expectedLineNumber;
				if (ContextGenerator.EOL_PATTERN.test(expectedLine))
					++expectedLineNumber;
			}
			result.push(new ContextLine(this.config, expectedNameForLine, expectedLine));
		}
		return result;
	}

	/**
	 * @param actualName -the name of the actual value
	 * @param actualValue - the actual value
	 * @param expectedName - the name of the expected value
	 * @param expectedValue - the expected value
	 * @param expectedInMessage - true if the expected value is already mentioned in the failure message
	 * @returns the list of name-value pairs to append to the exception message
	 * @throws TypeError if <code>actualName</code> or <code>expectedName</code> are not a string
	 * @throws RangeError if <code>actualName</code> or <code>expectedName</code> are empty; if
	 * <code>expectedInMessage</code> is not a boolean
	 */
	// eslint-disable-next-line max-statements
	private getContextForArrays(actualName: string, actualValue: unknown[], expectedName: string,
		expectedValue: unknown[], expectedInMessage: boolean)
	{
		Objects.assertThatStringNotEmpty(actualName, "actualName");
		Objects.assertThatTypeOf(actualValue, "actualValue", "array");
		Objects.assertThatStringNotEmpty(expectedName, "expectedName");
		Objects.assertThatTypeOf(expectedValue, "expectedValue", "array");
		Objects.assertThatTypeOf(expectedInMessage, "expectedInMessage", "boolean");

		if (!this.config.isDiffEnabled())
		{
			const result: ContextLine[] = [];
			result.push(new ContextLine(this.config, actualName, actualValue));
			if (!expectedInMessage)
				result.push(new ContextLine(this.config, expectedName, expectedValue));
			return result;
		}
		const actualSize = actualValue.length;
		const expectedSize = expectedValue.length;
		const maxSize = Math.max(actualSize, expectedSize);

		const result: ContextLine[] = [];
		// Indicates if the previous index was equal
		let skippedDuplicates = false;
		let actualIndex = 0;
		let expectedIndex = 0;
		for (let i = 0; i < maxSize; ++i)
		{
			let elementsAreEqual = true;
			let actualValueIsString;
			let actualNameForElement;
			if (i < actualSize)
			{
				actualValueIsString = this.config.convertToString(actualValue[i]);
				actualNameForElement = actualName + "[" + actualIndex + "]";
				++actualIndex;
			}
			else
			{
				actualValueIsString = "";
				actualNameForElement = actualName;
				elementsAreEqual = false;
			}
			let expectedValueIsString;
			let expectedNameForElement;
			if (i < expectedSize)
			{
				expectedValueIsString = this.config.convertToString(expectedValue[i]);
				expectedNameForElement = expectedName + "[" + expectedIndex + "]";
				++expectedIndex;
			}
			else
			{
				expectedValueIsString = "";
				expectedNameForElement = expectedName;
				elementsAreEqual = false;
			}
			if (elementsAreEqual)
				elementsAreEqual = actualValue[i] === expectedValue[i];
			if (i !== 0 && i !== maxSize - 1 && elementsAreEqual)
			{
				// Skip identical elements, unless they are the first or last element.
				skippedDuplicates = true;
				continue;
			}
			if (skippedDuplicates)
			{
				skippedDuplicates = false;
				this.skipDuplicateLines(result);
			}
			result.push(...this.getContext(actualNameForElement, actualValueIsString,
				expectedNameForElement, expectedValueIsString, false, !elementsAreEqual));
		}
		return result;
	}

	/**
	 * @param actualName - the name of the actual value
	 * @param actualValue - the actual value
	 * @param expectedName - the name of the expected value
	 * @param expectedValue - the expected value
	 * @returns the list of name-value pairs to append to the exception message
	 * @throws TypeError if <code>actualName</code> or <code>expectedName</code> are null
	 */
	private compareTypes(actualName: string, actualValue: unknown, expectedName: string,
		expectedValue: unknown): ContextLine[]
	{
		const actualType = Objects.getTypeInfo(actualValue);
		const expectedType = Objects.getTypeInfo(expectedValue);
		if (!isEqual(actualType, expectedType))
		{
			return this.getContext(actualName + ".class", actualType, expectedName + ".class", expectedType, false,
				false);
		}
		return [];
	}
}

export {ContextGenerator};