import NoOpObjectVerifier from "./NoOpObjectVerifier";

/**
 * An implementation of <code>ClassVerifier</code> that does nothing.
 */
class NoOpClassVerifier extends NoOpObjectVerifier
{
	/**
	 * @return {NoOpClassVerifier} this
	 */
	isSubTypeOf()
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {NoOpClassVerifier as default};