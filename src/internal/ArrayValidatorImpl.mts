import isEqual from "lodash/isEqual.js";
import type {
	ArrayValidator,
	Configuration,
	NumberValidator,
	Pluralizer,
	SetValidator
} from "./internal.mjs";
import {
	AbstractObjectValidator,
	Objects,
	SetValidatorImpl,
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
	private readonly actualArray: E[] | undefined;
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
		this.actualArray = actual;
		this.pluralizer = pluralizer;
	}

	protected getThis()
	{
		return this;
	}

	isEmpty()
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		const actualAsDefined = this.actualArray as E[];
		if (actualAsDefined.length > 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be empty").
				addContext("Actual", this.actualArray);
			this.failures.push(failure);
		}
		return this;
	}

	isNotEmpty()
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		const actualAsDefined = this.actualArray as E[];
		if (actualAsDefined.length === 0)
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
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		const actualAsDefined = this.actualArray as E[];
		if (!this.arrayContainsElement(actualAsDefined, element))
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

	containsExactly(expected: E[], name?: string): ArrayValidator<E>
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		Objects.requireThatTypeOf(expected, "expected", "array");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		const actualAsDefined = this.actualArray as E[];
		const expectedAsSet = new Set(expected);
		const actualAsSet = new Set(actualAsDefined);
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

	containsAny(expected: E[], name?: string): ArrayValidator<E>
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		Objects.requireThatTypeOf(expected, "expected", "array");

		const actualAsDefined = this.actualArray as E[];
		if (!this.arrayContainsAny(actualAsDefined, expected))
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

	containsAll(expected: E[], name?: string): ArrayValidator<E>
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		Objects.requireThatTypeOf(expected, "expected", "array");

		const actualAsDefined = this.actualArray as E[];
		if (!this.arrayContainsAll(actualAsDefined, expected))
		{
			const expectedAsSet = new Set(expected);
			const actualAsSet = new Set(actualAsDefined);
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

	doesNotContain(element: E, name?: string): ArrayValidator<E>
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		const actualAsDefined = this.actualArray as E[];
		if (this.arrayContainsElement(actualAsDefined, element))
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

	doesNotContainAny(elements: E[], name?: string): ArrayValidator<E>
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		Objects.requireThatTypeOf(elements, "elements", "array");

		const actualAsDefined = this.actualArray as E[];
		if (this.arrayContainsAny(actualAsDefined, elements))
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

	doesNotContainAll(elements: E[], name?: string): ArrayValidator<E>
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		Objects.requireThatTypeOf(elements, "elements", "array");

		const actualAsDefined = this.actualArray as E[];
		if (this.arrayContainsAll(actualAsDefined, elements))
		{
			const elementsAsSet = new Set(elements);
			const actualAsSet = new Set(actualAsDefined);
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

	doesNotContainDuplicates(): ArrayValidator<E>
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		const unique = new Set();
		const duplicates = new Set();
		const actualAsDefined = this.actualArray as E[];
		for (const element of actualAsDefined)
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

	length(): NumberValidator
	{
		let value: E[] | undefined;
		let length;
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
		{
			value = undefined;
			length = 0;
		}
		else
		{
			value = this.actualArray as E[];
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

	asArray<E>(): ArrayValidator<E>;
	asArray(): ArrayValidator<E>
	{
		return this;
	}

	asArrayConsumer<E2>(consumer: (input: ArrayValidator<E2>) => void): ArrayValidator<E>
	asArrayConsumer(consumer: (input: ArrayValidator<E>) => void): ArrayValidator<E>
	{
		return super.asArrayConsumer(consumer);
	}

	asSet<E>(): SetValidator<E>;
	asSet(): SetValidator<E>
	{
		let value: Set<E> | undefined;
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			value = undefined;
		else
		{
			const actualAsDefined = this.actualArray as E[];
			value = new Set(actualAsDefined);
		}
		return new SetValidatorImpl<E>(this.config, value, this.name + ".asSet()", this.failures);
	}

	asSetConsumer<S, E>(consumer: (actual: SetValidator<E>) => void): S;
	asSetConsumer(consumer: (actual: SetValidator<E>) => void): ArrayValidator<E>
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.asSet());
		return this.getThis();
	}

	getActual(): E[] | undefined
	{
		return this.actualArray;
	}
}

export {ArrayValidatorImpl};