import registerSuite from "intern!object";
import assert from "intern/chai!assert";
import requireThat from "./Requirements";

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

			isEmpty: function()
			{
				const actual = {};
				requireThat(actual, "actual").isEmpty();
			},

			isEmpty_False: function()
			{
				assert.throws(function()
				{
					const actual = {"key": "value"};
					requireThat(actual, "actual").isEmpty();
				}, RangeError);
			},

			isNotEmpty: function()
			{
				const actual = {"key": "value"};
				requireThat(actual, "actual").isNotEmpty();
			},

			isNotEmpty_False: function()
			{
				assert.throws(function()
				{
					const actual = {};
					requireThat(actual, "actual").isNotEmpty();
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

			isEqual_sameToStringAndTypeDifferentHashCode: function()
			{
				assert.throws(function()
				{
					const actual = new Object();
					requireThat(actual, "actual").isEqualTo(new Object());
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
				requireThat(new Object(), "actual").isNotEqualTo(new Object());
			},

			isNotEqualTo_False: function()
			{
				assert.throws(function()
				{
					const actual = new Object();
					requireThat(actual, "actual").isNotEqualTo(actual);
				}, RangeError);
			},

			isInCollection: function()
			{
				const actual = "value";
				requireThat(actual, "actual").isInArray(["first", actual, "third"])
			},

			isInCollection_False: function()
			{
				assert.throws(function()
				{
					const actual = "value";
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

			containsKey: function()
			{
				const actual = {"key": "value"};
				requireThat(actual, "actual").keys().contains("key");
			}
			,

			containsKey_False: function()
			{
				assert.throws(function()
				{
					const actual = {"notKey": "value"};
					requireThat(actual, "actual").keys().contains("key");
				}, RangeError);
			}
			,

			doesNotContainKey: function()
			{
				const actual = {"key": "value"};
				requireThat(actual, "actual").keys().doesNotContain("notKey");
			}
			,

			doesNotContainKey_False: function()
			{
				assert.throws(function()
				{
					const actual = {"notKey": "value"};
					requireThat(actual, "actual").keys().doesNotContain("notKey");
				}, RangeError);
			}
			,

			containsValue: function()
			{
				const actual = {"key": "value"};
				requireThat(actual, "actual").values().contains("value");
			}
			,

			containsValue_False: function()
			{
				assert.throws(function()
				{
					const actual = {"key": "notValue"};
					requireThat(actual, "actual").values().contains("value");
				}, RangeError);
			}
			,

			doesNotContainValue: function()
			{
				const actual = {"key": "value"};
				requireThat(actual, "actual").values().doesNotContain("notValue");
			}
			,

			doesNotContainValue_False: function()
			{
				assert.throws(function()
				{
					const actual = {"key": "notValue"};
					requireThat(actual, "actual").values().doesNotContain("notValue");
				}, RangeError);
			}
			,

			containsEntry: function()
			{
				const actual = {"key": "value"};
				requireThat(actual, "actual").contains({"key": "value"});
			}
			,

			containsEntry_False: function()
			{
				assert.throws(function()
				{
					const actual = {"key": "notValue"};
					requireThat(actual, "actual").contains({"key": "value"});
				}, RangeError);
			}
			,

			doesNotContainEntry: function()
			{
				const actual = {"key": "value"};
				requireThat(actual, "actual").doesNotContain({"key": "notValue"});
			}
			,

			doesNotContainEntry_False: function()
			{
				assert.throws(function()
				{
					const actual = {"key": "notValue"};
					requireThat(actual, "actual").doesNotContain({"key": "notValue"});
				}, RangeError);
			}
			,


			sizeIsEqualTo: function()
			{
				const actual = {"key": "value"};
				requireThat(actual, "actual").size().isEqualTo(1);
			}
			,

			sizeIsEqualTo_False: function()
			{
				assert.throws(function()
				{
					const actual = {"key": "value"};
					requireThat(actual, "actual").size().isEqualTo(2);
				}, RangeError);
			}
			,

			sizeIsNotEqualTo: function()
			{
				const actual = {"key": "value"};
				requireThat(actual, "actual").size().isNotEqualTo(2);
			}
			,

			sizeIsNotEqualTo_False: function()
			{
				assert.throws(function()
				{
					const actual = {"key": "value"};
					requireThat(actual, "actual").size().isNotEqualTo(1);
				}, RangeError);
			}
			,

			childConsumers: function()
			{
				const actual = {"key": "value"};
				requireThat(actual, "actual").
					keysConsumer(k => k.contains("key")).
					valuesConsumer(v => v.contains("value"))
			}
			,

			keysConsumer_False: function()
			{
				assert.throws(function()
				{
					const actual = {"key": "value"};
					requireThat(actual, "actual").
						keysConsumer(k => k.contains("notTheKey")).
						valuesConsumer(v => v.contains("value"));
				}, RangeError);
			}
			,

			valuesConsumer_False: function()
			{
				assert.throws(function()
				{
					const actual = {"key": "value"};
					requireThat(actual, "actual").
						keysConsumer(k => k.contains("key")).
						valuesConsumer(v => v.contains("notTheValue"));
				}, RangeError);
			}
		})
	;
});
