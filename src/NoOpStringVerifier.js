import NoOpObjectVerifier from "./NoOpObjectVerifier";
import NoOpContainerSizeVerifier from "./NoOpContainerSizeVerifier";

/**
 * An implementation of <code>String</code> that does nothing.
 */
class NoOpStringVerifier extends NoOpObjectVerifier
{
	/**
	 * @return {NoOpStringVerifier} this
	 */
	startsWith()
	{
		return this;
	}

	/**
	 * @return {NoOpStringVerifier} this
	 */
	doesNotStartWith()
	{
		return this;
	}

	/**
	 * @return {NoOpStringVerifier} this
	 */
	contains()
	{
		return this;
	}

	/**
	 * @return {NoOpStringVerifier} this
	 */
	doesNotContain()
	{
		return this;
	}

	/**
	 * @return {NoOpStringVerifier} this
	 */
	endsWith()
	{
		return this;
	}

	/**
	 * @return {NoOpStringVerifier} this
	 */
	doesNotEndWith()
	{
		return this;
	}

	/**
	 * @return {NoOpStringVerifier} this
	 */
	isEmpty()
	{
		return this;
	}

	/**
	 * @return {NoOpStringVerifier} this
	 */
	isNotEmpty()
	{
		return this;
	}

	/**
	 * @return {NoOpStringVerifier} a verifier for the trimmed representation of the actual value
	 */
	trim()
	{
		return this;
	}

	/**
	 * @return {NoOpStringVerifier} this
	 */
	trimConsumer()
	{
		return this;
	}

	/**
	 * @return {NoOpContainerSizeVerifier} a verifier for the length of the string
	 */
	static length()
	{
		return new NoOpContainerSizeVerifier();
	}

	/**
	 * @return {NoOpStringVerifier} this
	 */
	lengthConsumer()
	{
		return this;
	}

	/**
	 * @return {NoOpStringVerifier} this
	 */
	asString()
	{
		return this;
	}

	/**
	 * @return {NoOpStringVerifier} this
	 */
	asStringConsumer()
	{
		return this;
	}

	/**
	 * @return {NoOpStringVerifier} this
	 */
	asInetAddressConsumer()
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {NoOpStringVerifier as default};