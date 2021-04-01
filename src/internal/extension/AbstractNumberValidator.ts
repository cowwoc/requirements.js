import {
	AbstractObjectValidator,
	Configuration,
	ExtensibleNumberValidator,
	Objects,
	ValidationFailure
} from "../internal";

/**
 * Extensible implementation of <code>ExtensibleNumberValidator</code>.
 */
abstract class AbstractNumberValidator<S> extends AbstractObjectValidator<S>
	implements ExtensibleNumberValidator<S>
{
	private readonly actualNumber: number;

	/**
	 * Creates a new NumberValidator.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {Array} actual the actual value
	 * @param {string} [name] the name of the value
	 * @throws {TypeError} if <code>configuration</code> or <code>name</code> are null or undefined
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	protected constructor(configuration: Configuration, actual: unknown, name: string)
	{
		super(configuration, actual, name);
		this.actualNumber = actual as number;
	}

	isNegative(): S
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		if (this.actualNumber >= 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be negative.").
				addContext("Actual", this.actualNumber);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isNotNegative(): S
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		if (this.actualNumber < 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be negative.").
				addContext("Actual", this.actualNumber);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isZero(): S
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		if (this.actualNumber !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be zero.").
				addContext("Actual", this.actualNumber);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isNotZero(): S
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		if (this.actualNumber === 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be zero");
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isPositive(): S
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		if (this.actualNumber <= 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be positive.").
				addContext("Actual", this.actualNumber);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isNotPositive(): S
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		if (this.actualNumber > 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be positive.").
				addContext("Actual", this.actualNumber);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isGreaterThan(value: number, name?: string): S
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

		if (this.actualNumber <= value)
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be greater than " + name).
					addContext("Actual", this.actualNumber).
					addContext("Min", value);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be greater than: " + this.config.convertToString(value)).
					addContext("Actual", this.actualNumber);
			}
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isGreaterThanOrEqualTo(value: number, name?: string): S
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

		if (this.actualNumber < value)
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be greater than or equal to " + name + ".").
					addContext("Actual", this.actualNumber).
					addContext("Min", value);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be greater than or equal to: " + this.config.convertToString(value)).
					addContext("Actual", this.actualNumber);
			}
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isLessThan(value: number, name?: string): S
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

		if (this.actualNumber >= value)
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be less than " + name).
					addContext("Actual", this.actualNumber).
					addContext("Max", value);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be less than: " + this.config.convertToString(value)).
					addContext("Actual", this.actualNumber);
			}
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isLessThanOrEqualTo(value: number, name?: string): S
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

		if (this.actualNumber > value)
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be less than or equal to " + name).
					addContext("Actual", this.actualNumber).
					addContext("Max", value);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be less than or equal to: " + this.config.convertToString(value)).
					addContext("Actual", this.actualNumber);
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
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

		if (this.actualNumber < startInclusive || this.actualNumber >= endExclusive)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be in range [" + startInclusive + ", " + endExclusive + ").").
				addContext("Actual", this.actualNumber);
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
		if (!this.requireThatActualIsSet())
			return this.getNoOp();

		if (this.actualNumber < startInclusive || this.actualNumber > endInclusive)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be in range [" + startInclusive + ", " + endInclusive + "].").
				addContext("Actual", this.actualNumber);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isNumber(): S
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		if (isNaN(this.actualNumber))
		{
			const typeOfActual = Objects.getTypeOf(this.actual);
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be a number.").
				addContext("Actual", this.actual).
				addContext("Type", typeOfActual);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isNotNumber(): S
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		if (!isNaN(this.actualNumber))
		{
			const typeOfActual = Objects.getTypeOf(this.actual);
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be a number.").
				addContext("Actual", this.actual).
				addContext("Type", typeOfActual);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isFinite(): S
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		// See http://stackoverflow.com/a/1830844/14731
		if (!Number.isFinite(this.actualNumber))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be finite.").
				addContext("Actual", this.actualNumber);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isNotFinite(): S
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		// See http://stackoverflow.com/a/1830844/14731
		if (Number.isFinite(this.actualNumber))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be finite.").
				addContext("Actual", this.actualNumber);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	getActual(): number
	{
		return super.getActual() as number;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {AbstractNumberValidator as default};