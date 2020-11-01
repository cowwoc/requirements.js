import test from "tape-catch";
import {
	Requirements,
	Configuration,
	TerminalEncoding,
	TestGlobalConfiguration
} from "../src/internal/internal";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

test("ClassTest.isSupertypeOf", function(t)
{
	requirements.requireThat(Object, "actual").asClass().isSupertypeOf(Number);
	t.end();
});

test("ClassTest.isSupertypeOf_False", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(String, "actual").asClass().isSupertypeOf(Number);
		t.end();
	}, RangeError);
	t.end();
});

test("ClassTest.isSupertypeOf_expectedIsNull", function(t)
{
	t.throws(function()
	{
		const actual = ["element"];
		// eslint-disable-next-line @typescript-eslint/ban-types
		requirements.requireThat(actual, "actual").asClass().isSupertypeOf(null as unknown as Function);
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
	requirements.requireThat(Number, "actual").asClass().isSubtypeOf(Object);
	t.end();
});

test("ClassTest.isSubtypeOf_False", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(Number, "actual").asClass().isSubtypeOf(String);
		t.end();
	}, RangeError);
	t.end();
});

test("ClassTest.isSubtypeOf_expectedIsNull", function(t)
{
	t.throws(function()
	{
		const actual = ["element"];
		// eslint-disable-next-line @typescript-eslint/ban-types
		requirements.requireThat(actual, "actual").asClass().isSubtypeOf(null as unknown as Function);
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