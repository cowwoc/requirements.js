import type {
	ArrayValidator,
	Configuration,
	NumberValidator,
	SetValidator
} from "./internal.mjs";
import {
	AbstractObjectValidator,
	ArrayValidatorImpl,
	Objects,
	ObjectValidatorImpl,
	ObjectVerifierImpl,
	Pluralizer,
	SizeValidatorImpl,
	ValidationFailure
} from "./internal.mjs";

/**
 * Default implementation of <code>SetValidator</code>.
 */
class SetValidatorImpl extends AbstractObjectValidator<SetValidator>
	implements SetValidator
{
	private readonly actualSet: void | Set<unknown>;

	/**
	 * Creates a new SetValidatorImpl.
	 *
	 * @param configuration - the instance configuration
	 * @param actual - the actual value
	 * @param name - the name of the value
	 * @param failures - the list of validation failures
	 * @throws TypeError if <code>configuration</code> or <code>name</code> are null or undefined
	 * @throws RangeError if <code>name</code> is empty
	 */
	constructor(configuration: Configuration, actual: void | Set<unknown>, name: string,
		failures: ValidationFailure[])
	{
		super(configuration, actual, name, failures);
		this.actualSet = actual;
	}

	protected getThis()
	{
		return this;
	}

	isEmpty()
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;


		const actualAsNotVoid: Set<unknown> = this.actualSet as Set<unknown>;
		if (actualAsNotVoid.size !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be empty.").
				addContext("Actual", this.actualSet);
			this.failures.push(failure);
		}
		return this;
	}

	isNotEmpty()
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		const actualAsNotVoid: Set<unknown> = this.actualSet as Set<unknown>;
		if (actualAsNotVoid.size === 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be empty");
			this.failures.push(failure);
		}
		return this;
	}

	contains(expected: unknown, name?: string)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;


		const actualAsNotVoid: Set<unknown> = this.actualSet as Set<unknown>;
		if (!actualAsNotVoid.has(expected))
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
	 * @param value - the value
	 * @param name - the name of the value
	 * @returns the value converted to a Set
	 */
	private convertToSet(value: unknown[] | Set<unknown>, name: string)
	{
		const expectedValidator = new ObjectValidatorImpl(this.config, value, name, this.failures);
		const expectedVerifier = new ObjectVerifierImpl(expectedValidator);
		return expectedVerifier.asSet().getActual();
	}

	containsExactly(expected: unknown[] | Set<unknown>, name?: string): SetValidator
	{
		const expectedAsSet = this.convertToSet(expected, "expected");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;


		const actualAsNotVoid: Set<unknown> = this.actualSet as Set<unknown>;
		const missing = new Set([...expectedAsSet].filter(x => !actualAsNotVoid.has(x)));
		const unwanted = new Set([...actualAsNotVoid].filter(x => !expectedAsSet.has(x)));
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

	containsAny(expected: unknown[] | Set<unknown>, name?: string): SetValidator
	{
		const expectedAsSet = this.convertToSet(expected, "expected");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;


		const actualAsNotVoid: Set<unknown> = this.actualSet as Set<unknown>;
		if (!SetValidatorImpl.actualContainsAny(actualAsNotVoid, expectedAsSet))
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

	containsAll(expected: unknown[] | Set<unknown>, name?: string): SetValidator
	{
		const expectedAsSet = this.convertToSet(expected, "expected");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;


		const actualAsNotVoid: Set<unknown> = this.actualSet as Set<unknown>;
		if (!SetValidatorImpl.actualContainsAll(actualAsNotVoid, expectedAsSet))
		{
			const missing = new Set([...expectedAsSet].filter(x => !actualAsNotVoid.has(x)));
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

	doesNotContain(entry: unknown, name?: string): SetValidator
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;


		const actualAsNotVoid: Set<unknown> = this.actualSet as Set<unknown>;
		if (actualAsNotVoid.has(entry))
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

	doesNotContainAny(elements: unknown[] | Set<unknown>, name?: string): SetValidator
	{
		const elementsAsSet = this.convertToSet(elements, "elements");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;


		const actualAsNotVoid: Set<unknown> = this.actualSet as Set<unknown>;
		if (SetValidatorImpl.actualContainsAny(actualAsNotVoid, elementsAsSet))
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

	doesNotContainAll(elements: unknown[] | Set<unknown>, name?: string): SetValidator
	{
		const elementsAsSet = this.convertToSet(elements, "elements");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;


		const actualAsNotVoid: Set<unknown> = this.actualSet as Set<unknown>;
		if (SetValidatorImpl.actualContainsAll(actualAsNotVoid, elementsAsSet))
		{
			const missing = new Set([...elementsAsSet].filter(x => !actualAsNotVoid.has(x)));
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

	size(): NumberValidator
	{
		let value: void | Set<unknown>;
		let size: number;
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
		{
			value = undefined;
			size = 0;
		}
		else
		{
			value = this.actualSet as Set<unknown>;
			size = value.size;
		}
		return new SizeValidatorImpl(this.config, value, this.name, size, this.name + ".size",
			Pluralizer.ELEMENT, this.failures);
	}

	sizeConsumer(consumer: (actual: NumberValidator) => void): SetValidator
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.size());
		return this;
	}

	asArray(): ArrayValidator
	{
		let value: void | unknown[];
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			value = undefined;
		else
		{
			const actualAsNotVoid = this.actual as unknown[];
			value = Array.from(actualAsNotVoid.values());
		}

		return new ArrayValidatorImpl(this.config, value, this.name + ".asArray()",
			Pluralizer.ELEMENT, this.failures);
	}

	asArrayConsumer(consumer: (actual: ArrayValidator) => void): SetValidator
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		consumer(this.asArray());
		return this;
	}

	/**
	 * @param actual - a Set
	 * @param expected - a set of expected elements
	 * @returns <code>true</code> if <code>actual</code> contains any of the <code>expected</code> elements
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
	 * @param actual - a Set
	 * @param expected - a Set of expected values
	 * @returns <code>true</code> if <code>actual</code> contains all the <code>expected</code> elements
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

	getActual(): void | Set<unknown>
	{
		return this.actualSet;
	}
}

export {SetValidatorImpl};