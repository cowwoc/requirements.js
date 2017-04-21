import {assertThat, requireThat} from "../node/Requirements";
import ObjectVerifier from "../node/ObjectVerifier";
import test from "tape-catch";

test("ObjectTest.constructor_configurationIsUndefined", function(t)
{
	t.throws(function()
	{
		// eslint-disable-next-line no-new
		new ObjectVerifier();
	}, TypeError);
	t.end();
});

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
	const actual = {};
	t.throws(function()
	{
		requireThat(actual, "actual").isEqualTo("expected");
	}, RangeError);
	t.throws(function()
	{
		requireThat(actual, "actual").isEqualTo("expected", "expected");
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
	const actual = {};
	t.throws(function()
	{
		requireThat(actual, "actual").isNotEqualTo(actual);
	}, RangeError);
	t.throws(function()
	{
		requireThat(actual, "actual").isNotEqualTo(actual, "actual");
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

test("ObjectTest.isNotInArray", function(t)
{
	const actual = {};
	requireThat(actual, "actual").isNotInArray(["first", "second", "third"]);
	t.end();
});

test("ObjectTest.isNotInArray_False", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requireThat(actual, "actual").isNotInArray(["first", actual, "third"]);
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
		requireThat(actual, "actual").isInstanceOf(String);
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

test("ObjectTest.isInstanceOf_AnonymousFunction", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requireThat(actual, "actual").isInstanceOf(function()
		{
			return "anonymousFunction";
		});
	}, RangeError);
	t.end();
});

test("ObjectTest.isInstanceOf_ArrowFunction", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requireThat(actual, "actual").isInstanceOf(input => input + " -> output");
	}, RangeError);
	t.end();
});

class MyClass {
}

test("ObjectTest.isInstanceOf_Object", function(t)
{
	t.throws(function()
	{
		const actual = 5;
		requireThat(actual, "actual").isInstanceOf(MyClass);
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

test("ObjectTest.isDefined", function(t)
{
	const actual = 5;
	requireThat(actual, "actual").isDefined();
	t.end();
});

test("ObjectTest.isDefined_False", function(t)
{
	t.throws(function()
	{
		let actual;
		requireThat(actual, "actual").isDefined();
	}, RangeError);
	t.end();
});

test("ObjectTest.isNotDefined", function(t)
{
	let actual;
	requireThat(actual, "actual").isNotDefined();
	t.end();
});

test("ObjectTest.isNotDefined_False", function(t)
{
	t.throws(function()
	{
		const actual = 5;
		requireThat(actual, "actual").isNotDefined();
	}, RangeError);
	t.end();
});

test("ObjectTest.isSet", function(t)
{
	const actual = 5;
	requireThat(actual, "actual").isSet();
	t.end();
});

test("ObjectTest.isSet_False", function(t)
{
	t.throws(function()
	{
		let actual;
		requireThat(actual, "actual").isSet();
	}, RangeError);
	t.end();
});

test("ObjectTest.isNotSet", function(t)
{
	let actual;
	requireThat(actual, "actual").isNotSet();
	t.end();
});

test("ObjectTest.isNotSet_False", function(t)
{
	t.throws(function()
	{
		const actual = 5;
		requireThat(actual, "actual").isNotSet();
	}, RangeError);
	t.end();
});

test("ObjectTest.asStringConsumer", function(t)
{
	const actual = 1234;
	requireThat(actual, "actual").asStringConsumer(s => s.length().isLessThan(5));
	t.end();
});

test("ObjectTest.asInetAddressConsumer", function(t)
{
	const actual = "1.2.3.4";
	t.throws(function()
	{
		requireThat(actual, "actual").asInetAddressConsumer(i => i.isIpV6(actual));
	}, RangeError);
	t.end();
});

test("ObjectTest.asUriConsumer", function(t)
{
	const actual = "http://www.host.com/path/";
	t.throws(function()
	{
		requireThat(actual, "actual").asUriConsumer(u => u.isRelative());
	}, RangeError);
	t.end();
});

test("ObjectTest.getActual", function(t)
{
	const input = {};
	const output = requireThat(input, "input").getActual();
	t.equals(output, input);
	t.end();
});

test("ObjectTest.requireThat.getActualIfPresent", function(t)
{
	const input = 12345;
	const output = requireThat(input, "input").asString().getActualIfPresent();
	t.equals(output, "12345");
	t.end();
});

test("ObjectTest.assertThat.getActualIfPresent", function(t)
{
	const input = {};
	let expected;
	const output = assertThat(input, "input").getActualIfPresent();
	t.equals(output, expected);
	t.end();
});