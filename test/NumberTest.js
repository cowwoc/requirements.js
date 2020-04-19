import test from "tape-catch";
import TestGlobalConfiguration from "../src/internal/TestGlobalConfiguration";
import TerminalEncoding from "../src/TerminalEncoding";
import Configuration from "../src/Configuration";
import Requirements from "../src/Requirements";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

test("NumberTest.isBetween_actualIsLowerBound", function(t)
{
	requirements.requireThat(0, "actual").asNumber().isBetween(0, 2);
	t.end();
});

test("NumberTest.isBetween_actualIsInBounds", function(t)
{
	requirements.requireThat(1, "actual").asNumber().isBetween(0, 2);
	t.end();
});

test("NumberTest.isBetween_actualIsUpperBound", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(2, "actual").asNumber().isBetween(0, 2);
	}, RangeError);
	t.end();
});

test("NumberTest.isBetween_actualIsBelow", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(1, "actual").asNumber().isBetween(10, 20);
	}, RangeError);
	t.end();
});

test("NumberTest.isBetweenClosed_actualIsUpperBound", function(t)
{
	requirements.requireThat(2, "actual").asNumber().isBetweenClosed(0, 2);
	t.end();
});

test("NumberTest.isNegative_actualIsNegativeOne", function(t)
{
	requirements.requireThat(-1, "actual").asNumber().isNegative();
	t.end();
});

test("NumberTest.isNegative_actualIsZero", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(0, "actual").asNumber().isNegative();
	}, RangeError);
	t.end();
});

test("NumberTest.isNegative_actualIsOne", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(1, "actual").asNumber().isNegative();
	}, RangeError);
	t.end();
});

test("NumberTest.isNotNegative", function(t)
{
	requirements.requireThat(0, "actual").asNumber().isNotNegative();
	requirements.requireThat(1, "actual").asNumber().isNotNegative();
	t.end();
});

test("NumberTest.isNotNegative_actualIsNegativeOne", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(-1, "actual").asNumber().isNotNegative();
	}, RangeError);
	t.end();
});

test("NumberTest.isZero", function(t)
{
	requirements.requireThat(0, "actual").asNumber().isZero();
	t.end();
});

test("NumberTest.isZero_actualIsOne", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(1, "actual").asNumber().isZero();
	}, RangeError);
	t.end();
});

test("NumberTest.isZero_actualIsNegativeOne", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(-1, "actual").asNumber().isZero();
	}, RangeError);
	t.end();
});

test("NumberTest.isNotZero", function(t)
{
	requirements.requireThat(-1, "actual").asNumber().isNotZero();
	requirements.requireThat(1, "actual").asNumber().isNotZero();
	t.end();
});

test("NumberTest.isNotZero_False", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(0, "actual").asNumber().isNotZero();
	}, RangeError);
	t.end();
});

test("NumberTest.isPositive", function(t)
{
	requirements.requireThat(1, "actual").asNumber().isPositive();
	t.end();
});

test("NumberTest.isPositive_actualIsZero", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(0, "actual").asNumber().isPositive();
	}, RangeError);
	t.end();
});

test("NumberTest.isPositive_actualIsNegativeOne", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(-1, "actual").asNumber().isPositive();
	}, RangeError);
	t.end();
});

test("NumberTest.isNotPositive", function(t)
{
	requirements.requireThat(0, "actual").asNumber().isNotPositive();
	requirements.requireThat(-1, "actual").asNumber().isNotPositive();
	t.end();
});

test("NumberTest.isNotPositive_actualIsOne", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(1, "actual").asNumber().isNotPositive();
	}, RangeError);
	t.end();
});

test("NumberTest.isLessThanVariable", function(t)
{
	requirements.requireThat(0, "actual").asNumber().isLessThan(1, "expected");
	t.end();
});

test("NumberTest.isLessThanConstant", function(t)
{
	requirements.requireThat(0, "actual").asNumber().isLessThan(1);
	t.end();
});

test("NumberTest.isLessThanVariable_actualIsEqual", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(1, "actual").asNumber().isLessThan(1, "expected");
	}, RangeError);
	t.end();
});

test("NumberTest.isLessThanConstant_actualIsEqual", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(1, "actual").asNumber().isLessThan(1);
	}, RangeError);
	t.end();
});

test("NumberTest.isLessThanVariable_actualIsGreater", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(2, "actual").asNumber().isLessThan(1, "expected");
	}, RangeError);
	t.end();
});

test("NumberTest.isLessThanConstant_actualIsGreater", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(2, "actual").asNumber().isLessThan(1);
	}, RangeError);
	t.end();
});

