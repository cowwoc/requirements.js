import NoOpObjectVerifier from "./NoOpObjectVerifierSuperclass";

/**
 * An implementation of {@code UriVerifier} that does nothing.
 *
 * @class
 * @author Gili Tzabari
 */
class NoOpUriVerifier extends NoOpObjectVerifier {
	/**
	 * @return {NoOpUriVerifier} this
	 */
	isAbsolute()
	{
		return this;
	}

	/**
	 * @return {NoOpUriVerifier} this
	 */
	isRelative()
	{
		return this;
	}
}

export default NoOpUriVerifier;