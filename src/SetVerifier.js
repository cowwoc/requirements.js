import ObjectVerifier from "./ObjectVerifier";
import ArrayVerifier from "./ArrayVerifier";
import ExceptionBuilder from "./internal/ExceptionBuilder";
import NumberVerifier from "./NumberVerifier";
import Objects from "./internal/Objects";

/**
 * @param {Array|Set} value a value
 * @param {string} name the name of the value
 * @return {Set} the value as a <code>Set</code>
 * @throws {TypeError} if <code>value</code> is not an <code>Array</code> or <code>Set</code>
 */
function asSet(value, name)
{
	Objects.requireThatStringNotEmpty(name, "name");
	const typeOfValue = Objects.getTypeOf(value);
	switch (typeOfValue)
	{
		case "Set":
			return value;
		case "Array":
			return new Set(value);
		default:
		{
			throw new TypeError(name + " must be an Array or Set.\n" +
				"Actual: " + value + "\n" +
				"Type  : " + typeOfValue);
		}
	}
}

/**
 * @param {Set} actual a Set
 * @param {Set} expected a set of expected elements
 * @return {boolean} true if <code>actual</code> contains any of the <code>expected</code> elements
 */
function actualContainsAny(actual, expected)
{
	for (const entry of expected)
	{
		if (actual.has(entry))
			return true;
	}
	return false;
}

/**
 * @param {Set} actual a Set
 * @param {Set} expected a Set of expected values
 * @return {boolean} true if <code>actual</code> contains all of the <code>expected</code> elements
 */
function actualContainsAll(actual, expected)
{
	for (const entry of expected)
	{
		if (!actual.has(entry))
			return false;
	}
	return true;
}

/**
 * Verifies a <code>Set</code>.
 */
class SetVerifier extends ObjectVerifier
{
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
	 * @param {object} expected the expected value
	 * @param {string} [name] the name of the expected value
	 * @return {SetVerifier} this
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty; if the Set does not contain <code>expected</code>
	 */
	includes(expected, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		if (this.actual.has(expected))
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain " + name).
				addContext("Actual", this.actual).
				addContext("Expected", expected).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + "  must contain " +
			this.config.convertToString(expected)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value contains exactly the same elements as the expected value; nothing less, nothing
	 * more.
	 *
	 * @param {Array|Set} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetVerifier} this
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an <code>Array</code> or
	 * <code>Set</code>
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value is missing any elements in
	 * <code>expected</code>; if the actual value contains elements not found in <code>expected</code>
	 */
	containsExactly(expected, name)
	{
		const expectedAsSet = asSet(expected, "expected");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		const missing = new Set([...expectedAsSet].filter(x => !this.actual.has(x)));
		const unwanted = new Set([...this.actual].filter(x => !expectedAsSet.has(x)));
		if (missing.size === 0 && unwanted.size === 0)
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name +
				" must contain exactly the same elements as " + name).
				addContext("Actual", this.actual).
				addContext("Expected", expectedAsSet).
				addContext("Missing", missing).
				addContext("Unwanted", unwanted).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain exactly: " +
			this.config.convertToString(expectedAsSet)).
			addContext("Actual", this.actual).
			addContext("Missing", missing).
			addContext("Unwanted", unwanted).
			build();
	}

	/**
	 * Ensures that the actual value contains any of the elements in the expected value.
	 *
	 * @param {Set} expected the Set of elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetVerifier} this
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an <code>Array</code> or
	 * <code>Set</code>
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value is missing any elements in
	 * <code>expected</code>; if the actual value contains elements not found in <code>expected</code>
	 */
	containsAny(expected, name)
	{
		const expectedAsSet = asSet(expected, "expected");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		if (actualContainsAny(this.actual, expectedAsSet))
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain any entry in " + name).
				addContext("Actual", this.actual).
				addContext("Expected", expectedAsSet).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain any entry in: " +
			this.config.convertToString(expectedAsSet)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value contains all of the elements in the expected value.
	 *
	 * @param {Set} expected the Set of elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetVerifier} this
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an <code>Array</code> or
	 * <code>Set</code>
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value does not contain all of
	 * <code>expected</code>
	 */
	containsAll(expected, name)
	{
		const expectedAsSet = asSet(expected, "expected");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		if (actualContainsAll(this.actual, expectedAsSet))
			return this;
		const missing = new Set([...expectedAsSet].filter(x => !this.actual.has(x)));
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain all elements in " +
				name).
				addContext("Actual", this.actual).
				addContext("Missing", missing).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain all elements in: " +
			this.config.convertToString(expectedAsSet)).
			addContext("Actual", this.actual).
			addContext("Expected", expectedAsSet).
			addContext("Missing", missing).
			build();
	}

	/**
	 * Ensures that the actual value does not contain an entry.
	 *
	 * @param {object} entry an entry
	 * @param {string} [name] the name of the entry
	 * @return {SetVerifier} this
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value contains <code>entry</code>
	 */
	doesNotContain(entry, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		if (!this.actual.has(entry))
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " may not contain " + name + ".").
				addContext("Actual", this.actual).
				addContext("Unwanted", entry).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not contain " +
			this.config.convertToString(entry)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value does not contain any of the specified elements.
	 *
	 * @param {Array|Set} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {SetVerifier} this
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an <code>Array</code> or
	 * [@code Set}
	 * @throws {RangeError} if <code>name</code> is empty; if the array contains any of <code>elements</code>
	 */
	doesNotContainAny(elements, name)
	{
		const elementsAsSet = asSet(elements, "elements");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		if (!actualContainsAny(this.actual, elementsAsSet))
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must not contain any element in " +
				name).
				addContext("Actual", this.actual).
				addContext("Unwanted", elementsAsSet).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must not contain any element in: " +
			this.config.convertToString(elementsAsSet)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the array does not contain all of the specified elements.
	 *
	 * @param {Set} elements a Set of elements
	 * @param {string} [name] the name of the elements
	 * @return {SetVerifier} this
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an <code>Array</code> or
	 * [@code Set}
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value contains all of <code>elements</code>
	 */
	doesNotContainAll(elements, name)
	{
		const elementsAsSet = asSet(elements, "elements");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		if (!actualContainsAll(this.actual, elementsAsSet))
			return this;
		const missing = new Set([...elementsAsSet].filter(x => !this.actual.has(x)));
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " may not contain all elements in " +
				name).
				addContext("Actual", this.actual).
				addContext("Missing", missing).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not contain all elements in: " +
			this.config.convertToString(elementsAsSet)).
			addContext("Actual", this.actual).
			addContext("Unwanted", elementsAsSet).
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
	 * @param {Function} consumer a function that accepts a {@link NumberVerifier} for the Set's size
	 * @return {SetVerifier} this
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	sizeConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this.size());
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
	 * @param {Function} consumer a function that accepts an {@link ArrayVerifier} for the Set's elements
	 * @return {SetVerifier} this
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asArrayConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this.asArray());
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {SetVerifier as default};