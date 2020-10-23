import test from "tape-catch";
import {Requirements} from "../src/index";
import {
	Configuration,
	TerminalEncoding,
	TestGlobalConfiguration,
	ValidationFailure
} from "../src/internal/internal";

test("ValidationFailureTest_configurationIsUndefined", function(t)
{
	t.throws(function()
	{
		let configuration: undefined;
		let exceptionType: undefined;
		let message: undefined;

		// eslint-disable-next-line no-new
		new ValidationFailure(configuration as unknown as Configuration,
			exceptionType as unknown as new (message: string) => Error, message as unknown as string);
	}, TypeError);
	t.end();
});

test("ValidationFailureTest_typeIsUndefined", function(t)
{
	t.throws(function()
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);

		let type: undefined;
		// eslint-disable-next-line no-new
		new ValidationFailure(configuration, type as unknown as new (message: string) => Error, "message");
	}, TypeError);
	t.end();
});

test("ValidationFailureTest_messageIsUndefined", function(t)
{
	t.throws(function()
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);

		let message: undefined;

		// eslint-disable-next-line no-new
		new ValidationFailure(configuration, RangeError, message as unknown as string);
	}, TypeError);
	t.end();
});

test("ValidationFailureTest.addContext", function(t)
{
	const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
	const configuration = new Configuration(globalConfiguration);

	const valueNotString = 12345;
	// eslint-disable-next-line no-new
	new ValidationFailure(configuration, RangeError, "message").
		addContext("key", valueNotString);
	t.end();
});

test("ValidationFailureTest.addContext_keyNotString", function(t)
{
	t.throws(function()
	{
		const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
		const configuration = new Configuration(globalConfiguration);

		const key = null;

		// eslint-disable-next-line no-new
		new ValidationFailure(configuration, RangeError, "message").
			addContext(key as unknown as string, null);
	}, TypeError);
	t.end();
});

test("ValidationFailureTest.messageWithoutFormatting", function(t)
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
	t.end();
});