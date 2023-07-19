import {
	suite,
	test
} from "mocha";
import {assert} from "chai";
import {
	Configuration,
	TerminalEncoding,
	TestGlobalConfiguration
} from "../src/internal/internal.mjs";
import {Requirements} from "../src/index.mjs";

const globalConfiguration = new TestGlobalConfiguration(TerminalEncoding.NONE);
const configuration = new Configuration(globalConfiguration);
const requirements = new Requirements(configuration);

/* eslint-disable max-statements */
suite("ArrayTest", () =>
{
	/* eslint-enable max-statements */
	test("isEmpty", () =>
	{
		const actual: unknown[] = [];
		requirements.requireThat(actual, "actual").asArray().isEmpty();
	});

	test("isEmpty_actualContainsOneElement", () =>
	{
		assert.throws(function()
		{
			const actual = ["element"];
			requirements.requireThat(actual, "actual").asArray().isEmpty();
		}, RangeError);
	});

	test("isNotEmpty", () =>
	{
		const actual = ["element"];
		requirements.requireThat(actual, "actual").asArray().isNotEmpty();
	});

	test("isNotEmpty_False", () =>
	{
		assert.throws(function()
		{
			const actual: unknown[] = [];
			requirements.requireThat(actual, "actual").asArray().isNotEmpty();
		}, RangeError);
	});

	test("contains", () =>
	{
		const actual = ["element"];
		requirements.requireThat(actual, "actual").asArray().contains("element");
	});

	test("contains_False", () =>
	{
		assert.throws(function()
		{
			const actual = ["notElement"];
			requirements.requireThat(actual, "actual").asArray().contains("element");
		}, RangeError);
	});

	test("containsVariable", () =>
	{
		const actual = ["element"];
		requirements.requireThat(actual, "actual").asArray().contains("element", "nameOfExpected");
	});

	test("containsVariable_False", () =>
	{
		assert.throws(function()
		{
			const actual = ["notElement"];
			requirements.requireThat(actual, "actual").asArray().contains("element", "nameOfExpected");
		}, RangeError);
	});

	test("contains_expectedEmptyName", () =>
	{
		assert.throws(function()
		{
			const actual = ["element"];
			requirements.requireThat(actual, "actual").asArray().contains(" ");
		}, RangeError);
	});

	test("containsExactly", () =>
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requirements.requireThat(actual, "actual").asArray().containsExactly(["one", "two", "three"]);
	});

	test("containsExactly_actualContainsUnwantedElements", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"one",
					"two",
					"three"
				];
			requirements.requireThat(actual, "actual").asArray().containsExactly(["one", "two"]);
		}, RangeError);
	});

	test("containsExactly_actualIsMissingElements", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"one",
					"two"
				];
			requirements.requireThat(actual, "actual").asArray().containsExactly(["one", "two", "three"]);
		}, RangeError);
	});

	test("containsExactlyVariable_actualIsMissingElements", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"one",
					"two"
				];
			requirements.requireThat(actual, "actual").asArray().containsExactly(["one", "two", "three"], "expected");
		}, RangeError);
	});

	test("containsExactlyVariable", () =>
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requirements.requireThat(actual, "actual").asArray().containsExactly(
			["one", "two", "three"], "nameOfExpected");
	});

	test("containsExactlyVariable_False", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"one",
					"two",
					"three"
				];
			requirements.requireThat(actual, "actual").asArray().containsExactly(["one", "two"], "nameOfExpected");
		}, RangeError);
	});

	test("containsExactly_expectedEmptyName", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"one",
					"two",
					"three"
				];
			requirements.requireThat(actual, "actual").asArray().containsExactly(["one", "two", "three"], " ");
		}, RangeError);
	});

	test("containsAny", () =>
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requirements.requireThat(actual, "actual").asArray().containsAny(["two", "four"]);
	});

	test("containsAny_False", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"one",
					"two",
					"three"
				];
			requirements.requireThat(actual, "actual").asArray().containsAny(["four", "five"]);
		}, RangeError);
	});

	test("containsAnyVariable", () =>
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requirements.requireThat(actual, "actual").asArray().containsAny(["two", "four"], "nameOfExpected");
	});

	test("containsAnyVariable_False", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"one",
					"two",
					"three"
				];
			requirements.requireThat(actual, "actual").asArray().containsAny(["four", "five"], "nameOfExpected");
		}, RangeError);
	});

	test("containsAny_expectedEmptyName", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"one",
					"two",
					"three"
				];
			requirements.requireThat(actual, "actual").asArray().containsAny(["two", "four"], " ");
		}, RangeError);
	});

	test("containsAll", () =>
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requirements.requireThat(actual, "actual").asArray().containsAll(["two", "three"]);
	});

	test("containsAll_False", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"one",
					"two",
					"three"
				];
			requirements.requireThat(actual, "actual").asArray().containsAll(["two", "four"]);
		}, RangeError);
	});

	test("containsAllVariable", () =>
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requirements.requireThat(actual, "actual").asArray().containsAll(["two", "three"], "nameOfExpected");
	});

	test("containsAllVariable_False", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"one",
					"two",
					"three"
				];
			requirements.requireThat(actual, "actual").asArray().containsAll(["two", "four"], "nameOfExpected");
		}, RangeError);
	});

	test("containsAll_expectedEmptyName", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"one",
					"two",
					"three"
				];
			requirements.requireThat(actual, "actual").asArray().containsAll(["two", "three"], " ");
		}, RangeError);
	});

	test("doesNotContain", () =>
	{
		const actual =
			[
				"notElement"
			];
		requirements.requireThat(actual, "actual").asArray().doesNotContain("element");
	});

	test("doesNotContain_False", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"element"
				];
			requirements.requireThat(actual, "actual").asArray().doesNotContain("element");
		}, RangeError);
	});

	test("doesNotContainVariable", () =>
	{
		const actual =
			[
				"notElement"
			];
		requirements.requireThat(actual, "actual").asArray().doesNotContain("element", "nameOfExpected");
	});

	test("doesNotContainVariable_False", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"element"
				];
			requirements.requireThat(actual, "actual").asArray().doesNotContain("element", "nameOfExpected");
		}, RangeError);
	});

	test("doesNotContain_expectedEmptyName", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"notElement"
				];
			requirements.requireThat(actual, "actual").asArray().doesNotContain("element", " ");
		}, RangeError);
	});

	test("doesNotContainAny", () =>
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requirements.requireThat(actual, "actual").asArray().doesNotContainAny(["four", "five", "six"]);
	});

	test("doesNotContainAny_False", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"one",
					"two",
					"three"
				];
			requirements.requireThat(actual, "actual").asArray().doesNotContainAny(["three", "four", "five"]);
		}, RangeError);
	});

	test("doesNotContainAnyVariable", () =>
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requirements.requireThat(actual, "actual").asArray().
			doesNotContainAny(["four", "five", "six"], "nameOfExpected");
	});

	test("doesNotContainAnyVariable_False", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"one",
					"two",
					"three"
				];
			requirements.requireThat(actual, "actual").asArray().
				doesNotContainAny(["three", "four", "five"], "nameOfExpected");
		}, RangeError);
	});

	test("doesNotContainAny_expectedEmptyName", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"one",
					"two",
					"three"
				];
			requirements.requireThat(actual, "actual").asArray().doesNotContainAny(["four", "five", "six"], " ");
		}, RangeError);
	});

	test("doesNotContainAll", () =>
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requirements.requireThat(actual, "actual").asArray().doesNotContainAll(["one", "two", "four"]);
	});

	test("doesNotContainAll_False", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"one",
					"two",
					"three",
					"four"
				];
			requirements.requireThat(actual, "actual").asArray().doesNotContainAll(["one", "two", "three"]);
		}, RangeError);
	});

	test("doesNotContainAllVariable", () =>
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requirements.requireThat(actual, "actual").asArray().
			doesNotContainAll(["one", "two", "four"], "nameOfExpected");
	});

	test("doesNotContainAllVariable_False", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"one",
					"two",
					"three",
					"four"
				];
			requirements.requireThat(actual, "actual").asArray().doesNotContainAll(["one", "two", "three"],
				"nameOfExpected");
		}, RangeError);
	});

	test("doesNotContainAll_expectedEmptyName", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"one",
					"two",
					"three"
				];
			requirements.requireThat(actual, "actual").asArray().doesNotContainAll(["one", "two", "four"], " ");
		}, RangeError);
	});

	test("doesNotContainDuplicates", () =>
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requirements.requireThat(actual, "actual").asArray().doesNotContainDuplicates();
	});

	test("doesNotContainDuplicates_False", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"one",
					"two",
					"three",
					"two",
					"four"
				];
			requirements.requireThat(actual, "actual").asArray().doesNotContainDuplicates();
		}, RangeError);
	});

	test("lengthIsEqualTo", () =>
	{
		const actual =
			[
				"element"
			];
		requirements.requireThat(actual, "actual").asArray().length().isEqualTo(1);
	});

	test("lengthConsumerIsEqualTo", () =>
	{
		const actual =
			[
				"element"
			];
		requirements.requireThat(actual, "actual").asArray().lengthConsumer(l => l.isEqualTo(1));
	});

	test("lengthConsumerIsEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"element"
				];
			requirements.requireThat(actual, "actual").asArray().lengthConsumer(l => l.isEqualTo(2));
		}, RangeError);
	});

	test("lengthIsEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"element"
				];
			requirements.requireThat(actual, "actual").asArray().length().isEqualTo(2);
		}, RangeError);
	});

	test("lengthIsEqualToVariable", () =>
	{
		const actual =
			[
				"element"
			];
		requirements.requireThat(actual, "actual").asArray().length().isEqualTo(1, "nameOfExpected");
	});

	test("lengthIsEqualToVariable_False", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"element"
				];
			requirements.requireThat(actual, "actual").asArray().length().isEqualTo(2, "nameOfExpected");
		}, RangeError);
	});

	test("lengthIsEqualTo_expectedEmptyName", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"element"
				];
			requirements.requireThat(actual, "actual").asArray().length().isEqualTo(1, " ");
		}, RangeError);
	});

	test("lengthIsNotEqualTo", () =>
	{
		const actual =
			[
				"element"
			];
		requirements.requireThat(actual, "actual").asArray().length().isNotEqualTo(2);
	});

	test("lengthIsNotEqualTo_False", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"element"
				];
			requirements.requireThat(actual, "actual").asArray().length().isNotEqualTo(1);
		}, RangeError);
	});

	test("lengthIsNotEqualToVariable", () =>
	{
		const actual =
			[
				"element"
			];
		requirements.requireThat(actual, "actual").asArray().length().isNotEqualTo(2, "nameOfExpected");
	});

	test("lengthIsNotEqualToVariable_False", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"element"
				];
			requirements.requireThat(actual, "actual").asArray().length().isNotEqualTo(1, "nameOfExpected");
		}, RangeError);
	});

	test("lengthIsNotEqualTo_expectedEmptyName", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					"element"
				];
			requirements.requireThat(actual, "actual").asArray().length().isNotEqualTo(2, " ");
		}, RangeError);
	});

	test("isBetween_expectedIsLowerBound", () =>
	{
		const actual =
			[
				1,
				2,
				3
			];
		requirements.requireThat(actual, "actual").asArray().length().isBetween(3, 5);
	});

	test("isBetween_expectedIsInBounds", () =>
	{
		const actual =
			[
				1,
				2,
				3,
				4
			];
		requirements.requireThat(actual, "actual").asArray().length().isBetween(3, 5);
	});

	test("isBetween_expectedIsUpperBound", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					1,
					2,
					3,
					4,
					5
				];
			requirements.requireThat(actual, "actual").asArray().length().isBetween(3, 5);
		}, RangeError);
	});

	test("isBetween_expectedIsBelow", () =>
	{
		assert.throws(function()
		{
			const actual =
				[
					1,
					2
				];
			requirements.requireThat(actual, "actual").asArray().length().isBetween(3, 5);
		}, RangeError);
	});

	test("isBetweenClosed_expectedIsUpperBound", () =>
	{
		const actual =
			[
				1,
				2,
				3,
				4,
				5
			];
		requirements.requireThat(actual, "actual").asArray().length().isBetweenClosed(3, 5);
	});

	test("asSet", () =>
	{
		const set = new Set([1, 2, 3]);
		const actual = Array.from(set);
		requirements.requireThat(actual, "actual").asArray().asSet().isEqualTo(set);
	});

	test("asSetConsumer", () =>
	{
		const set = new Set([1, 2, 3]);
		const actual = Array.from(set);
		requirements.requireThat(actual, "actual").asArray().asSetConsumer(s => s.isEqualTo(set));
	});

	test("asSetConsumer_False", () =>
	{
		assert.throws(function()
		{
			const set = new Set([1, 2, 3]);
			const actual = Array.from(set);
			requirements.requireThat(actual, "actual").asArray().asSetConsumer(s => s.isNotEqualTo(set));
		}, RangeError);
	});

	test("asString", () =>
	{
		const actual = [1, 2, 3];
		requirements.requireThat(actual, "actual").asArray().asString().isEqualTo("[1, 2, 3]");
	});

	test("getActual", () =>
	{
		const input =
			[
				1,
				2,
				3,
				4,
				5
			];
		const output = requirements.requireThat(input, "input").getActual();
		assert.equal(output, input);
	});

	test("getActual", () =>
	{
		const input =
			[
				1,
				2,
				3,
				4,
				5
			];
		const output = requirements.requireThat(input, "input").getActual();
		assert.equal(output, input);
	});

	test("validateThatNullLength", () =>
	{
		const actual = null;
		const expectedMessages = ["actual must be an Array.\n" +
		"Actual: null\n" +
		"Type  : null"];
		const actualFailures = requirements.validateThat(actual, "actual").asArray().length().getFailures();
		const actualMessages = actualFailures.map(failure => failure.getMessage());
		requirements.requireThat(actualMessages, "actualMessages").isEqualTo(expectedMessages);
	});
});