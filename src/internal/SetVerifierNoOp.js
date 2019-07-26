import ObjectVerifierNoOp from "./circular_dependency/ObjectVerifierNoOpBase.js";
import ArrayVerifierNoOp from "./circular_dependency/ArrayVerifierNoOpBase.js";
import NumberVerifierNoOp from "./NumberVerifierNoOp.js";

/**
 * An implementation of <code>SetVerifier</code> that does nothing.
 */
class SetVerifierNoOp extends ObjectVerifierNoOp
{
	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	isEmpty()
	{
		return this;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	isNotEmpty()
	{
		return this;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	contains()
	{
		return this;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	containsExactly()
	{
		return this;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	containsAny()
	{
		return this;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	containsAll()
	{
		return this;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	doesNotContain()
	{
		return this;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	doesNotContainAny()
	{
		return this;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	doesNotContainAll()
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} a verifier for the Set's size
	 */
	static size()
	{
		return NumberVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	sizeConsumer()
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} a verifier for the Set's elements
	 */
	static asArray()
	{
		return ArrayVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {SetVerifierNoOp} the updated verifier
	 */
	asArrayConsumer()
	{
		return this;
	}
}

SetVerifierNoOp.INSTANCE = new SetVerifierNoOp();

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SetVerifierNoOp as default};