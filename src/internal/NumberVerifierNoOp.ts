import {ObjectVerifierNoOp} from "./internal";

/**
 * An implementation of <code>NumberVerifier</code> that does nothing.
 */
class NumberVerifierNoOp extends ObjectVerifierNoOp
{
	static readonly INSTANCE = new NumberVerifierNoOp();

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isNegative(): this
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isNotNegative(): this
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isZero(): this
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isNotZero(): this
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isPositive(): this
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isNotPositive(): this
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isGreaterThan(): this
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isGreaterThanOrEqualTo(): this
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isLessThan(): this
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isLessThanOrEqualTo(): this
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isBetween(): this
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isBetweenClosed(): this
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isNumber(): this
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isNotNumber(): this
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isFinite(): this
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} the updated verifier
	 */
	isNotFinite(): this
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {NumberVerifierNoOp as default};