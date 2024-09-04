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
		validators.requireThat(0 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isBetween(0, 2));
	});

	test("isBetween_actualIsInBounds", () =>
	{
		validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isBetween(0, 2));
	});

	test("isBetween_actualIsUpperBound", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(2 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isBetween(0, 2));
		}, RangeError);
	});

	test("isBetween_actualIsBelow", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isBetween(10, 20));
		}, RangeError);
	});

	test("isBetweenClosed_actualIsUpperBound", () =>
	{
		validators.requireThat(2 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isBetween(0, true, 2, true));
	});

	test("isNegative_actualIsNegativeOne", () =>
	{
		validators.requireThat(-1 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isNegative());
	});

	test("isNegative_actualIsZero", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(0 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isNegative());
		}, RangeError);
	});

	test("isNegative_actualIsOne", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isNegative());
		}, RangeError);
	});

	test("isNotNegative", () =>
	{
		validators.requireThat(0 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isNotNegative());
		validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isNotNegative());
	});

	test("isNotNegative_actualIsNegativeOne", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(-1 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isNotNegative());
		}, RangeError);
	});

	test("isZero", () =>
	{
		validators.requireThat(0 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isZero());
	});

	test("isZero_actualIsOne", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isZero());
		}, RangeError);
	});

	test("isZero_actualIsNegativeOne", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(-1 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isZero());
		}, RangeError);
	});

	test("isNotZero", () =>
	{
		validators.requireThat(-1 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isNotZero());
		validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isNotZero());
	});

	test("isNotZero_False", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(0 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isNotZero());
		}, RangeError);
	});

	test("isPositive", () =>
	{
		validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isPositive());
	});

	test("isPositive_actualIsZero", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(0 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isPositive());
		}, RangeError);
	});

	test("isPositive_actualIsNegativeOne", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(-1 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isPositive());
		}, RangeError);
	});

	test("isNotPositive", () =>
	{
		validators.requireThat(0 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isNotPositive());
		validators.requireThat(-1 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isNotPositive());
	});

	test("isNotPositive_actualIsOne", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isNotPositive());
		}, RangeError);
	});

	test("isLessThanVariable", () =>
	{
		validators.requireThat(0 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isLessThan(1, "expected"));
	});

	test("isLessThanConstant", () =>
	{
		validators.requireThat(0 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isLessThan(1));
	});

	test("isLessThanVariable_actualIsEqual", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isLessThan(1, "expected"));
		}, RangeError);
	});

	test("isLessThanConstant_actualIsEqual", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isLessThan(1));
		}, RangeError);
	});

	test("isLessThanVariable_actualIsGreater", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(2 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isLessThan(1, "expected"));
		}, RangeError);
	});

	test("isLessThanConstant_actualIsGreater", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(2 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isLessThan(1));
		}, RangeError);
	});

	test("isLessThanOrEqualToVariable", () =>
	{
		validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).
				isLessThanOrEqualTo(1, "expected"));
	});

	test("isLessThanOrEqualToConstant", () =>
	{
		validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isLessThanOrEqualTo(1));
	});

	test("isLessThanOrEqualToVariable_actualIsGreater", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(3 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).
					isLessThanOrEqualTo(2, "expected"));
		}, RangeError);
	});

	test("isLessThanOrEqualToConstant_actualIsGreater", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(3 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isLessThanOrEqualTo(2));
		}, RangeError);
	});

	test("isGreaterThanVariable", () =>
	{
		validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isGreaterThan(0, "expected"));
	});

	test("isGreaterThanConstant", () =>
	{
		validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isGreaterThan(0));
	});

	test("isGreaterThanVariable_actualIsEqual", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isGreaterThan(1, "expected"));
		}, RangeError);
	});

	test("isGreaterThanConstant_actualIsEqual", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isGreaterThan(1));
		}, RangeError);
	});

	test("isGreaterThanVariable_actualIsLess", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isGreaterThan(2, "expected"));
		}, RangeError);
	});

	test("isGreaterThanConstant_actualIsLess", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isGreaterThan(2));
		}, RangeError);
	});

	test("isGreaterThanOrEqualToVariable", () =>
	{
		validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).
				isGreaterThanOrEqualTo(1, "expected"));
	});

	test("isGreaterThanOrEqualToConstant", () =>
	{
		validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isGreaterThanOrEqualTo(1));
	});

	test("isGreaterThanOrEqualToVariable_actualIsLess", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).
					isGreaterThanOrEqualTo(2, "expected"));
		}, RangeError);
	});

	test("isGreaterThanOrEqualToConstant_actualIsLess", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(1 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isGreaterThanOrEqualTo(2));
		}, RangeError);
	});

	test("isFinite", () =>
	{
		validators.requireThat(1.0 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isFinite());
	});

	test("isFinite_False", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(1.0 / 0.0 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isFinite());
		}, RangeError);
	});

	test("isNotFinite", () =>
	{
		validators.requireThat(1.0 / 0.0 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isInfinite());
	});

	test("isNotFinite_False", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(1.0 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isInfinite());
		}, RangeError);
	});

	test("isNumber", () =>
	{
		validators.requireThat(1.0 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()));
	});

	test("isNumber_False", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(0.0 / 0.0 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isFinite());
		}, RangeError);
	});

	test("isInfinite", () =>
	{
		validators.requireThat(0.0 / 0.0 as unknown, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as number, v.getName()).isInfinite());
	});

	test("isInfinite_False", () =>
	{
		assert.throws(function()
		{
			validators.requireThat(1.0 as unknown, "actual").isType(Type.NUMBER).
				and(v => validators.requireThat(v.getValue() as number, v.getName()).isInfinite());
		}, RangeError);
	});

	test("getActual", () =>
	{
		const input = 5;
		const output = validators.requireThat(input, "input").getValue();
		assert.strictEqual(output, input);
	});

	test("checkIfNullAsNumber", () =>
	{
		const actual = null;
		const expectedMessages = [`\
"actual" must be a number.
actual: null`];
		const actualFailures = validators.checkIf(actual, "actual").isType(Type.NUMBER).
			and(v => validators.requireThat(v.getValue() as unknown as number, v.getName())).elseGetFailures();
		const actualMessages = actualFailures.getFailures().map(failure => failure.getMessage());
		validators.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages, "expectedMessages");
	});
});