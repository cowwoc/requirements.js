import Utilities from "./Utilities";
import ObjectVerifier from "./ObjectVerifier";
import ContainerSizeVerifier from "./ContainerSizeVerifier";
import ArrayVerifier from "./ArrayVerifier";
import NumberVerifier from "./NumberVerifier";
import Pluralizer from "./Pluralizer";

/**
 * Creates a new SetVerifier.
 *
 * @constructor
 * @param {Set} actual the actual value
 * @param {String} name   the name of the value
 * @param {Configuration} config the instance configuration
 * @throws {TypeError} if {@code name} or {@code config} are null or undefined; if {@code actual} is not a {@code Set}
 * @throws {RangeError} if {@code name} is empty
 * @author Gili Tzabari
 */
function SetVerifier(actual, name, config)
{
	Utilities.verifyValue(actual, "actual", Set);
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
 * @return {SetVerifier} a configuration with the specified exception override
 * @see #getException()
 */
SetVerifier.prototype.withException = function(exception)
{
	const newConfig = this.config.withException(exception);
	if (newConfig === this.config)
		return this;
	return new SetVerifier(this.actual, this.name, newConfig);
};


/**
 * Appends contextual information to the exception message.
 *
 * @param {String} key   a key
 * @param {String} value a value
 * @return {SetVerifier} a new verifier with the specified context
 * @throws {TypeError} if {@code key} is not a String
 * @throws {RangeError} if {@code key} is not set
 */
SetVerifier.prototype.addContext = function(key, value)
{
	const newContext = this.config.addContext(key, value);
	return new SetVerifier(this.actual, this.name, newContext);
};

/**
 * Sets the contextual information to append to the exception message.
 *
 * @param {Array<Object>} context the contextual information
 * @return {SetVerifier} a configuration with the specified context
 * @throws {TypeError} if {@code context} is not an Array
 * @throws {RangeError} if {@code context} is not set
 */
SetVerifier.prototype.withContext = function(context)
{
	const newContext = this.config.withContext(context);
	if (context === this.context)
		return this;
	return new SetVerifier(this.actual, this.name, newContext);
};

/**
 * Ensures that the actual value is equal to a value.
 *
 * @param {Object} expected the expected value
 * @param {String} [name] the name of the expected value
 * @return {SetVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is not equal to value
 */
SetVerifier.prototype.isEqualTo = function(expected, name)
{
	this.asObject.isEqualTo(expected, name);
	return this;
};

/**
 * Ensures that the actual value is not equal to a value.
 *
 * @param {Array} value the value to compare to
 * @param {String} [name] the name of the expected value
 * @return {SetVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is equal to {@code value}
 */
SetVerifier.prototype.isNotEqualTo = function(value, name)
{
	this.asObject.isNotEqualTo(value, name);
	return this;
};

/**
 * Ensures that an array contains the actual value.
 *
 * @param {Array<Array>} array an array
 * @return {SetVerifier} this
 * @throws {TypeError}  if {@code array} is not an {@code Array}
 * @throws {RangeError} if {@code array} does not contain the actual value
 */
SetVerifier.prototype.isInArray = function(array)
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
 * @return {SetVerifier} this
 * @throws {TypeError}  if {@code type} is undefined, null, anonymous function, arrow function or an object
 * @throws {RangeError} if the actual value is not an instance of {@code type}
 */
SetVerifier.prototype.isInstanceOf = function(type)
{
	this.asObject.isInstanceOf(type);
	return this;
};

/**
 * Ensures that the actual value is null.
 *
 * @return {SetVerifier} this
 * @throws {RangeError} if the actual value is not null
 */
SetVerifier.prototype.isNull = function()
{
	this.asObject.isNull();
	return this;
};

/**
 * Ensures that the actual value is not null.
 *
 * @return {SetVerifier} this
 * @throws {RangeError} if the actual value is null
 */
SetVerifier.prototype.isNotNull = function()
{
	this.asObject.isNotNull();
	return this;
};

/**
 * Ensures that the actual value is undefined.
 *
 * @return {SetVerifier} this
 * @throws {RangeError} if the actual value is not undefined
 */
SetVerifier.prototype.isUndefined = function()
{
	this.asObject.isUndefined();
	return this;
};

/**
 * Ensures that the actual value is not undefined.
 *
 * @return {SetVerifier} this
 * @throws {RangeError} if the actual value is undefined
 */
SetVerifier.prototype.isNotUndefined = function()
{
	this.asObject.isNotUndefined();
	return this;
};

/**
 * Ensures that value is not undefined or null.
 *
 * @return {SetVerifier} this
 * @throws {TypeError} if the value is undefined or null
 */
SetVerifier.prototype.isSet = function()
{
	this.asObject.isSet();
	return this;
};

/**
 * Ensures that value is not undefined or null.
 *
 * @return {SetVerifier} this
 * @throws {TypeError} if the value is not undefined or null
 */
SetVerifier.prototype.isNotSet = function()
{
	this.asObject.isNotSet();
	return this;
};

/**
 * Ensures that value does not contain any elements.
 *
 * @return {SetVerifier} this
 * @throws {TypeError} if the value contains at least one element
 */
SetVerifier.prototype.isEmpty = function()
{
	if (this.actual.size === 0)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must be empty.").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that value contains at least one element.
 *
 * @return {SetVerifier} this
 * @throws {TypeError} if the value does not contain any elements
 */
SetVerifier.prototype.isNotEmpty = function()
{
	if (this.actual.size !== 0)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " may not be empty").
		build();
};

/**
 * Ensures that the actual value contains an entry.
 *
 * @param {Object} expected the expected value
 * @param {String} [name] the name of the expected value
 * @return {SetVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the Set does not contain {@code expected}
 */
SetVerifier.prototype.contains = function(expected, name)
{
	if (typeof(name) !== "undefined")
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	if (this.actual.has(expected))
		return this;
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " must contain " + name).
			addContext("Actual", this.actual).
			addContext("Expected", expected).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + "  must contain " + Utilities.toString(expected)).
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value contains exactly the same elements as the expected value; nothing less, nothing more.
 *
 * @param {Set} expected the Set of elements that must exist
 * @param {String} [name] the name of the expected elements
 * @return {SetVerifier} this
 * @throws {TypeError} if {@code name} is null; if {@code expected} is not a {@code Set}
 * @throws {RangeError} if {@code name} is empty; if the actual value is missing any elements in {@code expected}; if
 *   the actual value contains elements not found in {@code expected}
 */
