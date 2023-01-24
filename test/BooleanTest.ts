import
{
	Configuration,
	TerminalEncoding,
	TestGlobalConfiguration
} from "../src/internal/internal.js";
import {Requirements} from "../src/index.js";
import
{
	suite,
	test
} from "mocha";
import {assert} from "chai";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

suite("BooleanTest", () =>
{
	test("isTrue", () =>
	{
		requirements.requireThat(true, "actual").asBoolean().isTrue();
	});

	test("isTrue_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(false, "actual").asBoolean().isTrue();
		}, RangeError);
	});

	test("isFalse", () =>
	{
		requirements.requireThat(false, "actual").asBoolean().isFalse();
	});

	test("isFalse_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(true, "actual").asBoolean().isFalse();
		}, RangeError);
	});

	test("undefinedAsBoolean", () =>
	{
		let actual;
		requirements.requireThat(actual, "actual").asBoolean().isFalse();
	});

	test("nullAsBoolean", () =>
	{
		const actual = null;
		requirements.requireThat(actual, "actual").asBoolean().isFalse();
	});

	test("ZeroNumberAsBoolean", () =>
	{
		const actual = 0;
		requirements.requireThat(actual, "actual").asBoolean().isFalse();
	});

	test("nonZeroNumberAsBoolean", () =>
	{
		const actual = 1;
		requirements.requireThat(actual, "actual").asBoolean().isTrue();
	});

	test("zeroStringAsBoolean", () =>
	{
		const actual = "0";
		requirements.requireThat(actual, "actual").asBoolean().isTrue();
	});

	test("nonZeroStringAsBoolean", () =>
	{
		const actual = "1";
		requirements.requireThat(actual, "actual").asBoolean().isTrue();
	});

	test("trueStringAsBoolean", () =>
	{
		const actual = "true";
		requirements.requireThat(actual, "actual").asBoolean().isTrue();
	});

	test("emptyStringAsBoolean", () =>
	{
		const actual = "";
		requirements.requireThat(actual, "actual").asBoolean().isFalse();
	});

	test("falseStringAsBoolean", () =>
	{
		const actual = "false";
		requirements.requireThat(actual, "actual").asBoolean().isTrue();
	});

	test("asString_true", () =>
	{
		const actual = true;
		requirements.requireThat(actual, "actual").asBoolean().asString().isEqualTo("true");
	});

	test("asString_false", () =>
	{
		const actual = false;
		requirements.requireThat(actual, "actual").asBoolean().asString().isEqualTo("false");
	});

	test("getActual", () =>
	{
		const input = true;
		const output = requirements.requireThat(input, "input").getActual();
		assert.equal(output, input);
	});
});