test("NumberTest.isLessThanOrEqualToVariable", function(t)
{
	requirements.requireThat(1, "actual").asNumber().isLessThanOrEqualTo(1, "expected");
	t.end();
});

test("NumberTest.isLessThanOrEqualToConstant", function(t)
{
	requirements.requireThat(1, "actual").asNumber().isLessThanOrEqualTo(1);
	t.end();
});

test("NumberTest.isLessThanOrEqualToVariable_actualIsGreater", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(3, "actual").asNumber().isLessThanOrEqualTo(2, "expected");
	}, RangeError);
	t.end();
});

test("NumberTest.isLessThanOrEqualToConstant_actualIsGreater", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(3, "actual").asNumber().isLessThanOrEqualTo(2);
	}, RangeError);
	t.end();
});

test("NumberTest.isGreaterThanVariable", function(t)
{
	requirements.requireThat(1, "actual").asNumber().isGreaterThan(0, "expected");
	t.end();
});

test("NumberTest.isGreaterThanConstant", function(t)
{
	requirements.requireThat(1, "actual").asNumber().isGreaterThan(0);
	t.end();
});

test("NumberTest.isGreaterThanVariable_actualIsEqual", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(1, "actual").asNumber().isGreaterThan(1, "expected");
	}, RangeError);
	t.end();
});

test("NumberTest.isGreaterThanConstant_actualIsEqual", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(1, "actual").asNumber().isGreaterThan(1);
	}, RangeError);
	t.end();
});

test("NumberTest.isGreaterThanVariable_actualIsLess", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(1, "actual").asNumber().isGreaterThan(2,
			"expected");
	}, RangeError);
	t.end();
});

test("NumberTest.isGreaterThanConstant_actualIsLess", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(1, "actual").asNumber().isGreaterThan(2);
	}, RangeError);
	t.end();
});

test("NumberTest.isGreaterThanOrEqualToVariable", function(t)
{
	requirements.requireThat(1, "actual").asNumber().isGreaterThanOrEqualTo(1, "expected");
	t.end();
});

test("NumberTest.isGreaterThanOrEqualToConstant", function(t)
{
	requirements.requireThat(1, "actual").asNumber().isGreaterThanOrEqualTo(1);
	t.end();
});

test("NumberTest.isGreaterThanOrEqualToVariable_actualIsLess", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(1, "actual").asNumber().isGreaterThanOrEqualTo(2, "expected");
	}, RangeError);
	t.end();
});

test("NumberTest.isGreaterThanOrEqualToConstant_actualIsLess", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(1, "actual").asNumber().isGreaterThanOrEqualTo(2);
	}, RangeError);
	t.end();
});

test("NumberTest.isFinite", function(t)
{
	requirements.requireThat(1.0, "actual").asNumber().isFinite();
	t.end();
});

test("NumberTest.isFinite_False", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(1.0 / 0.0, "actual").asNumber().isFinite();
	}, RangeError);
	t.end();
});

test("NumberTest.isNotFinite", function(t)
{
	requirements.requireThat(1.0 / 0.0, "actual").asNumber().isNotFinite();
	t.end();
});

test("NumberTest.isNotFinite_False", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(1.0, "actual").asNumber().isNotFinite();
	}, RangeError);
	t.end();
});

test("NumberTest.isNumber", function(t)
{
	requirements.requireThat(1.0, "actual").asNumber().isNumber();
	t.end();
});

test("NumberTest.isNumber_False", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(0.0 / 0.0, "actual").asNumber().isNumber();
	}, RangeError);
	t.end();
});

test("NumberTest.isNotNumber", function(t)
{
	requirements.requireThat(0.0 / 0.0, "actual").asNumber().isNotNumber();
	t.end();
});

test("NumberTest.isNotNumber_False", function(t)
{
	t.throws(function()
	{
		requirements.requireThat(1.0, "actual").asNumber().isNotNumber();
	}, RangeError);
	t.end();
});

test("NumberTest.asString", function(t)
{
	const actual = 5;
	requirements.requireThat(actual, "actual").asNumber().asString().isEqualTo("5");
	t.end();
});

test("NumberTest.getActual", function(t)
{
	const input = 5;
	const output = requirements.requireThat(input, "input").getActual();
	t.equals(output, input);
	t.end();
});

test("NumberTest.validateThatNullAsNumber", function(t)
{
	const actual = null;
	const expectedMessages = ["actual must be a Number.\n" +
	"Actual: null\n" +
	"Type  : null"];
	const actualFailures = requirements.validateThat(actual, "actual").asNumber().getFailures();
	const actualMessages = actualFailures.map(failure => failure.getMessage());
	requirements.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	t.end();
});