SetVerifier.prototype.containsExactly = function(expected, name)
{
	this.config.internalVerifier.requireThat(expected, "expected").isInstanceOf(Set);
	if (typeof(name) !== "undefined")
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	const missing = new Set([...expected].filter(x => !this.actual.has(x)));
	const unwanted = new Set([...this.actual].filter(x => !expected.has(x)));
	if (missing.size === 0 && unwanted.size === 0)
		return this;
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " must contain exactly the same elements as " + name).
			addContext("Actual", this.actual).
			addContext("Expected", expected).
			addContext("Missing", missing).
			addContext("Unwanted", unwanted).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " must contain exactly: " + Utilities.toString(expected)).
		addContext("Actual", this.actual).
		addContext("Missing", missing).
		addContext("Unwanted", unwanted).
		build();
};

/**
 * Ensures that the actual value contains any of the elements in the expected value.
 *
 * @param {Set} expected the Set of elements that must exist
 * @param {String} [name] the name of the expected elements
 * @return {SetVerifier} this
 * @throws {TypeError} if {@code name} is null; if {@code expected} is not a {@code Set}
 * @throws {RangeError} if {@code name} is empty; if the actual value is missing any elements in {@code expected}; if
 *   the actual value contains elements not found in {@code expected}
 */
SetVerifier.prototype.containsAny = function(expected, name)
{
	this.config.internalVerifier.requireThat(expected, "expected").isInstanceOf(Set);
	if (typeof(name) !== "undefined")
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	if (actualContainsAny(this.actual, expected))
		return this;
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " must contain any entry in " + name).
			addContext("Actual", this.actual).
			addContext("Expected", expected).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " must contain any entry in: " +
		Utilities.toString(expected)).
		addContext("Actual", this.actual).
		build();
};

/**
 * @param {Set} actual a Set
 * @param {Set} expected a set of expected elements
 * @return {boolean} true if {@code actual} contains any of the {@code expected} elements
 */
function actualContainsAny(actual, expected)
{
	for (let entry of expected.entries())
	{
		if (actual.has(entry))
			return true;
	}
	return false;
}

/**
 * Ensures that the actual value contains all of the elements in the expected value.
 *
 * @param {Set} expected the Set of elements that must exist
 * @param {String} [name] the name of the expected elements
 * @return {SetVerifier} this
 * @throws {TypeError} if {@code name} is null; if {@code expected} is not a {@code Set}
 * @throws {RangeError} if {@code name} is empty; if the actual value does not contain all of {@code expected}
 */
SetVerifier.prototype.containsAll = function(expected, name)
{
	this.config.internalVerifier.requireThat(expected, "expected").isInstanceOf(Set);
	if (typeof(name) !== "undefined")
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	if (actualContainsAll(this.actual, expected))
		return this;
	const missing = new Set([...expected].filter(x => !this.actual.has(x)));
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " must contain all elements in " + name).
			addContext("Actual", this.actual).
			addContext("Missing", missing).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " must contain all elements in: " +
		Utilities.toString(expected)).
		addContext("Actual", this.actual).
		addContext("Expected", expected).
		addContext("Missing", missing).
		build();
};

