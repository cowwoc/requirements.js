import
{
	Configuration,
	NumberValidatorImpl,
	Objects,
	Pluralizer,
	ValidationFailure
} from "./internal.mjs";
import NumberValidatorNoOp from "./NumberValidatorNoOp.mjs";
import type NumberValidator from "../NumberValidator.mjs";

/**
 * Default implementation of <code>SetVerifier</code>.
 */
class SizeValidatorImpl extends NumberValidatorImpl
	implements NumberValidator
{
	private readonly collection: unknown[] | Set<unknown> | Map<unknown, unknown> | string;
	private readonly collectionName: string;
	private readonly size: number;
	private readonly sizeName: string;
	private readonly pluralizer: Pluralizer;

	/**
	 * Creates a new SizeValidatorImpl.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {Array | Set | Map | string} collection the collection
	 * @param {string} collectionName the name of the collection
	 * @param {number} size the size of the collection
	 * @param {string} sizeName the name of the container size
	 * @param {Pluralizer} pluralizer returns the singular or plural form of the container's element type
	 * @throws {TypeError} if <code>containerName</code>, <code>sizeName</code>, <code>configuration</code> are
	 *   undefined or null. If <code>containerName</code> or <code>sizeName</code> are not a string.
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

	protected getNoOp(): NumberValidator
	{
		return new NumberValidatorNoOp(this.failures);
	}

	isNotNegative(): NumberValidator
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		// Always true
		return this;
	}

	isNegative(): NumberValidator
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		const failure = new ValidationFailure(this.config, RangeError,
			this.name + " may not be negative");
		this.failures.push(failure);
		return this;
	}

	isEqualTo(expected: unknown, name?: string): NumberValidator
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

	isNotEqualTo(value: unknown, name?: string): NumberValidator
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

	isBetween(startInclusive: number, endExclusive: number): NumberValidator
	{
		Objects.requireThatTypeOf(startInclusive, "startInclusive", "number");
		Objects.requireThatTypeOf(endExclusive, "endExclusive", "number");
		if (endExclusive < startInclusive)
		{
			throw new RangeError("endExclusive must be greater than or equal to startInclusive.\n" +
				"Actual: " + endExclusive + "\n" +
				"Min   : " + startInclusive);
		}
		if (!this.requireThatActualIsSet())
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
		if (!this.requireThatActualIsSet())
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
export {SizeValidatorImpl as default};