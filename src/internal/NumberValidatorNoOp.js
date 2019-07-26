import ObjectValidatorNoOp from "./circular_dependency/ObjectValidatorNoOp.js";

/**
 * An implementation of <code>NumberValidator</code> that does nothing.
 */
class NumberValidatorNoOp extends ObjectValidatorNoOp
{
	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isNegative()
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isNotNegative()
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isZero()
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isNotZero()
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isPositive()
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isNotPositive()
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isGreaterThan()
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isGreaterThanOrEqualTo()
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isLessThan()
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isLessThanOrEqualTo()
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isBetween()
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isBetweenClosed()
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isNumber()
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isNotNumber()
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isFinite()
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isNotFinite()
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {NumberValidatorNoOp as default};