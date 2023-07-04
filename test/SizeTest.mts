import
{
	Configuration,
	TerminalEncoding,
	TestGlobalConfiguration
} from "../src/internal/internal.mjs";
import {Requirements} from "../src/index.mjs";
import
{
	suite,
	test
} from "mocha";
import {assert} from "chai";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

suite("SizeTest", () =>
{
	test("isGreaterThanOrEqualTo", () =>
	{
		const actual: unknown[] = [];
		requirements.requireThat(actual, "actual").asArray().length().isGreaterThanOrEqualTo(0);
	});

	test("isGreaterThanOrEqualTo_False", () =>
	{
		const actual: unknown[] = [];
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asArray().length().isGreaterThanOrEqualTo(5);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asArray().length().isGreaterThanOrEqualTo(5, "expected");
		}, RangeError);
	});

	test("isGreaterThan", () =>
	{
		const actual = [1];
		requirements.requireThat(actual, "actual").asArray().length().isGreaterThan(0);
	});

	test("isGreaterThan_False", () =>
	{
		const actual: unknown[] = [];
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asArray().length().isGreaterThan(5);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asArray().length().isGreaterThan(5, "expected");
		}, RangeError);
	});

	test("isLessThanOrEqualTo", () =>
	{
		const actual = [1];
		requirements.requireThat(actual, "actual").asArray().length().isLessThanOrEqualTo(2);
	});

	test("isLessThanOrEqualTo_False", () =>
	{
		const actual: unknown[] = [];
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asArray().length().isLessThanOrEqualTo(-1);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asArray().length().isLessThanOrEqualTo(-1, "expected");
		}, RangeError);
	});

	test("isLessThan", () =>
	{
		const actual = [1];
		requirements.requireThat(actual, "actual").asArray().length().isLessThan(2);
	});

	test("isLessThan_False", () =>
	{
		const actual: unknown[] = [];
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asArray().length().isLessThan(0);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asArray().length().isLessThan(0, "expected");
		}, RangeError);
	});

	test("isNotPositive", () =>
	{
		const actual: unknown[] = [];
		requirements.requireThat(actual, "actual").asArray().length().isNotPositive();
	});

	test("isNotPositive_False", () =>
	{
		assert.throws(function()
		{
			const actual = [1, 2, 3];
			requirements.requireThat(actual, "actual").asArray().length().isNotPositive();
		}, RangeError);
	});

	test("isPositive", () =>
	{
		const actual = [1, 2, 3];
		requirements.requireThat(actual, "actual").asArray().length().isPositive();
	});

	test("isPositive_False", () =>
	{
		assert.throws(function()
		{
			const actual: unknown[] = [];
			requirements.requireThat(actual, "actual").asArray().length().isPositive();
		}, RangeError);
	});

	test("isNotZero", () =>
	{
		const actual = [1, 2, 3];
		requirements.requireThat(actual, "actual").asArray().length().isNotZero();
	});

	test("isNotZero_False", () =>
	{
		assert.throws(function()
		{
			const actual: unknown[] = [];
			requirements.requireThat(actual, "actual").asArray().length().isNotZero();
		}, RangeError);
	});

	test("isZero", () =>
	{
		const actual: unknown[] = [];
		requirements.requireThat(actual, "actual").asArray().length().isZero();
	});

	test("isNotNegative", () =>
	{
		const actual: unknown[] = [];
		requirements.requireThat(actual, "actual").asArray().length().isNotNegative();
	});

	test("isNegative", () =>
	{
		assert.throws(function()
		{
			const actual: unknown[] = [];
			requirements.requireThat(actual, "actual").asArray().length().isNegative();
		}, RangeError);
	});
});