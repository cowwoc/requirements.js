import test from "tape-catch";
import ValidationFailure from "../src/ValidationFailure.js";
import Requirements from "../src/Requirements.js";
import TestGlobalConfiguration from "../src/internal/TestGlobalConfiguration.js";
import TerminalEncoding from "../src/TerminalEncoding.js";
import Configuration from "../src/Configuration.js";
import {requireThat} from "../src/DefaultRequirements.js";

test("ValidationFailureTest_configurationIsUndefined", function(t)
{
	t.throws(function()
	{
		// eslint-disable-next-line no-new
		new ValidationFailure();
	}, TypeError);
	t.end();
});

test("ValidationFailureTest_typeIsUndefined", function(t)
{
	t.throws(function()
	{
		const requirements = new Requirements();
		const config = requirements.config;
		let type;
		// eslint-disable-next-line no-new
		new ValidationFailure(config, type, "message");
	}, TypeError);
	t.end();
});

test("ValidationFailureTest_messageIsUndefined", function(t)
{
	t.throws(function()
	{
		const requirements = new Requirements();
		const config = requirements.config;
		// eslint-disable-next-line no-new
		new ValidationFailure(config, RangeError);
	}, TypeError);
	t.end();
});

test("ValidationFailureTest.addContext", function(t)
{
	const requirements = new Requirements();
	const valueNotString = 12345;
	const config = requirements.config;
	// eslint-disable-next-line no-new
	new ValidationFailure(config, RangeError, "message").
		addContext("key", valueNotString);
	t.end();
});

test("ValidationFailureTest.addContext_keyNotString", function(t)
{
	t.throws(function()
	{
		const requirements = new Requirements();
		const config = requirements.config;
		// eslint-disable-next-line no-new
		new ValidationFailure(config, RangeError, "message").addContext(null);
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
	requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	t.end();
});