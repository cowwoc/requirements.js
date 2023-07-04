import
{
	AbstractObjectValidator,
	ArrayValidator,
	ArrayValidatorImpl,
	ArrayValidatorNoOp,
	Configuration,
	MapValidator,
	MapValidatorNoOp,
	NumberValidator,
	NumberValidatorNoOp,
	Objects,
	Pluralizer,
	ValidationFailure,
	SizeValidatorImpl
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
	 * @param {Configuration} configuration the instance configuration
	 * @param {object} actual the actual value
	 * @param {string} name the name of the value
	 * @throws {TypeError} if <code>configuration</code> or <code>name</code> are null or undefined
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	constructor(configuration: Configuration, actual: unknown, name: string)
	{
		super(configuration, actual, name);
		this.actualMap = this.actual as Map<unknown, unknown>;
	}

	protected getThis(): MapValidator
	{
		return this;
	}

	protected getNoOp(): MapValidator
	{
		return new MapValidatorNoOp(this.failures);
	}

	isEmpty(): MapValidator
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		if (this.actualMap.size !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be empty.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	isNotEmpty(): MapValidator
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		if (this.actualMap.size === 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be empty");
			this.failures.push(failure);
		}
		return this;
	}

	keys(): ArrayValidator
	{
		if (!this.requireThatActualIsSet())
			return new ArrayValidatorNoOp(this.failures);
		return new ArrayValidatorImpl(this.config, Array.from(this.actualMap.keys()), this.name + ".keys()",
			Pluralizer.KEY);
	}

	keysConsumer(consumer: (actual: ArrayValidator) => void): MapValidator
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.keys());
		return this;
	}

	values(): ArrayValidator
	{
		if (!this.requireThatActualIsSet())
			return new ArrayValidatorNoOp(this.failures);
		return new ArrayValidatorImpl(this.config, Array.from(this.actualMap.values()), this.name + ".values()",
			Pluralizer.VALUE);
	}

	valuesConsumer(consumer: (actual: ArrayValidator) => void): MapValidator
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.values());
		return this;
	}

	entries(): ArrayValidator
	{
		if (!this.requireThatActualIsSet())
			return new ArrayValidatorNoOp(this.failures);
		return new ArrayValidatorImpl(this.config, Array.from(this.actualMap.entries()), this.name + ".entries()",
			Pluralizer.ENTRY);
	}

	entriesConsumer(consumer: (actual: ArrayValidator) => void): MapValidator
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.entries());
		return this;
	}

	size(): NumberValidator
	{
		if (!this.requireThatActualIsSet())
			return new NumberValidatorNoOp(this.failures);
		return new SizeValidatorImpl(this.config, this.actualMap, this.name, this.actualMap.size,
			this.name + ".size", Pluralizer.ENTRY);
	}

	sizeConsumer(consumer: (actual: NumberValidator) => void): MapValidator
	{
		Objects.requireThatIsSet(consumer, "consumer");
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