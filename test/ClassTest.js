import test from "tape-catch";
import TestGlobalConfiguration from "../src/internal/TestGlobalConfiguration";
import TerminalEncoding from "../src/TerminalEncoding";
import Configuration from "../src/Configuration";
import Requirements from "../src/Requirements";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

test("ClassTest.isSupertypeOf", function(t)
{
	const actual = Object;
	requirements.requireThat(actual, "actual").asClass().isSupertypeOf(Number);
	t.end();
});

test("ClassTest.isSupertypeOf_False", function(t)
{
	t.throws(function()
	{
		const actual = String;
		requirements.requireThat(actual, "actual").asClass().isSupertypeOf(Number);
		t.end();
	}, RangeError);
	t.end();
});

test("ClassTest.isSupertypeOf_expectedIsNull", function(t)
{
	t.throws(function()
	{
		const actual = ["element"];
		requirements.requireThat(actual, "actual").asClass().isSupertypeOf(null);
	}, TypeError);
	t.end();
});

test("ClassTest.isSupertypeOf_actualIsNull", function(t)
{
	t.throws(function()
	{
		const actual = null;
		requirements.requireThat(actual, "actual").asClass().isSupertypeOf(Object);
	}, TypeError);
	t.end();
});

test("ClassTest.isSubtypeOf", function(t)
{
	const actual = Number;
	requirements.requireThat(actual, "actual").asClass().isSubtypeOf(Object);
	t.end();
});

test("ClassTest.isSubtypeOf_False", function(t)
{
	t.throws(function()
	{
		const actual = Number;
		requirements.requireThat(actual, "actual").asClass().isSubtypeOf(String);
		t.end();
	}, RangeError);
	t.end();
});

test("ClassTest.isSubtypeOf_expectedIsNull", function(t)
{
	t.throws(function()
	{
		const actual = ["element"];
		requirements.requireThat(actual, "actual").asClass().isSubtypeOf(null);
	}, TypeError);
	t.end();
});

test("ClassTest.isSubtypeOf_actualIsNull", function(t)
{
	t.throws(function()
	{
		const actual = null;
		requirements.requireThat(actual, "actual").asClass().isSubtypeOf(Object);
	}, TypeError);
	t.end();
});

test("ClassTest.validateThatNullAsClass", function(t)
{
	const actual = null;
	const expectedMessages = ["actual must contain a class.\n" +
	"Actual: null\n" +
	"Type  : null"];
	const actualFailures = requirements.validateThat(actual, "actual").asClass().isSubtypeOf(Object).
		getFailures();
	const actualMessages = actualFailures.map(failure => failure.getMessage());
	requirements.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	t.end();
});