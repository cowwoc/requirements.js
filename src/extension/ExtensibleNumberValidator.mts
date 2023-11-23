import type {ExtensibleObjectValidator} from "../internal/internal.mjs";

/**
 * Validates the requirements of a <code>number</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link isNotNull}.
 *
 * @typeParam S - the type of validator returned by the methods
 */
interface ExtensibleNumberValidator<S> extends ExtensibleObjectValidator<S, number>
{
	/**
	 * Ensures that the actual value is negative.
	 *
	 * @returns the updated validator
	 */
	isNegative(): S;

	/**
	 * Ensures that the actual value is not negative.
	 *
	 * @returns the updated validator
	 */
	isNotNegative(): S;

	/**
	 * Ensures that the actual value is zero.
	 *
	 * @returns the updated validator
	 */
	isZero(): S;

	/**
	 * Ensures that the actual value is not zero.
	 *
	 * @returns the updated validator
	 */
	isNotZero(): S;

	/**
	 * Ensures that the actual value is positive.
	 *
	 * @returns the updated validator
	 */
	isPositive(): S;

	/**
	 * Ensures that the actual value is not positive.
	 *
	 * @returns the updated validator
	 */
	isNotPositive(): S;

	/**
	 * Ensures that the actual value is greater than a value.
	 *
	 * @param value - the lower bound
	 * @param name - (optional) the name of the lower bound
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	isGreaterThan(value: number, name?: string): S;

	/**
	 * Ensures that the actual value is greater than or equal to a value.
	 *
	 * @param value - the minimum value
	 * @param name - the name of the minimum value
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	isGreaterThanOrEqualTo(value: number, name?: string): S;

	/**
	 * Ensures that the actual value is less than a value.
	 *
	 * @param value - the upper bound
	 * @param name - (optional) the name of the upper bound
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	isLessThan(value: number, name?: string): S;

	/**
	 * Ensures that the actual value is less or equal to a value.
	 *
	 * @param value - the maximum value
	 * @param name - (optional) the name of the maximum value
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	isLessThanOrEqualTo(value: number, name?: string): S;

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param startInclusive - the minimum value (inclusive)
	 * @param endExclusive - the maximum value (exclusive)
	 * @returns the updated validator
	 * @throws TypeError if any of the arguments are null or not a number
	 */
	isBetween(startInclusive: number, endExclusive: number): S;

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param startInclusive - the minimum value (inclusive)
	 * @param endInclusive - the maximum value (inclusive)
	 * @returns the updated validator
	 * @throws TypeError if any of the arguments are null or not a number
	 */
	isBetweenClosed(startInclusive: number, endInclusive: number): S;

	/**
	 * Ensures that the actual value is a number.
	 *
	 * @returns the updated validator
	 */
	isNumber(): S;

	/**
	 * Ensures that the actual value is not a number.
	 *
	 * @returns the updated validator
	 */
	isNotNumber(): S;

	/**
	 * Ensures that the actual value is a finite number.
	 *
	 * @returns the updated validator
	 */
	isFinite(): S;

	/**
	 * Ensures that the actual value is not a finite number.
	 *
	 * @returns the updated validator
	 */
	isNotFinite(): S;

	getActual(): number | undefined;
}

export {type ExtensibleNumberValidator};