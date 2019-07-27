import ObjectValidator from "./internal/circular_dependency/ObjectValidatorBase.js";
import Objects from "./internal/Objects.js";
import ValidationFailure from "./ValidationFailure.js";
import NumberValidatorNoOp from "./internal/NumberValidatorNoOp.js";

/**
 * Validates the requirements of a <code>Number</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class NumberValidator extends ObjectValidator
{
	/**
	 * Ensures that the actual value is negative.
	 *
	 * @return {NumberValidator|NumberValidatorNoOp} the updated validator
	 */
	isNegative()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, Number, failureMessage);
			this.failures.push(failure);
			return new NumberValidatorNoOp(this.failures);
		}
		if (this.actual >= 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be negative.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is not negative.
	 *
	 * @return {NumberValidator|NumberValidatorNoOp} the updated validator
	 */
	isNotNegative()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new NumberValidatorNoOp(this.failures);
		}
		if (this.actual < 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be negative.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is zero.
	 *
	 * @return {NumberValidator|NumberValidatorNoOp} the updated validator
	 */
	isZero()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new NumberValidatorNoOp(this.failures);
		}
		if (this.actual !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be zero.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is not zero.
	 *
	 * @return {NumberValidator|NumberValidatorNoOp} the updated validator
	 */
	isNotZero()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new NumberValidatorNoOp(this.failures);
		}
		if (this.actual === 0)
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
	 * @return {NumberValidator|NumberValidatorNoOp} the updated validator
	 */
	isPositive()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new NumberValidatorNoOp(this.failures);
		}
		if (this.actual <= 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be positive.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is not positive.
	 *
	 * @return {NumberValidator|NumberValidatorNoOp} the updated validator
	 */
	isNotPositive()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new NumberValidatorNoOp(this.failures);
		}
		if (this.actual > 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be positive.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is greater than a value.
	 *
	 * @param {number} value the lower bound
	 * @param {string} [name]  the name of the lower bound
	 * @return {NumberValidator|NumberValidatorNoOp} the updated validator
	 * @throws {TypeError}   if <code>name</code> is null
	 * @throws {RangeError}  if <code>name</code> is empty
	 */
	isGreaterThan(value, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");

		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new NumberValidatorNoOp(this.failures);
		}
		if (this.actual <= value)
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
		return this;
	}

	/**
	 * Ensures that the actual value is greater than or equal to a value.
	 *
	 * @param {number} value the minimum value
	 * @param {string} [name]  the name of the minimum value
	 * @return {NumberValidator|NumberValidatorNoOp} the updated validator
	 * @throws {TypeError}   if <code>name</code> is null
	 * @throws {RangeError}  if <code>name</code> is empty
	 */
	isGreaterThanOrEqualTo(value, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");

		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new NumberValidatorNoOp(this.failures);
		}
		if (this.actual < value)
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
		return this;
	}

	/**
	 * Ensures that the actual value is less than a value.
	 *
	 * @param {number} value the upper bound
	 * @param {string} [name]  the name of the upper bound
	 * @return {NumberValidator|NumberValidatorNoOp} the updated validator
	 * @throws {TypeError}   if <code>name</code> is null
	 * @throws {RangeError}  if <code>name</code> is empty
	 */
	isLessThan(value, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");

		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new NumberValidatorNoOp(this.failures);
		}
		if (this.actual >= value)
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
		return this;
	}

	/**
	 * Ensures that the actual value is less or equal to a value.
	 *
	 * @param {number} value the maximum value
	 * @param {string} [name]  the name of the maximum value
	 * @return {NumberValidator|NumberValidatorNoOp} the updated validator
	 * @throws {TypeError}   if <code>name</code> is null
	 * @throws {RangeError}  if <code>name</code> is empty
	 */
	isLessThanOrEqualTo(value, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		Objects.requireThatTypeOf(value, "value", "number");

		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new NumberValidatorNoOp(this.failures);
		}
		if (this.actual > value)
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
		return this;
	}

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endExclusive  the maximum value (exclusive)
	 * @return {NumberValidator|NumberValidatorNoOp} the updated validator
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

		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new NumberValidatorNoOp(this.failures);
		}
		if (this.actual < startInclusive || this.actual >= endExclusive)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.containerName + " must be in range [" + startInclusive + ", " + endExclusive + ").").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}


	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endInclusive  the maximum value (inclusive)
	 * @return {NumberValidator|NumberValidatorNoOp} the updated validator
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

		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new NumberValidatorNoOp(this.failures);
		}
		if (this.actual < startInclusive || this.actual > endInclusive)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.containerName + " must be in range [" + startInclusive + ", " + endInclusive + "].").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is a number.
	 *
	 * @return {NumberValidator|NumberValidatorNoOp} the updated validator
	 */
	isNumber()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new NumberValidatorNoOp(this.failures);
		}
		// See http://stackoverflow.com/a/1830844/14731
		if (Number.isNaN(parseFloat(this.actual)))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be a number.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is not a number.
	 *
	 * @return {NumberValidator|NumberValidatorNoOp} the updated validator
	 */
	isNotNumber()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new NumberValidatorNoOp(this.failures);
		}
		// See http://stackoverflow.com/a/1830844/14731
		if (!Number.isNaN(parseFloat(this.actual)))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be a number.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is a finite number.
	 *
	 * @return {NumberValidator|NumberValidatorNoOp} the updated validator
	 */
	isFinite()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new NumberValidatorNoOp(this.failures);
		}
		// See http://stackoverflow.com/a/1830844/14731
		if (!Number.isFinite(this.actual))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be finite.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is not a finite number.
	 *
	 * @return {NumberValidator|NumberValidatorNoOp} the updated validator
	 */
	isNotFinite()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new NumberValidatorNoOp(this.failures);
		}
		// See http://stackoverflow.com/a/1830844/14731
		if (Number.isFinite(this.actual))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be finite.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {NumberValidator as default};