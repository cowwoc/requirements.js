import assert from "intern/chai!assert";
import registerSuite from "intern!object";
import requireThat from "./Requirements";

/* eslint-disable camelcase */
define(function()
{
	// See http://stackoverflow.com/a/27724419/14731
	function IllegalArgumentException(message)
	{
		this.message = message;
		// Use V8's native method if available, otherwise fallback
		if ("captureStackTrace" in Error)
			Error.captureStackTrace(this, IllegalArgumentException);
		else
		{
			Object.defineProperty(this, "stack", {
				value: (new Error(message)).stack
			});
		}
	}

	IllegalArgumentException.prototype = Object.create(Error.prototype);
	IllegalArgumentException.prototype.name = "IllegalArgumentException";
	IllegalArgumentException.prototype.constructor = IllegalArgumentException;

	registerSuite(
		{
			name: "ObjectTest",

			nameIsNull: function()
			{
				assert.throws(function()
				{
					const actual = {};
					requireThat(actual, null);
				}, TypeError);
			},

			nameIsEmpty: function()
			{
				assert.throws(function()
				{
					const actual = {};
					requireThat(actual, "");
				}, RangeError);
			},

			isEqualTo: function()
			{
				const actual = "actual";
				requireThat(actual, "actual").isEqualTo(actual);
			},

			isEqual_False: function()
			{
				assert.throws(function()
				{
					const actual = {};
					requireThat(actual, "actual").isEqualTo("expected");
				}, RangeError);
			},

			isEqual_sameToStringDifferentTypes: function()
			{
				assert.throws(function()
				{
					const actual = "null";
					requireThat(actual, "actual").isEqualTo(null);
				}, RangeError);
			},

			isEqual_nullToNull: function()
			{
				const actual = null;
				requireThat(actual, "actual").isEqualTo(actual);
			},

			isEqualTo_nullToNotNull: function()
			{
				assert.throws(function()
				{
					const actual = null;
					requireThat(actual, "actual").isEqualTo("expected");
				}, RangeError);
			},

			isEqualTo_notNullToNull: function()
			{
				assert.throws(function()
				{
					const actual = "actual";
					requireThat(actual, "actual").isEqualTo(null);
				}, RangeError);
			},

			isNotEqualTo: function()
			{
				requireThat(new String(), "actual").isNotEqualTo(new Object());
			},

			isNotEqualTo_False: function()
			{
				assert.throws(function()
				{
					const actual = new Object();
					requireThat(actual, "actual").isNotEqualTo(actual);
				}, RangeError);
			},

			isInArray: function()
			{
				const actual = new Object();
				requireThat(actual, "actual").isInArray(["first", actual, "third"])
			},

			isInArray_False: function()
			{
				assert.throws(function()
				{
					const actual = new Object();
					requireThat(actual, "actual").isInArray(["first", "second", "third"])
				}, RangeError);
			},

			isInstanceOf: function()
			{
				const actual = "value";
				requireThat(actual, "actual").isInstanceOf(String).isInstanceOf(Object);
			},

			isInstanceOf_actualIsNull: function()
			{
				assert.throws(function()
				{
					const actual = null;
					requireThat(actual, "actual").isInstanceOf(String.class)
				}, RangeError);
			},

			isInstanceOf_expectedIsNull: function()
			{
				assert.throws(function()
				{
					const actual = new Object();
					requireThat(actual, "actual").isInstanceOf(null)
				}, RangeError);
			},

			isInstanceOf_False: function()
			{
				assert.throws(function()
				{
					const actual = new Object();
					requireThat(actual, "actual").isInstanceOf(String)
				}, RangeError);
			},

			isNull: function()
			{
				requireThat(null, "actual").isNull();
			},

			isNull_False: function()
			{
				assert.throws(function()
				{
					const actual = new Object();
					requireThat(actual, "actual").isNull();
				}, RangeError);
			},

			isNotNull: function()
			{
				const actual = new Object();
				requireThat(actual, "actual").isNotNull();
			},

			isNotNull_False: function()
			{
				assert.throws(function()
				{
					const actual = null;
					requireThat(actual, "actual").isNotNull();
				}, RangeError);
			},

			isNotNull_CustomException: function()
			{
				assert.throws(function()
				{
					const actual = null;
					requireThat(actual, "actual").withException(IllegalArgumentException).isNotNull();
				}, IllegalArgumentException);
			},

			getActual: function()
			{
				const input = new Object();
				const output = requireThat(input, "input").getActual();
				assert.equal(output, input);
			}
		});
});
