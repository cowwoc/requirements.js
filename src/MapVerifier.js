import Utilities from "./Utilities";
import ObjectVerifier from "./ObjectVerifier";
import ArrayVerifier from "./ArrayVerifier";
import NumberVerifier from "./NumberVerifier";

/**
 * Creates a new MapVerifier.
 *
 * @constructor
 * @param {Object} actual the actual value
 * @param {String} name   the name of the value
 * @param {Configuration} config the instance configuration
 * @throws {TypeError} if {@code name} or {@code config} are null or undefined
 * @throws {RangeError} if {@code name} is empty
 * @author Gili Tzabari
 */
function MapVerifier(actual, name, config)
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
 * @return {MapVerifier} a configuration with the specified exception override
 * @see #getException()
 */
MapVerifier.prototype.withException = function(exception)
{
	const newConfig = this.config.withException(exception);
	if (newConfig === this.config)
		return this;
	return new MapVerifier(this.actual, this.name, newConfig);
};

/**
 * Appends contextual information to the exception message.
 *
 * @param {String} key   a key
 * @param {String} value a value
 * @return {MapVerifier} a new verifier with the specified context
 * @throws {TypeError} if {@code key} is not a String
 * @throws {RangeError} if {@code key} is not set
 */
MapVerifier.prototype.addContext = function(key, value)
{
	const newContext = this.config.addContext(key, value);
	return new MapVerifier(this.actual, this.name, newContext);
};

/**
 * Sets the contextual information to append to the exception message.
 *
 * @param {Array<Object>} context the contextual information
 * @return {MapVerifier} a configuration with the specified context
 * @throws {TypeError} if {@code context} is not an Array
 * @throws {RangeError} if {@code context} is not set
 */
MapVerifier.prototype.withContext = function(context)
{
	const newContext = this.config.withContext(context);
	if (context === this.context)
		return this;
	return new MapVerifier(this.actual, this.name, newContext);
};

/**
 * Ensures that the actual value is equal to a value.
 *
 * @param {Object} expected the expected value
 * @param {String} [name] the name of the expected value
 * @return {MapVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is not equal to value
 */
MapVerifier.prototype.isEqualTo = function(expected, name)
{
	this.asObject.isEqualTo(expected, name);
	return this;
};

/**
 * Ensures that the actual value is not equal to a value.
 *
 * @param {Array} value the value to compare to
 * @param {String} [name] the name of the expected value
 * @return {MapVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is equal to {@code value}
 */
MapVerifier.prototype.isNotEqualTo = function(value, name)
{
	this.asObject.isNotEqualTo(value, name);
	return this;
};

/**
 * Ensures that an array contains the actual value.
 *
 * @param {Array<Array>} array an array
 * @return {MapVerifier} this
 * @throws {TypeError}  if {@code array} is not an {@code Array}
 * @throws {RangeError} if {@code array} does not contain the actual value
 */
MapVerifier.prototype.isInArray = function(array)
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
 * @return {MapVerifier} this
 * @throws {TypeError}  if {@code type} is undefined, null, anonymous function, arrow function or an object
 * @throws {RangeError} if the actual value is not an instance of {@code type}
 */
MapVerifier.prototype.isInstanceOf = function(type)
{
	this.asObject.isInstanceOf(type);
	return this;
};

/**
 * Ensures that the actual value is null.
 *
 * @return {MapVerifier} this
 * @throws {RangeError} if the actual value is not null
 */
MapVerifier.prototype.isNull = function()
{
	this.asObject.isNull();
	return this;
};

/**
 * Ensures that the actual value is not null.
 *
 * @return {MapVerifier} this
 * @throws {RangeError} if the actual value is null
 */
MapVerifier.prototype.isNotNull = function()
{
	this.asObject.isNotNull();
	return this;
};

/**
 * Ensures that the actual value is undefined.
 *
 * @return {MapVerifier} this
 * @throws {RangeError} if the actual value is not undefined
 */
MapVerifier.prototype.isUndefined = function()
{
	this.asObject.isUndefined();
	return this;
};

