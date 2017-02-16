import ExceptionBuilder from "./ExceptionBuilder";
import ObjectVerifier from "./ObjectVerifierSuperclass";

/**
 * @param {String} value a String
 * @return {Boolean} true if the String is a valid IPv6 address; false otherwise
 */
function isIpV6Impl(value)
{
	// See https://blogs.msdn.microsoft.com/oldnewthing/20060522-08/?p=31113 and
	// https://4sysops.com/archives/ipv6-tutorial-part-4-ipv6-address-syntax/
	const components = value.split(":");
	if (components.length < 2 || components.length > 8)
		return false;
	if (components[0] !== "" || components[1] !== "")
	{
		// Address does not begin with a zero compression ("::")
		if (!components[0].match(/^[\da-f]{1,4}/i))
		{
			// Component must contain 1-4 hex characters
			return false;
		}
	}

	let numberOfZeroCompressions = 0;
	for (let i = 1; i < components.length; ++i)
	{
		if (components[i] === "")
		{
			// We're inside a zero compression ("::")
			++numberOfZeroCompressions;
			if (numberOfZeroCompressions > 1)
			{
				// Zero compression can only occur once in an address
				return false;
			}
			continue;
		}
		if (!components[i].match(/^[\da-f]{1,4}/i))
		{
			// Component must contain 1-4 hex characters
			return false;
		}
	}
	return true;
}

/**
 * Verifies an IP address or hostname.
 *
 * @class
 * @author Gili Tzabari
 */
class InetAddressVerifier extends ObjectVerifier {
	/**
	 * Ensures that the actual value is an IP v4 address.
	 *
	 * @return {InetAddressVerifier} this
	 * @throws {RangeError}  if actual value is not a IP v4 address
	 */
	isIpV4()
	{
		// See https://blogs.msdn.microsoft.com/oldnewthing/20060522-08/?p=31113
		const match = this.actual.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
		if (match !== null && match[1] <= 255 && match[2] <= 255 && match[3] <= 255 && match[4] <= 255)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be an IP v4 address.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is an IP v6 address.
	 *
	 * @return {InetAddressVerifier} this
	 * @throws {RangeError}  if actual value is not a IP v6 address
	 */
	isIpV6()
	{
		if (isIpV6Impl(this.actual))
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be an IP v6 address.").
			addContext("Actual", this.actual).
			build();
	}
}

export default InetAddressVerifier;