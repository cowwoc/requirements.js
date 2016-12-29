import ObjectVerifier from "./ObjectVerifier";
import Utilities from "./Utilities";

/**
 * Creates a new NumberVerifier.
 *
 * @constructor
 * @param {Number} actual the actual value
 * @param {String} name   the name of the value
 * @param {Configuration} config the instance configuration
 * @throws {TypeError} if {@code name} or {@code config} are null or undefined
 * @throws {RangeError} if {@code name} is empty
 * @author Gili Tzabari
 */
function NumberVerifier(actual, name, config)
{
	Utilities.verifyValue(actual, "actual", Number);
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
NumberVerifier.prototype = Object.create(NumberVerifier.prototype);
NumberVerifier.prototype.constructor = NumberVerifier;

/**
 * Overrides the type of exception that will get thrown if a requirement fails.
 * <p>
 * The exception class must define the following constructors:
 * <p>
 * {@code <init>(String message)}
 *
 * @param {Error} exception the type of exception to throw, {@code null} to throw the default exception
 *                  type
 * @return {NumberVerifier} a configuration with the specified exception override
 * @see #getException()
 */
NumberVerifier.prototype.withException = function(exception)
{
	const newConfig = this.config.withException(exception);
	if (newConfig === this.config)
		return this;
	return new NumberVerifier(this.actual, this.name, newConfig);
};

/**
 * Appends contextual information to the exception message.
 *
 * @param {String} key   a key
 * @param {String} value a value
 * @return {NumberVerifier} a new verifier with the specified context
 * @throws {TypeError} if {@code key} is not a String
 * @throws {RangeError} if {@code key} is not set
 */
NumberVerifier.prototype.addContext = function(key, value)
{
	const newContext = this.config.addContext(key, value);
	return new NumberVerifier(this.actual, this.name, newContext);
};

/**
 * Sets the contextual information to append to the exception message.
 *
 * @param {Array<Object>} context the contextual information
 * @return {NumberVerifier} a configuration with the specified context
 * @throws {TypeError} if {@code context} is not an Array
 * @throws {RangeError} if {@code context} is not set
 */
NumberVerifier.prototype.withContext = function(context)
{
	const newContext = this.config.withContext(context);
	if (context === this.context)
		return this;
	return new NumberVerifier(this.actual, this.name, newContext);
};

/**
 * Ensures that the actual value is equal to a value.
 *
 * @param {Number} expected the expected value
 * @param {String} [name] the name of the expected value
 * @return {NumberVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is not equal to value
 */
NumberVerifier.prototype.isEqualTo = function(expected, name)
{
	this.asObject.isEqualTo(expected, name);
	return this;
};

/**
 * Ensures that the actual value is not equal to a value.
 *
 * @param {Number} value the value to compare to
 * @param {String} [name] the name of the expected value
 * @return {NumberVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is equal to {@code value}
 */
NumberVerifier.prototype.isNotEqualTo = function(value, name)
{
	this.asObject.isNotEqualTo(value, name);
	return this;
};

/**
 * Ensures that an Number contains the actual value.
 *
 * @param {Array<Number>} array an array
 * @return {NumberVerifier} this
 * @throws {TypeError}  if {@code array} is null
 * @throws {RangeError} if {@code array} does not contain the actual value
 */
NumberVerifier.prototype.isIn = function(array)
{
	this.asObject.isIn(array);
	return this;
};

/**
 * Ensures that the actual value is an instance of a type.
 *
 * @param type the type  to compare to
 * @return {NumberVerifier} this
 * @throws {TypeError}  if {@code type} is null
 * @throws {RangeError} if the actual value is not an instance of {@code type}
 */
NumberVerifier.prototype.isInstanceOf = function(type)
{
	this.asObject.isInstanceOf(type);
	return this;
};

/**
 * Ensures that the actual value is null.
 *
 * @return {NumberVerifier} this
 * @throws {RangeError} if the actual value is not null
 */
NumberVerifier.prototype.isNull = function()
{
	this.asObject.isNull();
	return this;
};

/**
 * Ensures that the actual value is not null.
 *
 * @return {NumberVerifier} this
 * @throws {RangeError} if the actual value is null
 */
NumberVerifier.prototype.isNotNull = function()
{
	this.asObject.isNotNull();
	return this;
};

/**
 * Ensures that the actual value is undefined.
 *
 * @return {NumberVerifier} this
 * @throws {RangeError} if the actual value is not undefined
 */
NumberVerifier.prototype.isUndefined = function()
{
	this.asObject.isUndefined();
	return this;
};

/**
 * Ensures that the actual value is not undefined.
 *
 * @return {NumberVerifier} this
 * @throws {RangeError} if the actual value is undefined
 */
NumberVerifier.prototype.isNotUndefined = function()
{
	this.asObject.isNotUndefined();
	return this;
};

/**
 * Ensures that value is not undefined or null.
 *
 * @return {NumberVerifier} this
 * @throws {TypeError} if the value is undefined or null
 */
NumberVerifier.prototype.isSet = function()
{
	this.asObject.isSet();
	return this;
};

/**
 * Ensures that the actual value is greater than a value.
 *
 * @param {Number} value the lower bound
 * @param {String} [name]  the name of the lower bound
 * @return {NumberVerifier} this
 * @throws {TypeError}      if {@code value} or {@code name} are null
 * @throws {RangeError}  if the actual value is less than or equal to {@code value}; if {@code name} is empty
 */
NumberVerifier.prototype.isGreaterThan = function(value, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	this.config.internalVerifier.requireThat(value, "value").isInstanceOf(Number);
	if (this.actual > value)
		return this;
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " must be greater than " + name).
			addContext("Actual", this.actual).
			addContext("Min", value).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " must be greater than: " + Utilities.toString(value)).
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value is greater than or equal to a value.
 *
 * @param {Number} value the minimum value
 * @param {String} [name]  the name of the minimum value
 * @return {NumberVerifier} this
 * @throws {TypeError}      if {@code value} or {@code name} are null
 * @throws {RangeError}  if the actual value is less than {@code value}; if {@code name} is empty
 */
