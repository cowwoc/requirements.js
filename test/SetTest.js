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
	requireThat(actual, "actual").asSet().isEmpty();
	t.end();
});

test("SetTest.isEmpty_False", function(t)
{
	t.throws(function()
	{
		const actual = new Set([1, 2, 3]);
		requireThat(actual, "actual").asSet().isEmpty();
	}, RangeError);
	t.end();
});

test("SetTest.isNotEmpty", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").asSet().isNotEmpty();
	t.end();
});

test("SetTest.isNotEmpty_False", function(t)
{
	t.throws(function()
	{
		const actual = new Set();
		requireThat(actual, "actual").asSet().isNotEmpty();
	}, RangeError);
	t.end();
});

test("SetTest.isEqualTo", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").asSet().isEqualTo(actual);
	t.end();
});

test("SetTest.isEqual_False", function(t)
{
	t.throws(function()
	{
		const actual = new Set([1, 2, 3]);
		requireThat(actual, "actual").asSet().isEqualTo(new Set());
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
		requireThat(actual, "actual").asSet().isNotEqualTo(actual);
	}, RangeError);
	t.end();
});

test("SetTest.isInstanceOf", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").asSet().isInstanceOf(Set).isInstanceOf(Object);
	t.end();
});

test("SetTest.isInstanceOf_False", function(t)
{
	t.throws(function()
	{
		const actual = new Set();
		requireThat(actual, "actual").asSet().isInstanceOf(String);
	}, RangeError);
	t.end();
});

test("SetTest.isNull_False", function(t)
{
	t.throws(function()
	{
		const actual = new Set();
		requireThat(actual, "actual").asSet().isNull();
	}, RangeError);
	t.end();
});

test("SetTest.isNotNull", function(t)
{
	const actual = new Set();
	requireThat(actual, "actual").asSet().isNotNull();
	t.end();
});

test("SetTest.contains", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").asSet().contains(2);
	t.end();
});

test("SetTest.contains_False", function(t)
{
	const actual = new Set([1, 2, 3]);
	t.throws(function()
	{
		requireThat(actual, "actual").asSet().contains(5);
	}, RangeError);
	t.throws(function()
	{
		requireThat(actual, "actual").asSet().contains(5, "expected");
	}, RangeError);
	t.end();
});

test("SetTest.doesNotContain", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").asSet().doesNotContain(5);
	t.end();
});

test("SetTest.doesNotContain_False", function(t)
{
	const actual = new Set([1, 2, 3]);
	t.throws(function()
	{
		requireThat(actual, "actual").asSet().doesNotContain(2);
	}, RangeError);
	t.throws(function()
	{
		requireThat(actual, "actual").asSet().doesNotContain(2, "expected");
	}, RangeError);
	t.end();
});

test("SetTest.containsAny", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").asSet().containsAny([0, 2, 4]);
	t.end();
});

test("SetTest.containsAny_False", function(t)
{
	const actual = new Set([1, 2, 3]);
	t.throws(function()
	{
		requireThat(actual, "actual").asSet().containsAny([0, 5]);
	}, RangeError);
	t.throws(function()
	{
		requireThat(actual, "actual").asSet().containsAny([0, 5], "expected");
	}, RangeError);
	t.end();
});

test("SetTest.doesNotContainAny", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").asSet().doesNotContainAny([0, 5]);
	t.end();
});

test("SetTest.doesNotContainAny_False", function(t)
{
	const actual = new Set([1, 2, 3]);
	t.throws(function()
	{
		requireThat(actual, "actual").asSet().doesNotContainAny([0, 2]);
	}, RangeError);
	t.throws(function()
	{
		requireThat(actual, "actual").asSet().doesNotContainAny([0, 2], "expected");
	}, RangeError);
	t.end();
});

test("SetTest.containsAll", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").asSet().containsAll([2, 3]);
	t.end();
});

test("SetTest.containsAll_False", function(t)
{
	const actual = new Set([1, 2, 3]);
	t.throws(function()
	{
		requireThat(actual, "actual").asSet().containsAll([0, 1, 2]);
	}, RangeError);
	t.throws(function()
	{
		requireThat(actual, "actual").asSet().containsAll([0, 1, 2], "expected");
	}, RangeError);
	t.end();
});

test("SetTest.doesNotContainAll", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").asSet().doesNotContainAll([0, 2, 3]);
	t.end();
});

test("SetTest.doesNotContainAll_False", function(t)
{
	const actual = new Set([1, 2, 3]);
	t.throws(function()
	{
		requireThat(actual, "actual").asSet().doesNotContainAll([2, 3]);
	}, RangeError);
	t.throws(function()
	{
		requireThat(actual, "actual").asSet().doesNotContainAll([2, 3], "expected");
	}, RangeError);
	t.end();
});

test("SetTest.containsExactly", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").asSet().containsExactly([1, 2, 3]);
	t.end();
});

test("SetTest.containsExactly_False", function(t)
{
	const actual = new Set([1, 2, 3]);
	t.throws(function()
	{
		requireThat(actual, "actual").asSet().containsExactly([0, 1, 2, 3]);
	}, RangeError);
	t.throws(function()
	{
		requireThat(actual, "actual").asSet().containsExactly([0, 1, 2, 3], "expected");
	}, RangeError);
	t.end();
});

test("SetTest.sizeIsEqualTo", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").asSet().size().isEqualTo(3);
	t.end();
});

test("SetTest.sizeIsEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual = new Set([1, 2, 3]);
		requireThat(actual, "actual").asSet().size().isEqualTo(2);
	}, RangeError);
	t.end();
});

test("SetTest.sizeIsNotEqualTo", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").asSet().size().isNotEqualTo(2);
	t.end();
});

test("SetTest.sizeIsNotEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual = new Set([1, 2, 3]);
		requireThat(actual, "actual").asSet().size().isNotEqualTo(3);
	}, RangeError);
	t.end();
});

test("SetTest.sizeConsumer", function(t)
{
	t.throws(function()
	{
		const actual = new Set([1, 2, 3]);
		requireThat(actual, "actual").asSet().sizeConsumer(s => s.isNotEqualTo(3));
	}, RangeError);
	t.end();
});

test("SetTest.asArray", function(t)
{
	const array = [1, 2, 3];
	const actual = new Set(array);
	requireThat(actual, "actual").asSet().asArray().isEqualTo(array);
	t.end();
});

test("SetTest.asArrayConsumer", function(t)
{
	const array = [1, 2, 3];
	t.throws(function()
	{
		const actual = new Set(array);
		requireThat(actual, "actual").asSet().asArrayConsumer(a => a.isNotEqualTo(array));
	}, RangeError);
	t.end();
});

test("SetTest.asString", function(t)
{
	const actual = new Set([1, 2, 3]);
	requireThat(actual, "actual").asSet().asString().isEqualTo("[1, 2, 3]");
	t.end();
});

test("SetTest.getActual", function(t)
{
	const input = new Set([1, 2, 3]);
	const output = requireThat(input, "input").getActual();
	t.equals(output, input);
	t.end();
});
