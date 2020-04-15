import Objects from "../Objects.js";
import Configuration from "../../Configuration.js";
import DiffGenerator from "./DiffGenerator.js";
import {DIFF_EQUAL} from "./TextOnly.js";
import ContextLine from "./ContextLine";

/**
 * A regular expression that matches lines that are not equal.
 *
 * @ignore
 */
const LINES_NOT_EQUAL = new RegExp("[^" + DIFF_EQUAL + "]+");

/**
 * A pattern matching the end of a line or stream.
 *
 * @ignore
 */
const EOL_PATTERN = /\\n|\\0$/;

/**
 * Updates the last context entry to indicate that duplicate lines were skipped.
 *
 * @param {Array} entries the exception context
 * @ignore
 */
function skipDuplicateLines(entries)
{
	entries.push(new ContextLine("", ""));
	entries.push(new ContextLine("", "[...]"));
}

/**
 * @param {string} actualLine   the actual lines
 * @param {string} expectedLine the expected lines
 * @param {string} diffLine     the diff associated with the line
 * @return {boolean} true if the lines being compared are equal to each other
 * @ignore
 */
function linesAreEqual(actualLine, expectedLine, diffLine)
{
	if (diffLine.length !== 0)
		return !LINES_NOT_EQUAL.test(diffLine);
	return actualLine === expectedLine;
}

/**
 * @param {Array<string>} actualLines the lines of the actual value
 * @param {Array<string>} expectedLines the lines of the expected value
 * @return {boolean} true
 * @throws {RangeError} if the number of lines does not match
 * @ignore
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
 * @param {object} actualValue   the actual value
 * @param {string} expectedName  the name of the expected value
 * @param {object} expectedValue the expected value
 * @param {boolean} expectedInMessage true if the expected value is already mentioned in the failure message
 * @param {boolean} mayCompareTypes true if the actual and expected types should be compared if their values
 *   are equal
 * @return {Array} the list of name-value pairs to append to the exception message
 * @throws {TypeError} if <code>actualName</code> or <code>expectedName</code> are not a string
 * @throws {RangeError} if <code>actualName</code> or <code>expectedName</code> are empty; if
 * <code>expectedInMessage</code> is not a boolean
 * @ignore
 */
