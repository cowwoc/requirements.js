import {isEqual} from "lodash";
import {
	AbstractObjectValidator,
	ArrayValidator,
	ArrayValidatorNoOp,
	Configuration,
	NumberValidator,
	Objects,
	Pluralizer,
	SetValidator,
	SetValidatorImpl,
	SetValidatorNoOp,
	SizeValidatorImpl,
	ValidationFailure,
	NumberValidatorNoOp
} from "./internal";

/**
 * Default implementation of <code>ArrayValidator</code>.
 */
class ArrayValidatorImpl extends AbstractObjectValidator<ArrayValidator>
	implements ArrayValidator
{
	private readonly actualArray: unknown[];
	private readonly pluralizer: Pluralizer;

	/**
	 * Creates a new ArrayValidatorImpl.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {Array} actual the actual value
	 * @param {string} [name] the name of the value
	 * @param {Pluralizer} pluralizer the plural form of the array elements
	 * @throws {TypeError} if <code>configuration</code> or <code>name</code> are null or undefined
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	constructor(configuration: Configuration, actual: unknown[], name: string, pluralizer: Pluralizer)
	{
		super(configuration, actual, name);
		this.actualArray = actual;
		this.pluralizer = pluralizer;
	}

	protected getThis(): ArrayValidator
	{
		return this;
	}

	protected getNoOp(): ArrayValidator
	{
		return new ArrayValidatorNoOp(this.failures);
	}

	isEmpty(): ArrayValidator
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

		if (this.actualArray.length !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be empty").
				addContext("Actual", this.actualArray);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isNotEmpty(): ArrayValidator
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

		if (this.actualArray.length === 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " may not be empty.");
			this.failures.push(failure);
		}
		return this.getThis();
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
			if (ArrayValidatorImpl.arrayContainsElement(array, element))
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
			if (!ArrayValidatorImpl.arrayContainsElement(array, element))
				return false;
		}
		return true;
	}

	contains(element: unknown, name?: string): ArrayValidator
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

		if (!ArrayValidatorImpl.arrayContainsElement(this.actualArray, element))
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
		return this.getThis();
	}

	containsExactly(expected: unknown[], name?: string): ArrayValidator
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(expected, "expected", "Array");
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

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
		return this.getThis();
	}

	containsAny(expected: unknown[], name?: string): ArrayValidator
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(expected, "expected", "Array");
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

		if (!ArrayValidatorImpl.arrayContainsAny(this.actualArray, expected))
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
		return this.getThis();
	}

	containsAll(expected: unknown[], name?: string): ArrayValidator
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(expected, "expected", "Array");
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

		if (!ArrayValidatorImpl.arrayContainsAll(this.actualArray, expected))
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
		return this.getThis();
	}

	doesNotContain(element: unknown, name?: string): ArrayValidator
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

		if (ArrayValidatorImpl.arrayContainsElement(this.actualArray, element))
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
		return this.getThis();
	}

	doesNotContainAny(elements: unknown[], name?: string): ArrayValidator
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(elements, "elements", "Array");
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

		if (ArrayValidatorImpl.arrayContainsAny(this.actualArray, elements))
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
		return this.getThis();
	}

	doesNotContainAll(elements: unknown[], name?: string): ArrayValidator
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(elements, "elements", "Array");
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

		if (ArrayValidatorImpl.arrayContainsAll(this.actualArray, elements))
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
		return this.getThis();
	}

	doesNotContainDuplicates(): ArrayValidator
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

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
		return this.getThis();
	}

	length(): NumberValidator
	{
		if (!this.requireThatActualIsSet())
			return new NumberValidatorNoOp(this.failures);
		return new SizeValidatorImpl(this.config, this.actualArray, this.name, this.actualArray.length,
			this.name + ".length", this.pluralizer);
	}

	lengthConsumer(consumer: (length: NumberValidator) => void): ArrayValidator
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.length());
		return this.getThis();
	}

	asSet(): SetValidator
	{
		if (!this.requireThatActualIsSet())
			return new SetValidatorNoOp(this.failures);
		return new SetValidatorImpl(this.config, new Set(this.actualArray), this.name + ".asSet()");
	}

	getActual(): unknown[]
	{
		return this.actualArray;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayValidatorImpl as default};