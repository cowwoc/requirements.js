import ObjectVerifier from "./ObjectVerifier";
import ContainerSizeVerifier from "./ContainerSizeVerifier";
import Pluralizer from "./Pluralizer";
import Utilities from "./Utilities";

/**
 * Creates a new ArrayVerifier.
 *
 * @constructor
 * @param {Array} actual the actual value
 * @param {String} name   the name of the value
 * @param {Configuration} config the instance configuration
 * @throws {TypeError} if {@code name}, {@code config} are undefined or null; if {@code actual} is not an array
 * @throws {RangeError} if {@code name} is empty
 * @author Gili Tzabari
 */
function ArrayVerifier(actual, name, config)
{
	Utilities.verifyValue(actual, "actual", Array);
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
 * @return {ArrayVerifier} a configuration with the specified exception override
 * @see #getException()
 */
ArrayVerifier.prototype.withException = function(exception)
{
	const newConfig = this.config.withException(exception);
	if (newConfig === this.config)
		return this;
	return new ArrayVerifier(this.actual, this.name, newConfig);
};

/**
 * Appends contextual information to the exception message.
 *
 * @param {String} key   a key
 * @param {String} value a value
 * @return {ArrayVerifier} a new verifier with the specified context
 * @throws {TypeError} if {@code key} is not a String
 * @throws {RangeError} if {@code key} is not set
 */
ArrayVerifier.prototype.addContext = function(key, value)
{
	const newConfig = this.config.addContext(key, value);
	return new ArrayVerifier(this.actual, this.name, newConfig);
};

/**
 * Sets the contextual information to append to the exception message.
 *
 * @param {Array<Object>} context the contextual information
 * @return {ArrayVerifier} a configuration with the specified context
 * @throws {TypeError} if {@code context} is not an Array
 * @throws {RangeError} if {@code context} is not set
 */
ArrayVerifier.prototype.withContext = function(context)
{
	const newConfig = this.config.withContext(context);
	if (context === this.context)
		return this;
	return new ArrayVerifier(this.actual, this.name, newConfig);
};

/**
 * Ensures that the actual value is equal to a value.
 *
 * @param {Array} expected the expected value
 * @param {String} [name] the name of the expected value
 * @return {ArrayVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is not equal to value
 */
ArrayVerifier.prototype.isEqualTo = function(expected, name)
{
	this.asObject.isEqualTo(expected, name);
	return this;
};

/**
 * Ensures that the actual value is not equal to a value.
 *
 * @param {Array} value the value to compare to
 * @param {String} [name] the name of the expected value
 * @return {ArrayVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the actual value is equal to {@code value}
 */
ArrayVerifier.prototype.isNotEqualTo = function(value, name)
{
	this.asObject.isNotEqualTo(value, name);
	return this;
};

/**
 * Ensures that an array contains the actual value.
 *
 * @param {Array<Array>} array an array
 * @return {ArrayVerifier} this
 * @throws {TypeError}  if {@code array} is null
 * @throws {RangeError} if {@code array} does not contain the actual value
 */
ArrayVerifier.prototype.isInArray = function(array)
{
	this.asObject.isInArray(array);
	return this;
};

/**
 * Ensures that the actual value is an instance of a type.
 *
 * @param type the type  to compare to
 * @return {ArrayVerifier} this
 * @throws {TypeError}  if {@code type} is null
 * @throws {RangeError} if the actual value is not an instance of {@code type}
 */
ArrayVerifier.prototype.isInstanceOf = function(type)
{
	this.asObject.isInstanceOf(type);
	return this;
};

/**
 * Ensures that the actual value is null.
 *
 * @return {ArrayVerifier} this
 * @throws {RangeError} if the actual value is not null
 */
ArrayVerifier.prototype.isNull = function()
{
	this.asObject.isNull();
	return this;
};

/**
 * Ensures that the actual value is not null.
 *
 * @return {ArrayVerifier} this
 * @throws {RangeError} if the actual value is null
 */
ArrayVerifier.prototype.isNotNull = function()
{
	this.asObject.isNotNull();
	return this;
};

/**
 * Ensures that the actual value is undefined.
 *
 * @return {ArrayVerifier} this
 * @throws {RangeError} if the actual value is not undefined
 */
ArrayVerifier.prototype.isUndefined = function()
{
	this.asObject.isUndefined();
	return this;
};

/**
 * Ensures that the actual value is not undefined.
 *
 * @return {ArrayVerifier} this
 * @throws {RangeError} if the actual value is undefined
 */
ArrayVerifier.prototype.isNotUndefined = function()
{
	this.asObject.isNotUndefined();
	return this;
};

/**
 * Ensures that value is not undefined or null.
 *
 * @return {ArrayVerifier} this
 * @throws {TypeError} if the value is undefined or null
 */
ArrayVerifier.prototype.isSet = function()
{
	this.asObject.isSet();
	return this;
};

/**
 * Verifies a string.
 *
 * @return {StringVerifier} a {@code String} verifier
 * @throws {TypeError}  if the value is not a {@code String}
 */
ArrayVerifier.prototype.asString = function()
{
	return this.asObject.asString();
};

/**
 * Ensures that the actual value is empty.
 *
 * @return {ArrayVerifier} this
 * @throws {RangeError} if the actual value is not empty
 */
ArrayVerifier.prototype.isEmpty = function()
{
	if (this.actual.length === 0)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " may not be empty").
		build();
};

