import type {
	ArrayValidator,
	Configuration,
	MapValidator,
	NumberValidator
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
 * Default implementation of <code>MapValidator</code>.
 *
 * @typeParam K - the type the map's keys
 * @typeParam V - the type the map's values
 */
class MapValidatorImpl<K, V> extends AbstractObjectValidator<MapValidator<K, V>, Map<K, V>>
	implements MapValidator<K, V>
{
	private readonly actualMap: Map<K, V>;

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
	constructor(configuration: Configuration, actual: Map<K, V> | undefined, name: string, failures: ValidationFailure[])
	{
		super(configuration, actual, name, failures);
		this.actualMap = this.actual as Map<K, V>;
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
		let value: K[] | undefined;
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			value = undefined;
		else
			value = Array.from(this.actualMap.keys());
		return new ArrayValidatorImpl(this.config, value, this.name + ".keys()", Pluralizer.KEY, this.failures);
	}

	keysConsumer(consumer: (actual: ArrayValidator<K>) => void)
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.keys());
		return this;
	}

	values()
	{
		let value: V[] | undefined;
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			value = undefined;
		else
			value = Array.from(this.actualMap.values());
		return new ArrayValidatorImpl(this.config, value, this.name + ".values()", Pluralizer.VALUE,
			this.failures);
	}

	valuesConsumer(consumer: (actual: ArrayValidator<V>) => void)
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.values());
		return this;
	}

	entries()
	{
		let value: [K, V][] | undefined;
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			value = undefined;
		else
			value = Array.from(this.actualMap.entries());
		return new ArrayValidatorImpl(this.config, value, this.name + ".entries()", Pluralizer.ENTRY,
			this.failures);
	}

	entriesConsumer(consumer: (actual: ArrayValidator<[K, V]>) => void): MapValidator<K, V>
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.entries());
		return this;
	}

	size(): NumberValidator
	{
		let value: unknown;
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			value = undefined;
		else
			value = this.actualMap;
		return new SizeValidatorImpl(this.config, value, this.name, this.actualMap.size, this.name + ".size",
			Pluralizer.ENTRY, this.failures);
	}

	sizeConsumer(consumer: (actual: NumberValidator) => void): MapValidator<K, V>
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.size());
		return this;
	}

	asMap<K, V>(): MapValidator<K, V>;
	asMap(): MapValidator<K, V>
	{
		return this;
	}

	asMapConsumer<K2, V2>(consumer: (input: MapValidator<K2, V2>) => void): MapValidator<K, V>;
	asMapConsumer(consumer: (input: MapValidator<K, V>) => void): MapValidator<K, V>
	{
		return super.asMapConsumer(consumer);
	}


	getActual(): Map<K, V>
	{
		return this.actualMap;
	}
}

export {MapValidatorImpl};