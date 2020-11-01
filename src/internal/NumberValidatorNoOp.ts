import {ObjectValidatorNoOp} from "./internal";

/**
 * An implementation of <code>NumberValidator</code> that does nothing.
 */
class NumberValidatorNoOp extends ObjectValidatorNoOp
{
	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isNegative(): NumberValidatorNoOp
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isNotNegative(): NumberValidatorNoOp
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isZero(): NumberValidatorNoOp
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isNotZero(): NumberValidatorNoOp
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isPositive(): NumberValidatorNoOp
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isNotPositive(): NumberValidatorNoOp
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isGreaterThan(): NumberValidatorNoOp
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isGreaterThanOrEqualTo(): NumberValidatorNoOp
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isLessThan(): NumberValidatorNoOp
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isLessThanOrEqualTo(): NumberValidatorNoOp
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isBetween(): NumberValidatorNoOp
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isBetweenClosed(): NumberValidatorNoOp
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isNumber(): NumberValidatorNoOp
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isNotNumber(): NumberValidatorNoOp
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isFinite(): NumberValidatorNoOp
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} the updated validator
	 */
	isNotFinite(): NumberValidatorNoOp
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {NumberValidatorNoOp as default};