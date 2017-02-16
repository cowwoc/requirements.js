import NoOpContainerSizeVerifier from "./NoOpContainerSizeVerifier";
import NoOpObjectVerifier from "./NoOpObjectVerifierSuperclass";
import NoOpSetVerifier from "./NoOpSetVerifier";

/**
 * An implementation of {@code ArrayVerifier} that does nothing.
 *
 * @class
 * @author Gili Tzabari
 */
class NoOpArrayVerifier extends NoOpObjectVerifier {
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
	contains()
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
	length()
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
	 * @return {NoOpSetVerifier} a {@code Set} verifier
	 */
	asSet()
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

export default NoOpArrayVerifier;