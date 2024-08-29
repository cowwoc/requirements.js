import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {
	Type,
	TypeCategory
} from "../src/index.mjs";


suite("ObjectsTest", () =>
{
	test("getType_undefined", () =>
	{
		// eslint-disable-next-line no-undefined
		assert.deepEqual(Type.of(undefined), Type.UNDEFINED);
	});

	test("getType_null", () =>
	{
		assert.deepEqual(Type.of(null), Type.NULL);
	});

	test("getType_boolean", () =>
	{
		assert.deepEqual(Type.of(true), Type.BOOLEAN);
	});

	test("getType_Boolean", () =>
	{
		// eslint-disable-next-line no-new-wrappers
		// noinspection JSPrimitiveTypeWrapperUsage
		const input = new Boolean(true);
		assert.deepEqual(Type.of(input), Type.namedClass("Boolean"));
	});

	test("getType_number", () =>
	{
		assert.deepEqual(Type.of(5), Type.NUMBER);
	});

	test("getType_Number", () =>
	{
		// eslint-disable-next-line no-new-wrappers
		const input = new Number(5);
		assert.deepEqual(Type.of(input), Type.namedClass("Number"));
	});

	test("getType_bigint", () =>
	{
		assert.deepEqual(Type.of(5n), Type.BIGINT);
	});

	test("getType_BigInt", () =>
	{
		// eslint-disable-next-line no-new-wrappers
		const input = BigInt(5);
		assert.deepEqual(Type.of(input), Type.BIGINT);
	});

	test("getType_string", () =>
	{
		assert.deepEqual(Type.of("test"), Type.STRING);
	});

	test("getType_String", () =>
	{
		// eslint-disable-next-line no-new-wrappers
		const input = new String("test");
		assert.deepEqual(Type.of(input), Type.of(String));
	});

	test("getType_Symbol", () =>
	{
		assert.deepEqual(Type.of(Symbol("test")), Type.SYMBOL);
	});

	test("getType_anonymousFunction", () =>
	{
		assert.deepEqual(Type.of(function()
		{
			return "output";
		}), Type.ANONYMOUS_FUNCTION);
	});

	test("getType_arrowFunction", () =>
	{
		assert.deepEqual(Type.of((input: string) => input + " => output"),
			Type.ANONYMOUS_FUNCTION);
	});

	test("getType_namedFunction", () =>
	{
		const input = function MyFunction()
		{
			return "hello world";
		};
		const type = Type.of(input);
		assert.deepEqual(type.category, TypeCategory.FUNCTION);
		assert.deepEqual(type.name, "MyFunction");
	});


	class MyClass
	{
	}

	test("getType_class", () =>
	{
		const input = MyClass;
		assert.deepEqual(Type.of(input), Type.namedClass("MyClass"));
	});
});