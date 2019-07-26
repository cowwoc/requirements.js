import test from "tape-catch";
import {requireThat} from "../src/DefaultRequirements.js";

test("StringTest.isEmpty", function(t)
{
	requireThat("", "actual").asString().isEmpty();
	t.end();
});

test("StringTest.isEmpty_False", function(t)
{
	t.throws(function()
	{
		requireThat("   ", "actual").asString().isEmpty();
	}, RangeError);
	t.end();
});

test("StringTest.trimIsEmpty", function(t)
{
	requireThat("   ", "actual").asString().trim().isEmpty();
	t.end();
});

test("StringTest.trimIsEmpty_False", function(t)
{
	t.throws(function()
	{
		requireThat("value", "actual").asString().trim().isEmpty();
	}, RangeError);
	t.end();
});

test("StringTest.isNotEmpty", function(t)
{
	requireThat("   ", "actual").asString().isNotEmpty();
	t.end();
});

test("StringTest.isNotEmpty_False", function(t)
{
	t.throws(function()
	{
		requireThat("", "actual").asString().isNotEmpty();
	}, RangeError);
	t.end();
});

test("StringTest.trimIsNotEmpty", function(t)
{
	requireThat("value", "actual").asString().trim().isNotEmpty();
	t.end();
});

test("StringTest.trimIsNotEmpty_False", function(t)
{
	t.throws(function()
	{
		requireThat("   ", "actual").asString().trim().isNotEmpty();
	}, RangeError);
	t.end();
});

test("StringTest.startsWith", function(t)
{
	const prefix = "home";
	const actual = prefix + "1234";
	requireThat(actual, "actual").asString().startsWith(prefix);
	t.end();
});

test("StringTest.startsWith_False", function(t)
{
	t.throws(function()
	{
		const prefix = "home";
		const actual = "1234" + prefix;
		requireThat(actual, "actual").asString().startsWith(prefix);
	}, RangeError);
	t.end();
});

test("StringTest.doesNotStartWith", function(t)
{
	const prefix = "home";
	const actual = "1234" + prefix;
	requireThat(actual, "actual").asString().doesNotStartWith(prefix);
	t.end();
});

test("StringTest.doesNotStartWith_False", function(t)
{
	t.throws(function()
	{
		const prefix = "home";
		const actual = prefix + "1234";
		requireThat(actual, "actual").asString().doesNotStartWith(prefix);
	}, RangeError);
	t.end();
});

test("StringTest.contains", function(t)
{
	const expected = "cat";
	const actual = "my " + expected + " is the best";
	requireThat(actual, "actual").asString().contains(expected);
	t.end();
});

test("StringTest.contains_False", function(t)
{
	t.throws(function()
	{
		const expected = "cat";
		const actual = "my dog is the best";
		requireThat(actual, "actual").asString().contains(expected);
	}, RangeError);
	t.end();
});

test("StringTest.doesNotContain", function(t)
{
	const value = "cat";
	const actual = "my dog is the best";
	requireThat(actual, "actual").asString().doesNotContain(value);
	t.end();
});

test("StringTest.doesNotContain_False", function(t)
{
	t.throws(function()
	{
		const value = "cat";
		const actual = "my " + value + " is the best";
		requireThat(actual, "actual").asString().doesNotContain(value);
	}, RangeError);
	t.end();
});

test("StringTest.endsWith", function(t)
{
	const suffix = "home";
	const actual = "1234" + suffix;
	requireThat(actual, "actual").asString().endsWith(suffix);
	t.end();
});

test("StringTest.endsWith_False", function(t)
{
	t.throws(function()
	{
		const suffix = "home";
		const actual = suffix + "1234";
		requireThat(actual, "actual").asString().endsWith(suffix);
	}, RangeError);
	t.end();
});

test("StringTest.doesNotEndWith", function(t)
{
	const suffix = "home";
	const actual = suffix + "1234";
	requireThat(actual, "actual").asString().doesNotEndWith(suffix);
	t.end();
});

test("StringTest.doesNotEndWith_False", function(t)
{
	t.throws(function()
	{
		const suffix = "home";
		const actual = "1234" + suffix;
		requireThat(actual, "actual").asString().doesNotEndWith(suffix);
	}, RangeError);
	t.end();
});

test("StringTest.lengthIsEqualTo", function(t)
{
	const actual = "value";
	requireThat(actual, "actual").asString().length().isEqualTo(actual.length);
	t.end();
});

test("StringTest.lengthIsEqualTo_False", function(t)
{
	const actual = "value";
	t.throws(function()
	{
		requireThat(actual, "actual").asString().length().isEqualTo(1);
	}, RangeError);
	t.throws(function()
	{
		requireThat(actual, "actual").asString().length().isEqualTo(actual.length + 1);
	}, RangeError);
	t.end();
});

test("StringTest.lengthIsNotEqualTo", function(t)
{
	const actual = "value";
	requireThat(actual, "actual").asString().length().isNotEqualTo(actual.length + 1);
	t.end();
});

test("StringTest.lengthIsNotEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual = "value";
		requireThat(actual, "actual").asString().length().isNotEqualTo(actual.length);
	}, RangeError);
	t.end();
});

test("StringTest.trim", function(t)
{
	const actual = " value ";
	requireThat(actual, "actual").asString().trim().length().isEqualTo(actual.length - 2);
	t.end();
});

test("StringTest.trimConsumer_False", function(t)
{
	t.throws(function()
	{
		const actual = " value ";
		requireThat(actual, "actual").asString().trimConsumer(s => s.length().isNotEqualTo(actual.length - 2));
	}, RangeError);
	t.end();
});

test("StringTest.lengthConsumer", function(t)
{
	const actual = " value ";
	t.throws(function()
	{
		requireThat(actual, "actual").asString().lengthConsumer(l => l.isEqualTo(actual.length + 1));
	}, RangeError);
	t.end();
});

test("StringTest.asString", function(t)
{
	const actual = "value";
	requireThat(actual, "actual").asString().asString().isEqualTo(actual);
	t.end();
});

test("StringTest.asStringConsumer", function(t)
{
	const actual = "value";
	t.throws(function()
	{
		requireThat(actual, "actual").asString().asStringConsumer(s => s.isNotEqualTo(actual));
	}, RangeError);
	t.end();
});

test("StringTest.getActual", function(t)
{
	const input = "value";
	const output = requireThat(input, "input").getActual();
	t.equals(output, input);
	t.end();
});