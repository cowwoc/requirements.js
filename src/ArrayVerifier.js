import ContainerSizeVerifier from "./ContainerSizeVerifier.js";
import Configuration from "./Configuration.js";
import ExceptionBuilder from "./internal/ExceptionBuilder.js";
import ObjectVerifier from "./ObjectVerifier.js";
import Pluralizer from "./Pluralizer.js";
import SetVerifier from "./SetVerifier.js";
import Objects from "./internal/Objects.js";
import Sugar from "sugar";

/**
 * Indicates if an array contains at least one element of another array.
 *
 * @param {Array} array an array of arrays
 * @param {object} element an element
 * @return {boolean} true if <code>arrays</code> contains the element
 * @ignore
 */
function arrayContainsElement(array, element)
{
	// indexOf(), includes() do not work for multidimensional arrays: http://stackoverflow.com/a/24943461/14731
	for (let i = 0; i < array.length; ++i)
	{
		if (Sugar.Array.isEqual(array[i], element))
			return true;
	}
	return false;
}

/**
 * @param {Array} array an array
 * @param {Array} expected an array of expected values
 * @return {boolean} true if <code>actual</code> contains any of the <code>expected</code> elements
 * @ignore
 */
function arrayContainsAny(array, expected)
{
	for (const element of expected)
	{
		if (arrayContainsElement(array, element))
			return true;
	}
	return false;
}

/**
 * Indicates if an array contains all elements of another array.
 *
 * @param {Array} array an array
 * @param {Array} expected an array of expected elements
 * @return {boolean} true if <code>actual</code> contains all of the <code>expected</code> elements
 * @ignore
 */
function arrayContainsAll(array, expected)
{
	for (const element of expected)
	{
		if (!arrayContainsElement(array, element))
			return false;
	}
	return true;
}

/**
 * Verifies an array.
 */
