import Configuration from "../node/Configuration";
import ExceptionBuilder from "../node/ExceptionBuilder";
import test from "tape-catch";
import Verifiers from "../node/Verifiers";

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
		const verifiers = new Verifiers();
		const config = new Configuration(verifiers);
		// eslint-disable-next-line no-new
		new ExceptionBuilder(config);
	}, TypeError);
	t.end();
});

test("ExceptionBuilderTest_messageIsUndefined", function(t)
{
	t.throws(function()
	{
		const verifiers = new Verifiers();
		const config = new Configuration(verifiers);
		// eslint-disable-next-line no-new
		new ExceptionBuilder(config, RangeError);
	}, TypeError);
	t.end();
});

test("ExceptionBuilderTest.type", function(t)
{
	const verifiers = new Verifiers();
	const config = new Configuration(verifiers);
	// eslint-disable-next-line no-new
	new ExceptionBuilder(config, RangeError, "message").type(TypeError);
	t.end();
});

test("ExceptionBuilderTest.type_False", function(t)
{
	t.throws(function()
	{
		const verifiers = new Verifiers();
		const config = new Configuration(verifiers);
		// eslint-disable-next-line no-new
		new ExceptionBuilder(config, RangeError, "message").type(null);
	}, TypeError);
	t.end();
});

test("ExceptionBuilderTest.addContext", function(t)
{
	const verifiers = new Verifiers();
	const valueNotString = 12345;
	const config = new Configuration(verifiers).addContext("key", valueNotString);
	// eslint-disable-next-line no-new
	new ExceptionBuilder(config, RangeError, "message").build();
	t.end();
});

test("ExceptionBuilderTest.addContext_keyNotString", function(t)
{
	t.throws(function()
	{
		const verifiers = new Verifiers();
		const config = new Configuration(verifiers);
		// eslint-disable-next-line no-new
		new ExceptionBuilder(config, RangeError, "message").addContext(null);
	}, TypeError);
	t.end();
});

test("ExceptionBuilderTest.addContextArray", function(t)
{
	const verifiers = new Verifiers();
	const config = new Configuration(verifiers);
	// eslint-disable-next-line no-new
	new ExceptionBuilder(config, RangeError, "message").addContextArray(
		[
			["key", "value"]
		]);
	t.end();
});

test("ExceptionBuilderTest.addContextArray_arrayIsUndefined", function(t)
{
	t.throws(function()
	{
		const verifiers = new Verifiers();
		const config = new Configuration(verifiers);
		// eslint-disable-next-line no-new
		new ExceptionBuilder(config, RangeError, "message").addContextArray(null);
	}, TypeError);
	t.end();
});

test("ExceptionBuilderTest.addContextArray_keyIsUndefined", function(t)
{
	t.throws(function()
	{
		const verifiers = new Verifiers();
		const config = new Configuration(verifiers);
		let key;
		// eslint-disable-next-line no-new
		new ExceptionBuilder(config, RangeError, "message").addContextArray(
			[
				[key, "value"]
			]);
	}, TypeError);
	t.end();
});