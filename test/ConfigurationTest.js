import Configuration from "../node/Configuration";
import test from "tape-catch";
import Verifiers from "../node/Verifiers";

class IllegalArgumentException extends Error {
}

test("Configuration.undefinedInternalVerifier()", function(t)
{
	t.throws(function()
	{
		// eslint-disable-next-line no-new
		new Configuration();
	}, TypeError);
	t.end();
});

test("Configuration.withAssertionsDisabled()", function(t)
{
	const verifiers = new Verifiers();
	const config = new Configuration(verifiers);
	config.withAssertionsEnabled().withAssertionsDisabled();
	t.end();
});

test("Configuration.withAssertionsDisabled().alreadyDisabled", function(t)
{
	const verifiers = new Verifiers();
	const config = new Configuration(verifiers);
	config.withAssertionsDisabled();
	t.end();
});

test("Configuration.withAssertionsEnabled()", function(t)
{
	const verifiers = new Verifiers();
	const config = new Configuration(verifiers);
	config.withAssertionsEnabled();
	t.end();
});

test("Configuration.withAssertionsEnabled().alreadyEnabled", function(t)
{
	const verifiers = new Verifiers();
	const config = new Configuration(verifiers);
	config.withAssertionsEnabled().withAssertionsEnabled();
	t.end();
});

test("Configuration.withException(undefined)", function(t)
{
	t.throws(function()
	{
		const verifiers = new Verifiers();
		const config = new Configuration(verifiers);
		config.withException();
	}, TypeError);
	t.end();
});

test("Configuration.withException(null)", function(t)
{
	t.throws(function()
	{
		const verifiers = new Verifiers();
		const config = new Configuration(verifiers);
		config.withException(null);
	}, TypeError);
	t.end();
});

test("Configuration.withException(notException)", function(t)
{
	t.throws(function()
	{
		const verifiers = new Verifiers();
		const config = new Configuration(verifiers);
		config.withException("notAnException");
	}, TypeError);
	t.end();
});

test("Configuration.withDefaultException()", function(t)
{
	const verifiers = new Verifiers();
	const config = new Configuration(verifiers);
	config.withDefaultException();
	config.withException(IllegalArgumentException).withDefaultException();
	t.end();
});

test("Configuration.withException(existingException)", function(t)
{
	const verifiers = new Verifiers();
	const config = new Configuration(verifiers);
	config.withException(IllegalArgumentException).withException(IllegalArgumentException);
	t.end();
});

test("Configuration.getContext()", function(t)
{
	const verifiers = new Verifiers();
	const config = new Configuration(verifiers);
	t.deepEqual(config.getContext(), []);
	t.end();
});

test("Configuration.addContext()", function(t)
{
	const verifiers = new Verifiers();
	const config = new Configuration(verifiers);
	const newConfig = config.addContext("key", "value");
	t.notEqual(config, newConfig);
	t.deepEqual(newConfig.getContext(), [["key", "value"]]);
	t.end();
});

test("Configuration.addContext(keyNotString)", function(t)
{
	const verifiers = new Verifiers();
	const config = new Configuration(verifiers);
	t.throws(function()
	{
		config.addContext(5, "value");
	}, TypeError);
	t.end();
});

test("Configuration.addContext(keyNotSet)", function(t)
{
	const verifiers = new Verifiers();
	const config = new Configuration(verifiers);
	t.throws(function()
	{
		config.addContext(null, "value");
	}, TypeError);
	t.end();
});

test("Configuration.addContext(key, valueNotString)", function(t)
{
	const verifiers = new Verifiers();
	const config = new Configuration(verifiers);
	t.throws(function()
	{
		config.addContext("key", 5);
	}, TypeError);
	t.end();
});

test("Configuration.addContext(key, valueNotSet)", function(t)
{
	const verifiers = new Verifiers();
	const config = new Configuration(verifiers);
	t.throws(function()
	{
		config.addContext("key", null);
	}, TypeError);
	t.end();
});