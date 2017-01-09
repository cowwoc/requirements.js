import StringVerifier from "./StringVerifier";
import Utilities from "./Utilities";
import Sugar from "sugar";

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
	// TODO: Add colored diff support using https://code.google.com/p/google-diff-match-patch/,
	// https://github.com/marak/colors.js/ and https://github.com/adamschwartz/log/
	if (typeof(name) !== "undefined")
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	if (Sugar.Object.isEqual(this.actual, expected))
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
	if (typeof(name) !== "undefined")
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	if (!Sugar.Object.isEqual(this.actual, value))
		return this;
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " may not be equal to " + name).
			addContext("Actual", this.actual).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " may not be equal to " + Utilities.toString(value)).
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
ObjectVerifier.prototype.isInArray = function(array)
{
	this.config.internalVerifier.requireThat(array, "array").isInstanceOf(Array);
	if (array.indexOf(this.actual) !== -1)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must be one of " + Utilities.toString(array) + ".").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value is an instance of a type.
 *
 * Primitive types are wrapped before evaluation. For example, "someValue" is treated as a String object.
 *
 * @param {Function} type the type to compare to
 * @return {ObjectVerifier} this
 * @throws {TypeError}  if {@code type} is undefined, null, anonymous function, arrow function or an object
 * @throws {RangeError} if the actual value is not an instance of {@code type}
 */
ObjectVerifier.prototype.isInstanceOf = function(type)
{
	if (Utilities.instanceOf(this.actual, type))
		return this;
	let message;
	const typeName = Utilities.getTypeName(type);
	switch (typeName)
	{
		case "Undefined":
		case "Null":
		{
			message = typeName.toLowerCase();
			break;
		}
		case "AnonymousFunction":
		{
			message = "an anonymous function";
			break;
		}
		case "ArrowFunction":
		{
			message = "an arrow function";
			break;
		}
		case "Object":
		{
			message = "an object";
			break;
		}
	}
	if (typeof(message) !== "undefined")
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " may not be " + message).
			build();
	}

	switch (typeName)
	{
		case "Boolean":
		case "Number":
		case "String":
		{
			message = "a " + typeName;
			break;
		}
		case "Function":
		{
			message = "an instance of " + Utilities.getFunctionName(type) + ".";
			break;
		}
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " must be " + message).
		addContext("Actual", Utilities.getTypeName(this.actual)).
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
	if (typeof(this.actual) !== "undefined")
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
	if (typeof(this.actual) !== "undefined" && this.actual !== null)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must be set.").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that value is not undefined or null.
 *
 * @return {ObjectVerifier} this
 * @throws {TypeError} if the value is not undefined or null
 */
ObjectVerifier.prototype.isNotSet = function()
{
	if (typeof(this.actual) === "undefined" || this.actual === null)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " may not be set.").
		addContext("Actual", this.actual).
		build();
};

/**
 * @return {StringVerifier} a verifier for the object's string representation
 */
ObjectVerifier.prototype.asString = function()
{
	return new StringVerifier(Utilities.toString(this.actual), this.name + ".asString()", this.config);
};

/**
 * @return {Object} the actual value
 */
ObjectVerifier.prototype.getActual = function()
{
	return this.actual;
};

export default ObjectVerifier;