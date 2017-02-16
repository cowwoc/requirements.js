import {requireThat} from "../node/Requirements";
import test from "tape-catch";

test("SetTest.nameIsNull", function(t)
{
	t.throws(function()
	{
		const actual = new Set();
		requireThat(actual, null);
	}, TypeError);
	t.end();
});

test("SetTest.nameIsEmpty", function(t)
{
	t.throws(function()
	{
		const actual = new Set();
		requireThat(actual, "");
	}, RangeError);
	t.end();
});

test("SetTest.isEmpty", function(t)
{
	const actual = new Set();
	requireThat(actual, "actual").isEmpty();
	t.end();
});

test("SetTest.isEmpty_False", function(t)
{
	t.throws(function()
	{
		const actual = new Set([1, 2, 3]);
		requireThat(actual, "actual").isEmpty();
	}, RangeError);
	t.end();
});

test("SetTest.isNotEmpty", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").isNotEmpty();
	t.end();
});

test("SetTest.isNotEmpty_False", function(t)
{
	t.throws(function()
	{
		const actual = new Set();
		requireThat(actual, "actual").isNotEmpty();
	}, RangeError);
	t.end();
});

test("SetTest.isEqualTo", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").isEqualTo(actual);
	t.end();
});

test("SetTest.isEqual_False", function(t)
{
	t.throws(function()
	{
		const actual = new Set([1, 2, 3]);
		requireThat(actual, "actual").isEqualTo(new Set());
	}, RangeError);
	t.end();
});

test("SetTest.isNotEqualTo", function(t)
{
	requireThat(new Set([1, 2, 3]), "actual").isNotEqualTo(new Set());
	t.end();
});

test("SetTest.isNotEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual = new Set();
		requireThat(actual, "actual").isNotEqualTo(actual);
	}, RangeError);
	t.end();
});

test("SetTest.isInArray", function(t)
{
	const actual = new Set();
	requireThat(actual, "actual").isInArray(["first", actual, "third"]);
	t.end();
});

test("SetTest.isInArray_False", function(t)
{
	t.throws(function()
	{
		const actual = new Set([1, 2, 3]);
		requireThat(actual, "actual").isInArray(["first", "second", "third"]);
	}, RangeError);
	t.end();
});

test("SetTest.isInstanceOf", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").isInstanceOf(Set).isInstanceOf(Object);
	t.end();
});

test("SetTest.isInstanceOf_False", function(t)
{
	t.throws(function()
	{
		const actual = new Set();
		requireThat(actual, "actual").isInstanceOf(String);
	}, RangeError);
	t.end();
});

test("SetTest.isNull_False", function(t)
{
	t.throws(function()
	{
		const actual = new Set();
		requireThat(actual, "actual").isNull();
	}, RangeError);
	t.end();
});

test("SetTest.isNotNull", function(t)
{
	const actual = new Set();
	requireThat(actual, "actual").isNotNull();
	t.end();
});

test("SetTest.contains", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").contains(2);
	t.end();
});

test("SetTest.contains_False", function(t)
{
	t.throws(function()
	{
		const actual = new Set([1, 2, 3]);
		requireThat(actual, "actual").contains(5);
	}, RangeError);
	t.end();
});

test("SetTest.doesNotContain", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").doesNotContain(5);
	t.end();
});

test("SetTest.doesNotContain_False", function(t)
{
	t.throws(function()
	{
		const actual = new Set([1, 2, 3]);
		requireThat(actual, "actual").doesNotContain(2);
	}, RangeError);
	t.end();
});

test("SetTest.sizeIsEqualTo", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").size().isEqualTo(3);
	t.end();
});

test("SetTest.sizeIsEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual = new Set([1, 2, 3]);
		requireThat(actual, "actual").size().isEqualTo(2);
	}, RangeError);
	t.end();
});

test("SetTest.sizeIsNotEqualTo", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").size().isNotEqualTo(2);
	t.end();
});

test("SetTest.sizeIsNotEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual = new Set([1, 2, 3]);
		requireThat(actual, "actual").size().isNotEqualTo(3);
	}, RangeError);
	t.end();
});

test("SetTest.asArray", function(t)
{
	const array = [1, 2, 3];
	const actual = new Set(array);
	requireThat(actual, "actual").asArray().isEqualTo(array);
	t.end();
});

test("SetTest.asString", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").asString().isEqualTo("[1, 2, 3]");
	t.end();
});

test("SetTest.getActual", function(t)
{
	const input = new Set([1, 2, 3]);
	const output = requireThat(input, "input").getActual();
	t.equal(output, input);
	t.end();
});
