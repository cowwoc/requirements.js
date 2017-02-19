import {requireThat} from "../node/Requirements";
import test from "tape-catch";

test("ArrayTest.isEmpty", function(t)
{
	const actual = [];
	requireThat(actual, "actual").isEmpty();
	t.end();
});

test("ArrayTest.isEmpty_actualContainsOneElement", function(t)
{
	t.throws(function()
	{
		const actual = ["element"];
		requireThat(actual, "actual").isEmpty();
	}, RangeError);
	t.end();
});

test("ArrayTest.isNotEmpty", function(t)
{
	const actual = ["element"];
	requireThat(actual, "actual").isNotEmpty();
	t.end();
});

test("ArrayTest.isNotEmpty_False", function(t)
{
	t.throws(function()
	{
		const actual = [];
		requireThat(actual, "actual").isNotEmpty();
	}, RangeError);
	t.end();
});

test("ArrayTest.contains", function(t)
{
	const actual = ["element"];
	requireThat(actual, "actual").contains("element");
	t.end();
});

test("ArrayTest.contains_False", function(t)
{
	t.throws(function()
	{
		const actual = ["notElement"];
		requireThat(actual, "actual").contains("element");
	}, RangeError);
	t.end();
});

test("ArrayTest.containsVariable", function(t)
{
	const actual = ["element"];
	requireThat(actual, "actual").contains("element", "nameOfExpected");
	t.end();
});

test("ArrayTest.containsVariable_False", function(t)
{
	t.throws(function()
	{
		const actual = ["notElement"];
		requireThat(actual, "actual").contains("element", "nameOfExpected");
	}, RangeError);
	t.end();
});

test("ArrayTest.contains_expectedEmptyName", function(t)
{
	t.throws(function()
	{
		const actual = ["element"];
		requireThat(actual, "actual").contains(" ");
	}, RangeError);
	t.end();
});

test("ArrayTest.containsExactly", function(t)
{
	const actual =
		[
			"one",
			"two",
			"three"
		];
	requireThat(actual, "actual").containsExactly(["one", "two", "three"]);
	t.end();
});

test("ArrayTest.containsExactly_actualContainsUnwantedElements", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requireThat(actual, "actual").containsExactly(["one", "two"]);
	}, RangeError);
	t.end();
});

test("ArrayTest.containsExactly_actualIsMissingElements", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"one",
				"two"
			];
		requireThat(actual, "actual").containsExactly(["one", "two", "three"]);
	}, RangeError);
	t.end();
});

test("ArrayTest.containsExactlyVariable_actualIsMissingElements", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"one",
				"two"
			];
		requireThat(actual, "actual").containsExactly(["one", "two", "three"], "expected");
	}, RangeError);
	t.end();
});

test("ArrayTest.containsExactlyVariable", function(t)
{
	const actual =
		[
			"one",
			"two",
			"three"
		];
	requireThat(actual, "actual").containsExactly(
		["one", "two", "three"], "nameOfExpected");
	t.end();
});

test("ArrayTest.containsExactlyVariable_False", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requireThat(actual, "actual").containsExactly(["one", "two"], "nameOfExpected");
	}, RangeError);
	t.end();
});

test("ArrayTest.containsExactly_expectedEmptyName", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requireThat(actual, "actual").containsExactly(["one", "two", "three"], " ");
	}, RangeError);
	t.end();
});

test("ArrayTest.containsAny", function(t)
{
	const actual =
		[
			"one",
			"two",
			"three"
		];
	requireThat(actual, "actual").containsAny(["two", "four"]);
	t.end();
});

test("ArrayTest.containsAny_False", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requireThat(actual, "actual").containsAny(["four", "five"]);
	}, RangeError);
	t.end();
});

test("ArrayTest.containsAnyVariable", function(t)
{
	const actual =
		[
			"one",
			"two",
			"three"
		];
	requireThat(actual, "actual").containsAny(["two", "four"], "nameOfExpected");
	t.end();
});

test("ArrayTest.containsAnyVariable_False", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requireThat(actual, "actual").containsAny(["four", "five"], "nameOfExpected");
	}, RangeError);
	t.end();
});

test("ArrayTest.containsAny_expectedEmptyName", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requireThat(actual, "actual").containsAny(["two", "four"], " ");
	}, RangeError);
	t.end();
});

test("ArrayTest.containsAll", function(t)
{
	const actual =
		[
			"one",
			"two",
			"three"
		];
	requireThat(actual, "actual").containsAll(["two", "three"]);
	t.end();
});

