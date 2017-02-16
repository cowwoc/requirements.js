import {requireThat} from "../node/Requirements";
import test from "tape-catch";

test("StringTest.isEmpty", function(t)
{
	requireThat("", "actual").isEmpty();
	t.end();
});

test("StringTest.isEmpty_False", function(t)
{
	t.throws(function()
	{
		requireThat("   ", "actual").isEmpty();
	}, RangeError);
	t.end();
});

test("StringTest.trimIsEmpty", function(t)
{
	requireThat("   ", "actual").trim().isEmpty();
	t.end();
});

test("StringTest.trimIsEmpty_False", function(t)
{
	t.throws(function()
	{
		requireThat("value", "actual").trim().isEmpty();
	}, RangeError);
	t.end();
});

test("StringTest.isNotEmpty", function(t)
{
	requireThat("   ", "actual").isNotEmpty();
	t.end();
});

test("StringTest.isNotEmpty_False", function(t)
{
	t.throws(function()
	{
		requireThat("", "actual").isNotEmpty();
	}, RangeError);
	t.end();
});

test("StringTest.trimIsNotEmpty", function(t)
{
	requireThat("value", "actual").trim().isNotEmpty();
	t.end();
});

test("StringTest.trimIsNotEmpty_False", function(t)
{
	t.throws(function()
	{
		requireThat("   ", "actual").trim().isNotEmpty();
	}, RangeError);
	t.end();
});

test("StringTest.startsWith", function(t)
{
	const prefix = "home";
	const actual = prefix + "1234";
	requireThat(actual, "actual").startsWith(prefix);
	t.end();
});

test("StringTest.startsWith_False", function(t)
{
	t.throws(function()
	{
		const prefix = "home";
		const actual = "1234" + prefix;
		requireThat(actual, "actual").startsWith(prefix);
	}, RangeError);
	t.end();
});

test("StringTest.doesNotStartWith", function(t)
{
	const prefix = "home";
	const actual = "1234" + prefix;
	requireThat(actual, "actual").doesNotStartWith(prefix);
	t.end();
});

test("StringTest.doesNotStartWith_False", function(t)
{
	t.throws(function()
	{
		const prefix = "home";
		const actual = prefix + "1234";
		requireThat(actual, "actual").doesNotStartWith(prefix);
	}, RangeError);
	t.end();
});

test("StringTest.endsWith", function(t)
{
	const suffix = "home";
	const actual = "1234" + suffix;
	requireThat(actual, "actual").endsWith(suffix);
	t.end();
});

test("StringTest.endsWith_False", function(t)
{
	t.throws(function()
	{
		const suffix = "home";
		const actual = suffix + "1234";
		requireThat(actual, "actual").endsWith(suffix);
	}, RangeError);
	t.end();
});

test("StringTest.doesNotEndWith", function(t)
{
	const suffix = "home";
	const actual = suffix + "1234";
	requireThat(actual, "actual").doesNotEndWith(suffix);
	t.end();
});

test("StringTest.doesNotEndWith_False", function(t)
{
	t.throws(function()
	{
		const suffix = "home";
		const actual = "1234" + suffix;
		requireThat(actual, "actual").doesNotEndWith(suffix);
	}, RangeError);
	t.end();
});

test("StringTest.lengthIsEqualTo", function(t)
{
	const actual = "value";
	requireThat(actual, "actual").length().isEqualTo(actual.length);
	t.end();
});

test("StringTest.lengthIsEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual = "value";
		requireThat(actual, "actual").length().isEqualTo(actual.length + 1);
	}, RangeError);
	t.end();
});

test("StringTest.lengthIsNotEqualTo", function(t)
{
	const actual = "value";
	requireThat(actual, "actual").length().isNotEqualTo(actual.length + 1);
	t.end();
});

test("StringTest.lengthIsNotEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual = "value";
		requireThat(actual, "actual").length().isNotEqualTo(actual.length);
	}, RangeError);
	t.end();
});

test("StringTest.asString", function(t)
{
	const actual = "value";
	requireThat(actual, "actual").asString().isEqualTo(actual);
	t.end();
});

test("StringTest.getActual", function(t)
{
	const input = "value";
	const output = requireThat(input, "input").getActual();
	t.equal(output, input);
	t.end();
});