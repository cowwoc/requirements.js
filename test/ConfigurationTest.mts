import {
	Configuration,
	Requirements,
	TerminalEncoding,
	TestGlobalConfiguration
} from "../src/internal/internal.mjs";
import {
	suite,
	test
} from "mocha";
import {assert} from "chai";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

suite("Configuration", () =>
{
	test("withAssertionsDisabled", () =>
	{
		requirements.withAssertionsEnabled().withAssertionsDisabled();
	});

	test("withAssertionsDisabled().alreadyDisabled", () =>
	{
		requirements.withAssertionsDisabled();
	});

	test("withAssertionsEnabled", () =>
	{
		requirements.withAssertionsEnabled();
	});

	test("withAssertionsEnabled().alreadyEnabled", () =>
	{
		requirements.withAssertionsEnabled().withAssertionsEnabled();
	});

	test("getContext", () =>
	{
		assert.deepEqual(requirements.getContext(), new Map());
	});

	test("putContext", () =>
	{
		const valueNotString = 12345;
		const requirements2 = requirements.putContext("key", valueNotString);
		assert.equal(requirements, requirements2);
	});

	test("putContext(keyNotString)", () =>
	{
		assert.throws(function()
		{
			requirements.putContext(5 as unknown as string, "value");
		}, TypeError);
	});

	test("putContext(keyNotSet)", () =>
	{
		assert.throws(function()
		{
			requirements.putContext(null as unknown as string, "value");
		}, TypeError);
	});

	test("convertToString(undefined)", () =>
	{
		// eslint-disable-next-line no-undefined
		const actual = configuration.convertToString(undefined);
		assert.strictEqual(actual, "undefined");
	});

	test("convertToString(null)", () =>
	{
		const actual = configuration.convertToString(null);
		assert.strictEqual(actual, "null");
	});
});