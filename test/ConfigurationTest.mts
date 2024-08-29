import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {
	TerminalEncoding,
	Configuration
} from "../src/index.mjs";
import {JavascriptValidatorsImpl} from "../src/internal/validator/JavascriptValidatorsImpl.mjs";
import {TestApplicationScope} from "./TestApplicationScope.mjs";


suite("Configuration", () =>
{
	test("getContext", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		assert.deepEqual(validators.getContext(), new Map());
	});

	test("putContext", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		const valueNotString = 12345;
		const validators2 = validators.withContext(valueNotString, "key");
		assert.strictEqual(validators, validators2);
	});

	test("putContext(keyNotString)", () =>
	{
		assert.throws(function()
		{
			const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
				Configuration.DEFAULT);
			validators.withContext("value", 5 as unknown as string);
		}, TypeError);
	});

	test("putContext(keyNotSet)", () =>
	{
		assert.throws(function()
		{
			const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
				Configuration.DEFAULT);
			validators.withContext("value", null as unknown as string);
		}, TypeError);
	});

	test("convertToString(undefined)", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		const actual = validators.getConfiguration().stringMappers().toString(undefined);
		assert.strictEqual(actual, "undefined");
	});

	test("convertToString(null)", () =>
	{
		const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
			Configuration.DEFAULT);

		const actual = validators.getConfiguration().stringMappers().toString(null);
		assert.strictEqual(actual, "null");
	});
});