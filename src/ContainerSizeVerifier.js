import ExceptionBuilder from "./ExceptionBuilder";
import NumberVerifier from "./NumberVerifier";
import Utilities from "./Utilities";

/**
 * Verifies the size of a container.
 *
 * @class
 * @author Gili Tzabari
 */
class ContainerSizeVerifier extends NumberVerifier {
	/**
	 * Creates a new ContainerSizeVerifier.
	 *
	 * @constructor
	 * @param {Configuration} configuration the instance configuration
	 * @param {Object} container the container
	 * @param {Number} size the size of the container
	 * @param {String} containerName the name of the container
	 * @param {String} sizeName the name of the container size
	 * @param {Pluralizer} pluralizer returns the singular or plural form of the container's element type
	 * @throws {TypeError} if <code>containerName</code>, <code>sizeName</code>, <code>configuration</code> are undefined
	 *   or null; if <code>containerName</code> or <code>sizeName</code> are not a String
	 * @throws {RangeError} if <code>containerName</code> or <code>sizeName</code> are empty
	 */
	constructor(configuration, container, size, containerName, sizeName, pluralizer)
	{
		super(configuration, size, sizeName);
		Utilities.verifyName(containerName, "containerName");
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
	 * Ensures that the actual value is greater than or equal to a value.
	 *
	 * @param {Number} value the minimum value
	 * @param {String} [name]  the name of the minimum value
	 * @return {ContainerSizeVerifier} this
	 * @throws {TypeError}      if <code>value</code> or <code>name</code> are null
	 * @throws {RangeError}  if the actual value is less than <code>value</code>; if <code>name</code> is empty
	 */
	isGreaterThanOrEqualTo(value, name)
	{
		if (typeof(name) !== "undefined")
		{
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).asString().trim().
				isNotEmpty();
		}
		this.config.internalVerifier.requireThat(value, "value").isInstanceOf(Number);
		if (this.actual >= value)
			return this;

		let eb;
		if (name)
		{
			eb = new ExceptionBuilder(this.config, RangeError,
				this.containerName + " must contain at least " + name + " (" + value + ") " + this.pluralizer.nameOf(value));
		}
		else
		{
			eb = new ExceptionBuilder(this.config, RangeError,
				this.containerName + " must contain at least " + value + " " + this.pluralizer.nameOf(value));
		}
		eb.addContext("Actual", this.actual);
		if (this.actual > 0)
			eb.addContext(this.containerName, this.container);
		throw eb.build();
	}

	/**
	 * Ensures that the actual value is greater than a value.
	 *
	 * @param {Number} value the lower bound
	 * @param {String} [name]  the name of the lower bound
	 * @return {ContainerSizeVerifier} this
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null
	 * @throws {RangeError}  if the actual value is less than or equal to <code>value</code>; if <code>name</code> is
	 *   empty
	 */
	isGreaterThan(value, name)
	{
		if (typeof(name) !== "undefined")
		{
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).asString().trim().
				isNotEmpty();
		}
		this.config.internalVerifier.requireThat(value, "value").isInstanceOf(Number);
		if (this.actual > value)
			return this;

