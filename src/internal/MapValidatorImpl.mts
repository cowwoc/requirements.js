import {
	AbstractObjectValidator,
	type ArrayValidator,
	ArrayValidatorImpl,
	Configuration,
	type MapValidator,
	type NumberValidator,
	Objects,
	Pluralizer,
	SizeValidatorImpl,
	ValidationFailure
} from "./internal.mjs";

/**
 * Default implementation of <code>MapValidator</code>.
 */
class MapValidatorImpl extends AbstractObjectValidator<MapValidator>
	implements MapValidator
{
	private readonly actualMap: Map<unknown, unknown>;

	/**
	 * Creates a new MapValidatorImpl.
	 *
	 * @param configuration - the instance configuration
	 * @param actual - the actual value
	 * @param name - the name of the value
	 * @param failures - the list of validation failures
	 * @throws TypeError if <code>configuration</code> or <code>name</code> are null or undefined
	 * @throws RangeError if <code>name</code> is empty
	 */
	constructor(configuration: Configuration, actual: unknown, name: string, failures: ValidationFailure[])
	{
		super(configuration, actual, name, failures);
		this.actualMap = this.actual as Map<unknown, unknown>;
	}

	protected getThis()
	{
		return this;
	}

	isEmpty()
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;
		if (this.actualMap.size !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be empty.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	isNotEmpty()
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;
		if (this.actualMap.size === 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be empty");
			this.failures.push(failure);
		}
		return this;
	}

	keys()
	{
		let value: void | unknown[];
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			value = undefined;
		else
			value = Array.from(this.actualMap.keys());
		return new ArrayValidatorImpl(this.config, value, this.name + ".keys()", Pluralizer.KEY, this.failures);
	}

	keysConsumer(consumer: (actual: ArrayValidator) => void)
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.keys());
		return this;
	}

	values()
	{
		let value: void | unknown[];
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			value = undefined;
		else
			value = Array.from(this.actualMap.values());
		return new ArrayValidatorImpl(this.config, value, this.name + ".values()", Pluralizer.VALUE,
			this.failures);
	}

	valuesConsumer(consumer: (actual: ArrayValidator) => void)
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.values());
		return this;
	}

	entries()
	{
		let value: void | unknown[];
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			value = undefined;
		else
			value = Array.from(this.actualMap.entries());
		return new ArrayValidatorImpl(this.config, value, this.name + ".entries()", Pluralizer.ENTRY,
			this.failures);
	}

	entriesConsumer(consumer: (actual: ArrayValidator) => void): MapValidator
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.entries());
		return this;
	}

	size(): NumberValidator
	{
		let value: void | unknown[] | Set<unknown> | Map<unknown, unknown> | string;
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			value = undefined;
		else
			value = this.actualMap;
		return new SizeValidatorImpl(this.config, value, this.name, this.actualMap.size, this.name + ".size",
			Pluralizer.ENTRY, this.failures);
	}

	sizeConsumer(consumer: (actual: NumberValidator) => void): MapValidator
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.size());
		return this;
	}

	getActual(): Map<unknown, unknown>
	{
		return this.actualMap;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {MapValidatorImpl as default};