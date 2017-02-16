import NoOpObjectVerifier from "./NoOpObjectVerifierSuperclass";

/**
 * An implementation of {@code InetAddressVerifier} that does nothing.
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
}

export default NoOpInetAddressVerifier;