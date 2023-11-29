import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {
	Configuration,
	TerminalEncoding,
	TextOnly,
	EOS_MARKER
} from "../src/internal/internal.mjs";
import {Requirements} from "../src/index.mjs";
import {TestGlobalConfiguration} from "./TestGlobalConfiguration.mjs";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

suite("StringTest", () =>
{
	test("isEmpty", () =>
	{
		requirements.requireThat("", "actual").isEmpty();
	});

	test("isEmpty_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat("   ", "actual").isEmpty();
		}, RangeError);
	});

	test("isTrimmed", () =>
	{
		requirements.requireThat("", "actual").isTrimmed();
	});

	test("isTrimmed_LeftSpace", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat("  value", "actual").isTrimmed();
		}, RangeError);
	});

	test("isTrimmed_RightSpace", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat("value  ", "actual").isTrimmed();
		}, RangeError);
	});

	test("isNotEmpty", () =>
	{
		requirements.requireThat("   ", "actual").isNotEmpty();
	});

	test("isNotEmpty_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat("", "actual").isNotEmpty();
		}, RangeError);
	});

	test("startsWith", () =>
	{
		const prefix = "home";
		const actual = prefix + "1234";
		requirements.requireThat(actual, "actual").startsWith(prefix);
	});

	test("startsWith_False", () =>
	{
		assert.throws(function()
		{
			const prefix = "home";
			const actual = "1234" + prefix;
			requirements.requireThat(actual, "actual").startsWith(prefix);
		}, RangeError);
	});

	test("doesNotStartWith", () =>
	{
		const prefix = "home";
		const actual = "1234" + prefix;
		requirements.requireThat(actual, "actual").doesNotStartWith(prefix);
	});

	test("doesNotStartWith_False", () =>
	{
		assert.throws(function()
		{
			const prefix = "home";
			const actual = prefix + "1234";
			requirements.requireThat(actual, "actual").doesNotStartWith(prefix);
		}, RangeError);
	});

	test("contains", () =>
	{
		const expected = "cat";
		const actual = "my " + expected + " is the best";
		requirements.requireThat(actual, "actual").contains(expected);
	});

	test("contains_False", () =>
	{
		assert.throws(function()
		{
			const expected = "cat";
			const actual = "my dog is the best";
			requirements.requireThat(actual, "actual").contains(expected);
		}, RangeError);
	});

	test("doesNotContain", () =>
	{
		const value = "cat";
		const actual = "my dog is the best";
		requirements.requireThat(actual, "actual").doesNotContain(value);
	});

	test("doesNotContain_False", () =>
	{
		assert.throws(function()
		{
			const value = "cat";
			const actual = "my " + value + " is the best";
			requirements.requireThat(actual, "actual").doesNotContain(value);
		}, RangeError);
	});

	test("endsWith", () =>
	{
		const suffix = "home";
		const actual = "1234" + suffix;
		requirements.requireThat(actual, "actual").endsWith(suffix);
	});

	test("endsWith_False", () =>
	{
		assert.throws(function()
		{
			const suffix = "home";
			const actual = suffix + "1234";
			requirements.requireThat(actual, "actual").endsWith(suffix);
		}, RangeError);
	});

	test("doesNotEndWith", () =>
	{
		const suffix = "home";
		const actual = suffix + "1234";
		requirements.requireThat(actual, "actual").doesNotEndWith(suffix);
	});

	test("doesNotEndWith_False", () =>
	{
		assert.throws(function()
		{
			const suffix = "home";
			const actual = "1234" + suffix;
			requirements.requireThat(actual, "actual").doesNotEndWith(suffix);
		}, RangeError);
	});

	test("lengthIsEqualTo", () =>
	{
		const actual = "value";
		requirements.requireThat(actual, "actual").length().isEqualTo(actual.length);
	});

	test("lengthIsEqualTo_False", () =>
	{
		const actual = "value";
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").length().isEqualTo(1);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").length().isEqualTo(actual.length + 1);
		}, RangeError);
	});

	test("lengthIsNotEqualTo", () =>
	{
		const actual = "value";
		requirements.requireThat(actual, "actual").length().isNotEqualTo(actual.length + 1);
	});

	test("lengthIsNotEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual = "value";
			requirements.requireThat(actual, "actual").length().isNotEqualTo(actual.length);
		}, RangeError);
	});

	test("length", () =>
	{
		const actual = " value ";
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").length().isEqualTo(actual.length + 1);
		}, RangeError);
	});

	test("isString", () =>
	{
		const actual = "value";
		const expected: string = requirements.requireThat(actual as unknown, "actual").isString().
			isEqualTo(actual).getActual();
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
		const expected = "not-null";
		const expectedMessages = ["actual must be a string.\n" +
		"Actual: null\n" +
		"Type  : null",
			"actual must be equal to " + expected + ".\n" +
			"\n" +
			"Actual  : undefined" + TextOnly.DIFF_PADDING.repeat("not-null".length) + EOS_MARKER + "\n" +
			"Diff    : " + TextOnly.DIFF_DELETE.repeat("undefined".length) +
			TextOnly.DIFF_INSERT.repeat("not-null".length) + TextOnly.DIFF_PADDING.repeat(EOS_MARKER.length) + "\n" +
			"Expected: " + TextOnly.DIFF_PADDING.repeat("undefined".length) + "not-null" + EOS_MARKER];

		const actualFailures = requirements.validateThat(actual, "actual").isString().isEqualTo(expected).
			getFailures();
		const actualMessages = actualFailures.map(failure => failure.getMessage());
		requirements.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	});
});