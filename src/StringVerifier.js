import ContainerSizeVerifier from "./ContainerSizeVerifier";
import InetAddress from "./InetAddressVerifier";
import ObjectVerifier from "./ObjectVerifier";
import Pluralizer from "./Pluralizer";
import URI from "urijs";
import UriVerifier from "./UriVerifier";
import Utilities from "./Utilities";

// See http://stackoverflow.com/a/9209720/14731
const INTERNET_ADDRESS = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^(?:(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){6})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:::(?:(?:(?:[0-9a-fA-F]{1,4})):){5})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})))?::(?:(?:(?:[0-9a-fA-F]{1,4})):){4})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,1}(?:(?:[0-9a-fA-F]{1,4})))?::(?:(?:(?:[0-9a-fA-F]{1,4})):){3})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,2}(?:(?:[0-9a-fA-F]{1,4})))?::(?:(?:(?:[0-9a-fA-F]{1,4})):){2})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,3}(?:(?:[0-9a-fA-F]{1,4})))?::(?:(?:[0-9a-fA-F]{1,4})):)(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,4}(?:(?:[0-9a-fA-F]{1,4})))?::)(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,5}(?:(?:[0-9a-fA-F]{1,4})))?::)(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,6}(?:(?:[0-9a-fA-F]{1,4})))?::))))$/;

/**
 * Creates a new StringVerifier.
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
function StringVerifier(actual, name, config)
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
 * @return {StringVerifier} a configuration with the specified exception override
 * @see #getException()
 */
StringVerifier.prototype.withException = function(exception)
{
	const newConfig = this.config.withException(exception);
	if (newConfig === this.config)
		return this;
	return new StringVerifier(this.actual, this.name, newConfig);
};

/**
 * Appends contextual information to the exception message.
 *
 * @param {String} key   a key
 * @param {String} value a value
 * @return {StringVerifier} a new verifier with the specified context
 * @throws {TypeError} if {@code key} is not a String
 * @throws {RangeError} if {@code key} is not set
 */
StringVerifier.prototype.addContext = function(key, value)
{
	const newContext = this.config.addContext(key, value);
	return new StringVerifier(this.actual, this.name, newContext);
};

/**
 * Sets the contextual information to append to the exception message.
 *
 * @param {Array.<Array>} context a list of key-value pairs to append to the exception message
 * @return {StringVerifier} a configuration with the specified context
 * @throws {TypeError} if {@code context} is not an Array
 * @throws {RangeError} if {@code context} is not set
 */
StringVerifier.prototype.withContext = function(context)
{
	const newContext = this.config.withContext(context);
	if (context === this.context)
		return this;
	return new StringVerifier(this.actual, this.name, newContext);
};

/**
 * Ensures that the actual value starts with a value.
 *
 * @param {String} prefix the value that the string must start with
 * @return {StringVerifier} this
 * @throws {RangeError} if the actual value does not start with {@code prefix}
 */
StringVerifier.prototype.startsWith = function(prefix)
{
	if (this.actual.startsWith(prefix))
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must start with \"" + Utilities.toString(prefix) +
		"\".").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value does not start with a value.
 *
 * @param {String} prefix the value that the string may not start with
 * @return {StringVerifier} this
 * @throws {RangeError} if the actual value does not start with {@code prefix}
 */
StringVerifier.prototype.doesNotStartWith = function(prefix)
{
	if (this.actual.startsWith(prefix))
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " may not start with \"" + Utilities.toString(prefix) +
		"\".").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value ends with a value.
 *
 * @param {String} suffix the value that the string must end with
 * @return {StringVerifier} this
 * @throws {RangeError} if the actual value does not end with {@code suffix}
 */
StringVerifier.prototype.endsWith = function(suffix)
{
	if (this.actual.endsWith(suffix))
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must end with \"" + Utilities.toString(suffix) +
		"\".").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value does not end with a value.
 *
 * @param {String} suffix the value that the string may not end with
 * @return {StringVerifier} this
 * @throws {RangeError} if the actual value does not start with {@code suffix}
 */
StringVerifier.prototype.doesNotStartWith = function(suffix)
{
	if (this.actual.endsWith(suffix))
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " may not end with \"" + Utilities.toString(suffix) +
		"\".").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the value is an empty string.
 *
 * @return {StringVerifier} this
 * @throws {RangeError} if the value is not an empty string
 */
StringVerifier.prototype.isEmpty = function()
{
	if (this.actual.length === 0)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must be empty.").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the value is not an empty string.
 *
 * @return {StringVerifier} this
 * @throws {RangeError} if the value is an empty string
 */
StringVerifier.prototype.isNotEmpty = function()
{
	if (this.actual.length > 0)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " may not be empty").
		build();
};


/**
 * Trims whitespace at the beginning and end of the actual value.
 *
 * @return {StringVerifier} a verifier with the actual value trimmed
 */
StringVerifier.prototype.trim = function()
{
	const trimmed = this.actual.trim();
	if (trimmed === this.actual)
		return this;
	return new StringVerifier(trimmed, this.name, this.config);
};

/**
 * @return {ContainerSizeVerifier} a verifier for the length of the string
 */
