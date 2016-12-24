import Utilities from "./Utilities";
import Pluralizer from "./Pluralizer";
import ObjectVerifier from "./ObjectVerifier";
import ContainerSizeVerifier from "./ContainerSizeVerifier";

/**
 * Creates a new StringVerifier.
 *
 * @constructor
 * @param {String} actual the actual value
 * @param {String} name   the name of the value
 * @param {Configuration} config the instance configuration
 *
 * @property {String} actual the actual value
 * @property {String} name the name of the value
 * @property {Configuration} config the instance configuration
 * @author Gili Tzabari
 */
function StringVerifier(actual, name, config)
{
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
StringVerifier.prototype = Object.create(StringVerifier.prototype);
StringVerifier.prototype.constructor = StringVerifier;

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
 * @param {Array<Object>} context the contextual information
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
	if (trimmed == this.actual)
		return this;
	return new StringVerifier(trimmed, this.name, this.config);
};

/**
 * @return {ContainerSizeVerifier} a verifier for the length of the string
 */
StringVerifier.prototype.length = function()
{
	return new ContainerSizeVerifier(this.actual, this.actual.length(), name, name + ".length()", Pluralizer.CHARACTER,
		this.config);
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
 * @param {Array<Array>} array an array
 * @return {StringVerifier} this
 * @throws {TypeError}  if {@code array} is not an {@code Array}
 * @throws {RangeError} if {@code array} does not contain the actual value
 */
StringVerifier.prototype.isIn = function(array)
{
	this.asObject.isIn(array);
	return this;
};

/**
 * Ensures that the actual value is an instance of a type.
 *
 * @param type the type  to compare to
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
 * Verifies a String.
 *
 * @return {StringVerifier} a {@code String} verifier
 * @throws {TypeError}  if the value is not a {@code String}
 */
StringVerifier.prototype.asString = function()
{
	return this;
};

// TODO:
// asEmailAddress
// asInetAddress
// asUri
// getActual()
// getActualIfPresent()

export default StringVerifier;