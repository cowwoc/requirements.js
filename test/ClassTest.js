import test from "tape-catch";
import {requireThat} from "../src/DefaultRequirements.js";
import {validateThat} from "../src/DefaultRequirements";

test("ClassTest.isSupertypeOf", function(t)
{
	const actual = Object;
	requireThat(actual, "actual").asClass().isSupertypeOf(Number);
	t.end();
});

test("ClassTest.isSupertypeOf_False", function(t)
{
	t.throws(function()
	{
		const actual = String;
		requireThat(actual, "actual").asClass().isSupertypeOf(Number);
		t.end();
	}, RangeError);
	t.end();
});

test("ClassTest.isSupertypeOf_expectedIsNull", function(t)
{
	t.throws(function()
	{
		const actual = ["element"];
		requireThat(actual, "actual").asClass().isSupertypeOf(null);
	}, TypeError);
	t.end();
});

test("ClassTest.isSupertypeOf_actualIsNull", function(t)
{
	t.throws(function()
	{
		const actual = null;
		requireThat(actual, "actual").asClass().isSupertypeOf(Object);
	}, TypeError);
	t.end();
});

test("ClassTest.isSubtypeOf", function(t)
{
	const actual = Number;
	requireThat(actual, "actual").asClass().isSubtypeOf(Object);
	t.end();
});

test("ClassTest.isSubtypeOf_False", function(t)
{
	t.throws(function()
	{
		const actual = Number;
		requireThat(actual, "actual").asClass().isSubtypeOf(String);
		t.end();
	}, RangeError);
	t.end();
});

test("ClassTest.isSubtypeOf_expectedIsNull", function(t)
{
	t.throws(function()
	{
		const actual = ["element"];
		requireThat(actual, "actual").asClass().isSubtypeOf(null);
	}, TypeError);
	t.end();
});

test("ClassTest.isSubtypeOf_actualIsNull", function(t)
{
	t.throws(function()
	{
		const actual = null;
		requireThat(actual, "actual").asClass().isSubtypeOf(Object);
	}, TypeError);
	t.end();
});

test("ClassTest.validateThatNullAsClass", function(t)
{
	const actual = null;
	const expectedMessages = ["actual must contain a class.\n" +
	"Actual: null\n" +
	"Type  : null"];
	const actualFailures = validateThat(actual, "actual").asClass().isSubtypeOf(Object).getFailures();
	const actualMessages = actualFailures.map(failure => failure.getMessage());
	requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	t.end();
});