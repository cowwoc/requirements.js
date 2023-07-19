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
	private readonly collection: void | unknown[] | Set<unknown> | Map<unknown, unknown> | string;
	private readonly collectionName: string;
	private readonly size: void | number;
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
	constructor(configuration: Configuration,
		collection: void | unknown[] | Set<unknown> | Map<unknown, unknown> | string,
		collectionName: string, size: void | number, sizeName: string, pluralizer: Pluralizer,
		failures: ValidationFailure[])
	{
		super(configuration, size, sizeName, failures);
		Objects.verifyName(collectionName, "containerName");
		this.collection = collection;
		this.collectionName = collectionName;
		this.size = size;
		this.pluralizer = pluralizer;
	}

	isNotNegative()
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		// Always true
		return this;
	}

	isNegative()
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

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
		if (this.failures.length > 0)
			return this;

		const expectedAsNumber = expected as number;
		if (this.actual !== expectedAsNumber)
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.collectionName + " must contain " + name + "(" + expectedAsNumber + ") " +
					this.pluralizer.nameOf(expectedAsNumber) + ".");
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.collectionName + " must contain " + expectedAsNumber + " " +
					this.pluralizer.nameOf(expectedAsNumber) + ".");
			}
			failure.addContext("Actual", this.actual);

			const sizeAsNotVoid = this.size as number;
			if (sizeAsNotVoid > 0)
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
		if (this.failures.length > 0)
			return this;

		const valueAsNumber = value as number;
		if (this.actual === valueAsNumber)
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.collectionName + " may not contain " + name + " (" + valueAsNumber + ") " +
					this.pluralizer.nameOf(valueAsNumber)).
					addContext(this.collectionName, this.collection);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.collectionName + " may not contain " + valueAsNumber + " " +
					this.pluralizer.nameOf(valueAsNumber)).
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
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		const sizeAsNotVoid = this.size as number;
		if (sizeAsNotVoid < startInclusive || sizeAsNotVoid >= endExclusive)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.collectionName + " must contain [" + startInclusive + ", " + endExclusive + ") " +
				this.pluralizer.nameOf(2) + ".").
				addContext("Actual", sizeAsNotVoid);

			if (sizeAsNotVoid > 0)
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
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;

		const sizeAsNotVoid = this.size as number;
		if (sizeAsNotVoid < startInclusive || sizeAsNotVoid > endInclusive)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.collectionName + " must contain [" + startInclusive + ", " + endInclusive + "] " +
				this.pluralizer.nameOf(2) + ".").
				addContext("Actual", sizeAsNotVoid);

			if (sizeAsNotVoid > 0)
				failure.addContext(this.collectionName, this.collection);
			this.failures.push(failure);
		}
		return this;
	}

	getActual(): void | number
	{
		return this.size;
	}
}

export {SizeValidatorImpl};