/**
 * Ensures that the actual value is not empty.
 *
 * @return {ArrayVerifier} this
 * @throws {RangeError} if the actual value is empty
 */
ArrayVerifier.prototype.isNotEmpty = function()
{
	if (this.actual.length !== 0)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " must be empty.").
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the array contains an element.
 *
 * @param {Object} element the element that must exist
 * @param {String} [name] the name of the element
 * @return {ArrayVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the array does not contain {@code element}
 */
ArrayVerifier.prototype.contains = function(element, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	if (this.actual.indexOf(element) !== -1)
		return this;
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " must contain " + name + ".").
			addContext("Actual", this.actual).
			addContext("Expected", element).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " must contain " + Utilities.toString(element)).
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the array contains exactly the specified elements; nothing less, nothing more.
 *
 * @param {Array} expected the elements that must exist
 * @param {String} [name] the name of the expected elements
 * @return {ArrayVerifier} this
 * @throws {TypeError} if {@code name} is null; if {@code expected} is not an Array
 * @throws {RangeError} if {@code name} is empty; if the array is missing any elements in {@code expected}; if
 *   the array contains elements not found in {@code expected}
 */
ArrayVerifier.prototype.containsExactly = function(expected, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	this.config.internalVerifier.requireThat(expected, "expected").isInstanceOf(Array);
	const expectedAsSet = new Set(expected);
	const actualAsSet = new Set(this.actual);
	const missing = new Set([...expectedAsSet].filter(x => !actualAsSet.has(x)));
	const unwanted = new Set([...actualAsSet].filter(x => !expectedAsSet.has(x)));
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
 * Ensures that the array contains any of the specified elements.
 *
 * @param {Array} expected the elements that must exist
 * @param {String} [name] the name of the expected elements
 * @return {ArrayVerifier} this
 * @throws {TypeError} if {@code name} is null; if {@code expected} is not an Array
 * @throws {RangeError} if {@code name} is empty; if the array is missing any elements in {@code expected}; if the
 *   array contains elements not found in {@code expected}
 */
ArrayVerifier.prototype.containsAny = function(expected, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	this.config.internalVerifier.requireThat(expected, "expected").isInstanceOf(Array);
	if (actualContainsAny.call(this, expected))
		return this;
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " must contain any element in " + name).
			addContext("Actual", this.actual).
			addContext("Expected", expected).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " must contain any element in: " +
		Utilities.toString(expected)).
		addContext("Actual", this.actual).
		build();
};

/**
 * @param {Array} elements an array of elements
 * @return {boolean} true if {@code actual} contains any of the elements
 */
function actualContainsAny(elements)
{
	for (let element of elements)
	{
		if (this.actual.indexOf(element) !== -1)
			return true;
	}
	return false;
}

