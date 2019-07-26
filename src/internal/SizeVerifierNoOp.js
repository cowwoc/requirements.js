import NumberVerifierNoOp from "./NumberVerifierNoOp.js";

/**
 * An implementation of {@link SizeVerifier} that does nothing.
 */
class SizeVerifierNoOp extends NumberVerifierNoOp
{
	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isGreaterThanOrEqualTo()
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isGreaterThan()
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isLessThanOrEqualTo()
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isLessThan()
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isNotPositive()
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isPositive()
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isNotZero()
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isZero()
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isNotNegative()
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isNegative()
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isBetween()
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isBetweenClosed()
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isEqualTo()
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isNotEqualTo()
	{
		return this;
	}
}

SizeVerifierNoOp.INSTANCE = new SizeVerifierNoOp();

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SizeVerifierNoOp as default};