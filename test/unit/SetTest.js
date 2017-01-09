import registerSuite from "intern!object";
import assert from "intern/chai!assert";
import requireThat from "./Requirements";

define(function()
{
	registerSuite(
		{
			name: "SetTest",

			nameIsNull: function()
			{
				assert.throws(function()
				{
					const actual = new Set();
					requireThat(actual, null);
				}, TypeError);
			},

			nameIsEmpty: function()
			{
				assert.throws(function()
				{
					const actual = new Set();
					requireThat(actual, "");
				}, RangeError);
			},

			isEmpty: function()
			{
				const actual = new Set();
				requireThat(actual, "actual").isEmpty();
			},

			isEmpty_False: function()
			{
				assert.throws(function()
				{
					const actual = new Set([1, 2, 3]);
					requireThat(actual, "actual").isEmpty();
				}, RangeError);
			},

			isNotEmpty: function()
			{
				const actual = new Set([1, 2, 3]);
				requireThat(actual, "actual").isNotEmpty();
			},

			isNotEmpty_False: function()
			{
				assert.throws(function()
				{
					const actual = new Set();
					requireThat(actual, "actual").isNotEmpty();
				}, RangeError);
			},


			isEqualTo: function()
			{
				const actual = new Set([1, 2, 3]);
				requireThat(actual, "actual").isEqualTo(actual);
			},

			isEqual_False: function()
			{
				assert.throws(function()
				{
					const actual = new Set([1, 2, 3]);
					requireThat(actual, "actual").isEqualTo(new Set());
				}, RangeError);
			},

			isNotEqualTo: function()
			{
				requireThat(new Set([1, 2, 3]), "actual").isNotEqualTo(new Set());
			},

			isNotEqualTo_False: function()
			{
				assert.throws(function()
				{
					const actual = new Set();
					requireThat(actual, "actual").isNotEqualTo(actual);
				}, RangeError);
			},

			isInArray: function()
			{
				const actual = new Set();
				requireThat(actual, "actual").isInArray(["first", actual, "third"])
			},

			isInArray_False: function()
			{
				assert.throws(function()
				{
					const actual = new Set([1, 2, 3]);
					requireThat(actual, "actual").isInArray(["first", "second", "third"])
				}, RangeError);
			},

			isInstanceOf: function()
			{
				const actual = new Set([1, 2, 3]);
				requireThat(actual, "actual").isInstanceOf(Set).isInstanceOf(Object);
			},

			isInstanceOf_False: function()
			{
				assert.throws(function()
				{
					const actual = new Set();
					requireThat(actual, "actual").isInstanceOf(String)
				}, RangeError);
			},

			isNull_False: function()
			{
				assert.throws(function()
				{
					const actual = new Set();
					requireThat(actual, "actual").isNull();
				}, RangeError);
			},

			isNotNull: function()
			{
				const actual = new Set();
				requireThat(actual, "actual").isNotNull();
			},

			contains: function()
			{
				const actual = new Set([1, 2, 3]);
				requireThat(actual, "actual").contains(2);
			},

			contains_False: function()
			{
				assert.throws(function()
				{
					const actual = new Set([1, 2, 3]);
					requireThat(actual, "actual").contains(5);
				}, RangeError);
			},

			doesNotContain: function()
			{
				const actual = new Set([1, 2, 3]);
				requireThat(actual, "actual").doesNotContain(5);
			},

			doesNotContain_False: function()
			{
				assert.throws(function()
				{
					const actual = new Set([1, 2, 3]);
					requireThat(actual, "actual").doesNotContain(2);
				}, RangeError);
			},

			sizeIsEqualTo: function()
			{
				const actual = new Set([1, 2, 3]);
				requireThat(actual, "actual").size().isEqualTo(3);
			},

			sizeIsEqualTo_False: function()
			{
				assert.throws(function()
				{
					const actual = new Set([1, 2, 3]);
					requireThat(actual, "actual").size().isEqualTo(2);
				}, RangeError);
			},

			sizeIsNotEqualTo: function()
			{
				const actual = new Set([1, 2, 3]);
				requireThat(actual, "actual").size().isNotEqualTo(2);
			},

			sizeIsNotEqualTo_False: function()
			{
				assert.throws(function()
				{
					const actual = new Set([1, 2, 3]);
					requireThat(actual, "actual").size().isNotEqualTo(3);
				}, RangeError);
			},

			asArray: function()
			{
				const array = [1, 2, 3];
				const actual = new Set(array);
				requireThat(actual, "actual").asArray().isEqualTo(array);
			},

			asString: function()
			{
				const actual = new Set([1, 2, 3]);
				requireThat(actual, "actual").asString().isEqualTo("[1, 2, 3]");
			},

			getActual: function()
			{
				const input = new Set([1, 2, 3]);
				const output = requireThat(input, "input").getActual();
				assert.equal(output, input);
			}
		});
});
