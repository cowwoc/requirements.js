import {requireThat} from "../node/Requirements";
import test from "tape-catch";

test("ContainerSizeTest.isGreaterThanOrEqualTo", function(t)
{
	const actual = [];
	requireThat(actual, "actual").length().isGreaterThanOrEqualTo(0);
	t.end();
});

test("ContainerSizeTest.isGreaterThanOrEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual = [];
		requireThat(actual, "actual").length().isGreaterThanOrEqualTo(5);
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isGreaterThanOrEqualToWithName_False", function(t)
{
	t.throws(function()
	{
		const actual = [1, 2, 3];
		requireThat(actual, "actual").length().isGreaterThanOrEqualTo(5, "expected");
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isGreaterThan", function(t)
{
	const actual = [1];
	requireThat(actual, "actual").length().isGreaterThan(0);
	t.end();
});

test("ContainerSizeTest.isGreaterThan_False", function(t)
{
	t.throws(function()
	{
		const actual = [];
		requireThat(actual, "actual").length().isGreaterThan(5);
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isGreaterThanWithName_False", function(t)
{
	t.throws(function()
	{
		const actual = [1, 2, 3];
		requireThat(actual, "actual").length().isGreaterThan(5, "expected");
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isLessThanOrEqualTo", function(t)
{
	const actual = [1];
	requireThat(actual, "actual").length().isLessThanOrEqualTo(2);
	t.end();
});

test("ContainerSizeTest.isLessThanOrEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual = [];
		requireThat(actual, "actual").length().isLessThanOrEqualTo(-1);
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isLessThanOrEqualToWithName_False", function(t)
{
	t.throws(function()
	{
		const actual = [1, 2, 3];
		requireThat(actual, "actual").length().isLessThanOrEqualTo(2, "expected");
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isLessThan", function(t)
{
	const actual = [1];
	requireThat(actual, "actual").length().isLessThan(2);
	t.end();
});

test("ContainerSizeTest.isLessThan_False", function(t)
{
	t.throws(function()
	{
		const actual = [];
		requireThat(actual, "actual").length().isLessThan(0);
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isLessThanWithName_False", function(t)
{
	t.throws(function()
	{
		const actual = [1, 2, 3];
		requireThat(actual, "actual").length().isLessThan(2, "expected");
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isNotPositive", function(t)
{
	const actual = [];
	requireThat(actual, "actual").length().isNotPositive();
	t.end();
});

test("ContainerSizeTest.isNotPositive_False", function(t)
{
	t.throws(function()
	{
		const actual = [1, 2, 3];
		requireThat(actual, "actual").length().isNotPositive();
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isNotPositiveWithName_False", function(t)
{
	t.throws(function()
	{
		const actual = [1, 2, 3];
		requireThat(actual, "actual").length().isNotPositive();
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isPositive", function(t)
{
	const actual = [1, 2, 3];
	requireThat(actual, "actual").length().isPositive();
	t.end();
});

test("ContainerSizeTest.isPositive_False", function(t)
{
	t.throws(function()
	{
		const actual = [];
		requireThat(actual, "actual").length().isPositive();
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isPositiveWithName_False", function(t)
{
	t.throws(function()
	{
		const actual = [];
		requireThat(actual, "actual").length().isPositive();
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isNotZero", function(t)
{
	const actual = [1, 2, 3];
	requireThat(actual, "actual").length().isNotZero();
	t.end();
});

test("ContainerSizeTest.isNotZero_False", function(t)
{
	t.throws(function()
	{
		const actual = [];
		requireThat(actual, "actual").length().isNotZero();
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isNotZeroWithName_False", function(t)
{
	t.throws(function()
	{
		const actual = [];
		requireThat(actual, "actual").length().isNotZero();
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isZero", function(t)
{
	const actual = [];
	requireThat(actual, "actual").length().isZero();
	t.end();
});

test("ContainerSizeTest.isNotNegative", function(t)
{
	const actual = [];
	requireThat(actual, "actual").length().isNotNegative();
	t.end();
});

test("ContainerSizeTest.isNegative", function(t)
{
	t.throws(function()
	{
		const actual = [];
		requireThat(actual, "actual").length().isNegative();
	}, RangeError);
	t.end();
});