import NoOpContainerSizeVerifier from "./NoOpContainerSizeVerifier";
import NoOpInetAddressVerifier from "./NoOpInetAddressVerifier";
import NoOpObjectVerifier from "./NoOpObjectVerifierSuperclass";
import NoOpUriVerifier from "./NoOpUriVerifier";

/**
 * An implementation of <code>String</code> that does nothing.
 *
 * @class
 * @author Gili Tzabari
 */
class NoOpStringVerifier extends NoOpObjectVerifier {
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
	 * @return {ContainerSizeVerifier} a verifier for the length of the string
	 */
	length()
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
	 * @return {NoOpInetAddressVerifier} a verifier for the value's Internet address representation
	 */
	asInetAddress()
	{
		return new NoOpInetAddressVerifier();
	}

	/**
	 * @return {NoOpStringVerifier} this
	 */
	asInetAddressConsumer()
	{
		return this;
	}

	/**
	 * @return {NoOpUriVerifier} a verifier for the value's URI representation
	 */
	asUri()
	{
		return new NoOpUriVerifier();
	}

	/**
	 * @return {NoOpStringVerifier} this
	 */
	asUriConsumer()
	{
		return this;
	}
}

export default NoOpStringVerifier;