import test from "tape-catch";
import {EOS_MARKER} from "../src/internal/diff/DiffGenerator.js";
import {NEWLINE_MARKER} from "../src/internal/diff/DiffConstants.js";
import {
	default as TextOnly,
	DIFF_DELETE,
	DIFF_EQUAL,
	DIFF_INSERT,
	DIFF_PADDING
} from "../src/internal/diff/TextOnly.js";
import Requirements from "../src/Requirements.js";
import TerminalEncoding from "../src/TerminalEncoding.js";
import TestGlobalConfiguration from "../src/internal/TestGlobalConfiguration.js";
import Configuration from "../src/Configuration.js";

/**
 * Ensure that text-mode diffs generate the expected value.
 */
test("DiffTest.diffArraySize", function(t)
{
	const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
	const configuration = new Configuration(globalConfiguration);
	const requirements = new Requirements(configuration);

	const actual = "int[6]";
	const expected = "int[5]";
	try
	{
		requirements.requireThat(actual, "actual").isEqualTo(expected);
	}
	catch (e)
	{
		const scheme = new TextOnly();

		const actualMessage = e.message;
		const expectedMessage = "Actual  : int[6" + scheme.decoratePadding(1) + "]" + EOS_MARKER + "\n" +
			"Diff    : " + DIFF_EQUAL.repeat(4) + DIFF_DELETE + DIFF_INSERT +
			DIFF_EQUAL.repeat(1 + EOS_MARKER.length) + "\n" +
			"Expected: int[" + scheme.decoratePadding(1) + "5]" + EOS_MARKER;
		t.assert(actualMessage.includes(expectedMessage),
			"Expected:\n" + expectedMessage +
			"\n\nActual:\n" + actualMessage);
	}
	t.end();
});


/**
 * Ensure that diffs delete before inserting.
 */
test("DiffTest.diffDeleteThenInsert", function(t)
{
	const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
	const configuration = new Configuration(globalConfiguration);
	const requirements = new Requirements(configuration);

	const actual = "actual";
	const expected = "expected";
	try
	{
		requirements.requireThat(actual, "actual").isEqualTo(expected);
	}
	catch (e)
	{
		const actualMessage = e.message;
		const expectedMessage = "Actual  : actual" +
			DIFF_PADDING.repeat("expected".length) + EOS_MARKER + "\n" +
			"Diff    : " + DIFF_DELETE.repeat("actual".length) +
			DIFF_INSERT.repeat("expected".length) + DIFF_EQUAL.repeat(EOS_MARKER.length) + "\n" +
			"Expected: " + " ".repeat("actual".length) + "expected" + EOS_MARKER;
		t.assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
			"\n\nActual:\n" + actualMessage);
	}
	t.end();
});

/**
 * Ensure that whitespace differences are easy to understand in text-mode diffs.
 */
test("DiffTest.diffMissingWhitespace", function(t)
{
	const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
	const configuration = new Configuration(globalConfiguration);
	const requirements = new Requirements(configuration);

	const actual = "\"key\": \"value \"";
	const expected = "\"key\": \"value\"";
	try
	{
		requirements.requireThat(actual, "actual").isEqualTo(expected);
	}
	catch (e)
	{
		const actualMessage = e.message;
		const expectedMessage = "Actual  : \"key\": \"value \"" + EOS_MARKER + "\n" +
			"Diff    : " + DIFF_EQUAL.repeat(13) + DIFF_DELETE +
			DIFF_EQUAL.repeat(1 + EOS_MARKER.length) + "\n" +
			"Expected: \"key\": \"value \"" + EOS_MARKER;
		t.assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
			"\n\nActual:\n" + actualMessage);
	}
	t.end();
});

/**
 * Test multi-line text-mode diffs where actual contains a leading newline character.
 */
