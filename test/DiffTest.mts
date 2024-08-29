import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {
	EOS_MARKER,
	NEWLINE_MARKER,
	Node16Colors,
	Node16MillionColors,
	Node256Colors,
	TerminalEncoding,
	TextOnly,
	DIFF_INSERT as INSERT,
	DIFF_DELETE as DELETE,
	DIFF_EQUAL as EQUAL,
	JavascriptValidatorsImpl,
	Configuration,
	MINIMUM_LENGTH_FOR_DIFF
} from "../src/internal/internal.mjs";
import {TestApplicationScope} from "./TestApplicationScope.mjs";

const PADDING = TextOnly.DIFF_PADDING;


/**
 * Pads a string until it is long enough to trigger a diff.
 *
 * @param text the text to process
 * @return the updated text
 */
function EXTEND_LENGTH(text: string)
{
	let padded = text;
	while (padded.length < MINIMUM_LENGTH_FOR_DIFF)
		padded += text;
	return padded;
}

suite("DiffTest", () =>
{
	/**
	 * Ensure that diffs delete before inserting.
	 */
	test("diffDeleteThenInsert", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		const actual = EXTEND_LENGTH("actual");
		const expected = EXTEND_LENGTH("expected");
		try
		{
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual  : "${EXTEND_LENGTH("actual")}"\
${PADDING.repeat(("\"" + EXTEND_LENGTH("expected") + "\"").length)}${EOS_MARKER}
diff    : ${DELETE.repeat(("\"" + EXTEND_LENGTH("actual") + "\"").length)}\
${INSERT.repeat(("\"" + EXTEND_LENGTH("expected") + "\"").length)}\
${EQUAL.repeat(EOS_MARKER.length)}
expected: ${PADDING.repeat(("\"" + EXTEND_LENGTH("actual") + "\"").length)}"\
${EXTEND_LENGTH("expected")}"${EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	/**
	 * Ensure that whitespace differences are easy to understand in text-mode diffs.
	 */
	test("diffMissingWhitespace", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		const actual = `"key": "value "`;
		const expected = `"key": "value"`;
		try
		{
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual  : "\\"key\\": \\"value \\""${EOS_MARKER}
diff    : ${EQUAL.repeat(`"\\"key\\": \\"value`.length)}${DELETE}${EQUAL.repeat(`\\""${EOS_MARKER}`.length)}
expected: "\\"key\\": \\"value \\""${EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	/**
	 * Test multi-line text-mode diffs where actual contains a leading newline character.
	 */
	test("diffNewlinePrefix", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		const actual = "\n" + EXTEND_LENGTH("actual");
		const expected = EXTEND_LENGTH("expected");
		try
		{
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual@0  : "${NEWLINE_MARKER}
diff      : ${DELETE.repeat(("\"" + NEWLINE_MARKER).length)}
expected  : ${PADDING.repeat(("\"" + NEWLINE_MARKER).length)}

actual@1  : ${EXTEND_LENGTH("actual")}"\
${PADDING.repeat(("\"" + EXTEND_LENGTH("expected") + "\"").length)}${EOS_MARKER}
diff      : ${DELETE.repeat((EXTEND_LENGTH("actual") + "\"").length)}\
${INSERT.repeat(("\"" + EXTEND_LENGTH("expected") + "\"").length)}\
${EQUAL.repeat(EOS_MARKER.length)}
expected@0: ${PADDING.repeat((EXTEND_LENGTH("actual") + "\"").length)}\
"${EXTEND_LENGTH("expected")}"${EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	/**
	 * Test multi-line text-mode diffs where actual contains a trailing newline character.
	 */
	test("diffNewlinePostfix", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		const actual = EXTEND_LENGTH("actual") + "\n";
		const expected = EXTEND_LENGTH("expected");
		try
		{
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual@0  : "${EXTEND_LENGTH("actual")}${NEWLINE_MARKER}
diff      : ${DELETE.repeat(("\"" + EXTEND_LENGTH("actual") + NEWLINE_MARKER).length)}
expected  : ${PADDING.repeat(("\"" + EXTEND_LENGTH("actual") + NEWLINE_MARKER).length)}

actual@1  : "${PADDING.repeat(("\"" + EXTEND_LENGTH("expected") + "\"").length)}\
${EOS_MARKER}
diff      : ${DELETE}${INSERT.repeat(("\"" + EXTEND_LENGTH("expected") + "\"").length)}\
${EQUAL.repeat(EOS_MARKER.length)}
expected@0: ${PADDING}"${EXTEND_LENGTH("expected")}"${EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	/**
	 * Test multi-line text-mode diffs containing matching text across different lines.
	 */
	test("matchAcrossLines", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		const actual = EXTEND_LENGTH("prefix") + "\n\nvalue";
		const expected = EXTEND_LENGTH("prefix") + "value";
		try
		{
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual@0  : "${EXTEND_LENGTH("prefix")}${NEWLINE_MARKER}
diff      : ${EQUAL.repeat(("\"" + EXTEND_LENGTH("prefix")).length)}\
${DELETE.repeat(NEWLINE_MARKER.length)}
expected@0: "${EXTEND_LENGTH("prefix")}${PADDING.repeat(NEWLINE_MARKER.length)}

actual@1  : ${NEWLINE_MARKER}
diff      : ${DELETE.repeat(NEWLINE_MARKER.length)}
expected  : ${PADDING.repeat(NEWLINE_MARKER.length)}

actual@2  : value"${EOS_MARKER}
expected@0: value"${EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	/**
	 * Ensures that duplicate lines in the middle of a diff are omitted.
	 */
	test("skipDuplicateLinesTest", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		const actual = "1\n2\n3\n4\n5";
		const expected = "1\n2\n9\n4\n5";
		try
		{
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual@0  : "1${NEWLINE_MARKER}
expected@0: "1${NEWLINE_MARKER}

[...]

actual@2  : 3${PADDING + NEWLINE_MARKER}
diff      : ${DELETE + INSERT + EQUAL.repeat(NEWLINE_MARKER.length)}
expected@2: ${PADDING}9${NEWLINE_MARKER}

[...]

actual@4  : 5"${EOS_MARKER}
expected@4: 5"${EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	/**
	 * A test suggested by Charles Drolet.
	 */
	test("charlesTest", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		const actual = "The dog is brown";
		const expected = "The fox is down";
		try
		{
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual  : "The dog${PADDING.repeat("fox".length)} is br\
${PADDING}own"${EOS_MARKER}
diff    : ${EQUAL.repeat(`"The `.length) + DELETE.repeat("dog".length) + INSERT.repeat("fox".length) +
			EQUAL.repeat(" is ".length) + DELETE.repeat("br".length) + INSERT.repeat("d".length) +
			EQUAL.repeat(`own"${EOS_MARKER}`.length)}
expected: "The ${PADDING.repeat("dog".length)}fox is \
${PADDING.repeat("br".length)}down"${EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	test("smallChangeBeforeWord", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		const actual = "you like me?";
		const expected = "Don't you like me?";
		try
		{
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual  : "${PADDING.repeat("Don't ".length)}you like me?"${EOS_MARKER}
diff    : ${EQUAL.repeat(`"`.length)}${INSERT.repeat("Don't ".length) +
			EQUAL.repeat(`you like me?"`.length + EOS_MARKER.length)}
expected: "Don't you like me?"${EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	test("smallChangeInMiddle", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		const actual = "I lice dogs";
		const expected = "I like dogs";
		try
		{
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual  : "I lic${PADDING}e dogs"${EOS_MARKER}
diff    : ${EQUAL.repeat(`"I li`.length) + DELETE + INSERT +
			EQUAL.repeat(`e dogs"`.length + EOS_MARKER.length)}
expected: "I li${PADDING + `ke dogs"` + EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	test("smallChangeAfterWord", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		const actual = "I like dog";
		const expected = "I like dogs";
		try
		{
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual  : "I like dog${PADDING}"${EOS_MARKER}
diff    : ${EQUAL.repeat(`"I like dog`.length) + INSERT + EQUAL.repeat(`"${EOS_MARKER}`.length)}
expected: "I like dogs"${EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	test("largeChangeInMiddle", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		const actual = "I lices dogs";
		const expected = "I like dogs";
		try
		{
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual  : "I lices${PADDING.repeat("like".length)} dogs"\
${EOS_MARKER}
diff    : ${EQUAL.repeat(`"I `.length)}${DELETE.repeat("lices".length)}${INSERT.repeat("like".length)}\
${EQUAL.repeat(` dogs"${EOS_MARKER}`.length)}
expected: "I ${PADDING.repeat("lices".length)}like dogs"${EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	/**
	 * Ensure that DIFF notices that non-terminal lines are different when they only contain whitespace.
	 */
	test("diffMiddleWhitespace", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		const actual = "one\n" +
			"\n" +
			"three\n";
		const expected = "one\n" +
			"   \n" +
			"three\n";
		try
		{
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = `\
"actual" had an unexpected value.

actual@0  : "one${NEWLINE_MARKER}
expected@0: "one${NEWLINE_MARKER}

actual@1  : ${PADDING.repeat("   ".length) + NEWLINE_MARKER}
diff      : ${INSERT.repeat("   ".length) + PADDING.repeat(NEWLINE_MARKER.length)}
expected@1: ${PADDING.repeat("   ".length) + NEWLINE_MARKER}

[...]

actual@3  : "${EOS_MARKER}
expected@3: "${EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	test("arrayOfNumbers", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		try
		{
			const actual = [1, 2, 3, 4, 5];
			const expected = [1, 2, 9, 4, 5];
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual[0]  : 1${EOS_MARKER}
expected[0]: 1${EOS_MARKER}

[...]

actual[2]  : 3${PADDING.repeat(1) + EOS_MARKER}
diff       : ${DELETE + INSERT + EQUAL.repeat(NEWLINE_MARKER.length)}
expected[2]: ${PADDING}9${EOS_MARKER}

[...]

actual[4]  : 5${EOS_MARKER}
expected[4]: 5${EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	test("arrayOfStrings", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);
		try
		{
			const actual = ["1", "foo\nbar", "3"];
			const expected = ["1", "bar\nfoo", "3"];
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual[0]    : "1"${EOS_MARKER}
expected[0]  : "1"${EOS_MARKER}

actual[1]@0  : "foo${NEWLINE_MARKER}
diff         : ${EQUAL}${DELETE.repeat(("foo" + NEWLINE_MARKER).length)}
expected[1]@0: "${PADDING.repeat(("foo" + NEWLINE_MARKER).length)}

actual[1]@1  : bar${PADDING.repeat(NEWLINE_MARKER.length)}
diff         : ${EQUAL.repeat("bar".length)}${INSERT.repeat(NEWLINE_MARKER.length)}
expected[1]@0: bar${NEWLINE_MARKER}

actual[1]@1  : ${PADDING.repeat("foo".length)}"${EOS_MARKER}
diff         : ${INSERT.repeat("foo".length)}${EQUAL.repeat(("\"" + NEWLINE_MARKER).length)}
expected[1]@1: foo"${EOS_MARKER}

actual[2]    : "3"${EOS_MARKER}
expected[2]  : "3"${EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	/**
	 * Ensure that text-mode diffs generate the expected value.
	 */
	test("diffArraySize", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		const actual = "int[1234567890]";
		const expected = "int[1234 67890]";
		try
		{
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual  : "int[12345${PADDING}67890]\"${EOS_MARKER}
diff    : ${EQUAL.repeat(`"int[1234`.length)}${DELETE}${INSERT}\
${EQUAL.repeat(`67890]"${EOS_MARKER}`.length)}
expected: "int[1234${PADDING.repeat(2)}67890]"${EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	/**
	 * Ensures that DiffGenerator.ReduceDeltasPerWord does not modify EQUAL deltas between matches. Meaning, it
	 * should not collapse "-same-" into the [DELETE, INSERT] pair associated with "different"/"maybe".
	 */
	test("equalDeltaAfterReduceDeltasPerWord", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		const actual = "different-same-different";
		const expected = "maybe-same-maybe";
		try
		{
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual  : "different${PADDING.repeat(`"maybe`.length)}-same-different"\
${PADDING.repeat(`maybe"`.length) + EOS_MARKER}
diff    : ${DELETE.repeat(`"different`.length)}\
${INSERT.repeat(`"maybe`.length)}\
${EQUAL.repeat("-same-".length)}\
${DELETE.repeat(`different"`.length)}\
${INSERT.repeat(`maybe"`.length)}\
${EQUAL.repeat(NEWLINE_MARKER.length)}
expected: ${PADDING.repeat(`"different`.length)}\
"maybe-same-${PADDING.repeat(`different"`.length)}maybe"${EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	/**
	 * When processing DELETE "same\nactual" followed by INSERT "same\nexpected", ensure that actual and
	 * expected keep track of different "diff" line numbers. Otherwise, the DELETE advances to the next line and
	 * INSERT updates the diff of the wrong line number. We end up with:
	 *
	 * ```console
	 * actual@1  : same\n
	 * diff      : ------
	 * expected  :
	 *
	 * actual@2  : actual
	 * diff      : ------++++++
	 * expected@1:       same\n
	 * ```
	 * instead of:
	 * ```
	 * actual    : same\n
	 * expected  : same\n
	 * ```
	 */
	test("independentDiffLineNumbers", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		const actual = "actual\nsame\nactual actual";
		const expected = "expected\nsame\nexpected expected";
		try
		{
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual@0  : "actual${PADDING.repeat(`"expected`.length) + NEWLINE_MARKER}
diff      : ${DELETE.repeat(`"actual`.length) + INSERT.repeat(`"expected`.length) +
			EQUAL.repeat(NEWLINE_MARKER.length)}
expected@0: ${PADDING.repeat(`"actual`.length)}"expected${NEWLINE_MARKER}

[...]

actual@2  : actual ${PADDING.repeat("expected".length)}actual"${PADDING.repeat(`expected"`.length) + EOS_MARKER}
diff      : ${DELETE.repeat("actual".length) + INSERT.repeat("expected".length) + EQUAL +
			DELETE.repeat(`actual"`.length) + INSERT.repeat(`expected"`.length) + EQUAL.repeat(EOS_MARKER.length)}
expected@2: ${PADDING.repeat("actual".length)}expected${PADDING.repeat(` actual"`.length)}expected"\
${EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	/**
	 * Ensure that NODE_16_COLORS diffs generate the expected value.
	 */
	test("diffArraySize_16Colors", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(
			TerminalEncoding.NODE_16_COLORS), Configuration.DEFAULT);

		const actual = "int[1234567890]";
		const expected = "int[1234 67890]";
		try
		{
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const scheme = new Node16Colors();

			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual  : ${scheme.decorateEqualText(`"int[1234`) +
			scheme.decorateDeletedText("5") + scheme.decoratePadding(scheme.getPaddingMarker()) +
			scheme.decorateEqualText(`67890]"`) + EOS_MARKER}
expected: ${scheme.decorateEqualText(`"int[1234`) + scheme.decoratePadding(scheme.getPaddingMarker()) +
			scheme.decorateInsertedText(" ") + scheme.decorateEqualText(`67890]"`) + EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	/**
	 * Ensure that NODE_256_COLORS diffs generate the expected value.
	 */
	test("diffArraySize_256Colors", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(
			TerminalEncoding.NODE_256_COLORS), Configuration.DEFAULT);

		const actual = "int[1234567890]";
		const expected = "int[1234 67890]";
		try
		{
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const scheme = new Node256Colors();

			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual  : ${scheme.decorateEqualText(`"int[1234`) +
			scheme.decorateDeletedText("5") + scheme.decoratePadding(scheme.getPaddingMarker()) +
			scheme.decorateEqualText(`67890]"`) + EOS_MARKER}
expected: ${scheme.decorateEqualText(`"int[1234`) + scheme.decoratePadding(scheme.getPaddingMarker()) +
			scheme.decorateInsertedText(" ") + scheme.decorateEqualText(`67890]"`) + EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	/**
	 * Ensure that NODE_16MILLION_COLORS diffs generate the expected value.
	 */
	test("diffArraySize_16MillionColors", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(
			TerminalEncoding.NODE_16MILLION_COLORS), Configuration.DEFAULT);

		const actual = "int[1234567890]";
		const expected = "int[1234 67890]";
		try
		{
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const scheme = new Node16MillionColors();

			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual  : ${scheme.decorateEqualText(`"int[1234`) +
			scheme.decorateDeletedText("5") + scheme.decoratePadding(scheme.getPaddingMarker()) +
			scheme.decorateEqualText(`67890]"`) + EOS_MARKER}
expected: ${scheme.decorateEqualText(`"int[1234`) + scheme.decoratePadding(scheme.getPaddingMarker()) +
			scheme.decorateInsertedText(" ") + scheme.decorateEqualText(`67890]"`) + EOS_MARKER}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});

	/**
	 * Make sure that we skip duplicate lines even when the diff contains colors.
	 */
	test("emptyLineNumber_16Colors", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(
			TerminalEncoding.NODE_16_COLORS), Configuration.DEFAULT);

		try
		{
			const actual = EXTEND_LENGTH("prefix") + "foo\nbar";
			const expected = EXTEND_LENGTH("prefix") + "bar";
			validators.requireThat(actual, "actual").isEqualTo(expected);
			assert.fail("Expected method to throw error");
		}
		catch (e)
		{
			const scheme = new Node16Colors();

			const actualMessage = (e as Error).message;
			const expectedMessage = `\
actual@0  : ${scheme.decorateEqualText(`"${EXTEND_LENGTH("prefix")}`) + scheme.decorateDeletedText(`foo${NEWLINE_MARKER}`)}
expected@0: ${scheme.decorateEqualText(`"${EXTEND_LENGTH("prefix")}`) +
			scheme.decoratePadding(scheme.getPaddingMarker().repeat((`foo${NEWLINE_MARKER}`).length))}

actual@1  : ${scheme.decorateEqualText(`bar"${EOS_MARKER}`)}
expected@0: ${scheme.decorateEqualText(`bar"${EOS_MARKER}`)}`;

			assert(actualMessage.includes(expectedMessage), `\
**************** Actual:
${actualMessage}

**************** expected:
${expectedMessage}`);
		}
	});
});