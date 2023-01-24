import
{
	Configuration,
	ObjectValidator,
	TerminalEncoding,
	TestGlobalConfiguration
} from "../src/internal/internal.js";
import {
	assertThat,
	Requirements
} from "../src/index.js";
import ObjectVerifierImpl from "../src/internal/ObjectVerifierImpl.js";
import {
	suite,
	test
} from "mocha";
import {assert} from "chai";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

suite("ObjectTest", () =>
{
	test("validatorIsUndefined", () =>
	{
		assert.throws(function()
		{
			let input: undefined;
			/* eslint-disable no-new */
			new ObjectVerifierImpl(input as unknown as ObjectValidator);
			/* eslint-enable no-new */
		}, TypeError);
	});

	test("nameIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = {};
			requirements.requireThat(actual, null as unknown as string);
		}, TypeError);
	});

	test("nameIsEmpty", () =>
	{
		assert.throws(function()
		{
			const actual = {};
			requirements.requireThat(actual, "");
		}, RangeError);
	});

	test("isEqualTo", () =>
	{
		const actual = "actual";
		requirements.requireThat(actual, "actual").isEqualTo(actual);
	});

	test("isEqual_False", () =>
	{
		const actual = {};
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").isEqualTo("expected");
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").isEqualTo("expected", "expected");
		}, RangeError);
	});

	test("isEqual_sameToStringDifferentTypes", () =>
	{
		assert.throws(function()
		{
			const actual = "null";
			requirements.requireThat(actual, "actual").isEqualTo(null);
		}, RangeError);
	});

	test("isEqual_nullToNull", () =>
	{
		const actual = null;
		requirements.requireThat(actual, "actual").isEqualTo(actual);
	});

	test("isEqualTo_nullToNotNull", () =>
	{
		assert.throws(function()
		{
			const actual = null;
			requirements.requireThat(actual, "actual").isEqualTo("expected");
		}, RangeError);
	});

	test("isEqualTo_notNullToNull", () =>
	{
		assert.throws(function()
		{
			const actual = "actual";
			requirements.requireThat(actual, "actual").isEqualTo(null);
		}, RangeError);
	});

	test("isNotEqualTo", () =>
	{
		requirements.requireThat("actualValue", "actual").isNotEqualTo("expectedValue");
	});

	test("isNotEqualTo_False", () =>
	{
		const actual = {};
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").isNotEqualTo(actual);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").isNotEqualTo(actual, "actual");
		}, RangeError);
	});

	test("isTypeOf", () =>
	{
		const actual = "value";
		requirements.requireThat(actual, "actual").isTypeOf("string");
	});

	test("isTypeOf_actualIsNull", () =>
	{
		const actual = null;
		// For backwards-compatibility reasons typeof(null) === "object". See
		// Per https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null
		requirements.requireThat(actual, "actual").isTypeOf("object");
	});

	test("isTypeOf_expectedIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = {};
			requirements.requireThat(actual, "actual").isTypeOf("null");
		}, RangeError);
	});

	test("isTypeOf_False", () =>
	{
		assert.throws(function()
		{
			const actual = {};
			requirements.requireThat(actual, "actual").isTypeOf("string");
		}, RangeError);
	});

	test("isInstanceOf", () =>
	{
		/* eslint-disable no-new-wrappers */
		// noinspection JSPrimitiveTypeWrapperUsage
		const actual = new String("value");
		/* eslint-enable no-new-wrappers */

		requirements.requireThat(actual, "actual").isInstanceOf(String).isInstanceOf(Object);
	});

	test("isInstanceOf_actualIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = null;
			requirements.requireThat(actual, "actual").isInstanceOf(String);
		}, RangeError);
	});

	test("isInstanceOf_expectedIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = {};
			// eslint-disable-next-line @typescript-eslint/ban-types
			requirements.requireThat(actual, "actual").isInstanceOf(null as unknown as Function);
		}, TypeError);
	});

	test("isInstanceOf_False", () =>
	{
		assert.throws(function()
		{
			const actual = {};
			requirements.requireThat(actual, "actual").isInstanceOf(String);
		}, RangeError);
	});

	test("isTypeOf_AnonymousFunction", () =>
	{
		requirements.requireThat(function()
		{
			return "anonymousFunction";
		}, "actual").isTypeOf("function");
	});

