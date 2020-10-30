import {
	ArrayValidator,
	Configuration,
	NumberValidator,
	Objects,
	ObjectValidator,
	Pluralizer,
	SizeValidator,
	ValidationFailure
} from "./internal/internal";

/**
 * Validates the requirements of a <code>Map</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class MapValidator extends ObjectValidator
{
	private readonly actualMap: Map<unknown, unknown>;

	constructor(configuration: Configuration, actual: unknown, name: string)
	{
		super(configuration, actual, name);
		this.actualMap = this.actual as Map<unknown, unknown>;
	}

	/**
	 * Ensures that value does not contain any entries
	 *
	 * @return {MapValidator} the updated validator
	 */
	isEmpty(): this
	{
		if (this.actualMap.size !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be empty.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that value contains at least one entry.
	 *
	 * @return {MapValidator} the updated validator
	 */
	isNotEmpty(): this
	{
		if (this.actualMap.size === 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be empty");
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * @return {ArrayValidator} a validator for the Map's keys
	 */
	keys(): ArrayValidator
	{
		return new ArrayValidator(this.config, Array.from(this.actualMap.keys()), this.name + ".keys()",
			Pluralizer.KEY);
	}

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayValidator} for the Map's keys
	 * @return {MapValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	keysConsumer(consumer: (actual: ArrayValidator) => void): MapValidator
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.keys());
		return this;
	}

	/**
	 * @return {ArrayValidator} a validator for the Map's values
	 */
	values(): ArrayValidator
	{
		return new ArrayValidator(this.config, Array.from(this.actualMap.values()), this.name + ".values()",
			Pluralizer.VALUE);
	}

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayValidator} for the Map's values
	 * @return {MapValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	valuesConsumer(consumer: (actual: ArrayValidator) => void): this
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.values());
		return this;
	}

	/**
	 * @return {ArrayValidator} validator for the Map's entries (an array of <code>[key, value]</code> for
	 *   each element in the Map)
	 */
	entries(): ArrayValidator
	{
		return new ArrayValidator(this.config, Array.from(this.actualMap.entries()), this.name + ".entries()",
			Pluralizer.ENTRY);
	}

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayValidator} for the Map's entries (an
	 *   array of <code>[key, value]</code> for each element in the Map)
	 * @return {MapValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	entriesConsumer(consumer: (actual: ArrayValidator) => void): this
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.entries());
		return this;
	}

	/**
	 * @return {SizeValidator} a validator for the number of entries this Map contains
	 */
	size(): SizeValidator
	{
		return new SizeValidator(this.config, this.actualMap, this.name, this.actualMap.size,
			this.name + ".size", Pluralizer.ENTRY);
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberValidator} for the number of entries
	 *   this Map contains
	 * @return {MapValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	sizeConsumer(consumer: (actual: NumberValidator) => void): this
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
export {MapValidator as default};