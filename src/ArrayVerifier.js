import "babel-polyfill";
// babel-polyfill needed for Set
import ContainerSizeVerifier from "./ContainerSizeVerifier";
import ExceptionBuilder from "./ExceptionBuilder";
import ObjectVerifier from "./ObjectVerifierSuperclass";
import Pluralizer from "./Pluralizer";
import SetVerifier from "./SetVerifier";
import Sugar from "sugar";
import Utilities from "./Utilities";

/**
 * @param {Array} array an array
 * @param {Object} element an element
 * @return {Boolean} true if {@code arrays} contains the element
 */
function actualContains(array, element)
{
	// indexOf() does not work on 2D arrays: http://stackoverflow.com/a/24943461/14731
	for (let i = 0; i < array.length; ++i)
	{
		if (Sugar.Array.isEqual(array[i], element))
			return true;
	}
	return false;
}

/**
 * @param {Array} actual an array
 * @param {Array} expected the expected elements
 * @return {boolean} true if {@code actual} contains any of the {@code expected} elements
 */
function actualContainsAny(actual, expected)
{
	for (const element of expected)
	{
		if (actualContains(actual, element))
			return true;
	}
	return false;
}

/**
 * @param {Array} actual an array
 * @param {Array} expected an array of expected elements
 * @return {boolean} true if {@code actual} contains all of the {@code expected} elements
 */
function actualContainsAll(actual, expected)
{
	for (const element of expected)
	{
		if (!actualContains(actual, element))
			return false;
	}
	return true;
}

/**
 * Verifies an array.
 *
 * @class
 * @author Gili Tzabari
 */
class ArrayVerifier extends ObjectVerifier {
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
	 * @param {Object} element the element that must exist
	 * @param {String} [name] the name of the element
	 * @return {ArrayVerifier} this
	 * @throws {TypeError} if {@code name} is null
	 * @throws {RangeError} if {@code name} is empty; if the array does not contain {@code element}
	 */
	contains(element, name)
	{
		if (typeof(name) !== "undefined")
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
		if (actualContains(this.actual, element))
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain " + name + ".").
				addContext("Actual", this.actual).
				addContext("Expected", element).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain " + Utilities.toString(element)).
			addContext("Actual", this.actual).
			build();
	}

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
	containsExactly(expected, name)
	{
		if (typeof(name) !== "undefined")
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
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain exactly the same elements as " +
				name).
				addContext("Actual", this.actual).
				addContext("Expected", expected).
				addContext("Missing", missing).
				addContext("Unwanted", unwanted).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError,
			this.name + " must contain exactly: " + Utilities.toString(expected)).
			addContext("Actual", this.actual).
			addContext("Missing", missing).
			addContext("Unwanted", unwanted).
			build();
	}

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
	containsAny(expected, name)
	{
		if (typeof(name) !== "undefined")
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
		this.config.internalVerifier.requireThat(expected, "expected").isInstanceOf(Array);
		if (actualContainsAny(this.actual, expected))
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain any element in " + name).
				addContext("Actual", this.actual).
				addContext("Expected", expected).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain any element in: " +
			Utilities.toString(expected)).
			addContext("Actual", this.actual).
			build();
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
	containsAll(expected, name)
	{
		if (typeof(name) !== "undefined")
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
		this.config.internalVerifier.requireThat(expected, "expected").isInstanceOf(Array);
		if (actualContainsAll(this.actual, expected))
			return this;
		const expectedAsSet = new Set(expected);
		const actualAsSet = new Set(this.actual);
		const missing = new Set([...expectedAsSet].filter(x => !actualAsSet.has(x)));
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain all elements in " + name).
				addContext("Actual", this.actual).
				addContext("Missing", missing).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain all elements in: " +
			Utilities.toString(expected)).
			addContext("Actual", this.actual).
			addContext("Expected", expected).
			addContext("Missing", missing).
			build();
	}

	/**
	 * Ensures that the array does not contain an element.
	 *
	 * @param {Object} element the element that must not exist
	 * @param {String} [name] the name of the element
	 * @return {ArrayVerifier} this
	 * @throws {TypeError} if {@code name} is null
	 * @throws {RangeError} if {@code name} is empty; if the array contains {@code element}
	 */
	doesNotContain(element, name)
	{
		if (typeof(name) !== "undefined")
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
		if (!actualContains(this.actual, element))
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " may not contain " + name + ".").
				addContext("Actual", this.actual).
				addContext("Unwanted", element).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not contain " + Utilities.toString(
				element)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the array does not contain any of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {String} [name] the name of the elements
	 * @return {ArrayVerifier} this
	 * @throws {TypeError} if {@code name} is null; if {@code elements} is not an Array
	 * @throws {RangeError} if {@code name} is empty; if the array contains any of {@code elements}
	 */
	doesNotContainAny(elements, name)
	{
		if (typeof(name) !== "undefined")
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
		this.config.internalVerifier.requireThat(elements, "elements").isInstanceOf(Array);
		if (!actualContainsAny(this.actual, elements))
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must not contain any element in " + name).
				addContext("Actual", this.actual).
				addContext("Unwanted", elements).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must not contain any element in: " +
			Utilities.toString(elements)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the array does not contain all of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {String} [name] the name of the elements
	 * @return {ArrayVerifier} this
	 * @throws {TypeError} if {@code name} is null; if {@code elements} is not an Array
	 * @throws {RangeError} if {@code name} is empty; if the array contains all of {@code elements}
	 */
	doesNotContainAll(elements, name)
	{
		if (typeof(name) !== "undefined")
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
		this.config.internalVerifier.requireThat(elements, "elements").isInstanceOf(Array);
		if (!actualContainsAll(this.actual, elements))
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
			Utilities.toString(elements)).
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
			Pluralizer.ELEMENT);
	}

	/**
	 * @param {Function} consumer a function that accepts a {@code ContainerSizeVerifier} for the length of the array
	 * @return {ArrayVerifier} this
	 * @throws {TypeError} if {@code consumer} is not set
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
	 * @return {SetVerifier} a {@code Set} verifier
	 * @throws {TypeError}  if the value is not a {@code Set}
	 */
	asSet()
	{
		return new SetVerifier(this.config, new Set(this.actual), this.name + ".asSet()");
	}

	/**
	 * @param {Function} consumer a function that accepts a {@code SetVerifier} for the Set representation of the array
	 * @return {ArrayVerifier} this
	 * @throws {TypeError} if {@code consumer} is not set
	 */
	asSetConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this.asSet());
		return this;
	}
}

export default ArrayVerifier;