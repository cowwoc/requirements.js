import NoOpObjectVerifier from "./NoOpObjectVerifier";
import NoOpArrayVerifier from "./NoOpArrayVerifier";
import NoOpNumberVerifier from "./NoOpNumberVerifier";

/**
 * An implementation of <code>SetVerifier</code> that does nothing.
 */
class NoOpSetVerifier extends NoOpObjectVerifier
{
	/**
	 * @return {NoOpSetVerifier} this
	 */
	isEmpty()
	{
		return this;
	}

	/**
	 * @return {NoOpSetVerifier} this
	 */
	isNotEmpty()
	{
		return this;
	}

	/**
	 * @return {NoOpSetVerifier} this
	 */
	contains()
	{
		return this;
	}

	/**
	 * @return {NoOpSetVerifier} this
	 */
	containsExactly()
	{
		return this;
	}

	/**
	 * @return {NoOpSetVerifier} this
	 */
	containsAny()
	{
		return this;
	}

	/**
	 * @return {NoOpSetVerifier} this
	 */
	containsAll()
	{
		return this;
	}

	/**
	 * @return {NoOpSetVerifier} this
	 */
	doesNotContain()
	{
		return this;
	}

	/**
	 * @return {NoOpSetVerifier} this
	 */
	doesNotContainAny()
	{
		return this;
	}

	/**
	 * @return {NoOpSetVerifier} this
	 */
	doesNotContainAll()
	{
		return this;
	}

	/**
	 * @return {NoOpNumberVerifier} a verifier for the Set's size
	 */
	size()
	{
		return new NoOpNumberVerifier();
	}

	/**
	 * @return {NoOpSetVerifier} this
	 */
	sizeConsumer()
	{
		return this;
	}

	/**
	 * @return {NoOpArrayVerifier} a verifier for the Set's elements
	 */
	asArray()
	{
		return new NoOpArrayVerifier();
	}

	/**
	 * @return {NoOpSetVerifier} this
	 */
	asArrayConsumer()
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {NoOpSetVerifier as default};