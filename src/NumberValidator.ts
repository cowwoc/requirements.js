import {
	ObjectValidator,
	Objects,
	ValidationFailure,
	Configuration
} from "./internal/internal";

/**
 * Validates the requirements of a <code>number</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class NumberValidator extends ObjectValidator
{
	private readonly actualNumber: number;

	constructor(configuration: Configuration, actual: unknown, name: string)
	{
		super(configuration, actual, name);
		this.actualNumber = actual as number;
	}

	/**
	 * Ensures that the actual value is negative.
	 *
	 * @return {NumberValidator} the updated validator
	 */
	isNegative(): this
	{
		if (this.actualNumber >= 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be negative.").
				addContext("Actual", this.actualNumber);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is not negative.
	 *
	 * @return {NumberValidator} the updated validator
	 */
	isNotNegative(): this
	{
		if (this.actualNumber < 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be negative.").
				addContext("Actual", this.actualNumber);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is zero.
	 *
	 * @return {NumberValidator} the updated validator
	 */
	isZero(): this
	{
		if (this.actualNumber !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be zero.").
				addContext("Actual", this.actualNumber);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is not zero.
	 *
	 * @return {NumberValidator} the updated validator
	 */
	isNotZero(): this
	{
		if (this.actualNumber === 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be zero");
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is positive.
	 *
	 * @return {NumberValidator} the updated validator
	 */
	isPositive(): this
	{
		if (this.actualNumber <= 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be positive.").
				addContext("Actual", this.actualNumber);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is not positive.
	 *
	 * @return {NumberValidator} the updated validator
	 */
	isNotPositive(): this
	{
		if (this.actualNumber > 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be positive.").
				addContext("Actual", this.actualNumber);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is greater than a value.
	 *
	 * @param {number} value the lower bound
	 * @param {string} [name]  the name of the lower bound
	 * @return {NumberValidator} the updated validator
	 * @throws {TypeError}   if <code>name</code> is null
	 * @throws {RangeError}  if <code>name</code> is empty
	 */
	isGreaterThan(value: number, name?: string): this
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");

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
		return this;
	}

	/**
	 * Ensures that the actual value is greater than or equal to a value.
	 *
	 * @param {number} value the minimum value
	 * @param {string} [name]  the name of the minimum value
	 * @return {NumberValidator} the updated validator
	 * @throws {TypeError}   if <code>name</code> is null
	 * @throws {RangeError}  if <code>name</code> is empty
	 */
	isGreaterThanOrEqualTo(value: number, name?: string): this
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");

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
		return this;
	}

	/**
	 * Ensures that the actual value is less than a value.
	 *
	 * @param {number} value the upper bound
	 * @param {string} [name]  the name of the upper bound
	 * @return {NumberValidator} the updated validator
	 * @throws {TypeError}   if <code>name</code> is null
	 * @throws {RangeError}  if <code>name</code> is empty
	 */
	isLessThan(value: number, name?: string): this
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");

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
		return this;
	}

	/**
	 * Ensures that the actual value is less or equal to a value.
	 *
	 * @param {number} value the maximum value
	 * @param {string} [name]  the name of the maximum value
	 * @return {NumberValidator} the updated validator
	 * @throws {TypeError}   if <code>name</code> is null
	 * @throws {RangeError}  if <code>name</code> is empty
	 */
	isLessThanOrEqualTo(value: number, name?: string): this
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");

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
		return this;
	}

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endExclusive  the maximum value (exclusive)
	 * @return {NumberValidator} the updated validator
	 * @throws {TypeError}  if any of the arguments are null or not a number
	 */
	isBetween(startInclusive: number, endExclusive: number): this
	{
		Objects.requireThatTypeOf(startInclusive, "startInclusive", "number");
		Objects.requireThatTypeOf(endExclusive, "endExclusive", "number");
		if (endExclusive < startInclusive)
		{
			throw new RangeError("endExclusive must be greater than or equal to startInclusive.\n" +
				"Actual: " + endExclusive + "\n" +
				"Min   : " + startInclusive);
		}

		if (this.actualNumber < startInclusive || this.actualNumber >= endExclusive)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be in range [" + startInclusive + ", " + endExclusive + ").").
				addContext("Actual", this.actualNumber);
			this.failures.push(failure);
		}
		return this;
	}


	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endInclusive  the maximum value (inclusive)
	 * @return {NumberValidator} the updated validator
	 * @throws {TypeError}  if any of the arguments are null or not a number
	 */
	isBetweenClosed(startInclusive: number, endInclusive: number): this
	{
		Objects.requireThatTypeOf(startInclusive, "startInclusive", "number");
		Objects.requireThatTypeOf(endInclusive, "endInclusive", "number");
		if (endInclusive < startInclusive)
		{
			throw new RangeError("endInclusive must be greater than or equal to startInclusive.\n" +
				"Actual: " + endInclusive + "\n" +
				"Min   : " + startInclusive);
		}

		if (this.actualNumber < startInclusive || this.actualNumber > endInclusive)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be in range [" + startInclusive + ", " + endInclusive + "].").
				addContext("Actual", this.actualNumber);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is a number.
	 *
	 * @return {NumberValidator} the updated validator
	 */
	isNumber(): this
	{
		if (isNaN(this.actualNumber))
		{
			const typeOfActual = Objects.getTypeOf(this.actual);
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be a number.").
				addContext("Actual", this.actual).
				addContext("Type", typeOfActual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is not a number.
	 *
	 * @return {NumberValidator} the updated validator
	 */
	isNotNumber(): this
	{
		if (!isNaN(this.actualNumber))
		{
			const typeOfActual = Objects.getTypeOf(this.actual);
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be a number.").
				addContext("Actual", this.actual).
				addContext("Type", typeOfActual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is a finite number.
	 *
	 * @return {NumberValidator} the updated validator
	 */
	isFinite(): this
	{
		// See http://stackoverflow.com/a/1830844/14731
		if (!Number.isFinite(this.actualNumber))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be finite.").
				addContext("Actual", this.actualNumber);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is not a finite number.
	 *
	 * @return {NumberValidator} the updated validator
	 */
	isNotFinite(): this
	{
		// See http://stackoverflow.com/a/1830844/14731
		if (Number.isFinite(this.actualNumber))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be finite.").
				addContext("Actual", this.actualNumber);
			this.failures.push(failure);
		}
		return this;
	}

	getActual(): number
	{
		return super.getActual() as number;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {NumberValidator as default};