import ObjectVerifier from "./ObjectVerifier.js";
import ExceptionBuilder from "./internal/ExceptionBuilder.js";
import Objects from "./internal/Objects.js";

/**
 * Verifier for a <code>Number</code>.
 */
class NumberVerifier extends ObjectVerifier
{
	/**
	 * Ensures that the actual value is negative.
	 *
	 * @return {NumberVerifier} this
	 * @throws {RangeError} if the actual value is not negative
	 */
	isNegative()
	{
		if (this.actual < 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be negative.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is not negative.
	 *
	 * @return {NumberVerifier} this
	 * @throws {RangeError} if the actual value is negative
	 */
	isNotNegative()
	{
		if (this.actual >= 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not be negative.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is zero.
	 *
	 * @return {NumberVerifier} this
	 * @throws {RangeError} if the actual value is not zero
	 */
	isZero()
	{
		if (this.actual === 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be zero.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is not zero.
	 *
	 * @return {NumberVerifier} this
	 * @throws {RangeError} if the actual value is zero
	 */
	isNotZero()
	{
		if (this.actual !== 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not be zero").
			build();
	}

	/**
	 * Ensures that the actual value is positive.
	 *
	 * @return {NumberVerifier} this
	 * @throws {RangeError} if the actual value is not positive
	 */
	isPositive()
	{
		if (this.actual > 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be positive.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is not positive.
	 *
	 * @return {NumberVerifier} this
	 * @throws {RangeError} if the actual value is positive
	 */
	isNotPositive()
	{
		if (this.actual <= 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not be positive.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is greater than a value.
	 *
	 * @param {number} value the lower bound
	 * @param {string} [name]  the name of the lower bound
	 * @return {NumberVerifier} this
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null
	 * @throws {RangeError}  if the actual value is less than or equal to <code>value</code>; if
	 *   <code>name</code> is empty
	 */
	isGreaterThan(value, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		this.config.internalVerifier.requireThat(value, "value").isTypeOf("number");
		if (this.actual > value)
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must be greater than " + name).
				addContext("Actual", this.actual).
				addContext("Min", value).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be greater than: " +
			this.config.convertToString(value)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is greater than or equal to a value.
	 *
	 * @param {number} value the minimum value
	 * @param {string} [name]  the name of the minimum value
	 * @return {NumberVerifier} this
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null
	 * @throws {RangeError}  if the actual value is less than <code>value</code>; if <code>name</code> is empty
	 */
	isGreaterThanOrEqualTo(value, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		this.config.internalVerifier.requireThat(value, "value").isTypeOf("number");
		if (this.actual >= value)
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must be greater than or equal to " +
				name).
				addContext("Actual", this.actual).
				addContext("Min", value).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be greater than or equal to: " +
			this.config.convertToString(value)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is less than a value.
	 *
	 * @param {number} value the upper bound
	 * @param {string} [name]  the name of the upper bound
	 * @return {NumberVerifier} this
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null
	 * @throws {RangeError}  if the actual value is greater than or equal to <code>value</code>; if
	 *   <code>name</code> is empty
	 */
	isLessThan(value, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		this.config.internalVerifier.requireThat(value, "value").isTypeOf("number");
		if (this.actual < value)
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must be less than " + name).
				addContext("Actual", this.actual).
				addContext("Max", value).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be less than: " +
			this.config.convertToString(value)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is less or equal to a value.
	 *
	 * @param {number} value the maximum value
	 * @param {string} [name]  the name of the maximum value
	 * @return {NumberVerifier} this
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null
	 * @throws {RangeError}  if the actual value is greater than <code>value</code>; if <code>name</code> is
	 *   empty
	 */
	isLessThanOrEqualTo(value, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		this.config.internalVerifier.requireThat(value, "value").isTypeOf("number");
		if (this.actual <= value)
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must be less than or equal to " +
				name).
				addContext("Actual", this.actual).
				addContext("Max", value).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be less than or equal to: " +
			this.config.convertToString(value)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endExclusive  the maximum value (exclusive)
	 * @return {NumberVerifier} this
	 * @throws {TypeError}  if any of the arguments are null
	 * @throws {RangeError} if <code>endExclusive</code> is less than <code>startInclusive</code>; if the
	 *   actual value is not in range
	 */
	isBetween(startInclusive, endExclusive)
	{
		this.config.internalVerifier.requireThat(endExclusive, "max").isTypeOf("number");
		this.config.internalVerifier.requireThat(startInclusive, "min").isTypeOf("number").asNumber().
			isLessThan(endExclusive, "max");
		if (this.actual >= startInclusive && this.actual < endExclusive)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be in range [" + startInclusive +
			", " + endExclusive + ")").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endInclusive  the maximum value (inclusive)
	 * @return {NumberVerifier} this
	 * @throws {TypeError}  if any of the arguments are null
	 * @throws {RangeError} if <code>endInclusive</code> is less than <code>startInclusive</code>; if the
	 *   actual value is not in range
	 */
	isBetweenClosed(startInclusive, endInclusive)
	{
		this.config.internalVerifier.requireThat(endInclusive, "max").isTypeOf("number");
		this.config.internalVerifier.requireThat(startInclusive, "min").isTypeOf("number").asNumber().
			isLessThan(endInclusive, "max");
		if (this.actual >= startInclusive && this.actual <= endInclusive)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be in range [" + startInclusive +
			", " + endInclusive + "]").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is a number.
	 *
	 * @return {NumberVerifier} this
	 * @throws {RangeError} if actual value is not a number
	 */
	isNumber()
	{
		// See http://stackoverflow.com/a/1830844/14731
		if (!Number.isNaN(parseFloat(this.actual)))
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be a number.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is not a number.
	 *
	 * @return {NumberVerifier} this
	 * @throws {RangeError} if actual value is a number
	 */
	isNotNumber()
	{
		// See http://stackoverflow.com/a/1830844/14731
		if (Number.isNaN(parseFloat(this.actual)))
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not be a number.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is a finite number.
	 *
	 * @return {NumberVerifier} this
	 * @throws {RangeError} if actual value is not a finite number
	 */
	isFinite()
	{
		// See http://stackoverflow.com/a/1830844/14731
		if (Number.isFinite(this.actual))
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be finite.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is not a finite number.
	 *
	 * @return {NumberVerifier} this
	 * @throws {RangeError} if actual value is a finite number
	 */
	isNotFinite()
	{
		// See http://stackoverflow.com/a/1830844/14731
		if (!Number.isFinite(this.actual))
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not be finite.").
			addContext("Actual", this.actual).
			build();
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {NumberVerifier as default};