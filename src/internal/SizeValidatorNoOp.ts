import {NumberValidatorNoOp} from "./internal";

/**
 * An implementation of {@link SizeValidator} that does nothing.
 */
class SizeValidatorNoOp extends NumberValidatorNoOp
{
	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isGreaterThanOrEqualTo(): this
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isGreaterThan(): this
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isLessThanOrEqualTo(): this
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isLessThan(): this
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isNotPositive(): this
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isPositive(): this
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isNotZero(): this
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isZero(): this
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isNotNegative(): this
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isNegative(): this
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isBetween(): this
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isBetweenClosed(): this
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isEqualTo(): this
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isNotEqualTo(): this
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SizeValidatorNoOp as default};