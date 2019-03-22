import {requireThat} from "../src/DefaultRequirements";
import test from "tape-catch";
import URI from "urijs";

test("UriTest.asUri", function(t)
{
	requireThat("http://host.com/index.html", "actual").asUri().asUri();
	t.end();
});

test("UriTest.isAbsolute", function(t)
{
	requireThat(new URI("http://host.com/index.html"), "actual").asUri().isAbsolute();
	t.end();
});

test("UriTest.isAbsolute_False", function(t)
{
	t.throws(function()
	{
		requireThat(new URI("../index.html"), "actual").asUri().isAbsolute();
	}, RangeError);
	t.end();
});

test("UriTest.isRelative", function(t)
{
	requireThat(new URI("../index.html"), "actual").asUri().isRelative();
	t.end();
});

test("UriTest.isRelative_False", function(t)
{
	t.throws(function()
	{
		requireThat(new URI("http://host.com/index.html"), "actual").asUri().isRelative();
	}, RangeError);
	t.end();
});

test("UriTest.asString", function(t)
{
	const string = "http://host.com/index.html";
	const actual = new URI(string);
	requireThat(actual, "actual").asUri().asString().isEqualTo(string);
	t.end();
});

test("UriTest.getActual", function(t)
{
	const input = new URI("http://www.test.com/");
	const output = requireThat(input, "input").getActual();
	t.equals(output, input);
	t.end();
});