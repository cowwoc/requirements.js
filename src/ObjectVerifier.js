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
 * @param type the type  to compare to
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
	if (message !== undefined)
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
 * Ensures that value is not undefined or null.
 *
 * @return {ObjectVerifier} this
 * @throws {TypeError} if the value is not undefined or null
 */
ObjectVerifier.prototype.isNotSet = function()
{
	if (this.actual === undefined || this.actual === null)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " may not be set.").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that value does not contain any enumerable properties.
 *
 * @return {ObjectVerifier} this
 * @throws {TypeError} if the value contains any enumerable properties
 */
ObjectVerifier.prototype.isEmpty = function()
{
	if (Object.keys(this.actual).length === 0)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must be empty.").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that value does not contain any enumerable properties.
 *
 * @return {ObjectVerifier} this
 * @throws {TypeError} if the value does not contain any enumerable properties
 */
ObjectVerifier.prototype.isNotEmpty = function()
{
	if (Object.keys(this.actual).length !== 0)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " may not be empty").
		build();
};

/**
 * @return {ArrayVerifier} a verifier for the object's enumerable property names
 */
ObjectVerifier.prototype.keys = function()
{
	return new ArrayVerifier(Object.keys(this.actual), this.name + ".keys()", this.config);
};

/**
 * @param {Function<ArrayVerifier>} consumer a function that accepts a verifier for the object's enumerable property
 *   names
 * @return {ObjectVerifier} this
 * @throws {TypeError} if {@code consumer} is not set
 */
ObjectVerifier.prototype.keysConsumer = function(consumer)
{
	this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
	consumer(this.keys());
	return this;
};

/**
 * @return {ArrayVerifier} a verifier for the object's enumerable property values
 */
ObjectVerifier.prototype.values = function()
{
	return new ArrayVerifier(Object.values(this.actual), this.name + ".values()", this.config);
};

/**
 * @param {Function<ArrayVerifier>} consumer a function that accepts a verifier for the object's enumerable property
 *   values
 * @return {ObjectVerifier} this
 * @throws {TypeError} if {@code consumer} is not set
 */
ObjectVerifier.prototype.valuesConsumer = function(consumer)
{
	this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
	consumer(this.values());
	return this;
};

/**
 * Ensures that the actual value contains an entry.
 *
 * @param {Object} entry an object containing a single key-value pair
 * @param {String} [name] the name of the expected value
 * @return {ObjectVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if {@code entry} contains more than one entry; if the object does
 *   not contain {@code entry}
 */
ObjectVerifier.prototype.contains = function(entry, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	if (Object.keys(entry).length > 0)
	{
		this.config.internalVerifier.requireThat(entry, "entry").size().isLessThanOrEqualTo(1);
		let expectedKey = Object.keys(entry)[0];
		let expectedValue = entry[expectedKey];
		if (this.actual[expectedKey] === expectedValue)
			return this;
	}
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " must contain " + name).
			addContext("Actual", this.actual).
			addContext("Expected", entry).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + "  must contain " + Utilities.toString(entry)).
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the actual value contains exactly the same entries as the expected value; nothing less, nothing more.
 *
 * @param {Object} expected the entries that must exist
 * @param {String} [name] the name of the expected entries
 * @return {ObjectVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is missing any entries in {@code expected}; if
 *   the actual value contains entries not found in {@code expected}
 */
ObjectVerifier.prototype.containsExactly = function(expected, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	const expectedAsSet = new Set(Object.entries(expected));
	const actualAsSet = new Set(Object.entries(this.actual));
	const missing = new Set([...expectedAsSet].filter(x => !actualAsSet.has(x)));
	const unwanted = new Set([...actualAsSet].filter(x => !expectedAsSet.has(x)));
	if (missing.size === 0 && unwanted.size === 0)
		return this;
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " must contain exactly the same entries as " + name).
			addContext("Actual", this.actual).
			addContext("Expected", expected).
			addContext("Missing", entriesToObject(missing)).
			addContext("Unwanted", entriesToObject(unwanted)).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " must contain exactly: " + Utilities.toString(expected)).
		addContext("Actual", this.actual).
		addContext("Missing", entriesToObject(missing)).
		addContext("Unwanted", entriesToObject(unwanted)).
		build();
};

/**
 * @param {Set} entries a Set of [key, value] pairs
 * @returns {Object} an object containing the key-value mapping
 */
function entriesToObject(entries)
{
	const result = {};
	for (let entry of entries)
		result[entry[0]] = entry[1];
	return result;
}

/**
 * Ensures that the actual value contains any of the entries in the expected value.
 *
 * @param {Array} expected the entries that must exist
 * @param {String} [name] the name of the expected entries
 * @return {ObjectVerifier} this
 * @throws {TypeError} if {@code name} is null; if {@code expected} is not an Array
 * @throws {RangeError} if {@code name} is empty; if the array is missing any entries in {@code expected}; if the
 *   array contains entries not found in {@code expected}
 */
