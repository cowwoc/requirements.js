import type {
	Configuration,
	ExtensibleNumberValidator
} from "../internal.mjs";
import {
	AbstractObjectValidator,
	Objects,
	ValidationFailure
} from "../internal.mjs";

/**
 * Extensible implementation of <code>ExtensibleNumberValidator</code>.
 *
 * @typeParam S - the type of validator returned by the methods
 */
abstract class AbstractNumberValidator<S> extends AbstractObjectValidator<S, number>
	implements ExtensibleNumberValidator<S>
{
	/**
	 * Creates a new NumberValidator.
	 *
	 * @param configuration - the instance configuration
	 * @param actual - the actual value
	 * @param name - (optional) the name of the value
	 * @param failures - the list of validation failures
	 * @throws TypeError if <code>configuration</code> or <code>name</code> are null or undefined
	 * @throws RangeError if <code>name</code> is empty
	 */
	protected constructor(configuration: Configuration, actual: number | undefined, name: string,
		failures: ValidationFailure[])
	{
		super(configuration, actual, name, failures);
	}

	isNegative(): S
	{
		if (this.actual === undefined || this.actual >= 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be negative.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isNotNegative(): S
	{
		if (this.actual === undefined || this.actual < 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be negative.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isZero(): S
	{
		if (this.actual === undefined || this.actual !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be zero.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isNotZero(): S
	{
		if (this.actual === undefined || this.actual === 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be zero");
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isPositive(): S
	{
		if (this.actual === undefined || this.actual <= 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be positive.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isNotPositive(): S
	{
		if (this.actual === undefined || this.actual > 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be positive.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isGreaterThan(value: number, name?: string): S
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");

		if (this.actual === undefined || this.actual <= value)
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be greater than " + name).
					addContext("Actual", this.actual).
					addContext("Min", value);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be greater than: " + this.config.convertToString(value)).
					addContext("Actual", this.actual);
			}
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isGreaterThanOrEqualTo(value: number, name?: string): S
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");

		if (this.actual === undefined || this.actual < value)
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be greater than or equal to " + name + ".").
					addContext("Actual", this.actual).
					addContext("Min", value);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be greater than or equal to: " + this.config.convertToString(value)).
					addContext("Actual", this.actual);
			}
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isLessThan(value: number, name?: string): S
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");

		if (this.actual === undefined || this.actual >= value)
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be less than " + name).
					addContext("Actual", this.actual).
					addContext("Max", value);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be less than: " + this.config.convertToString(value)).
					addContext("Actual", this.actual);
			}
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isLessThanOrEqualTo(value: number, name?: string): S
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");

		if (this.actual === undefined || this.actual > value)
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be less than or equal to " + name).
					addContext("Actual", this.actual).
					addContext("Max", value);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be less than or equal to: " + this.config.convertToString(value)).
					addContext("Actual", this.actual);
			}
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isBetween(startInclusive: number, endExclusive: number): S
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
				this.name + " must be in range [" + startInclusive + ", " + endExclusive + ").").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isBetweenClosed(startInclusive: number, endInclusive: number): S
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
				this.name + " must be in range [" + startInclusive + ", " + endInclusive + "].").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isFinite(): S
	{
		// See http://stackoverflow.com/a/1830844/14731
		if (this.actual === undefined || !Number.isFinite(this.actual))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be finite.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isInfinite(): S
	{
		// See http://stackoverflow.com/a/1830844/14731
		if (this.actual === undefined || Number.isFinite(this.actual))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be finite.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this.getThis();
	}
}

export {AbstractNumberValidator};