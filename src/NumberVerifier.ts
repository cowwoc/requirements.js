import {
	NumberValidator,
	NumberValidatorNoOp,
	ObjectVerifier
} from "./internal/internal";

/**
 * Verifies the requirements of a <code>Number</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class NumberVerifier<V extends NumberValidator | NumberValidatorNoOp> extends ObjectVerifier<V>
{
	/**
	 * Ensures that the actual value is negative.
	 *
	 * @return {NumberVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not negative
	 */
	isNegative(): this
	{
		this.validator.isNegative();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is not negative.
	 *
	 * @return {NumberVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is negative
	 */
	isNotNegative(): this
	{
		this.validator.isNotNegative();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is zero.
	 *
	 * @return {NumberVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not zero
	 */
	isZero(): this
	{
		this.validator.isZero();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is not zero.
	 *
	 * @return {NumberVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is zero
	 */
	isNotZero(): this
	{
		this.validator.isNotZero();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is positive.
	 *
	 * @return {NumberVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not positive
	 */
	isPositive(): this
	{
		this.validator.isPositive();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is not positive.
	 *
	 * @return {NumberVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is positive
	 */
	isNotPositive(): this
	{
		this.validator.isNotPositive();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is greater than a value.
	 *
	 * @param {number} value the lower bound
	 * @param {string} [name]  the name of the lower bound
	 * @return {NumberVerifier} the updated verifier
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null
	 * @throws {RangeError}  if the actual value is less than or equal to <code>value</code>; if
	 *   <code>name</code> is empty
	 */
	isGreaterThan(value: number, name?: string): this
	{
		this.validator.isGreaterThan(value, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is greater than or equal to a value.
	 *
	 * @param {number} value the minimum value
	 * @param {string} [name]  the name of the minimum value
	 * @return {NumberVerifier} the updated verifier
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null
	 * @throws {RangeError}  if the actual value is less than <code>value</code>; if <code>name</code> is empty
	 */
	isGreaterThanOrEqualTo(value: number, name?: string): this
	{
		this.validator.isGreaterThanOrEqualTo(value, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is less than a value.
	 *
	 * @param {number} value the upper bound
	 * @param {string} [name]  the name of the upper bound
	 * @return {NumberVerifier} the updated verifier
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null
	 * @throws {RangeError}  if the actual value is greater than or equal to <code>value</code>; if
	 *   <code>name</code> is empty
	 */
	isLessThan(value: number, name?: string): this
	{
		this.validator.isLessThan(value, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is less or equal to a value.
	 *
	 * @param {number} value the maximum value
	 * @param {string} [name]  the name of the maximum value
	 * @return {NumberVerifier} the updated verifier
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null
	 * @throws {RangeError}  if the actual value is greater than <code>value</code>; if <code>name</code> is
	 *   empty
	 */
	isLessThanOrEqualTo(value: number, name?: string): this
	{
		this.validator.isLessThanOrEqualTo(value, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endExclusive  the maximum value (exclusive)
	 * @return {NumberVerifier} the updated verifier
	 * @throws {TypeError}  if any of the arguments are null or not a number
	 * @throws {RangeError} if <code>endExclusive</code> is less than <code>startInclusive</code>; if the
	 *   actual value is not in range
	 */
	isBetween(startInclusive: number, endExclusive: number): this
	{
		this.validator.isBetween(startInclusive, endExclusive);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endInclusive  the maximum value (inclusive)
	 * @return {NumberVerifier} the updated verifier
	 * @throws {TypeError}  if any of the arguments are null or not a number
	 * @throws {RangeError} if <code>endInclusive</code> is less than <code>startInclusive</code>; if the
	 *   actual value is not in range
	 */
	isBetweenClosed(startInclusive: number, endInclusive: number): this
	{
		this.validator.isBetweenClosed(startInclusive, endInclusive);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is a number.
	 *
	 * @return {NumberVerifier} the updated verifier
	 * @throws {RangeError} if actual value is not a number
	 */
	isNumber(): this
	{
		this.validator.isNumber();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is not a number.
	 *
	 * @return {NumberVerifier} the updated verifier
	 * @throws {RangeError} if actual value is a number
	 */
	isNotNumber(): this
	{
		this.validator.isNotNumber();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is a finite number.
	 *
	 * @return {NumberVerifier} the updated verifier
	 * @throws {RangeError} if actual value is not a finite number
	 */
	isFinite(): this
	{
		this.validator.isFinite();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is not a finite number.
	 *
	 * @return {NumberVerifier} the updated verifier
	 * @throws {RangeError} if actual value is a finite number
	 */
	isNotFinite(): this
	{
		this.validator.isNotFinite();
		return this.validationResult();
	}

	getActual(): number
	{
		return super.getActual() as number;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {NumberVerifier as default};