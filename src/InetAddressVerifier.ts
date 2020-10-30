import {
	InetAddressValidator,
	InetAddressValidatorNoOp,
	ObjectVerifier
} from "./internal/internal";

/**
 * Verifies the requirements of an IP address or hostname.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class InetAddressVerifier extends ObjectVerifier<InetAddressValidator | InetAddressValidatorNoOp>
{
	/**
	 * Ensures that the actual value is an IP v4 address.
	 *
	 * @return {InetAddressVerifier} the updated verifier
	 * @throws {RangeError}  if actual value is not a IP v4 address
	 */
	isIpV4(): this
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
	isIpV6(): this
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
	isHostname(): this
	{
		this.validator.isHostname();
		return this.validationResult();
	}

	getActual(): string
	{
		return super.getActual() as string;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {InetAddressVerifier as default};