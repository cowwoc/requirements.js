import ObjectVerifierNoOp from "./circular_dependency/ObjectVerifierNoOpBase.js";
import SizeVerifierNoOp from "./SizeVerifierNoOp.js";

/**
 * An implementation of <code>String</code> that does nothing.
 */
class StringVerifierNoOp extends ObjectVerifierNoOp
{
	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	startsWith()
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	doesNotStartWith()
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	contains()
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	doesNotContain()
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	endsWith()
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	doesNotEndWith()
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	isEmpty()
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	isNotEmpty()
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} a verifier for the trimmed representation of the actual value
	 */
	trim()
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	trimConsumer()
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} a verifier for the length of the string
	 */
	static length()
	{
		return SizeVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	lengthConsumer()
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	asString()
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	asStringConsumer()
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	asInetAddressConsumer()
	{
		return this;
	}
}

StringVerifierNoOp.INSTANCE = new StringVerifierNoOp();

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {StringVerifierNoOp as default};