ObjectVerifier.prototype.containsAny = function(expected, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	if (actualContainsAny.call(this, expected))
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
 * @param {Object} expected an object
 * @return {boolean} true if {@code actual} contains any of the entries in {@code expected}
 */
function actualContainsAny(expected)
{
	for (let expectedKey of Object.keys(expected))
	{
		let expectedValue = this.actual[expectedKey];
		if (this.actual[expectedKey] === expectedValue)
			return true;
	}
	return false;
}

/**
 * Ensures that the actual value contains all of the entries in the expected value.
 *
 * @param {Array} expected the entries that must exist
 * @param {String} [name] the name of the expected entries
 * @return {ObjectVerifier} this
 * @throws {TypeError} if {@code name} is null; if {@code expected} is not an Array
 * @throws {RangeError} if {@code name} is empty; if the array does not contain all of {@code expected}
 */
ObjectVerifier.prototype.containsAll = function(expected, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	if (actualContainsAll.call(this, expected))
		return this;
	const expectedAsSet = new Set(Object.entries(expected));
	const actualAsSet = new Set(Object.entries(this.actual));
	const missing = new Set([...expectedAsSet].filter(x => !actualAsSet.has(x)));
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " must contain all entries in " + name).
			addContext("Actual", this.actual).
			addContext("Missing", entriesToObject(missing)).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " must contain all entries in: " +
		Utilities.toString(expected)).
		addContext("Actual", this.actual).
		addContext("Expected", expected).
		addContext("Missing", entriesToObject(missing)).
		build();
};

/**
 * Ensures that the actual value does not contain an entry.
 *
 * @param {Object} entry an object containing a single key-value pair
 * @param {String} [name] the name of the entry
 * @return {ObjectVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if {@code entry} contains more than one entry; if the actual value
 *   contains {@code entry}
 */
ObjectVerifier.prototype.doesNotContain = function(entry, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	if (Object.keys(entry).length === 0)
		return this;
	this.config.internalVerifier.requireThat(entry, "entry").size().isLessThanOrEqualTo(1);
	let expectedKey = Object.keys(entry)[0];
	let expectedValue = entry[expectedKey];
	if (this.actual[expectedKey] !== expectedValue)
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
 * Ensures that the actual value does not contain any of the specified entries.
 *
 * @param {Array} entries the elements that must not exist
 * @param {String} [name] the name of the elements
 * @return {ObjectVerifier} this
 * @throws {TypeError} if {@code name} is null; if {@code elements} is not an Array
 * @throws {RangeError} if {@code name} is empty; if the array contains any of {@code elements}
 */
ObjectVerifier.prototype.doesNotContainAny = function(entries, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	this.config.internalVerifier.requireThat(entries, "elements").isInstanceOf(Array);
	if (!actualContainsAny.call(this, entries))
		return this;
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " must not contain any element in " + name).
			addContext("Actual", this.actual).
			addContext("Unwanted", entries).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " must not contain any element in: " +
		Utilities.toString(entries)).
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the array does not contain all of the specified elements.
 *
 * @param {Object} entries an object containing key-value pairs
 * @param {String} [name] the name of the entries
 * @return {ObjectVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the array contains all of {@code entries}
 */
ObjectVerifier.prototype.doesNotContainAll = function(elements, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	if (!actualContainsAll.call(this, elements))
		return this;
	const elementsAsSet = new Set(Object.entries(elements));
	const actualAsSet = new Set(Object.entries(this.actual));
	const missing = new Set([...elementsAsSet].filter(x => !actualAsSet.has(x)));
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " may not contain all elements in " + name).
			addContext("Actual", this.actual).
			addContext("Missing", entriesToObject(missing)).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " may not contain all elements in: " +
		Utilities.toString(elements)).
		addContext("Actual", this.actual).
		addContext("Unwanted", entriesToObject(elements)).
		addContext("Missing", entriesToObject(missing)).
		build();
};

/**
 * @param {Set} expected a Set of [key, value] pairs
 * @return {boolean} true if {@code actual} contains all of the entries in {@code expected}
 */
function actualContainsAll(expected)
{
	for (let expectedKey of expected)
	{
		let expectedValue = this.actual[expectedKey];
		if (this.actual[expectedKey] !== expectedValue)
			return false;
	}
	return true;
}

/**
 * @return {NumberVerifier} a verifier for the number of enumerable properties this object contains
 */
ObjectVerifier.prototype.size = function()
{
	return new NumberVerifier(Object.keys(this.actual).length, this.name + ".size()", this.config);
};

/**
 * Verifies a set.
 *
 * @return {SetVerifier} a {@code Set} verifier
 * @throws {TypeError}  if the value is not a {@code Set}
 */
ObjectVerifier.prototype.asSet = function()
{
	if (Utilities.getTypeName(this.actual) === "Set")
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
	if (Utilities.getTypeName(this.actual) === "Set")
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
	if (Utilities.getTypeName(this.actual) === "Set")
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
	if (Utilities.getTypeName(this.actual) === "String")
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
	if (Utilities.getTypeName(this.actual) === "String")
		return new UriVerifier(this.actual, this.name, this.config);
	throw this.config.exceptionBuilder(RangeError, this.name + " must be a URI.").
		addContext("Actual", this.actual).
		build();
};

export default ObjectVerifier;