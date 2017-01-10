import assert from "intern/chai!assert";
import registerSuite from "intern!object";
import requireThat from "./Requirements";

/* eslint-disable camelcase */
define(function()
{
	registerSuite(
		{
			name: "MapTest",

			nameIsNull: function()
			{
				assert.throws(function()
				{
					const actual = new Map();
					requireThat(actual, null);
				}, TypeError);
			},

			nameIsEmpty: function()
			{
				assert.throws(function()
				{
					const actual = new Map();
					requireThat(actual, "");
				}, RangeError);
			},

			isEmpty: function()
			{
				const actual = new Map();
				requireThat(actual, "actual").isEmpty();
			},

			isEmpty_False: function()
			{
				assert.throws(function()
				{
					const actual = new Map([[1, 10], [2, 20]]);
					requireThat(actual, "actual").isEmpty();
				}, RangeError);
			},

			isNotEmpty: function()
			{
				const actual = new Map([[1, 10], [2, 20]]);
				requireThat(actual, "actual").isNotEmpty();
			},

			isNotEmpty_False: function()
			{
				assert.throws(function()
				{
					const actual = new Map();
					requireThat(actual, "actual").isNotEmpty();
				}, RangeError);
			},


			isEqualTo: function()
			{
				const actual = new Map([[1, 10], [2, 20]]);
				requireThat(actual, "actual").isEqualTo(actual);
			},

			isEqual_False: function()
			{
				assert.throws(function()
				{
					const actual = new Map([[1, 10], [2, 20]]);
					requireThat(actual, "actual").isEqualTo(new Map());
				}, RangeError);
			},

			isNotEqualTo: function()
			{
				requireThat(new Map([[1, 10], [2, 20]]), "actual").isNotEqualTo(new Map());
			},

			isNotEqualTo_False: function()
			{
				assert.throws(function()
				{
					const actual = new Map();
					requireThat(actual, "actual").isNotEqualTo(actual);
				}, RangeError);
			},

			isInArray: function()
			{
				const actual = new Map();
				requireThat(actual, "actual").isInArray(["first", actual, "third"])
			},

			isInArray_False: function()
			{
				assert.throws(function()
				{
					const actual = new Map([[1, 10], [2, 20]]);
					requireThat(actual, "actual").isInArray(["first", "second", "third"])
				}, RangeError);
			},

			isInstanceOf: function()
			{
				const actual = new Map([[1, 10], [2, 20]]);
				requireThat(actual, "actual").isInstanceOf(Map).isInstanceOf(Object);
			},

			isInstanceOf_False: function()
			{
				assert.throws(function()
				{
					const actual = new Map();
					requireThat(actual, "actual").isInstanceOf(String)
				}, RangeError);
			},

			isNull_False: function()
			{
				assert.throws(function()
				{
					const actual = new Map();
					requireThat(actual, "actual").isNull();
				}, RangeError);
			},

			isNotNull: function()
			{
				const actual = new Map();
				requireThat(actual, "actual").isNotNull();
			},

			keysContain: function()
			{
				const actual = new Map([[1, 10], [2, 20]]);
				requireThat(actual, "actual").keys().contains(2);
			},

			keysContain_False: function()
			{
				assert.throws(function()
				{
					const actual = new Map([[1, 10], [2, 20]]);
					requireThat(actual, "actual").keys().contains(5);
				}, RangeError);
			},

			keysDoesNotContain: function()
			{
				const actual = new Map([[1, 10], [2, 20]]);
				requireThat(actual, "actual").keys().doesNotContain(5);
			},

			keysDoesNotContain_False: function()
			{
				assert.throws(function()
				{
					const actual = new Map([[1, 10], [2, 20]]);
					requireThat(actual, "actual").keys().doesNotContain(2);
				}, RangeError);
			},

			valuesContain: function()
			{
				const actual = new Map([[1, 10], [2, 20]]);
				requireThat(actual, "actual").values().contains(20);
			},

			valuesContain_False: function()
			{
				assert.throws(function()
				{
					const actual = new Map([[1, 10], [2, 20]]);
					requireThat(actual, "actual").values().contains(50);
				}, RangeError);
			},

			valuesDoesNotContain: function()
			{
				const actual = new Map([[1, 10], [2, 20]]);
				requireThat(actual, "actual").values().doesNotContain(50);
			},

			valuesDoesNotContain_False: function()
			{
				assert.throws(function()
				{
					const actual = new Map([[1, 10], [2, 20]]);
					requireThat(actual, "actual").values().doesNotContain(20);
				}, RangeError);
			},

			entriesContain: function()
			{
				const actual = new Map([[1, 10], [2, 20]]);
				requireThat(actual, "actual").entries().contains([2, 20]);
			},

			entriesContain_False: function()
			{
				assert.throws(function()
				{
					const actual = new Map([[1, 10], [2, 20]]);
					requireThat(actual, "actual").entries().contains([5, 50]);
				}, RangeError);
			},

			entriesDoesNotContain: function()
			{
				const actual = new Map([[1, 10], [2, 20]]);
				requireThat(actual, "actual").entries().doesNotContain([5, 50]);
			},

			entriesDoesNotContain_False: function()
			{
				assert.throws(function()
				{
					const actual = new Map([[1, 10], [2, 20]]);
					requireThat(actual, "actual").entries().doesNotContain([2, 20]);
				}, RangeError);
			},

			sizeIsEqualTo: function()
			{
				const actual = new Map([[1, 10], [2, 20]]);
				requireThat(actual, "actual").size().isEqualTo(2);
			},

			sizeIsEqualTo_False: function()
			{
				assert.throws(function()
				{
					const actual = new Map([[1, 10], [2, 20]]);
					requireThat(actual, "actual").size().isEqualTo(1);
				}, RangeError);
			},

			sizeIsNotEqualTo: function()
			{
				const actual = new Map([[1, 10], [2, 20]]);
				requireThat(actual, "actual").size().isNotEqualTo(1);
			},

			sizeIsNotEqualTo_False: function()
			{
				assert.throws(function()
				{
					const actual = new Map([[1, 10], [2, 20]]);
					requireThat(actual, "actual").size().isNotEqualTo(2);
				}, RangeError);
			},

			asString: function()
			{
				const actual = new Map([[1, 10], [2, 20]]);
				requireThat(actual, "actual").asString().isEqualTo("{\n" +
					"  \"1\": 10,\n" +
					"  \"2\": 20\n" +
					"}");
			},

			getActual: function()
			{
				const input = new Map([[1, 10], [2, 20]]);
				const output = requireThat(input, "input").getActual();
				assert.equal(output, input);
			}
		});
});
