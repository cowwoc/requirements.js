import test from "tape-catch";
import {requireThat} from "../src/DefaultRequirements.js";
import {validateThat} from "../src/DefaultRequirements";

test("NumberTest.isBetween_actualIsLowerBound", function(t)
{
	requireThat(0, "actual").asNumber().isBetween(0, 2);
	t.end();
});

test("NumberTest.isBetween_actualIsInBounds", function(t)
{
	requireThat(1, "actual").asNumber().isBetween(0, 2);
	t.end();
});

test("NumberTest.isBetween_actualIsUpperBound", function(t)
{
	t.throws(function()
	{
		requireThat(2, "actual").asNumber().isBetween(0, 2);
	}, RangeError);
	t.end();
});

test("NumberTest.isBetween_actualIsBelow", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").asNumber().isBetween(10, 20);
	}, RangeError);
	t.end();
});

test("NumberTest.isBetweenClosed_actualIsUpperBound", function(t)
{
	requireThat(2, "actual").asNumber().isBetweenClosed(0, 2);
	t.end();
});

test("NumberTest.isNegative_actualIsNegativeOne", function(t)
{
	requireThat(-1, "actual").asNumber().isNegative();
	t.end();
});

test("NumberTest.isNegative_actualIsZero", function(t)
{
	t.throws(function()
	{
		requireThat(0, "actual").asNumber().isNegative();
	}, RangeError);
	t.end();
});

test("NumberTest.isNegative_actualIsOne", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").asNumber().isNegative();
	}, RangeError);
	t.end();
});

test("NumberTest.isNotNegative", function(t)
{
	requireThat(0, "actual").asNumber().isNotNegative();
	requireThat(1, "actual").asNumber().isNotNegative();
	t.end();
});

test("NumberTest.isNotNegative_actualIsNegativeOne", function(t)
{
	t.throws(function()
	{
		requireThat(-1, "actual").asNumber().isNotNegative();
	}, RangeError);
	t.end();
});

test("NumberTest.isZero", function(t)
{
	requireThat(0, "actual").asNumber().isZero();
	t.end();
});

test("NumberTest.isZero_actualIsOne", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").asNumber().isZero();
	}, RangeError);
	t.end();
});

test("NumberTest.isZero_actualIsNegativeOne", function(t)
{
	t.throws(function()
	{
		requireThat(-1, "actual").asNumber().isZero();
	}, RangeError);
	t.end();
});

test("NumberTest.isNotZero", function(t)
{
	requireThat(-1, "actual").asNumber().isNotZero();
	requireThat(1, "actual").asNumber().isNotZero();
	t.end();
});

test("NumberTest.isNotZero_False", function(t)
{
	t.throws(function()
	{
		requireThat(0, "actual").asNumber().isNotZero();
	}, RangeError);
	t.end();
});

test("NumberTest.isPositive", function(t)
{
	requireThat(1, "actual").asNumber().isPositive();
	t.end();
});

test("NumberTest.isPositive_actualIsZero", function(t)
{
	t.throws(function()
	{
		requireThat(0, "actual").asNumber().isPositive();
	}, RangeError);
	t.end();
});

test("NumberTest.isPositive_actualIsNegativeOne", function(t)
{
	t.throws(function()
	{
		requireThat(-1, "actual").asNumber().isPositive();
	}, RangeError);
	t.end();
});

test("NumberTest.isNotPositive", function(t)
{
	requireThat(0, "actual").asNumber().isNotPositive();
	requireThat(-1, "actual").asNumber().isNotPositive();
	t.end();
});

test("NumberTest.isNotPositive_actualIsOne", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").asNumber().isNotPositive();
	}, RangeError);
	t.end();
});

test("NumberTest.isLessThanVariable", function(t)
{
	requireThat(0, "actual").asNumber().isLessThan(1, "expected");
	t.end();
});

test("NumberTest.isLessThanConstant", function(t)
{
	requireThat(0, "actual").asNumber().isLessThan(1);
	t.end();
});

test("NumberTest.isLessThanVariable_actualIsEqual", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").asNumber().isLessThan(1, "expected");
	}, RangeError);
	t.end();
});

test("NumberTest.isLessThanConstant_actualIsEqual", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").asNumber().isLessThan(1);
	}, RangeError);
	t.end();
});

test("NumberTest.isLessThanVariable_actualIsGreater", function(t)
{
	t.throws(function()
	{
		requireThat(2, "actual").asNumber().isLessThan(1, "expected");
	}, RangeError);
	t.end();
});

test("NumberTest.isLessThanConstant_actualIsGreater", function(t)
{
	t.throws(function()
	{
		requireThat(2, "actual").asNumber().isLessThan(1);
	}, RangeError);
	t.end();
});

