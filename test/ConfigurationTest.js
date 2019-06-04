import Configuration from "../src/Configuration.js";
import test from "tape-catch";
import Requirements from "../src/Requirements.js";

class IllegalArgumentException extends Error
{
}

test("Configuration.undefinedInternalVerifier", function(t)
{
	t.throws(function()
	{
		// eslint-disable-next-line no-new
		new Configuration();
	}, TypeError);
	t.end();
});

test("Configuration.withAssertionsDisabled", function(t)
{
	const requirements = new Requirements();
	const config = new Configuration(requirements);
	config.withAssertionsEnabled().withAssertionsDisabled();
	t.end();
});

test("Configuration.withAssertionsDisabled().alreadyDisabled", function(t)
{
	const requirements = new Requirements();
	const config = new Configuration(requirements);
	config.withAssertionsDisabled();
	t.end();
});

test("Configuration.withAssertionsEnabled", function(t)
{
	const requirements = new Requirements();
	const config = new Configuration(requirements);
	config.withAssertionsEnabled();
	t.end();
});

test("Configuration.withAssertionsEnabled().alreadyEnabled", function(t)
{
	const requirements = new Requirements();
	const config = new Configuration(requirements);
	config.withAssertionsEnabled().withAssertionsEnabled();
	t.end();
});

test("Configuration.withException(undefined)", function(t)
{
	t.throws(function()
	{
		const requirements = new Requirements();
		const config = new Configuration(requirements);
		config.withException();
	}, TypeError);
	t.end();
});

test("Configuration.withException(null)", function(t)
{
	t.throws(function()
	{
		const requirements = new Requirements();
		const config = new Configuration(requirements);
		config.withException(null);
	}, TypeError);
	t.end();
});

test("Configuration.withException(notException)", function(t)
{
	t.throws(function()
	{
		const requirements = new Requirements();
		const config = new Configuration(requirements);
		config.withException("notAnException");
	}, TypeError);
	t.end();
});

test("Configuration.withDefaultException", function(t)
{
	const requirements = new Requirements();
	const config = new Configuration(requirements);
	config.withDefaultException();
	config.withException(IllegalArgumentException).withDefaultException();
	t.end();
});

test("Configuration.withException(existingException)", function(t)
{
	const requirements = new Requirements();
	const config = new Configuration(requirements);
	config.withException(IllegalArgumentException).withException(IllegalArgumentException);
	t.end();
});

test("Configuration.getContext", function(t)
{
	const requirements = new Requirements();
	const config = new Configuration(requirements);
	t.deepEqual(config.getContext(), []);
	t.end();
});

test("Configuration.putContext", function(t)
{
	const requirements = new Requirements();
	const config = new Configuration(requirements);
	const valueNotString = 12345;
	const newConfig = config.putContext("key", valueNotString);
	t.notEqual(config, newConfig);
	t.deepEqual(newConfig.getContext(), new Map([["key", valueNotString]]));
	t.end();
});

test("Configuration.putContext(keyNotString)", function(t)
{
	const requirements = new Requirements();
	const config = new Configuration(requirements);
	t.throws(function()
	{
		config.putContext(5, "value");
	}, TypeError);
	t.end();
});

test("Configuration.putContext(keyNotSet)", function(t)
{
	const requirements = new Requirements();
	const config = new Configuration(requirements);
	t.throws(function()
	{
		config.putContext(null, "value");
	}, TypeError);
	t.end();
});

test("Configuration.convertToString(undefined)", function(t)
{
	const requirements = new Requirements();
	const config = new Configuration(requirements);
	const actual = config.convertToString("undefined");
	t.strictEqual(actual, "undefined");
	t.end();
});

test("Configuration.convertToString(null)", function(t)
{
	const requirements = new Requirements();
	const config = new Configuration(requirements);
	const actual = config.convertToString("null");
	t.strictEqual(actual, "null");
	t.end();
});