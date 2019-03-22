import {requireThat} from "../src/DefaultRequirements";
import test from "tape-catch";

test("ContainerSizeTest.isGreaterThanOrEqualTo", function(t)
{
	const actual = [];
	requireThat(actual, "actual").asArray().length().isGreaterThanOrEqualTo(0);
	t.end();
});

test("ContainerSizeTest.isGreaterThanOrEqualTo_False", function(t)
{
	const actual = [];
	t.throws(function()
	{
		requireThat(actual, "actual").asArray().length().isGreaterThanOrEqualTo(5);
	}, RangeError);
	t.throws(function()
	{
		requireThat(actual, "actual").asArray().length().isGreaterThanOrEqualTo(5, "expected");
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isGreaterThan", function(t)
{
	const actual = [1];
	requireThat(actual, "actual").asArray().length().isGreaterThan(0);
	t.end();
});

test("ContainerSizeTest.isGreaterThan_False", function(t)
{
	const actual = [];
	t.throws(function()
	{
		requireThat(actual, "actual").asArray().length().isGreaterThan(5);
	}, RangeError);
	t.throws(function()
	{
		requireThat(actual, "actual").asArray().length().isGreaterThan(5, "expected");
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isLessThanOrEqualTo", function(t)
{
	const actual = [1];
	requireThat(actual, "actual").asArray().length().isLessThanOrEqualTo(2);
	t.end();
});

test("ContainerSizeTest.isLessThanOrEqualTo_False", function(t)
{
	const actual = [];
	t.throws(function()
	{
		requireThat(actual, "actual").asArray().length().isLessThanOrEqualTo(-1);
	}, RangeError);
	t.throws(function()
	{
		requireThat(actual, "actual").asArray().length().isLessThanOrEqualTo(-1, "expected");
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isLessThan", function(t)
{
	const actual = [1];
	requireThat(actual, "actual").asArray().length().isLessThan(2);
	t.end();
});

test("ContainerSizeTest.isLessThan_False", function(t)
{
	const actual = [];
	t.throws(function()
	{
		requireThat(actual, "actual").asArray().length().isLessThan(0);
	}, RangeError);
	t.throws(function()
	{
		requireThat(actual, "actual").asArray().length().isLessThan(0, "expected");
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isNotPositive", function(t)
{
	const actual = [];
	requireThat(actual, "actual").asArray().length().isNotPositive();
	t.end();
});

test("ContainerSizeTest.isNotPositive_False", function(t)
{
	t.throws(function()
	{
		const actual = [1, 2, 3];
		requireThat(actual, "actual").asArray().length().isNotPositive();
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isPositive", function(t)
{
	const actual = [1, 2, 3];
	requireThat(actual, "actual").asArray().length().isPositive();
	t.end();
});

test("ContainerSizeTest.isPositive_False", function(t)
{
	t.throws(function()
	{
		const actual = [];
		requireThat(actual, "actual").asArray().length().isPositive();
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isNotZero", function(t)
{
	const actual = [1, 2, 3];
	requireThat(actual, "actual").asArray().length().isNotZero();
	t.end();
});

test("ContainerSizeTest.isNotZero_False", function(t)
{
	t.throws(function()
	{
		const actual = [];
		requireThat(actual, "actual").asArray().length().isNotZero();
	}, RangeError);
	t.end();
});

test("ContainerSizeTest.isZero", function(t)
{
	const actual = [];
	requireThat(actual, "actual").asArray().length().isZero();
	t.end();
});

test("ContainerSizeTest.isNotNegative", function(t)
{
	const actual = [];
	requireThat(actual, "actual").asArray().length().isNotNegative();
	t.end();
});

test("ContainerSizeTest.isNegative", function(t)
{
	t.throws(function()
	{
		const actual = [];
		requireThat(actual, "actual").asArray().length().isNegative();
	}, RangeError);
	t.end();
});