test("ArrayTest.containsAll_False", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requireThat(actual, "actual").containsAll(["two", "four"]);
	}, RangeError);
	t.end();
});

test("ArrayTest.containsAllVariable", function(t)
{
	const actual =
		[
			"one",
			"two",
			"three"
		];
	requireThat(actual, "actual").containsAll(["two", "three"], "nameOfExpected");
	t.end();
});

test("ArrayTest.containsAllVariable_False", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requireThat(actual, "actual").containsAll(["two", "four"], "nameOfExpected");
	}, RangeError);
	t.end();
});

test("ArrayTest.containsAll_expectedEmptyName", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requireThat(actual, "actual").containsAll(["two", "three"], " ");
	}, RangeError);
	t.end();
});

test("ArrayTest.doesNotContain", function(t)
{
	const actual =
		[
			"notElement"
		];
	requireThat(actual, "actual").doesNotContain("element");
	t.end();
});

test("ArrayTest.doesNotContain_False", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"element"
			];
		requireThat(actual, "actual").doesNotContain("element");
	}, RangeError);
	t.end();
});

test("ArrayTest.doesNotContainVariable", function(t)
{
	const actual =
		[
			"notElement"
		];
	requireThat(actual, "actual").doesNotContain("element", "nameOfExpected");
	t.end();
});

test("ArrayTest.doesNotContainVariable_False", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"element"
			];
		requireThat(actual, "actual").doesNotContain("element", "nameOfExpected");
	}, RangeError);
	t.end();
});

test("ArrayTest.doesNotContain_expectedEmptyName", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"notElement"
			];
		requireThat(actual, "actual").doesNotContain("element", " ");
	}, RangeError);
	t.end();
});

test("ArrayTest.doesNotContainAny", function(t)
{
	const actual =
		[
			"one",
			"two",
			"three"
		];
	requireThat(actual, "actual").doesNotContainAny(["four", "five", "six"]);
	t.end();
});

test("ArrayTest.doesNotContainAny_False", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requireThat(actual, "actual").doesNotContainAny(["three", "four", "five"]);
	}, RangeError);
	t.end();
});

test("ArrayTest.doesNotContainAnyVariable", function(t)
{
	const actual =
		[
			"one",
			"two",
			"three"
		];
	requireThat(actual, "actual").doesNotContainAny(["four", "five", "six"], "nameOfExpected");
	t.end();
});

test("ArrayTest.doesNotContainAnyVariable_False", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requireThat(actual, "actual").doesNotContainAny(["three", "four", "five"], "nameOfExpected");
	}, RangeError);
	t.end();
});

test("ArrayTest.doesNotContainAny_expectedEmptyName", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requireThat(actual, "actual").doesNotContainAny(["four", "five", "six"], " ");
	}, RangeError);
	t.end();
});

test("ArrayTest.doesNotContainAll", function(t)
{
	const actual =
		[
			"one",
			"two",
			"three"
		];
	requireThat(actual, "actual").doesNotContainAll(["one", "two", "four"]);
	t.end();
});

test("ArrayTest.doesNotContainAll_False", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"one",
				"two",
				"three",
				"four"
			];
		requireThat(actual, "actual").doesNotContainAll(["one", "two", "three"]);
	}, RangeError);
	t.end();
});

test("ArrayTest.doesNotContainAllVariable", function(t)
{
	const actual =
		[
			"one",
			"two",
			"three"
		];
	requireThat(actual, "actual").doesNotContainAll(["one", "two", "four"], "nameOfExpected");
	t.end();
});

test("ArrayTest.doesNotContainAllVariable_False", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"one",
				"two",
				"three",
				"four"
			];
		requireThat(actual, "actual").doesNotContainAll(["one", "two", "three"],
			"nameOfExpected");
	}, RangeError);
	t.end();
});

test("ArrayTest.doesNotContainAll_expectedEmptyName", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"one",
				"two",
				"three"
			];
		requireThat(actual, "actual").doesNotContainAll(["one", "two", "four"], " ");
	}, RangeError);
	t.end();
});

test("ArrayTest.doesNotContainDuplicates", function(t)
{
	const actual =
		[
			"one",
			"two",
			"three"
		];
	requireThat(actual, "actual").doesNotContainDuplicates();
	t.end();
});

test("ArrayTest.doesNotContainDuplicates_False", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"one",
				"two",
				"three",
				"two",
				"four"
			];
		requireThat(actual, "actual").doesNotContainDuplicates();
	}, RangeError);
	t.end();
});

