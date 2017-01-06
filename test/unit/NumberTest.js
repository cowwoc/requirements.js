import registerSuite from "intern!object";
import assert from "intern/chai!assert";
import requireThat from "./Requirements";

define(function()
{
	registerSuite(
		{
			name: "NumberTest",

			isInRange_actualIsLowerBound: function()
			{
				requireThat(0, "actual").isInRange(0, 2);
			},

			isInRange_actualIsInBounds: function()
			{
				requireThat(1, "actual").isInRange(0, 2);
			},

			isInRange_actualIsUpperBound: function()
			{
				requireThat(2, "actual").isInRange(0, 2);
			},

			isInRange_actualIsBelow: function()
			{
				assert.throws(function()
				{
					requireThat(1, "actual").isInRange(10, 20);
				}, RangeError)
			},

			isNegative_actualIsNegativeOne: function()
			{
				requireThat(-1, "actual").isNegative();
			},

			isNegative_actualIsZero: function()
			{
				assert.throws(function()
				{
					requireThat(0, "actual").isNegative();
				}, RangeError)
			},

			isNegative_actualIsOne: function()
			{
				assert.throws(function()
				{
					requireThat(1, "actual").isNegative();
				}, RangeError)
			},

			isNotNegative: function()
			{
				requireThat(0, "actual").isNotNegative();
				requireThat(1, "actual").isNotNegative();
			},

			isNotNegative_actualIsNegativeOne: function()
			{
				assert.throws(function()
				{
					requireThat(-1, "actual").isNotNegative();
				}, RangeError)
			},

			isZero: function()
			{
				requireThat(0, "actual").isZero();
			},

			isZero_actualIsOne: function()
			{
				assert.throws(function()
				{
					requireThat(1, "actual").isZero();
				}, RangeError)
			},

			isZero_actualIsNegativeOne: function()
			{
				assert.throws(function()
				{
					requireThat(-1, "actual").isZero();
				}, RangeError)
			},

			isNotZero: function()
			{
				requireThat(-1, "actual").isNotZero();
				requireThat(1, "actual").isNotZero();
			},

			isNotZero_False: function()
			{
				assert.throws(function()
				{
					requireThat(0, "actual").isNotZero();
				}, RangeError)
			},

			isPositive: function()
			{
				requireThat(1, "actual").isPositive();
			},

			isPositive_actualIsZero: function()
			{
				assert.throws(function()
				{
					requireThat(0, "actual").isPositive();
				}, RangeError)
			},

			isPositive_actualIsNegativeOne: function()
			{
				assert.throws(function()
				{
					requireThat(-1, "actual").isPositive();
				}, RangeError)
			},

			isNotPositive: function()
			{
				requireThat(0, "actual").isNotPositive();
				requireThat(-1, "actual").isNotPositive();
			},

			isNotPositive_actualIsOne: function()
			{
				assert.throws(function()
				{
					requireThat(1, "actual").isNotPositive();
				}, RangeError)
			},

			isLessThanVariable: function()
			{
				requireThat(0, "actual").isLessThan(1, "expected");
			},

			isLessThanConstant: function()
			{
				requireThat(0, "actual").isLessThan(1);
			},

			isLessThanVariable_actualIsEqual: function()
			{
				assert.throws(function()
				{
					requireThat(1, "actual").isLessThan(1, "expected");
				}, RangeError)
			},

			isLessThanConstant_actualIsEqual: function()
			{
				assert.throws(function()
				{
					requireThat(1, "actual").isLessThan(1);
				}, RangeError)
			},

			isLessThanVariable_actualIsGreater: function()
			{
				assert.throws(function()
				{
					requireThat(2, "actual").isLessThan(1, "expected");
				}, RangeError)
			},

			isLessThanConstant_actualIsGreater: function()
			{
				assert.throws(function()
				{
					requireThat(2, "actual").isLessThan(1);
				}, RangeError)
			},

			isLessThanOrEqualToVariable: function()
			{
				requireThat(1, "actual").isLessThanOrEqualTo(1, "expected");
			},

			isLessThanOrEqualToConstant: function()
			{
				requireThat(1, "actual").isLessThanOrEqualTo(1);
			},

			isLessThanOrEqualToVariable_actualIsGreater: function()
			{
				assert.throws(function()
				{
					requireThat(3, "actual").isLessThanOrEqualTo(2, "expected");
				}, RangeError)
			},

			isLessThanOrEqualToConstant_actualIsGreater: function()
			{
				assert.throws(function()
				{
					requireThat(3, "actual").isLessThanOrEqualTo(2);
				}, RangeError)
			},

			isGreaterThanVariable: function()
			{
				requireThat(1, "actual").isGreaterThan(0, "expected");
			},

			isGreaterThanConstant: function()
			{
				requireThat(1, "actual").isGreaterThan(0);
			},

			isGreaterThanVariable_actualIsEqual: function()
			{
				assert.throws(function()
				{
					requireThat(1, "actual").isGreaterThan(1, "expected");
				}, RangeError)
			},

			isGreaterThanConstant_actualIsEqual: function()
			{
				assert.throws(function()
				{
					requireThat(1, "actual").isGreaterThan(1);
				}, RangeError)
			},

			isGreaterThanVariable_actualIsLess: function()
			{
				assert.throws(function()
				{
					requireThat(1, "actual").isGreaterThan(2, "expected");
				}, RangeError)
			},

			isGreaterThanConstant_actualIsLess: function()
			{
				assert.throws(function()
				{
					requireThat(1, "actual").isGreaterThan(2);
				}, RangeError)
			},

			isGreaterThanOrEqualToVariable: function()
			{
				requireThat(1, "actual").isGreaterThanOrEqualTo(1, "expected");
			},

			isGreaterThanOrEqualToConstant: function()
			{
				requireThat(1, "actual").isGreaterThanOrEqualTo(1);
			},

			isGreaterThanOrEqualToVariable_actualIsLess: function()
			{
				assert.throws(function()
				{
					requireThat(1, "actual").isGreaterThanOrEqualTo(2, "expected");
				}, RangeError)
			},

			isGreaterThanOrEqualToConstant_actualIsLess: function()
			{
				assert.throws(function()
				{
					requireThat(1, "actual").isGreaterThanOrEqualTo(2);
				}, RangeError)
			},

			isFinite: function()
			{
				requireThat(1.0, "actual").isFinite();
			},

			isFinite_False: function()
			{
				assert.throws(function()
				{
					requireThat(1.0 / 1.0, "actual").isGreaterThanOrEqualTo(2);
				}, RangeError)
			},

			isNotFinite: function()
			{
				requireThat(1.0 / 1.0, "actual").isFinite();
			},

			isNotFinite_False: function()
			{
				assert.throws(function()
				{
					requireThat(1.0, "actual").isGreaterThanOrEqualTo(2);
				}, RangeError)
			},

			isNumber: function()
			{
				requireThat(1.0, "actual").isNumber();
			},

			isNumber_False: function()
			{
				assert.throws(function()
				{
					requireThat(0.0 / 0.0, "actual").isNumber();
				}, RangeError)
			},

			isNotNumber: function()
			{
				requireThat(0.0 / 0.0, "actual").isNotNumber();
			},

			isNotNumber_False: function()
			{
				assert.throws(function()
				{
					requireThat(1.0, "actual").isNotNumber();
				}, RangeError)
			}
		});
});