import ObjectVerifierNoOp from "./ObjectVerifierNoOpBase.js";

// DESIGN:
// * Declare the class without methods that trigger circular dependencies
// * Load the dependencies
// * Add the missing methods

/**
 * An implementation of <code>ArrayVerifier</code> that does nothing.
 */
class ArrayVerifierNoOp extends ObjectVerifierNoOp
{
	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	isEmpty()
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	isNotEmpty()
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	contains()
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	containsExactly()
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	containsAny()
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	containsAll()
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	doesNotContain()
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	doesNotContainAny()
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	doesNotContainAll()
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	doesNotContainDuplicates()
	{
		return this;
	}


	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	lengthConsumer()
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	asSetConsumer()
	{
		return this;
	}
}

ArrayVerifierNoOp.INSTANCE = new ArrayVerifierNoOp();

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayVerifierNoOp as default};