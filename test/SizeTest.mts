import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {
	TerminalEncoding,
	Configuration
} from "../src/index.mjs";
import {TestCompiler} from "../scripts/TestCompiler.mjs";
import os from "os";
import {JavascriptValidatorsImpl} from "../src/internal/internal.mjs";
import {TestApplicationScope} from "./TestApplicationScope.mjs";


const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
	Configuration.DEFAULT);
const compiler = new TestCompiler();

suite("SizeTest", () =>
{
	test("isGreaterThanOrEqualTo", () =>
	{
		const actual: unknown[] = [];
		validators.requireThatArray(actual, "actual").length().isGreaterThanOrEqualTo(0);
	});

	test("isGreaterThanOrEqualTo_False", () =>
	{
		const actual: unknown[] = [];
		assert.throws(function()
		{
			validators.requireThatArray(actual, "actual").length().isGreaterThanOrEqualTo(5);
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThatArray(actual, "actual").length().isGreaterThanOrEqualTo(5, "expected");
		}, RangeError);
	});

	test("isGreaterThan", () =>
	{
		const actual = [1];
		validators.requireThatArray(actual, "actual").length().isGreaterThan(0);
	});

	test("isGreaterThan_False", () =>
	{
		const actual: unknown[] = [];
		assert.throws(function()
		{
			validators.requireThatArray(actual, "actual").length().isGreaterThan(5);
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThatArray(actual, "actual").length().isGreaterThan(5, "expected");
		}, RangeError);
	});

	test("isLessThanOrEqualTo", () =>
	{
		const actual = [1];
		validators.requireThatArray(actual, "actual").length().isLessThanOrEqualTo(2);
	});

	test("isLessThanOrEqualTo_False", () =>
	{
		const actual: unknown[] = [];
		assert.throws(function()
		{
			validators.requireThatArray(actual, "actual").length().isLessThanOrEqualTo(-1);
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThatArray(actual, "actual").length().isLessThanOrEqualTo(-1, "expected");
		}, RangeError);
	});

	test("isLessThan", () =>
	{
		const actual = [1];
		validators.requireThatArray(actual, "actual").length().isLessThan(2);
	});

	test("isLessThan_False", () =>
	{
		const actual: unknown[] = [];
		assert.throws(function()
		{
			validators.requireThatArray(actual, "actual").length().isLessThan(0);
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThatArray(actual, "actual").length().isLessThan(0, "expected");
		}, RangeError);
	});

	test("isNotPositive", () =>
	{
		const actual: unknown[] = [];
		validators.requireThatArray(actual, "actual").length().isNotPositive();
	});

	test("isNotPositive_False", () =>
	{
		assert.throws(function()
		{
			const actual = [1, 2, 3];
			validators.requireThatArray(actual, "actual").length().isNotPositive();
		}, RangeError);
	});

	test("isPositive", () =>
	{
		const actual = [1, 2, 3];
		validators.requireThatArray(actual, "actual").length().isPositive();
	});

	test("isPositive_False", () =>
	{
		assert.throws(function()
		{
			const actual: unknown[] = [];
			validators.requireThatArray(actual, "actual").length().isPositive();
		}, RangeError);
	});

	test("isNotZero", () =>
	{
		const actual = [1, 2, 3];
		validators.requireThatArray(actual, "actual").length().isNotZero();
	});

	test("isNotZero_False", () =>
	{
		assert.throws(function()
		{
			const actual: unknown[] = [];
			validators.requireThatArray(actual, "actual").length().isNotZero();
		}, RangeError);
	});

	test("isZero", () =>
	{
		const actual: unknown[] = [];
		validators.requireThatArray(actual, "actual").length().isZero();
	});

	test("isNotNegative", () =>
	{
		const code =
			`import {requireThatArray} from "./target/publish/node/index.mjs";
			
			const actual: unknown[] = [];
			requireThatArray(actual, "actual").length().isNotNegative();`;
		const messages = compiler.compile(code);
		assert.strictEqual(messages, "test.mts(4,48): error TS2339: Property 'isNotNegative' does not exist on " +
			"type 'UnsignedNumberValidator'." + os.EOL);
	}).timeout(10000);

	test("isNegative", () =>
	{
		const code =
			`import {requireThatArray} from "./target/publish/node/index.mjs";
			
			const actual: unknown[] = [];
			requireThatArray(actual, "actual").length().isNegative();`;
		const messages = compiler.compile(code);
		assert.strictEqual(messages, "test.mts(4,48): error TS2339: Property 'isNegative' does not exist on " +
			"type 'UnsignedNumberValidator'." + os.EOL);
	}).timeout(10000);
});