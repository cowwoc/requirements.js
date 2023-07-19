import type {ExtensibleObjectValidator} from "./internal/internal.mjs";

/**
 * Validates the requirements of an IP address or hostname.
 *
 * Verifier and Validator methods are equivalent.
 * Validators return validation failures through the
 * {@link ExtensibleObjectValidator.getFailures | getFailures()} method, while Verifiers throw them as
 * exceptions.
 *
 * All methods (except those found in {@link ObjectValidator}) imply {@link isNotNull}.
 */
interface InetAddressValidator extends ExtensibleObjectValidator<InetAddressValidator>
{
	/**
	 * Ensures that the actual value is an IP v4 address.
	 *
	 * @returns the updated validator
	 */
	isIpV4(): InetAddressValidator;

	/**
	 * Ensures that the actual value is an IP v6 address.
	 *
	 * @returns the updated validator
	 */
	isIpV6(): InetAddressValidator;

	/**
	 * Ensures that the actual value is an IP v6 address.
	 *
	 * @returns the updated validator
	 * @see <a href="https://tools.ietf.org/html/rfc3696#section-2">rfc3696</a>
	 */
	isHostname(): InetAddressValidator;

	getActual(): string | void;
}

export {type InetAddressValidator};