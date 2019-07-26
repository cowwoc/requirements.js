import NumberValidatorNoOp from "./NumberValidatorNoOp.js";

/**
 * An implementation of {@link SizeValidator} that does nothing.
 */
class SizeValidatorNoOp extends NumberValidatorNoOp
{
	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isGreaterThanOrEqualTo()
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isGreaterThan()
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isLessThanOrEqualTo()
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isLessThan()
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isNotPositive()
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isPositive()
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isNotZero()
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isZero()
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isNotNegative()
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isNegative()
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isBetween()
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isBetweenClosed()
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isEqualTo()
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} the updated validator
	 */
	isNotEqualTo()
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SizeValidatorNoOp as default};