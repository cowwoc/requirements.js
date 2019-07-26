import ObjectVerifierNoOp from "./circular_dependency/ObjectVerifierNoOpBase.js";

/**
 * An implementation of <code>NumberVerifier</code> that does nothing.
 */
class NumberVerifierNoOp extends ObjectVerifierNoOp
{
	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isNegative()
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isNotNegative()
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isZero()
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isNotZero()
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isPositive()
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isNotPositive()
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isGreaterThan()
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isGreaterThanOrEqualTo()
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isLessThan()
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isLessThanOrEqualTo()
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isBetween()
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isBetweenClosed()
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isNumber()
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isNotNumber()
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isFinite()
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isNotFinite()
	{
		return this;
	}
}

NumberVerifierNoOp.INSTANCE = new NumberVerifierNoOp();

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {NumberVerifierNoOp as default};