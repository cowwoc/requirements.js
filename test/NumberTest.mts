import {
	Requirements,
	Configuration,
	TerminalEncoding
} from "../src/index.mjs";
import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {TestGlobalConfiguration} from "./TestGlobalConfiguration.mjs";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

suite("NumberTest", () =>
{
	test("isBetween_actualIsLowerBound", () =>
	{
		requirements.requireThat(0, "actual").asNumber().isBetween(0, 2);
	});

	test("isBetween_actualIsInBounds", () =>
	{
		requirements.requireThat(1, "actual").asNumber().isBetween(0, 2);
	});

	test("isBetween_actualIsUpperBound", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(2, "actual").asNumber().isBetween(0, 2);
		}, RangeError);
	});

	test("isBetween_actualIsBelow", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1, "actual").asNumber().isBetween(10, 20);
		}, RangeError);
	});

	test("isBetweenClosed_actualIsUpperBound", () =>
	{
		requirements.requireThat(2, "actual").asNumber().isBetweenClosed(0, 2);
	});

	test("isNegative_actualIsNegativeOne", () =>
	{
		requirements.requireThat(-1, "actual").asNumber().isNegative();
	});

	test("isNegative_actualIsZero", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(0, "actual").asNumber().isNegative();
		}, RangeError);
	});

	test("isNegative_actualIsOne", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1, "actual").asNumber().isNegative();
		}, RangeError);
	});

	test("isNotNegative", () =>
	{
		requirements.requireThat(0, "actual").asNumber().isNotNegative();
		requirements.requireThat(1, "actual").asNumber().isNotNegative();
	});

	test("isNotNegative_actualIsNegativeOne", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(-1, "actual").asNumber().isNotNegative();
		}, RangeError);
	});

	test("isZero", () =>
	{
		requirements.requireThat(0, "actual").asNumber().isZero();
	});

	test("isZero_actualIsOne", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1, "actual").asNumber().isZero();
		}, RangeError);
	});

	test("isZero_actualIsNegativeOne", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(-1, "actual").asNumber().isZero();
		}, RangeError);
	});

	test("isNotZero", () =>
	{
		requirements.requireThat(-1, "actual").asNumber().isNotZero();
		requirements.requireThat(1, "actual").asNumber().isNotZero();
	});

	test("isNotZero_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(0, "actual").asNumber().isNotZero();
		}, RangeError);
	});

	test("isPositive", () =>
	{
		requirements.requireThat(1, "actual").asNumber().isPositive();
	});

	test("isPositive_actualIsZero", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(0, "actual").asNumber().isPositive();
		}, RangeError);
	});

	test("isPositive_actualIsNegativeOne", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(-1, "actual").asNumber().isPositive();
		}, RangeError);
	});

	test("isNotPositive", () =>
	{
		requirements.requireThat(0, "actual").asNumber().isNotPositive();
		requirements.requireThat(-1, "actual").asNumber().isNotPositive();
	});

	test("isNotPositive_actualIsOne", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1, "actual").asNumber().isNotPositive();
		}, RangeError);
	});

	test("isLessThanVariable", () =>
	{
		requirements.requireThat(0, "actual").asNumber().isLessThan(1, "expected");
	});

	test("isLessThanConstant", () =>
	{
		requirements.requireThat(0, "actual").asNumber().isLessThan(1);
	});

	test("isLessThanVariable_actualIsEqual", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1, "actual").asNumber().isLessThan(1, "expected");
		}, RangeError);
	});

	test("isLessThanConstant_actualIsEqual", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1, "actual").asNumber().isLessThan(1);
		}, RangeError);
	});

	test("isLessThanVariable_actualIsGreater", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(2, "actual").asNumber().isLessThan(1, "expected");
		}, RangeError);
	});

	test("isLessThanConstant_actualIsGreater", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(2, "actual").asNumber().isLessThan(1);
		}, RangeError);
	});

	test("isLessThanOrEqualToVariable", () =>
	{
		requirements.requireThat(1, "actual").asNumber().isLessThanOrEqualTo(1, "expected");
	});

	test("isLessThanOrEqualToConstant", () =>
	{
		requirements.requireThat(1, "actual").asNumber().isLessThanOrEqualTo(1);
	});

	test("isLessThanOrEqualToVariable_actualIsGreater", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(3, "actual").asNumber().isLessThanOrEqualTo(2, "expected");
		}, RangeError);
	});

	test("isLessThanOrEqualToConstant_actualIsGreater", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(3, "actual").asNumber().isLessThanOrEqualTo(2);
		}, RangeError);
	});

	test("isGreaterThanVariable", () =>
	{
		requirements.requireThat(1, "actual").asNumber().isGreaterThan(0, "expected");
	});

	test("isGreaterThanConstant", () =>
	{
		requirements.requireThat(1, "actual").asNumber().isGreaterThan(0);
	});

	test("isGreaterThanVariable_actualIsEqual", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1, "actual").asNumber().isGreaterThan(1, "expected");
		}, RangeError);
	});

	test("isGreaterThanConstant_actualIsEqual", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1, "actual").asNumber().isGreaterThan(1);
		}, RangeError);
	});

	test("isGreaterThanVariable_actualIsLess", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1, "actual").asNumber().isGreaterThan(2,
				"expected");
		}, RangeError);
	});

	test("isGreaterThanConstant_actualIsLess", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1, "actual").asNumber().isGreaterThan(2);
		}, RangeError);
	});

	test("isGreaterThanOrEqualToVariable", () =>
	{
		requirements.requireThat(1, "actual").asNumber().isGreaterThanOrEqualTo(1, "expected");
	});

	test("isGreaterThanOrEqualToConstant", () =>
	{
		requirements.requireThat(1, "actual").asNumber().isGreaterThanOrEqualTo(1);
	});

	test("isGreaterThanOrEqualToVariable_actualIsLess", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1, "actual").asNumber().isGreaterThanOrEqualTo(2, "expected");
		}, RangeError);
	});

	test("isGreaterThanOrEqualToConstant_actualIsLess", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1, "actual").asNumber().isGreaterThanOrEqualTo(2);
		}, RangeError);
	});

	test("isFinite", () =>
	{
		requirements.requireThat(1.0, "actual").asNumber().isFinite();
	});

	test("isFinite_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1.0 / 0.0, "actual").asNumber().isFinite();
		}, RangeError);
	});

	test("isNotFinite", () =>
	{
		requirements.requireThat(1.0 / 0.0, "actual").asNumber().isNotFinite();
	});

	test("isNotFinite_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1.0, "actual").asNumber().isNotFinite();
		}, RangeError);
	});

	test("isNumber", () =>
	{
		requirements.requireThat(1.0, "actual").asNumber().isNumber();
	});

	test("isNumber_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(0.0 / 0.0, "actual").asNumber().isNumber();
		}, RangeError);
	});

	test("isNotNumber", () =>
	{
		requirements.requireThat(0.0 / 0.0, "actual").asNumber().isNotNumber();
	});

	test("isNotNumber_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1.0, "actual").asNumber().isNotNumber();
		}, RangeError);
	});

	test("asString", () =>
	{
		const actual = 5;
		requirements.requireThat(actual, "actual").asNumber().asString().isEqualTo("5");
	});

	test("getActual", () =>
	{
		const input = 5;
		const output = requirements.requireThat(input, "input").getActual();
		assert.equal(output, input);
	});

	test("validateThatNullAsNumber", () =>
	{
		const actual = null;
		const expectedMessages = ["actual must be a number.\n" +
		"Actual: null\n" +
		"Type  : null"];
		const actualFailures = requirements.validateThat(actual, "actual").asNumber().getFailures();
		const actualMessages = actualFailures.map(failure => failure.getMessage());
		requirements.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	});
});