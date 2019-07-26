import test from "tape-catch";
import {requireThat} from "../src/DefaultRequirements.js";

test("SizeTest.isGreaterThanOrEqualTo", function(t)
{
	const actual = [];
	requireThat(actual, "actual").asArray().length().isGreaterThanOrEqualTo(0);
	t.end();
});

test("SizeTest.isGreaterThanOrEqualTo_False", function(t)
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

test("SizeTest.isGreaterThan", function(t)
{
	const actual = [1];
	requireThat(actual, "actual").asArray().length().isGreaterThan(0);
	t.end();
});

test("SizeTest.isGreaterThan_False", function(t)
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

test("SizeTest.isLessThanOrEqualTo", function(t)
{
	const actual = [1];
	requireThat(actual, "actual").asArray().length().isLessThanOrEqualTo(2);
	t.end();
});

test("SizeTest.isLessThanOrEqualTo_False", function(t)
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

test("SizeTest.isLessThan", function(t)
{
	const actual = [1];
	requireThat(actual, "actual").asArray().length().isLessThan(2);
	t.end();
});

test("SizeTest.isLessThan_False", function(t)
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

test("SizeTest.isNotPositive", function(t)
{
	const actual = [];
	requireThat(actual, "actual").asArray().length().isNotPositive();
	t.end();
});

test("SizeTest.isNotPositive_False", function(t)
{
	t.throws(function()
	{
		const actual = [1, 2, 3];
		requireThat(actual, "actual").asArray().length().isNotPositive();
	}, RangeError);
	t.end();
});

test("SizeTest.isPositive", function(t)
{
	const actual = [1, 2, 3];
	requireThat(actual, "actual").asArray().length().isPositive();
	t.end();
});

test("SizeTest.isPositive_False", function(t)
{
	t.throws(function()
	{
		const actual = [];
		requireThat(actual, "actual").asArray().length().isPositive();
	}, RangeError);
	t.end();
});

test("SizeTest.isNotZero", function(t)
{
	const actual = [1, 2, 3];
	requireThat(actual, "actual").asArray().length().isNotZero();
	t.end();
});

test("SizeTest.isNotZero_False", function(t)
{
	t.throws(function()
	{
		const actual = [];
		requireThat(actual, "actual").asArray().length().isNotZero();
	}, RangeError);
	t.end();
});

test("SizeTest.isZero", function(t)
{
	const actual = [];
	requireThat(actual, "actual").asArray().length().isZero();
	t.end();
});

test("SizeTest.isNotNegative", function(t)
{
	const actual = [];
	requireThat(actual, "actual").asArray().length().isNotNegative();
	t.end();
});

test("SizeTest.isNegative", function(t)
{
	t.throws(function()
	{
		const actual = [];
		requireThat(actual, "actual").asArray().length().isNegative();
	}, RangeError);
	t.end();
});