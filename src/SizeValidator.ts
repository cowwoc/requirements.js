import {
	Configuration,
	NumberValidator,
	Objects,
	Pluralizer,
	SizeValidatorNoOp,
	ValidationFailure
} from "./internal/internal";

/**
 * Validates the requirements of the size of a container.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class SizeValidator extends NumberValidator
{
	private readonly collection: unknown[] | Set<unknown> | Map<unknown, unknown> | string;
	private readonly collectionName: string;
	private readonly size: number;
	private readonly sizeName: string;
	private readonly pluralizer: Pluralizer;

	/**
	 * Creates a new SizeValidator.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {Array | Set | Map | string} collection the collection
	 * @param {string} collectionName the name of the collection
	 * @param {number} size the size of the collection
	 * @param {string} sizeName the name of the container size
	 * @param {Pluralizer} pluralizer returns the singular or plural form of the container's element type
	 * @throws {TypeError} if <code>containerName</code>, <code>sizeName</code>, <code>configuration</code> are
	 *   undefined or null; if <code>containerName</code> or <code>sizeName</code> are not a string
	 * @throws {RangeError} if <code>containerName</code> or <code>sizeName</code> are empty
	 */
	constructor(configuration: Configuration,
		collection: unknown[] | Set<unknown> | Map<unknown, unknown> | string,
		collectionName: string, size: number, sizeName: string, pluralizer: Pluralizer)
	{
		super(configuration, size, sizeName);
		Objects.verifyName(collectionName, "containerName");
		this.collection = collection;
		this.collectionName = collectionName;
		this.size = size;
		this.sizeName = sizeName;
		this.pluralizer = pluralizer;
	}

	protected getNoOp(): SizeValidatorNoOp
	{
		return new SizeValidatorNoOp(this.failures);
	}

	/**
	 * Ensures that the actual value is not negative.
	 *
	 * @return {SizeValidator | SizeValidatorNoOp} the updated validator
	 */
	isNotNegative(): this | SizeValidatorNoOp
	{
		if (!this.actualIsSet())
			return this.getNoOp();
		// Always true
		return this;
	}

	/**
	 * Ensures that the actual value is negative.
	 *
	 * @return {SizeValidator | SizeValidatorNoOp} the updated validator
	 */
	isNegative(): this | SizeValidatorNoOp
	{
		if (!this.actualIsSet())
			return this.getNoOp();
		const failure = new ValidationFailure(this.config, RangeError,
			this.name + " may not be negative");
		this.failures.push(failure);
		return this;
	}

	/**
	 * Ensures that the actual value is equal to a value.
	 *
	 * @param {object} expected the expected value
	 * @param {string} [name] the name of the expected value
	 * @return {SizeValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	isEqualTo(expected: unknown, name?: string): this
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(expected, "expected", "number");

		const expectedNumber = expected as number;
		if (this.actual !== expectedNumber)
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.collectionName + " must contain " + name + "(" + expectedNumber + ") " +
					this.pluralizer.nameOf(expectedNumber) + ".");
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.collectionName + " must contain " + expectedNumber + " " +
					this.pluralizer.nameOf(expectedNumber) + ".");
			}
			failure.addContext("Actual", this.actual);

			if (this.size > 0)
				failure.addContext(this.collectionName, this.collection);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is not equal to a value.
	 *
	 * @param {object} value the value to compare to
	 * @param {string} [name] the name of the expected value
	 * @return {SizeValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	isNotEqualTo(value: unknown, name?: string): this
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");

		const valueNumber = value as number;
		if (this.actual === valueNumber)
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.collectionName + " may not contain " + name + " (" + valueNumber + ") " +
					this.pluralizer.nameOf(valueNumber)).
					addContext(this.collectionName, this.collection);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.collectionName + " may not contain " + valueNumber + " " +
					this.pluralizer.nameOf(valueNumber)).
					addContext(this.collectionName, this.collection);
			}
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endExclusive  the maximum value (exclusive)
	 * @return {SizeValidator | SizeValidatorNoOp} the updated validator
	 * @throws {TypeError}  if any of the arguments are null or not a number
	 */
	isBetween(startInclusive: number, endExclusive: number): this | SizeValidatorNoOp
	{
		Objects.requireThatTypeOf(startInclusive, "startInclusive", "number");
		Objects.requireThatTypeOf(endExclusive, "endExclusive", "number");
		if (endExclusive < startInclusive)
		{
			throw new RangeError("endExclusive must be greater than or equal to startInclusive.\n" +
				"Actual: " + endExclusive + "\n" +
				"Min   : " + startInclusive);
		}
		if (!this.actualIsSet())
			return this.getNoOp();

		if (this.size < startInclusive || this.size >= endExclusive)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.collectionName + " must contain [" + startInclusive + ", " + endExclusive + ") " +
				this.pluralizer.nameOf(2) + ".").
				addContext("Actual", this.size);

			if (this.size > 0)
				failure.addContext(this.collectionName, this.collection);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endInclusive  the maximum value (inclusive)
	 * @return {SizeValidator | SizeValidatorNoOp} the updated validator
	 * @throws {TypeError}  if any of the arguments are null or not a number
	 */
	isBetweenClosed(startInclusive: number, endInclusive: number): this | SizeValidatorNoOp
	{
		Objects.requireThatTypeOf(startInclusive, "startInclusive", "number");
		Objects.requireThatTypeOf(endInclusive, "endInclusive", "number");
		if (endInclusive < startInclusive)
		{
			throw new RangeError("endInclusive must be greater than or equal to startInclusive.\n" +
				"Actual: " + endInclusive + "\n" +
				"Min   : " + startInclusive);
		}
		if (!this.actualIsSet())
			return this.getNoOp();

		if (this.size < startInclusive || this.size > endInclusive)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.collectionName + " must contain [" + startInclusive + ", " + endInclusive + "] " +
				this.pluralizer.nameOf(2) + ".").
				addContext("Actual", this.size);

			if (this.size > 0)
				failure.addContext(this.collectionName, this.collection);
			this.failures.push(failure);
		}
		return this;
	}

	getActual(): number
	{
		return this.size;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SizeValidator as default};