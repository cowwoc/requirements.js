import test from "tape-catch";
import Requirements from "../src/Requirements";
import {
	Configuration,
	TerminalEncoding,
	TestGlobalConfiguration
} from "../src/internal/internal";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

test("Configuration.withAssertionsDisabled", function(t)
{
	requirements.withAssertionsEnabled().withAssertionsDisabled();
	t.end();
});

test("Configuration.withAssertionsDisabled().alreadyDisabled", function(t)
{
	requirements.withAssertionsDisabled();
	t.end();
});

test("Configuration.withAssertionsEnabled", function(t)
{
	requirements.withAssertionsEnabled();
	t.end();
});

test("Configuration.withAssertionsEnabled().alreadyEnabled", function(t)
{
	requirements.withAssertionsEnabled().withAssertionsEnabled();
	t.end();
});

test("Configuration.getContext", function(t)
{
	t.deepEqual(requirements.getContext(), new Map());
	t.end();
});

test("Configuration.putContext", function(t)
{
	const valueNotString = 12345;
	const newConfig = requirements.putContext("key", valueNotString);
	t.notEqual(requirements, newConfig);
	t.deepEqual(newConfig.getContext(), new Map([["key", valueNotString]]));
	t.end();
});

test("Configuration.putContext(keyNotString)", function(t)
{
	t.throws(function()
	{
		requirements.putContext(5 as unknown as string, "value");
	}, TypeError);
	t.end();
});

test("Configuration.putContext(keyNotSet)", function(t)
{
	t.throws(function()
	{
		requirements.putContext(null as unknown as string, "value");
	}, TypeError);
	t.end();
});

test("Configuration.convertToString(undefined)", function(t)
{
	// eslint-disable-next-line no-undefined
	const actual = configuration.convertToString(undefined);
	t.strictEqual(actual, "undefined");
	t.end();
});

test("Configuration.convertToString(null)", function(t)
{
	const actual = configuration.convertToString(null);
	t.strictEqual(actual, "null");
	t.end();
});