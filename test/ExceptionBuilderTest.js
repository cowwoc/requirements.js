import Configuration from "../src/Configuration.js";
import ExceptionBuilder from "../src/internal/ExceptionBuilder.js";
import test from "tape-catch";
import Requirements from "../src/Requirements.js";

test("ExceptionBuilderTest_configurationIsUndefined", function(t)
{
	t.throws(function()
	{
		// eslint-disable-next-line no-new
		new ExceptionBuilder();
	}, TypeError);
	t.end();
});

test("ExceptionBuilderTest_typeIsUndefined", function(t)
{
	t.throws(function()
	{
		const requirements = new Requirements();
		const config = new Configuration(requirements);
		// eslint-disable-next-line no-new
		new ExceptionBuilder(config);
	}, TypeError);
	t.end();
});

test("ExceptionBuilderTest_messageIsUndefined", function(t)
{
	t.throws(function()
	{
		const requirements = new Requirements();
		const config = new Configuration(requirements);
		// eslint-disable-next-line no-new
		new ExceptionBuilder(config, RangeError);
	}, TypeError);
	t.end();
});

test("ExceptionBuilderTest.type", function(t)
{
	const requirements = new Requirements();
	const config = new Configuration(requirements);
	// eslint-disable-next-line no-new
	new ExceptionBuilder(config, RangeError, "message").type(TypeError);
	t.end();
});

test("ExceptionBuilderTest.type_False", function(t)
{
	t.throws(function()
	{
		const requirements = new Requirements();
		const config = new Configuration(requirements);
		// eslint-disable-next-line no-new
		new ExceptionBuilder(config, RangeError, "message").type(null);
	}, TypeError);
	t.end();
});

test("ExceptionBuilderTest.addContext", function(t)
{
	const requirements = new Requirements();
	const valueNotString = 12345;
	const config = new Configuration(requirements).putContext("key", valueNotString);
	// eslint-disable-next-line no-new
	new ExceptionBuilder(config, RangeError, "message").build();
	t.end();
});

test("ExceptionBuilderTest.addContext_keyNotString", function(t)
{
	t.throws(function()
	{
		const requirements = new Requirements();
		const config = new Configuration(requirements);
		// eslint-disable-next-line no-new
		new ExceptionBuilder(config, RangeError, "message").addContext(null);
	}, TypeError);
	t.end();
});