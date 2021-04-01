import test from "tape-catch";
import {
	assertThat,
	Requirements
} from "../src/index";
import {
	Configuration,
	ObjectValidator,
	TerminalEncoding,
	TestGlobalConfiguration
} from "../src/internal/internal";
import ObjectVerifierImpl from "../src/internal/ObjectVerifierImpl";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

test("ObjectTest.validatorIsUndefined", function(t)
{
	t.throws(function()
	{
		let input: undefined;
		/* eslint-disable no-new */
		new ObjectVerifierImpl(input as unknown as ObjectValidator);
		/* eslint-enable no-new */
	}, TypeError);
	t.end();
});

test("ObjectTest.nameIsNull", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requirements.requireThat(actual, null as unknown as string);
	}, TypeError);
	t.end();
});

test("ObjectTest.nameIsEmpty", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requirements.requireThat(actual, "");
	}, RangeError);
	t.end();
});

test("ObjectTest.isEqualTo", function(t)
{
	const actual = "actual";
	requirements.requireThat(actual, "actual").isEqualTo(actual);
	t.end();
});

test("ObjectTest.isEqual_False", function(t)
{
	const actual = {};
	t.throws(function()
	{
		requirements.requireThat(actual, "actual").isEqualTo("expected");
	}, RangeError);
	t.throws(function()
	{
		requirements.requireThat(actual, "actual").isEqualTo("expected", "expected");
	}, RangeError);
	t.end();
});

test("ObjectTest.isEqual_sameToStringDifferentTypes", function(t)
{
	t.throws(function()
	{
		const actual = "null";
		requirements.requireThat(actual, "actual").isEqualTo(null);
	}, RangeError);
	t.end();
});

test("ObjectTest.isEqual_nullToNull", function(t)
{
	const actual = null;
	requirements.requireThat(actual, "actual").isEqualTo(actual);
	t.end();
});

test("ObjectTest.isEqualTo_nullToNotNull", function(t)
{
	t.throws(function()
	{
		const actual = null;
		requirements.requireThat(actual, "actual").isEqualTo("expected");
	}, RangeError);
	t.end();
});

test("ObjectTest.isEqualTo_notNullToNull", function(t)
{
	t.throws(function()
	{
		const actual = "actual";
		requirements.requireThat(actual, "actual").isEqualTo(null);
	}, RangeError);
	t.end();
});

test("ObjectTest.isNotEqualTo", function(t)
{
	requirements.requireThat("actualValue", "actual").isNotEqualTo("expectedValue");
	t.end();
});

test("ObjectTest.isNotEqualTo_False", function(t)
{
	const actual = {};
	t.throws(function()
	{
		requirements.requireThat(actual, "actual").isNotEqualTo(actual);
	}, RangeError);
	t.throws(function()
	{
		requirements.requireThat(actual, "actual").isNotEqualTo(actual, "actual");
	}, RangeError);
	t.end();
});

test("ObjectTest.isTypeOf", function(t)
{
	const actual = "value";
	requirements.requireThat(actual, "actual").isTypeOf("string");
	t.end();
});

test("ObjectTest.isTypeOf_actualIsNull", function(t)
{
	t.throws(function()
	{
		const actual = null;
		requirements.requireThat(actual, "actual").isTypeOf("String");
	}, RangeError);
	t.end();
});

test("ObjectTest.isTypeOf_expectedIsNull", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requirements.requireThat(actual, "actual").isTypeOf("null");
	}, RangeError);
	t.end();
});

test("ObjectTest.isTypeOf_False", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requirements.requireThat(actual, "actual").isTypeOf("string");
	}, RangeError);
	t.end();
});

test("ObjectTest.isInstanceOf", function(t)
{
	/* eslint-disable no-new-wrappers */
	// noinspection JSPrimitiveTypeWrapperUsage
	const actual = new String("value");
	/* eslint-enable no-new-wrappers */

	requirements.requireThat(actual, "actual").isInstanceOf(String).isInstanceOf(Object);
	t.end();
});

test("ObjectTest.isInstanceOf_actualIsNull", function(t)
{
	t.throws(function()
	{
		const actual = null;
		requirements.requireThat(actual, "actual").isInstanceOf(String);
	}, RangeError);
	t.end();
});

test("ObjectTest.isInstanceOf_expectedIsNull", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requirements.requireThat(actual, "actual").isTypeOf("null");
	}, RangeError);
	t.end();
});

test("ObjectTest.isInstanceOf_False", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requirements.requireThat(actual, "actual").isInstanceOf(String);
	}, RangeError);
	t.end();
});

