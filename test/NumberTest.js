import {requireThat} from "../node/Requirements";
import test from "tape-catch";

test("NumberTest.isBetween_actualIsLowerBound", function(t)
{
	requireThat(0, "actual").isBetween(0, 2);
	t.end();
});

test("NumberTest.isBetween_actualIsInBounds", function(t)
{
	requireThat(1, "actual").isBetween(0, 2);
	t.end();
});

test("NumberTest.isBetween_actualIsUpperBound", function(t)
{
	requireThat(2, "actual").isBetween(0, 2);
	t.end();
});

test("NumberTest.isBetween_actualIsBelow", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").isBetween(10, 20);
	}, RangeError);
	t.end();
});

test("NumberTest.isNegative_actualIsNegativeOne", function(t)
{
	requireThat(-1, "actual").isNegative();
	t.end();
});

test("NumberTest.isNegative_actualIsZero", function(t)
{
	t.throws(function()
	{
		requireThat(0, "actual").isNegative();
	}, RangeError);
	t.end();
});

test("NumberTest.isNegative_actualIsOne", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").isNegative();
	}, RangeError);
	t.end();
});

test("NumberTest.isNotNegative", function(t)
{
	requireThat(0, "actual").isNotNegative();
	requireThat(1, "actual").isNotNegative();
	t.end();
});

test("NumberTest.isNotNegative_actualIsNegativeOne", function(t)
{
	t.throws(function()
	{
		requireThat(-1, "actual").isNotNegative();
	}, RangeError);
	t.end();
});

test("NumberTest.isZero", function(t)
{
	requireThat(0, "actual").isZero();
	t.end();
});

test("NumberTest.isZero_actualIsOne", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").isZero();
	}, RangeError);
	t.end();
});

test("NumberTest.isZero_actualIsNegativeOne", function(t)
{
	t.throws(function()
	{
		requireThat(-1, "actual").isZero();
	}, RangeError);
	t.end();
});

test("NumberTest.isNotZero", function(t)
{
	requireThat(-1, "actual").isNotZero();
	requireThat(1, "actual").isNotZero();
	t.end();
});

test("NumberTest.isNotZero_False", function(t)
{
	t.throws(function()
	{
		requireThat(0, "actual").isNotZero();
	}, RangeError);
	t.end();
});

test("NumberTest.isPositive", function(t)
{
	requireThat(1, "actual").isPositive();
	t.end();
});

test("NumberTest.isPositive_actualIsZero", function(t)
{
	t.throws(function()
	{
		requireThat(0, "actual").isPositive();
	}, RangeError);
	t.end();
});

test("NumberTest.isPositive_actualIsNegativeOne", function(t)
{
	t.throws(function()
	{
		requireThat(-1, "actual").isPositive();
	}, RangeError);
	t.end();
});

test("NumberTest.isNotPositive", function(t)
{
	requireThat(0, "actual").isNotPositive();
	requireThat(-1, "actual").isNotPositive();
	t.end();
});

test("NumberTest.isNotPositive_actualIsOne", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").isNotPositive();
	}, RangeError);
	t.end();
});

test("NumberTest.isLessThanVariable", function(t)
{
	requireThat(0, "actual").isLessThan(1, "expected");
	t.end();
});

test("NumberTest.isLessThanConstant", function(t)
{
	requireThat(0, "actual").isLessThan(1);
	t.end();
});

test("NumberTest.isLessThanVariable_actualIsEqual", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").isLessThan(1, "expected");
	}, RangeError);
	t.end();
});

test("NumberTest.isLessThanConstant_actualIsEqual", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").isLessThan(1);
	}, RangeError);
	t.end();
});

test("NumberTest.isLessThanVariable_actualIsGreater", function(t)
{
	t.throws(function()
	{
		requireThat(2, "actual").isLessThan(1, "expected");
	}, RangeError);
	t.end();
});

test("NumberTest.isLessThanConstant_actualIsGreater", function(t)
{
	t.throws(function()
	{
		requireThat(2, "actual").isLessThan(1);
	}, RangeError);
	t.end();
});

