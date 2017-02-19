import {requireThat} from "../node/Requirements";
import test from "tape-catch";

test("MapTest.nameIsNull", function(t)
{
	t.throws(function()
	{
		const actual = new Map();
		requireThat(actual, null);
	}, TypeError);
	t.end();
});

test("MapTest.nameIsEmpty", function(t)
{
	t.throws(function()
	{
		const actual = new Map();
		requireThat(actual, "");
	}, RangeError);
	t.end();
});

test("MapTest.isEmpty", function(t)
{
	const actual = new Map();
	requireThat(actual, "actual").isEmpty();
	t.end();
});

test("MapTest.isEmpty_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requireThat(actual, "actual").isEmpty();
	}, RangeError);
	t.end();
});

test("MapTest.isNotEmpty", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requireThat(actual, "actual").isNotEmpty();
	t.end();
});

test("MapTest.isNotEmpty_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map();
		requireThat(actual, "actual").isNotEmpty();
	}, RangeError);
	t.end();
});

test("MapTest.isEqualTo", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requireThat(actual, "actual").isEqualTo(actual);
	t.end();
});

test("MapTest.isEqual_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requireThat(actual, "actual").isEqualTo(new Map());
	}, RangeError);
	t.end();
});

test("MapTest.isNotEqualTo", function(t)
{
	requireThat(new Map([[1, 10], [2, 20]]), "actual").isNotEqualTo(new Map());
	t.end();
});

test("MapTest.isNotEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map();
		requireThat(actual, "actual").isNotEqualTo(actual);
	}, RangeError);
	t.end();
});

test("MapTest.isInArray", function(t)
{
	const actual = new Map();
	requireThat(actual, "actual").isInArray(["first", actual, "third"]);
	t.end();
});

test("MapTest.isInArray_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requireThat(actual, "actual").isInArray(["first", "second", "third"]);
	}, RangeError);
	t.end();
});

test("MapTest.isInstanceOf", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requireThat(actual, "actual").isInstanceOf(Map).isInstanceOf(Object);
	t.end();
});

test("MapTest.isInstanceOf_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map();
		requireThat(actual, "actual").isInstanceOf(String);
	}, RangeError);
	t.end();
});

test("MapTest.isNull_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map();
		requireThat(actual, "actual").isNull();
	}, RangeError);
	t.end();
});

test("MapTest.isNotNull", function(t)
{
	const actual = new Map();
	requireThat(actual, "actual").isNotNull();
	t.end();
});

test("MapTest.keysContain", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requireThat(actual, "actual").keys().contains(2);
	t.end();
});

test("MapTest.keysContain_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requireThat(actual, "actual").keys().contains(5);
	}, RangeError);
	t.end();
});

test("MapTest.keysDoesNotContain", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requireThat(actual, "actual").keys().doesNotContain(5);
	t.end();
});

test("MapTest.keysDoesNotContain_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requireThat(actual, "actual").keys().doesNotContain(2);
	}, RangeError);
	t.end();
});

test("MapTest.keysConsumer", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requireThat(actual, "actual").keysConsumer(k => k.contains(2)).size().isEqualTo(2);
	t.end();
});

test("MapTest.keysLength_False", function(t)
{
	const actual = new Map();
	t.throws(function()
	{
		requireThat(actual, "actual").keys().length().isGreaterThan(1);
	}, RangeError);
	t.throws(function()
	{
		requireThat(actual, "actual").keys().length().isGreaterThan(2);
	}, RangeError);
	t.end();
});

test("MapTest.keysConsumer_Fail", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requireThat(actual, "actual").keysConsumer(k => k.doesNotContain(2));
	}, RangeError);
	t.end();
});

test("MapTest.valuesContain", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requireThat(actual, "actual").values().contains(20);
	t.end();
});

test("MapTest.valuesContain_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requireThat(actual, "actual").values().contains(50);
	}, RangeError);
	t.end();
});

test("MapTest.valuesDoesNotContain", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requireThat(actual, "actual").values().doesNotContain(50);
	t.end();
});

test("MapTest.valuesDoesNotContain_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requireThat(actual, "actual").values().doesNotContain(20);
	}, RangeError);
	t.end();
});

test("MapTest.valuesLength_False", function(t)
{
	const actual = new Map();
	t.throws(function()
	{
		requireThat(actual, "actual").values().length().isGreaterThan(1);
	}, RangeError);
	t.throws(function()
	{
		requireThat(actual, "actual").values().length().isGreaterThan(2);
	}, RangeError);
	t.end();
});

test("MapTest.valuesConsumer", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requireThat(actual, "actual").valuesConsumer(k => k.contains(20)).size().isEqualTo(2);
	t.end();
});

test("MapTest.valuesConsumer_Fail", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requireThat(actual, "actual").valuesConsumer(v => v.doesNotContain(20));
	}, RangeError);
	t.end();
});

test("MapTest.entriesContain", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requireThat(actual, "actual").entries().contains([2, 20]);
	t.end();
});

test("MapTest.entriesContain_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requireThat(actual, "actual").entries().contains([5, 50]);
	}, RangeError);
	t.end();
});

test("MapTest.entriesDoesNotContain", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requireThat(actual, "actual").entries().doesNotContain([5, 50]);
	t.end();
});

test("MapTest.entriesDoesNotContain_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requireThat(actual, "actual").entries().doesNotContain([2, 20]);
	}, RangeError);
	t.end();
});

test("MapTest.entriesLength_False", function(t)
{
	const actual = new Map();
	t.throws(function()
	{
		requireThat(actual, "actual").entries().length().isGreaterThan(1);
	}, RangeError);
	t.throws(function()
	{
		requireThat(actual, "actual").entries().length().isGreaterThan(2);
	}, RangeError);
	t.end();
});

test("MapTest.entriesConsumer", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requireThat(actual, "actual").entriesConsumer(k => k.contains([2, 20])).size().isEqualTo(2);
	t.end();
});

test("MapTest.entriesConsumer_Fail", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requireThat(actual, "actual").entriesConsumer(v => v.doesNotContain([2, 20]));
	}, RangeError);
	t.end();
});

test("MapTest.sizeIsEqualTo", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requireThat(actual, "actual").size().isEqualTo(2);
	t.end();
});

test("MapTest.sizeIsEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requireThat(actual, "actual").size().isEqualTo(1);
	}, RangeError);
	t.end();
});

test("MapTest.sizeIsNotEqualTo", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requireThat(actual, "actual").size().isNotEqualTo(1);
	t.end();
});

test("MapTest.sizeIsNotEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requireThat(actual, "actual").size().isNotEqualTo(2);
	}, RangeError);
	t.end();
});

test("MapTest.sizeConsumer", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requireThat(actual, "actual").sizeConsumer(s => s.isEqualTo(2)).entries().contains([2, 20]);
	t.end();
});

test("MapTest.sizeConsumer_Fail", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requireThat(actual, "actual").sizeConsumer(s => s.isNotEqualTo(2));
	}, RangeError);
	t.end();
});

test("MapTest.asString", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requireThat(actual, "actual").asString().isEqualTo("{\n" +
		"  \"1\": 10,\n" +
		"  \"2\": 20\n" +
		"}");
	t.end();
});

test("MapTest.getActual", function(t)
{
	const input = new Map([[1, 10], [2, 20]]);
	const output = requireThat(input, "input").getActual();
	t.equals(output, input);
	t.end();
});