test("DiffTest.diffNewlinePrefix", function(t)
{
	const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
	const configuration = new Configuration(globalConfiguration);
	const requirements = new Requirements(configuration);

	const actual = "\nactual";
	const expected = "expected";
	try
	{
		requirements.requireThat(actual, "actual").isEqualTo(expected);
	}
	catch (e)
	{
		const actualMessage = e.message;
		const expectedMessage = "Actual@1  : " + NEWLINE_MARKER + "\n" +
			"Diff      : " + DIFF_DELETE.repeat(NEWLINE_MARKER.length) + "\n" +
			"Expected  : " + DIFF_PADDING.repeat(NEWLINE_MARKER.length) + "\n" +
			"\n" +
			"Actual@2  : actual" + DIFF_PADDING.repeat("expected".length) +
			EOS_MARKER + "\n" +
			"Diff      : " + DIFF_DELETE.repeat("actual".length) +
			DIFF_INSERT.repeat("expected".length) +
			DIFF_EQUAL.repeat(EOS_MARKER.length) + "\n" +
			"Expected@1: " + DIFF_PADDING.repeat("actual".length) + "expected" +
			EOS_MARKER;
		t.assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
			"\n\nActual:\n" + actualMessage);
	}
	t.end();
});

/**
 * Test multi-line text-mode diffs where actual contains a trailing newline character.
 */
test("DiffTest.diffNewlinePostfix", function(t)
{
	const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
	const configuration = new Configuration(globalConfiguration);
	const requirements = new Requirements(configuration);

	const actual = "actual\n";
	const expected = "expected";
	try
	{
		requirements.requireThat(actual, "actual").isEqualTo(expected);
	}
	catch (e)
	{
		const actualMessage = e.message;
		const expectedMessage = "Actual@1  : actual" + NEWLINE_MARKER + "\n" +
			"Diff      : " + DIFF_DELETE.repeat("actual".length + NEWLINE_MARKER.length) +
			"\n" +
			"Expected  : " + DIFF_PADDING.repeat("actual".length + NEWLINE_MARKER.length) + "\n" +
			"\n" +
			"Actual@2  : " + DIFF_PADDING.repeat("expected".length) + EOS_MARKER +
			"\n" +
			"Diff      : " + DIFF_INSERT.repeat("expected".length) + DIFF_EQUAL.repeat(EOS_MARKER.length) +
			"\n" +
			"Expected@1: expected" + EOS_MARKER;
		t.assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
			"\n\nActual:\n" + actualMessage);
	}
	t.end();
});

/**
 * Test multi-line text-mode diffs containing matching text across different lines.
 */
test("DiffTest.matchAcrossLines", function(t)
{
	const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
	const configuration = new Configuration(globalConfiguration);
	const requirements = new Requirements(configuration);

	const actual = "\n\nvalue";
	const expected = "value";
	try
	{
		requirements.requireThat(actual, "actual").isEqualTo(expected);
	}
	catch (e)
	{
		const actualMessage = e.message;
		const expectedMessage = "Actual@1  : " + NEWLINE_MARKER + "\n" +
			"Diff      : " + DIFF_DELETE.repeat(NEWLINE_MARKER.length) + "\n" +
			"Expected  : " + DIFF_PADDING.repeat(NEWLINE_MARKER.length) + "\n" +
			"\n" +
			"Actual@2  : " + NEWLINE_MARKER + "\n" +
			"Diff      : " + DIFF_DELETE.repeat(NEWLINE_MARKER.length) + "\n" +
			"Expected  : " + DIFF_PADDING.repeat(NEWLINE_MARKER.length) + "\n" +
			"\n" +
			"Actual@3  : value" + EOS_MARKER + "\n" +
			"Expected@1: value" + EOS_MARKER;
		t.assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
			"\n\nActual:\n" + actualMessage);
	}
	t.end();
});

/**
 * Ensures that duplicate lines in the middle of a diff are omitted.
 */
