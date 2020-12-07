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

test("BooleanTest.isTrue", function(t)
{
	requirements.requireThat(true, "actual").asBoolean().isTrue();
	t.end();
});

test("BooleanTest.isTrue_False", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(false, "actual").asBoolean().isTrue();
	}, RangeError);
	t.end();
});

test("BooleanTest.isFalse", function(t)
{
	requirements.requireThat(false, "actual").asBoolean().isFalse();
	t.end();
});

test("BooleanTest.isFalse_False", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(true, "actual").asBoolean().isFalse();
	}, RangeError);
	t.end();
});

test("BooleanTest.undefinedAsBoolean", function(t)
{
	let actual;
	requirements.requireThat(actual, "actual").asBoolean().isFalse();
	t.end();
});

test("BooleanTest.nullAsBoolean", function(t)
{
	const actual = null;
	requirements.requireThat(actual, "actual").asBoolean().isFalse();
	t.end();
});

test("BooleanTest.ZeroNumberAsBoolean", function(t)
{
	const actual = 0;
	requirements.requireThat(actual, "actual").asBoolean().isFalse();
	t.end();
});

test("BooleanTest.nonZeroNumberAsBoolean", function(t)
{
	const actual = 1;
	requirements.requireThat(actual, "actual").asBoolean().isTrue();
	t.end();
});

test("BooleanTest.zeroStringAsBoolean", function(t)
{
	const actual = "0";
	requirements.requireThat(actual, "actual").asBoolean().isTrue();
	t.end();
});

test("BooleanTest.nonZeroStringAsBoolean", function(t)
{
	const actual = "1";
	requirements.requireThat(actual, "actual").asBoolean().isTrue();
	t.end();
});

test("BooleanTest.trueStringAsBoolean", function(t)
{
	const actual = "true";
	requirements.requireThat(actual, "actual").asBoolean().isTrue();
	t.end();
});

test("BooleanTest.emptyStringAsBoolean", function(t)
{
	const actual = "";
	requirements.requireThat(actual, "actual").asBoolean().isFalse();
	t.end();
});

test("BooleanTest.falseStringAsBoolean", function(t)
{
	const actual = "false";
	requirements.requireThat(actual, "actual").asBoolean().isTrue();
	t.end();
});

test("BooleanTest.asString_true", function(t)
{
	const actual = true;
	requirements.requireThat(actual, "actual").asBoolean().asString().isEqualTo("true");
	t.end();
});

test("BooleanTest.asString_false", function(t)
{
	const actual = false;
	requirements.requireThat(actual, "actual").asBoolean().asString().isEqualTo("false");
	t.end();
});

test("BooleanTest.getActual", function(t)
{
	const input = true;
	const output = requirements.requireThat(input, "input").getActual();
	t.equals(output, input);
	t.end();
});