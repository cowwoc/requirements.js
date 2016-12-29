import Utilities from "./Utilities";
import StringVerifier from "./StringVerifier";
import UriVerifier from "./UriVerifier";
import SetVerifier from "./SetVerifier";
import ArrayVerifier from "./ArrayVerifier";
import NumberVerifier from "./NumberVerifier";

/**
 * Creates a new ObjectVerifier.
 *
 * @constructor
 * @param {Object} actual the actual value
 * @param {String} name   the name of the value
 * @param {Configuration} config the instance configuration
 * @throws {TypeError} if {@code name} or {@code config} are null or undefined
 * @throws {RangeError} if {@code name} is empty
 * @author Gili Tzabari
 */
function ObjectVerifier(actual, name, config)
{
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
}
ObjectVerifier.prototype = Object.create(ObjectVerifier.prototype);
ObjectVerifier.prototype.constructor = ObjectVerifier;

/**
 * Overrides the type of exception that will get thrown if a requirement fails.
 * <p>
 * The exception class must define the following constructors:
 * <p>
 * {@code <init>(String message)}
 *
 * @param {Error} exception the type of exception to throw, {@code null} to throw the default exception
 *                  type
 * @return {ObjectVerifier} a configuration with the specified exception override
 * @see #getException()
 */
ObjectVerifier.prototype.withException = function(exception)
{
	const newConfig = this.config.withException(exception);
	if (newConfig === this.config)
		return this;
	return new ObjectVerifier(this.actual, this.name, newConfig);
};

/**
 * Appends contextual information to the exception message.
 *
 * @param {String} key   a key
 * @param {String} value a value
 * @return {ObjectVerifier} a new verifier with the specified context
 * @throws {TypeError} if {@code key} is not a String
 * @throws {RangeError} if {@code key} is not set
 */
ObjectVerifier.prototype.addContext = function(key, value)
{
	const newContext = this.config.addContext(key, value);
	return new ObjectVerifier(this.actual, this.name, newContext);
};

/**
 * Sets the contextual information to append to the exception message.
 *
 * @param {Array<Object>} context the contextual information
 * @return {ObjectVerifier} a configuration with the specified context
 * @throws {TypeError} if {@code context} is not an Array
 * @throws {RangeError} if {@code context} is not set
 */
ObjectVerifier.prototype.withContext = function(context)
{
	const newContext = this.config.withContext(context);
	if (context === this.context)
		return this;
	return new ObjectVerifier(this.actual, this.name, newContext);
};

/**
 * Ensures that the actual value is equal to a value.
 *
 * @param {Object} expected the expected value
 * @param {String} [name] the name of the expected value
 * @return {ObjectVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is not equal to value
 */
ObjectVerifier.prototype.isEqualTo = function(expected, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	if (this.actual === expected)
		return this;
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " must be equal to " + name).
			addContext("Actual", this.actual).
			addContext("Expected", expected).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " had an unexpected value.").
		addContext("Actual", this.actual).
		addContext("Expected", expected).
		build();
};

/**
 * Ensures that the actual value is not equal to a value.
 *
 * @param {Array} value the value to compare to
 * @param {String} [name] the name of the expected value
 * @return {ObjectVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is equal to {@code value}
 */
ObjectVerifier.prototype.isNotEqualTo = function(value, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	if (this.actual !== value)
		return this;
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " may not be equal to " + name).
			addContext("Actual", this.actual).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " may not be equal to " + Utilities.toString(this.actual)).
		build();
};

/**
 * Ensures that an array contains the actual value.
 *
 * @param {Array<Array>} array an array
 * @return {ObjectVerifier} this
 * @throws {TypeError}  if {@code array} is not an {@code Array}
 * @throws {RangeError} if {@code array} does not contain the actual value
 */
ObjectVerifier.prototype.isIn = function(array)
{
	this.config.internalVerifier.requireThat(array, "array").isInstanceOf(Array);
	if (array.indexOf(this.actual) !== -1)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must be one of " + Utilities.toString(this.array) + ".").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value is an instance of a type.
 *
 * @param type the type  to compare to
 * @return {ObjectVerifier} this
 * @throws {TypeError}  if {@code type} is null
 * @throws {RangeError} if the actual value is not an instance of {@code type}
 */
ObjectVerifier.prototype.isInstanceOf = function(type)
{
	if (Utilities.instanceOf(this.actual, type))
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must be an instance of " + Utilities.getClassName(type) +
		".").
		addContext("Actual", Utilities.getClassName(this.actual)).
		build();
};