test("ObjectTest.isTypeOf_AnonymousFunction", function(t)
{
	requirements.requireThat(function()
	{
		return "anonymousFunction";
	}, "actual").isTypeOf("AnonymousFunction");
	t.end();
});

// TODO: this test cannot run under Babel because it converts arrow functions to anonymous functions.
//
// test("ObjectTest.isTypeOf_ArrowFunction", function(t)
// {
// 	requirements.requireThat(input => input + " -> output", "actual").isTypeOf("ArrowFunction");
// 	t.end();
// });

class MyClass
{
}

test("ObjectTest.isInstanceOf_Object", function(t)
{
	t.throws(function()
	{
		const actual = 5;
		requirements.requireThat(actual, "actual").isInstanceOf(MyClass);
	}, RangeError);
	t.end();
});

test("ObjectTest.isNull", function(t)
{
	requirements.requireThat(null, "actual").isNull();
	t.end();
});

test("ObjectTest.isNull_False", function(t)
{
	t.throws(function()
	{
		const actual = {};
		requirements.requireThat(actual, "actual").isNull();
	}, RangeError);
	t.end();
});

test("ObjectTest.isNotNull", function(t)
{
	const actual = {};
	requirements.requireThat(actual, "actual").isNotNull();
	t.end();
});

test("ObjectTest.isNotNull_False", function(t)
{
	t.throws(function()
	{
		const actual = null;
		requirements.requireThat(actual, "actual").isNotNull();
	}, RangeError);
	t.end();
});

test("ObjectTest.isDefined", function(t)
{
	const actual = 5;
	requirements.requireThat(actual, "actual").isDefined();
	t.end();
});

test("ObjectTest.isDefined_False", function(t)
{
	t.throws(function()
	{
		let actual;
		// noinspection JSUnusedAssignment
		requirements.requireThat(actual, "actual").isDefined();
	}, RangeError);
	t.end();
});

test("ObjectTest.isNotDefined", function(t)
{
	let actual;
	// noinspection JSUnusedAssignment
	requirements.requireThat(actual, "actual").isNotDefined();
	t.end();
});

test("ObjectTest.isNotDefined_False", function(t)
{
	t.throws(function()
	{
		const actual = 5;
		requirements.requireThat(actual, "actual").isNotDefined();
	}, RangeError);
	t.end();
});

test("ObjectTest.isSet", function(t)
{
	const actual = 5;
	requirements.requireThat(actual, "actual").isSet();
	t.end();
});

test("ObjectTest.isSet_False", function(t)
{
	t.throws(function()
	{
		let actual;
		// noinspection JSUnusedAssignment
		requirements.requireThat(actual, "actual").isSet();
	}, RangeError);
	t.end();
});

test("ObjectTest.isNotSet", function(t)
{
	let actual;
	// noinspection JSUnusedAssignment
	requirements.requireThat(actual, "actual").isNotSet();
	t.end();
});

test("ObjectTest.isNotSet_False", function(t)
{
	t.throws(function()
	{
		const actual = 5;
		requirements.requireThat(actual, "actual").isNotSet();
	}, RangeError);
	t.end();
});

test("ObjectTest.asStringConsumer", function(t)
{
	const actual = 1234;
	requirements.requireThat(actual, "actual").asStringConsumer(s => s.length().isLessThan(5));
	t.end();
});

test("ObjectTest.asInetAddressConsumer", function(t)
{
	const actual = "1.2.3.4";
	t.throws(function()
	{
		requirements.requireThat(actual, "actual").asInetAddressConsumer(i => i.isIpV6());
	}, RangeError);
	t.end();
});

test("ObjectTest.requirements.requireThat.getActual", function(t)
{
	const input = 12345;
	const output = requirements.requireThat(input, "input").getActual();
	t.equals(output, input);
	t.end();
});

test("ObjectTest.assertThat.getActual", function(t)
{
	const input = 12345;
	let expected;
	const verifier = assertThat(input, "input");
	t.equals(verifier.isActualAvailable(), false);
	// noinspection JSUnusedAssignment
	t.equals(verifier.getActual(), expected);
	t.end();
});

test("ObjectTest.assertThat.getActual", function(t)
{
	const input = 12345;
	let expected;
	const verifier = assertThat(input, "input");
	t.equals(verifier.isActualAvailable(), false);
	// noinspection JSUnusedAssignment
	t.equals(verifier.getActual(), expected);
	t.end();
});