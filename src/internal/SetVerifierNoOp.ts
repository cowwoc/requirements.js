import {
	ArrayVerifierNoOp,
	NumberVerifierNoOp,
	ObjectVerifierNoOp
} from "./internal";

/**
 * An implementation of <code>SetVerifier</code> that does nothing.
 */
class SetVerifierNoOp extends ObjectVerifierNoOp
{
	static readonly INSTANCE = new SetVerifierNoOp();

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	isEmpty(): this
	{
		return this;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	isNotEmpty(): this
	{
		return this;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	contains(): this
	{
		return this;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	containsExactly(): this
	{
		return this;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	containsAny(): this
	{
		return this;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	containsAll(): this
	{
		return this;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	doesNotContain(): this
	{
		return this;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	doesNotContainAny(): this
	{
		return this;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	doesNotContainAll(): this
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} a verifier for the Set's size
	 */
	static size(): NumberVerifierNoOp
	{
		return NumberVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	sizeConsumer(): this
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} a verifier for the Set's elements
	 */
	static asArray(): ArrayVerifierNoOp
	{
		return ArrayVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	asArrayConsumer(): this
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SetVerifierNoOp as default};