/**
 * Ensures that the actual value is null.
 *
 * @return {ObjectVerifier} this
 * @throws {RangeError} if the actual value is not null
 */
ObjectVerifier.prototype.isNull = function()
{
	if (this.actual === null)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must be null.").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value is not null.
 *
 * @return {ObjectVerifier} this
 * @throws {RangeError} if the actual value is null
 */
ObjectVerifier.prototype.isNotNull = function()
{
	if (this.actual !== null)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " may not be null").
		build();
};

/**
 * Ensures that the actual value is undefined.
 *
 * @return {ObjectVerifier} this
 * @throws {RangeError} if the actual value is not undefined
 */
ObjectVerifier.prototype.isUndefined = function()
{
	if (this.actual === undefined)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must be undefined.").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value is not undefined.
 *
 * @return {ObjectVerifier} this
 * @throws {RangeError} if the actual value is undefined
 */
ObjectVerifier.prototype.isNotUndefined = function()
{
	if (this.actual !== null)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " may not be undefined").
		build();
};

/**
 * Ensures that value is not undefined or null.
 *
 * @return {ObjectVerifier} this
 * @throws {TypeError} if the value is undefined or null
 */
ObjectVerifier.prototype.isSet = function()
{
	if (this.actual !== undefined && this.actual !== null)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must be set.").
		addContext("Actual", this.actual).
		build();
};

/**
 * Verifies a set.
 *
 * @return {SetVerifier} a {@code Set} verifier
 * @throws {TypeError}  if the value is not a {@code Set}
 */
ObjectVerifier.prototype.asSet = function()
{
	if (Utilities.getClassName(this.actual) === "Set")
		return new SetVerifier(this.actual, this.name, this.config);
	throw this.config.exceptionBuilder(RangeError, this.name + " must be a Set.").
		addContext("Actual", this.actual).
		build();
};

/**
 * Verifies an array.
 *
 * @return {ArrayVerifier} an {@code Array} verifier
 * @throws {TypeError}  if the value is not an {@code Array}
 */
ObjectVerifier.prototype.asArray = function()
{
	if (Utilities.getClassName(this.actual) === "Set")
		return new ArrayVerifier(this.actual, this.name, this.config);
	throw this.config.exceptionBuilder(RangeError, this.name + " must be an Array.").
		addContext("Actual", this.actual).
		build();
};

/**
 * Verifies a number.
 *
 * @return {NumberVerifier} a {@code Number} verifier
 * @throws {TypeError}  if the value is not a {@code Number}
 */
ObjectVerifier.prototype.asNumber = function()
{
	if (Utilities.getClassName(this.actual) === "Set")
		return new NumberVerifier(this.actual, this.name, this.config);
	throw this.config.exceptionBuilder(RangeError, this.name + " must be a Number.").
		addContext("Actual", this.actual).
		build();
};

/**
 * Verifies a String.
 *
 * @return {StringVerifier} a {@code String} verifier
 * @throws {TypeError}  if the value is not a {@code String}
 */
ObjectVerifier.prototype.asString = function()
{
	if (Utilities.getClassName(this.actual) === "String")
		return new StringVerifier(this.actual, this.name, this.config);
	throw this.config.exceptionBuilder(RangeError, this.name + " must be a String.").
		addContext("Actual", this.actual).
		build();
};


/**
 * Verifies a URI.
 *
 * @return {UriVerifier} a {@code URI} verifier
 * @throws {TypeError}  if the value is not a {@code URI}
 */
ObjectVerifier.prototype.asUri = function()
{
	if (Utilities.getClassName(this.actual) === "String")
		return new UriVerifier(this.actual, this.name, this.config);
	throw this.config.exceptionBuilder(RangeError, this.name + " must be a URI.").
		addContext("Actual", this.actual).
		build();
};

export default ObjectVerifier;