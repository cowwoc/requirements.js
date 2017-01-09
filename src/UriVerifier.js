import Utilities from "./Utilities";
import ObjectVerifier from "./ObjectVerifier";
import URI from "urijs";

/**
 * Creates a new UriVerifier.
 *
 * @constructor
 * @param {URI} actual the actual value
 * @param {String} name   the name of the value
 * @param {Configuration} config the instance configuration
 * @throws {TypeError} if {@code name} or {@code config} are null or undefined; if {@code actual} is not a {@code URI}
 * @throws {RangeError} if {@code name} is empty
 * @author Gili Tzabari
 */
function UriVerifier(actual, name, config)
{
	Utilities.verifyValue(actual, "actual", URI);
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
 * @return {UriVerifier} a configuration with the specified exception override
 * @see #getException()
 */
UriVerifier.prototype.withException = function(exception)
{
	const newConfig = this.config.withException(exception);
	if (newConfig === this.config)
		return this;
	return new UriVerifier(this.actual, this.name, newConfig);
};

/**
 * Appends contextual information to the exception message.
 *
 * @param {String} key   a key
 * @param {String} value a value
 * @return {UriVerifier} a new verifier with the specified context
 * @throws {TypeError} if {@code key} is not a String
 * @throws {RangeError} if {@code key} is not set
 */
UriVerifier.prototype.addContext = function(key, value)
{
	const newContext = this.config.addContext(key, value);
	return new UriVerifier(this.actual, this.name, newContext);
};

/**
 * Sets the contextual information to append to the exception message.
 *
 * @param {Array<Object>} context the contextual information
 * @return {UriVerifier} a configuration with the specified context
 * @throws {TypeError} if {@code context} is not an Array
 * @throws {RangeError} if {@code context} is not set
 */
UriVerifier.prototype.withContext = function(context)
{
	const newContext = this.config.withContext(context);
	if (context === this.context)
		return this;
	return new UriVerifier(this.actual, this.name, newContext);
};

/**
 * Ensures that the actual value is equal to a value.
 *
 * @param {Object} expected the expected value
 * @param {String} [name] the name of the expected value
 * @return {UriVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is not equal to value
 */
UriVerifier.prototype.isEqualTo = function(expected, name)
{
	this.asObject.isEqualTo(expected, name);
	return this;
};

/**
 * Ensures that the actual value is not equal to a value.
 *
 * @param {Array} value the value to compare to
 * @param {String} [name] the name of the expected value
 * @return {UriVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is equal to {@code value}
 */
UriVerifier.prototype.isNotEqualTo = function(value, name)
{
	this.asObject.isNotEqualTo(value, name);
	return this;
};

/**
 * Ensures that an array contains the actual value.
 *
 * @param {Array<Array>} array an array
 * @return {UriVerifier} this
 * @throws {TypeError}  if {@code array} is not an {@code Array}
 * @throws {RangeError} if {@code array} does not contain the actual value
 */
UriVerifier.prototype.isInArray = function(array)
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
 * @return {UriVerifier} this
 * @throws {TypeError}  if {@code type} is undefined, null, anonymous function, arrow function or an object
 * @throws {RangeError} if the actual value is not an instance of {@code type}
 */
UriVerifier.prototype.isInstanceOf = function(type)
{
	this.asObject.isInstanceOf(type);
	return this;
};

/**
 * Ensures that the actual value is null.
 *
 * @return {UriVerifier} this
 * @throws {RangeError} if the actual value is not null
 */
UriVerifier.prototype.isNull = function()
{
	this.asObject.isNull();
	return this;
};

/**
 * Ensures that the actual value is not null.
 *
 * @return {UriVerifier} this
 * @throws {RangeError} if the actual value is null
 */
UriVerifier.prototype.isNotNull = function()
{
	this.asObject.isNotNull();
	return this;
};

/**
 * Ensures that the actual value is undefined.
 *
 * @return {UriVerifier} this
 * @throws {RangeError} if the actual value is not undefined
 */
UriVerifier.prototype.isUndefined = function()
{
	this.asObject.isUndefined();
	return this;
};

/**
 * Ensures that the actual value is not undefined.
 *
 * @return {UriVerifier} this
 * @throws {RangeError} if the actual value is undefined
 */
UriVerifier.prototype.isNotUndefined = function()
{
	this.asObject.isUndefined();
	return this;
};

/**
 * Ensures that value is not undefined or null.
 *
 * @return {UriVerifier} this
 * @throws {TypeError} if the value is undefined or null
 */
UriVerifier.prototype.isSet = function()
{
	this.asObject.isSet();
	return this;
};

/**
 * Ensures that value is not undefined or null.
 *
 * @return {UriVerifier} this
 * @throws {TypeError} if the value is not undefined or null
 */
UriVerifier.prototype.isNotSet = function()
{
	this.asObject.isNotSet();
	return this;
};

/**
 * Ensures that the URI is absolute.
 *
 * @return {UriVerifier} this
 * @throws {RangeError} if the path is not absolute
 */
UriVerifier.prototype.isAbsolute = function()
{
	if (!this.actual.is("absolute"))
		throw new RangeError(this.name + " must be absolute: " + this.actual.toString());
	return this;
};

/**
 * Ensures that the URI is relative.
 *
 * @return {UriVerifier} this
 * @throws {RangeError} if the path is not a relative
 */
UriVerifier.prototype.isRelative = function()
{
	if (!this.actual.is("relative"))
		throw new RangeError(this.name + " must be relative: " + this.actual.toString());
	return this;
};

/**
 * @return {StringVerifier} a verifier for the URI's string representation
 */
UriVerifier.prototype.asString = function()
{
	return this.asObject.asString();
};

/**
 * @return {URI} the actual value
 */
UriVerifier.prototype.getActual = function()
{
	return this.actual;
};

export default UriVerifier;