/**
 * Ensures that the actual value is not undefined.
 *
 * @return {MapVerifier} this
 * @throws {RangeError} if the actual value is undefined
 */
MapVerifier.prototype.isNotUndefined = function()
{
	this.asObject.isNotUndefined();
	return this;
};

/**
 * Ensures that value is not undefined or null.
 *
 * @return {MapVerifier} this
 * @throws {TypeError} if the value is undefined or null
 */
MapVerifier.prototype.isSet = function()
{
	this.asObject.isSet();
	return this;
};

/**
 * Ensures that value is not undefined or null.
 *
 * @return {MapVerifier} this
 * @throws {TypeError} if the value is not undefined or null
 */
MapVerifier.prototype.isNotSet = function()
{
	this.asObject.isNotSet();
	return this;
};

/**
 * @return {StringVerifier} a {@code String} verifier for the Map's string representation
 */
MapVerifier.prototype.asString = function()
{
	return this.asObject.asString();
};

/**
 * Ensures that value does not contain any entries
 *
 * @return {MapVerifier} this
 * @throws {TypeError} if the value contains any entries
 */
MapVerifier.prototype.isEmpty = function()
{
	if (this.actual.size === 0)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must be empty.").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that value contains at least one entry.
 *
 * @return {MapVerifier} this
 * @throws {TypeError} if the value does not contain any entries
 */
MapVerifier.prototype.isNotEmpty = function()
{
	if (this.actual.size !== 0)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " may not be empty").
		build();
};

/**
 * @return {ArrayVerifier} a verifier for the Map's keys
 */
MapVerifier.prototype.keys = function()
{
	return new ArrayVerifier(Array.from(this.actual.keys()), this.name + ".keys()", this.config);
};

/**
 * @param {Function<ArrayVerifier>} consumer a function that accepts a verifier for the Map's keys
 *   names
 * @return {MapVerifier} this
 * @throws {TypeError} if {@code consumer} is not set
 */
MapVerifier.prototype.keysConsumer = function(consumer)
{
	this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
	consumer(this.keys());
	return this;
};

/**
 * @return {ArrayVerifier} a verifier for the Map's values
 */
MapVerifier.prototype.values = function()
{
	return new ArrayVerifier(Array.from(this.actual.values()), this.name + ".values()", this.config);
};

/**
 * @param {Function<ArrayVerifier>} consumer a function that accepts a verifier for the Map's values
 * @return {MapVerifier} this
 * @throws {TypeError} if {@code consumer} is not set
 */
MapVerifier.prototype.valuesConsumer = function(consumer)
{
	this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
	consumer(this.values());
	return this;
};

/**
 * @return {ArrayVerifier} a verifier for the Map's entries (an array of {@code [key, value]} for each element in the
 *   Map)
 */
MapVerifier.prototype.entries = function()
{
	return new ArrayVerifier(Array.from(this.actual.entries()), this.name + ".entries()", this.config);
};

/**
 * @param {Function<ArrayVerifier>} consumer a function that accepts a verifier for the Map's entries (an array of
 *   {@code [key, value]} for each element in the Map)
 * @return {MapVerifier} this
 * @throws {TypeError} if {@code consumer} is not set
 */
MapVerifier.prototype.entriesConsumer = function(consumer)
{
	this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
	consumer(this.entries());
	return this;
};

/**
 * @return {NumberVerifier} a verifier for the number of entries this Map contains
 */
MapVerifier.prototype.size = function()
{
	return new NumberVerifier(this.actual.size, this.name + ".size", this.config);
};

/**
 * @param {Function<NumberVerifier>} consumer a function that accepts a verifier for the number of entries this Map
 *   contains
 * @return {MapVerifier} this
 * @throws {TypeError} if {@code consumer} is not set
 */
MapVerifier.prototype.sizeConsumer = function(consumer)
{
	this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
	consumer(this.size);
	return this;
};

/**
 * @return {Map} the actual value
 */
MapVerifier.prototype.getActual = function()
{
	return this.actual;
};

export default MapVerifier;