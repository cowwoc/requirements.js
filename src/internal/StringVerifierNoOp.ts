import {
	ObjectVerifierNoOp,
	SizeVerifier,
	SizeVerifierNoOp,
	StringVerifier
} from "./internal";

/**
 * An implementation of <code>StringVerifier</code> that does nothing. A verifier that ignores all
 * subsequent failures because they are guaranteed to fail and wouldn't add any value to the end-user. For
 * example, an attempt was made to dereference null or cast the value to an incompatible type.
 */
class StringVerifierNoOp extends ObjectVerifierNoOp
	implements StringVerifier
{
	static readonly INSTANCE = new StringVerifierNoOp();

	/**
	 * @return {StringVerifier} the updated verifier
	 */
	startsWith(): StringVerifier
	{
		return this;
	}

	/**
	 * @return {StringVerifier} the updated verifier
	 */
	doesNotStartWith(): StringVerifier
	{
		return this;
	}

	/**
	 * @return {StringVerifier} the updated verifier
	 */
	contains(): StringVerifier
	{
		return this;
	}

	/**
	 * @return {StringVerifier} the updated verifier
	 */
	doesNotContain(): StringVerifier
	{
		return this;
	}

	/**
	 * @return {StringVerifier} the updated verifier
	 */
	endsWith(): StringVerifier
	{
		return this;
	}

	/**
	 * @return {StringVerifier} the updated verifier
	 */
	doesNotEndWith(): StringVerifier
	{
		return this;
	}

	/**
	 * @return {StringVerifier} the updated verifier
	 */
	isEmpty(): StringVerifier
	{
		return this;
	}

	/**
	 * @return {StringVerifier} the updated verifier
	 */
	isNotEmpty(): StringVerifier
	{
		return this;
	}

	/**
	 * @return {StringVerifier} a verifier for the trimmed representation of the actual value
	 */
	trim(): StringVerifier
	{
		return this;
	}

	/**
	 * @return {StringVerifier} the updated verifier
	 */
	trimConsumer(): StringVerifier
	{
		return this;
	}

	/**
	 * @return {StringVerifier} the updated verifier
	 */
	isTrimmed(): StringVerifier
	{
		return this;
	}

	/**
	 * @return {SizeVerifier} a verifier for the length of the string
	 */
	length(): SizeVerifier
	{
		return SizeVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {StringVerifier} the updated verifier
	 */
	lengthConsumer(): StringVerifier
	{
		return this;
	}

	/**
	 * @return {StringVerifier} the updated verifier
	 */
	asString(): StringVerifier
	{
		return this;
	}

	/**
	 * @return {StringVerifier} the updated verifier
	 */
	asStringConsumer(): StringVerifier
	{
		return this;
	}

	/**
	 * @return {StringVerifier} the updated verifier
	 */
	asInetAddressConsumer(): StringVerifier
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {StringVerifierNoOp as default};