test("ArrayTest.lengthIsEqualTo", function(t)
{
	const actual =
		[
			"element"
		];
	requireThat(actual, "actual").length().isEqualTo(1);
	t.end();
});

test("ArrayTest.lengthConsumerIsEqualTo", function(t)
{
	const actual =
		[
			"element"
		];
	requireThat(actual, "actual").lengthConsumer(l => l.isEqualTo(1));
	t.end();
});

test("ArrayTest.lengthConsumerIsEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"element"
			];
		requireThat(actual, "actual").lengthConsumer(l => l.isEqualTo(2));
	}, RangeError);
	t.end();
});

test("ArrayTest.lengthIsEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"element"
			];
		requireThat(actual, "actual").length().isEqualTo(2);
	}, RangeError);
	t.end();
});

test("ArrayTest.lengthIsEqualToVariable", function(t)
{
	const actual =
		[
			"element"
		];
	requireThat(actual, "actual").length().isEqualTo(1, "nameOfExpected");
	t.end();
});

test("ArrayTest.lengthIsEqualToVariable_False", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"element"
			];
		requireThat(actual, "actual").length().isEqualTo(2, "nameOfExpected");
	}, RangeError);
	t.end();
});

test("ArrayTest.lengthIsEqualTo_expectedEmptyName", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"element"
			];
		requireThat(actual, "actual").length().isEqualTo(1, " ");
	}, RangeError);
	t.end();
});

test("ArrayTest.lengthIsNotEqualTo", function(t)
{
	const actual =
		[
			"element"
		];
	requireThat(actual, "actual").length().isNotEqualTo(2);
	t.end();
});

test("ArrayTest.lengthIsNotEqualTo_False", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"element"
			];
		requireThat(actual, "actual").length().isNotEqualTo(1);
	}, RangeError);
	t.end();
});

test("ArrayTest.lengthIsNotEqualToVariable", function(t)
{
	const actual =
		[
			"element"
		];
	requireThat(actual, "actual").length().isNotEqualTo(2, "nameOfExpected");
	t.end();
});

test("ArrayTest.lengthIsNotEqualToVariable_False", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"element"
			];
		requireThat(actual, "actual").length().isNotEqualTo(1, "nameOfExpected");
	}, RangeError);
	t.end();
});

test("ArrayTest.lengthIsNotEqualTo_expectedEmptyName", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				"element"
			];
		requireThat(actual, "actual").length().isNotEqualTo(2, " ");
	}, RangeError);
	t.end();
});

test("ArrayTest.isBetween_expectedIsLowerBound", function(t)
{
	const actual =
		[
			1,
			2,
			3
		];
	requireThat(actual, "actual").length().isBetween(3, 5);
	t.end();
});

test("ArrayTest.isBetween_expectedIsInBounds", function(t)
{
	const actual =
		[
			1,
			2,
			3,
			4
		];
	requireThat(actual, "actual").length().isBetween(3, 5);
	t.end();
});

test("ArrayTest.isBetween_expectedIsUpperBound", function(t)
{
	const actual =
		[
			1,
			2,
			3,
			4,
			5
		];
	requireThat(actual, "actual").length().isBetween(3, 5);
	t.end();
});

test("ArrayTest.isBetween_expectedIsBelow", function(t)
{
	t.throws(function()
	{
		const actual =
			[
				1,
				2
			];
		requireThat(actual, "actual").length().isBetween(3, 5);
	}, RangeError);
	t.end();
});

test("ArrayTest.asSet", function(t)
{
	const set = new Set([1, 2, 3]);
	const actual = Array.from(set);
	requireThat(actual, "actual").asSet().isEqualTo(set);
	t.end();
});

test("ArrayTest.asSetConsumer", function(t)
{
	const set = new Set([1, 2, 3]);
	const actual = Array.from(set);
	requireThat(actual, "actual").asSetConsumer(s => s.isEqualTo(set));
	t.end();
});

test("ArrayTest.asSetConsumer_False", function(t)
{
	t.throws(function()
	{
		const set = new Set([1, 2, 3]);
		const actual = Array.from(set);
		requireThat(actual, "actual").asSetConsumer(s => s.isNotEqualTo(set));
	}, RangeError);
	t.end();
});

test("ArrayTest.asString", function(t)
{
	const actual = [1, 2, 3];
	requireThat(actual, "actual").asString().isEqualTo("[1, 2, 3]");
	t.end();
});

test("ArrayTest.getActual", function(t)
{
	const input =
		[
			1,
			2,
			3,
			4,
			5
		];
	const output = requireThat(input, "input").getActual();
	t.equals(output, input);
	t.end();
});