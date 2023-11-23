import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import type {ObjectValidator} from "../src/internal/internal.mjs";
import {
	Configuration,
	ObjectVerifierImpl,
	TerminalEncoding
} from "../src/internal/internal.mjs";
import {Requirements} from "../src/index.mjs";
import {TypeScriptCompiler} from "./TypescriptCompiler.mjs";
import {TestGlobalConfiguration} from "./TestGlobalConfiguration.mjs";
import * as os from "os";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);
const compiler = new TypeScriptCompiler();

suite("ObjectTest", () =>
{
	test("validatorIsUndefined", () =>
	{
		assert.throws(function()
		{
			let actual: undefined;
			/* eslint-disable no-new */
			new ObjectVerifierImpl(actual as unknown as ObjectValidator<undefined>);
			/* eslint-enable no-new */
		}, TypeError);
	});

	test("nameIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = {} as object | null;
			// Changes the compile-time type of the value to null
			const isNull: null = requirements.requireThat(actual, null as unknown as string).isNull().getActual();
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
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";
			
			const actual = "null"
			requireThat(actual, "actual").isEqualTo(null);`;
		const messages = compiler.compile(code);
		assert.equal(messages, "test.mts(4,44): error TS2345: Argument of type 'null' is not assignable " +
			"to parameter of type 'string'." + os.EOL);
	}).timeout(5000);

	test("isEqual_nullToNull", () =>
	{
		const actual = null;
		requirements.requireThat(actual, "actual").isEqualTo(actual);
	});

	test("isEqualTo_nullToNotNull", () =>
	{
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";

			const actual = null;
			requireThat(actual, "actual").isEqualTo("expected");`;
		const messages = compiler.compile(code);
		assert.equal(messages, "test.mts(4,44): error TS2345: Argument of type '\"expected\"' is not " +
			"assignable to parameter of type 'null'." + os.EOL);
	}).timeout(5000);

	test("isEqualTo_notNullToNull", () =>
	{
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";

			const actual = "actual";
			requireThat(actual, "actual").isEqualTo(null);`;
		const messages = compiler.compile(code);
		assert.equal(messages, "test.mts(4,44): error TS2345: Argument of type 'null' is not assignable " +
			"to parameter of type 'string'." + os.EOL);
	}).timeout(5000);

	test("isNotEqualTo", () =>
	{
		const actual = "actualValue";
		requirements.requireThat(actual, "actual").isNotEqualTo("expectedValue");
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

	test("isTypeOf_ArrowFunction", () =>
	{
		requirements.requireThat((input: string) => input + " -> output", "actual").isTypeOf("function");
	});

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
		const actual = {} as object | null;
		// Changes the compile-time type of the value to not-null
		const notNull: object = requirements.requireThat(actual, "actual").isNotNull().getActual();
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
});