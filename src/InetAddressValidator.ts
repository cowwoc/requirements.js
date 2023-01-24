import type {ExtensibleObjectValidator} from "./internal/internal.js";

/**
 * Validates the requirements of an IP address or hostname.
 *
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 *
 * Verifiers and Validators contain corresponding methods. Some exceptions are thrown by both methods.
 * The remaining exceptions that are thrown by the verifier are wrapped as validation failures and are
 * returned by {@link #getFailures}.
 */
interface InetAddressValidator extends ExtensibleObjectValidator<InetAddressValidator>
{
	/**
	 * Ensures that the actual value is an IP v4 address.
	 *
	 * @return {InetAddressValidator} the updated validator
	 */
	isIpV4(): InetAddressValidator;

	/**
	 * Ensures that the actual value is an IP v6 address.
	 *
	 * @return {InetAddressValidator} the updated validator
	 */
	isIpV6(): InetAddressValidator;

	/**
	 * Ensures that the actual value is an IP v6 address.
	 *
	 * @return {InetAddressValidator} the updated validator
	 * @see <a href="https://tools.ietf.org/html/rfc3696#section-2">rfc3696</a>
	 */
	isHostname(): InetAddressValidator;

	getActual(): string | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {InetAddressValidator as default};