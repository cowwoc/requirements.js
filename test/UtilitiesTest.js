import cheerio from "cheerio";
import test from "tape-catch";
import Utilities from "../node/Utilities";

test("UtilitiesTest.getTypeOf_anonymousFunctionContainingArrow", function(t)
{
	t.equals(Utilities.getTypeOf(function()
	{
		return "=>";
	}), "AnonymousFunction");
	t.end();
});

// TODO: this test cannot run under Babel because it converts arrow functions to anonymous functions.
//
// test("UtilitiesTest.getTypeOf_arrowFunction", function(t)
// {
// 	t.equals(Utilities.getTypeOf(input => input + " -> output"), "ArrowFunction");
// 	t.end();
// });

class MyClass {
}

test("UtilitiesTest.getTypeOf_anonymousFunctionContainingArrow", function(t)
{
	const instance = new MyClass();
	t.equals(Utilities.getTypeOf(instance), "MyClass");
	t.end();
});

test("UtilitiesTest.instanceOf_String", function(t)
{
	// eslint-disable-next-line no-new-wrappers
	t.true(Utilities.instanceOf(new String("actual"), String));
	t.end();
});

test("UtilitiesTest.instanceOf_Number", function(t)
{
	// eslint-disable-next-line no-new-wrappers
	t.true(Utilities.instanceOf(new Number(5), Number));
	t.end();
});

test("UtilitiesTest.instanceOf_boolean", function(t)
{
	// eslint-disable-next-line no-new-wrappers
	t.true(Utilities.instanceOf(true, Boolean));
	t.end();
});

test("UtilitiesTest.instanceOf_Boolean", function(t)
{
	// eslint-disable-next-line no-new-wrappers
	t.true(Utilities.instanceOf(new Boolean(true), Boolean));
	t.end();
});

const $ = cheerio.load("<html></html>");
// eslint-disable-next-line func-style
const jquerySelector = $(".selector");

test("UtilitiesTest.getTypeOf_anonymousFunction", function(t)
{
	// eslint-disable-next-line no-new-wrappers
	t.equals(Utilities.getTypeOf(jquerySelector), "Object");
	t.end();
});