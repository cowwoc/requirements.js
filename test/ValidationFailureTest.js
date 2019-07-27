import test from "tape-catch";
import ValidationFailure from "../src/ValidationFailure.js";
import Requirements from "../src/Requirements.js";

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