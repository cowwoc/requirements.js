import {
	Requirements,
	Configuration,
	TerminalEncoding
} from "../src/index.mjs";
import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {TestGlobalConfiguration} from "./TestGlobalConfiguration.mjs";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

suite("MapTest", () =>
{
	test("nameIsNull", () =>
	{
		assert.throws(function()
		{
			const actual = new Map();
			requirements.requireThat(actual, null as unknown as string);
		}, TypeError);
	});

	test("nameIsEmpty", () =>
	{
		assert.throws(function()
		{
			const actual = new Map();
			requirements.requireThat(actual, "");
		}, RangeError);
	});

	test("isEmpty", () =>
	{
		const actual = new Map();
		requirements.requireThat(actual, "actual").isEmpty();
	});

	test("isEmpty_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").isEmpty();
		}, RangeError);
	});

	test("isNotEmpty", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").isNotEmpty();
	});

	test("isNotEmpty_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map();
			requirements.requireThat(actual, "actual").isNotEmpty();
		}, RangeError);
	});

	test("isEqualTo", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").isEqualTo(actual);
	});

	test("isEqual_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").isEqualTo(new Map());
		}, RangeError);
	});

	test("isNotEqualTo", () =>
	{
		requirements.requireThat(new Map([[1, 10], [2, 20]]), "actual").isNotEqualTo(new Map());
	});

	test("isNotEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map();
			requirements.requireThat(actual, "actual").isNotEqualTo(actual);
		}, RangeError);
	});

	test("isInstanceOf", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual as unknown, "actual").isInstanceOf(Map).isInstanceOf(Object);
	});

	test("isInstanceOf_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map();
			requirements.requireThat(actual as unknown, "actual").isInstanceOf(String);
		}, TypeError);
	});

	test("isNull_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map();
			requirements.requireThat(actual as unknown, "actual").isNull();
		}, TypeError);
	});

	test("isNotNull", () =>
	{
		const actual = new Map();
		requirements.requireThat(actual as unknown, "actual").isNotNull();
	});

	test("keysContain", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").keys().contains(2);
	});

	test("keysContain_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").keys().contains(5);
		}, RangeError);
	});

	test("keysDoesNotContain", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").keys().doesNotContain(5);
	});

	test("keysDoesNotContain_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").keys().doesNotContain(2);
		}, RangeError);
	});

	test("keysConsumer", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").keysConsumer(k => k.contains(2)).size().isEqualTo(2);
	});

	test("keysLength_False", () =>
	{
		const actual = new Map();
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").keys().length().isGreaterThan(1);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").keys().length().isGreaterThan(2);
		}, RangeError);
	});

	test("keysConsumer_Fail", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").keysConsumer(k => k.doesNotContain(2));
		}, RangeError);
	});

	test("valuesContain", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").values().contains(20);
	});

	test("valuesContain_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").values().contains(50);
		}, RangeError);
	});

	test("valuesDoesNotContain", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").values().doesNotContain(50);
	});

	test("valuesDoesNotContain_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").values().doesNotContain(20);
		}, RangeError);
	});

	test("valuesLength_False", () =>
	{
		const actual = new Map();
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").values().length().isGreaterThan(1);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").values().length().isGreaterThan(2);
		}, RangeError);
	});

	test("valuesConsumer", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").valuesConsumer(k => k.contains(20)).size().isEqualTo(2);
	});

	test("valuesConsumer_Fail", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").valuesConsumer(v => v.doesNotContain(20));
		}, RangeError);
	});

	test("entriesContain", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").entries().contains([2, 20]);
	});

	test("entriesContain_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").entries().contains([5, 50]);
		}, RangeError);
	});

	test("entriesDoesNotContain", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").entries().doesNotContain([5, 50]);
	});

	test("entriesDoesNotContain_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").entries().doesNotContain([2, 20]);
		}, RangeError);
	});

	test("entriesLength_False", () =>
	{
		const actual = new Map();
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").entries().length().isGreaterThan(1);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").entries().length().isGreaterThan(2);
		}, RangeError);
	});

	test("entriesConsumer", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").entriesConsumer(k => k.contains([2, 20])).size().
			isEqualTo(2);
	});

	test("entriesConsumer_Fail", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").entriesConsumer(v => v.doesNotContain([2, 20]));
		}, RangeError);
	});

	test("sizeIsEqualTo", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").size().isEqualTo(2);
	});

	test("sizeIsEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").size().isEqualTo(1);
		}, RangeError);
	});

	test("sizeIsNotEqualTo", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").size().isNotEqualTo(1);
	});

	test("sizeIsNotEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").size().isNotEqualTo(2);
		}, RangeError);
	});

	test("sizeConsumer", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").sizeConsumer(s => s.isEqualTo(2)).entries().
			contains([2, 20]);
	});

	test("sizeConsumer_Fail", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").sizeConsumer(s => s.isNotEqualTo(2));
		}, RangeError);
	});

	test("isString", () =>
	{
		const actual = JSON.stringify(Object.fromEntries(new Map([[1, 10], [2, 20]])), null, "  ");
		requirements.requireThat(actual as unknown, "actual").isString().isEqualTo("{\n" +
			"  \"1\": 10,\n" +
			"  \"2\": 20\n" +
			"}");
	});

	test("getActual", () =>
	{
		const input = new Map([[1, 10], [2, 20]]);
		const output = requirements.requireThat(input, "input").getActual();
		assert.equal(output, input);
	});

	test("validateThatNullIsMap", () =>
	{
		const actual = null;
		const expectedMessages = ["actual must be a Map.\n" +
		"Actual: null\n" +
		"Type  : null"];
		const actualFailures = requirements.validateThat(actual, "actual").isMap().getFailures();
		const actualMessages = actualFailures.map(failure => failure.getMessage());
		requirements.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	});
});