import ObjectVerifier from "./internal/circular_dependency/ObjectVerifierBase.js";

/**
 * Verifies the requirements of an IP address or hostname.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class InetAddressVerifier extends ObjectVerifier
{
	/**
	 * Ensures that the actual value is an IP v4 address.
	 *
	 * @return {InetAddressVerifier} the updated verifier
	 * @throws {RangeError}  if actual value is not a IP v4 address
	 */
	isIpV4()
	{
		this.validator.isIpV4();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is an IP v6 address.
	 *
	 * @return {InetAddressVerifier} the updated verifier
	 * @throws {RangeError}  if actual value is not a IP v6 address
	 */
	isIpV6()
	{
		this.validator.isIpV6();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is an IP v6 address.
	 *
	 * @return {InetAddressVerifier} the updated verifier
	 * @throws {RangeError}  if actual value is not a hostname
	 * @see <a href="https://tools.ietf.org/html/rfc3696#section-2">rfc3696</a>
	 */
	isHostname()
	{
		this.validator.isHostname();
		return this.validationResult();
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {InetAddressVerifier as default};