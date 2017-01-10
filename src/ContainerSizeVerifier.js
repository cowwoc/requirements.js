import NumberVerifier from "./NumberVerifier";
import Utilities from "./Utilities";

/**
 * Creates a new ContainerSizeVerifier.
 *
 * @constructor
 * @param {Object} container the container
 * @param {Number} size the size of the container
 * @param {String} containerName the name of the container
 * @param {String} sizeName the name of the container size
 * @param {Pluralizer} pluralizer returns the singular or plural form of the container's element type
 * @param {Configuration} config the instance configuration
 * @throws {TypeError} if {@code containerName}, {@code sizeName}, {@code config} are undefined or null; if
 * {@code containerName} or {@code sizeName} are not a String
 * @throws {RangeError} if {@code containerName} or {@code sizeName} are empty
 * @author Gili Tzabari
 */
function ContainerSizeVerifier(container, size, containerName, sizeName, pluralizer, config)
{
	Utilities.verifyValue(size, "size", Number);
	Utilities.verifyName(containerName, "containerName");
	Utilities.verifyName(sizeName, "sizeName");
	Object.defineProperty(this, "container",
		{
			value: container
		});
	Object.defineProperty(this, "size",
		{
			value: size
		});
	Object.defineProperty(this, "containerName",
		{
			value: containerName
		});
	Object.defineProperty(this, "sizeName",
		{
			value: sizeName
		});
	Object.defineProperty(this, "pluralizer",
		{
			value: pluralizer
		});
	Object.defineProperty(this, "config",
		{
			value: config
		});
	Object.defineProperty(this, "asNumber",
		{
			value: new NumberVerifier(size, sizeName, config)
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
 * @return {ContainerSizeVerifier} a configuration with the specified exception override
 * @see #getException()
 */
ContainerSizeVerifier.prototype.withException = function(exception)
{
	const newConfig = this.config.withException(exception);
	if (newConfig === this.config)
		return this;
	return new ContainerSizeVerifier(this.container, this.size, this.containerName, this.sizeName, this.pluralizer,
		newConfig);
};

/**
 * Appends contextual information to the exception message.
 *
 * @param {String} key   a key
 * @param {String} value a value
 * @return {ContainerSizeVerifier} a new verifier with the specified context
 * @throws {TypeError} if {@code key} is not a String
 * @throws {RangeError} if {@code key} is not set
 */
ContainerSizeVerifier.prototype.addContext = function(key, value)
{
	const newConfig = this.config.addContext(key, value);
	return new ContainerSizeVerifier(this.container, this.size, this.containerName, this.sizeName, this.pluralizer,
		newConfig);
};

/**
 * Sets the contextual information to append to the exception message.
 *
 * @param {Array.<Array>} context a list of key-value pairs to append to the exception message
 * @return {ContainerSizeVerifier} a configuration with the specified context
 * @throws {TypeError} if {@code context} is not an Array
 * @throws {RangeError} if {@code context} is not set
 */
ContainerSizeVerifier.prototype.withContext = function(context)
{
	const newConfig = this.config.withContext(context);
	if (context === this.context)
		return this;
	return new ContainerSizeVerifier(this.container, this.size, this.containerName, this.sizeName, this.pluralizer,
		newConfig);
};

/**
 * Ensures that the actual value is equal to a value.
 *
 * @param {Array} expected the expected value
 * @param {String} [name] the name of the expected value
 * @return {ContainerSizeVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is not equal to value
 */
ContainerSizeVerifier.prototype.isEqualTo = function(expected, name)
{
	this.asNumber.isEqualTo(expected, name);
	return this;
};

/**
 * Ensures that the actual value is not equal to a value.
 *
 * @param {Array} value the value to compare to
 * @param {String} [name] the name of the expected value
 * @return {ContainerSizeVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is equal to {@code value}
 */
ContainerSizeVerifier.prototype.isNotEqualTo = function(value, name)
{
	this.asNumber.isNotEqualTo(value, name);
	return this;
};

/**
 * Ensures that an array contains the actual value.
 *
 * @param {Array.<Array>} array an array
 * @return {ContainerSizeVerifier} this
 * @throws {TypeError}  if {@code array} is null
 * @throws {RangeError} if {@code array} does not contain the actual value
 */
ContainerSizeVerifier.prototype.isInArray = function(array)
{
	this.asNumber.isInArray(array);
	return this;
};

/**
 * Ensures that the actual value is an instance of a type.
 *
 * Primitive types are wrapped before evaluation. For example, "someValue" is treated as a String object.
 *
 * @param {Function} type the type to compare to
 * @return {ContainerSizeVerifier} this
 * @throws {TypeError}  if {@code type} is null
 * @throws {RangeError} if the actual value is not an instance of {@code type}
 */
ContainerSizeVerifier.prototype.isInstanceOf = function(type)
{
	this.asNumber.isInstanceOf(type);
	return this;
};

/**
 * Ensures that the actual value is null.
 *
 * @return {ContainerSizeVerifier} this
 * @throws {RangeError} if the actual value is not null
 */
ContainerSizeVerifier.prototype.isNull = function()
{
	this.asNumber.isNull();
	return this;
};

/**
 * Ensures that the actual value is not null.
 *
 * @return {ContainerSizeVerifier} this
 * @throws {RangeError} if the actual value is null
 */
ContainerSizeVerifier.prototype.isNotNull = function()
{
	this.asNumber.isNotNull();
	return this;
};

/**
 * Ensures that the actual value is undefined.
 *
 * @return {ContainerSizeVerifier} this
 * @throws {RangeError} if the actual value is not undefined
 */
ContainerSizeVerifier.prototype.isUndefined = function()
{
	this.asNumber.isUndefined();
	return this;
};

/**
 * Ensures that the actual value is not undefined.
 *
 * @return {ContainerSizeVerifier} this
 * @throws {RangeError} if the actual value is undefined
 */
ContainerSizeVerifier.prototype.isNotUndefined = function()
{
	this.asNumber.isNotUndefined();
	return this;
};

/**
 * Ensures that value is not undefined or null.
 *
 * @return {ContainerSizeVerifier} this
 * @throws {TypeError} if the value is undefined or null
 */
ContainerSizeVerifier.prototype.isSet = function()
{
	this.asNumber.isSet();
	return this;
};

/**
 * Ensures that the actual value is greater than a value.
 *
 * @param {Number} value the lower bound
 * @param {String} [name]  the name of the lower bound
 * @return {ContainerSizeVerifier} this
 * @throws {TypeError}      if {@code value} or {@code name} are null
 * @throws {RangeError}  if the actual value is less than or equal to {@code value}; if {@code name} is empty
 */
ContainerSizeVerifier.prototype.isGreaterThan = function(value, name)
{
	this.asNumber.isGreaterThan(value, name);
	return this;
};

/**
 * Ensures that the actual value is greater than or equal to a value.
 *
 * @param {Number} value the minimum value
 * @param {String} [name]  the name of the minimum value
 * @return {ContainerSizeVerifier} this
 * @throws {TypeError}      if {@code value} or {@code name} are null
 * @throws {RangeError}  if the actual value is less than {@code value}; if {@code name} is empty
 */
ContainerSizeVerifier.prototype.isGreaterThanOrEqualTo = function(value, name)
{
	this.asNumber.isGreaterThanOrEqualTo(value, name);
	return this;
};

/**
 * Ensures that the actual value is less than a value.
 *
 * @param {Number} value the upper bound
 * @param {String} [name]  the name of the upper bound
 * @return {ContainerSizeVerifier} this
 * @throws {TypeError}      if {@code value} or {@code name} are null
 * @throws {RangeError}  if the actual value is greater than or equal to {@code value}; if {@code name} is empty
 */
ContainerSizeVerifier.prototype.isLessThan = function(value, name)
{
	this.asNumber.isLessThan(value, name);
	return this;
};

/**
 * Ensures that the actual value is less or equal to a value.
 *
 * @param {Number} value the maximum value
 * @param {String} [name]  the name of the maximum value
 * @return {ContainerSizeVerifier} this
 * @throws {TypeError}      if {@code value} or {@code name} are null
 * @throws {RangeError}  if the actual value is greater than {@code value}; if {@code name} is empty
 */
ContainerSizeVerifier.prototype.isLessThanOrEqualTo = function(value, name)
{
	this.asNumber.isLessThanOrEqualTo(value, name);
	return this;
};

/**
 * Ensures that the actual value is within range.
 *
 * @param {Number} min the minimum value (inclusive)
 * @param {Number} max  the maximum value (inclusive)
 * @return {ContainerSizeVerifier} this
 * @throws {TypeError}      if any of the arguments are null
 * @throws {RangeError}  if {@code last} is less than {@code first}; if
 *                                  the actual value is not in range
 */
ContainerSizeVerifier.prototype.isInRange = function(min, max)
{
	this.asNumber.isInRange(min, max);
	return this;
};

/**
 * @return {StringVerifier} a verifier for the number's string representation
 */
ContainerSizeVerifier.prototype.asString = function()
{
	return this.asNumber.asString();
};

/**
 * @return {Number} the actual value
 */
ContainerSizeVerifier.prototype.getActual = function()
{
	return this.actual;
};

export default ContainerSizeVerifier;