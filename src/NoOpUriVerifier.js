import NoOpObjectVerifier from "./internal/NoOpObjectVerifier";

/**
 * An implementation of <code>UriVerifier</code> that does nothing.
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