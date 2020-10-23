import cheerio from "cheerio";
import test from "tape-catch";
import {Objects} from "../src/internal/internal";

test("ObjectsTest.getTypeOf_undefined", function(t)
{
	// eslint-disable-next-line no-undefined
	t.equals(Objects.getTypeOf(undefined), "undefined");
	t.end();
});

test("ObjectsTest.getTypeOf_null", function(t)
{
	t.equals(Objects.getTypeOf(null), "null");
	t.end();
});

test("ObjectsTest.getTypeOf_boolean", function(t)
{
	t.equals(Objects.getTypeOf(true), "boolean");
	t.end();
});

test("ObjectsTest.getTypeOf_Boolean", function(t)
{
	// eslint-disable-next-line no-new-wrappers
	const input = new Boolean(true);
	t.equals(Objects.getTypeOf(input), "Boolean");
	t.end();
});

test("ObjectsTest.getTypeOf_number", function(t)
{
	t.equals(Objects.getTypeOf(5), "number");
	t.end();
});

test("ObjectsTest.getTypeOf_Number", function(t)
{
	// eslint-disable-next-line no-new-wrappers
	const input = new Number(5);
	t.equals(Objects.getTypeOf(input), "Number");
	t.end();
});

// TODO: Enable once bigint is supported
// test("ObjectsTest.getTypeOf_bigint", function(t)
// {
// 	t.equals(Objects.getTypeOf(5n), "number");
// 	t.end();
// });
//
// test("ObjectsTest.getTypeOf_BigInt", function(t)
// {
//  // eslint-disable-next-line no-new-wrappers
// 	t.equals(Objects.getTypeOf(new BigInt(5)), "Number");
// 	t.end();
// });

test("ObjectsTest.getTypeOf_string", function(t)
{
	t.equals(Objects.getTypeOf("test"), "string");
	t.end();
});

test("ObjectsTest.getTypeOf_String", function(t)
{
	// eslint-disable-next-line no-new-wrappers
	const input = new String("test");
	t.equals(Objects.getTypeOf(input), "String");
	t.end();
});

test("ObjectsTest.getTypeOf_symbol", function(t)
{
	t.equals(Objects.getTypeOf(Symbol("test")), "symbol");
	t.end();
});

test("ObjectsTest.getTypeOf_Symbol", function(t)
{
	// eslint-disable-next-line no-new-wrappers, @typescript-eslint/ban-types
	const input: Symbol = Object(Symbol("test")) as Symbol;
	t.equals(Objects.getTypeOf(input), "Symbol");
	t.end();
});

test("ObjectsTest.getTypeOf_anonymousFunctionContainingArrow", function(t)
{
	t.equals(Objects.getTypeOf(function()
	{
		return "=>";
	}), "AnonymousFunction");
	t.end();
});

// TODO: this test cannot run under Babel because it converts arrow functions to anonymous functions.
//
// test("ObjectsTest.getTypeOf_arrowFunction", function(t)
// {
// 	t.equals(Objects.getTypeOf(input => input + " -> output"), "ArrowFunction");
// 	t.end();
// });

class MyClass
{
}

test("ObjectsTest.getTypeOf_Class", function(t)
{
	const input = new MyClass();
	t.equals(Objects.getTypeOf(input), "MyClass");
	t.end();
});

const $ = cheerio.load("<html></html>");
// eslint-disable-next-line func-style
const jquerySelector = $(".selector");

test("ObjectsTest.getTypeOf_jquerySelector", function(t)
{
	// eslint-disable-next-line no-new-wrappers
	t.equals(Objects.getTypeOf(jquerySelector), "Object");
	t.end();
});