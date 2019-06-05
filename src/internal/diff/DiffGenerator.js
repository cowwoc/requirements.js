import GlobalRequirements from "../../GlobalRequirements.js";
import Objects from "../Objects.js";
import DiffMatchPatch from "diff-match-patch";
import TerminalEncoding from "../../TerminalEncoding.js";
import AbstractDiffWriter from "./AbstractDiffWriter.js";
import TextOnly from "./TextOnly.js";
import Node16Colors from "./Node16Colors.js";
import Node256Colors from "./Node256Colors.js";
import Node16MillionColors from "./Node16MillionColors.js";
import DiffResult from "./DiffResult.js";
import {NEWLINE_MARKER, NEWLINE_PATTERN} from "./DiffConstants.js";

/**
 * Character denoting the end of string.
 * @ignore
 */
const EOS_MARKER = "\\0";

/**
 * @param {TerminalEncoding} terminalEncoding the encoding to use for the terminal
 * @return {AbstractDiffWriter} a writer that generates a diff
 * @ignore
 */
function createDiffWriter(terminalEncoding)
{
	switch (terminalEncoding)
	{
		case TerminalEncoding.NONE:
			return new TextOnly();
		case TerminalEncoding.NODE_16_COLORS:
			return new Node16Colors();
		case TerminalEncoding.NODE_256_COLORS:
			return new Node256Colors();
		case TerminalEncoding.NODE_16MILLION_COLORS:
			return new Node16MillionColors();
		default:
			throw new RangeError(Objects.toString(terminalEncoding));
	}
}

/**
 * @param {{0: number, 1: string}} component a diff component
 * @param {AbstractDiffWriter} writer the object to write into
 * @ignore
 */
function writeDiff(component, writer)
{
	const lines = component[1].split(NEWLINE_PATTERN, -1);
	for (let i = 0, size = lines.length; i < size; ++i)
	{
		let text = lines[i];
		if (i < size - 1)
			text += NEWLINE_MARKER;
		if (text !== "")
		{
			switch (component[0])
			{
				case DiffMatchPatch.DIFF_EQUAL:
				{
					writer.keep(text);
					break;
				}
				case DiffMatchPatch.DIFF_INSERT:
				{
					writer.insert(text);
					break;
				}
				case DiffMatchPatch.DIFF_DELETE:
				{
					writer.delete(text);
					break;
				}
				default:
					throw new RangeError(Objects.toString(component[0]));
			}
		}

		if (i < size - 1)
		{
			// (i == size - 1) does not necessarily indicate the end of a line
			writer.writeNewline();
		}
	}
}

/**
 * Generates a diff of two strings.
 */
class DiffGenerator
{
	/**
	 * Generates the diff of two strings.
	 * <p>
	 * <b>NOTE</b>: Colors may be disabled when stdin or stdout are redirected. To override this
	 * behavior, use {@link GlobalRequirements#withConsoleType(ConsoleType)}.
	 *
	 * @param {string} actual   the actual value
	 * @param {string} expected the expected value
	 * @return {DiffResult} the calculated diff
	 * @throws {TypeError} if any of the arguments are null
	 */
	static diff(actual, expected)
	{
		Objects.assertThatTypeOf(actual, "actual", "string");
		Objects.assertThatTypeOf(expected, "expected", "string");

		const diffEngine = new DiffMatchPatch();
		let actualWithEos;
		let expectedWithEos;

		if (NEWLINE_PATTERN.test(actual) || NEWLINE_PATTERN.test(expected))
		{
			// If the input contains multiple lines, add the end of string character
			actualWithEos = actual + EOS_MARKER;
			expectedWithEos = expected + EOS_MARKER;
		}
		else
		{
			actualWithEos = actual;
			expectedWithEos = expected;
		}

		const components = diffEngine.diff_main(actualWithEos, expectedWithEos);
		diffEngine.diff_cleanupSemantic(components);

		const writer = createDiffWriter(GlobalRequirements.getTerminalEncoding());
		for (const component of components)
			writeDiff(component, writer);
		writer.close();
		return new DiffResult(writer.getActualLines(), writer.getMiddleLines(), writer.getExpectedLines(),
			writer.getPaddingMarker());
	}
}

/**
 * Internal property that should not be accessed by users.
 */
GlobalRequirements.diffGenerator = new DiffGenerator();

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {DiffGenerator as default};