import registerSuite from "intern!object";
import assert from "intern/chai!assert";
import requireThat from "./Requirements";

define(function()
{
	registerSuite(
		{
			name: "ArrayTest",

			isEmpty: function()
			{
				const actual = [];
				requireThat(actual, "actual").isEmpty();
			},

			isEmpty_actualContainsOneElement: function()
			{
				assert.throws(function()
				{
					const actual = ["element"];
					requireThat(actual, "actual").isEmpty();
				}, RangeError);
			},

			isNotEmpty: function()
			{
				const actual = ["element"];
				requireThat(actual, "actual").isNotEmpty();
			},

			isNotEmpty_False: function()
			{
				assert.throws(function()
				{
					const actual = [];
					requireThat(actual, "actual").isNotEmpty();
				}, RangeError);
			},

			contains: function()
			{
				const actual = ["element"]
				requireThat(actual, "actual").contains("element");
			},

			contains_False: function()
			{
				assert.throws(function()
				{
					const actual = ["notElement"];
					requireThat(actual, "actual").contains("element");
				}, RangeError);
			},

			containsVariable: function()
			{
				const actual = ["element"];
				requireThat(actual, "actual").contains("element", "nameOfExpected");
			},

			containsVariable_False: function()
			{
				assert.throws(function()
				{
					const actual = ["notElement"];
					requireThat(actual, "actual").contains("element", "nameOfExpected");
				}, RangeError);
			},

			contains_expectedEmptyName: function()
			{
				assert.throws(function()
				{
					const actual = ["element"];
					requireThat(actual, "actual").contains(" ");
				}, RangeError);
			},

			containsExactly: function()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").containsExactly(["one", "two", "three"]);
			},

			containsExactly_actualContainsUnwantedElements: function()
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

			containsExactly_actualIsMissingElements: function()
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

			containsExactlyVariable_actualIsMissingElements: function()
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

			containsExactlyVariable: function()
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

			containsExactlyVariable_False: function()
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

			containsExactly_expectedEmptyName: function()
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

			containsAny: function()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").containsAny(["two", "four"]);
			},

			containsAny_False: function()
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

			containsAnyVariable: function()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").containsAny(["two", "four"], "nameOfExpected");
			},

			containsAnyVariable_False: function()
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

			containsAny_expectedEmptyName: function()
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

			containsAll: function()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").containsAll(["two", "three"]);
			},

			containsAll_False: function()
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

			containsAllVariable: function()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").containsAll(["two", "three"], "nameOfExpected");
			},

			containsAllVariable_False: function()
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

			containsAll_expectedEmptyName: function()
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

			doesNotContain: function()
			{
				const actual =
					[
						"notElement"
					];
				requireThat(actual, "actual").doesNotContain("element");
			},

			doesNotContain_False: function()
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

			doesNotContainVariable: function()
			{
				const actual =
					[
						"notElement"
					];
				requireThat(actual, "actual").doesNotContain("element", "nameOfExpected");
			},

			doesNotContainVariable_False: function()
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

			doesNotContain_expectedEmptyName: function()
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

			doesNotContainAny: function()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").doesNotContainAny(["four", "five", "six"]);
			},

			doesNotContainAny_False: function()
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

			doesNotContainAnyVariable: function()
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

			doesNotContainAnyVariable_False: function()
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

			doesNotContainAny_expectedEmptyName: function()
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

			doesNotContainAll: function()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").doesNotContainAll(["one", "two", "four"]);
			},

			doesNotContainAll_False: function()
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

			doesNotContainAllVariable: function()
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

			doesNotContainAllVariable_False: function()
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

			doesNotContainAll_expectedEmptyName: function()
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

			doesNotContainDuplicates: function()
			{
				const actual =
					[
						"one",
						"two",
						"three"
					];
				requireThat(actual, "actual").doesNotContainDuplicates();
			},

			doesNotContainDuplicates_False: function()
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

			lengthIsEqualTo: function()
			{
				const actual =
					[
						"element"
					];
				requireThat(actual, "actual").length().isEqualTo(1);
			},

			lengthIsEqualTo_False: function()
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

			lengthIsEqualToVariable: function()
			{
				const actual =
					[
						"element"
					];
				requireThat(actual, "actual").length().isEqualTo(1, "nameOfExpected");
			},

			lengthIsEqualToVariable_False: function()
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

			lengthIsEqualTo_expectedEmptyName: function()
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

			lengthIsNotEqualTo: function()
			{
				const actual =
					[
						"element"
					];
				requireThat(actual, "actual").length().isNotEqualTo(2);
			},
			lengthIsNotEqualTo_False: function()
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

			lengthIsNotEqualToVariable: function()
			{
				const actual =
					[
						"element"
					];
				requireThat(actual, "actual").length().isNotEqualTo(2, "nameOfExpected");
			},

			lengthIsNotEqualToVariable_False: function()
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

			lengthIsNotEqualTo_expectedEmptyName: function()
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

			isInRange_expectedIsLowerBound: function()
			{
				const actual =
					[
						1,
						2,
						3
					];
				requireThat(actual, "actual").length().isInRange(3, 5);
			},

			isInRange_expectedIsInBounds: function()
			{
				const actual =
					[
						1,
						2,
						3,
						4
					];
				requireThat(actual, "actual").length().isInRange(3, 5);
			},

			isInRange_expectedIsUpperBound: function()
			{
				const actual =
					[
						1,
						2,
						3,
						4,
						5
					];
				requireThat(actual, "actual").length().isInRange(3, 5);
			},

			isInRange_expectedIsBelow: function()
			{
				assert.throws(function()
				{
					const actual =
						[
							1,
							2
						];
					requireThat(actual, "actual").length().isInRange(3, 5);
				}, RangeError);
			}
		});
});