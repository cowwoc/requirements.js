import ExceptionBuilder from "./ExceptionBuilder";
import ObjectVerifier from "./internal/ObjectVerifier";
import Utilities from "./Utilities";

/**
 * Verifier for a <code>Number</code>.
 *
 * @class
 * @author Gili Tzabari
 */
class NumberVerifier extends ObjectVerifier {
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
	 * @param {Number} value the lower bound
	 * @param {String} [name]  the name of the lower bound
	 * @return {NumberVerifier} this
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
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must be greater than " + name).
				addContext("Actual", this.actual).
				addContext("Min", value).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be greater than: " +
			Utilities.toString(value)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is greater than or equal to a value.
	 *
	 * @param {Number} value the minimum value
	 * @param {String} [name]  the name of the minimum value
	 * @return {NumberVerifier} this
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null
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
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must be greater than or equal to " + name).
				addContext("Actual", this.actual).
				addContext("Min", value).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be greater than or equal to: " +
			Utilities.toString(value)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is less than a value.
	 *
	 * @param {Number} value the upper bound
	 * @param {String} [name]  the name of the upper bound
	 * @return {NumberVerifier} this
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
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must be less than " + name).
				addContext("Actual", this.actual).
				addContext("Max", value).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be less than: " +
			Utilities.toString(value)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is less or equal to a value.
	 *
	 * @param {Number} value the maximum value
	 * @param {String} [name]  the name of the maximum value
	 * @return {NumberVerifier} this
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
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must be less than or equal to " + name).
				addContext("Actual", this.actual).
				addContext("Max", value).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be less than or equal to: " +
			Utilities.toString(value)).
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {Number} min the minimum value (inclusive)
	 * @param {Number} max  the maximum value (inclusive)
	 * @return {NumberVerifier} this
	 * @throws {TypeError}      if any of the arguments are null
	 * @throws {RangeError}  if <code>last</code> is less than <code>first</code>; if the actual value is not in range
	 */
	isBetween(min, max)
	{
		this.config.internalVerifier.requireThat(max, "max").isInstanceOf(Number);
		this.config.internalVerifier.requireThat(min, "min").isInstanceOf(Number).asNumber().isLessThan(max, "max");
		if (this.actual >= min && this.actual <= max)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be in range [" + min + ", " + max + "]").
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
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {NumberVerifier as default};