import type {ObjectAsserter} from "./internal/internal.mjs";

/**
 * Verifies the requirements of an IP address or hostname.
 *
 * All methods (except those found in {@link ObjectAsserter}) imply {@link #isNotNull()}.
 *
 * Asserters throw the same exceptions as Verifiers if and only if
 * {@link GlobalConfiguration#assertionsAreEnabled assertions are enabled}.
 */
interface InetAddressAsserter extends ObjectAsserter
{
	/**
	 * Ensures that the actual value is an IP v4 address.
	 *
	 * @return {InetAddressAsserter} the updated asserter
	 * @throws {RangeError}  if actual value is not a IP v4 address
	 */
	isIpV4(): InetAddressAsserter;

	/**
	 * Ensures that the actual value is an IP v6 address.
	 *
	 * @return {InetAddressAsserter} the updated asserter
	 * @throws {RangeError}  if actual value is not a IP v6 address
	 */
	isIpV6(): InetAddressAsserter;

	/**
	 * Ensures that the actual value is an IP v6 address.
	 *
	 * @return {InetAddressAsserter} the updated asserter
	 * @throws {RangeError}  if actual value is not a hostname
	 * @see <a href="https://tools.ietf.org/html/rfc3696#section-2">rfc3696</a>
	 */
	isHostname(): InetAddressAsserter;

	getActual(): string | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {InetAddressAsserter as default};