test("DiffTest.skipDuplicateLinesTest", function(t)
{
	const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
	const configuration = new Configuration(globalConfiguration);
	const requirements = new Requirements(configuration);

	const actual = "1\n2\n3\n4\n5";
	const expected = "1\n2\n9\n4\n5";
	try
	{
		requirements.requireThat(actual, "actual").isEqualTo(expected);
	}
	catch (e)
	{
		const actualMessage = e.message;
		const expectedMessage = "Actual@1  : 1" + NEWLINE_MARKER + "\n" +
			"Expected@1: 1" + NEWLINE_MARKER + "\n" +
			"\n" +
			"[...]\n" +
			"\n" +
			"Actual@3  : 3" + DIFF_PADDING + NEWLINE_MARKER + "\n" +
			"Diff      : " + DIFF_DELETE + DIFF_INSERT +
			DIFF_EQUAL.repeat(NEWLINE_MARKER.length) + "\n" +
			"Expected@3: " + DIFF_PADDING + "9" + NEWLINE_MARKER + "\n" +
			"\n" +
			"[...]\n" +
			"\n" +
			"Actual@5  : 5\\0\n" +
			"Expected@5: 5\\0";
		t.assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
			"\n\nActual:\n" + actualMessage);
	}
	t.end();
});

/**
 * A test suggested by Charles Drolet.
 */
test("DiffTest.charlesTest", function(t)
{
	const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
	const configuration = new Configuration(globalConfiguration);
	const requirements = new Requirements(configuration);

	const actual = "The dog is brown";
	const expected = "The fox is down";
	try
	{
		requirements.requireThat(actual, "actual").isEqualTo(expected);
	}
	catch (e)
	{
		const actualMessage = e.message;
		const expectedMessage = "Actual  : The dog" +
			DIFF_PADDING.repeat("fox".length) + " is br" + DIFF_PADDING + "own" + EOS_MARKER + "\n" +
			"Diff    : " + DIFF_EQUAL.repeat(4) + DIFF_DELETE.repeat(3) + DIFF_INSERT.repeat(3) +
			DIFF_EQUAL.repeat(4) + DIFF_DELETE.repeat(2) + DIFF_INSERT +
			DIFF_EQUAL.repeat(3 + EOS_MARKER.length) + "\n" +
			"Expected: The " + DIFF_PADDING.repeat("dog".length) + "fox is " +
			DIFF_PADDING.repeat("br".length) + "down" + EOS_MARKER;
		t.assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
			"\n\nActual:\n" + actualMessage);
	}
	t.end();
});

/**
 * Ensure that DIFF notices when non-terminal lines are different even if they only contain whitespace.
 */
test("DiffTest.charlesTest", function(t)
{
	const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
	const configuration = new Configuration(globalConfiguration);
	const requirements = new Requirements(configuration);

	const actual = "one\n" +
		"\n" +
		"three";
	const expected = "one\n" +
		"   \n" +
		"three";
	try
	{
		requirements.requireThat(actual, "actual").isEqualTo(expected);
	}
	catch (e)
	{
		const actualMessage = e.message;
		const expectedMessage = "actual must be equal to " + expected + ".\n" +
			"Actual@1  : one" + NEWLINE_MARKER + "\n" +
			"Expected@1: one" + NEWLINE_MARKER + "\n" +
			"\n" +
			"Actual@2  : " + DIFF_PADDING.repeat(3) + NEWLINE_MARKER + "\n" +
			"Diff      : " + DIFF_INSERT.repeat(3) + DIFF_PADDING.repeat(NEWLINE_MARKER.length) + "\n" +
			"Expected@2: " + DIFF_PADDING.repeat(3) + NEWLINE_MARKER + "\n" +
			"\n" +
			"Actual@3  : three" + EOS_MARKER + "\n" +
			"Expected@3: three" + EOS_MARKER;
		t.assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
			"\n\nActual:\n" + actualMessage);
	}
	t.end();
});