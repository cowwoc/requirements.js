import NoOpContainerSizeVerifier from "./NoOpContainerSizeVerifier.js";
import NoOpObjectVerifier from "./NoOpObjectVerifier.js";
import NoOpSetVerifier from "./NoOpSetVerifier.js";

/**
 * An implementation of <code>ArrayVerifier</code> that does nothing.
 */
class NoOpArrayVerifier extends NoOpObjectVerifier
{
	/**
	 * @return {NoOpArrayVerifier} this
	 */
	isEmpty()
	{
		return this;
	}

	/**
	 * @return {NoOpArrayVerifier} this
	 */
	isNotEmpty()
	{
		return this;
	}

	/**
	 * @return {NoOpArrayVerifier} this
	 */
	includes()
	{
		return this;
	}

	/**
	 * @return {NoOpArrayVerifier} this
	 */
	containsExactly()
	{
		return this;
	}

	/**
	 * @return {NoOpArrayVerifier} this
	 */
	containsAny()
	{
		return this;
	}

	/**
	 * @return {NoOpArrayVerifier} this
	 */
	containsAll()
	{
		return this;
	}

	/**
	 * @return {NoOpArrayVerifier} this
	 */
	doesNotContain()
	{
		return this;
	}

	/**
	 * @return {NoOpArrayVerifier} this
	 */
	doesNotContainAny()
	{
		return this;
	}

	/**
	 * @return {NoOpArrayVerifier} this
	 */
	doesNotContainAll()
	{
		return this;
	}

	/**
	 * @return {NoOpArrayVerifier} this
	 */
	doesNotContainDuplicates()
	{
		return this;
	}

	/**
	 * @return {NoOpContainerSizeVerifier} a verifier for the length of the array
	 */
	static length()
	{
		return new NoOpContainerSizeVerifier();
	}

	/**
	 * @return {NoOpArrayVerifier} this
	 */
	lengthConsumer()
	{
		return this;
	}

	/**
	 * @return {NoOpSetVerifier} a <code>Set</code> verifier
	 */
	static asSet()
	{
		return new NoOpSetVerifier();
	}

	/**
	 * @return {NoOpArrayVerifier} this
	 */
	asSetConsumer()
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {NoOpArrayVerifier as default};