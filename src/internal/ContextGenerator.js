import Objects from "./Objects";
import Strings from "./Strings";
import Configuration from "../Configuration";
import DiffGenerator from "./diff/DiffGenerator";

/**
 * A regular expression that matches lines that are not equal.
 */
const LINES_NOT_EQUAL = /[^=]+/;

/**
 * Updates the last context entry to indicate that duplicate lines were skipped.
 *
 * @param {Array} entries the exception context
 */
function skipDuplicateLines(entries)
{
	const lastEntry = entries[entries.length - 1];
	const newValue = lastEntry + "\n[...]\n";
	entries.splice(entries.length - 1, 0, [lastEntry[0], newValue]);
}

/**
 * @param {string} diff the textual diff of two lines
 * @return {boolean} true if the lines being compared are different from each other
 */
function linesAreDifferent(diff)
{
	return LINES_NOT_EQUAL.test(diff);
}

/**
 * @param {Array<string>} actualLines the lines of the actual value
 * @param {Array<string>} expectedLines the lines of the expected value
 * @return {boolean} true
 * @throws {RangeError} if the number of lines does not match
 */
function requireThatNumberOfLinesAreEqual(actualLines, expectedLines)
{
	if (actualLines.length !== expectedLines.length)
	{
		throw new RangeError("actualLines.size() !== expectedLines.\n" +
			"actualLines: " + actualLines.length + "\n" +
			"expectedLines: " + expectedLines.length);
	}
	return true;
}

/* eslint-disable max-statements */
/**
 * @param {ContextGenerator} generator the instance of <code>ContextGenerator</code> to run against
 * @param {string} actualName    the name of the actual value
 * @param {string} actualValue   the actual value
 * @param {string} typeOfActual    the type of the actual value
 * @param {string} expectedName  the name of the expected value
 * @param {string} expectedValue the expected value
 * @return {Array} the list of name-value pairs to append to the exception message
 * @throws {RangeError} if <code>actualName</code> or <code>expectedName</code> are null
 */
function getContextImpl(generator, actualName, actualValue, typeOfActual, expectedName, expectedValue)
{
	Objects.assertThatTypeOf(generator, "generator", "ContextGenerator");
	Objects.assertThatStringNotEmpty(actualName, "actualName");
	Objects.assertThatStringNotEmpty(typeOfActual, "typeOfActual");
	Objects.assertThatStringNotEmpty(expectedName, "expectedName");

	// Don't diff booleans
	const typeIsDiffable = (typeOfActual !== "boolean");
	if (!typeIsDiffable || !generator.config.isDiffEnabled())
	{
		return [
			[actualName, actualValue],
			[expectedName, expectedValue]
		];
	}
	const diff = DiffGenerator.diff(actualValue, expectedValue);
	const actualLines = diff.getActualLines();
	const middleLines = diff.getMiddleLines();
	const expectedLines = diff.getExpectedLines();
	const lines = actualLines.length;
	const result = [];
	if (lines === 1)
	{
		result.push([actualName, actualLines[0]]);
		if (middleLines.length > 0 && linesAreDifferent(middleLines[0]))
			result.push(["Diff", middleLines[0]]);
		result.push([expectedName, expectedLines[0]]);
		return result;
	}
	console.assert(requireThatNumberOfLinesAreEqual(actualLines, expectedLines));
	let actualLineNumber = 1;
	let expectedLineNumber = 1;
	// Indicates if the previous line was identical
	let skippedDuplicates = false;
	for (let i = 0; i < lines; ++i)
	{
		const actualLine = actualLines[i];
		let expectedLine = expectedLines[i];
		if (i !== 0 && i !== lines - 1 && actualLine === expectedLine)
		{
			// Skip identical lines, unless they are the first or last line.
			skippedDuplicates = true;
			++actualLineNumber;
			++expectedLineNumber;
			continue;
		}
		let actualNameForLine;
		if (Strings.containsOnly(actualLine, diff.getPaddingMarker()))
			actualNameForLine = actualName;
		else
		{
			actualNameForLine = actualName + "@" + actualLineNumber;
			++actualLineNumber;
		}
		if (skippedDuplicates)
		{
			skippedDuplicates = false;
			skipDuplicateLines(result);
		}
		result.push([actualNameForLine, actualLine]);
		if (middleLines.length > 0 && linesAreDifferent(middleLines[i]))
			result.push(["Diff", middleLines[i]]);
		let expectedNameForLine;
		if (Strings.containsOnly(expectedLine, diff.getPaddingMarker()))
			expectedNameForLine = expectedName;
		else
		{
			expectedNameForLine = expectedName + "@" + expectedLineNumber;
			++expectedLineNumber;
		}
		if (i < lines - 1)
			expectedLine += "\n";
		result.push([expectedNameForLine, expectedLine]);
	}
	if (skippedDuplicates)
		skipDuplicateLines(result);
	return result;
}

/* eslint-enabled max-statements */

/**
 * Returns the difference between two values as an exception context.
 */
class ContextGenerator
{
	/**
	 * @param {Configuration} configuration the instance configuration
	 * @param {DiffGenerator} diffGenerator an instance of {@link DiffGenerator}
	 * @throws AssertionError if <code>configuration</code> or <code>diffGenerator</code> are null
	 */
	constructor(configuration, diffGenerator)
	{
		Objects.assertThatTypeOf(configuration, "configuration", "Configuration");
		Objects.assertThatTypeOf(diffGenerator, "diffGenerator", "DiffGenerator");

		Object.defineProperty(this, "config",
			{
				value: configuration
			});
		Object.defineProperty(this, "diffGenerator",
			{
				value: diffGenerator
			});
	}

	/**
	 * @param {string} actualName    the name of the actual value
	 * @param {object} actualValue   the actual value
	 * @param {string} expectedName  the name of the expected value
	 * @param {object} expectedValue the expected value
	 * @return {Array<Array<string>>} the list of name-value pairs to append to the exception message
	 */
	getContext(actualName, actualValue, expectedName, expectedValue)
	{
		// This class outputs the String representation of the values. If those are equal, it also
		// outputs the first of getClass(), hashCode(), or System.identityHashCode()] that differs.
		const actualAsString = this.config.convertToString(actualValue);
		const expectedAsString = this.config.convertToString(expectedValue);
		let typeOfActual;
		if (actualValue === null)
			typeOfActual = "null";
		else
			typeOfActual = Objects.getTypeOf(actualValue);
		const result = getContextImpl(this, actualName, actualAsString, typeOfActual, expectedName, expectedAsString);
		if (actualAsString === expectedAsString)
		{
			result.push(null);

			let actualClassName;
			if (typeOfActual === null)
				actualClassName = "null";
			else
				actualClassName = this.config.convertToString(typeOfActual);
			let expectedClassName;
			if (expectedValue === null)
				expectedClassName = "null";
			else
				expectedClassName = this.config.convertToString(Objects.getTypeOf(expectedValue));
			if (actualClassName !== expectedClassName)
			{
				result.push(...getContextImpl(this, actualName + ".class", actualClassName, typeOfActual,
					expectedName + ".class", expectedClassName));
				return result;
			}
		}
		return result;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {ContextGenerator as default};