NumberVerifier.prototype.isGreaterThanOrEqualTo = function(value, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	this.config.internalVerifier.requireThat(value, "value").isInstanceOf(Number);
	if (this.actual >= value)
		return this;
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " must be greater than or equal to " + name).
			addContext("Actual", this.actual).
			addContext("Min", value).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " must be greater than or equal to: " +
		Utilities.toString(value)).
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value is less than a value.
 *
 * @param {Number} value the upper bound
 * @param {String} [name]  the name of the upper bound
 * @return {NumberVerifier} this
 * @throws {TypeError}      if {@code value} or {@code name} are null
 * @throws {RangeError}  if the actual value is greater than or equal to {@code value}; if {@code name} is empty
 */
NumberVerifier.prototype.isLessThan = function(value, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	this.config.internalVerifier.requireThat(value, "value").isInstanceOf(Number);
	if (this.actual < value)
		return this;
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " must be less than " + name).
			addContext("Actual", this.actual).
			addContext("Max", value).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " must be less than: " +
		Utilities.toString(value)).
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value is less or equal to a value.
 *
 * @param {Number} value the maximum value
 * @param {String} [name]  the name of the maximum value
 * @return {NumberVerifier} this
 * @throws {TypeError}      if {@code value} or {@code name} are null
 * @throws {RangeError}  if the actual value is greater than {@code value}; if {@code name} is empty
 */
NumberVerifier.prototype.isLessThanOrEqualTo = function(value, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	this.config.internalVerifier.requireThat(value, "value").isInstanceOf(Number);
	if (this.actual <= value)
		return this;
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " must be less than or equal to " + name).
			addContext("Actual", this.actual).
			addContext("Max", value).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " must be less than or equal to: " +
		Utilities.toString(value)).
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value is within range.
 *
 * @param {Number} min the minimum value (inclusive)
 * @param {Number} max  the maximum value (inclusive)
 * @return {NumberVerifier} this
 * @throws {TypeError}      if any of the arguments are null
 * @throws {RangeError}  if {@code last} is less than {@code first}; if
 *                                  the actual value is not in range
 */
NumberVerifier.prototype.isInRange = function(min, max)
{
	this.config.internalVerifier.requireThat(max, "max").isInstanceOf(Number);
	this.config.internalVerifier.requireThat(min, "min").isInstanceOf(Number).isLessThan(max, "max");
	if (this.actual >= min && this.actual <= max)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must be in range [" + min + ", " + max + "]").
		addContext("Actual", this.actual).
		build();
};

/**
 * Verifies a string.
 *
 * @return {StringVerifier} a {@code String} verifier
 * @throws {TypeError}  if the value is not a {@code String}
 */
NumberVerifier.prototype.asString = function()
{
	return this.asObject.asString();
};


export default NumberVerifier;