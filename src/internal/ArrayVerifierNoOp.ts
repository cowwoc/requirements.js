import {
	ObjectVerifierNoOp,
	SetVerifierNoOp,
	SizeVerifierNoOp
} from "./internal";

/**
 * An implementation of <code>ArrayVerifier</code> that does nothing.
 */
class ArrayVerifierNoOp extends ObjectVerifierNoOp
{
	static readonly INSTANCE = new ArrayVerifierNoOp();

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	isEmpty(): this
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	isNotEmpty(): this
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	contains(): this
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	containsExactly(): this
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	containsAny(): this
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	containsAll(): this
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	doesNotContain(): this
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	doesNotContainAny(): this
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	doesNotContainAll(): this
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	doesNotContainDuplicates(): this
	{
		return this;
	}


	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	lengthConsumer(): this
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	asSetConsumer(): this
	{
		return this;
	}


	/**
	 * @return {SizeVerifierNoOp} a verifier for the length of the array
	 */
	length(): SizeVerifierNoOp
	{
		return SizeVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {SetVerifierNoOp} a <code>Set</code> verifier
	 */
	asSet(): SetVerifierNoOp
	{
		return SetVerifierNoOp.INSTANCE;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayVerifierNoOp as default};