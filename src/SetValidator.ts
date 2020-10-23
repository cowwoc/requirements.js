import {
	ObjectValidator,
	ArrayValidator,
	SizeValidator,
	Objects,
	ValidationFailure,
	Pluralizer,
	Configuration,
	NumberValidator,
	ObjectVerifier
} from "./internal/internal";

/**
 * Validates the requirements of a <code>Set</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class SetValidator extends ObjectValidator
{
	private readonly actualSet: Set<unknown>;

	constructor(configuration: Configuration, actual: unknown, name: string)
	{
		super(configuration, actual, name);
		this.actualSet = actual as Set<unknown>;
	}

	/**
	 * Ensures that value does not contain any elements.
	 *
	 * @return {SetValidator} the updated validator
	 */
	isEmpty(): this
	{
		if (this.actualSet.size !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be empty.").
				addContext("Actual", this.actualSet);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that value contains at least one element.
	 *
	 * @return {SetValidator} the updated validator
	 */
	isNotEmpty(): this
	{
		if (this.actualSet.size === 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be empty");
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value contains an entry.
	 *
	 * @param {object} expected the expected value
	 * @param {string} [name] the name of the expected value
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	contains(expected: unknown, name?: string): this
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");

		if (!this.actualSet.has(expected))
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain " + name).
					addContext("Actual", this.actualSet).
					addContext("Expected", expected);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError, this.name + "  must contain " +
					this.config.convertToString(expected)).
					addContext("Actual", this.actualSet);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * @param {object} value the value
	 * @param {string} name the name of the value
	 * @return {Set} the value converted to a Set
	 * @private
	 */
	private convertToSet(value: unknown[] | Set<unknown>, name: string): Set<unknown>
	{
		const expectedValidator = new ObjectValidator(this.config, value, name);
		const expectedVerifier = new ObjectVerifier(expectedValidator);
		return expectedVerifier.asSet().getActual() as Set<unknown>;
	}

	/**
	 * Ensures that the actual value contains exactly the same elements as the expected value; nothing less,
	 * nothing more.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an <code>Array</code>
	 *   or <code>Set</code>
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	containsExactly(expected: unknown[] | Set<unknown>, name?: string): this
	{
		const expectedAsSet = this.convertToSet(expected, "expected");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");

		const missing = new Set([...expectedAsSet].filter(x => !this.actualSet.has(x)));
		const unwanted = new Set([...this.actualSet].filter(x => !expectedAsSet.has(x)));
		if (missing.size !== 0 || unwanted.size !== 0)
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError, this.name +
					" must contain exactly the same elements as " + name).
					addContext("Actual", this.actualSet).
					addContext("Expected", expectedAsSet).
					addContext("Missing", missing).
					addContext("Unwanted", unwanted);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain exactly: " + this.config.convertToString(expectedAsSet)).
					addContext("Actual", this.actualSet).
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
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an <code>Array</code>
	 *   or <code>Set</code>
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	containsAny(expected: unknown[] | Set<unknown>, name?: string): this
	{
		const expectedAsSet = this.convertToSet(expected, "expected");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");

		if (!SetValidator.actualContainsAny(this.actualSet, expectedAsSet))
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain any entry in " + name).
					addContext("Actual", this.actualSet).
					addContext("Expected", expectedAsSet);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain any entry in: " + this.config.convertToString(expectedAsSet)).
					addContext("Actual", this.actualSet);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value contains all of the elements in the expected value.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an <code>Array</code>
	 *   or <code>Set</code>
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	containsAll(expected: unknown[] | Set<unknown>, name?: string): this
	{
		const expectedAsSet = this.convertToSet(expected, "expected");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");

		if (!SetValidator.actualContainsAll(this.actualSet, expectedAsSet))
		{
			const missing = new Set([...expectedAsSet].filter(x => !this.actualSet.has(x)));
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain all elements in " + name).
					addContext("Actual", this.actualSet).
					addContext("Missing", missing);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must contain all elements in: " + this.config.convertToString(expectedAsSet)).
					addContext("Actual", this.actualSet).
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
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	doesNotContain(entry: unknown, name?: string): this
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");

		if (this.actualSet.has(entry))
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " may not contain " + name + ".").
					addContext("Actual", this.actualSet).
					addContext("Unwanted", entry);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " may not contain " + this.config.convertToString(entry)).
					addContext("Actual", this.actualSet);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value does not contain any of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an <code>Array</code>
	 *   or [@code Set}
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	doesNotContainAny(elements: unknown[] | Set<unknown>, name?: string): this
	{
		const elementsAsSet = this.convertToSet(elements, "elements");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");

		if (SetValidator.actualContainsAny(this.actualSet, elementsAsSet))
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must not contain any element in " + name).
					addContext("Actual", this.actualSet).
					addContext("Unwanted", elementsAsSet);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must not contain any element in: " + this.config.convertToString(elementsAsSet)).
					addContext("Actual", this.actualSet);
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
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an <code>Array</code>
	 *   or [@code Set}
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	doesNotContainAll(elements: unknown[] | Set<unknown>, name?: string): this
	{
		const elementsAsSet = this.convertToSet(elements, "elements");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");

		if (SetValidator.actualContainsAll(this.actualSet, elementsAsSet))
		{
			const missing = new Set([...elementsAsSet].filter(x => !this.actualSet.has(x)));
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " may not contain all elements in " + name).
					addContext("Actual", this.actualSet).
					addContext("Missing", missing);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " may not contain all elements in: " + this.config.convertToString(elementsAsSet)).
					addContext("Actual", this.actualSet).
					addContext("Unwanted", elementsAsSet).
					addContext("Missing", missing);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * @return {SizeValidator} a validator for the Set's size
	 */
	size(): SizeValidator
	{
		return new SizeValidator(this.config, this.actualSet, this.name, this.actualSet.size,
			this.name + ".size", Pluralizer.ELEMENT);
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberValidator} for the Set's size
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	sizeConsumer(consumer: (actual: NumberValidator) => void): SetValidator
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.size());
		return this;
	}

	/**
	 * @return {ArrayValidator} a validator for the Set's elements
	 */
	asArray(): ArrayValidator
	{
		return new ArrayValidator(this.config, Array.from(this.actualSet.values()), this.name + ".asArray()",
			Pluralizer.ELEMENT);
	}

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayValidator} for the Set's elements
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asArrayConsumer(consumer: (actual: ArrayValidator) => void): this
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asArray());
		return this;
	}

	/**
	 * @param {Set} actual a Set
	 * @param {Set} expected a set of expected elements
	 * @return {boolean} true if <code>actual</code> contains any of the <code>expected</code> elements
	 * @private
	 */
	private static actualContainsAny(actual: Set<unknown>, expected: Set<unknown>): boolean
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
	 * @private
	 */
	private static actualContainsAll(actual: Set<unknown>, expected: Set<unknown>): boolean
	{
		for (const entry of expected)
		{
			if (!actual.has(entry))
				return false;
		}
		return true;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SetValidator as default};