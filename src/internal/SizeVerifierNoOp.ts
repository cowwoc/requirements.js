import {NumberVerifierNoOp} from "./internal";

/**
 * An implementation of {@link SizeVerifier} that does nothing.
 */
class SizeVerifierNoOp extends NumberVerifierNoOp
{
	static readonly INSTANCE = new SizeVerifierNoOp();

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isGreaterThanOrEqualTo(): this
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isGreaterThan(): this
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isLessThanOrEqualTo(): this
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isLessThan(): this
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isNotPositive(): this
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isPositive(): this
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isNotZero(): this
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isZero(): this
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isNotNegative(): this
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isNegative(): this
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isBetween(): this
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isBetweenClosed(): this
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isEqualTo(): this
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} the updated verifier
	 */
	isNotEqualTo(): this
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SizeVerifierNoOp as default};