class ArrayVerifier extends ObjectVerifier
{
	/**
	 * Creates a new ArrayVerifier.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {object} actual the actual value
	 * @param {string} name   the name of the value
	 * @param {Pluralizer} [pluralizer=Pluralizer.ELEMENT] returns the singular or plural form of the container's element
	 * type
	 * @throws {TypeError} if <code>name</code> or <code>config</code> are null or undefined
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	constructor(configuration, actual, name, pluralizer)
	{
		super(configuration, actual, name);
		if (typeof (pluralizer) === "undefined")
			pluralizer = Pluralizer.ELEMENT;
		Object.defineProperty(this, "pluralizer",
			{
				value: pluralizer
			});
	}

	/**
	 * Ensures that the actual value is empty.
	 *
	 * @return {ArrayVerifier} this
	 * @throws {RangeError} if the actual value is not empty
	 */
	isEmpty()
	{
		if (this.actual.length === 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not be empty").
			build();
	}

	/**
	 * Ensures that the actual value is not empty.
	 *
	 * @return {ArrayVerifier} this
	 * @throws {RangeError} if the actual value is empty
	 */
	isNotEmpty()
	{
		if (this.actual.length !== 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be empty.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the array contains an element.
	 *
	 * @param {object} element the element that must exist
	 * @param {string} [name] the name of the element
	 * @return {ArrayVerifier} this
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty; if the array does not contain <code>element</code>
	 */
	includes(element, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		if (arrayContainsElement(this.actual, element))
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain " + name + ".").
				addContext("Actual", this.actual).
				addContext("Expected", element).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain " +
			this.config.convertToString(element)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the array contains exactly the specified elements; nothing less, nothing more.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {ArrayVerifier} this
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty; if the array is missing any elements in <code>expected</code>;
	 * if the array contains elements not found in <code>expected</code>
	 */
	containsExactly(expected, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		this.config.internalVerifier.requireThat(expected, "expected").isTypeOf("Array");
		const expectedAsSet = new Set(expected);
		const actualAsSet = new Set(this.actual);
		const missing = new Set([...expectedAsSet].filter(x => !actualAsSet.has(x)));
		const unwanted = new Set([...actualAsSet].filter(x => !expectedAsSet.has(x)));
		if (missing.size === 0 && unwanted.size === 0)
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name +
				" must contain exactly the same elements as " + name).
				addContext("Actual", this.actual).
				addContext("Expected", expected).
				addContext("Missing", missing).
				addContext("Unwanted", unwanted).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError,
			this.name + " must contain exactly: " + this.config.convertToString(expected)).
			addContext("Actual", this.actual).
			addContext("Missing", missing).
			addContext("Unwanted", unwanted).
			build();
	}

	/**
	 * Ensures that the array contains any of the specified elements.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {ArrayVerifier} this
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty; if the array is missing any elements in <code>expected</code>;
	 * if the array contains elements not found in <code>expected</code>
	 */
	containsAny(expected, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		this.config.internalVerifier.requireThat(expected, "expected").isTypeOf("Array");
		if (arrayContainsAny(this.actual, expected))
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain any element in " + name).
				addContext("Actual", this.actual).
				addContext("Expected", expected).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain any element in: " +
			this.config.convertToString(expected)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the array contains all of the specified elements.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {ArrayVerifier} this
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty; if the array does not contain all of <code>expected</code>
	 */
	containsAll(expected, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		this.config.internalVerifier.requireThat(expected, "expected").isTypeOf("Array");
		if (arrayContainsAll(this.actual, expected))
			return this;
		const expectedAsSet = new Set(expected);
		const actualAsSet = new Set(this.actual);
		const missing = new Set([...expectedAsSet].filter(x => !actualAsSet.has(x)));
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain all elements in " +
				name).
				addContext("Actual", this.actual).
				addContext("Expected", expected).
				addContext("Missing", missing).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain all elements in: " +
			this.config.convertToString(expected)).
			addContext("Actual", this.actual).
			addContext("Missing", missing).
			build();
	}

	/**
	 * Ensures that the array does not contain an element.
	 *
	 * @param {object} element the element that must not exist
	 * @param {string} [name] the name of the element
	 * @return {ArrayVerifier} this
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty; if the array contains <code>element</code>
	 */
	doesNotContain(element, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		if (!arrayContainsElement(this.actual, element))
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " may not contain " + name + ".").
				addContext("Actual", this.actual).
				addContext("Unwanted", element).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not contain " +
			this.config.convertToString(element)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the array does not contain any of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {ArrayVerifier} this
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty; if the array contains any of <code>elements</code>
	 */
	doesNotContainAny(elements, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		this.config.internalVerifier.requireThat(elements, "elements").isTypeOf("Array");
		if (!arrayContainsAny(this.actual, elements))
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must not contain any element in " +
				name).
				addContext("Actual", this.actual).
				addContext("Unwanted", elements).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must not contain any element in: " +
			this.config.convertToString(elements)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the array does not contain all of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {ArrayVerifier} this
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty; if the array contains all of <code>elements</code>
	 */
	doesNotContainAll(elements, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		this.config.internalVerifier.requireThat(elements, "elements").isTypeOf("Array");
		if (!arrayContainsAll(this.actual, elements))
			return this;
		const elementsAsSet = new Set(elements);
		const actualAsSet = new Set(this.actual);
		const missing = new Set([...elementsAsSet].filter(x => !actualAsSet.has(x)));
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " may not contain all elements in " + name).
				addContext("Actual", this.actual).
				addContext("Missing", missing).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not contain all elements in: " +
			this.config.convertToString(elements)).
			addContext("Actual", this.actual).
			addContext("Unwanted", elements).
			addContext("Missing", missing).
			build();
	}

	/**
	 * Ensures that the array does not contain any duplicate elements.
	 *
	 * @return {ArrayVerifier} this
	 * @throws {RangeError} if the array contains any duplicate elements
	 */
	doesNotContainDuplicates()
	{
		const unique = new Set();
		const duplicates = new Set();
		for (const element of this.actual)
		{
			if (unique.has(element))
				duplicates.add(element);
			else
				unique.add(element);
		}
		if (duplicates.size === 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not contain duplicate elements").
			addContext("Actual", this.actual).
			addContext("Duplicates", duplicates).
			build();
	}

	/**
	 * @return {ContainerSizeVerifier} a verifier for the length of the array
	 */
	length()
	{
		return new ContainerSizeVerifier(this.config, this.actual, this.actual.length, this.name, this.name + ".length",
			this.pluralizer);
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link ContainerSizeVerifier} for the length of the array
	 * @return {ArrayVerifier} this
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	lengthConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this.length());
		return this;
	}

	/**
	 * Verifies the Set representation of the array.
	 *
	 * @return {SetVerifier} a <code>Set</code> verifier
	 * @throws {TypeError}  if the value is not a <code>Set</code>
	 */
	asSet()
	{
		return new SetVerifier(this.config, new Set(this.actual), this.name + ".asSet()");
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link SetVerifier} for the Set representation of the array
	 * @return {ArrayVerifier} this
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asSetConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this.asSet());
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {ArrayVerifier as default};