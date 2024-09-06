import {
	TerminalEncoding,
	Configuration,
	Type
} from "../src/index.mjs";
import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {JavascriptValidatorsImpl} from "../src/internal/internal.mjs";
import {TestApplicationScope} from "./TestApplicationScope.mjs";


const validators = new JavascriptValidatorsImpl(new TestApplicationScope(TerminalEncoding.NONE),
	Configuration.DEFAULT);

suite("MapTest", () =>
{
	test("nameIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = new Map();
			validators.requireThatMap(actual, null as unknown as string);
		}, TypeError);
	});

	test("nameIsEmpty", () =>
	{
		assert.throws(function()
		{
			const actual = new Map();
			validators.requireThatMap(actual, "");
		}, RangeError);
	});

	test("isEmpty", () =>
	{
		const actual = new Map();
		validators.requireThatMap(actual, "actual").isEmpty();
	});

	test("isEmpty_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			validators.requireThatMap(actual, "actual").isEmpty();
		}, RangeError);
	});

	test("isNotEmpty", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		validators.requireThatMap(actual, "actual").isNotEmpty();
	});

	test("isNotEmpty_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map();
			validators.requireThatMap(actual, "actual").isNotEmpty();
		}, RangeError);
	});

	test("isEqualTo", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		validators.requireThatMap(actual, "actual").isEqualTo(actual);
	});

	test("isEqual_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			validators.requireThatMap(actual, "actual").isEqualTo(new Map());
		}, RangeError);
	});

	test("isNotEqualTo", () =>
	{
		validators.requireThatMap(new Map([[1, 10], [2, 20]]), "actual").isNotEqualTo(new Map());
	});

	test("isNotEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map();
			validators.requireThatMap(actual, "actual").isNotEqualTo(actual);
		}, RangeError);
	});

	test("isInstanceOf", () =>
	{
		const actual = new Map<number, number>([[1, 10], [2, 20]]);
		validators.requireThatMap(actual as unknown as Map<number, number>, "actual").isInstanceOf(Map).
			isType(Type.namedClass(null));
	});

	test("isInstanceOf_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map<number, number>();
			validators.requireThatMap(actual as unknown as Map<number, number>, "actual").
				isType(Type.namedClass("string"));
		}, TypeError);
	});

	test("isNull_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map<number, number>();
			validators.requireThatMap(actual as unknown as Map<number, number>, "actual").isNull();
		}, TypeError);
	});

	test("isNotNull", () =>
	{
		const actual = new Map<number, number>();
		validators.requireThatMap(actual as unknown as Map<number, number>, "actual").isNotNull();
	});

	test("keysContain", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		validators.requireThatMap(actual, "actual").keys().contains(2);
	});

	test("keysContain_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			validators.requireThatMap(actual, "actual").keys().contains(5);
		}, RangeError);
	});

	test("keysDoesNotContain", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		validators.requireThatMap(actual, "actual").keys().doesNotContain(5);
	});

	test("keysDoesNotContain_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			validators.requireThatMap(actual, "actual").keys().doesNotContain(2);
		}, RangeError);
	});

	test("keysNestedValidator", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		validators.requireThatMap(actual, "actual").and(v => v.keys().contains(2)).size().isEqualTo(2);
	});

	test("keysLength_False", () =>
	{
		const actual = new Map();
		assert.throws(function()
		{
			validators.requireThatMap(actual, "actual").keys().length().isGreaterThan(1);
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThatMap(actual, "actual").keys().length().isGreaterThan(2);
		}, RangeError);
	});

	test("keysNestedValidator_Fail", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			validators.requireThatMap(actual, "actual").and(v => v.keys().doesNotContain(2));
		}, RangeError);
	});

	test("valuesContain", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		validators.requireThatMap(actual, "actual").values().contains(20);
	});

	test("valuesContain_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			validators.requireThatMap(actual, "actual").values().contains(50);
		}, RangeError);
	});

	test("valuesDoesNotContain", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		validators.requireThatMap(actual, "actual").values().doesNotContain(50);
	});

	test("valuesDoesNotContain_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			validators.requireThatMap(actual, "actual").values().doesNotContain(20);
		}, RangeError);
	});

	test("valuesLength_False", () =>
	{
		const actual = new Map();
		assert.throws(function()
		{
			validators.requireThatMap(actual, "actual").values().length().isGreaterThan(1);
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThatMap(actual, "actual").values().length().isGreaterThan(2);
		}, RangeError);
	});

	test("valuesNestedValidator", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		validators.requireThatMap(actual, "actual").and(v => v.values().contains(20)).size().isEqualTo(2);
	});

	test("valuesNestedValidator_Fail", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			validators.requireThatMap(actual, "actual").and(v => v.values().doesNotContain(20));
		}, RangeError);
	});

	test("entriesContain", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		validators.requireThatMap(actual, "actual").entries().contains([2, 20]);
	});

	test("entriesContain_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			validators.requireThatMap(actual, "actual").entries().contains([5, 50]);
		}, RangeError);
	});

	test("entriesDoesNotContain", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		validators.requireThatMap(actual, "actual").entries().doesNotContain([5, 50]);
	});

	test("entriesDoesNotContain_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			validators.requireThatMap(actual, "actual").entries().doesNotContain([2, 20]);
		}, RangeError);
	});

	test("entriesLength_False", () =>
	{
		const actual = new Map();
		assert.throws(function()
		{
			validators.requireThatMap(actual, "actual").entries().length().isGreaterThan(1);
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThatMap(actual, "actual").entries().length().isGreaterThan(2);
		}, RangeError);
	});

	test("entriesNestedValidator", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		validators.requireThatMap(actual, "actual").and(v => v.entries().contains([2, 20])).size().
			isEqualTo(2);
	});

	test("entriesNestedValidator_Fail", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			validators.requireThatMap(actual, "actual").and(v => v.entries().doesNotContain([2, 20]));
		}, RangeError);
	});

	test("sizeIsEqualTo", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		validators.requireThatMap(actual, "actual").size().isEqualTo(2);
	});

	test("sizeIsEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			validators.requireThatMap(actual, "actual").size().isEqualTo(1);
		}, RangeError);
	});

	test("sizeIsNotEqualTo", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		validators.requireThatMap(actual, "actual").size().isNotEqualTo(1);
	});

	test("sizeIsNotEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			validators.requireThatMap(actual, "actual").size().isNotEqualTo(2);
		}, RangeError);
	});

	test("sizeNestedValidator", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		validators.requireThatMap(actual, "actual").and(v => v.size().isEqualTo(2)).entries().
			contains([2, 20]);
	});

	test("sizeNestedValidator_Fail", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			validators.requireThatMap(actual, "actual").and(v => v.size().isNotEqualTo(2));
		}, RangeError);
	});

	test("getActual", () =>
	{
		const input = new Map([[1, 10], [2, 20]]);
		const output = validators.requireThatMap(input, "input").getValue();
		assert.strictEqual(output, input);
	});

	test("checkIfNullIsMap", () =>
	{
		const actual = null;
		const expectedMessages = [`\
"actual" must be a Map.
actual: null`];
		const actualFailures = validators.checkIfMap(actual, "actual").isInstanceOf(Map).elseGetFailures();
		const actualMessages = actualFailures.getFailures().map(failure => failure.getMessage());
		validators.requireThatArray(actualMessages, "actualMessages").
			isEqualTo(expectedMessages, "expectedMessages");
	});
});