import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {
	TerminalEncoding,
	type ObjectValidator,
	Configuration,
	Type
} from "../src/index.mjs";
import {TestCompiler} from "../build/TestCompiler.mjs";
import * as os from "os";
import {mode} from "../build/mode.mjs";
import {JavascriptValidatorsImpl} from "../src/internal/internal.mjs";
import {TestApplicationScope} from "./TestApplicationScope.mjs";


const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
	Configuration.DEFAULT);

let compiler: TestCompiler | undefined;
if (mode === "DEBUG")
	compiler = undefined;
else
	compiler = new TestCompiler();

suite("BaseTest", () =>
{
	test("nameIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = {} as object | null;
			// Changes the compile-time type of the value to null
			validators.requireThatObject(actual, null as unknown as string).isNull().getValue();
		}, TypeError);
	});

	test("nameIsEmpty", () =>
	{
		assert.throws(function()
		{
			const actual = {};
			validators.requireThatObject(actual, "");
		}, RangeError);
	});

	test("isEqualTo", () =>
	{
		const actual = "actual";
		validators.requireThatString(actual, "actual").isEqualTo(actual);
	});

	test("isEqual_False", () =>
	{
		const actual = {};
		assert.throws(function()
		{
			validators.requireThatObject(actual, "actual").isEqualTo("expected");
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThatObject(actual, "actual").isEqualTo("expected", "expected");
		}, RangeError);
	});

	test("isEqual_sameToStringDifferentTypes", () =>
	{
		if (!compiler)
			return;
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";
			
			const actual = "null"
			requireThat(actual, "actual").isEqualTo(null);`;
		const messages = compiler.compile(code);
		assert.strictEqual(messages, "test.mts(4,44): error TS2345: Argument of type 'null' is not assignable " +
			"to parameter of type 'string'." + os.EOL);
	}).timeout(5000);

	test("isEqual_nullToNull", () =>
	{
		const actual = null;
		validators.requireThatObject(actual, "actual").isEqualTo(actual);
	});

	test("isEqualTo_nullToNotNull", () =>
	{
		if (!compiler)
			return;
		const code =
			`import {requireThat} from "./target/publish/node/index.mjs";

			const actual = null;
			requireThat(actual, "actual").isEqualTo("expected");`;
		const messages = compiler.compile(code);
		assert.strictEqual(messages, `test.mts(4,44): error TS2345: Argument of type '"expected"' is not \
assignable to parameter of type 'null'.` + os.EOL);
	}).timeout(5000);

	test("isEqualTo_notNullToNull", () =>
	{
		if (!compiler)
			return;
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
		validators.requireThatString(actual, "actual").isNotEqualTo("expectedValue");
	});

	test("isNotEqualTo_False", () =>
	{
		const actual = {};
		assert.throws(function()
		{
			validators.requireThatObject(actual, "actual").isNotEqualTo(actual);
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThatObject(actual, "actual").isNotEqualTo(actual, "actual");
		}, RangeError);
	});

	test("getType_isUndefined", () =>
	{
		const actual = undefined;
		validators.requireThatObject(actual, "actual").isUndefined();
	});

	test("getType_isNull", () =>
	{
		const actual = null;
		validators.requireThatObject(actual, "actual").isNull();
	});

	class Person
	{
		name: string;
		age: number;

		constructor(name: string, age: number)
		{
			this.name = name;
			this.age = age;
		}
	}

	test("getType_isObject", () =>
	{
		const actual = new Person("John Smith", 32);
		validators.requireThatObject(actual, "actual").isType(Type.namedClass(null));
	});

	test("getType_isType", () =>
	{
		const actual = Type.of(new Person("name", 5));
		validators.requireThatObject(actual, "actual").isType(Type.namedClass("Type"));
	});

	test("isInstanceOf", () =>
	{
		const actual = new Person("name", 5);
		validators.requireThatObject(actual, "actual").isInstanceOf(Person).getValue();
	});

	test("isInstanceOf_actualIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = null;
			validators.requireThatObject(actual, "actual").isInstanceOf(String);
		}, TypeError);
	});

	test("isInstanceOf_False", () =>
	{
		assert.throws(function()
		{
			const actual = {};
			validators.requireThatObject(actual, "actual").isInstanceOf(String);
		}, TypeError);
	});
	test("isInstanceOf_Object", () =>
	{
		assert.throws(function()
		{
			const actual = 5;
			validators.requireThatNumber(actual, "actual").isInstanceOf(Object);
		}, TypeError);
	});

	test("isNull", () =>
	{
		validators.requireThatObject(null, "actual").isNull();
	});

	test("isNull_False", () =>
	{
		assert.throws(function()
		{
			const actual = {} as object | null;
			validators.requireThatObject(actual, "actual").isNull().getValue();
		}, TypeError);
	});

	test("isNotNull", () =>
	{
		const actual = {} as object | null;
		// Changes the compile-time type of the value to not-null
		validators.requireThatObject(actual, "actual").isNotNull().getValue();
	});

	test("isNotNull_False", () =>
	{
		assert.throws(function()
		{
			const actual = null;
			validators.requireThatObject(actual, "actual").isNotNull();
		}, TypeError);
	});

	test("isDefined", () =>
	{
		const actual = 5;
		const foo: ObjectValidator<unknown> = validators.requireThatNumber(actual, "actual");
		foo.isNotUndefined();
	});

	test("isDefined_False", () =>
	{
		assert.throws(function()
		{
			let actual;
			// noinspection JSUnusedAssignment
			validators.requireThatObject(actual, "actual").isNotUndefined();
		}, TypeError);
	});

	test("isUndefined", () =>
	{
		let actual;
		// noinspection JSUnusedAssignment
		validators.requireThatObject(actual, "actual").isUndefined();
	});

	test("isUndefined_False", () =>
	{
		assert.throws(function()
		{
			const actual = 5;
			validators.requireThatNumber(actual, "actual").isUndefined();
		}, TypeError);
	});
});