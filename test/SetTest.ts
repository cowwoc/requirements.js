import {
	TestGlobalConfiguration,
	TerminalEncoding,
	Configuration
} from "../src/internal/internal.js";
import {Requirements} from "../src/index.js";
import {
	suite,
	test
} from "mocha";
import {assert} from "chai";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

suite("SetTest", () =>
{
	test("nameIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = new Set();
			requirements.requireThat(actual, null as unknown as string);
		}, TypeError);
	});

	test("nameIsEmpty", () =>
	{
		assert.throws(function()
		{
			const actual = new Set();
			requirements.requireThat(actual, "");
		}, RangeError);
	});

	test("isEmpty", () =>
	{
		const actual = new Set();
		requirements.requireThat(actual, "actual").asSet().isEmpty();
	});

	test("isEmpty_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Set([1, 2, 3]);
			requirements.requireThat(actual, "actual").asSet().isEmpty();
		}, RangeError);
	});

	test("isNotEmpty", () =>
	{
		const actual = new Set([1, 2, 3]);
		requirements.requireThat(actual, "actual").asSet().isNotEmpty();
	});

	test("isNotEmpty_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Set();
			requirements.requireThat(actual, "actual").asSet().isNotEmpty();
		}, RangeError);
	});

	test("isEqualTo", () =>
	{
		const actual = new Set([1, 2, 3]);
		requirements.requireThat(actual, "actual").asSet().isEqualTo(actual);
	});

	test("isEqual_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Set([1, 2, 3]);
			requirements.requireThat(actual, "actual").asSet().isEqualTo(new Set());
		}, RangeError);
	});

	test("isNotEqualTo", () =>
	{
		requirements.requireThat(new Set([1, 2, 3]), "actual").isNotEqualTo(new Set());
	});

	test("isNotEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Set();
			requirements.requireThat(actual, "actual").asSet().isNotEqualTo(actual);
		}, RangeError);
	});

	test("isInstanceOf", () =>
	{
		const actual = new Set([1, 2, 3]);
		requirements.requireThat(actual, "actual").asSet().isInstanceOf(Set).isInstanceOf(Object);
	});

	test("isInstanceOf_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Set();
			requirements.requireThat(actual, "actual").asSet().isInstanceOf(String);
		}, RangeError);
	});

	test("isNull_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Set();
			requirements.requireThat(actual, "actual").asSet().isNull();
		}, RangeError);
	});

	test("isNotNull", () =>
	{
		const actual = new Set();
		requirements.requireThat(actual, "actual").asSet().isNotNull();
	});

	test("contains", () =>
	{
		const actual = new Set([1, 2, 3]);
		requirements.requireThat(actual, "actual").asSet().contains(2);
	});

	test("contains_False", () =>
	{
		const actual = new Set([1, 2, 3]);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asSet().contains(5);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asSet().contains(5, "expected");
		}, RangeError);
	});

	test("doesNotContain", () =>
	{
		const actual = new Set([1, 2, 3]);
		requirements.requireThat(actual, "actual").asSet().doesNotContain(5);
	});

	test("doesNotContain_False", () =>
	{
		const actual = new Set([1, 2, 3]);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asSet().doesNotContain(2);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asSet().doesNotContain(2, "expected");
		}, RangeError);
	});

	test("containsAny", () =>
	{
		const actual = new Set([1, 2, 3]);
		requirements.requireThat(actual, "actual").asSet().containsAny([0, 2, 4]);
	});

	test("containsAny_False", () =>
	{
		const actual = new Set([1, 2, 3]);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asSet().containsAny([0, 5]);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asSet().containsAny([0, 5], "expected");
		}, RangeError);
	});

	test("doesNotContainAny", () =>
	{
		const actual = new Set([1, 2, 3]);
		requirements.requireThat(actual, "actual").asSet().doesNotContainAny([0, 5]);
	});

	test("doesNotContainAny_False", () =>
	{
		const actual = new Set([1, 2, 3]);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asSet().doesNotContainAny([0, 2]);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asSet().doesNotContainAny([0, 2], "expected");
		}, RangeError);
	});

	test("containsAll", () =>
	{
		const actual = new Set([1, 2, 3]);
		requirements.requireThat(actual, "actual").asSet().containsAll([2, 3]);
	});

	test("containsAll_False", () =>
	{
		const actual = new Set([1, 2, 3]);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asSet().containsAll([0, 1, 2]);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asSet().containsAll([0, 1, 2], "expected");
		}, RangeError);
	});

	test("doesNotContainAll", () =>
	{
		const actual = new Set([1, 2, 3]);
		requirements.requireThat(actual, "actual").asSet().doesNotContainAll([0, 2, 3]);
	});

	test("doesNotContainAll_False", () =>
	{
		const actual = new Set([1, 2, 3]);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asSet().doesNotContainAll([2, 3]);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asSet().doesNotContainAll([2, 3], "expected");
		}, RangeError);
	});

	test("containsExactly", () =>
	{
		const actual = new Set([1, 2, 3]);
		requirements.requireThat(actual, "actual").asSet().containsExactly([1, 2, 3]);
	});

	test("containsExactly_False", () =>
	{
		const actual = new Set([1, 2, 3]);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asSet().containsExactly([0, 1, 2, 3]);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asSet().containsExactly([0, 1, 2, 3], "expected");
		}, RangeError);
	});

	test("sizeIsEqualTo", () =>
	{
		const actual = new Set([1, 2, 3]);
		requirements.requireThat(actual, "actual").asSet().size().isEqualTo(3);
	});

	test("sizeIsEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Set([1, 2, 3]);
			requirements.requireThat(actual, "actual").asSet().size().isEqualTo(2);
		}, RangeError);
	});

	test("sizeIsNotEqualTo", () =>
	{
		const actual = new Set([1, 2, 3]);
		requirements.requireThat(actual, "actual").asSet().size().isNotEqualTo(2);
	});

	test("sizeIsNotEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Set([1, 2, 3]);
			requirements.requireThat(actual, "actual").asSet().size().isNotEqualTo(3);
		}, RangeError);
	});

	test("sizeConsumer", () =>
	{
		assert.throws(function()
		{
			const actual = new Set([1, 2, 3]);
			requirements.requireThat(actual, "actual").asSet().sizeConsumer(s => s.isNotEqualTo(3));
		}, RangeError);
	});

	test("asArray", () =>
	{
		const array = [1, 2, 3];
		const actual = new Set(array);
		requirements.requireThat(actual, "actual").asSet().asArray().isEqualTo(array);
	});

	test("asArrayConsumer", () =>
	{
		const array = [1, 2, 3];
		assert.throws(function()
		{
			const actual = new Set(array);
			requirements.requireThat(actual, "actual").asSet().asArrayConsumer(a => a.isNotEqualTo(array));
		}, RangeError);
	});

	test("asString", () =>
	{
		const actual = new Set([1, 2, 3]);
		requirements.requireThat(actual, "actual").asSet().asString().isEqualTo("[1, 2, 3]");
	});

	test("getActual", () =>
	{
		const input = new Set([1, 2, 3]);
		const output = requirements.requireThat(input, "input").getActual();
		assert.equal(output, input);
	});

	test("validateThatNullAsSet", () =>
	{
		const actual = null;
		const expectedMessages = ["actual must be a Set.\n" +
		"Actual: null\n" +
		"Type  : null"];
		const actualFailures = requirements.validateThat(actual, "actual").asSet().getFailures();
		const actualMessages = actualFailures.map(failure => failure.getMessage());
		requirements.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	});
});