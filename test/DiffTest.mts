import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {
	Configuration,
	EOS_MARKER,
	NEWLINE_MARKER,
	Node16Colors,
	Node16MillionColors,
	Node256Colors,
	TerminalEncoding,
	TextOnly
} from "../src/internal/internal.mjs";
import {Requirements} from "../src/index.mjs";
import {TestGlobalConfiguration} from "./TestGlobalConfiguration.mjs";


suite("DiffTest", () =>
{
	/**
	 * Ensure that diffs delete before inserting.
	 */
	test("diffDeleteThenInsert", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "actual";
		const expected = "expected";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual  : actual" +
				TextOnly.DIFF_PADDING.repeat("expected".length) + EOS_MARKER + "\n" +
				"Diff    : " + TextOnly.DIFF_DELETE.repeat("actual".length) +
				TextOnly.DIFF_INSERT.repeat("expected".length) + TextOnly.DIFF_EQUAL.repeat(EOS_MARKER.length) + "\n" +
				"Expected: " + " ".repeat("actual".length) + "expected" + EOS_MARKER;
			assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	/**
	 * Ensure that whitespace differences are easy to understand in text-mode diffs.
	 */
	test("diffMissingWhitespace", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "\"key\": \"value \"";
		const expected = "\"key\": \"value\"";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual  : \"key\": \"value \"" + EOS_MARKER + "\n" +
				"Diff    : " + TextOnly.DIFF_EQUAL.repeat(13) + TextOnly.DIFF_DELETE +
				TextOnly.DIFF_EQUAL.repeat(1 + EOS_MARKER.length) + "\n" +
				"Expected: \"key\": \"value \"" + EOS_MARKER;
			assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	/**
	 * Test multi-line text-mode diffs where actual contains a leading newline character.
	 */
	test("diffNewlinePrefix", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "\nactual";
		const expected = "expected";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual@0  : " + NEWLINE_MARKER +
				TextOnly.DIFF_PADDING.repeat(("expected" + EOS_MARKER).length) + "\n" +
				"Diff      : " + TextOnly.DIFF_DELETE.repeat(NEWLINE_MARKER.length) +
				TextOnly.DIFF_INSERT.repeat("expected".length) + TextOnly.DIFF_EQUAL.repeat(EOS_MARKER.length) + "\n" +
				"Expected@0: " + TextOnly.DIFF_PADDING.repeat(NEWLINE_MARKER.length) + "expected" + EOS_MARKER + "\n" +
				"\n" +
				"Actual@1  : actual" + EOS_MARKER + "\n" +
				"Diff      : " + TextOnly.DIFF_DELETE.repeat("actual".length) +
				TextOnly.DIFF_EQUAL.repeat(EOS_MARKER.length) + "\n" +
				"Expected  : " + TextOnly.DIFF_PADDING.repeat(("actual" + EOS_MARKER).length);
			assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	/**
	 * Test multi-line text-mode diffs where actual contains a trailing newline character.
	 */
	test("diffNewlinePostfix", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "actual\n";
		const expected = "expected";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual@0  : actual" + NEWLINE_MARKER +
				TextOnly.DIFF_PADDING.repeat(("expected" + EOS_MARKER).length) + "\n" +
				"Diff      : " + TextOnly.DIFF_DELETE.repeat(("actual" + NEWLINE_MARKER).length) +
				TextOnly.DIFF_INSERT.repeat("expected".length) + TextOnly.DIFF_EQUAL.repeat(NEWLINE_MARKER.length) +
				"\n" +
				"Expected@0: " + TextOnly.DIFF_PADDING.repeat(("actual" + NEWLINE_MARKER).length) + "expected" +
				EOS_MARKER + "\n" +
				"\n" +
				"Actual@1  : " + EOS_MARKER + "\n" +
				"Expected  : " + TextOnly.DIFF_PADDING.repeat(EOS_MARKER.length);
			assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	/**
	 * Test multi-line text-mode diffs containing matching text across different lines.
	 */
	test("matchAcrossLines", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "\n\nvalue";
		const expected = "value";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual@0  : " + NEWLINE_MARKER +
				TextOnly.DIFF_PADDING.repeat(("value" + EOS_MARKER).length) + "\n" +
				"Diff      : " + TextOnly.DIFF_DELETE.repeat(NEWLINE_MARKER.length) +
				TextOnly.DIFF_EQUAL.repeat(("value" + EOS_MARKER).length) + "\n" +
				"Expected@0: " + TextOnly.DIFF_PADDING.repeat(NEWLINE_MARKER.length) + "value" + EOS_MARKER + "\n" +
				"\n" +
				"Actual@1  : " + NEWLINE_MARKER + "\n" +
				"Diff      : " + TextOnly.DIFF_DELETE.repeat(NEWLINE_MARKER.length) + "\n" +
				"Expected  : " + TextOnly.DIFF_PADDING.repeat(NEWLINE_MARKER.length) + "\n" +
				"\n" +
				"Actual@2  : value" + EOS_MARKER + "\n" +
				"Expected  : " + TextOnly.DIFF_PADDING.repeat(("value" + EOS_MARKER).length);
			assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	/**
	 * Ensures that duplicate lines in the middle of a diff are omitted.
	 */
	test("skipDuplicateLinesTest", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "1\n2\n3\n4\n5";
		const expected = "1\n2\n9\n4\n5";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual@0  : 1" + NEWLINE_MARKER + "\n" +
				"Expected@0: 1" + NEWLINE_MARKER + "\n" +
				"\n" +
				"[...]\n" +
				"\n" +
				"Actual@2  : 3" + TextOnly.DIFF_PADDING + NEWLINE_MARKER + "\n" +
				"Diff      : " + TextOnly.DIFF_DELETE + TextOnly.DIFF_INSERT +
				TextOnly.DIFF_EQUAL.repeat(NEWLINE_MARKER.length) + "\n" +
				"Expected@2: " + TextOnly.DIFF_PADDING + "9" + NEWLINE_MARKER + "\n" +
				"\n" +
				"[...]\n" +
				"\n" +
				"Actual@4  : 5\\0\n" +
				"Expected@4: 5\\0";
			assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	/**
	 * A test suggested by Charles Drolet.
	 */
	test("charlesTest", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "The dog is brown";
		const expected = "The fox is down";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual  : The dog" +
				TextOnly.DIFF_PADDING.repeat("fox".length) + " is br" + TextOnly.DIFF_PADDING + "own" + EOS_MARKER +
				"\n" +
				"Diff    : " + TextOnly.DIFF_EQUAL.repeat(4) + TextOnly.DIFF_DELETE.repeat(3) +
				TextOnly.DIFF_INSERT.repeat(3) + TextOnly.DIFF_EQUAL.repeat(4) +
				TextOnly.DIFF_DELETE.repeat(2) + TextOnly.DIFF_INSERT +
				TextOnly.DIFF_EQUAL.repeat(3 + EOS_MARKER.length) + "\n" +
				"Expected: The " + TextOnly.DIFF_PADDING.repeat("dog".length) + "fox is " +
				TextOnly.DIFF_PADDING.repeat("br".length) + "down" + EOS_MARKER;
			assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	test("smallChangeBeforeWord", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "you like me?";
		const expected = "Don't you like me?";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual  : " + TextOnly.DIFF_PADDING.repeat("Don't ".length) + "you like me?" +
				EOS_MARKER + "\n" +
				"Diff    : " + TextOnly.DIFF_INSERT.repeat("Don't ".length) +
				TextOnly.DIFF_EQUAL.repeat("you like me?".length + EOS_MARKER.length) + "\n" +
				"Expected: Don't you like me?" + EOS_MARKER;
			assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	test("smallChangeInMiddle", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "I lice dogs";
		const expected = "I like dogs";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual  : I lic" + TextOnly.DIFF_PADDING + "e dogs" + EOS_MARKER + "\n" +
				"Diff    : " + TextOnly.DIFF_EQUAL.repeat("I li".length) + TextOnly.DIFF_DELETE + TextOnly.DIFF_INSERT +
				TextOnly.DIFF_EQUAL.repeat("e dogs".length + EOS_MARKER.length) + "\n" +
				"Expected: I li" + TextOnly.DIFF_PADDING + "ke dogs" + EOS_MARKER;
			assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	test("smallChangeAfterWord", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "I like dog";
		const expected = "I like dogs";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual  : I like dog" + TextOnly.DIFF_PADDING + EOS_MARKER + "\n" +
				"Diff    : " + TextOnly.DIFF_EQUAL.repeat("I like dog".length) + TextOnly.DIFF_INSERT +
				TextOnly.DIFF_EQUAL.repeat(EOS_MARKER.length) + "\n" +
				"Expected: I like dogs" + EOS_MARKER;
			assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	test("largeChangeInMiddle", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "I lices dogs";
		const expected = "I like dogs";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual  : I lices" + TextOnly.DIFF_PADDING.repeat("like".length) + " dogs" +
				EOS_MARKER + "\n" +
				"Diff    : " + TextOnly.DIFF_EQUAL.repeat("I ".length) + TextOnly.DIFF_DELETE.repeat("lices".length) +
				TextOnly.DIFF_INSERT.repeat("like".length) +
				TextOnly.DIFF_EQUAL.repeat(" dogs".length + EOS_MARKER.length) + "\n" +
				"Expected: I " + TextOnly.DIFF_PADDING.repeat("lices".length) + "like dogs" + EOS_MARKER;
			assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	/**
	 * Ensure that DIFF notices that non-terminal lines are different when they only contain whitespace.
	 */
	test("diffMiddleWhitespace", () =>
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
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = "actual must be equal to " + expected + ".\n" +
				"\n" +
				"Actual@0  : one" + NEWLINE_MARKER + "\n" +
				"Expected@0: one" + NEWLINE_MARKER + "\n" +
				"\n" +
				"Actual@1  : " + TextOnly.DIFF_PADDING.repeat(3) + NEWLINE_MARKER + "\n" +
				"Diff      : " + TextOnly.DIFF_INSERT.repeat(3) + TextOnly.DIFF_PADDING.repeat(NEWLINE_MARKER.length) +
				"\n" +
				"Expected@1: " + TextOnly.DIFF_PADDING.repeat(3) + NEWLINE_MARKER + "\n" +
				"\n" +
				"Actual@2  : three" + EOS_MARKER + "\n" +
				"Expected@2: three" + EOS_MARKER;
			assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	test("arrayOfIntegers", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		try
		{
			const actual = [1, 2, 3, 4, 5];
			const expected = [1, 2, 9, 4, 5];
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual[0]  : 1" + EOS_MARKER + "\n" +
				"Expected[0]: 1" + EOS_MARKER + "\n" +
				"\n" +
				"[...]\n" +
				"\n" +
				"Actual[2]  : 3" + TextOnly.DIFF_PADDING.repeat(1) + EOS_MARKER + "\n" +
				"Diff       : " + TextOnly.DIFF_DELETE + TextOnly.DIFF_INSERT +
				TextOnly.DIFF_EQUAL.repeat(NEWLINE_MARKER.length) + "\n" +
				"Expected[2]: " + TextOnly.DIFF_PADDING + "9" + EOS_MARKER + "\n" +
				"\n" +
				"[...]\n" +
				"\n" +
				"Actual[4]  : 5" + EOS_MARKER + "\n" +
				"Expected[4]: 5" + EOS_MARKER;
			assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	test("arrayOfStrings", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);
		try
		{
			const actual = ["1", "foo\nbar", "3"];
			const expected = ["1", "bar\nfoo", "3"];
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual[0]    : 1" + EOS_MARKER + "\n" +
				"Expected[0]  : 1" + EOS_MARKER + "\n" +
				"\n" +
				"Actual[1]@0  : " + TextOnly.DIFF_PADDING.repeat(("bar" + NEWLINE_MARKER).length) + "foo" +
				NEWLINE_MARKER + "\n" +
				"Diff         : " + TextOnly.DIFF_INSERT.repeat(("bar" + NEWLINE_MARKER).length) +
				TextOnly.DIFF_EQUAL.repeat("foo".length) + TextOnly.DIFF_DELETE.repeat(NEWLINE_MARKER.length) + "\n" +
				"Expected[1]@0: bar" + NEWLINE_MARKER + TextOnly.DIFF_PADDING.repeat(("foo" + NEWLINE_MARKER).length) +
				"\n" +
				"\n" +
				"Actual[1]@1  : " + TextOnly.DIFF_PADDING.repeat("foo".length) + "bar" + EOS_MARKER + "\n" +
				"Diff         : " + TextOnly.DIFF_EQUAL.repeat("foo".length) +
				TextOnly.DIFF_DELETE.repeat("bar".length) + TextOnly.DIFF_EQUAL.repeat(EOS_MARKER.length) + "\n" +
				"Expected[1]@1: foo" + TextOnly.DIFF_PADDING.repeat("bar".length) + EOS_MARKER + "\n" +
				"\n" +
				"Actual[2]    : 3" + EOS_MARKER + "\n" +
				"Expected[2]  : 3" + EOS_MARKER;
			assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	/**
	 * Ensure that text-mode diffs generate the expected value.
	 */
	test("diffArraySize", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "int[6]";
		const expected = "int[5]";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const scheme = new TextOnly();

			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual  : int[6" + scheme.decoratePadding(1) + "]" + EOS_MARKER + "\n" +
				"Diff    : " + TextOnly.DIFF_EQUAL.repeat(4) + TextOnly.DIFF_DELETE + TextOnly.DIFF_INSERT +
				TextOnly.DIFF_EQUAL.repeat(1 + EOS_MARKER.length) + "\n" +
				"Expected: int[" + scheme.decoratePadding(1) + "5]" + EOS_MARKER;
			assert(actualMessage.includes(expectedMessage),
				"Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	/**
	 * Ensures that DiffGenerator.ReduceDeltasPerWord does not modify EQUAL deltas between matches. Meaning,
	 * it should not collapse "-same-" into the [DELETE, INSERT] pair associated with "different"/"maybe".
	 */
	test("equalDeltaAfterReduceDeltasPerWord", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "different-same-different";
		const expected = "maybe-same-maybe";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual  : different" + TextOnly.DIFF_PADDING.repeat("maybe".length) +
				"-same-different" + TextOnly.DIFF_PADDING.repeat("maybe".length) + EOS_MARKER +
				"\n" +
				"Diff    : " + TextOnly.DIFF_DELETE.repeat("different".length) +
				TextOnly.DIFF_INSERT.repeat("maybe".length) + TextOnly.DIFF_EQUAL.repeat("-same-".length) +
				TextOnly.DIFF_DELETE.repeat("different".length) + TextOnly.DIFF_INSERT.repeat("maybe".length) +
				TextOnly.DIFF_EQUAL.repeat(NEWLINE_MARKER.length) + "\n" +
				"Expected: " + TextOnly.DIFF_PADDING.repeat("different".length) + "maybe-same-" +
				TextOnly.DIFF_PADDING.repeat("different".length) + "maybe" + EOS_MARKER;
			assert(actualMessage.includes(expectedMessage),
				"Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	/**
	 * When processing DELETE "same\nactual" followed by INSERT "same\nexpected", ensure that actual and
	 * expected keep track of different "diff" line numbers. Otherwise, the DELETE advances to the next line
	 * and INSERT updates the diff of the wrong line number. We end up with:
	 *
	 * <pre><code>
	 * Actual@1  : same\n
	 * Diff      : ------
	 * Expected  :
	 *
	 * Actual@2  : actual
	 * Diff      : ------++++++
	 * Expected@1:       same\n
	 * </code></pre>
	 * <p>
	 * instead of:
	 *
	 * <pre><code>
	 * Actual    : same\n
	 * Expected  : same\n
	 * </code></pre>
	 */
	test("independentDiffLineNumbers", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "actual\nsame\nactual actual";
		const expected = "expected\nsame\nexpected expected";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual@0  : actual" + TextOnly.DIFF_PADDING.repeat("expected".length) +
				NEWLINE_MARKER + "\n" +
				"Diff      : " + TextOnly.DIFF_DELETE.repeat("actual".length) +
				TextOnly.DIFF_INSERT.repeat("expected".length) + TextOnly.DIFF_EQUAL.repeat(NEWLINE_MARKER.length) +
				"\n" +
				"Expected@0: " + TextOnly.DIFF_PADDING.repeat("actual".length) + "expected" + NEWLINE_MARKER + "\n" +
				"\n" +
				"[...]\n" +
				"\n" +
				"Actual@2  : actual " + TextOnly.DIFF_PADDING.repeat("expected".length) + "actual" +
				TextOnly.DIFF_PADDING.repeat("expected".length) + EOS_MARKER + "\n" +
				"Diff      : " + TextOnly.DIFF_DELETE.repeat("actual".length) +
				TextOnly.DIFF_INSERT.repeat("expected".length) + TextOnly.DIFF_EQUAL +
				TextOnly.DIFF_DELETE.repeat("actual".length) + TextOnly.DIFF_INSERT.repeat("expected".length) +
				TextOnly.DIFF_EQUAL.repeat(EOS_MARKER.length) + "\n" +
				"Expected@2: " + TextOnly.DIFF_PADDING.repeat("actual".length) + "expected " +
				TextOnly.DIFF_PADDING.repeat("actual".length) + "expected" + EOS_MARKER;
			assert(actualMessage.includes(expectedMessage),
				"Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	/**
	 * Ensures that "expected" is included in the error message when it is shorter than the terminal width.
	 */
	test("expectedShorterThanTerminalWidth", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE,
			"actual must be equal to expected.".length + 1);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "actual";
		const expected = "expected";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			assert(actualMessage.includes("must be equal to " + expected),
				"Actual:\n" + actualMessage);
		}
	});

	/**
	 * Ensures that "expected" is excluded from the error message when it is equal to the terminal width.
	 */
	test("expectedEqualToTerminalWidth", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE,
			"actual must be equal to expected.".length);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "actual";
		const expected = "expected";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			assert(!actualMessage.includes("must be equal to " + expected),
				"Actual:\n" + actualMessage);
		}
	});

	/**
	 * Ensures that "expected" is excluded from the error message when it is equal to the terminal width.
	 */
	test("expectedLongerThanTerminalWidth", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE,
			"actual must be equal to expected.".length - 1);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "actual";
		const expected = "expected";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			assert(!actualMessage.includes("must be equal to " + expected),
				"Actual:\n" + actualMessage);
		}
	});

	/**
	 * Ensure that NODE_16_COLORS diffs generate the expected value.
	 */
	test("diffArraySize_16Colors", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NODE_16_COLORS);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "int[6]";
		const expected = "int[5]";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const scheme = new Node16Colors();

			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual  : " + scheme.decorateEqualText("int[") +
				scheme.decorateDeletedText("6") + scheme.decoratePadding(1) +
				scheme.decorateEqualText("]") + EOS_MARKER + "\n" +
				"Expected: " + scheme.decorateEqualText("int[") +
				scheme.decoratePadding(1) + scheme.decorateInsertedText("5") +
				scheme.decorateEqualText("]") + EOS_MARKER;
			assert(actualMessage.includes(expectedMessage),
				"Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	/**
	 * Ensure that NODE_256_COLORS diffs generate the expected value.
	 */
	test("diffArraySize_256Colors", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NODE_256_COLORS);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "int[6]";
		const expected = "int[5]";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const scheme = new Node256Colors();

			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual  : " + scheme.decorateEqualText("int[") +
				scheme.decorateDeletedText("6") + scheme.decoratePadding(1) +
				scheme.decorateEqualText("]") + EOS_MARKER + "\n" +
				"Expected: " + scheme.decorateEqualText("int[") +
				scheme.decoratePadding(1) + scheme.decorateInsertedText("5") +
				scheme.decorateEqualText("]") + EOS_MARKER;
			assert(actualMessage.includes(expectedMessage),
				"Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	/**
	 * Ensure that NODE_16MILLION_COLORS diffs generate the expected value.
	 */
	test("diffArraySize_16MillionColors", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NODE_16MILLION_COLORS);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "int[6]";
		const expected = "int[5]";
		try
		{
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const scheme = new Node16MillionColors();

			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual  : " + scheme.decorateEqualText("int[") +
				scheme.decorateDeletedText("6") + scheme.decoratePadding(1) +
				scheme.decorateEqualText("]") + EOS_MARKER + "\n" +
				"Expected: " + scheme.decorateEqualText("int[") +
				scheme.decoratePadding(1) + scheme.decorateInsertedText("5") + scheme.decorateEqualText("]") +
				EOS_MARKER;
			assert(actualMessage.includes(expectedMessage),
				"Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});

	/**
	 * Make sure that we skip duplicate lines even when the diff contains colors.
	 */
	test("emptyLineNumber_16Colors", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NODE_16_COLORS);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		try
		{
			const actual = "foo\nbar";
			const expected = "bar";
			requirements.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw exception");
		}
		catch (e)
		{
			const scheme = new Node16Colors();

			const actualMessage = (e as Error).message;
			const expectedMessage = "Actual@0  : " + scheme.decorateDeletedText("foo" + NEWLINE_MARKER) +
				scheme.decoratePadding(("bar" + EOS_MARKER).length) + "\n" +
				"Expected@0: " + scheme.decoratePadding(("foo" + NEWLINE_MARKER).length) +
				scheme.decorateEqualText("bar" + EOS_MARKER) + "\n" +
				"\n" +
				"Actual@1  : " + scheme.decorateEqualText("bar" + EOS_MARKER) + "\n" +
				"Expected  : " + scheme.decoratePadding(("bar" + EOS_MARKER).length);
			assert(actualMessage.includes(expectedMessage), "Expected:\n" + expectedMessage +
				"\n****************\nActual:\n" + actualMessage);
		}
	});
});