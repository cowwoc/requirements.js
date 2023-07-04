import
{
	AbstractObjectValidator,
	ArrayValidator,
	ArrayValidatorImpl,
	ArrayValidatorNoOp,
	Configuration,
	NumberValidator,
	NumberValidatorNoOp,
	Objects,
	ObjectValidatorImpl,
	ObjectVerifierImpl,
	Pluralizer,
	SetValidator,
	SetValidatorNoOp,
	SizeValidatorImpl,
	ValidationFailure
} from "./internal.mjs";

/**
 * Default implementation of <code>SetValidator</code>.
 */
class SetValidatorImpl extends AbstractObjectValidator<SetValidator>
	implements SetValidator
{
	private readonly actualSet: Set<unknown>;

	/**
	 * Creates a new SetValidatorImpl.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {object} actual the actual value
	 * @param {string} name the name of the value
	 * @throws {TypeError} if <code>configuration</code> or <code>name</code> are null or undefined
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	constructor(configuration: Configuration, actual: unknown, name: string)
	{
		super(configuration, actual, name);
		this.actualSet = actual as Set<unknown>;
	}

	protected getThis(): SetValidator
	{
		return this;
	}

	protected getNoOp(): SetValidator
	{
		return new SetValidatorNoOp(this.failures);
	}

	isEmpty(): SetValidator
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		if (this.actualSet.size !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be empty.").
				addContext("Actual", this.actualSet);
			this.failures.push(failure);
		}
		return this;
	}

	isNotEmpty(): SetValidator
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		if (this.actualSet.size === 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be empty");
			this.failures.push(failure);
		}
		return this;
	}

	contains(expected: unknown, name?: string): SetValidator
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

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
		const expectedValidator = new ObjectValidatorImpl(this.config, value, name);
		const expectedVerifier = new ObjectVerifierImpl(expectedValidator);
		return expectedVerifier.asSet().getActual() as Set<unknown>;
	}

	containsExactly(expected: unknown[] | Set<unknown>, name?: string): SetValidator
	{
		const expectedAsSet = this.convertToSet(expected, "expected");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

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

	containsAny(expected: unknown[] | Set<unknown>, name?: string): SetValidator
	{
		const expectedAsSet = this.convertToSet(expected, "expected");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

		if (!SetValidatorImpl.actualContainsAny(this.actualSet, expectedAsSet))
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
			Objects.requireThatStringNotEmpty(name, "name");
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

		if (!SetValidatorImpl.actualContainsAll(this.actualSet, expectedAsSet))
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

	doesNotContain(entry: unknown, name?: string): SetValidator
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

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

	doesNotContainAny(elements: unknown[] | Set<unknown>, name?: string): SetValidator
	{
		const elementsAsSet = this.convertToSet(elements, "elements");
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

		if (SetValidatorImpl.actualContainsAny(this.actualSet, elementsAsSet))
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
			Objects.requireThatStringNotEmpty(name, "name");
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

		if (SetValidatorImpl.actualContainsAll(this.actualSet, elementsAsSet))
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

	size(): NumberValidator
	{
		if (!this.requireThatActualIsSet())
			return new NumberValidatorNoOp(this.failures);
		return new SizeValidatorImpl(this.config, this.actualSet, this.name, this.actualSet.size,
			this.name + ".size", Pluralizer.ELEMENT);
	}

	sizeConsumer(consumer: (actual: NumberValidator) => void): SetValidator
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.size());
		return this;
	}

	asArray(): ArrayValidator
	{
		if (!this.requireThatActualIsSet())
			return new ArrayValidatorNoOp(this.failures);
		return new ArrayValidatorImpl(this.config, Array.from(this.actualSet.values()), this.name + ".asArray()",
			Pluralizer.ELEMENT);
	}

	asArrayConsumer(consumer: (actual: ArrayValidator) => void): SetValidator
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

	getActual(): Set<unknown>
	{
		return this.actualSet;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SetValidatorImpl as default};