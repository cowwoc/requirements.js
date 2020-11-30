import test from "tape-catch";
import {Requirements} from "../src/index";
import {
	Configuration,
	TerminalEncoding,
	TestGlobalConfiguration
} from "../src/internal/internal";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

test("UrlTest.asUrl", function(t)
{
	requirements.requireThat("http://host.com/index.html", "actual").asUrl().asUrl();
	t.end();
});

test("UrlTest.isAbsolute", function(t)
{
	requirements.requireThat(new URL("http://host.com/index.html"), "actual").asUrl().isAbsolute();
	t.end();
});

test("UrlTest.isAbsolute_False", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(new URL("../index.html"), "actual").asUrl().isAbsolute();
	}, RangeError);
	t.end();
});

test("UrlTest.isRelative", function(t)
{
	requirements.requireThat(new URL("../index.html"), "actual").asUrl().isRelative();
	t.end();
});

test("UrlTest.isRelative_False", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(new URL("http://host.com/index.html"), "actual").asUrl().isRelative();
	}, RangeError);
	t.end();
});

test("UrlTest.asString", function(t)
{
	const string = "http://host.com/index.html";
	const actual = new URL(string);
	requirements.requireThat(actual, "actual").asUrl().asString().isEqualTo(string);
	t.end();
});

test("UrlTest.getActual", function(t)
{
	const input = new URL("http://www.test.com/");
	const output = requirements.requireThat(input, "input").getActual();
	t.equals(output, input);
	t.end();
});

test("UrlTest.validateThatNullAsUrl", function(t)
{
	const actual = null;
	const expectedMessages = ["actual must contain a valid URL.\n" +
	"Actual: null\n" +
	"Type  : null"];
	const actualFailures = requirements.validateThat(actual, "actual").asUrl().getFailures();
	const actualMessages = actualFailures.map(failure => failure.getMessage());
	requirements.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	t.end();
});