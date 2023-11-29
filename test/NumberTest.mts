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
		requirements.requireThat(0 as unknown, "actual").isNumber().isBetween(0, 2);
	});

	test("isBetween_actualIsInBounds", () =>
	{
		requirements.requireThat(1 as unknown, "actual").isNumber().isBetween(0, 2);
	});

	test("isBetween_actualIsUpperBound", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(2 as unknown, "actual").isNumber().isBetween(0, 2);
		}, RangeError);
	});

	test("isBetween_actualIsBelow", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1 as unknown, "actual").isNumber().isBetween(10, 20);
		}, RangeError);
	});

	test("isBetweenClosed_actualIsUpperBound", () =>
	{
		requirements.requireThat(2 as unknown, "actual").isNumber().isBetweenClosed(0, 2);
	});

	test("isNegative_actualIsNegativeOne", () =>
	{
		requirements.requireThat(-1 as unknown, "actual").isNumber().isNegative();
	});

	test("isNegative_actualIsZero", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(0 as unknown, "actual").isNumber().isNegative();
		}, RangeError);
	});

	test("isNegative_actualIsOne", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1 as unknown, "actual").isNumber().isNegative();
		}, RangeError);
	});

	test("isNotNegative", () =>
	{
		requirements.requireThat(0 as unknown, "actual").isNumber().isNotNegative();
		requirements.requireThat(1 as unknown, "actual").isNumber().isNotNegative();
	});

	test("isNotNegative_actualIsNegativeOne", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(-1 as unknown, "actual").isNumber().isNotNegative();
		}, RangeError);
	});

	test("isZero", () =>
	{
		requirements.requireThat(0 as unknown, "actual").isNumber().isZero();
	});

	test("isZero_actualIsOne", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1 as unknown, "actual").isNumber().isZero();
		}, RangeError);
	});

	test("isZero_actualIsNegativeOne", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(-1 as unknown, "actual").isNumber().isZero();
		}, RangeError);
	});

	test("isNotZero", () =>
	{
		requirements.requireThat(-1 as unknown, "actual").isNumber().isNotZero();
		requirements.requireThat(1 as unknown, "actual").isNumber().isNotZero();
	});

	test("isNotZero_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(0 as unknown, "actual").isNumber().isNotZero();
		}, RangeError);
	});

	test("isPositive", () =>
	{
		requirements.requireThat(1 as unknown, "actual").isNumber().isPositive();
	});

	test("isPositive_actualIsZero", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(0 as unknown, "actual").isNumber().isPositive();
		}, RangeError);
	});

	test("isPositive_actualIsNegativeOne", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(-1 as unknown, "actual").isNumber().isPositive();
		}, RangeError);
	});

	test("isNotPositive", () =>
	{
		requirements.requireThat(0 as unknown, "actual").isNumber().isNotPositive();
		requirements.requireThat(-1 as unknown, "actual").isNumber().isNotPositive();
	});

	test("isNotPositive_actualIsOne", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1 as unknown, "actual").isNumber().isNotPositive();
		}, RangeError);
	});

	test("isLessThanVariable", () =>
	{
		requirements.requireThat(0 as unknown, "actual").isNumber().isLessThan(1, "expected");
	});

	test("isLessThanConstant", () =>
	{
		requirements.requireThat(0 as unknown, "actual").isNumber().isLessThan(1);
	});

	test("isLessThanVariable_actualIsEqual", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1 as unknown, "actual").isNumber().isLessThan(1, "expected");
		}, RangeError);
	});

	test("isLessThanConstant_actualIsEqual", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1 as unknown, "actual").isNumber().isLessThan(1);
		}, RangeError);
	});

	test("isLessThanVariable_actualIsGreater", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(2 as unknown, "actual").isNumber().isLessThan(1, "expected");
		}, RangeError);
	});

	test("isLessThanConstant_actualIsGreater", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(2 as unknown, "actual").isNumber().isLessThan(1);
		}, RangeError);
	});

	test("isLessThanOrEqualToVariable", () =>
	{
		requirements.requireThat(1 as unknown, "actual").isNumber().isLessThanOrEqualTo(1, "expected");
	});

	test("isLessThanOrEqualToConstant", () =>
	{
		requirements.requireThat(1 as unknown, "actual").isNumber().isLessThanOrEqualTo(1);
	});

	test("isLessThanOrEqualToVariable_actualIsGreater", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(3 as unknown, "actual").isNumber().isLessThanOrEqualTo(2, "expected");
		}, RangeError);
	});

	test("isLessThanOrEqualToConstant_actualIsGreater", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(3 as unknown, "actual").isNumber().isLessThanOrEqualTo(2);
		}, RangeError);
	});

	test("isGreaterThanVariable", () =>
	{
		requirements.requireThat(1 as unknown, "actual").isNumber().isGreaterThan(0, "expected");
	});

	test("isGreaterThanConstant", () =>
	{
		requirements.requireThat(1 as unknown, "actual").isNumber().isGreaterThan(0);
	});

	test("isGreaterThanVariable_actualIsEqual", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1 as unknown, "actual").isNumber().isGreaterThan(1, "expected");
		}, RangeError);
	});

	test("isGreaterThanConstant_actualIsEqual", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1 as unknown, "actual").isNumber().isGreaterThan(1);
		}, RangeError);
	});

	test("isGreaterThanVariable_actualIsLess", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1 as unknown, "actual").isNumber().isGreaterThan(2,
				"expected");
		}, RangeError);
	});

	test("isGreaterThanConstant_actualIsLess", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1 as unknown, "actual").isNumber().isGreaterThan(2);
		}, RangeError);
	});

	test("isGreaterThanOrEqualToVariable", () =>
	{
		requirements.requireThat(1 as unknown, "actual").isNumber().isGreaterThanOrEqualTo(1, "expected");
	});

	test("isGreaterThanOrEqualToConstant", () =>
	{
		requirements.requireThat(1 as unknown, "actual").isNumber().isGreaterThanOrEqualTo(1);
	});

	test("isGreaterThanOrEqualToVariable_actualIsLess", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1 as unknown, "actual").isNumber().isGreaterThanOrEqualTo(2, "expected");
		}, RangeError);
	});

	test("isGreaterThanOrEqualToConstant_actualIsLess", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1 as unknown, "actual").isNumber().isGreaterThanOrEqualTo(2);
		}, RangeError);
	});

	test("isFinite", () =>
	{
		requirements.requireThat(1.0 as unknown, "actual").isNumber().isFinite();
	});

	test("isFinite_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1.0 / 0.0 as unknown, "actual").isNumber().isFinite();
		}, RangeError);
	});

	test("isNotFinite", () =>
	{
		requirements.requireThat(1.0 / 0.0 as unknown, "actual").isNumber().isInfinite();
	});

	test("isNotFinite_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1.0 as unknown, "actual").isNumber().isInfinite();
		}, RangeError);
	});

	test("isNumber", () =>
	{
		requirements.requireThat(1.0 as unknown, "actual").isNumber();
	});

	test("isNumber_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(0.0 / 0.0 as unknown, "actual").isNumber().isFinite();
		}, RangeError);
	});

	test("isInfinite", () =>
	{
		requirements.requireThat(0.0 / 0.0 as unknown, "actual").isNumber().isInfinite();
	});

	test("isInfinite_False", () =>
	{
		assert.throws(function()
		{
			requirements.requireThat(1.0 as unknown, "actual").isNumber().isInfinite();
		}, RangeError);
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
		const actualFailures = requirements.validateThat(actual, "actual").isNumber().getFailures();
		const actualMessages = actualFailures.map(failure => failure.getMessage());
		requirements.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	});
});