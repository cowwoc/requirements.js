import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {
	TerminalEncoding,
	type UnknownValidator,
	Configuration,
	Type
} from "../src/index.mjs";
import {JavascriptValidatorsImpl} from "../src/internal/internal.mjs";
import {TestApplicationScope} from "./TestApplicationScope.mjs";


const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
	Configuration.DEFAULT);

suite("GenericTest", () =>
{
	test("nameIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = {} as object | null;
			validators.requireThat(actual, null as unknown as string).isNull().getValue();
		}, TypeError);
	});

	test("nameIsEmpty", () =>
	{
		assert.throws(function()
		{
			const actual = {};
			validators.requireThat(actual, "");
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
			validators.requireThat(actual, "actual").isEqualTo("expected");
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThat(actual, "actual").isEqualTo("expected", "expected");
		}, RangeError);
	});

	test("isEqual_nullToNull", () =>
	{
		const actual = null;
		validators.requireThat(actual, "actual").isEqualTo(actual);
	});

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
			validators.requireThat(actual, "actual").isNotEqualTo(actual);
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThat(actual, "actual").isNotEqualTo(actual, "actual");
		}, RangeError);
	});

	test("getType_isUndefined", () =>
	{
		const actual = undefined;
		validators.requireThat(actual, "actual").isUndefined();
	});

	test("getType_isNull", () =>
	{
		const actual = null;
		validators.requireThat(actual, "actual").isNull();
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
		validators.requireThat(actual, "actual").isType(Type.namedClass(null));
	});

	test("getType_isType", () =>
	{
		const actual = Type.of(new Person("name", 5));
		validators.requireThat(actual, "actual").isType(Type.namedClass("Type"));
	});

	test("isInstanceOf", () =>
	{
		const actual = new Person("name", 5);
		validators.requireThat(actual, "actual").isInstanceOf(Person).getValue();
	});

	test("isInstanceOf_actualIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = null;
			validators.requireThat(actual, "actual").isInstanceOf(String);
		}, TypeError);
	});

	test("isInstanceOf_False", () =>
	{
		assert.throws(function()
		{
			const actual = {};
			validators.requireThat(actual, "actual").isInstanceOf(String);
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
		validators.requireThat(null, "actual").isNull();
	});

	test("isNull_False", () =>
	{
		assert.throws(function()
		{
			const actual = {} as object | null;
			validators.requireThat(actual, "actual").isNull().getValue();
		}, TypeError);
	});

	test("isNotNull", () =>
	{
		const actual = {} as object | null;
		// Changes the compile-time type of the value to not-null
		validators.requireThat(actual, "actual").isNotNull().getValue();
	});

	test("isNotNull_False", () =>
	{
		assert.throws(function()
		{
			const actual = null;
			validators.requireThat(actual, "actual").isNotNull();
		}, TypeError);
	});

	test("isDefined", () =>
	{
		const actual = 5;
		const foo: UnknownValidator<unknown> = validators.requireThatNumber(actual, "actual");
		foo.isNotUndefined();
	});

	test("isDefined_False", () =>
	{
		assert.throws(function()
		{
			let actual;
			// noinspection JSUnusedAssignment
			validators.requireThat(actual, "actual").isNotUndefined();
		}, TypeError);
	});

	test("isUndefined", () =>
	{
		let actual;
		// noinspection JSUnusedAssignment
		validators.requireThat(actual, "actual").isUndefined();
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