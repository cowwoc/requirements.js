import NoOpObjectVerifier from "./NoOpObjectVerifier.js";

/**
 * An implementation of <code>UriVerifier</code> that does nothing.
 */
class NoOpUriVerifier extends NoOpObjectVerifier
{
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

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {NoOpUriVerifier as default};