import test from "tape-catch";
import {Objects} from "../src/internal/internal";
import VariableType from "../src/internal/VariableType";

test("ObjectsTest.getTypeOf_undefined", function(t)
{
	// eslint-disable-next-line no-undefined
	t.deepEquals(Objects.getTypeInfo(undefined), new VariableType("undefined"));
	t.end();
});

test("ObjectsTest.getTypeOf_null", function(t)
{
	t.deepEquals(Objects.getTypeInfo(null), new VariableType("null"));
	t.end();
});

test("ObjectsTest.getTypeOf_boolean", function(t)
{
	t.deepEquals(Objects.getTypeInfo(true), new VariableType("boolean"));
	t.end();
});

test("ObjectsTest.getTypeOf_Boolean", function(t)
{
	// eslint-disable-next-line no-new-wrappers
	const input = new Boolean(true);
	t.deepEquals(Objects.getTypeInfo(input), new VariableType("object", "Boolean"));
	t.end();
});

test("ObjectsTest.getTypeOf_number", function(t)
{
	t.deepEquals(Objects.getTypeInfo(5), new VariableType("number"));
	t.end();
});

test("ObjectsTest.getTypeOf_Number", function(t)
{
	// eslint-disable-next-line no-new-wrappers
	const input = new Number(5);
	t.deepEquals(Objects.getTypeInfo(input), new VariableType("object", "Number"));
	t.end();
});

test("ObjectsTest.getTypeOf_bigint", function(t)
{
	t.deepEquals(Objects.getTypeInfo(5n), new VariableType("bigint"));
	t.end();
});

test("ObjectsTest.getTypeOf_BigInt", function(t)
{
	// eslint-disable-next-line no-new-wrappers
	const input = BigInt(5);
	t.deepEquals(Objects.getTypeInfo(input), new VariableType("bigint"));
	t.end();
});

test("ObjectsTest.getTypeOf_string", function(t)
{
	t.deepEquals(Objects.getTypeInfo("test"), new VariableType("string"));
	t.end();
});

test("ObjectsTest.getTypeOf_String", function(t)
{
	// eslint-disable-next-line no-new-wrappers
	const input = new String("test");
	t.deepEquals(Objects.getTypeInfo(input), new VariableType("object", "String"));
	t.end();
});

test("ObjectsTest.getTypeOf_symbol", function(t)
{
	t.deepEquals(Objects.getTypeInfo(Symbol("test")), new VariableType("symbol"));
	t.end();
});

test("ObjectsTest.getTypeOf_Symbol", function(t)
{
	// eslint-disable-next-line no-new-wrappers, @typescript-eslint/ban-types
	const input: Symbol = Object(Symbol("test")) as Symbol;
	t.deepEquals(Objects.getTypeInfo(input), new VariableType("object", "Symbol"));
	t.end();
});

test("ObjectsTest.getTypeOf_anonymousFunctionContainingArrow", function(t)
{
	t.deepEquals(Objects.getTypeInfo(function()
	{
		return "=>";
	}), new VariableType("function"));
	t.end();
});

// TODO: this test cannot run under Babel because it converts arrow functions to anonymous functions.
//
// test("ObjectsTest.getTypeOf_arrowFunction", function(t)
// {
// 	t.deepEquals(Objects.getTypeOf(input => input + " -> output"), new VariableType("function"));
// 	t.end();
// });

/**
 * Test function.
 *
 * @return {string} hello world
 */
function MyFunction()
{
	return "hello world";
}

test("ObjectsTest.getTypeOf_function", function(t)
{
	const input = MyFunction;
	t.deepEquals(Objects.getTypeInfo(input), new VariableType("function", "MyFunction"));
	t.end();
});


class MyClass
{
}

test("ObjectsTest.getTypeOf_object", function(t)
{
	const input = new MyClass();
	t.deepEquals(Objects.getTypeInfo(input), new VariableType("object", "MyClass"));
	t.end();
});

test("ObjectsTest.getTypeOf_class", function(t)
{
	const input = MyClass;
	t.deepEquals(Objects.getTypeInfo(input), new VariableType("class", "MyClass"));
	t.end();
});