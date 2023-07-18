import {
	Configuration,
	TerminalEncoding,
	TestGlobalConfiguration,
	ValidationFailure
} from "../src/internal/internal.mjs";
import {Requirements} from "../src/index.mjs";
import {
	suite,
	test
} from "mocha";
import {assert} from "chai";

suite("ValidationFailureTest", () =>
{
	test("configurationIsUndefined", () =>
	{
		assert.throws(function()
		{
			let configuration: undefined;
			let exceptionType: undefined;
			let message: undefined;

			// eslint-disable-next-line no-new
			new ValidationFailure(configuration as unknown as Configuration,
				exceptionType as unknown as new (exceptionMessage: string) => Error, message as unknown as string);
		}, TypeError);
	});

	test("typeIsUndefined", () =>
	{
		assert.throws(function()
		{
			const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
			const configuration = new Configuration(globalConfiguration);

			let type: undefined;
			// eslint-disable-next-line no-new
			new ValidationFailure(configuration, type as unknown as new (message: string) => Error, "message");
		}, TypeError);
	});

	test("messageIsUndefined", () =>
	{
		assert.throws(function()
		{
			const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
			const configuration = new Configuration(globalConfiguration);

			let message: undefined;

			// eslint-disable-next-line no-new
			new ValidationFailure(configuration, RangeError, message as unknown as string);
		}, TypeError);
	});

	test("addContext", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);

		const valueNotString = 12345;
		// eslint-disable-next-line no-new
		new ValidationFailure(configuration, RangeError, "message").
			addContext("key", valueNotString);
	});

	test("addContext_keyNotString", () =>
	{
		assert.throws(function()
		{
			const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
			const configuration = new Configuration(globalConfiguration);

			const key = null;

			// eslint-disable-next-line no-new
			new ValidationFailure(configuration, RangeError, "message").
				addContext(key as unknown as string, null);
		}, TypeError);
	});

	test("messageWithoutFormatting", () =>
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NODE_16_COLORS);
		const configuration = new Configuration(globalConfiguration);
		const requirements = new Requirements(configuration);

		const actual = "int[6]";
		const expected = "int[5]";
		const expectedMessage = "actual must be equal to " + expected + ".\n" +
			"Actual: int[6]";
		const expectedMessages = [expectedMessage];

		const actualFailures = requirements.withoutDiff().
			validateThat(actual, "actual").
			isEqualTo(expected).getFailures();
		const actualMessages = actualFailures.map(failure => failure.getMessage());
		requirements.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	});
});