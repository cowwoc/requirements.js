import {
	AbstractObjectVerifierNoOp,
	ExtensibleNumberVerifier
} from "../internal";

/**
 * An implementation of <code>NumberVerifier</code> that does nothing. A verifier that ignores all
 * subsequent failures because they are guaranteed to fail and wouldn't add any value to the end-user. For
 * example, an attempt was made to dereference null or cast the value to an incompatible type.
 */
abstract class AbstractNumberVerifierNoOp<S> extends AbstractObjectVerifierNoOp<S>
	implements ExtensibleNumberVerifier<S>
{
	/**
	 * @return {ExtensibleNumberVerifier} the updated verifier
	 */
	isNegative(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberVerifier} the updated verifier
	 */
	isNotNegative(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberVerifier} the updated verifier
	 */
	isZero(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberVerifier} the updated verifier
	 */
	isNotZero(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberVerifier} the updated verifier
	 */
	isPositive(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberVerifier} the updated verifier
	 */
	isNotPositive(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberVerifier} the updated verifier
	 */
	isGreaterThan(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberVerifier} the updated verifier
	 */
	isGreaterThanOrEqualTo(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberVerifier} the updated verifier
	 */
	isLessThan(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberVerifier} the updated verifier
	 */
	isLessThanOrEqualTo(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberVerifier} the updated verifier
	 */
	isBetween(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberVerifier} the updated verifier
	 */
	isBetweenClosed(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberVerifier} the updated verifier
	 */
	isNumber(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberVerifier} the updated verifier
	 */
	isNotNumber(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberVerifier} the updated verifier
	 */
	isFinite(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberVerifier} the updated verifier
	 */
	isNotFinite(): S
	{
		return this.getThis();
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {AbstractNumberVerifierNoOp as default};