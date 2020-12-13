import {
	NumberVerifierNoOp,
	SizeVerifier
} from "./internal";

/**
 * An implementation of <code>SizeVerifier</code> that does nothing. A verifier that ignores all
 * subsequent failures because they are guaranteed to fail and wouldn't add any value to the end-user. For
 * example, an attempt was made to dereference null or cast the value to an incompatible type.
 */
class SizeVerifierNoOp extends NumberVerifierNoOp
	implements SizeVerifier
{
	static readonly INSTANCE = new SizeVerifierNoOp();

	/**
	 * @return {SizeVerifier} the updated verifier
	 */
	isGreaterThanOrEqualTo(): SizeVerifier
	{
		return this;
	}

	/**
	 * @return {SizeVerifier} the updated verifier
	 */
	isGreaterThan(): SizeVerifier
	{
		return this;
	}

	/**
	 * @return {SizeVerifier} the updated verifier
	 */
	isLessThanOrEqualTo(): SizeVerifier
	{
		return this;
	}

	/**
	 * @return {SizeVerifier} the updated verifier
	 */
	isLessThan(): SizeVerifier
	{
		return this;
	}

	/**
	 * @return {SizeVerifier} the updated verifier
	 */
	isNotPositive(): SizeVerifier
	{
		return this;
	}

	/**
	 * @return {SizeVerifier} the updated verifier
	 */
	isPositive(): SizeVerifier
	{
		return this;
	}

	/**
	 * @return {SizeVerifier} the updated verifier
	 */
	isNotZero(): SizeVerifier
	{
		return this;
	}

	/**
	 * @return {SizeVerifier} the updated verifier
	 */
	isZero(): SizeVerifier
	{
		return this;
	}

	/**
	 * @return {SizeVerifier} the updated verifier
	 */
	isNotNegative(): SizeVerifier
	{
		return this;
	}

	/**
	 * @return {SizeVerifier} the updated verifier
	 */
	isNegative(): SizeVerifier
	{
		return this;
	}

	/**
	 * @return {SizeVerifier} the updated verifier
	 */
	isBetween(): SizeVerifier
	{
		return this;
	}

	/**
	 * @return {SizeVerifier} the updated verifier
	 */
	isBetweenClosed(): SizeVerifier
	{
		return this;
	}

	/**
	 * @return {SizeVerifier} the updated verifier
	 */
	isEqualTo(): SizeVerifier
	{
		return this;
	}

	/**
	 * @return {SizeVerifier} the updated verifier
	 */
	isNotEqualTo(): SizeVerifier
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SizeVerifierNoOp as default};