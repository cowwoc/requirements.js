import ObjectValidator from "./ObjectValidatorBase.js";
import Objects from "../Objects.js";
import ValidationFailure from "../../ValidationFailure.js";
import ArrayValidatorNoOp from "../ArrayValidatorNoOp.js";
import Configuration from "../../Configuration.js";
import Pluralizer from "../../Pluralizer.js";
import Sugar from "sugar-array";

// DESIGN:
// * Declare the class without methods that trigger circular dependencies
// * Load the dependencies
// * Add the missing methods

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
 * Validates the requirements of an array.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class ArrayValidator extends ObjectValidator
{
	/**
	 * Creates a new ArrayValidator.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {object} actual the actual value
	 * @param {string} name   the name of the value
	 * @param {Pluralizer} [pluralizer=Pluralizer.ELEMENT] returns the singular or plural form of the
	 *   container's element type
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
	 * @return {ArrayValidator|ArrayValidatorNoOp} the updated validator
	 */
	isEmpty()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new ArrayValidatorNoOp(this.failures);
		}
		if (this.actual.length !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be empty");
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is not empty.
	 *
	 * @return {ArrayValidator|ArrayValidatorNoOp} the updated validator
	 */
	isNotEmpty()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new ArrayValidatorNoOp(this.failures);
		}
		if (this.actual.length === 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be empty.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the array contains an element.
	 *
	 * @param {object} element the element that must exist
	 * @param {string} [name] the name of the element
	 * @return {ArrayValidator|ArrayValidatorNoOp} the updated validator
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	contains(element, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new ArrayValidatorNoOp(this.failures);
		}
		if (!arrayContainsElement(this.actual, element))
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain " + name + ".").
					addContext("Actual", this.actual).
					addContext("Expected", element);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError, this.name + " must contain " +
					this.config.convertToString(element)).
					addContext("Actual", this.actual);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the array contains exactly the specified elements; nothing less, nothing more.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {ArrayValidator|ArrayValidatorNoOp} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	containsExactly(expected, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(expected, "expected", "Array");
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new ArrayValidatorNoOp(this.failures);
		}
		const expectedAsSet = new Set(expected);
		const actualAsSet = new Set(this.actual);
		const missing = new Set([...expectedAsSet].filter(x => !actualAsSet.has(x)));
		const unwanted = new Set([...actualAsSet].filter(x => !expectedAsSet.has(x)));
		if (missing.size !== 0 || unwanted.size !== 0)
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError, this.name +
					" must contain exactly the same elements as " + name).
					addContext("Actual", this.actual).
					addContext("Expected", expected).
					addContext("Missing", missing).
					addContext("Unwanted", unwanted);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain exactly: " + this.config.convertToString(expected)).
					addContext("Actual", this.actual).
					addContext("Missing", missing).
					addContext("Unwanted", unwanted);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the array contains any of the specified elements.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {ArrayValidator|ArrayValidatorNoOp} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	containsAny(expected, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(expected, "expected", "Array");
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new ArrayValidatorNoOp(this.failures);
		}
		if (!arrayContainsAny(this.actual, expected))
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain any element in " + name).
					addContext("Actual", this.actual).
					addContext("Expected", expected);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain any element in: " + this.config.convertToString(expected)).
					addContext("Actual", this.actual);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the array contains all of the specified elements.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {ArrayValidator|ArrayValidatorNoOp} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	containsAll(expected, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(expected, "expected", "Array");
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new ArrayValidatorNoOp(this.failures);
		}
		if (!arrayContainsAll(this.actual, expected))
		{
			const expectedAsSet = new Set(expected);
			const actualAsSet = new Set(this.actual);
			const missing = new Set([...expectedAsSet].filter(x => !actualAsSet.has(x)));
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain all elements in " + name).
					addContext("Actual", this.actual).
					addContext("Expected", expected).
					addContext("Missing", missing);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain all elements in: " + this.config.convertToString(expected)).
					addContext("Actual", this.actual).
					addContext("Missing", missing);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the array does not contain an element.
	 *
	 * @param {object} element the element that must not exist
	 * @param {string} [name] the name of the element
	 * @return {ArrayValidator|ArrayValidatorNoOp} the updated validator
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	doesNotContain(element, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new ArrayValidatorNoOp(this.failures);
		}
		if (arrayContainsElement(this.actual, element))
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " may not contain " + name + ".").
					addContext("Actual", this.actual).
					addContext("Unwanted", element);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " may not contain " + this.config.convertToString(element)).
					addContext("Actual", this.actual);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the array does not contain any of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {ArrayValidator|ArrayValidatorNoOp} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	doesNotContainAny(elements, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(elements, "elements", "Array");
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new ArrayValidatorNoOp(this.failures);
		}
		if (arrayContainsAny(this.actual, elements))
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must not contain any element in " + name).
					addContext("Actual", this.actual).
					addContext("Unwanted", elements);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must not contain any element in: " + this.config.convertToString(elements)).
					addContext("Actual", this.actual);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the array does not contain all of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {ArrayValidator|ArrayValidatorNoOp} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	doesNotContainAll(elements, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(elements, "elements", "Array");
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new ArrayValidatorNoOp(this.failures);
		}
		if (arrayContainsAll(this.actual, elements))
		{
			const elementsAsSet = new Set(elements);
			const actualAsSet = new Set(this.actual);
			const missing = new Set([...elementsAsSet].filter(x => !actualAsSet.has(x)));
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
					this.name + " may not contain all elements in: " + this.config.convertToString(elements)).
					addContext("Actual", this.actual).
					addContext("Unwanted", elements).
					addContext("Missing", missing);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the array does not contain any duplicate elements.
	 *
	 * @return {ArrayValidator|ArrayValidatorNoOp} the updated validator
	 */
	doesNotContainDuplicates()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new ArrayValidatorNoOp(this.failures);
		}
		const unique = new Set();
		const duplicates = new Set();
		for (const element of this.actual)
		{
			if (unique.has(element))
				duplicates.add(element);
			else
				unique.add(element);
		}
		if (duplicates.size !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not contain duplicate elements").
				addContext("Actual", this.actual).
				addContext("Duplicates", duplicates);
			this.failures.push(failure);
		}
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayValidator as default};