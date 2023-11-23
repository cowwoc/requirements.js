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
		requirements.requireThat(actual, "actual").asMap().isEmpty();
	});

	test("isEmpty_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").asMap().isEmpty();
		}, RangeError);
	});

	test("isNotEmpty", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().isNotEmpty();
	});

	test("isNotEmpty_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map();
			requirements.requireThat(actual, "actual").asMap().isNotEmpty();
		}, RangeError);
	});

	test("isEqualTo", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().isEqualTo(actual);
	});

	test("isEqual_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").asMap().isEqualTo(new Map());
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
			requirements.requireThat(actual, "actual").asMap().isNotEqualTo(actual);
		}, RangeError);
	});

	test("isInstanceOf", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().isInstanceOf(Map).isInstanceOf(Object);
	});

	test("isInstanceOf_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map();
			requirements.requireThat(actual, "actual").asMap().isInstanceOf(String);
		}, RangeError);
	});

	test("isNull_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map();
			requirements.requireThat(actual, "actual").asMap().isNull();
		}, RangeError);
	});

	test("isNotNull", () =>
	{
		const actual = new Map();
		requirements.requireThat(actual, "actual").asMap().isNotNull();
	});

	test("keysContain", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().keys().contains(2);
	});

	test("keysContain_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").asMap().keys().contains(5);
		}, RangeError);
	});

	test("keysDoesNotContain", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().keys().doesNotContain(5);
	});

	test("keysDoesNotContain_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").asMap().keys().doesNotContain(2);
		}, RangeError);
	});

	test("keysConsumer", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().keysConsumer(k => k.contains(2)).size().isEqualTo(2);
	});

	test("keysLength_False", () =>
	{
		const actual = new Map();
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asMap().keys().length().isGreaterThan(1);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asMap().keys().length().isGreaterThan(2);
		}, RangeError);
	});

	test("keysConsumer_Fail", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").asMap().keysConsumer(k => k.doesNotContain(2));
		}, RangeError);
	});

	test("valuesContain", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().values().contains(20);
	});

	test("valuesContain_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").asMap().values().contains(50);
		}, RangeError);
	});

	test("valuesDoesNotContain", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().values().doesNotContain(50);
	});

	test("valuesDoesNotContain_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").asMap().values().doesNotContain(20);
		}, RangeError);
	});

	test("valuesLength_False", () =>
	{
		const actual = new Map();
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asMap().values().length().isGreaterThan(1);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asMap().values().length().isGreaterThan(2);
		}, RangeError);
	});

	test("valuesConsumer", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().valuesConsumer(k => k.contains(20)).size().isEqualTo(2);
	});

	test("valuesConsumer_Fail", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").asMap().valuesConsumer(v => v.doesNotContain(20));
		}, RangeError);
	});

	test("entriesContain", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().entries().contains([2, 20]);
	});

	test("entriesContain_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").asMap().entries().contains([5, 50]);
		}, RangeError);
	});

	test("entriesDoesNotContain", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().entries().doesNotContain([5, 50]);
	});

	test("entriesDoesNotContain_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").asMap().entries().doesNotContain([2, 20]);
		}, RangeError);
	});

	test("entriesLength_False", () =>
	{
		const actual = new Map();
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asMap().entries().length().isGreaterThan(1);
		}, RangeError);
		assert.throws(function()
		{
			requirements.requireThat(actual, "actual").asMap().entries().length().isGreaterThan(2);
		}, RangeError);
	});

	test("entriesConsumer", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().entriesConsumer(k => k.contains([2, 20])).size().
			isEqualTo(2);
	});

	test("entriesConsumer_Fail", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").asMap().entriesConsumer(v => v.doesNotContain([2, 20]));
		}, RangeError);
	});

	test("sizeIsEqualTo", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().size().isEqualTo(2);
	});

	test("sizeIsEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").asMap().size().isEqualTo(1);
		}, RangeError);
	});

	test("sizeIsNotEqualTo", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().size().isNotEqualTo(1);
	});

	test("sizeIsNotEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").asMap().size().isNotEqualTo(2);
		}, RangeError);
	});

	test("sizeConsumer", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().sizeConsumer(s => s.isEqualTo(2)).entries().
			contains([2, 20]);
	});

	test("sizeConsumer_Fail", () =>
	{
		assert.throws(function()
		{
			const actual = new Map([[1, 10], [2, 20]]);
			requirements.requireThat(actual, "actual").asMap().sizeConsumer(s => s.isNotEqualTo(2));
		}, RangeError);
	});

	test("asString", () =>
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().asString().isEqualTo("{\n" +
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

	test("validateThatNullAsMap", () =>
	{
		const actual = null;
		const expectedMessages = ["actual must be a Map.\n" +
		"Actual: null\n" +
		"Type  : null"];
		const actualFailures = requirements.validateThat(actual, "actual").asMap().getFailures();
		const actualMessages = actualFailures.map(failure => failure.getMessage());
		requirements.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	});
});