		let eb;
		if (name)
		{
			eb = new ExceptionBuilder(this.config, RangeError, this.containerName + " must contain at more than " + name +
				" (" + value + ") " + this.pluralizer.nameOf(value));
		}
		else
		{
			eb = new ExceptionBuilder(this.config, RangeError, this.containerName + " must contain at more than " + value +
				" " + this.pluralizer.nameOf(value));
		}
		eb.addContext("Actual", this.actual);
		if (this.actual > 0)
			eb.addContext(this.containerName, this.container);
		throw eb.build();
	}

	/**
	 * Ensures that the actual value is less or equal to a value.
	 *
	 * @param {Number} value the maximum value
	 * @param {String} [name]  the name of the maximum value
	 * @return {ContainerSizeVerifier} this
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null
	 * @throws {RangeError}  if the actual value is greater than <code>value</code>; if <code>name</code> is empty
	 */
	isLessThanOrEqualTo(value, name)
	{
		if (typeof(name) !== "undefined")
		{
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).asString().trim().
				isNotEmpty();
		}
		this.config.internalVerifier.requireThat(value, "value").isInstanceOf(Number);
		if (this.actual <= value)
			return this;

		let eb;
		if (name)
		{
			eb = new ExceptionBuilder(this.config, RangeError, this.containerName + " may not contain more than " + name +
				" (" + value + ") " + this.pluralizer.nameOf(value));
		}
		else
		{
			eb = new ExceptionBuilder(this.config, RangeError, this.containerName + " may not contain more than " + value +
				" " + this.pluralizer.nameOf(value));
		}
		eb.addContext("Actual", this.actual);
		if (this.actual > 0)
			eb.addContext(this.containerName, this.container);
		throw eb.build();
	}

	/**
	 * Ensures that the actual value is less than a value.
	 *
	 * @param {Number} value the upper bound
	 * @param {String} [name]  the name of the upper bound
	 * @return {ContainerSizeVerifier} this
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null
	 * @throws {RangeError}  if the actual value is greater than or equal to <code>value</code>; if <code>name</code> is
	 *   empty
	 */
	isLessThan(value, name)
	{
		if (typeof(name) !== "undefined")
		{
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).asString().trim().
				isNotEmpty();
		}
		this.config.internalVerifier.requireThat(value, "value").isInstanceOf(Number);
		if (this.actual < value)
			return this;

		let eb;
		if (name)
		{
			eb = new ExceptionBuilder(this.config, RangeError, this.containerName + " must contain less than " + name + " (" +
				value + ") " + this.pluralizer.nameOf(value));
		}
		else
		{
			eb = new ExceptionBuilder(this.config, RangeError, this.containerName + " must contain less than " + value + " " +
				this.pluralizer.nameOf(value));
		}
		eb.addContext("Actual", this.actual);
		if (this.actual > 0)
			eb.addContext(this.containerName, this.container);
		throw eb.build();
	}

	/**
	 * Ensures that the actual value is not positive.
	 *
	 * @return {ContainerSizeVerifier} this
	 * @throws {RangeError} if the actual value is positive
	 */
	isNotPositive()
	{
		return this.isZero();
	}

	/**
	 * Ensures that the actual value is positive.
	 *
	 * @return {ContainerSizeVerifier} this
	 * @throws {RangeError} if the actual value is not positive
	 */
	isPositive()
	{
		if (this.actual > 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError,
			this.containerName + " must contain at least one " + this.pluralizer.nameOf(1) + ".").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is not zero.
	 *
	 * @return {ContainerSizeVerifier} this
	 * @throws {RangeError} if the actual value is zero
	 */
	isNotZero()
	{
		return this.isPositive();
	}

	/**
	 * Ensures that the actual value is zero.
	 *
	 * @return {ContainerSizeVerifier} this
	 * @throws {RangeError} if the actual value is not zero
	 */
	isZero()
	{
		if (this.actual === 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.containerName + " must be empty.").
			addContext("Actual", this.actual).
			addContext(this.containerName, this.container).
			build();
	}

	/**
	 * Ensures that the actual value is not negative.
	 *
	 * @return {ContainerSizeVerifier} this
	 * @throws {RangeError} if the actual value is negative
	 */
	isNotNegative()
	{
		// Always true
		return this;
	}

	/**
	 * Ensures that the actual value is negative.
	 *
	 * @return {ContainerSizeVerifier} this
	 * @throws {RangeError} if the actual value is not negative
	 */
	isNegative()
	{
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not be negative").
			build();
	}

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {Number} min the minimum value (inclusive)
	 * @param {Number} max  the maximum value (inclusive)
	 * @return {ContainerSizeVerifier} this
	 * @throws {TypeError}      if any of the arguments are null
	 * @throws {RangeError}  if <code>last</code> is less than <code>first</code>; if the actual value is not in range
	 */
	isBetween(min, max)
	{
		const verifier = this.config.internalVerifier;
		verifier.requireThat(min, "min").isNotNull();
		verifier.requireThat(max, "max").isNotNull().asNumber().isGreaterThanOrEqualTo(min, "min");
		if (this.actual >= min && this.actual <= max)
			return this;

		const eb = new ExceptionBuilder(this.config, RangeError,
			this.containerName + " must contain [" + min + ", " + max + "] " + this.pluralizer.nameOf(2) + ".").
			addContext("Actual", this.actual);

		if (this.actual > 0)
			eb.addContext(this.containerName, this.container);

		throw eb.build();
	}

	/**
	 * Ensures that the actual value is equal to a value.
	 *
	 * @param {Object} expected the expected value
	 * @param {String} [name] the name of the expected value
	 * @return {ContainerSizeVerifier} this
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value is not equal to value
	 */
	isEqualTo(expected, name)
	{
		if (typeof(name) !== "undefined")
		{
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).asString().trim().
				isNotEmpty();
		}
		this.config.internalVerifier.requireThat(expected, "expected").isInstanceOf(Number);
		if (this.actual === expected)
			return this;

		let eb;
		if (name)
		{
			eb = new ExceptionBuilder(this.config, RangeError,
				this.containerName + " must contain " + name + "(" + expected + ") " + this.pluralizer.nameOf(expected) + ".");
		}
		else
		{
			eb = new ExceptionBuilder(this.config, RangeError,
				this.containerName + " must contain " + expected + " " + this.pluralizer.nameOf(expected) + ".");
		}
		eb.addContext("Actual", this.actual);

		if (this.actual > 0)
			eb.addContext(this.containerName, this.container);

		throw eb.build();
	}

	/**
	 * Ensures that the actual value is not equal to a value.
	 *
	 * @param {Array} value the value to compare to
	 * @param {String} [name] the name of the expected value
	 * @return {ContainerSizeVerifier} this
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value is equal to <code>value</code>
	 */
	isNotEqualTo(value, name)
	{
		if (typeof(name) !== "undefined")
		{
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).asString().trim().
				isNotEmpty();
		}
		this.config.internalVerifier.requireThat(value, "value").isInstanceOf(Number);
		if (this.actual !== value)
			return this;

		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError,
				this.containerName + " may not contain " + name + " (" + value + ") " + this.pluralizer.nameOf(value) + ".").
				addContext(this.containerName, this.container).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError,
			this.containerName + " may not contain " + value + " " + this.pluralizer.nameOf(value)).
			addContext(this.containerName, this.container).
			build();
	}
}

export default ContainerSizeVerifier;