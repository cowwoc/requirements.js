import {
	Objects,
	VariableType
} from "../src/internal/internal.mjs";
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
		assert.deepEqual(Objects.getTypeInfo(undefined), VariableType.UNDEFINED);
	});

	test("getTypeOf_null", () =>
	{
		assert.deepEqual(Objects.getTypeInfo(null), VariableType.NULL);
	});

	test("getTypeOf_boolean", () =>
	{
		assert.deepEqual(Objects.getTypeInfo(true), VariableType.BOOLEAN);
	});

	test("getTypeOf_Boolean", () =>
	{
		// eslint-disable-next-line no-new-wrappers
		// noinspection JSPrimitiveTypeWrapperUsage
		const input = new Boolean(true);
		assert.deepEqual(Objects.getTypeInfo(input), new VariableType("object", "Boolean"));
	});

	test("getTypeOf_number", () =>
	{
		assert.deepEqual(Objects.getTypeInfo(5), VariableType.NUMBER);
	});

	test("getTypeOf_Number", () =>
	{
		// eslint-disable-next-line no-new-wrappers
		const input = new Number(5);
		assert.deepEqual(Objects.getTypeInfo(input), new VariableType("object", "Number"));
	});

	test("getTypeOf_bigint", () =>
	{
		assert.deepEqual(Objects.getTypeInfo(5n), VariableType.BIGINT);
	});

	test("getTypeOf_BigInt", () =>
	{
		// eslint-disable-next-line no-new-wrappers
		const input = BigInt(5);
		assert.deepEqual(Objects.getTypeInfo(input), VariableType.BIGINT);
	});

	test("getTypeOf_string", () =>
	{
		assert.deepEqual(Objects.getTypeInfo("test"), VariableType.STRING);
	});

	test("getTypeOf_String", () =>
	{
		// eslint-disable-next-line no-new-wrappers
		const input = new String("test");
		assert.deepEqual(Objects.getTypeInfo(input), new VariableType("object", "String"));
	});

	test("getTypeOf_symbol", () =>
	{
		assert.deepEqual(Objects.getTypeInfo(Symbol("test")), VariableType.SYMBOL);
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
		}), VariableType.ANONYMOUS_FUNCTION);
	});

	test("getTypeOf_arrowFunction", () =>
	{
		assert.deepEqual(Objects.getTypeInfo((input: string) => input + " -> output"),
			VariableType.ANONYMOUS_FUNCTION);
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