StringVerifier.prototype.length = function()
{
	return new ContainerSizeVerifier(this.actual, this.actual.length, this.name, this.name + ".length",
		Pluralizer.CHARACTER, this.config);
};

/**
 * @param {Function<ContainerSizeVerifier>} consumer a function that accepts a verifier for the length of the string
 * @return {StringVerifier} this
 * @throws {TypeError} if {@code consumer} is not set
 */
StringVerifier.prototype.lengthConsumer = function(consumer)
{
	this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
	consumer(this.length());
	return this;
};

/**
 * Ensures that the actual value is equal to a value.
 *
 * @param {Object} expected the expected value
 * @param {String} [name] the name of the expected value
 * @return {StringVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is not equal to value
 */
StringVerifier.prototype.isEqualTo = function(expected, name)
{
	this.asObject.isEqualTo(expected, name);
	return this;
};

/**
 * Ensures that the actual value is not equal to a value.
 *
 * @param {Array} value the value to compare to
 * @param {String} [name] the name of the expected value
 * @return {StringVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is equal to {@code value}
 */
StringVerifier.prototype.isNotEqualTo = function(value, name)
{
	this.asObject.isNotEqualTo(value, name);
	return this;
};

/**
 * Ensures that an array contains the actual value.
 *
 * @param {Array.<Array>} array an array
 * @return {StringVerifier} this
 * @throws {TypeError}  if {@code array} is not an {@code Array}
 * @throws {RangeError} if {@code array} does not contain the actual value
 */
StringVerifier.prototype.isInArray = function(array)
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
 * @return {StringVerifier} this
 * @throws {TypeError}  if {@code type} is null
 * @throws {RangeError} if the actual value is not an instance of {@code type}
 */
StringVerifier.prototype.isInstanceOf = function(type)
{
	this.asObject.isInstanceOf(type);
	return this;
};

/**
 * Ensures that the actual value is null.
 *
 * @return {StringVerifier} this
 * @throws {RangeError} if the actual value is not null
 */
StringVerifier.prototype.isNull = function()
{
	this.asObject.isNull();
	return this;
};

/**
 * Ensures that the actual value is not null.
 *
 * @return {StringVerifier} this
 * @throws {RangeError} if the actual value is null
 */
StringVerifier.prototype.isNotNull = function()
{
	this.asObject.isNotNull();
	return this;
};

/**
 * Ensures that the actual value starts with a value.
 *
 * @param {String} prefix the value that the string must start with
 * @return {StringVerifier} this
 * @throws {RangeError} if the actual value does not start with {@code prefix}
 */
StringVerifier.prototype.startsWith = function(prefix)
{
	this.config.internalVerifier.requireThat(prefix, "prefix").isInstanceOf(String);
	if (this.actual.startsWith(prefix))
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must start with \"" + prefix + "\".").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value does not start with a value.
 *
 * @param {String} prefix the value that the string must not start with
 * @return {StringVerifier} this
 * @throws {RangeError} if the actual value starts with {@code prefix}
 */
StringVerifier.prototype.doesNotStartWith = function(prefix)
{
	this.config.internalVerifier.requireThat(prefix, "prefix").isInstanceOf(String);
	if (!this.actual.startsWith(prefix))
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " may not start with \"" + prefix + "\".").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value ends with a value.
 *
 * @param {String} suffix the value that the string must end with
 * @return {StringVerifier} this
 * @throws {RangeError} if the actual value does not end with {@code suffix}
 */
StringVerifier.prototype.endsWith = function(suffix)
{
	this.config.internalVerifier.requireThat(suffix, "prefix").isInstanceOf(String);
	if (this.actual.endsWith(suffix))
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must end with \"" + suffix + "\".").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value does not end with a value.
 *
 * @param {String} suffix the value that the string must not end with
 * @return {StringVerifier} this
 * @throws {RangeError} if the actual value ends with {@code prefix}
 */
StringVerifier.prototype.doesNotEndWith = function(suffix)
{
	this.config.internalVerifier.requireThat(suffix, "prefix").isInstanceOf(String);
	if (!this.actual.endsWith(suffix))
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " may not end with \"" + suffix + "\".").
		addContext("Actual", this.actual).
		build();
};

/**
 * @return {StringVerifier} this
 */
StringVerifier.prototype.asString = function()
{
	return this;
};

/**
 * Ensures that the actual value contains a valid Internet address format.
 *
 * @return {InetAddressVerifier} a verifier for Internet addresses
 * @throws {RangeError} if the actual value does not contain a valid Internet address format
 */
StringVerifier.prototype.asInetAddress = function()
{
	if (INTERNET_ADDRESS.test(this.actual))
		return new InetAddress(this.actual, this.name, this.config);
	throw this.config.exceptionBuilder(RangeError, this.name + " must contain a valid IP address or hostname.").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value contains a valid URI format.
 *
 * @return {UriVerifier} a verifier for URIs
 */
StringVerifier.prototype.asUri = function()
{
	return new UriVerifier(new URI(this.actual), this.name, this.config);
};

/**
 * @return {String} the actual value
 */
StringVerifier.prototype.getActual = function()
{
	return this.actual;
};

export default StringVerifier;