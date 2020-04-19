import test from "tape-catch";
import TestGlobalConfiguration from "../src/internal/TestGlobalConfiguration";
import TerminalEncoding from "../src/TerminalEncoding";
import Configuration from "../src/Configuration";
import Requirements from "../src/Requirements";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

test("MapTest.nameIsNull", function(t)
{
	t.throws(function()
	{
		const actual = new Map();
		// noinspection JSCheckFunctionSignatures
		requirements.requireThat(actual, null);
	}, TypeError);
	t.end();
});

test("MapTest.nameIsEmpty", function(t)
{
	t.throws(function()
	{
		const actual = new Map();
		requirements.requireThat(actual, "");
	}, RangeError);
	t.end();
});

test("MapTest.isEmpty", function(t)
{
	const actual = new Map();
	requirements.requireThat(actual, "actual").asMap().isEmpty();
	t.end();
});

test("MapTest.isEmpty_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().isEmpty();
	}, RangeError);
	t.end();
});

test("MapTest.isNotEmpty", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requirements.requireThat(actual, "actual").asMap().isNotEmpty();
	t.end();
});

test("MapTest.isNotEmpty_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map();
		requirements.requireThat(actual, "actual").asMap().isNotEmpty();
	}, RangeError);
	t.end();
});

test("MapTest.isEqualTo", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requirements.requireThat(actual, "actual").asMap().isEqualTo(actual);
	t.end();
});

test("MapTest.isEqual_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().isEqualTo(new Map());
	}, RangeError);
	t.end();
});

test("MapTest.isNotEqualTo", function(t)
{
	requirements.requireThat(new Map([[1, 10], [2, 20]]), "actual").isNotEqualTo(new Map());
	t.end();
});

test("MapTest.isNotEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map();
		requirements.requireThat(actual, "actual").asMap().isNotEqualTo(actual);
	}, RangeError);
	t.end();
});

test("MapTest.isInstanceOf", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requirements.requireThat(actual, "actual").asMap().isInstanceOf(Map).isInstanceOf(Object);
	t.end();
});

test("MapTest.isInstanceOf_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map();
		requirements.requireThat(actual, "actual").asMap().isInstanceOf(String);
	}, RangeError);
	t.end();
});

test("MapTest.isNull_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map();
		requirements.requireThat(actual, "actual").asMap().isNull();
	}, RangeError);
	t.end();
});

test("MapTest.isNotNull", function(t)
{
	const actual = new Map();
	requirements.requireThat(actual, "actual").asMap().isNotNull();
	t.end();
});

test("MapTest.keysContain", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requirements.requireThat(actual, "actual").asMap().keys().contains(2);
	t.end();
});

test("MapTest.keysContain_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().keys().contains(5);
	}, RangeError);
	t.end();
});

test("MapTest.keysDoesNotContain", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requirements.requireThat(actual, "actual").asMap().keys().doesNotContain(5);
	t.end();
});

test("MapTest.keysDoesNotContain_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().keys().doesNotContain(2);
	}, RangeError);
	t.end();
});

test("MapTest.keysConsumer", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requirements.requireThat(actual, "actual").asMap().keysConsumer(k => k.contains(2)).size().isEqualTo(2);
	t.end();
});

test("MapTest.keysLength_False", function(t)
{
	const actual = new Map();
	t.throws(function()
	{
		requirements.requireThat(actual, "actual").asMap().keys().length().isGreaterThan(1);
	}, RangeError);
	t.throws(function()
	{
		requirements.requireThat(actual, "actual").asMap().keys().length().isGreaterThan(2);
	}, RangeError);
	t.end();
});

test("MapTest.keysConsumer_Fail", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().keysConsumer(k => k.doesNotContain(2));
	}, RangeError);
	t.end();
});

test("MapTest.valuesContain", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requirements.requireThat(actual, "actual").asMap().values().contains(20);
	t.end();
});

test("MapTest.valuesContain_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().values().contains(50);
	}, RangeError);
	t.end();
});

test("MapTest.valuesDoesNotContain", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requirements.requireThat(actual, "actual").asMap().values().doesNotContain(50);
	t.end();
});

