import {
	AbstractObjectValidator,
	type ArrayValidator,
	Configuration,
	type NumberValidator,
	Objects,
	Pluralizer,
	type SetValidator,
	SetValidatorImpl,
	SizeValidatorImpl,
	ValidationFailure
} from "./internal.mjs";
import isEqual from "lodash/isEqual.js";

/**
 * Default implementation of <code>ArrayValidator</code>.
 */
class ArrayValidatorImpl extends AbstractObjectValidator<ArrayValidator>
	implements ArrayValidator
{
	private readonly actualArray: void | unknown[];
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
	constructor(configuration: Configuration, actual: void | unknown[], name: string, pluralizer: Pluralizer,
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


		const actualAsNotVoid = this.actualArray as unknown[];
		if (actualAsNotVoid.length > 0)
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


		const actualAsNotVoid = this.actualArray as unknown[];
		if (actualAsNotVoid.length === 0)
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
	 * @param array - an array
	 * @param expected - an array of expected values
	 * @returns true if <code>actual</code> contains any of the <code>expected</code> elements
	 */
	private static arrayContainsAny(array: unknown[], expected: unknown[]): boolean
	{
		for (const element of expected)
		{
			if (ArrayValidatorImpl.arrayContainsElement(array, element))
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
	private static arrayContainsAll(array: unknown[], expected: unknown[]): boolean
	{
		for (const element of expected)
		{
			if (!ArrayValidatorImpl.arrayContainsElement(array, element))
				return false;
		}
		return true;
	}

	contains(element: unknown, name?: string): ArrayValidator
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;


		const actualAsNotVoid = this.actualArray as unknown[];
		if (!ArrayValidatorImpl.arrayContainsElement(actualAsNotVoid, element))
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

	containsExactly(expected: unknown[], name?: string): ArrayValidator
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		Objects.requireThatTypeOf(expected, "expected", "array");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;


		const actualAsNotVoid = this.actualArray as unknown[];
		const expectedAsSet = new Set(expected);
		const actualAsSet = new Set(actualAsNotVoid);
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

	containsAny(expected: unknown[], name?: string): ArrayValidator
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		Objects.requireThatTypeOf(expected, "expected", "array");

		const actualAsNotVoid = this.actualArray as unknown[];
		if (!ArrayValidatorImpl.arrayContainsAny(actualAsNotVoid, expected))
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

	containsAll(expected: unknown[], name?: string): ArrayValidator
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		Objects.requireThatTypeOf(expected, "expected", "array");

		const actualAsNotVoid = this.actualArray as unknown[];
		if (!ArrayValidatorImpl.arrayContainsAll(actualAsNotVoid, expected))
		{
			const expectedAsSet = new Set(expected);
			const actualAsSet = new Set(actualAsNotVoid);
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

	doesNotContain(element: unknown, name?: string): ArrayValidator
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;


		const actualAsNotVoid = this.actualArray as unknown[];
		if (ArrayValidatorImpl.arrayContainsElement(actualAsNotVoid, element))
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

	doesNotContainAny(elements: unknown[], name?: string): ArrayValidator
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		Objects.requireThatTypeOf(elements, "elements", "array");

		const actualAsNotVoid = this.actualArray as unknown[];
		if (ArrayValidatorImpl.arrayContainsAny(actualAsNotVoid, elements))
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

	doesNotContainAll(elements: unknown[], name?: string): ArrayValidator
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		Objects.requireThatTypeOf(elements, "elements", "array");

		const actualAsNotVoid = this.actualArray as unknown[];
		if (ArrayValidatorImpl.arrayContainsAll(actualAsNotVoid, elements))
		{
			const elementsAsSet = new Set(elements);
			const actualAsSet = new Set(actualAsNotVoid);
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

	doesNotContainDuplicates(): ArrayValidator
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;


		const unique = new Set();
		const duplicates = new Set();
		const actualAsNotVoid = this.actualArray as unknown[];
		for (const element of actualAsNotVoid)
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
		let value: void | unknown[];
		let length;
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
		{
			value = undefined;
			length = 0;
		}
		else
		{
			value = this.actualArray as unknown[];
			length = value.length;
		}
		return new SizeValidatorImpl(this.config, value, this.name, length, this.name + ".length",
			this.pluralizer, this.failures);
	}

	lengthConsumer(consumer: (length: NumberValidator) => void): ArrayValidator
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.length());
		return this;
	}

	asSet(): SetValidator
	{
		let value: void | Set<unknown>;
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			value = undefined;
		else
		{
			const actualAsNotVoid = this.actualArray as unknown[];
			value = new Set(actualAsNotVoid);
		}
		return new SetValidatorImpl(this.config, value, this.name + ".asSet()", this.failures);
	}

	getActual(): void | unknown[]
	{
		return this.actualArray;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayValidatorImpl as default};