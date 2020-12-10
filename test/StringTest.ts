import test from "tape-catch";
import {Requirements} from "../src/index";
import {
	Configuration,
	EOS_MARKER,
	TerminalEncoding,
	TestGlobalConfiguration,
	TextOnly
} from "../src/internal/internal";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

test("StringTest.isEmpty", function(t)
{
	requirements.requireThat("", "actual").asString().isEmpty();
	t.end();
});

test("StringTest.isEmpty_False", function(t)
{
	t.throws(function()
	{
		requirements.requireThat("   ", "actual").asString().isEmpty();
	}, RangeError);
	t.end();
});

test("StringTest.trimIsEmpty", function(t)
{
	requirements.requireThat("   ", "actual").asString().trim().isEmpty();
	t.end();
});

test("StringTest.trimIsEmpty_False", function(t)
{
	t.throws(function()
	{
		requirements.requireThat("value", "actual").asString().trim().isEmpty();
	}, RangeError);
	t.end();
});

test("StringTest.isTrimmed", function(t)
{
	requirements.requireThat("", "actual").asString().isTrimmed();
	t.end();
});

test("StringTest.isTrimmed_LeftSpace", function(t)
{
	t.throws(function()
	{
		requirements.requireThat("  value", "actual").asString().isTrimmed();
	}, RangeError);
	t.end();
});

test("StringTest.isTrimmed_RightSpace", function(t)
{
	t.throws(function()
	{
		requirements.requireThat("value  ", "actual").asString().isTrimmed();
	}, RangeError);
	t.end();
});

test("StringTest.isNotEmpty", function(t)
{
	requirements.requireThat("   ", "actual").asString().isNotEmpty();
	t.end();
});

test("StringTest.isNotEmpty_False", function(t)
{
	t.throws(function()
	{
		requirements.requireThat("", "actual").asString().isNotEmpty();
	}, RangeError);
	t.end();
});

test("StringTest.trimIsNotEmpty", function(t)
{
	requirements.requireThat("value", "actual").asString().trim().isNotEmpty();
	t.end();
});

test("StringTest.trimIsNotEmpty_False", function(t)
{
	t.throws(function()
	{
		requirements.requireThat("   ", "actual").asString().trim().isNotEmpty();
	}, RangeError);
	t.end();
});

test("StringTest.startsWith", function(t)
{
	const prefix = "home";
	const actual = prefix + "1234";
	requirements.requireThat(actual, "actual").asString().startsWith(prefix);
	t.end();
});

test("StringTest.startsWith_False", function(t)
{
	t.throws(function()
	{
		const prefix = "home";
		const actual = "1234" + prefix;
		requirements.requireThat(actual, "actual").asString().startsWith(prefix);
	}, RangeError);
	t.end();
});

test("StringTest.doesNotStartWith", function(t)
{
	const prefix = "home";
	const actual = "1234" + prefix;
	requirements.requireThat(actual, "actual").asString().doesNotStartWith(prefix);
	t.end();
});

test("StringTest.doesNotStartWith_False", function(t)
{
	t.throws(function()
	{
		const prefix = "home";
		const actual = prefix + "1234";
		requirements.requireThat(actual, "actual").asString().doesNotStartWith(prefix);
	}, RangeError);
	t.end();
});

test("StringTest.contains", function(t)
{
	const expected = "cat";
	const actual = "my " + expected + " is the best";
	requirements.requireThat(actual, "actual").asString().contains(expected);
	t.end();
});

test("StringTest.contains_False", function(t)
{
	t.throws(function()
	{
		const expected = "cat";
		const actual = "my dog is the best";
		requirements.requireThat(actual, "actual").asString().contains(expected);
	}, RangeError);
	t.end();
});

test("StringTest.doesNotContain", function(t)
{
	const value = "cat";
	const actual = "my dog is the best";
	requirements.requireThat(actual, "actual").asString().doesNotContain(value);
	t.end();
});

test("StringTest.doesNotContain_False", function(t)
{
	t.throws(function()
	{
		const value = "cat";
		const actual = "my " + value + " is the best";
		requirements.requireThat(actual, "actual").asString().doesNotContain(value);
	}, RangeError);
	t.end();
});

test("StringTest.endsWith", function(t)
{
	const suffix = "home";
	const actual = "1234" + suffix;
	requirements.requireThat(actual, "actual").asString().endsWith(suffix);
	t.end();
});

test("StringTest.endsWith_False", function(t)
{
	t.throws(function()
	{
		const suffix = "home";
		const actual = suffix + "1234";
		requirements.requireThat(actual, "actual").asString().endsWith(suffix);
	}, RangeError);
	t.end();
});

test("StringTest.doesNotEndWith", function(t)
{
	const suffix = "home";
	const actual = suffix + "1234";
	requirements.requireThat(actual, "actual").asString().doesNotEndWith(suffix);
	t.end();
});

test("StringTest.doesNotEndWith_False", function(t)
{
	t.throws(function()
	{
		const suffix = "home";
		const actual = "1234" + suffix;
		requirements.requireThat(actual, "actual").asString().doesNotEndWith(suffix);
	}, RangeError);
	t.end();
});

test("StringTest.lengthIsEqualTo", function(t)
{
	const actual = "value";
	requirements.requireThat(actual, "actual").asString().length().isEqualTo(actual.length);
	t.end();
});

test("StringTest.lengthIsEqualTo_False", function(t)
{
	const actual = "value";
	t.throws(function()
	{
		requirements.requireThat(actual, "actual").asString().length().isEqualTo(1);
	}, RangeError);
	t.throws(function()
	{
		requirements.requireThat(actual, "actual").asString().length().isEqualTo(actual.length + 1);
	}, RangeError);
	t.end();
});

test("StringTest.lengthIsNotEqualTo", function(t)
{
	const actual = "value";
	requirements.requireThat(actual, "actual").asString().length().isNotEqualTo(actual.length + 1);
	t.end();
});

test("StringTest.lengthIsNotEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual = "value";
		requirements.requireThat(actual, "actual").asString().length().isNotEqualTo(actual.length);
	}, RangeError);
	t.end();
});

test("StringTest.trim", function(t)
{
	const actual = " value ";
	requirements.requireThat(actual, "actual").asString().trim().length().isEqualTo(actual.length - 2);
	t.end();
});

test("StringTest.trimConsumer_False", function(t)
{
	t.throws(function()
	{
		const actual = " value ";
		requirements.requireThat(actual, "actual").asString().trimConsumer(s => s.length().
			isNotEqualTo(actual.length - 2));
	}, RangeError);
	t.end();
});

test("StringTest.lengthConsumer", function(t)
{
	const actual = " value ";
	t.throws(function()
	{
		requirements.requireThat(actual, "actual").asString().
			lengthConsumer(l => l.isEqualTo(actual.length + 1));
	}, RangeError);
	t.end();
});

test("StringTest.asString", function(t)
{
	const actual = "value";
	requirements.requireThat(actual, "actual").asString().asString().isEqualTo(actual);
	t.end();
});

test("StringTest.asStringConsumer", function(t)
{
	const actual = "value";
	t.throws(function()
	{
		requirements.requireThat(actual, "actual").asString().asStringConsumer(s => s.isNotEqualTo(actual));
	}, RangeError);
	t.end();
});

test("StringTest.getActual", function(t)
{
	const input = "value";
	const output = requirements.requireThat(input, "input").getActual();
	t.equals(output, input);
	t.end();
});

test("StringTest.validateThatNullAsString", function(t)
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
	t.end();
});