test("NumberTest.isLessThanOrEqualToVariable", function(t)
{
	requireThat(1, "actual").asNumber().isLessThanOrEqualTo(1, "expected");
	t.end();
});

test("NumberTest.isLessThanOrEqualToConstant", function(t)
{
	requireThat(1, "actual").asNumber().isLessThanOrEqualTo(1);
	t.end();
});

test("NumberTest.isLessThanOrEqualToVariable_actualIsGreater", function(t)
{
	t.throws(function()
	{
		requireThat(3, "actual").asNumber().isLessThanOrEqualTo(2, "expected");
	}, RangeError);
	t.end();
});

test("NumberTest.isLessThanOrEqualToConstant_actualIsGreater", function(t)
{
	t.throws(function()
	{
		requireThat(3, "actual").asNumber().isLessThanOrEqualTo(2);
	}, RangeError);
	t.end();
});

test("NumberTest.isGreaterThanVariable", function(t)
{
	requireThat(1, "actual").asNumber().isGreaterThan(0, "expected");
	t.end();
});

test("NumberTest.isGreaterThanConstant", function(t)
{
	requireThat(1, "actual").asNumber().isGreaterThan(0);
	t.end();
});

test("NumberTest.isGreaterThanVariable_actualIsEqual", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").asNumber().isGreaterThan(1, "expected");
	}, RangeError);
	t.end();
});

test("NumberTest.isGreaterThanConstant_actualIsEqual", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").asNumber().isGreaterThan(1);
	}, RangeError);
	t.end();
});

test("NumberTest.isGreaterThanVariable_actualIsLess", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").asNumber().isGreaterThan(2,
			"expected");
	}, RangeError);
	t.end();
});

test("NumberTest.isGreaterThanConstant_actualIsLess", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").asNumber().isGreaterThan(2);
	}, RangeError);
	t.end();
});

test("NumberTest.isGreaterThanOrEqualToVariable", function(t)
{
	requireThat(1, "actual").asNumber().isGreaterThanOrEqualTo(1, "expected");
	t.end();
});

test("NumberTest.isGreaterThanOrEqualToConstant", function(t)
{
	requireThat(1, "actual").asNumber().isGreaterThanOrEqualTo(1);
	t.end();
});

test("NumberTest.isGreaterThanOrEqualToVariable_actualIsLess", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").asNumber().isGreaterThanOrEqualTo(2, "expected");
	}, RangeError);
	t.end();
});

test("NumberTest.isGreaterThanOrEqualToConstant_actualIsLess", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").asNumber().isGreaterThanOrEqualTo(2);
	}, RangeError);
	t.end();
});

test("NumberTest.isFinite", function(t)
{
	requireThat(1.0, "actual").asNumber().isFinite();
	t.end();
});

test("NumberTest.isFinite_False", function(t)
{
	t.throws(function()
	{
		requireThat(1.0 / 0.0, "actual").asNumber().isFinite();
	}, RangeError);
	t.end();
});

test("NumberTest.isNotFinite", function(t)
{
	requireThat(1.0 / 0.0, "actual").asNumber().isNotFinite();
	t.end();
});

test("NumberTest.isNotFinite_False", function(t)
{
	t.throws(function()
	{
		requireThat(1.0, "actual").asNumber().isNotFinite();
	}, RangeError);
	t.end();
});

test("NumberTest.isNumber", function(t)
{
	requireThat(1.0, "actual").asNumber().isNumber();
	t.end();
});

test("NumberTest.isNumber_False", function(t)
{
	t.throws(function()
	{
		requireThat(0.0 / 0.0, "actual").asNumber().isNumber();
	}, RangeError);
	t.end();
});

test("NumberTest.isNotNumber", function(t)
{
	requireThat(0.0 / 0.0, "actual").asNumber().isNotNumber();
	t.end();
});

test("NumberTest.isNotNumber_False", function(t)
{
	t.throws(function()
	{
		requireThat(1.0, "actual").asNumber().isNotNumber();
	}, RangeError);
	t.end();
});

test("NumberTest.asString", function(t)
{
	const actual = 5;
	requireThat(actual, "actual").asNumber().asString().isEqualTo("5");
	t.end();
});

test("NumberTest.getActual", function(t)
{
	const input = 5;
	const output = requireThat(input, "input").getActual();
	t.equals(output, input);
	t.end();
});

test("NumberTest.validateThatNullAsNumber", function(t)
{
	const actual = null;
	const expectedMessages = ["actual must be a Number.\n" +
	"Actual: null\n" +
	"Type  : null"];
	const actualFailures = validateThat(actual, "actual").asNumber().getFailures();
	const actualMessages = actualFailures.map(failure => failure.getMessage());
	requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	t.end();
});