// TODO: this test cannot run under Babel because it converts arrow functions to anonymous functions.
//
// test("isTypeOf_ArrowFunction", () =>
// {
// 	requirements.requireThat(input => input + " -> output", "actual").isTypeOf("ArrowFunction");
// 	// });

	class MyClass
	{
	}

	test("isInstanceOf_Object", () =>
	{
		assert.throws(function()
		{
			const actual = 5;
			requirements.requireThat(actual, "actual").isInstanceOf(MyClass);
		}, RangeError);
	});

	test("isNull", () =>
	{
		requirements.requireThat(null, "actual").isNull();
	});

	test("isNull_False", () =>
	{
		assert.throws(function()
		{
			const actual = {};
			requirements.requireThat(actual, "actual").isNull();
		}, RangeError);
	});

	test("isNotNull", () =>
	{
		const actual = {};
		requirements.requireThat(actual, "actual").isNotNull();
	});

	test("isNotNull_False", () =>
	{
		assert.throws(function()
		{
			const actual = null;
			requirements.requireThat(actual, "actual").isNotNull();
		}, RangeError);
	});

	test("isDefined", () =>
	{
		const actual = 5;
		requirements.requireThat(actual, "actual").isDefined();
	});

	test("isDefined_False", () =>
	{
		assert.throws(function()
		{
			let actual;
			// noinspection JSUnusedAssignment
			requirements.requireThat(actual, "actual").isDefined();
		}, RangeError);
	});

	test("isNotDefined", () =>
	{
		let actual;
		// noinspection JSUnusedAssignment
		requirements.requireThat(actual, "actual").isNotDefined();
	});

	test("isNotDefined_False", () =>
	{
		assert.throws(function()
		{
			const actual = 5;
			requirements.requireThat(actual, "actual").isNotDefined();
		}, RangeError);
	});

	test("isSet", () =>
	{
		const actual = 5;
		requirements.requireThat(actual, "actual").isSet();
	});

	test("isSet_False", () =>
	{
		assert.throws(function()
		{
			let actual;
			// noinspection JSUnusedAssignment
			requirements.requireThat(actual, "actual").isSet();
		}, RangeError);
	});

	test("isNotSet", () =>
	{
		let actual;
		// noinspection JSUnusedAssignment
		requirements.requireThat(actual, "actual").isNotSet();
	});

	test("isNotSet_False", () =>
	{
		assert.throws(function()
		{
			const actual = 5;
			requirements.requireThat(actual, "actual").isNotSet();
		}, RangeError);
	});

	test("asStringConsumer", () =>
	{
		const actual = 1234;
		requirements.requireThat(actual, "actual").asStringConsumer(s => s.length().isLessThan(5));
	});

	test("asInetAddressConsumer", () =>
	{
		const actual = "1.2.3.4";
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asInetAddressConsumer(i => i.isIpV6());
		}, RangeError);
	});

	test("requirements.requireThat.getActual", () =>
	{
		const input = 12345;
		const output = requirements.requireThat(input, "input").getActual();
		assert.equal(output, input);
	});

	test("assertThat.getActual", () =>
	{
		const input = 12345;
		let expected;
		const verifier = assertThat(input, "input");
		assert.equal(verifier.isActualAvailable(), false);
		// noinspection JSUnusedAssignment
		assert.equal(verifier.getActual(), expected);
	});

	test("assertThat.getActual", () =>
	{
		const input = 12345;
		let expected;
		const verifier = assertThat(input, "input");
		assert.equal(verifier.isActualAvailable(), false);
		// noinspection JSUnusedAssignment
		assert.equal(verifier.getActual(), expected);
	});
});