function getContextForObjects(generator, actualName, actualValue, expectedName, expectedValue,
                              expectedInMessage, mayCompareTypes)
{
	Objects.assertThatTypeOf(generator, "generator", "ContextGenerator");
	Objects.assertThatStringNotEmpty(actualName, "actualName");
	Objects.assertThatStringNotEmpty(expectedName, "expectedName");
	Objects.assertThatTypeOf(expectedInMessage, "expectedInMessage", "boolean");

	const actualType = Objects.getTypeOf(actualValue);
	const expectedType = Objects.getTypeOf(expectedValue);
	if (actualType === "Array" && expectedType === "Array")
	{
		return getContextForArrays(generator, actualName, actualValue, expectedName, expectedValue,
			expectedInMessage);
	}
	// Don't diff booleans
	const typeIsDiffable = (actualType !== "boolean");
	if (!typeIsDiffable || !generator.config.isDiffEnabled())
	{
		const result = [];
		result.push(new ContextLine(actualName, actualValue));
		if (!expectedInMessage)
			result.push(new ContextLine(expectedName, expectedValue));
		return result;
	}
	const actualAsString = generator.config.convertToString(actualValue);
	const expectedAsString = generator.config.convertToString(expectedValue);
	const lines = generator.diffGenerator.diff(actualAsString, expectedAsString);
	const actualLines = lines.getActualLines();
	const expectedLines = lines.getExpectedLines();
	const diffLines = lines.getDiffLines();
	console.assert(requireThatNumberOfLinesAreEqual(actualLines, expectedLines));
	const numberOfLines = actualLines.length;
	const result = [];
	if (numberOfLines === 1)
	{
		const actualLine = actualLines[0];
		const expectedLine = expectedLines[0];
		let diffLine;
		if (diffLines.length === 0)
			diffLine = "";
		else
			diffLine = diffLines[0];
		const stringsAreEqual = linesAreEqual(actualLine, expectedLine, diffLine);
		result.push(new ContextLine("", ""));
		result.push(new ContextLine(actualName, actualLine));
		if (diffLine.length !== 0 && !stringsAreEqual)
			result.push(new ContextLine("Diff", diffLine));
		result.push(new ContextLine(expectedName, expectedLine));
		if (mayCompareTypes && linesAreEqual(actualLine, expectedLine, diffLine))
		{
			// If the String representation of the values is equal, output getClass(), hashCode(),
			// or System.identityHashCode()] that differ.
			result.push(...compareTypes(generator, actualName, actualValue, expectedName, expectedValue));
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
		const currentLineIsEqual = linesAreEqual(actualLine, expectedLine, diffLine);
		if (i !== 0 && i !== numberOfLines - 1 && currentLineIsEqual)
		{
			// Skip identical lines, unless they are the first or last line.
			skippedDuplicates = true;
			++actualLineNumber;
			++expectedLineNumber;
			continue;
		}
		let actualNameForLine;
		if (generator.diffGenerator.isEmpty(actualLine))
			actualNameForLine = actualName;
		else
		{
			actualNameForLine = actualName + "@" + actualLineNumber;
			if (EOL_PATTERN.test(actualLine))
				++actualLineNumber;
		}
		if (skippedDuplicates)
		{
			skippedDuplicates = false;
			skipDuplicateLines(result);
		}
		result.push(new ContextLine("", ""));
		result.push(new ContextLine(actualNameForLine, actualLine));
		if (diffLine.length !== 0 && !currentLineIsEqual)
			result.push(new ContextLine("Diff", diffLine));
		let expectedNameForLine;
		if (generator.diffGenerator.isEmpty(expectedLine))
			expectedNameForLine = expectedName;
		else
		{
			expectedNameForLine = expectedName + "@" + expectedLineNumber;
			if (EOL_PATTERN.test(expectedLine))
				++expectedLineNumber;
		}
		result.push(new ContextLine(expectedNameForLine, expectedLine));
	}
	return result;
}

/* eslint-disable max-statements */
/**
 * @param {ContextGenerator} generator the instance of <code>ContextGenerator</code> to run against
 * @param {string} actualName    the name of the actual value
 * @param {object} actualValue   the actual value
 * @param {string} expectedName  the name of the expected value
 * @param {object} expectedValue the expected value
 * @param {boolean} expectedInMessage true if the expected value is already mentioned in the failure message
 * @return {Array} the list of name-value pairs to append to the exception message
 * @throws {TypeError} if <code>actualName</code> or <code>expectedName</code> are not a string
 * @throws {RangeError} if <code>actualName</code> or <code>expectedName</code> are empty; if
 * <code>expectedInMessage</code> is not a boolean
 * @ignore
 */
function getContextForArrays(generator, actualName, actualValue, expectedName, expectedValue,
                             expectedInMessage)
{
	Objects.assertThatTypeOf(generator, "generator", "ContextGenerator");
	Objects.assertThatStringNotEmpty(actualName, "actualName");
	Objects.assertThatTypeOf(actualValue, "actualValue", "Array");
	Objects.assertThatStringNotEmpty(expectedName, "expectedName");
	Objects.assertThatTypeOf(expectedValue, "expectedValue", "Array");
	Objects.assertThatTypeOf(expectedInMessage, "expectedInMessage", "boolean");

	if (!generator.config.isDiffEnabled())
	{
		const result = [];
		result.push(new ContextLine(actualName, actualValue));
		if (!expectedInMessage)
			result.push(new ContextLine(expectedName, expectedValue));
		return result;
	}
	const actualSize = actualValue.length;
	const expectedSize = expectedValue.length;
	const maxSize = Math.max(actualSize, expectedSize);

	const result = [];
	// Indicates if the previous index was equal
	let skippedDuplicates = false;
	let actualIndex = 0;
	let expectedIndex = 0;
	for (let i = 0; i < maxSize; ++i)
	{
		let elementsAreEqual = true;
		let actualValueAsString;
		let actualNameForElement;
		if (i < actualSize)
		{
			actualValueAsString = generator.config.convertToString(actualValue[i]);
			actualNameForElement = actualName + "[" + actualIndex + "]";
			++actualIndex;
		}
		else
		{
			actualValueAsString = "";
			actualNameForElement = actualName;
			elementsAreEqual = false;
		}
		let expectedValueAsString;
		let expectedNameForElement;
		if (i < expectedSize)
		{
			expectedValueAsString = generator.config.convertToString(expectedValue[i]);
			expectedNameForElement = expectedName + "[" + expectedIndex + "]";
			++expectedIndex;
		}
		else
		{
			expectedValueAsString = "";
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
			skipDuplicateLines(result);
		}
		result.push(...getContextForObjects(generator, actualNameForElement, actualValueAsString,
			expectedNameForElement, expectedValueAsString, false, false));
	}
	return result;
}

/**
 * @param {ContextGenerator} generator the instance of <code>ContextGenerator</code> to run against
 * @param {string} actualName    the name of the actual value
 * @param {object|null} actualValue   the actual value
 * @param {string} expectedName  the name of the expected value
 * @param {object|null} expectedValue the expected value
 * @return {Array<ContextLine>} the list of name-value pairs to append to the exception message
 * @throws {TypeError} if <code>actualName</code> or <code>expectedName</code> are null
 */
function compareTypes(generator, actualName, actualValue, expectedName, expectedValue)
{
	const actualType = Objects.getTypeOf(actualValue);
	const expectedType = Objects.getTypeOf(expectedValue);
	if (actualType !== expectedType)
	{
		return getContextForObjects(generator, actualName + ".class", actualType,
			expectedName + ".class", expectedType, false, false);
	}
	return [];
}

/* eslint-enabled max-statements */

/**
 * Returns the difference between two values as an exception context.
 *
 * @ignore
 */
class ContextGenerator
{
	/**
	 * @param {Configuration} configuration the instance configuration
	 * @throws AssertionError if <code>configuration</code> is null
	 */
	constructor(configuration)
	{
		Objects.assertThatTypeOf(configuration, "configuration", "Configuration");

		Object.defineProperty(this, "config",
			{
				value: configuration
			});
		Object.defineProperty(this, "diffGenerator",
			{
				value: new DiffGenerator(configuration.getGlobalConfiguration().getTerminalEncoding())
			});
	}

	/**
	 * @param {string} actualName    the name of the actual value
	 * @param {object} actualValue   the actual value
	 * @param {string} expectedName  the name of the expected value
	 * @param {object} expectedValue the expected value
	 * @param {boolean} expectedInMessage true if the expected value is already mentioned in the failure message
	 * @return {Array<ContextLine>} the list of name-value pairs to append to the exception message
	 */
	getContext(actualName, actualValue, expectedName, expectedValue, expectedInMessage)
	{
		return getContextForObjects(this, actualName, actualValue, expectedName, expectedValue,
			expectedInMessage, false);
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ContextGenerator as default};