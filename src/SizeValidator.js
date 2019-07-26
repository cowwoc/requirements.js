import Configuration from "./Configuration.js";
import NumberValidator from "./NumberValidator.js";
import Pluralizer from "./Pluralizer.js";
import Objects from "./internal/Objects.js";
import ValidationFailure from "./ValidationFailure.js";

/**
 * Validates the requirements of the size of a container.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class SizeValidator extends NumberValidator
{
	/**
	 * Creates a new SizeValidator.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {object} container the container
	 * @param {string} containerName the name of the container
	 * @param {number} size the size of the container
	 * @param {string} sizeName the name of the container size
	 * @param {Pluralizer} pluralizer returns the singular or plural form of the container's element type
	 * @throws {TypeError} if <code>containerName</code>, <code>sizeName</code>, <code>configuration</code> are
	 *   undefined or null; if <code>containerName</code> or <code>sizeName</code> are not a string
	 * @throws {RangeError} if <code>containerName</code> or <code>sizeName</code> are empty
	 */
	constructor(configuration, container, containerName, size, sizeName, pluralizer)
	{
		super(configuration, size, sizeName);
		Objects.verifyName(containerName, "containerName");
		Object.defineProperty(this, "container",
			{
				value: container
			});
		Object.defineProperty(this, "containerName",
			{
				value: containerName
			});
		Object.defineProperty(this, "pluralizer",
			{
				value: pluralizer
			});
	}

	/**
	 * Ensures that the actual value is not negative.
	 *
	 * @return {SizeValidator} the updated validator
	 */
	isNotNegative()
	{
		// Always true
		return this;
	}

	/**
	 * Ensures that the actual value is negative.
	 *
	 * @return {SizeValidator} the updated validator
	 */
	isNegative()
	{
		const failure = new ValidationFailure(this.config, RangeError, this.name + " may not be negative");
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
	isEqualTo(expected, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(expected, "expected", "number");
		if (this.actual !== expected)
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.containerName + " must contain " + name + "(" + expected + ") " +
					this.pluralizer.nameOf(expected) + ".");
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.containerName + " must contain " + expected + " " + this.pluralizer.nameOf(expected) + ".");
			}
			failure.addContext("Actual", this.actual);

			if (this.actual > 0)
				failure.addContext(this.containerName, this.container);
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
	isNotEqualTo(value, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");
		if (this.actual === value)
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.containerName + " may not contain " + name + " (" + value + ") " +
					this.pluralizer.nameOf(value) + ".").
					addContext(this.containerName, this.container);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.containerName + " may not contain " + value + " " + this.pluralizer.nameOf(value)).
					addContext(this.containerName, this.container);
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
	 * @return {SizeValidator} the updated validator
	 * @throws {TypeError}  if any of the arguments are null or not a number
	 */
	isBetween(startInclusive, endExclusive)
	{
		Objects.requireThatTypeOf(startInclusive, "startInclusive", "number");
		Objects.requireThatTypeOf(endExclusive, "endExclusive", "number");
		if (endExclusive < startInclusive)
		{
			throw new RangeError("endExclusive must be greater than or equal to startInclusive.\n" +
				"Actual: " + endExclusive + "\n" +
				"Min   : " + startInclusive);
		}

		if (this.actual < startInclusive || this.actual >= endExclusive)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.containerName + " must contain [" + startInclusive + ", " + endExclusive + ") " +
				this.pluralizer.nameOf(2) + ".").
				addContext("Actual", this.actual);

			if (this.actual > 0)
				failure.addContext(this.containerName, this.container);
			this.failures.push(failure);
		}
		return this;
	}


	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endInclusive  the maximum value (inclusive)
	 * @return {SizeValidator} the updated validator
	 * @throws {TypeError}  if any of the arguments are null or not a number
	 */
	isBetweenClosed(startInclusive, endInclusive)
	{
		Objects.requireThatTypeOf(startInclusive, "startInclusive", "number");
		Objects.requireThatTypeOf(endInclusive, "endInclusive", "number");
		if (endInclusive < startInclusive)
		{
			throw new RangeError("endInclusive must be greater than or equal to startInclusive.\n" +
				"Actual: " + endInclusive + "\n" +
				"Min   : " + startInclusive);
		}

		if (this.actual < startInclusive || this.actual > endInclusive)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.containerName + " must contain [" + startInclusive + ", " + endInclusive + "] " +
				this.pluralizer.nameOf(2) + ".").
				addContext("Actual", this.actual);

			if (this.actual > 0)
				failure.addContext(this.containerName, this.container);
			this.failures.push(failure);
		}
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SizeValidator as default};