/**
 * Ensures that the actual value does not contain an entry.
 *
 * @param {Object} entry an entry
 * @param {String} [name] the name of the entry
 * @return {SetVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value contains {@code entry}
 */
SetVerifier.prototype.doesNotContain = function(entry, name)
{
	if (typeof(name) !== "undefined")
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	if (!this.actual.has(entry))
		return this;
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " may not contain " + name + ".").
			addContext("Actual", this.actual).
			addContext("Unwanted", entry).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " may not contain " + Utilities.toString(entry)).
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value does not contain any of the specified elements.
 *
 * @param {Array} elements the elements that must not exist
 * @param {String} [name] the name of the elements
 * @return {SetVerifier} this
 * @throws {TypeError} if {@code name} is null; if {@code elements} is not a Set
 * @throws {RangeError} if {@code name} is empty; if the array contains any of {@code elements}
 */
SetVerifier.prototype.doesNotContainAny = function(elements, name)
{
	this.config.internalVerifier.requireThat(elements, "elements").isInstanceOf(Set);
	if (typeof(name) !== "undefined")
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	if (!actualContainsAny(this.actual, elements))
		return this;
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " must not contain any element in " + name).
			addContext("Actual", this.actual).
			addContext("Unwanted", elements).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " must not contain any element in: " +
		Utilities.toString(elements)).
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the array does not contain all of the specified elements.
 *
 * @param {Set} elements a Set of elements
 * @param {String} [name] the name of the elements
 * @return {SetVerifier} this
 * @throws {TypeError} if {@code name} is null; if {@code elements} is not a {@code Set}
 * @throws {RangeError} if {@code name} is empty; if the actual value contains all of {@code elements}
 */
SetVerifier.prototype.doesNotContainAll = function(elements, name)
{
	this.config.internalVerifier.requireThat(elements, "elements").isInstanceOf(Set);
	if (typeof(name) !== "undefined")
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	if (!actualContainsAll(this.actual, elements))
		return this;
	const missing = new Set([...elements].filter(x => !this.actual.has(x)));
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " may not contain all elements in " + name).
			addContext("Actual", this.actual).
			addContext("Missing", missing).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " may not contain all elements in: " +
		Utilities.toString(elements)).
		addContext("Actual", this.actual).
		addContext("Unwanted", elements).
		addContext("Missing", missing).
		build();
};

/**
 * @param {Set} actual a Set
 * @param {Set} expected a Set of expected values
 * @return {boolean} true if {@code actual} contains all of the {@code expected} elements
 */
function actualContainsAll(actual, expected)
{
	for (let expectedKey of expected)
	{
		let expectedValue = actual[expectedKey];
		if (actual[expectedKey] !== expectedValue)
			return false;
	}
	return true;
}

/**
 * @return {NumberVerifier} a verifier for the Set's size
 */
SetVerifier.prototype.size = function()
{
	return new NumberVerifier(this.actual.size, this.name + ".size", this.config);
};

/**
 * @param {Function<NumberVerifier>} consumer a function that accepts a verifier for Set's size
 * @return {SetVerifier} this
 * @throws {TypeError} if {@code consumer} is not set
 */
SetVerifier.prototype.sizeConsumer = function(consumer)
{
	this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
	consumer(this.size);
	return this;
};

/**
 * @return {ContainerSizeVerifier} a verifier for the size of this Set
 */
SetVerifier.prototype.size = function()
{
	return new ContainerSizeVerifier(this.actual, this.actual.size, this.name, this.name + ".size", Pluralizer.ELEMENT,
		this.config);
};

/**
 * @param {Function<NumberVerifier>} consumer a function that accepts a verifier for the size of this Set
 * @return {SetVerifier} this
 * @throws {TypeError} if {@code consumer} is not set
 */
SetVerifier.prototype.sizeConsumer = function(consumer)
{
	this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
	consumer(this.size);
	return this;
};

/**
 * @return {ArrayVerifier} a verifier for the Set's elements
 */
SetVerifier.prototype.asArray = function()
{
	return new ArrayVerifier(Array.from(this.actual.values()), this.name + ".asArray()", this.config);
};

/**
 * @return {StringVerifier} a verifier for the Set's string representation
 */
SetVerifier.prototype.asString = function()
{
	return this.asObject.asString();
};

/**
 * @return {Set} the actual value
 */
SetVerifier.prototype.getActual = function()
{
	return this.actual;
};

export default SetVerifier;