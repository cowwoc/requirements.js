import isEqual from "lodash/isEqual.js";
import type {
	ArrayValidator,
	Configuration,
	NumberValidator,
	Pluralizer
} from "./internal.mjs";
import {
	AbstractObjectValidator,
	Objects,
	SizeValidatorImpl,
	ValidationFailure
} from "./internal.mjs";

/**
 * Default implementation of <code>ArrayValidator</code>.
 *
 * @typeParam T - the type the actual value
 */
class ArrayValidatorImpl<E> extends AbstractObjectValidator<ArrayValidator<E>, E[]>
	implements ArrayValidator<E>
{
	private readonly pluralizer: Pluralizer;

	/**
	 * Creates a new ArrayValidatorImpl.
	 *
	 * @param configuration - the instance configuration
	 * @param actual - the actual value
	 * @param name - (optional) the name of the value
	 * @param pluralizer - the plural form of the array elements
	 * @param failures - the list of validation failures
	 * @throws TypeError if <code>configuration</code> or <code>name</code> are null or undefined
	 * @throws RangeError if <code>name</code> is empty
	 */
	constructor(configuration: Configuration, actual: E[] | undefined, name: string, pluralizer: Pluralizer,
		failures: ValidationFailure[])
	{
		super(configuration, actual, name, failures);
		this.pluralizer = pluralizer;
	}

	isEmpty()
	{
		if (this.actual === undefined || this.actual.length > 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be empty").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	isNotEmpty()
	{
		if (this.actual === undefined || this.actual.length === 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " may not be empty.");
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Indicates if an array contains at least one element of another array.
	 *
	 * @param array - an array of arrays
	 * @param element - an element
	 * @returns true if <code>arrays</code> contains the element
	 */
	private arrayContainsElement(array: E[], element: E): boolean
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
	 * @param array - an array
	 * @param expected - an array of expected values
	 * @returns true if <code>actual</code> contains any of the <code>expected</code> elements
	 */
	private arrayContainsAny(array: E[], expected: E[]): boolean
	{
		for (const element of expected)
		{
			if (this.arrayContainsElement(array, element))
				return true;
		}
		return false;
	}

	/**
	 * Indicates if an array contains all elements of another array.
	 *
	 * @param array - an array
	 * @param expected - an array of expected elements
	 * @returns true if <code>actual</code> contains all the <code>expected</code> elements
	 */
	private arrayContainsAll(array: E[], expected: E[]): boolean
	{
		for (const element of expected)
		{
			if (!this.arrayContainsElement(array, element))
				return false;
		}
		return true;
	}

	contains(element: E, name?: string): ArrayValidator<E>
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");

		if (this.actual === undefined || !this.arrayContainsElement(this.actual, element))
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

	containsExactly(expected: E[], name?: string): ArrayValidator<E>
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		Objects.requireThatTypeOf(expected, "expected", "array");

		const expectedAsSet = new Set(expected);
		let missing;
		let unwanted;
		if (this.actual === undefined)
		{
			missing = undefined;
			unwanted = undefined;
		}
		else
		{
			const actualAsSet = new Set(this.actual);
			missing = new Set([...expectedAsSet].filter(x => !actualAsSet.has(x)));
			unwanted = new Set([...actualAsSet].filter(x => !expectedAsSet.has(x)));
		}
		if (missing === undefined || unwanted === undefined || missing.size !== 0 || unwanted.size !== 0)
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

	containsAny(expected: E[], name?: string): ArrayValidator<E>
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");

		Objects.requireThatTypeOf(expected, "expected", "array");

		if (this.actual === undefined || !this.arrayContainsAny(this.actual, expected))
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

	containsAll(expected: E[], name?: string): ArrayValidator<E>
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");

		Objects.requireThatTypeOf(expected, "expected", "array");

		let missing;
		if (this.actual === undefined)
			missing = undefined;
		else
		{
			const expectedAsSet = new Set(expected);
			const actualAsSet = new Set(this.actual);
			missing = new Set([...expectedAsSet].filter(x => !actualAsSet.has(x)));
		}
		if (this.actual === undefined || !this.arrayContainsAll(this.actual, expected))
		{
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

	doesNotContain(element: E, name?: string): ArrayValidator<E>
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");

		if (this.actual === undefined || this.arrayContainsElement(this.actual, element))
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

	doesNotContainAny(elements: E[], name?: string): ArrayValidator<E>
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");

		Objects.requireThatTypeOf(elements, "elements", "array");

		if (this.actual === undefined || this.arrayContainsAny(this.actual, elements))
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

	doesNotContainAll(elements: E[], name?: string): ArrayValidator<E>
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");

		Objects.requireThatTypeOf(elements, "elements", "array");

		if (this.actual === undefined || this.arrayContainsAll(this.actual, elements))
		{
			let missing;
			if (this.actual === undefined)
				missing = undefined;
			else
			{
				const elementsAsSet = new Set(elements);
				const actualAsSet = new Set(this.actual);
				missing = new Set([...elementsAsSet].filter(x => !actualAsSet.has(x)));
			}
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

	doesNotContainDuplicates(): ArrayValidator<E>
	{
		const unique = new Set();
		const duplicates = new Set();
		if (this.actual !== undefined)
		{
			for (const element of this.actual)
			{
				if (unique.has(element))
					duplicates.add(element);
				else
					unique.add(element);
			}
		}
		if (this.actual === undefined || duplicates.size !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not contain duplicate elements").
				addContext("Actual", this.actual).
				addContext("Duplicates", duplicates);
			this.failures.push(failure);
		}
		return this;
	}

	length(): NumberValidator
	{
		let value: E[] | undefined;
		let length;
		if (this.actual === undefined)
		{
			value = undefined;
			length = 0;
		}
		else
		{
			value = this.actual;
			length = value.length;
		}
		return new SizeValidatorImpl(this.config, value, this.name, length, this.name + ".length",
			this.pluralizer, this.failures);
	}

	lengthConsumer(consumer: (length: NumberValidator) => void): ArrayValidator<E>
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.length());
		return this;
	}
}

export {ArrayValidatorImpl};