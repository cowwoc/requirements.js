import {
	ObjectVerifierNoOp,
	SizeVerifierNoOp
} from "./internal";

/**
 * An implementation of <code>String</code> that does nothing.
 */
class StringVerifierNoOp extends ObjectVerifierNoOp
{
	static readonly INSTANCE = new StringVerifierNoOp();

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	startsWith(): this
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	doesNotStartWith(): this
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	contains(): this
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	doesNotContain(): this
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	endsWith(): this
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	doesNotEndWith(): this
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	isEmpty(): this
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	isNotEmpty(): this
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} a verifier for the trimmed representation of the actual value
	 */
	trim(): this
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	trimConsumer(): this
	{
		return this;
	}

	/**
	 * @return {SizeVerifierNoOp} a verifier for the length of the string
	 */
	length(): SizeVerifierNoOp
	{
		return SizeVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	lengthConsumer(): this
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	asString(): this
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	asStringConsumer(): this
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} the updated verifier
	 */
	asInetAddressConsumer(): this
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {StringVerifierNoOp as default};