import test from "tape-catch";
import URI from "urijs";
import {Requirements} from "../src/index";
import {
	Configuration,
	TerminalEncoding,
	TestGlobalConfiguration
} from "../src/internal/internal";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

test("UriTest.asUri", function(t)
{
	requirements.requireThat("http://host.com/index.html", "actual").asUri().asUri();
	t.end();
});

test("UriTest.isAbsolute", function(t)
{
	requirements.requireThat(new URI("http://host.com/index.html"), "actual").asUri().isAbsolute();
	t.end();
});

test("UriTest.isAbsolute_False", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(new URI("../index.html"), "actual").asUri().isAbsolute();
	}, RangeError);
	t.end();
});

test("UriTest.isRelative", function(t)
{
	requirements.requireThat(new URI("../index.html"), "actual").asUri().isRelative();
	t.end();
});

test("UriTest.isRelative_False", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(new URI("http://host.com/index.html"), "actual").asUri().isRelative();
	}, RangeError);
	t.end();
});

test("UriTest.asString", function(t)
{
	const string = "http://host.com/index.html";
	const actual = new URI(string);
	requirements.requireThat(actual, "actual").asUri().asString().isEqualTo(string);
	t.end();
});

test("UriTest.getActual", function(t)
{
	const input = new URI("http://www.test.com/");
	const output = requirements.requireThat(input, "input").getActual();
	t.equals(output, input);
	t.end();
});

test("UriTest.validateThatNullAsUri", function(t)
{
	const actual = null;
	const expectedMessages = ["actual must contain a valid URI.\n" +
	"Actual: null\n" +
	"Type  : null"];
	const actualFailures = requirements.validateThat(actual, "actual").asUri().getFailures();
	const actualMessages = actualFailures.map(failure => failure.getMessage());
	requirements.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	t.end();
});