import NoOpObjectVerifier from "./NoOpObjectVerifier.js";

/**
 * An implementation of <code>InetAddressVerifier</code> that does nothing.
 */
class NoOpInetAddressVerifier extends NoOpObjectVerifier
{
	/**
	 * @return {NoOpInetAddressVerifier} this
	 */
	isIpV4()
	{
		return this;
	}

	/**
	 * @return {NoOpInetAddressVerifier} this
	 */
	isIpV6()
	{
		return this;
	}

	/**
	 * @return {NoOpInetAddressVerifier} this
	 */
	isHostname()
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {NoOpInetAddressVerifier as default};