/**
 * Ensures that the array contains all of the specified elements.
 *
 * @param {Array} expected the elements that must exist
 * @param {String} [name] the name of the expected elements
 * @return {ArrayVerifier} this
 * @throws {TypeError} if {@code name} is null; if {@code expected} is not an Array
 * @throws {RangeError} if {@code name} is empty; if the array does not contain all of {@code expected}
 */
ArrayVerifier.prototype.containsAll = function(expected, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	this.config.internalVerifier.requireThat(expected, "expected").isInstanceOf(Array);
	if (actualContainsAll.call(this, expected))
		return this;
	const expectedAsSet = new Set(expected);
	const actualAsSet = new Set(this.actual);
	const missing = new Set([...expectedAsSet].filter(x => !actualAsSet.has(x)));
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
 * Ensures that the array does not contain an element.
 *
 * @param {Object} element the element that must not exist
 * @param {String} [name] the name of the element
 * @return {ArrayVerifier} this
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty; if the array contains {@code element}
 */
ArrayVerifier.prototype.doesNotContain = function(element, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	if (this.actual.indexOf(element) === -1)
		return this;
	if (name)
	{
		throw this.config.exceptionBuilder(RangeError, this.name + " may not contain " + name + ".").
			addContext("Actual", this.actual).
			addContext("Unwanted", element).
			build();
	}
	throw this.config.exceptionBuilder(RangeError, this.name + " may not contain " + Utilities.toString(element)).
		addContext("Actual", this.actual).
		build();
};

/**
 * Ensures that the array does not contain any of the specified elements.
 *
 * @param {Array} elements the elements that must not exist
 * @param {String} [name] the name of the elements
 * @return {ArrayVerifier} this
 * @throws {TypeError} if {@code name} is null; if {@code elements} is not an Array
 * @throws {RangeError} if {@code name} is empty; if the array contains any of {@code elements}
 */
ArrayVerifier.prototype.doesNotContainAny = function(elements, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	this.config.internalVerifier.requireThat(elements, "elements").isInstanceOf(Array);
	if (!actualContainsAny.call(this, elements))
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
 * @param {Array} elements the elements that must not exist
 * @param {String} [name] the name of the elements
 * @return {ArrayVerifier} this
 * @throws {TypeError} if {@code name} is null; if {@code elements} is not an Array
 * @throws {RangeError} if {@code name} is empty; if the array contains all of {@code elements}
 */
ArrayVerifier.prototype.doesNotContainAll = function(elements, name)
{
	if (name !== undefined)
		this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
	this.config.internalVerifier.requireThat(elements, "elements").isInstanceOf(Array);
	if (!actualContainsAll.call(this, elements))
		return this;
	const elementsAsSet = new Set(elements);
	const actualAsSet = new Set(this.actual);
	const missing = new Set([...elementsAsSet].filter(x => !actualAsSet.has(x)));
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
 * @param {Array} elements an array of elements
 * @return {boolean} true if {@code actual} contains all of the elements
 */
function actualContainsAll(elements)
{
	for (let element of elements)
	{
		if (this.actual.indexOf(element) === -1)
			return false;
	}
	return true;
}

/**
 * Ensures that the array does not contain any duplicate elements.
 *
 * @return {ArrayVerifier} this
 * @throws {RangeError} if the array contains any duplicate elements
 */
ArrayVerifier.prototype.doesNotContainDuplicates = function()
{
	const unique = new Set();
	const duplicates = new Set();
	for (let element of this.actual)
	{
		if (unique.has(element))
			duplicates.add(element);
		else
			unique.add(element);
	}
	if (duplicates.size === 0)
		return this;
	throw this.config.exceptionBuilder(RangeError, this.name + " may not contain duplicate elements").
		addContext("Actual", this.actual).
		addContext("Duplicates", duplicates).
		build();
};

/**
 * @return {ContainerSizeVerifier} a verifier for the length of the array
 */
ArrayVerifier.prototype.length = function()
{
	return new ContainerSizeVerifier(this.actual, this.actual.length, this.name, this.name + ".length", Pluralizer.ELEMENT,
		this.config);
};

export default ArrayVerifier;