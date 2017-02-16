import ArrayVerifier from "./ArrayVerifier";
import ExceptionBuilder from "./ExceptionBuilder";
import NumberVerifier from "./NumberVerifier";
import ObjectVerifier from "./ObjectVerifierSuperclass";
import Utilities from "./Utilities";

/**
 * @param {Set} actual a Set
 * @param {Set} expected a set of expected elements
 * @return {boolean} true if {@code actual} contains any of the {@code expected} elements
 */
function actualContainsAny(actual, expected)
{
	for (const entry of expected.entries())
	{
		if (actual.has(entry))
			return true;
	}
	return false;
}

/**
 * @param {Set} actual a Set
 * @param {Set} expected a Set of expected values
 * @return {boolean} true if {@code actual} contains all of the {@code expected} elements
 */
function actualContainsAll(actual, expected)
{
	for (const expectedKey of expected)
	{
		const expectedValue = actual[expectedKey];
		if (actual[expectedKey] !== expectedValue)
			return false;
	}
	return true;
}

/**
 * Verifies a {@code Set}.
 *
 * @class
 * @author Gili Tzabari
 */
class SetVerifier extends ObjectVerifier {
	/**
	 * Ensures that value does not contain any elements.
	 *
	 * @return {SetVerifier} this
	 * @throws {TypeError} if the value contains at least one element
	 */
	isEmpty()
	{
		if (this.actual.size === 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be empty.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that value contains at least one element.
	 *
	 * @return {SetVerifier} this
	 * @throws {TypeError} if the value does not contain any elements
	 */
	isNotEmpty()
	{
		if (this.actual.size !== 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not be empty").
			build();
	}

	/**
	 * Ensures that the actual value contains an entry.
	 *
	 * @param {Object} expected the expected value
	 * @param {String} [name] the name of the expected value
	 * @return {SetVerifier} this
	 * @throws {TypeError} if {@code name} is null
	 * @throws {RangeError} if {@code name} is empty; if the Set does not contain {@code expected}
	 */
	contains(expected, name)
	{
		if (typeof(name) !== "undefined")
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
		if (this.actual.has(expected))
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain " + name).
				addContext("Actual", this.actual).
				addContext("Expected", expected).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + "  must contain " + Utilities.toString(expected)).
			addContext("Actual", this.actual).
			build();
	}

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
	containsExactly(expected, name)
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
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain exactly the same elements as " +
				name).
				addContext("Actual", this.actual).
				addContext("Expected", expected).
				addContext("Missing", missing).
				addContext("Unwanted", unwanted).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain exactly: " +
			Utilities.toString(expected)).
			addContext("Actual", this.actual).
			addContext("Missing", missing).
			addContext("Unwanted", unwanted).
			build();
	}

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
	containsAny(expected, name)
	{
		this.config.internalVerifier.requireThat(expected, "expected").isInstanceOf(Set);
		if (typeof(name) !== "undefined")
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
		if (actualContainsAny(this.actual, expected))
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain any entry in " + name).
				addContext("Actual", this.actual).
				addContext("Expected", expected).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain any entry in: " +
			Utilities.toString(expected)).
			addContext("Actual", this.actual).
			build();
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
	containsAll(expected, name)
	{
		this.config.internalVerifier.requireThat(expected, "expected").isInstanceOf(Set);
		if (typeof(name) !== "undefined")
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
		if (actualContainsAll(this.actual, expected))
			return this;
		const missing = new Set([...expected].filter(x => !this.actual.has(x)));
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
	 * Ensures that the actual value does not contain an entry.
	 *
	 * @param {Object} entry an entry
	 * @param {String} [name] the name of the entry
	 * @return {SetVerifier} this
	 * @throws {TypeError} if {@code name} is null
	 * @throws {RangeError} if {@code name} is empty; if the actual value contains {@code entry}
	 */
	doesNotContain(entry, name)
	{
		if (typeof(name) !== "undefined")
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
		if (!this.actual.has(entry))
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " may not contain " + name + ".").
				addContext("Actual", this.actual).
				addContext("Unwanted", entry).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not contain " + Utilities.toString(entry)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value does not contain any of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {String} [name] the name of the elements
	 * @return {SetVerifier} this
	 * @throws {TypeError} if {@code name} is null; if {@code elements} is not a Set
	 * @throws {RangeError} if {@code name} is empty; if the array contains any of {@code elements}
	 */
	doesNotContainAny(elements, name)
	{
		this.config.internalVerifier.requireThat(elements, "elements").isInstanceOf(Set);
		if (typeof(name) !== "undefined")
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
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
	 * @param {Set} elements a Set of elements
	 * @param {String} [name] the name of the elements
	 * @return {SetVerifier} this
	 * @throws {TypeError} if {@code name} is null; if {@code elements} is not a {@code Set}
	 * @throws {RangeError} if {@code name} is empty; if the actual value contains all of {@code elements}
	 */
	doesNotContainAll(elements, name)
	{
		this.config.internalVerifier.requireThat(elements, "elements").isInstanceOf(Set);
		if (typeof(name) !== "undefined")
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
		if (!actualContainsAll(this.actual, elements))
			return this;
		const missing = new Set([...elements].filter(x => !this.actual.has(x)));
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
	 * @return {NumberVerifier} a verifier for the Set's size
	 */
	size()
	{
		return new NumberVerifier(this.config, this.actual.size, this.name + ".size");
	}

	/**
	 * @param {Function} consumer a function that accepts a {@code NumberVerifier} for the Set's size
	 * @return {SetVerifier} this
	 * @throws {TypeError} if {@code consumer} is not set
	 */
	sizeConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this.size);
		return this;
	}

	/**
	 * @return {ArrayVerifier} a verifier for the Set's elements
	 */
	asArray()
	{
		return new ArrayVerifier(this.config, Array.from(this.actual.values()), this.name + ".asArray()");
	}

	/**
	 * @param {Function} consumer a function that accepts an {@code ArrayVerifier} for the Set's elements
	 * @return {SetVerifier} this
	 * @throws {TypeError} if {@code consumer} is not set
	 */
	asArrayConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this.asArray());
		return this;
	}
}

export default SetVerifier;