test("NumberTest.isLessThanOrEqualToVariable", function(t)
{
	requireThat(1, "actual").isLessThanOrEqualTo(1, "expected");
	t.end();
});

test("NumberTest.isLessThanOrEqualToConstant", function(t)
{
	requireThat(1, "actual").isLessThanOrEqualTo(1);
	t.end();
});

test("NumberTest.isLessThanOrEqualToVariable_actualIsGreater", function(t)
{
	t.throws(function()
	{
		requireThat(3, "actual").isLessThanOrEqualTo(2, "expected");
	}, RangeError);
	t.end();
});

test("NumberTest.isLessThanOrEqualToConstant_actualIsGreater", function(t)
{
	t.throws(function()
	{
		requireThat(3, "actual").isLessThanOrEqualTo(2);
	}, RangeError);
	t.end();
});

test("NumberTest.isGreaterThanVariable", function(t)
{
	requireThat(1, "actual").isGreaterThan(0, "expected");
	t.end();
});

test("NumberTest.isGreaterThanConstant", function(t)
{
	requireThat(1, "actual").isGreaterThan(0);
	t.end();
});

test("NumberTest.isGreaterThanVariable_actualIsEqual", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").isGreaterThan(1, "expected");
	}, RangeError);
	t.end();
});

test("NumberTest.isGreaterThanConstant_actualIsEqual", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").isGreaterThan(1);
	}, RangeError);
	t.end();
});

test("NumberTest.isGreaterThanVariable_actualIsLess", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").isGreaterThan(2,
			"expected");
	}, RangeError);
	t.end();
});

test("NumberTest.isGreaterThanConstant_actualIsLess", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").isGreaterThan(2);
	}, RangeError);
	t.end();
});

test("NumberTest.isGreaterThanOrEqualToVariable", function(t)
{
	requireThat(1, "actual").isGreaterThanOrEqualTo(1, "expected");
	t.end();
});

test("NumberTest.isGreaterThanOrEqualToConstant", function(t)
{
	requireThat(1, "actual").isGreaterThanOrEqualTo(1);
	t.end();
});

test("NumberTest.isGreaterThanOrEqualToVariable_actualIsLess", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").isGreaterThanOrEqualTo(2, "expected");
	}, RangeError);
	t.end();
});

test("NumberTest.isGreaterThanOrEqualToConstant_actualIsLess", function(t)
{
	t.throws(function()
	{
		requireThat(1, "actual").isGreaterThanOrEqualTo(2);
	}, RangeError);
	t.end();
});

test("NumberTest.isFinite", function(t)
{
	requireThat(1.0, "actual").isFinite();
	t.end();
});

test("NumberTest.isFinite_False", function(t)
{
	t.throws(function()
	{
		requireThat(1.0, "actual").isGreaterThanOrEqualTo(2);
	}, RangeError);
	t.end();
});

test("NumberTest.isNotFinite", function(t)
{
	requireThat(1.0, "actual").isFinite();
	t.end();
});

test("NumberTest.isNotFinite_False", function(t)
{
	t.throws(function()
	{
		requireThat(1.0, "actual").isGreaterThanOrEqualTo(2);
	}, RangeError);
	t.end();
});

test("NumberTest.isNumber", function(t)
{
	requireThat(1.0, "actual").isNumber();
	t.end();
});

test("NumberTest.isNumber_False", function(t)
{
	t.throws(function()
	{
		requireThat(0.0 / 0.0, "actual").isNumber();
	}, RangeError);
	t.end();
});

test("NumberTest.isNotNumber", function(t)
{
	requireThat(0.0 / 0.0, "actual").isNotNumber();
	t.end();
});

test("NumberTest.isNotNumber_False", function(t)
{
	t.throws(function()
	{
		requireThat(1.0, "actual").isNotNumber();
	}, RangeError);
	t.end();
});

test("NumberTest.asString", function(t)
{
	const actual = 5;
	requireThat(actual, "actual").asString().isEqualTo("5");
	t.end();
});

test("NumberTest.getActual", function(t)
{
	const input = 5;
	const output = requireThat(input, "input").getActual();
	t.equal(output, input);
	t.end();
});
