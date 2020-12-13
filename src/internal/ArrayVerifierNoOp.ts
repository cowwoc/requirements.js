import {
	AbstractObjectVerifierNoOp,
	ArrayVerifier,
	NumberVerifier,
	NumberVerifierNoOp,
	SetVerifier,
	SetVerifierNoOp
} from "./internal";

/**
 * An implementation of <code>ArrayVerifier</code> that does nothing.
 */
class ArrayVerifierNoOp extends AbstractObjectVerifierNoOp<ArrayVerifier>
	implements ArrayVerifier
{
	static readonly INSTANCE = new ArrayVerifierNoOp();

	protected getThis(): ArrayVerifier
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	isEmpty(): ArrayVerifier
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	isNotEmpty(): ArrayVerifier
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	contains(): ArrayVerifier
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	containsExactly(): ArrayVerifier
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	containsAny(): ArrayVerifier
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	containsAll(): ArrayVerifier
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	doesNotContain(): ArrayVerifier
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	doesNotContainAny(): ArrayVerifier
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	doesNotContainAll(): ArrayVerifier
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	doesNotContainDuplicates(): ArrayVerifier
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	lengthConsumer(): ArrayVerifier
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayVerifierNoOp} the updated verifier
	 */
	asSetConsumer(): ArrayVerifier
	{
		return this.getThis();
	}

	/**
	 * @return {NumberVerifier} a verifier for the length of the array
	 */
	length(): NumberVerifier
	{
		return NumberVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {SetVerifier} a <code>Set</code> verifier
	 */
	asSet(): SetVerifier
	{
		return SetVerifierNoOp.INSTANCE;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayVerifierNoOp as default};