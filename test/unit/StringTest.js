import assert from "intern/chai!assert";
import registerSuite from "intern!object";
import requireThat from "./Requirements";

/* eslint-disable camelcase */
define(function()
{
	registerSuite(
		{
			name: "StringTest",

			isEmpty: function()
			{
				requireThat("", "actual").isEmpty();
			},

			isEmpty_False: function()
			{
				assert.throws(function()
				{
					const actual = {};
					requireThat("   ", "actual").isEmpty();
				}, RangeError);
			},

			trimIsEmpty: function()
			{
				requireThat("   ", "actual").trim().isEmpty();
			},

			trimIsEmpty_False: function()
			{
				assert.throws(function()
				{
					const actual = {};
					requireThat("value", "actual").trim().isEmpty();
				}, RangeError);
			},

			isNotEmpty: function()
			{
				requireThat("   ", "actual").isNotEmpty();
			},

			isNotEmpty_False: function()
			{
				assert.throws(function()
				{
					const actual = {};
					requireThat("", "actual").isNotEmpty();
				}, RangeError);
			},

			trimIsNotEmpty: function()
			{
				requireThat("value", "actual").trim().isNotEmpty();
			},

			trimIsNotEmpty_False: function()
			{
				assert.throws(function()
				{
					const actual = {};
					requireThat("   ", "actual").trim().isNotEmpty();
				}, RangeError);
			},

			startsWith: function()
			{
				const prefix = "home";
				const actual = prefix + "1234";
				requireThat(actual, "actual").startsWith(prefix);
			},

			startsWith_False: function()
			{
				assert.throws(function()
				{
					const prefix = "home";
					const actual = "1234" + prefix;
					requireThat(actual, "actual").startsWith(prefix);
				}, RangeError);
			},

			doesNotStartWith: function()
			{
				const prefix = "home";
				const actual = "1234" + prefix;
				requireThat(actual, "actual").doesNotStartWith(prefix);
			},

			doesNotStartWith_False: function()
			{
				assert.throws(function()
				{
					const prefix = "home";
					const actual = prefix + "1234";
					requireThat(actual, "actual").doesNotStartWith(prefix);
				}, RangeError);
			},

			endsWith: function()
			{
				const suffix = "home";
				const actual = "1234" + suffix;
				requireThat(actual, "actual").endsWith(suffix);
			},

			endsWith_False: function()
			{
				assert.throws(function()
				{
					const suffix = "home";
					const actual = suffix + "1234";
					requireThat(actual, "actual").endsWith(suffix);
				}, RangeError);
			},

			doesNotEndWith: function()
			{
				const suffix = "home";
				const actual = suffix + "1234";
				requireThat(actual, "actual").doesNotEndWith(suffix);
			},

			doesNotEndWith_False: function()
			{
				assert.throws(function()
				{
					const suffix = "home";
					const actual = "1234" + suffix;
					requireThat(actual, "actual").doesNotEndWith(suffix);
				}, RangeError);
			},


			lengthIsEqualTo: function()
			{
				const actual = "value";
				requireThat(actual, "actual").length().isEqualTo(actual.length);
			},

			lengthIsEqualTo_False: function()
			{
				assert.throws(function()
				{
					const actual = "value";
					requireThat(actual, "actual").length().isEqualTo(actual.length + 1);
				}, RangeError);
			},

			lengthIsNotEqualTo: function()
			{
				const actual = "value";
				requireThat(actual, "actual").length().isNotEqualTo(actual.length + 1);
			},

			lengthIsNotEqualTo_False: function()
			{
				assert.throws(function()
				{
					const actual = "value";
					requireThat(actual, "actual").length().isNotEqualTo(actual.length);
				}, RangeError);
			},

			asString: function()
			{
				const actual = "value";
				requireThat(actual, "actual").asString().isEqualTo(actual);
			},

			getActual: function()
			{
				const input = "value";
				const output = requireThat(input, "input").getActual();
				assert.equal(output, input);
			}
		});
});
