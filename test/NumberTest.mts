import {
	TerminalEncoding,
	Configuration
} from "../src/index.mjs";
import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {
	JavascriptValidatorsImpl,
	Type
} from "../src/internal/internal.mjs";
import {TestApplicationScope} from "./TestApplicationScope.mjs";


const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
	Configuration.DEFAULT);

suite("NumberTest", () =>
{
	test("isBetween_actualIsLowerBound", () =>
	{
		validators.requireThatNumber(0 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isBetween(0, 2));
	});

	test("isBetween_actualIsInBounds", () =>
	{
		validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isBetween(0, 2));
	});

	test("isBetween_actualIsUpperBound", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(2 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isBetween(0, 2));
		}, RangeError);
	});

	test("isBetween_actualIsBelow", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isBetween(10, 20));
		}, RangeError);
	});

	test("isBetweenClosed_actualIsUpperBound", () =>
	{
		validators.requireThatNumber(2 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isBetween(0, true, 2, true));
	});

	test("isNegative_actualIsNegativeOne", () =>
	{
		validators.requireThatNumber(-1 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isNegative());
	});

	test("isNegative_actualIsZero", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(0 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isNegative());
		}, RangeError);
	});

	test("isNegative_actualIsOne", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isNegative());
		}, RangeError);
	});

	test("isNotNegative", () =>
	{
		validators.requireThatNumber(0 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isNotNegative());
		validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isNotNegative());
	});

	test("isNotNegative_actualIsNegativeOne", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(-1 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isNotNegative());
		}, RangeError);
	});

	test("isZero", () =>
	{
		validators.requireThatNumber(0 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isZero());
	});

	test("isZero_actualIsOne", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isZero());
		}, RangeError);
	});

	test("isZero_actualIsNegativeOne", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(-1 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isZero());
		}, RangeError);
	});

	test("isNotZero", () =>
	{
		validators.requireThatNumber(-1 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isNotZero());
		validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isNotZero());
	});

	test("isNotZero_False", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(0 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isNotZero());
		}, RangeError);
	});

	test("isPositive", () =>
	{
		validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isPositive());
	});

	test("isPositive_actualIsZero", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(0 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isPositive());
		}, RangeError);
	});

	test("isPositive_actualIsNegativeOne", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(-1 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isPositive());
		}, RangeError);
	});

	test("isNotPositive", () =>
	{
		validators.requireThatNumber(0 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isNotPositive());
		validators.requireThatNumber(-1 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isNotPositive());
	});

	test("isNotPositive_actualIsOne", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isNotPositive());
		}, RangeError);
	});

	test("isLessThanVariable", () =>
	{
		validators.requireThatNumber(0 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isLessThan(1, "expected"));
	});

	test("isLessThanConstant", () =>
	{
		validators.requireThatNumber(0 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isLessThan(1));
	});

	test("isLessThanVariable_actualIsEqual", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isLessThan(1, "expected"));
		}, RangeError);
	});

	test("isLessThanConstant_actualIsEqual", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isLessThan(1));
		}, RangeError);
	});

	test("isLessThanVariable_actualIsGreater", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(2 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isLessThan(1, "expected"));
		}, RangeError);
	});

	test("isLessThanConstant_actualIsGreater", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(2 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isLessThan(1));
		}, RangeError);
	});

	test("isLessThanOrEqualToVariable", () =>
	{
		validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).
				isLessThanOrEqualTo(1, "expected"));
	});

	test("isLessThanOrEqualToConstant", () =>
	{
		validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isLessThanOrEqualTo(1));
	});

	test("isLessThanOrEqualToVariable_actualIsGreater", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(3 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).
					isLessThanOrEqualTo(2, "expected"));
		}, RangeError);
	});

	test("isLessThanOrEqualToConstant_actualIsGreater", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(3 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isLessThanOrEqualTo(2));
		}, RangeError);
	});

	test("isGreaterThanVariable", () =>
	{
		validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isGreaterThan(0, "expected"));
	});

	test("isGreaterThanConstant", () =>
	{
		validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isGreaterThan(0));
	});

	test("isGreaterThanVariable_actualIsEqual", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isGreaterThan(1, "expected"));
		}, RangeError);
	});

	test("isGreaterThanConstant_actualIsEqual", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isGreaterThan(1));
		}, RangeError);
	});

	test("isGreaterThanVariable_actualIsLess", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isGreaterThan(2, "expected"));
		}, RangeError);
	});

	test("isGreaterThanConstant_actualIsLess", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isGreaterThan(2));
		}, RangeError);
	});

	test("isGreaterThanOrEqualToVariable", () =>
	{
		validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).
				isGreaterThanOrEqualTo(1, "expected"));
	});

	test("isGreaterThanOrEqualToConstant", () =>
	{
		validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isGreaterThanOrEqualTo(1));
	});

	test("isGreaterThanOrEqualToVariable_actualIsLess", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).
					isGreaterThanOrEqualTo(2, "expected"));
		}, RangeError);
	});

	test("isGreaterThanOrEqualToConstant_actualIsLess", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(1 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isGreaterThanOrEqualTo(2));
		}, RangeError);
	});

	test("isFinite", () =>
	{
		validators.requireThatNumber(1.0 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isFinite());
	});

	test("isFinite_False", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(1.0 / 0.0 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isFinite());
		}, RangeError);
	});

	test("isNotFinite", () =>
	{
		validators.requireThatNumber(1.0 / 0.0 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isInfinite());
	});

	test("isNotFinite_False", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(1.0 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isInfinite());
		}, RangeError);
	});

	test("isNumber", () =>
	{
		validators.requireThatNumber(1.0 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()));
	});

	test("isNumber_False", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(0.0 / 0.0 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isFinite());
		}, RangeError);
	});

	test("isInfinite", () =>
	{
		validators.requireThatNumber(0.0 / 0.0 as unknown as number, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue(), v.getName()).isInfinite());
	});

	test("isInfinite_False", () =>
	{
		assert.throws(function()
		{
			validators.requireThatNumber(1.0 as unknown as number, "actual").isType(Type.NUMBER).
				and(v => validators.requireThatNumber(v.getValue(), v.getName()).isInfinite());
		}, RangeError);
	});

	test("getActual", () =>
	{
		const input = 5;
		const output = validators.requireThatNumber(input, "input").getValue();
		assert.strictEqual(output, input);
	});

	test("checkIfNullAsNumber", () =>
	{
		const actual = null;
		const expectedMessages = [`\
"actual" must be a number.
actual: null`];
		const actualFailures = validators.checkIfArray(actual, "actual").isType(Type.NUMBER).
			and(v => validators.requireThatNumber(v.getValue() as unknown as number, v.getName())).
			elseGetFailures();
		const actualMessages = actualFailures.getFailures().map(failure => failure.getMessage());
		validators.requireThatArray(actualMessages, "actualMessages").
			isEqualTo(expectedMessages, "expectedMessages");
	});
});