import {
	ArrayVerifier,
	ArrayVerifierNoOp,
	NumberVerifier,
	NumberVerifierNoOp,
	ObjectVerifierNoOp,
	SetVerifier
} from "./internal";

/**
 * An implementation of <code>SetVerifier</code> that does nothing. A verifier that ignores all
 * subsequent failures because they are guaranteed to fail and wouldn't add any value to the end-user. For
 * example, an attempt was made to dereference null or cast the value to an incompatible type.
 */
class SetVerifierNoOp extends ObjectVerifierNoOp
	implements SetVerifier
{
	static readonly INSTANCE = new SetVerifierNoOp();

	/**
	 * @return {SetVerifier} the updated verifier
	 */
	isEmpty(): SetVerifier
	{
		return this;
	}

	/**
	 * @return {SetVerifier} the updated verifier
	 */
	isNotEmpty(): SetVerifier
	{
		return this;
	}

	/**
	 * @return {SetVerifier} the updated verifier
	 */
	contains(): SetVerifier
	{
		return this;
	}

	/**
	 * @return {SetVerifier} the updated verifier
	 */
	containsExactly(): SetVerifier
	{
		return this;
	}

	/**
	 * @return {SetVerifier} the updated verifier
	 */
	containsAny(): SetVerifier
	{
		return this;
	}

	/**
	 * @return {SetVerifier} the updated verifier
	 */
	containsAll(): SetVerifier
	{
		return this;
	}

	/**
	 * @return {SetVerifier} the updated verifier
	 */
	doesNotContain(): SetVerifier
	{
		return this;
	}

	/**
	 * @return {SetVerifier} the updated verifier
	 */
	doesNotContainAny(): SetVerifier
	{
		return this;
	}

	/**
	 * @return {SetVerifier} the updated verifier
	 */
	doesNotContainAll(): SetVerifier
	{
		return this;
	}

	/**
	 * @return {NumberVerifier} a verifier for the Set's size
	 */
	size(): NumberVerifier
	{
		return NumberVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {SetVerifier} the updated verifier
	 */
	sizeConsumer(): SetVerifier
	{
		return this;
	}

	/**
	 * @return {ArrayVerifier} a verifier for the Set's elements
	 */
	static asArray(): ArrayVerifier
	{
		return ArrayVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {SetVerifier} the updated verifier
	 */
	asArrayConsumer(): SetVerifier
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SetVerifierNoOp as default};