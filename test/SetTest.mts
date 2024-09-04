import {
	TerminalEncoding,
	Configuration
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

suite("SetTest", () =>
{
	test("nameIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = new Set();
			validators.requireThat(actual, null as unknown as string);
		}, TypeError);
	});

	test("nameIsEmpty", () =>
	{
		assert.throws(function()
		{
			const actual = new Set();
			validators.requireThat(actual, "");
		}, RangeError);
	});

	test("isEmpty", () =>
	{
		const actual = new Set();
		validators.requireThat(actual, "actual").isEmpty();
	});

	test("isEmpty_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Set([1, 2, 3]);
			validators.requireThat(actual, "actual").isEmpty();
		}, RangeError);
	});

	test("isNotEmpty", () =>
	{
		const actual = new Set([1, 2, 3]);
		validators.requireThat(actual, "actual").isNotEmpty();
	});

	test("isNotEmpty_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Set();
			validators.requireThat(actual, "actual").isNotEmpty();
		}, RangeError);
	});

	test("isEqualTo", () =>
	{
		const actual = new Set([1, 2, 3]);
		validators.requireThat(actual, "actual").isEqualTo(actual);
	});

	test("isEqual_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Set([1, 2, 3]);
			validators.requireThat(actual, "actual").isEqualTo(new Set());
		}, RangeError);
	});

	test("isNotEqualTo", () =>
	{
		validators.requireThat(new Set([1, 2, 3]), "actual").isNotEqualTo(new Set());
	});

	test("isNotEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Set();
			validators.requireThat(actual, "actual").isNotEqualTo(actual);
		}, RangeError);
	});

	test("isSet", () =>
	{
		const actual = new Set([1, 2, 3]);
		validators.requireThat(actual as unknown, "actual").isInstanceOf(Set).getValue();
	});

	test("isSet_False", () =>
	{
		assert.throws(function()
		{
			const actual = [1, 2, 3];
			validators.requireThat(actual as unknown, "actual").isInstanceOf(Set);
		}, TypeError);
	});

	test("isNull_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Set();
			validators.requireThat(actual as unknown, "actual").isNull();
		}, TypeError);
	});

	test("isNotNull", () =>
	{
		const actual = new Set();
		validators.requireThat(actual as unknown, "actual").isNotNull();
	});

	test("contains", () =>
	{
		const actual = new Set([1, 2, 3]);
		validators.requireThat(actual, "actual").contains(2);
	});

	test("contains_False", () =>
	{
		const actual = new Set([1, 2, 3]);
		assert.throws(function()
		{
			validators.requireThat(actual, "actual").contains(5);
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThat(actual, "actual").contains(5, "expected");
		}, RangeError);
	});

	test("doesNotContain", () =>
	{
		const actual = new Set([1, 2, 3]);
		validators.requireThat(actual, "actual").doesNotContain(5);
	});

	test("doesNotContain_False", () =>
	{
		const actual = new Set([1, 2, 3]);
		assert.throws(function()
		{
			validators.requireThat(actual, "actual").doesNotContain(2);
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThat(actual, "actual").doesNotContain(2, "expected");
		}, RangeError);
	});

	test("containsAny", () =>
	{
		const actual = new Set([1, 2, 3]);
		validators.requireThat(actual, "actual").containsAny([0, 2, 4]);
	});

	test("containsAny_False", () =>
	{
		const actual = new Set([1, 2, 3]);
		assert.throws(function()
		{
			validators.requireThat(actual, "actual").containsAny([0, 5]);
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThat(actual, "actual").containsAny([0, 5], "expected");
		}, RangeError);
	});

	test("doesNotContainAny", () =>
	{
		const actual = new Set([1, 2, 3]);
		validators.requireThat(actual, "actual").doesNotContainAny([0, 5]);
	});

	test("doesNotContainAny_False", () =>
	{
		const actual = new Set([1, 2, 3]);
		assert.throws(function()
		{
			validators.requireThat(actual, "actual").doesNotContainAny([0, 2]);
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThat(actual, "actual").doesNotContainAny([0, 2], "expected");
		}, RangeError);
	});

	test("containsAll", () =>
	{
		const actual = new Set([1, 2, 3]);
		validators.requireThat(actual, "actual").containsAll([2, 3]);
	});

	test("containsAll_False", () =>
	{
		const actual = new Set([1, 2, 3]);
		assert.throws(function()
		{
			validators.requireThat(actual, "actual").containsAll([0, 1, 2]);
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThat(actual, "actual").containsAll([0, 1, 2], "expected");
		}, RangeError);
	});

	test("doesNotContainAll", () =>
	{
		const actual = new Set([1, 2, 3]);
		validators.requireThat(actual, "actual").doesNotContainAll([0, 2, 3]);
	});

	test("doesNotContainAll_False", () =>
	{
		const actual = new Set([1, 2, 3]);
		assert.throws(function()
		{
			validators.requireThat(actual, "actual").doesNotContainAll([2, 3]);
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThat(actual, "actual").doesNotContainAll([2, 3], "expected");
		}, RangeError);
	});

	test("containsExactly", () =>
	{
		const actual = new Set([1, 2, 3]);
		validators.requireThat(actual, "actual").containsExactly([1, 2, 3]);
	});

	test("containsExactly_False", () =>
	{
		const actual = new Set([1, 2, 3]);
		assert.throws(function()
		{
			validators.requireThat(actual, "actual").containsExactly([0, 1, 2, 3]);
		}, RangeError);
		assert.throws(function()
		{
			validators.requireThat(actual, "actual").containsExactly([0, 1, 2, 3], "expected");
		}, RangeError);
	});

	test("sizeIsEqualTo", () =>
	{
		const actual = new Set([1, 2, 3]);
		validators.requireThat(actual, "actual").size().isEqualTo(3);
	});

	test("sizeIsEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Set([1, 2, 3]);
			validators.requireThat(actual, "actual").size().isEqualTo(2);
		}, RangeError);
	});

	test("sizeIsNotEqualTo", () =>
	{
		const actual = new Set([1, 2, 3]);
		validators.requireThat(actual, "actual").size().isNotEqualTo(2);
	});

	test("sizeIsNotEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Set([1, 2, 3]);
			validators.requireThat(actual, "actual").size().isNotEqualTo(3);
		}, RangeError);
	});

	test("sizeNestedValidator", () =>
	{
		assert.throws(function()
		{
			const actual = new Set([1, 2, 3]);
			validators.requireThat(actual, "actual").and(v => v.size().isNotEqualTo(3));
		}, RangeError);
	});

	test("getActual", () =>
	{
		const input = new Set([1, 2, 3]);
		const output = validators.requireThat(input, "input").getValue();
		assert.strictEqual(output, input);
	});

	test("checkIfNullAsSet", () =>
	{
		const actual = null;
		const expectedMessages = [`\
"actual" must be a Set.
actual: null`];
		const actualFailures = validators.checkIf(actual, "actual").isInstanceOf(Set).elseGetFailures();
		const actualMessages = actualFailures.getFailures().map(failure => failure.getMessage());
		validators.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages, "expectedMessages");
	});
});