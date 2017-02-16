import {requireThat} from "../node/Requirements";
import test from "tape-catch";

test("ObjectTest.nameIsNull", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requireThat(actual, null);
	}, TypeError);
	t.end();
});

test("ObjectTest.nameIsEmpty", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requireThat(actual, "");
	}, RangeError);
	t.end();
});

test("ObjectTest.isEqualTo", function(t)
{
	const actual = "actual";
	requireThat(actual, "actual").isEqualTo(actual);
	t.end();
});

test("ObjectTest.isEqual_False", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requireThat(actual, "actual").isEqualTo("expected");
	}, RangeError);
	t.end();
});

test("ObjectTest.isEqual_sameToStringDifferentTypes", function(t)
{
	t.throws(function()
	{
		const actual = "null";
		requireThat(actual, "actual").isEqualTo(null);
	}, RangeError);
	t.end();
});

test("ObjectTest.isEqual_nullToNull", function(t)
{
	const actual = null;
	requireThat(actual, "actual").isEqualTo(actual);
	t.end();
});

test("ObjectTest.isEqualTo_nullToNotNull", function(t)
{
	t.throws(function()
	{
		const actual = null;
		requireThat(actual, "actual").isEqualTo("expected");
	}, RangeError);
	t.end();
});

test("ObjectTest.isEqualTo_notNullToNull", function(t)
{
	t.throws(function()
	{
		const actual = "actual";
		requireThat(actual, "actual").isEqualTo(null);
	}, RangeError);
	t.end();
});

test("ObjectTest.isNotEqualTo", function(t)
{
	requireThat("actualValue", "actual").isNotEqualTo("expectedValue");
	t.end();
});

test("ObjectTest.isNotEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requireThat(actual, "actual").isNotEqualTo(actual);
	}, RangeError);
	t.end();
});

test("ObjectTest.isInArray", function(t)
{
	const actual = {};
	requireThat(actual, "actual").isInArray(["first", actual, "third"]);
	t.end();
});

test("ObjectTest.isInArray_False", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requireThat(actual, "actual").isInArray(["first", "second", "third"]);
	}, RangeError);
	t.end();
});

test("ObjectTest.isInstanceOf", function(t)
{
	const actual = "value";
	requireThat(actual, "actual").isInstanceOf(String).isInstanceOf(Object);
	t.end();
});

test("ObjectTest.isInstanceOf_actualIsNull", function(t)
{
	t.throws(function()
	{
		const actual = null;
		requireThat(actual, "actual").isInstanceOf(String.class);
	}, RangeError);
	t.end();
});

test("ObjectTest.isInstanceOf_expectedIsNull", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requireThat(actual, "actual").isInstanceOf(null);
	}, RangeError);
	t.end();
});

test("ObjectTest.isInstanceOf_False", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requireThat(actual, "actual").isInstanceOf(String);
	}, RangeError);
	t.end();
});

test("ObjectTest.isNull", function(t)
{
	requireThat(null, "actual").isNull();
	t.end();
});

test("ObjectTest.isNull_False", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requireThat(actual, "actual").isNull();
	}, RangeError);
	t.end();
});

test("ObjectTest.isNotNull", function(t)
{
	const actual = {};
	requireThat(actual, "actual").isNotNull();
	t.end();
});

test("ObjectTest.isNotNull_False", function(t)
{
	t.throws(function()
	{
		const actual = null;
		requireThat(actual, "actual").isNotNull();
	}, RangeError);
	t.end();
});

test("ObjectTest.getActual", function(t)
{
	const input = {};
	const output = requireThat(input, "input").getActual();
	t.equal(output, input);
	t.end();
});