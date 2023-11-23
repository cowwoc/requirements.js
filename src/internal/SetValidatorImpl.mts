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
	Pluralizer,
	SizeValidatorImpl,
	ValidationFailure
} from "./internal.mjs";

/**
 * Default implementation of <code>SetValidator</code>.
 */
class SetValidatorImpl<E> extends AbstractObjectValidator<SetValidator<E>, Set<E>>
	implements SetValidator<E>
{
	private readonly actualSet: Set<E> | undefined;

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
	constructor(configuration: Configuration, actual: Set<E> | undefined, name: string,
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

		const actualAsDefined: Set<E> = this.actualSet as Set<E>;
		if (actualAsDefined.size !== 0)
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

		const actualAsDefined: Set<E> = this.actualSet as Set<E>;
		if (actualAsDefined.size === 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be empty");
			this.failures.push(failure);
		}
		return this;
	}

	contains(expected: E, name?: string)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		const actualAsDefined: Set<E> = this.actualSet as Set<E>;
		if (!actualAsDefined.has(expected))
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

	containsExactly(expected: E[] | Set<E>, name?: string): SetValidator<E>
	{
		const expectedAsSet = new Set<E>(expected);
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		const actualAsDefined: Set<E> = this.actualSet as Set<E>;
		const missing = new Set([...expectedAsSet].filter(x => !actualAsDefined.has(x)));
		const unwanted = new Set([...actualAsDefined].filter(x => !expectedAsSet.has(x)));
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

	containsAny(expected: E[] | Set<E>, name?: string): SetValidator<E>
	{
		const expectedAsSet = new Set<E>(expected);
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		const actualAsDefined: Set<E> = this.actualSet as Set<E>;
		if (!this.actualContainsAny(actualAsDefined, expectedAsSet))
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

	containsAll(expected: E[] | Set<E>, name?: string): SetValidator<E>
	{
		const expectedAsSet = new Set<E>(expected);
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		const actualAsDefined: Set<E> = this.actualSet as Set<E>;
		if (!this.actualContainsAll(actualAsDefined, expectedAsSet))
		{
			const missing = new Set([...expectedAsSet].filter(x => !actualAsDefined.has(x)));
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

	doesNotContain(entry: E, name?: string): SetValidator<E>
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		const actualAsDefined: Set<E> = this.actualSet as Set<E>;
		if (actualAsDefined.has(entry))
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

	doesNotContainAny(elements: E[] | Set<E>, name?: string): SetValidator<E>
	{
		const elementsAsSet = new Set<E>(elements);
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		const actualAsDefined: Set<E> = this.actualSet as Set<E>;
		if (this.actualContainsAny(actualAsDefined, elementsAsSet))
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

	doesNotContainAll(elements: E[] | Set<E>, name?: string): SetValidator<E>
	{
		const elementsAsSet = new Set<E>(elements);
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		const actualAsDefined: Set<E> = this.actualSet as Set<E>;
		if (this.actualContainsAll(actualAsDefined, elementsAsSet))
		{
			const missing = new Set([...elementsAsSet].filter(x => !actualAsDefined.has(x)));
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
		let value: Set<E> | undefined;
		let size: number;
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
		{
			value = undefined;
			size = 0;
		}
		else
		{
			value = this.actualSet as Set<E>;
			size = value.size;
		}
		return new SizeValidatorImpl(this.config, value, this.name, size, this.name + ".size",
			Pluralizer.ELEMENT, this.failures);
	}

	sizeConsumer(consumer: (actual: NumberValidator) => void): SetValidator<E>
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.size());
		return this;
	}

	asArray<E>(): ArrayValidator<E>;
	asArray(): ArrayValidator<E>
	{
		let value: E[] | undefined;
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			value = undefined;
		else
		{
			const actualAsDefined = this.actual as Set<E>;
			value = Array.from(actualAsDefined.values());
		}

		return new ArrayValidatorImpl<E>(this.config, value, this.name + ".asArray()",
			Pluralizer.ELEMENT, this.failures);
	}

	asArrayConsumer<S, E>(consumer: (input: ArrayValidator<E>) => void): S;
	asArrayConsumer(consumer: (actual: ArrayValidator<E>) => void): SetValidator<E>
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
	private actualContainsAny(actual: Set<E>, expected: Set<E>): boolean
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
	private actualContainsAll(actual: Set<E>, expected: Set<E>): boolean
	{
		for (const entry of expected)
		{
			if (!actual.has(entry))
				return false;
		}
		return true;
	}

	asSet<E>(): SetValidator<E>;
	asSet(): SetValidator<E>
	{
		return this;
	}
	
	getActual(): Set<E> | undefined
	{
		return this.actualSet;
	}
}

export {SetValidatorImpl};