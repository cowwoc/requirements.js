import
{
	Configuration,
	EOS_MARKER,
	TerminalEncoding,
	TestGlobalConfiguration,
	TextOnly
} from "../src/internal/internal.js";
import {Requirements} from "../src/index.js";
import {
	suite,
	test
} from "mocha";
import {assert} from "chai";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

suite("StringTest", () =>
{
	test("isEmpty", () =>
	{
		requirements.requireThat("", "actual").asString().isEmpty();
	});

	test("isEmpty_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat("   ", "actual").asString().isEmpty();
		}, RangeError);
	});

	test("trimIsEmpty", () =>
	{
		requirements.requireThat("   ", "actual").asString().trim().isEmpty();
	});

	test("trimIsEmpty_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat("value", "actual").asString().trim().isEmpty();
		}, RangeError);
	});

	test("isTrimmed", () =>
	{
		requirements.requireThat("", "actual").asString().isTrimmed();
	});

	test("isTrimmed_LeftSpace", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat("  value", "actual").asString().isTrimmed();
		}, RangeError);
	});

	test("isTrimmed_RightSpace", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat("value  ", "actual").asString().isTrimmed();
		}, RangeError);
	});

	test("isNotEmpty", () =>
	{
		requirements.requireThat("   ", "actual").asString().isNotEmpty();
	});

	test("isNotEmpty_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat("", "actual").asString().isNotEmpty();
		}, RangeError);
	});

	test("trimIsNotEmpty", () =>
	{
		requirements.requireThat("value", "actual").asString().trim().isNotEmpty();
	});

	test("trimIsNotEmpty_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat("   ", "actual").asString().trim().isNotEmpty();
		}, RangeError);
	});

	test("startsWith", () =>
	{
		const prefix = "home";
		const actual = prefix + "1234";
		requirements.requireThat(actual, "actual").asString().startsWith(prefix);
	});

	test("startsWith_False", () =>
	{
		assert.throws(function()
		{
			const prefix = "home";
			const actual = "1234" + prefix;
			requirements.requireThat(actual, "actual").asString().startsWith(prefix);
		}, RangeError);
	});

	test("doesNotStartWith", () =>
	{
		const prefix = "home";
		const actual = "1234" + prefix;
		requirements.requireThat(actual, "actual").asString().doesNotStartWith(prefix);
	});

	test("doesNotStartWith_False", () =>
	{
		assert.throws(function()
		{
			const prefix = "home";
			const actual = prefix + "1234";
			requirements.requireThat(actual, "actual").asString().doesNotStartWith(prefix);
		}, RangeError);
	});

	test("contains", () =>
	{
		const expected = "cat";
		const actual = "my " + expected + " is the best";
		requirements.requireThat(actual, "actual").asString().contains(expected);
	});

	test("contains_False", () =>
	{
		assert.throws(function()
		{
			const expected = "cat";
			const actual = "my dog is the best";
			requirements.requireThat(actual, "actual").asString().contains(expected);
		}, RangeError);
	});

	test("doesNotContain", () =>
	{
		const value = "cat";
		const actual = "my dog is the best";
		requirements.requireThat(actual, "actual").asString().doesNotContain(value);
	});

	test("doesNotContain_False", () =>
	{
		assert.throws(function()
		{
			const value = "cat";
			const actual = "my " + value + " is the best";
			requirements.requireThat(actual, "actual").asString().doesNotContain(value);
		}, RangeError);
	});

	test("endsWith", () =>
	{
		const suffix = "home";
		const actual = "1234" + suffix;
		requirements.requireThat(actual, "actual").asString().endsWith(suffix);
	});

	test("endsWith_False", () =>
	{
		assert.throws(function()
		{
			const suffix = "home";
			const actual = suffix + "1234";
			requirements.requireThat(actual, "actual").asString().endsWith(suffix);
		}, RangeError);
	});

	test("doesNotEndWith", () =>
	{
		const suffix = "home";
		const actual = suffix + "1234";
		requirements.requireThat(actual, "actual").asString().doesNotEndWith(suffix);
	});

	test("doesNotEndWith_False", () =>
	{
		assert.throws(function()
		{
			const suffix = "home";
			const actual = "1234" + suffix;
			requirements.requireThat(actual, "actual").asString().doesNotEndWith(suffix);
		}, RangeError);
	});

	test("lengthIsEqualTo", () =>
	{
		const actual = "value";
		requirements.requireThat(actual, "actual").asString().length().isEqualTo(actual.length);
	});

	test("lengthIsEqualTo_False", () =>
	{
		const actual = "value";
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asString().length().isEqualTo(1);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asString().length().isEqualTo(actual.length + 1);
		}, RangeError);
	});

	test("lengthIsNotEqualTo", () =>
	{
		const actual = "value";
		requirements.requireThat(actual, "actual").asString().length().isNotEqualTo(actual.length + 1);
	});

	test("lengthIsNotEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual = "value";
			requirements.requireThat(actual, "actual").asString().length().isNotEqualTo(actual.length);
		}, RangeError);
	});

	test("trim", () =>
	{
		const actual = " value ";
		requirements.requireThat(actual, "actual").asString().trim().length().isEqualTo(actual.length - 2);
	});

	test("trimConsumer_False", () =>
	{
		assert.throws(function()
		{
			const actual = " value ";
			requirements.requireThat(actual, "actual").asString().trimConsumer(s => s.length().
				isNotEqualTo(actual.length - 2));
		}, RangeError);
	});

	test("lengthConsumer", () =>
	{
		const actual = " value ";
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asString().
				lengthConsumer(l => l.isEqualTo(actual.length + 1));
		}, RangeError);
	});

	test("asString", () =>
	{
		const actual = "value";
		requirements.requireThat(actual, "actual").asString().asString().isEqualTo(actual);
	});

	test("asStringConsumer", () =>
	{
		const actual = "value";
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asString().asStringConsumer(s => s.isNotEqualTo(actual));
		}, RangeError);
	});

	test("getActual", () =>
	{
		const input = "value";
		const output = requirements.requireThat(input, "input").getActual();
		assert.equal(output, input);
	});

	test("validateThatNullAsString", () =>
	{
		const actual = null;
		const expected = 5;
		const expectedMessage = "actual.asString() must be equal to " + expected + ".\n" +
			"\n" +
			"Actual  : null" + TextOnly.DIFF_PADDING + EOS_MARKER + "\n" +
			"Diff    : " + TextOnly.DIFF_DELETE.repeat("null".length) + TextOnly.DIFF_INSERT +
			TextOnly.DIFF_PADDING.repeat(EOS_MARKER.length) + "\n" +
			"Expected: " + TextOnly.DIFF_PADDING.repeat("null".length) + "5" + EOS_MARKER;
		const expectedMessages = [expectedMessage];

		const actualFailures = requirements.validateThat(actual, "actual").asString().isEqualTo(expected).
			getFailures();
		const actualMessages = actualFailures.map(failure => failure.getMessage());
		requirements.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	});
});