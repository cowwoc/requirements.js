import ObjectVerifier from "./ObjectVerifier";
import Utilities from "./Utilities";

/**
 * Creates a new InetAddressVerifier.
 *
 * @constructor
 * @param {String} actual the actual value
 * @param {String} name   the name of the value
 * @param {Configuration} config the instance configuration
 * @throws {TypeError} if {@code name} or {@code config} are null or undefined; if {@code actual} is not a
 * {@code String}
 * @throws {RangeError} if {@code name} is empty
 * @author Gili Tzabari
 */
function InetAddressVerifier(actual, name, config)
{
	Utilities.verifyValue(actual, "actual", String);
	Utilities.verifyName(name, "name");
	Object.defineProperty(this, "actual",
		{
			value: actual
		});
	Object.defineProperty(this, "name",
		{
			value: name
		});
	Object.defineProperty(this, "config",
		{
			value: config
		});
	Object.defineProperty(this, "asObject",
		{
			value: new ObjectVerifier(this.actual, this.name, config)
		});
}

/**
 * Overrides the type of exception that will get thrown if a requirement fails.
 * <p>
 * The exception class must define the following constructors:
 * <p>
 * {@code <init>(String message)}
 *
 * @param {Error} exception the type of exception to throw, {@code null} to throw the default exception
 *                  type
 * @return {InetAddressVerifier} a configuration with the specified exception override
 * @see #getException()
 */
InetAddressVerifier.prototype.withException = function(exception)
{
	const newConfig = this.config.withException(exception);
	if (newConfig === this.config)
		return this;
	return new InetAddressVerifier(this.actual, this.name, newConfig);
};

/**
 * Appends contextual information to the exception message.
 *
 * @param {String} key   a key
 * @param {String} value a value
 * @return {InetAddressVerifier} a new verifier with the specified context
 * @throws {TypeError} if {@code key} is not a String
 * @throws {RangeError} if {@code key} is not set
 */
InetAddressVerifier.prototype.addContext = function(key, value)
{
	const newContext = this.config.addContext(key, value);
	return new InetAddressVerifier(this.actual, this.name, newContext);
};

/**
 * Sets the contextual information to append to the exception message.
 *
 * @param {Array.<Array>} context a list of key-value pairs to append to the exception message
 * @return {InetAddressVerifier} a configuration with the specified context
 * @throws {TypeError} if {@code context} is not an Array
 * @throws {RangeError} if {@code context} is not set
 */
InetAddressVerifier.prototype.withContext = function(context)
{
	const newContext = this.config.withContext(context);
	if (context === this.context)
		return this;
	return new InetAddressVerifier(this.actual, this.name, newContext);
};

/**
 * Ensures that the actual value is equal to a value.
 *
 * @param {Object} expected the expected value
 * @param {String} [name] the name of the expected value
 * @return {InetAddressVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is not equal to value
 */
InetAddressVerifier.prototype.isEqualTo = function(expected, name)
{
	this.asObject.isEqualTo(expected, name);
	return this;
};

/**
 * Ensures that the actual value is not equal to a value.
 *
 * @param {Array} value the value to compare to
 * @param {String} [name] the name of the expected value
 * @return {InetAddressVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is equal to {@code value}
 */
InetAddressVerifier.prototype.isNotEqualTo = function(value, name)
{
	this.asObject.isNotEqualTo(value, name);
	return this;
};

/**
 * Ensures that an array contains the actual value.
 *
 * @param {Array.<Array>} array an array
 * @return {InetAddressVerifier} this
 * @throws {TypeError}  if {@code array} is not an {@code Array}
 * @throws {RangeError} if {@code array} does not contain the actual value
 */
InetAddressVerifier.prototype.isInArray = function(array)
{
	this.asObject.isInArray(array);
	return this;
};

/**
 * Ensures that the actual value is an instance of a type.
 *
 * Primitive types are wrapped before evaluation. For example, "someValue" is treated as a String object.
 *
 * @param {Function} type the type to compare to
 * @return {InetAddressVerifier} this
 * @throws {TypeError}  if {@code type} is null
 * @throws {RangeError} if the actual value is not an instance of {@code type}
 */
InetAddressVerifier.prototype.isInstanceOf = function(type)
{
	this.asObject.isInstanceOf(type);
	return this;
};

/**
 * Ensures that the actual value is null.
 *
 * @return {InetAddressVerifier} this
 * @throws {RangeError} if the actual value is not null
 */
InetAddressVerifier.prototype.isNull = function()
{
	this.asObject.isNull();
	return this;
};

/**
 * Ensures that the actual value is not null.
 *
 * @return {InetAddressVerifier} this
 * @throws {RangeError} if the actual value is null
 */
InetAddressVerifier.prototype.isNotNull = function()
{
	this.asObject.isNotNull();
	return this;
};

/**
 * @return {StringVerifier} a {@code String} verifier for the address' string representation
 */
InetAddressVerifier.prototype.asString = function()
{
	return this.asObject.asString();
};

/**
 * @param {Function} consumer a function that accepts a {@code StringVerifier} for the number's string representation
 * @return {InetAddressVerifier} this
 * @throws {TypeError} if {@code consumer} is not set
 */
InetAddressVerifier.prototype.asStringConsumer = function(consumer)
{
	this.asObject.asStringConsumer(consumer);
	return this;
};

/**
 * Ensures that the actual value is an IP v4 address.
 *
 * @return {InetAddressVerifier} this
 * @throws {RangeError}  if actual value is not a IP v4 address
 */
InetAddressVerifier.prototype.isIpV4 = function()
{
	// See https://blogs.msdn.microsoft.com/oldnewthing/20060522-08/?p=31113
	const match = this.actual.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
	if (match !== null && match[1] <= 255 && match[2] <= 255 && match[3] <= 255 && match[4] <= 255)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must be an IP v4 address.").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value is an IP v6 address.
 *
 * @return {InetAddressVerifier} this
 * @throws {RangeError}  if actual value is not a IP v6 address
 */
InetAddressVerifier.prototype.isIpV6 = function()
{
	if (isIpV6(this.actual))
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must be an IP v6 address.").
		addContext("Actual", this.actual).
		build();
};

/**
 * @param {String} value a String
 * @return {Boolean} true if the String is a valid IPv6 address; false otherwise
 */
function isIpV6(value)
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
 * @return {String} the actual value
 */
InetAddressVerifier.prototype.getActual = function()
{
	return this.actual;
};

export default InetAddressVerifier;