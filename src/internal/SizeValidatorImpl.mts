import type {
	Configuration,
	NumberValidator,
	Pluralizer
} from "./internal.mjs";
import {
	NumberValidatorImpl,
	Objects,
	ValidationFailure
} from "./internal.mjs";

/**
 * Default implementation of <code>SetVerifier</code>.
 */
class SizeValidatorImpl extends NumberValidatorImpl
	implements NumberValidator
{
	private readonly collection: unknown;
	private readonly collectionName: string;
	private readonly pluralizer: Pluralizer;

	/**
	 * Creates a new SizeValidatorImpl.
	 *
	 * @param configuration - the instance configuration
	 * @param collection - the collection
	 * @param collectionName - the name of the collection
	 * @param size - the size of the collection
	 * @param sizeName - the name of the container size
	 * @param pluralizer - returns the singular or plural form of the container's element type
	 * @param failures - the list of validation failures
	 * @throws TypeError if <code>containerName</code>, <code>sizeName</code>, <code>configuration</code> are
	 *   undefined or null. If <code>containerName</code> or <code>sizeName</code> are not a string.
	 * @throws RangeError if <code>containerName</code> or <code>sizeName</code> are empty
	 */
	constructor(configuration: Configuration, collection: unknown,
		collectionName: string, size: number | undefined, sizeName: string, pluralizer: Pluralizer,
		failures: ValidationFailure[])
	{
		super(configuration, size, sizeName, failures);
		Objects.verifyName(collectionName, "containerName");
		this.collection = collection;
		this.collectionName = collectionName;
		this.pluralizer = pluralizer;
	}

	isNotNegative()
	{
		// Always true
		return this;
	}

	isNegative()
	{
		const failure = new ValidationFailure(this.config, RangeError,
			this.name + " may not be negative");
		this.failures.push(failure);
		return this;
	}

	isEqualTo(expected: unknown, name?: string)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		Objects.requireThatTypeOf(expected, "expected", "number");

		if (this.actual === undefined || this.actual !== expected)
		{
			const expectedIsNumber = expected as number;
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.collectionName + " must contain " + name + "(" + expectedIsNumber + ") " +
					this.pluralizer.nameOf(expectedIsNumber) + ".");
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.collectionName + " must contain " + expectedIsNumber + " " +
					this.pluralizer.nameOf(expectedIsNumber) + ".");
			}
			failure.addContext("Actual", this.actual);

			if (this.actual !== undefined && this.actual > 0)
				failure.addContext(this.collectionName, this.collection);
			this.failures.push(failure);
		}
		return this;
	}

	isNotEqualTo(value: unknown, name?: string)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");

		if (this.actual === undefined || this.actual === value)
		{
			const valueIsNumber = value as number;
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.collectionName + " may not contain " + name + " (" + valueIsNumber + ") " +
					this.pluralizer.nameOf(valueIsNumber)).
					addContext(this.collectionName, this.collection);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.collectionName + " may not contain " + valueIsNumber + " " +
					this.pluralizer.nameOf(valueIsNumber)).
					addContext(this.collectionName, this.collection);
			}
			this.failures.push(failure);
		}
		return this;
	}

	isBetween(startInclusive: number, endExclusive: number)
	{
		Objects.requireThatTypeOf(startInclusive, "startInclusive", "number");
		Objects.requireThatTypeOf(endExclusive, "endExclusive", "number");
		if (endExclusive < startInclusive)
		{
			throw new RangeError("endExclusive must be greater than or equal to startInclusive.\n" +
				"Actual: " + endExclusive + "\n" +
				"Min   : " + startInclusive);
		}

		if (this.actual === undefined || this.actual < startInclusive || this.actual >= endExclusive)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.collectionName + " must contain [" + startInclusive + ", " + endExclusive + ") " +
				this.pluralizer.nameOf(2) + ".").
				addContext("Actual", this.actual);

			if (this.actual !== undefined && this.actual > 0)
				failure.addContext(this.collectionName, this.collection);
			this.failures.push(failure);
		}
		return this;
	}

	isBetweenClosed(startInclusive: number, endInclusive: number): NumberValidator
	{
		Objects.requireThatTypeOf(startInclusive, "startInclusive", "number");
		Objects.requireThatTypeOf(endInclusive, "endInclusive", "number");
		if (endInclusive < startInclusive)
		{
			throw new RangeError("endInclusive must be greater than or equal to startInclusive.\n" +
				"Actual: " + endInclusive + "\n" +
				"Min   : " + startInclusive);
		}

		if (this.actual === undefined || this.actual < startInclusive || this.actual > endInclusive)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.collectionName + " must contain [" + startInclusive + ", " + endInclusive + "] " +
				this.pluralizer.nameOf(2) + ".").
				addContext("Actual", this.actual);

			if (this.actual !== undefined && this.actual > 0)
				failure.addContext(this.collectionName, this.collection);
			this.failures.push(failure);
		}
		return this;
	}
}

export {SizeValidatorImpl};