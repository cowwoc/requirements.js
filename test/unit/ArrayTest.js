define(function(require)
{
	var registerSuite = require('intern!object');
	var assert = require('intern/chai!assert');
	//var URI = require("intern/dojo/node!urijs");
	var Requirements = require("Requirements");
	var RequirementVerifier = require("RequirementVerifier");

	registerSuite(
		{
			name: 'ArrayTest',

			nameIsNull: function()
			{
				assert.throws(function()
				{
					const actual = [];
					new RequirementVerifier().requireThat(actual, null);
				}, RangeError);
			},

			nameIsEmpty: function()
			{
				assert.throws(function()
				{
					const actual = [];
					new RequirementVerifier().requireThat(actual, "");
				}, RangeError)
			},

			isEmpty: function()
			{
				const actual = [];
				new RequirementVerifier().requireThat(actual, "actual").isEmpty();
			},

			isEmpty_actualContainsOneElement: function()
			{
				assert.throws(function()
				{
					const actual = ["element"];
					new RequirementVerifier().requireThat(actual, "actual").isEmpty();
				}, RangeError);
			},

			isNotEmpty: function()
			{
				const actual = ["element"];
				new RequirementVerifier().requireThat(actual, "actual").isNotEmpty();
			},

			isNotEmpty_False: function()
			{
				assert.throws(function()
				{
					const actual = [];
					new RequirementVerifier().requireThat(actual, "actual").isNotEmpty();
				}, RangeError);
			},

			contains: function()
			{
				const actual = ["element"]
				new RequirementVerifier().requireThat(actual, "actual").contains("element");
			},

			contains_False: function()
			{
				assert.throws(function()
				{
					const actual = ["notElement"];
					new RequirementVerifier().requireThat(actual, "actual").contains("element");
				}, RangeError);
			},

			containsVariable: function()
			{
				const actual = ["element"];
				new RequirementVerifier().requireThat(actual, "actual").contains("element", "nameOfExpected");
			},

			containsVariable_False: function()
			{
				assert.throws(function()
				{
					const actual = ["notElement"];
					new RequirementVerifier().requireThat(actual, "actual").contains("element", "nameOfExpected");
				}, RangeError);
			},

			contains_expectedEmptyName: function()
			{
				assert.throws(function()
				{
					const actual = ["element"];
					new RequirementVerifier().requireThat(actual, "actual").contains(" ");
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
				new RequirementVerifier().requireThat(actual, "actual").containsExactly(["one", "two", "three"]);
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
					new RequirementVerifier().requireThat(actual, "actual").containsExactly(["one", "two"]);
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
					new RequirementVerifier().requireThat(actual, "actual").containsExactly(["one", "two", "three"]);
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
					new RequirementVerifier().requireThat(actual, "actual").containsExactly(["one", "two", "three"], "expected");
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
				new RequirementVerifier().requireThat(actual, "actual").containsExactly(
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
					new RequirementVerifier().requireThat(actual, "actual").containsExactly(["one", "two"], "nameOfExpected");
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
					new RequirementVerifier().requireThat(actual, "actual").containsExactly(["one", "two", "three"], " ");
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
				new RequirementVerifier().requireThat(actual, "actual").containsAny(["two", "four"]);
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
					new RequirementVerifier().requireThat(actual, "actual").containsAny(["four", "five"]);
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
				new RequirementVerifier().requireThat(actual, "actual").containsAny(["two", "four"], "nameOfExpected");
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
					new RequirementVerifier().requireThat(actual, "actual").containsAny(["four", "five"], "nameOfExpected");
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
					new RequirementVerifier().requireThat(actual, "actual").containsAny(["two", "four"], " ");
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
				new RequirementVerifier().requireThat(actual, "actual").containsAll(["two", "three"]);
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
					new RequirementVerifier().requireThat(actual, "actual").containsAll(["two", "four"]);
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
				new RequirementVerifier().requireThat(actual, "actual").containsAll(["two", "three"], "nameOfExpected");
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
					new RequirementVerifier().requireThat(actual, "actual").containsAll(["two", "four"], "nameOfExpected");
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
					new RequirementVerifier().requireThat(actual, "actual").containsAll(["two", "three"], " ");
				}, RangeError);
			},

			doesNotContain: function()
			{
				const actual =
					[
						"notElement"
					];
				new RequirementVerifier().requireThat(actual, "actual").doesNotContain("element");
			},

			doesNotContain_False: function()
			{
				assert.throws(function()
				{
					const actual =
						[
							"element"
						];
					new RequirementVerifier().requireThat(actual, "actual").doesNotContain("element");
				}, RangeError);
			},

			doesNotContainVariable: function()
			{
				const actual =
					[
						"notElement"
					];
				new RequirementVerifier().requireThat(actual, "actual").doesNotContain("element", "nameOfExpected");
			},

			doesNotContainVariable_False: function()
			{
				assert.throws(function()
				{
					const actual =
						[
							"element"
						];
					new RequirementVerifier().requireThat(actual, "actual").doesNotContain("element", "nameOfExpected");
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
					new RequirementVerifier().requireThat(actual, "actual").doesNotContain("element", " ");
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
				new RequirementVerifier().requireThat(actual, "actual").doesNotContainAny(["four", "five", "six"]);
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
					new RequirementVerifier().requireThat(actual, "actual").doesNotContainAny(["three", "four", "five"]);
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
				new RequirementVerifier().requireThat(actual, "actual").doesNotContainAny(["four", "five", "six"],
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
					new RequirementVerifier().requireThat(actual, "actual").doesNotContainAny(["three", "four", "five"],
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
					new RequirementVerifier().requireThat(actual, "actual").doesNotContainAny(["four", "five", "six"], " ");
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
				new RequirementVerifier().requireThat(actual, "actual").doesNotContainAll(["one", "two", "four"]);
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
					new RequirementVerifier().requireThat(actual, "actual").doesNotContainAll(["one", "two", "three"]);
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
				new RequirementVerifier().requireThat(actual, "actual").doesNotContainAll(["one", "two", "four"],
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
					new RequirementVerifier().requireThat(actual, "actual").doesNotContainAll(["one", "two", "three"],
						"nameOfExpected");
				}, RangeError);
			}
		});
});


// ,
//
// @Test(expectedExceptions = IllegalArgumentException.class)
// public
// void doesNotContainAll_expectedEmptyName()
// {
// 	try
// 	(SingletonScope
// 	scope = new TestSingletonScope()
// )
// 	{
// 		const actual =
// 			{
// 				"one",
// 				"two",
// 				"three"
// 			};
// 		new RequirementVerifier().requireThat(actual, "actual").doesNotContainAll(["one", "two", "four"], " ");
// 	}
// }
//
// @Test
// public
// void doesNotContainDuplicates()
// {
// 	try
// 	(SingletonScope
// 	scope = new TestSingletonScope()
// )
// 	{
// 		String[]
// 		actual =
// 			{
// 				"one",
// 				"two",
// 				"three"
// 			};
// 		new RequirementVerifier().requireThat(actual, "actual").doesNotContainDuplicates();
// 	}
// }
//
// @Test(expectedExceptions = IllegalArgumentException.class)
// public
// void doesNotContainDuplicates_False()
// {
// 	try
// 	(SingletonScope
// 	scope = new TestSingletonScope()
// )
// 	{
// 		String[]
// 		actual =
// 			{
// 				"one",
// 				"two",
// 				"three",
// 				"two",
// 				"four"
// 			};
// 		new RequirementVerifier().requireThat(actual, "actual").doesNotContainDuplicates();
// 	}
// }
//
// @Test
// public
// void lengthIsEqualTo()
// {
// 	try
// 	(SingletonScope
// 	scope = new TestSingletonScope()
// )
// 	{
// 		String[]
// 		actual =
// 			{
// 				"element"
// 			};
// 		new RequirementVerifier().requireThat(actual, "actual").length().isEqualTo(1);
// 	}
// }
//
// @Test(expectedExceptions = IllegalArgumentException.class)
// public
// void lengthIsEqualTo_False()
// {
// 	try
// 	(SingletonScope
// 	scope = new TestSingletonScope()
// )
// 	{
// 		String[]
// 		actual =
// 			{
// 				"element"
// 			};
// 		new RequirementVerifier().requireThat(actual, "actual").length().isEqualTo(2);
// 	}
// }
//
// @Test
// public
// void lengthIsEqualToVariable()
// {
// 	try
// 	(SingletonScope
// 	scope = new TestSingletonScope()
// )
// 	{
// 		String[]
// 		actual =
// 			{
// 				"element"
// 			};
// 		new RequirementVerifier().requireThat(actual, "actual").length().isEqualTo(1, "nameOfExpected");
// 	}
// }
//
// @Test(expectedExceptions = IllegalArgumentException.class)
// public
// void lengthIsEqualToVariable_False()
// {
// 	try
// 	(SingletonScope
// 	scope = new TestSingletonScope()
// )
// 	{
// 		String[]
// 		actual =
// 			{
// 				"element"
// 			};
// 		new RequirementVerifier().requireThat(actual, "actual").length().isEqualTo(2, "nameOfExpected");
// 	}
// }
//
// @Test(expectedExceptions = IllegalArgumentException.class)
// public
// void lengthIsEqualTo_expectedEmptyName()
// {
// 	try
// 	(SingletonScope
// 	scope = new TestSingletonScope()
// )
// 	{
// 		String[]
// 		actual =
// 			{
// 				"element"
// 			};
// 		new RequirementVerifier().requireThat(actual, "actual").length().isEqualTo(1, " ");
// 	}
// }
//
// @Test
// public
// void lengthIsNotEqualTo()
// {
// 	try
// 	(SingletonScope
// 	scope = new TestSingletonScope()
// )
// 	{
// 		String[]
// 		actual =
// 			{
// 				"element"
// 			};
// 		new RequirementVerifier().requireThat(actual, "actual").length().isNotEqualTo(2);
// 	}
// }
//
// @Test(expectedExceptions = IllegalArgumentException.class)
// public
// void lengthIsNotEqualTo_False()
// {
// 	try
// 	(SingletonScope
// 	scope = new TestSingletonScope()
// )
// 	{
// 		String[]
// 		actual =
// 			{
// 				"element"
// 			};
// 		new RequirementVerifier().requireThat(actual, "actual").length().isNotEqualTo(1);
// 	}
// }
//
// @Test
// public
// void lengthIsNotEqualToVariable()
// {
// 	try
// 	(SingletonScope
// 	scope = new TestSingletonScope()
// )
// 	{
// 		String[]
// 		actual =
// 			{
// 				"element"
// 			};
// 		new RequirementVerifier().requireThat(actual, "actual").length().isNotEqualTo(2, "nameOfExpected");
// 	}
// }
//
// @Test(expectedExceptions = IllegalArgumentException.class)
// public
// void lengthIsNotEqualToVariable_False()
// {
// 	try
// 	(SingletonScope
// 	scope = new TestSingletonScope()
// )
// 	{
// 		String[]
// 		actual =
// 			{
// 				"element"
// 			};
// 		new RequirementVerifier().requireThat(actual, "actual").length().isNotEqualTo(1, "nameOfExpected");
// 	}
// }
//
// @Test(expectedExceptions = IllegalArgumentException.class)
// public
// void lengthIsNotEqualTo_expectedEmptyName()
// {
// 	try
// 	(SingletonScope
// 	scope = new TestSingletonScope()
// )
// 	{
// 		String[]
// 		actual =
// 			{
// 				"element"
// 			};
// 		new RequirementVerifier().requireThat(actual, "actual").length().isNotEqualTo(2, " ");
// 	}
// }
//
// @Test
// public
// void isInRange_expectedIsLowerBound()
// {
// 	try
// 	(SingletonScope
// 	scope = new TestSingletonScope()
// )
// 	{
// 		Integer[]
// 		actual =
// 			{
// 				1,
// 				2,
// 				3
// 			};
// 		new RequirementVerifier().requireThat(actual, "actual").length().isIn(3, 5);
// 	}
// }
//
// @Test
// public
// void isInRange_expectedIsInBounds()
// {
// 	try
// 	(SingletonScope
// 	scope = new TestSingletonScope()
// )
// 	{
// 		Integer[]
// 		actual =
// 			{
// 				1,
// 				2,
// 				3,
// 				4
// 			};
// 		new RequirementVerifier().requireThat(actual, "actual").length().isIn(3, 5);
// 	}
// }
//
// @Test
// public
// void isInRange_expectedIsUpperBound()
// {
// 	try
// 	(SingletonScope
// 	scope = new TestSingletonScope()
// )
// 	{
// 		Integer[]
// 		actual =
// 			{
// 				1,
// 				2,
// 				3,
// 				4,
// 				5
// 			};
// 		new RequirementVerifier().requireThat(actual, "actual").length().isIn(3, 5);
// 	}
// }
//
// @Test(expectedExceptions = IllegalArgumentException.class)
// public
// void isInRange_expectedIsBelow()
// {
// 	try
// 	(SingletonScope
// 	scope = new TestSingletonScope()
// )
// 	{
// 		Integer[]
// 		actual =
// 			{
// 				1,
// 				2
// 			};
// 		new RequirementVerifier().requireThat(actual, "actual").length().isIn(3, 5);
// 	}
// }
//
// @Test
// public
// void assertionsDisabled()
// {
// 	try
// 	(SingletonScope
// 	scope = new TestSingletonScope()
// )
// 	{
// 		// Ensure that no exception is thrown if assertions are disabled
// 		Collection < ?
// 	>
// 		actual = null;
// 		new AssertionVerifier(scope, false).requireThat(actual, "actual").isNotNull();
// 	}
// }
// })
// ;