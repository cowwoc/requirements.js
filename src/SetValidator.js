import ObjectValidator from "./internal/circular_dependency/ObjectValidatorBase.js";
import ArrayValidator from "./internal/circular_dependency/ArrayValidatorBase.js";
import SizeValidator from "./SizeValidator.js";
import SizeValidatorNoOp from "./internal/SizeValidatorNoOp.js";
import Objects from "./internal/Objects.js";
import ValidationFailure from "./ValidationFailure.js";
import SetValidatorNoOp from "./internal/SetValidatorNoOp.js";
import Pluralizer from "./Pluralizer.js";

/**
 * @param {Array|Set} value a value
 * @param {string} name the name of the value
 * @return {Set} the value as a <code>Set</code>
 * @throws {TypeError} if <code>value</code> is not an <code>Array</code> or <code>Set</code>
 * @ignore
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
 * @ignore
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
 * @ignore
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
 * Validates the requirements of a <code>Set</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class SetValidator extends ObjectValidator
{
	/**
	 * Ensures that value does not contain any elements.
	 *
	 * @return {SetValidator|SetValidatorNoOp} the updated validator
	 */
	isEmpty()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new SetValidatorNoOp(this.failures);
		}
		if (this.actual.size !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be empty.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that value contains at least one element.
	 *
	 * @return {SetValidator|SetValidatorNoOp} the updated validator
	 */
	isNotEmpty()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new SetValidatorNoOp(this.failures);
		}
		if (this.actual.size === 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " may not be empty");
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value contains an entry.
	 *
	 * @param {object} expected the expected value
	 * @param {string} [name] the name of the expected value
	 * @return {SetValidator|SetValidatorNoOp} the updated validator
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	contains(expected, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");

		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new SetValidatorNoOp(this.failures);
		}
		if (!this.actual.has(expected))
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError, this.name + " must contain " + name).
					addContext("Actual", this.actual).
					addContext("Expected", expected);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError, this.name + "  must contain " +
					this.config.convertToString(expected)).
					addContext("Actual", this.actual);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value contains exactly the same elements as the expected value; nothing less,
	 * nothing more.
	 *
	 * @param {Array|Set} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetValidator|SetValidatorNoOp} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an <code>Array</code>
	 *   or <code>Set</code>
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	containsExactly(expected, name)
	{
		const expectedAsSet = asSet(expected, "expected");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");

		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new SetValidatorNoOp(this.failures);
		}
		const missing = new Set([...expectedAsSet].filter(x => !this.actual.has(x)));
		const unwanted = new Set([...this.actual].filter(x => !expectedAsSet.has(x)));
		if (missing.size !== 0 || unwanted.size !== 0)
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError, this.name +
					" must contain exactly the same elements as " + name).
					addContext("Actual", this.actual).
					addContext("Expected", expectedAsSet).
					addContext("Missing", missing).
					addContext("Unwanted", unwanted);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError, this.name + " must contain exactly: " +
					this.config.convertToString(expectedAsSet)).
					addContext("Actual", this.actual).
					addContext("Missing", missing).
					addContext("Unwanted", unwanted);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value contains any of the elements in the expected value.
	 *
	 * @param {Set} expected the Set of elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetValidator|SetValidatorNoOp} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an <code>Array</code>
	 *   or <code>Set</code>
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	containsAny(expected, name)
	{
		const expectedAsSet = asSet(expected, "expected");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");

		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new SetValidatorNoOp(this.failures);
		}
		if (!actualContainsAny(this.actual, expectedAsSet))
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain any entry in " + name).
					addContext("Actual", this.actual).
					addContext("Expected", expectedAsSet);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain any entry in: " + this.config.convertToString(expectedAsSet)).
					addContext("Actual", this.actual);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value contains all of the elements in the expected value.
	 *
	 * @param {Set} expected the Set of elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetValidator|SetValidatorNoOp} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an <code>Array</code>
	 *   or <code>Set</code>
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	containsAll(expected, name)
	{
		const expectedAsSet = asSet(expected, "expected");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");

		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new SetValidatorNoOp(this.failures);
		}
		if (!actualContainsAll(this.actual, expectedAsSet))
		{
			const missing = new Set([...expectedAsSet].filter(x => !this.actual.has(x)));
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain all elements in " + name).
					addContext("Actual", this.actual).
					addContext("Missing", missing);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain all elements in: " + this.config.convertToString(expectedAsSet)).
					addContext("Actual", this.actual).
					addContext("Expected", expectedAsSet).
					addContext("Missing", missing);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value does not contain an entry.
	 *
	 * @param {object} entry an entry
	 * @param {string} [name] the name of the entry
	 * @return {SetValidator|SetValidatorNoOp} the updated validator
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	doesNotContain(entry, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");

		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new SetValidatorNoOp(this.failures);
		}
		if (this.actual.has(entry))
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " may not contain " + name + ".").
					addContext("Actual", this.actual).
					addContext("Unwanted", entry);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " may not contain " + this.config.convertToString(entry)).
					addContext("Actual", this.actual);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value does not contain any of the specified elements.
	 *
	 * @param {Array|Set} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {SetValidator|SetValidatorNoOp} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an <code>Array</code>
	 *   or [@code Set}
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	doesNotContainAny(elements, name)
	{
		const elementsAsSet = asSet(elements, "elements");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");

		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new SetValidatorNoOp(this.failures);
		}
		if (actualContainsAny(this.actual, elementsAsSet))
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must not contain any element in " + name).
					addContext("Actual", this.actual).
					addContext("Unwanted", elementsAsSet);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must not contain any element in: " + this.config.convertToString(elementsAsSet)).
					addContext("Actual", this.actual);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the array does not contain all of the specified elements.
	 *
	 * @param {Set} elements a Set of elements
	 * @param {string} [name] the name of the elements
	 * @return {SetValidator|SetValidatorNoOp} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an <code>Array</code>
	 *   or [@code Set}
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	doesNotContainAll(elements, name)
	{
		const elementsAsSet = asSet(elements, "elements");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");

		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new SetValidatorNoOp(this.failures);
		}
		if (actualContainsAll(this.actual, elementsAsSet))
		{
			const missing = new Set([...elementsAsSet].filter(x => !this.actual.has(x)));
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " may not contain all elements in " + name).
					addContext("Actual", this.actual).
					addContext("Missing", missing);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " may not contain all elements in: " + this.config.convertToString(elementsAsSet)).
					addContext("Actual", this.actual).
					addContext("Unwanted", elementsAsSet).
					addContext("Missing", missing);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * @return {SizeValidator|SizeValidatorNoOp} a validator for the Set's size
	 */
	size()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new SizeValidatorNoOp(this.failures);
		}
		return new SizeValidator(this.config, this.actual, this.name, this.actual.size, this.name + ".size",
			Pluralizer.ELEMENT);
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberValidator} for the Set's size
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	sizeConsumer(consumer)
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.size());
		return this;
	}

	/**
	 * @return {ArrayValidator} a validator for the Set's elements
	 */
	asArray()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new SetValidatorNoOp(this.failures);
		}
		return new ArrayValidator(this.config, Array.from(this.actual.values()), this.name + ".asArray()");
	}

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayValidator} for the Set's elements
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asArrayConsumer(consumer)
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asArray());
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SetValidator as default};