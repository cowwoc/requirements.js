import test from "tape-catch";
import Configuration from "../src/Configuration.js";
import Requirements from "../src/Requirements.js";

test("Configuration.withAssertionsDisabled", function(t)
{
	const requirements = new Requirements();
	requirements.withAssertionsEnabled().withAssertionsDisabled();
	t.end();
});

test("Configuration.withAssertionsDisabled().alreadyDisabled", function(t)
{
	const requirements = new Requirements();
	requirements.withAssertionsDisabled();
	t.end();
});

test("Configuration.withAssertionsEnabled", function(t)
{
	const requirements = new Requirements();
	requirements.withAssertionsEnabled();
	t.end();
});

test("Configuration.withAssertionsEnabled().alreadyEnabled", function(t)
{
	const requirements = new Requirements();
	requirements.withAssertionsEnabled().withAssertionsEnabled();
	t.end();
});

test("Configuration.getContext", function(t)
{
	const requirements = new Requirements();
	t.deepEqual(requirements.getContext(), []);
	t.end();
});

test("Configuration.putContext", function(t)
{
	const requirements = new Requirements();
	const valueNotString = 12345;
	const newConfig = requirements.putContext("key", valueNotString);
	t.notEqual(requirements, newConfig);
	t.deepEqual(newConfig.getContext(), new Map([["key", valueNotString]]));
	t.end();
});

test("Configuration.putContext(keyNotString)", function(t)
{
	const requirements = new Requirements();
	t.throws(function()
	{
		// noinspection JSCheckFunctionSignatures
		requirements.putContext(5, "value");
	}, TypeError);
	t.end();
});

test("Configuration.putContext(keyNotSet)", function(t)
{
	const requirements = new Requirements();
	t.throws(function()
	{
		requirements.putContext(null, "value");
	}, TypeError);
	t.end();
});

test("Configuration.convertToString(undefined)", function(t)
{
	const config = new Configuration();
	const actual = config.convertToString("undefined");
	t.strictEqual(actual, "undefined");
	t.end();
});

test("Configuration.convertToString(null)", function(t)
{
	const config = new Configuration();
	const actual = config.convertToString("null");
	t.strictEqual(actual, "null");
	t.end();
});