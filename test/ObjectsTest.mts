import {Objects} from "../src/internal/internal.mjs";
import VariableType from "../src/internal/VariableType.mjs";
import {
	suite,
	test
} from "mocha";
import {assert} from "chai";

suite("ObjectsTest", () =>
{
	test("getTypeOf_undefined", () =>
	{
		// eslint-disable-next-line no-undefined
		assert.deepEqual(Objects.getTypeInfo(undefined), new VariableType("undefined"));
	});

	test("getTypeOf_null", () =>
	{
		assert.deepEqual(Objects.getTypeInfo(null), new VariableType("null"));
	});

	test("getTypeOf_boolean", () =>
	{
		assert.deepEqual(Objects.getTypeInfo(true), new VariableType("boolean"));
	});

	test("getTypeOf_Boolean", () =>
	{
		// eslint-disable-next-line no-new-wrappers
		const input = new Boolean(true);
		assert.deepEqual(Objects.getTypeInfo(input), new VariableType("object", "Boolean"));
	});

	test("getTypeOf_number", () =>
	{
		assert.deepEqual(Objects.getTypeInfo(5), new VariableType("number"));
	});

	test("getTypeOf_Number", () =>
	{
		// eslint-disable-next-line no-new-wrappers
		const input = new Number(5);
		assert.deepEqual(Objects.getTypeInfo(input), new VariableType("object", "Number"));
	});

	test("getTypeOf_bigint", () =>
	{
		assert.deepEqual(Objects.getTypeInfo(5n), new VariableType("bigint"));
	});

	test("getTypeOf_BigInt", () =>
	{
		// eslint-disable-next-line no-new-wrappers
		const input = BigInt(5);
		assert.deepEqual(Objects.getTypeInfo(input), new VariableType("bigint"));
	});

	test("getTypeOf_string", () =>
	{
		assert.deepEqual(Objects.getTypeInfo("test"), new VariableType("string"));
	});

	test("getTypeOf_String", () =>
	{
		// eslint-disable-next-line no-new-wrappers
		const input = new String("test");
		assert.deepEqual(Objects.getTypeInfo(input), new VariableType("object", "String"));
	});

	test("getTypeOf_symbol", () =>
	{
		assert.deepEqual(Objects.getTypeInfo(Symbol("test")), new VariableType("symbol"));
	});

	test("getTypeOf_Symbol", () =>
	{
		// eslint-disable-next-line no-new-wrappers, @typescript-eslint/ban-types
		const input: Symbol = Object(Symbol("test")) as Symbol;
		assert.deepEqual(Objects.getTypeInfo(input), new VariableType("object", "Symbol"));
	});

	test("getTypeOf_anonymousFunction", () =>
	{
		assert.deepEqual(Objects.getTypeInfo(function()
		{
			return "output";
		}), new VariableType("function"));
	});

	test("getTypeOf_arrowFunction", () =>
	{
		assert.deepEqual(Objects.getTypeInfo((input: string) => input + " -> output"),
			new VariableType("function"));
	});

	test("getTypeOf_namedFunction", () =>
	{
		const input = function MyFunction()
		{
			return "hello world";
		};
		assert.deepEqual(Objects.getTypeInfo(input), new VariableType("function", "MyFunction"));
	});


	class MyClass
	{
	}

	test("getTypeOf_object", () =>
	{
		const input = new MyClass();
		assert.deepEqual(Objects.getTypeInfo(input), new VariableType("object", "MyClass"));
	});

	test("getTypeOf_class", () =>
	{
		const input = MyClass;
		assert.deepEqual(Objects.getTypeInfo(input), new VariableType("class", "MyClass"));
	});
});