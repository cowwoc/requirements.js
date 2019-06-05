import Configuration from "./Configuration.js";
import ExceptionBuilder from "./internal/ExceptionBuilder.js";
import ObjectVerifier from "./ObjectVerifier.js";

/**
 * @param {string} value a String
 * @return {boolean} true if the String is a valid IPv4 address; false otherwise
 * @ignore
 */
function isIpV4Impl(value)
{
	// See https://blogs.msdn.microsoft.com/oldnewthing/20060522-08/?p=31113
	const match = value.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
	return match !== null && match[1] <= 255 && match[2] <= 255 && match[3] <= 255 && match[4] <= 255;
}

/**
 * @param {string} value a String
 * @return {boolean} true if the String is a valid IPv6 address; false otherwise
 * @ignore
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

	let numberOfColons = 0;
	let numberOfZeroCompressions = 0;
	for (let i = 1; i < components.length; ++i)
	{
		++numberOfColons;
		const component = components[i];
		if (component === "")
			continue;
		if (numberOfColons === 2)
			++numberOfZeroCompressions;
		if (numberOfZeroCompressions > 1 || numberOfColons > 2)
		{
			// Zero compression can only occur once in an address
			return false;
		}
		numberOfColons = 0;
		if (!component.match(/^[\da-f]{1,4}/i))
		{
			// Component must contain 1-4 hex characters
			return false;
		}
	}
	if (numberOfColons === 2)
	{
		++numberOfZeroCompressions;
		numberOfColons = 0;
	}
	// Lines may not end with a colon. If they end with a zero compression, it must have been the first one.
	return numberOfColons === 0 && numberOfZeroCompressions <= 1;
}

/**
 * @param {string} value a String
 * @return {boolean} true if the String is a valid hostname; false otherwise
 * @ignore
 */
function isHostnameImpl(value)
{
	// See http://serverfault.com/a/638270/15584 and https://blogs.msdn.microsoft.com/oldnewthing/20120412-00/?p=7873
	const components = value.split(".");

	// Top-level domain names may not be empty or all-numeric
	const topLevelDomain = components[components.length - 1];
	if (topLevelDomain.match(/^[a-zA-Z-]+$/) === null)
		return false;

	let sum = 0;
	for (let i = 0; i < components.length; ++i)
	{
		const label = components[i];
		// label may not be empty. It must consist of only the ASCII alphabetic and numeric characters, plus the hyphen.
		if (label.match(/^[a-zA-Z0-9-]+$/) === null)
			return false;
		const length = label.length;
		if (length > 63)
			return false;
		if (label.startsWith("-") || label.endsWith("-"))
		{
			// If the hyphen is used, it is not permitted to appear at either the beginning or end of a label.
			return false;
		}
		// Each label is prefixed by a byte denoting its length
		sum += 1 + length;
	}
	// The last label is terminated by a byte denoting a length of zero
	++sum;
	return sum <= 255;
}

/**
 * Verifies an IP address or hostname.
 */
class InetAddressVerifier extends ObjectVerifier
{
	/**
	 * Creates a new InetAddressVerifier.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {string} actual the actual value
	 * @param {string} name   the name of the value
	 * @throws {TypeError} if <code>name</code> or <code>config</code> are null or undefined
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	constructor(configuration, actual, name)
	{
		super(configuration, actual, name);

		if (!isIpV4Impl(actual) && !isIpV6Impl(actual) && !isHostnameImpl(actual))
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain a valid IP address or hostname.").
				addContext("Actual", this.actual).
				build();
		}
	}

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

	/**
	 * Ensures that the actual value is an IP v6 address.
	 *
	 * @return {InetAddressVerifier} this
	 * @throws {RangeError}  if actual value is not a hostname
	 * @see <a href="https://tools.ietf.org/html/rfc3696#section-2">rfc3696</a>
	 */
	isHostname()
	{
		if (isHostnameImpl(this.actual))
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be a hostname.").
			addContext("Actual", this.actual).
			build();
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {InetAddressVerifier as default};