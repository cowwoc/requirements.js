import NumberVerifier from "./NumberVerifier.js";

/**
 * Verifies the requirements of the size of a container.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class SizeVerifier extends NumberVerifier
{
	/**
	 * Ensures that the actual value is greater than or equal to a value.
	 *
	 * @param {number} value the minimum value
	 * @param {string} [name]  the name of the minimum value
	 * @return {SizeVerifier} the updated verifier
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null; if <code>value</code> is not
	 *   a number
	 * @throws {RangeError}  if the actual value is less than <code>value</code>; if <code>name</code> is empty
	 */
	isGreaterThanOrEqualTo(value, name)
	{
		this.validator.isGreaterThanOrEqualTo(value, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is greater than a value.
	 *
	 * @param {number} value the lower bound
	 * @param {string} [name]  the name of the lower bound
	 * @return {SizeVerifier} the updated verifier
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null; if <code>value</code> is not
	 *   a number
	 * @throws {RangeError}  if the actual value is less than or equal to <code>value</code>; if
	 *   <code>name</code> is empty
	 */
	isGreaterThan(value, name)
	{
		this.validator.isGreaterThan(value, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is less or equal to a value.
	 *
	 * @param {number} value the maximum value
	 * @param {string} [name] the name of the maximum value
	 * @return {SizeVerifier} the updated verifier
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null; if <code>value</code> is not
	 *   a number
	 * @throws {RangeError}  if the actual value is greater than <code>value</code>; if <code>name</code> is
	 *   empty
	 */
	isLessThanOrEqualTo(value, name)
	{
		this.validator.isLessThanOrEqualTo(value, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is less than a value.
	 *
	 * @param {number} value the upper bound
	 * @param {string} [name]  the name of the upper bound
	 * @return {SizeVerifier} the updated verifier
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null; if <code>value</code> is not
	 *   a number
	 * @throws {RangeError}  if the actual value is greater than or equal to <code>value</code>; if
	 *   <code>name</code> is empty
	 */
	isLessThan(value, name)
	{
		this.validator.isLessThan(value, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is not positive.
	 *
	 * @return {SizeVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is positive
	 */
	isNotPositive()
	{
		this.validator.isNotPositive();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is positive.
	 *
	 * @return {SizeVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not positive
	 */
	isPositive()
	{
		this.validator.isPositive();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is not zero.
	 *
	 * @return {SizeVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is zero
	 */
	isNotZero()
	{
		this.validator.isNotZero();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is zero.
	 *
	 * @return {SizeVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not zero
	 */
	isZero()
	{
		this.validator.isZero();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is not negative.
	 *
	 * @return {SizeVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is negative
	 */
	isNotNegative()
	{
		this.validator.isNotNegative();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is negative.
	 *
	 * @return {SizeVerifier} the updated verifier
	 * @throws {RangeError} because the size is never negative
	 */
	isNegative()
	{
		this.validator.isNegative();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endExclusive  the maximum value (exclusive)
	 * @return {SizeVerifier} the updated verifier
	 * @throws {TypeError}  if any of the arguments are null; if <code>startInclusive</code> or
	 *   <code>endExclusive</code> are not a number
	 * @throws {RangeError} if <code>endExclusive</code> is less than <code>startInclusive</code>; if the
	 *   actual value is not in range
	 */
	isBetween(startInclusive, endExclusive)
	{
		this.validator.isBetween(startInclusive, endExclusive);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endInclusive  the maximum value (inclusive)
	 * @return {SizeVerifier} the updated verifier
	 * @throws {TypeError}  if any of the arguments are null; if <code>startInclusive</code> or
	 *   <code>endInclusive</code> are not a number
	 * @throws {RangeError} if <code>endInclusive</code> is less than <code>startInclusive</code>; if the
	 *   actual value is not in range
	 */
	isBetweenClosed(startInclusive, endInclusive)
	{
		this.validator.isBetweenClosed(startInclusive, endInclusive);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is equal to a value.
	 *
	 * @param {object} expected the expected value
	 * @param {string} [name] the name of the expected value
	 * @return {SizeVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value is not equal to value
	 */
	isEqualTo(expected, name)
	{
		this.validator.isEqualTo(expected, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is not equal to a value.
	 *
	 * @param {object} value the value to compare to
	 * @param {string} [name] the name of the expected value
	 * @return {SizeVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value is equal to <code>value</code>
	 */
	isNotEqualTo(value, name)
	{
		this.validator.isNotEqualTo(value, name);
		return this.validationResult();
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SizeVerifier as default};