test("MapTest.valuesDoesNotContain_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().values().doesNotContain(20);
	}, RangeError);
	t.end();
});

test("MapTest.valuesLength_False", function(t)
{
	const actual = new Map();
	t.throws(function()
	{
		requirements.requireThat(actual, "actual").asMap().values().length().isGreaterThan(1);
	}, RangeError);
	t.throws(function()
	{
		requirements.requireThat(actual, "actual").asMap().values().length().isGreaterThan(2);
	}, RangeError);
	t.end();
});

test("MapTest.valuesConsumer", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requirements.requireThat(actual, "actual").asMap().valuesConsumer(k => k.contains(20)).size().isEqualTo(2);
	t.end();
});

test("MapTest.valuesConsumer_Fail", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().valuesConsumer(v => v.doesNotContain(20));
	}, RangeError);
	t.end();
});

test("MapTest.entriesContain", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requirements.requireThat(actual, "actual").asMap().entries().contains([2, 20]);
	t.end();
});

test("MapTest.entriesContain_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().entries().contains([5, 50]);
	}, RangeError);
	t.end();
});

test("MapTest.entriesDoesNotContain", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requirements.requireThat(actual, "actual").asMap().entries().doesNotContain([5, 50]);
	t.end();
});

test("MapTest.entriesDoesNotContain_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().entries().doesNotContain([2, 20]);
	}, RangeError);
	t.end();
});

test("MapTest.entriesLength_False", function(t)
{
	const actual = new Map();
	t.throws(function()
	{
		requirements.requireThat(actual, "actual").asMap().entries().length().isGreaterThan(1);
	}, RangeError);
	t.throws(function()
	{
		requirements.requireThat(actual, "actual").asMap().entries().length().isGreaterThan(2);
	}, RangeError);
	t.end();
});

test("MapTest.entriesConsumer", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requirements.requireThat(actual, "actual").asMap().entriesConsumer(k => k.contains([2, 20])).size().
		isEqualTo(2);
	t.end();
});

test("MapTest.entriesConsumer_Fail", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().entriesConsumer(v => v.doesNotContain([2, 20]));
	}, RangeError);
	t.end();
});

test("MapTest.sizeIsEqualTo", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requirements.requireThat(actual, "actual").asMap().size().isEqualTo(2);
	t.end();
});

test("MapTest.sizeIsEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().size().isEqualTo(1);
	}, RangeError);
	t.end();
});

test("MapTest.sizeIsNotEqualTo", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requirements.requireThat(actual, "actual").asMap().size().isNotEqualTo(1);
	t.end();
});

test("MapTest.sizeIsNotEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().size().isNotEqualTo(2);
	}, RangeError);
	t.end();
});

test("MapTest.sizeConsumer", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requirements.requireThat(actual, "actual").asMap().sizeConsumer(s => s.isEqualTo(2)).entries().
		contains([2, 20]);
	t.end();
});

test("MapTest.sizeConsumer_Fail", function(t)
{
	t.throws(function()
	{
		const actual = new Map([[1, 10], [2, 20]]);
		requirements.requireThat(actual, "actual").asMap().sizeConsumer(s => s.isNotEqualTo(2));
	}, RangeError);
	t.end();
});

test("MapTest.asString", function(t)
{
	const actual = new Map([[1, 10], [2, 20]]);
	requirements.requireThat(actual, "actual").asMap().asString().isEqualTo("{\n" +
		"  \"1\": 10,\n" +
		"  \"2\": 20\n" +
		"}");
	t.end();
});

test("MapTest.getActual", function(t)
{
	const input = new Map([[1, 10], [2, 20]]);
	const output = requirements.requireThat(input, "input").getActual();
	t.equals(output, input);
	t.end();
});

test("MapTest.validateThatNullAsMap", function(t)
{
	const actual = null;
	const expectedMessages = ["actual must be a Map.\n" +
	"Actual: null\n" +
	"Type  : null"];
	const actualFailures = requirements.validateThat(actual, "actual").asMap().getFailures();
	const actualMessages = actualFailures.map(failure => failure.getMessage());
	requirements.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	t.end();
});