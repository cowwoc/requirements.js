import NoOpObjectVerifier from "./internal/NoOpObjectVerifier";

/**
 * An implementation of <code>InetAddressVerifier</code> that does nothing.
 *
 * @class
 * @author Gili Tzabari
 */
class NoOpInetAddressVerifier extends NoOpObjectVerifier {
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

export default NoOpInetAddressVerifier;