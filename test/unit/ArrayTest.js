import assert from "intern/chai!assert";
import registerSuite from "intern!object";
import requireThat from "./Requirements";

/* eslint-disable camelcase */
define(function()
{
	registerSuite(
		{
			name: "ArrayTest",

			isEmpty()
			{
				const actual = [];
				requireThat(actual, "actual").isEmpty();
			},

			isEmpty_actualContainsOneElement()
			{
				assert.throws(function()
				{
					const actual = ["element"];
					requireThat(actual, "actual").isEmpty();
				}, RangeError);
			},

			isNotEmpty()
			{
				const actual = ["element"];
				requireThat(actual, "actual").isNotEmpty();
			},

			isNotEmpty_False()
			{
				assert.throws(function()
				{
					const actual = [];
					requireThat(actual, "actual").isNotEmpty();
				}, RangeError);
			},

			contains()
			{
				const actual = ["element"]
				requireThat(actual, "actual").contains("element");
			},

			contains_False()
			{
				assert.throws(function()
				{
					const actual = ["notElement"];
					requireThat(actual, "actual").contains("element");
				}, RangeError);
			},

			containsVariable()
			{
				const actual = ["element"];
				requireThat(actual, "actual").contains("element", "nameOfExpected");
			},

			containsVariable_False()
			{
				assert.throws(function()
				{
					const actual = ["notElement"];
					requireThat(actual, "actual").contains("element", "nameOfExpected");
				}, RangeError);
			},

			contains_expectedEmptyName()
			{
				assert.throws(function()
				{
					const actual = ["element"];
					requireThat(actual, "actual").contains(" ");
				}, RangeError);
			},

			containsExactly()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").containsExactly(["one", "two", "three"]);
			},

			containsExactly_actualContainsUnwantedElements()
			{
				assert.throws(function()
				{
					const actual =
						[
							"one",
							"two",
							"three"
						];
					requireThat(actual, "actual").containsExactly(["one", "two"]);
				}, RangeError);
			},

			containsExactly_actualIsMissingElements()
			{
				assert.throws(function()
				{
					const actual =
						[
							"one",
							"two"
						];
					requireThat(actual, "actual").containsExactly(["one", "two", "three"]);
				}, RangeError);
			},

			containsExactlyVariable_actualIsMissingElements()
			{
				assert.throws(function()
				{
					const actual =
						[
							"one",
							"two"
						];
					requireThat(actual, "actual").containsExactly(["one", "two", "three"], "expected");
				}, RangeError);
			},

			containsExactlyVariable()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").containsExactly(
					["one", "two", "three"], "nameOfExpected");
			},

			containsExactlyVariable_False()
			{
				assert.throws(function()
				{
					const actual =
						[
							"one",
							"two",
							"three"
						];
					requireThat(actual, "actual").containsExactly(["one", "two"], "nameOfExpected");
				}, RangeError);
			},

			containsExactly_expectedEmptyName()
			{
				assert.throws(function()
				{
					const actual =
						[
							"one",
							"two",
							"three"
						];
					requireThat(actual, "actual").containsExactly(["one", "two", "three"], " ");
				}, RangeError);
			},

			containsAny()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").containsAny(["two", "four"]);
			},

			containsAny_False()
			{
				assert.throws(function()
				{
					const actual =
						[
							"one",
							"two",
							"three"
						];
					requireThat(actual, "actual").containsAny(["four", "five"]);
				}, RangeError);
			},

			containsAnyVariable()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").containsAny(["two", "four"], "nameOfExpected");
			},

			containsAnyVariable_False()
			{
				assert.throws(function()
				{
					const actual =
						[
							"one",
							"two",
							"three"
						];
					requireThat(actual, "actual").containsAny(["four", "five"], "nameOfExpected");
				}, RangeError);
			},

			containsAny_expectedEmptyName()
			{
				assert.throws(function()
				{
					const actual =
						[
							"one",
							"two",
							"three"
						];
					requireThat(actual, "actual").containsAny(["two", "four"], " ");
				}, RangeError);
			},

			containsAll()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").containsAll(["two", "three"]);
			},

			containsAll_False()
			{
				assert.throws(function()
				{
					const actual =
						[
							"one",
							"two",
							"three"
						];
					requireThat(actual, "actual").containsAll(["two", "four"]);
				}, RangeError);
			},

			containsAllVariable()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").containsAll(["two", "three"], "nameOfExpected");
			},

			containsAllVariable_False()
			{
				assert.throws(function()
				{
					const actual =
						[
							"one",
							"two",
							"three"
						];
					requireThat(actual, "actual").containsAll(["two", "four"], "nameOfExpected");
				}, RangeError);
			},

			containsAll_expectedEmptyName()
			{
				assert.throws(function()
				{
					const actual =
						[
							"one",
							"two",
							"three"
						];
					requireThat(actual, "actual").containsAll(["two", "three"], " ");
				}, RangeError);
			},

			doesNotContain()
			{
				const actual =
					[
						"notElement"
					];
				requireThat(actual, "actual").doesNotContain("element");
			},

			doesNotContain_False()
			{
				assert.throws(function()
				{
					const actual =
						[
							"element"
						];
					requireThat(actual, "actual").doesNotContain("element");
				}, RangeError);
			},

			doesNotContainVariable()
			{
				const actual =
					[
						"notElement"
					];
				requireThat(actual, "actual").doesNotContain("element", "nameOfExpected");
			},

			doesNotContainVariable_False()
			{
				assert.throws(function()
				{
					const actual =
						[
							"element"
						];
					requireThat(actual, "actual").doesNotContain("element", "nameOfExpected");
				}, RangeError);
			},

			doesNotContain_expectedEmptyName()
			{
				assert.throws(function()
				{
					const actual =
						[
							"notElement"
						];
					requireThat(actual, "actual").doesNotContain("element", " ");
				}, RangeError);
			},

			doesNotContainAny()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").doesNotContainAny(["four", "five", "six"]);
			},

			doesNotContainAny_False()
			{
				assert.throws(function()
				{
					const actual =
						[
							"one",
							"two",
							"three"
						];
					requireThat(actual, "actual").doesNotContainAny(["three", "four", "five"]);
				}, RangeError);
			},

			doesNotContainAnyVariable()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").doesNotContainAny(["four", "five", "six"],
					"nameOfExpected");
			},

			doesNotContainAnyVariable_False()
			{
				assert.throws(function()
				{
					const actual =
						[
							"one",
							"two",
							"three"
						];
					requireThat(actual, "actual").doesNotContainAny(["three", "four", "five"],
						"nameOfExpected");
				}, RangeError);
			},

			doesNotContainAny_expectedEmptyName()
			{
				assert.throws(function()
				{
					const actual =
						[
							"one",
							"two",
							"three"
						];
					requireThat(actual, "actual").doesNotContainAny(["four", "five", "six"], " ");
				}, RangeError);
			},

			doesNotContainAll()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").doesNotContainAll(["one", "two", "four"]);
			},

			doesNotContainAll_False()
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
					requireThat(actual, "actual").doesNotContainAll(["one", "two", "three"]);
				}, RangeError);
			},

			doesNotContainAllVariable()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").doesNotContainAll(["one", "two", "four"],
					"nameOfExpected");
			},

			doesNotContainAllVariable_False()
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
					requireThat(actual, "actual").doesNotContainAll(["one", "two", "three"],
						"nameOfExpected");
				}, RangeError);
			},

			doesNotContainAll_expectedEmptyName()
			{
				assert.throws(function()
				{
					const actual =
						[
							"one",
							"two",
							"three"
						];
					requireThat(actual, "actual").doesNotContainAll(["one", "two", "four"], " ");
				}, RangeError);
			},

			doesNotContainDuplicates()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").doesNotContainDuplicates();
			},

			doesNotContainDuplicates_False()
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
					requireThat(actual, "actual").doesNotContainDuplicates();
				}, RangeError);
			},

			lengthIsEqualTo()
			{
				const actual =
					[
						"element"
					];
				requireThat(actual, "actual").length().isEqualTo(1);
			},

			lengthIsEqualTo_False()
			{
				assert.throws(function()
				{
					const actual =
						[
							"element"
						];
					requireThat(actual, "actual").length().isEqualTo(2);
				}, RangeError);
			},

			lengthIsEqualToVariable()
			{
				const actual =
					[
						"element"
					];
				requireThat(actual, "actual").length().isEqualTo(1, "nameOfExpected");
			},

			lengthIsEqualToVariable_False()
			{
				assert.throws(function()
				{
					const actual =
						[
							"element"
						];
					requireThat(actual, "actual").length().isEqualTo(2, "nameOfExpected");
				}, RangeError);
			},

			lengthIsEqualTo_expectedEmptyName()
			{
				assert.throws(function()
				{
					const actual =
						[
							"element"
						];
					requireThat(actual, "actual").length().isEqualTo(1, " ");
				}, RangeError);
			},

			lengthIsNotEqualTo()
			{
				const actual =
					[
						"element"
					];
				requireThat(actual, "actual").length().isNotEqualTo(2);
			},
			lengthIsNotEqualTo_False()
			{
				assert.throws(function()
				{
					const actual =
						[
							"element"
						];
					requireThat(actual, "actual").length().isNotEqualTo(1);
				}, RangeError);
			},

			lengthIsNotEqualToVariable()
			{
				const actual =
					[
						"element"
					];
				requireThat(actual, "actual").length().isNotEqualTo(2, "nameOfExpected");
			},

			lengthIsNotEqualToVariable_False()
			{
				assert.throws(function()
				{
					const actual =
						[
							"element"
						];
					requireThat(actual, "actual").length().isNotEqualTo(1, "nameOfExpected");
				}, RangeError);
			},

			lengthIsNotEqualTo_expectedEmptyName()
			{
				assert.throws(function()
				{
					const actual =
						[
							"element"
						];
					requireThat(actual, "actual").length().isNotEqualTo(2, " ");
				}, RangeError);
			},

			isBetween_expectedIsLowerBound()
			{
				const actual =
					[
						1,
						2,
						3
					];
				requireThat(actual, "actual").length().isBetween(3, 5);
			},

			isBetween_expectedIsInBounds()
			{
				const actual =
					[
						1,
						2,
						3,
						4
					];
				requireThat(actual, "actual").length().isBetween(3, 5);
			},

			isBetween_expectedIsUpperBound()
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
			},

			isBetween_expectedIsBelow()
			{
				assert.throws(function()
				{
					const actual =
						[
							1,
							2
						];
					requireThat(actual, "actual").length().isBetween(3, 5);
				}, RangeError);
			},

			asSet()
			{
				const set = new Set([1, 2, 3]);
				const actual = Array.from(set);
				requireThat(actual, "actual").asSet().isEqualTo(set);
			},

			asString()
			{
				const actual = [1, 2, 3];
				requireThat(actual, "actual").asString().isEqualTo("[1, 2, 3]");
			},

			getActual()
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
				assert.equal(output, input);
			}
		});
});