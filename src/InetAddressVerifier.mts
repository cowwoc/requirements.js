import type {ObjectVerifier} from "./internal/internal.mjs";

/**
 * Verifies the requirements of an IP address or hostname.
 * <p>
 * All methods (except those found in {@link ObjectVerifier}) imply {@link isNotNull}.
 */
interface InetAddressVerifier extends ObjectVerifier<string>
{
	/**
	 * Ensures that the actual value is an IP v4 address.
	 *
	 * @returns the updated verifier
	 * @throws RangeError  if actual value is not an IP v4 address
	 */
	isIpV4(): InetAddressVerifier;

	/**
	 * Ensures that the actual value is an IP v6 address.
	 *
	 * @returns the updated verifier
	 * @throws RangeError  if actual value is not an IP v6 address
	 */
	isIpV6(): InetAddressVerifier;

	/**
	 * Ensures that the actual value is an IP v6 address.
	 *
	 * @returns the updated verifier
	 * @throws RangeError  if actual value is not a hostname
	 * @see <a href="https://tools.ietf.org/html/rfc3696#section-2">rfc3696</a>
	 */
	isHostname(): InetAddressVerifier;

	/**
	 * {@inheritDoc}
	 */
	getActual(): string;
}

export {type InetAddressVerifier};