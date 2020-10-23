import {isEqual} from "lodash";
import {
	Objects,
	SetValidator,
	SizeValidator,
	ValidationFailure,
	Pluralizer,
	ObjectValidator,
	Configuration
} from "./internal/internal";

/**
 * Validates the requirements of an array.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class ArrayValidator extends ObjectValidator
{
	private readonly actualArray: unknown[];
	private readonly pluralizer: Pluralizer;

	/**
	 * Creates a new ArrayValidator.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {Array} actual the actual value
	 * @param {string} [name] the name of the value
	 * @param {Pluralizer} pluralizer the plural form of the array elements
	 * @throws {TypeError} if <code>name</code> or <code>config</code> are null or undefined
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	constructor(configuration: Configuration, actual: unknown[], name: string, pluralizer: Pluralizer)
	{
		super(configuration, actual, name);
		this.actualArray = actual;
		this.pluralizer = pluralizer;
	}

	/**
	 * Ensures that the actual value is empty.
	 *
	 * @return {ArrayValidator} the updated validator
	 */
	isEmpty(): this
	{
		if (this.actualArray.length !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be empty").
				addContext("Actual", this.actualArray);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is not empty.
	 *
	 * @return {ArrayValidator} the updated validator
	 */
	isNotEmpty(): this
	{
		if (this.actualArray.length === 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " may not be empty.");
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Indicates if an array contains at least one element of another array.
	 *
	 * @param {Array}  array an array of arrays
	 * @param {object} element an element
	 * @return {boolean} true if <code>arrays</code> contains the element
	 * @private
	 */
	private static arrayContainsElement(array: unknown[], element: unknown): boolean
	{
		// indexOf(), includes() do not work for multidimensional arrays: http://stackoverflow.com/a/24943461/14731
		for (let i = 0; i < array.length; ++i)
		{
			if (isEqual(array[i], element))
				return true;
		}
		return false;
	}

	/**
	 * @param  {Array}  array an array
	 * @param  {object} expected an array of expected values
	 * @return {boolean} true if <code>actual</code> contains any of the <code>expected</code> elements
	 * @private
	 */
	private static arrayContainsAny(array: unknown[], expected: unknown[]): boolean
	{
		for (const element of expected)
		{
			if (ArrayValidator.arrayContainsElement(array, element))
				return true;
		}
		return false;
	}

	/**
	 * Indicates if an array contains all elements of another array.
	 *
	 * @param  {Array} array an array
	 * @param  {Array} expected an array of expected elements
	 * @return {boolean} true if <code>actual</code> contains all of the <code>expected</code> elements
	 * @private
	 */
	private static arrayContainsAll(array: unknown[], expected: unknown[]): boolean
	{
		for (const element of expected)
		{
			if (!ArrayValidator.arrayContainsElement(array, element))
				return false;
		}
		return true;
	}

	/**
	 * Ensures that the array contains an element.
	 *
	 * @param {object} element the element that must exist
	 * @param {string} [name] the name of the element
	 * @return {ArrayValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	contains(element: unknown, name?: string): this
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		if (!ArrayValidator.arrayContainsElement(this.actualArray, element))
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain " + name + ".").
					addContext("Actual", this.actualArray).
					addContext("Expected", element);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError, this.name + " must contain " +
					this.config.convertToString(element)).
					addContext("Actual", this.actualArray);
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
	 * @return {ArrayValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	containsExactly(expected: unknown[], name?: string): this
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(expected, "expected", "Array");
		const expectedAsSet = new Set(expected);
		const actualAsSet = new Set(this.actualArray);
		const missing = new Set([...expectedAsSet].filter(x => !actualAsSet.has(x)));
		const unwanted = new Set([...actualAsSet].filter(x => !expectedAsSet.has(x)));
		if (missing.size !== 0 || unwanted.size !== 0)
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError, this.name +
					" must contain exactly the same elements as " + name).
					addContext("Actual", this.actualArray).
					addContext("Expected", expected).
					addContext("Missing", missing).
					addContext("Unwanted", unwanted);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain exactly: " + this.config.convertToString(expected)).
					addContext("Actual", this.actualArray).
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
	 * @return {ArrayValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	containsAny(expected: unknown[], name?: string): this
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(expected, "expected", "Array");

		if (!ArrayValidator.arrayContainsAny(this.actualArray, expected))
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain any element in " + name).
					addContext("Actual", this.actualArray).
					addContext("Expected", expected);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain any element in: " + this.config.convertToString(expected)).
					addContext("Actual", this.actualArray);
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
	 * @return {ArrayValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	containsAll(expected: unknown[], name?: string): this
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(expected, "expected", "Array");

		if (!ArrayValidator.arrayContainsAll(this.actualArray, expected))
		{
			const expectedAsSet = new Set(expected);
			const actualAsSet = new Set(this.actualArray);
			const missing = new Set([...expectedAsSet].filter(x => !actualAsSet.has(x)));
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain all elements in " + name).
					addContext("Actual", this.actualArray).
					addContext("Expected", expected).
					addContext("Missing", missing);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain all elements in: " + this.config.convertToString(expected)).
					addContext("Actual", this.actualArray).
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
	 * @return {ArrayValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	doesNotContain(element: unknown, name?: string): this
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");

		if (ArrayValidator.arrayContainsElement(this.actualArray, element))
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " may not contain " + name + ".").
					addContext("Actual", this.actualArray).
					addContext("Unwanted", element);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " may not contain " + this.config.convertToString(element)).
					addContext("Actual", this.actualArray);
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
	 * @return {ArrayValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	doesNotContainAny(elements: unknown[], name?: string): this
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(elements, "elements", "Array");

		if (ArrayValidator.arrayContainsAny(this.actualArray, elements))
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must not contain any element in " + name).
					addContext("Actual", this.actualArray).
					addContext("Unwanted", elements);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must not contain any element in: " + this.config.convertToString(elements)).
					addContext("Actual", this.actualArray);
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
	 * @return {ArrayValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	doesNotContainAll(elements: unknown[], name?: string): this
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(elements, "elements", "Array");

		if (ArrayValidator.arrayContainsAll(this.actualArray, elements))
		{
			const elementsAsSet = new Set(elements);
			const actualAsSet = new Set(this.actualArray);
			const missing = new Set([...elementsAsSet].filter(x => !actualAsSet.has(x)));
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " may not contain all elements in " + name).
					addContext("Actual", this.actualArray).
					addContext("Missing", missing);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " may not contain all elements in: " + this.config.convertToString(elements)).
					addContext("Actual", this.actualArray).
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
	 * @return {ArrayValidator} the updated validator
	 */
	doesNotContainDuplicates(): this
	{
		const unique = new Set();
		const duplicates = new Set();
		for (const element of this.actualArray)
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
				addContext("Actual", this.actualArray).
				addContext("Duplicates", duplicates);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * @return {SizeValidator} a validator for the length of the array
	 */
	length(): SizeValidator
	{
		return new SizeValidator(this.config, this.actualArray, this.name, this.actualArray.length,
			this.name + ".length", this.pluralizer);
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link SizeValidator} for the length of the
	 *   array
	 * @return {ArrayValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	lengthConsumer(consumer: (length: SizeValidator) => void): this
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.length());
		return this;
	}

	/**
	 * Verifies the Set representation of the array.
	 *
	 * @return {SetValidator} a <code>Set</code> validator
	 */
	asSet(): SetValidator
	{
		return new SetValidator(this.config, new Set(this.actualArray), this.name + ".asSet()");
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link SetValidator} for the Set representation of
	 *   the array
	 * @return {ArrayValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asSetConsumer(consumer: (actual: SetValidator) => void): this
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asSet());
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayValidator as default};