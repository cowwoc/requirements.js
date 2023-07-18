import type {ExtensibleObjectVerifier} from "../internal/internal.mjs";

/**
 * Verifies the requirements of a <code>number</code>.
 * <p>
 * All methods (except those found in {@link ObjectVerifier}) imply {@link isNotNull}.
 *
 * @typeParam S - the type of validator returned by the methods
 */
interface ExtensibleNumberVerifier<S> extends ExtensibleObjectVerifier<S>
{
	/**
	 * Ensures that the actual value is negative.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is not negative
	 */
	isNegative(): S;

	/**
	 * Ensures that the actual value is not negative.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is negative
	 */
	isNotNegative(): S;

	/**
	 * Ensures that the actual value is zero.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is not zero
	 */
	isZero(): S;

	/**
	 * Ensures that the actual value is not zero.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is zero
	 */
	isNotZero(): S;

	/**
	 * Ensures that the actual value is positive.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is not positive
	 */
	isPositive(): S;

	/**
	 * Ensures that the actual value is not positive.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is positive
	 */
	isNotPositive(): S;

	/**
	 * Ensures that the actual value is greater than a value.
	 *
	 * @param value - the lower bound
	 * @param name - the name of the lower bound
	 * @returns the updated verifier
	 * @throws TypeError if <code>value</code> or <code>name</code> are null
	 * @throws RangeError if the actual value is less than or equal to <code>value</code>.
	 * If <code>name</code> is empty.
	 */
	isGreaterThan(value: number, name?: string): S;

	/**
	 * Ensures that the actual value is greater than or equal to a value.
	 *
	 * @param value - the minimum value
	 * @param name - (optional) the name of the minimum value
	 * @returns the updated verifier
	 * @throws TypeError if <code>value</code> or <code>name</code> are null
	 * @throws RangeError if the actual value is less than <code>value</code>.
	 * If <code>name</code> is empty.
	 */
	isGreaterThanOrEqualTo(value: number, name?: string): S;

	/**
	 * Ensures that the actual value is less than a value.
	 *
	 * @param value - the upper bound
	 * @param name - (optional) the name of the upper bound
	 * @returns the updated verifier
	 * @throws TypeError if <code>value</code> or <code>name</code> are null
	 * @throws RangeError if the actual value is greater than or equal to <code>value</code>.
	 * If <code>name</code> is empty.
	 */
	isLessThan(value: number, name?: string): S;

	/**
	 * Ensures that the actual value is less or equal to a value.
	 *
	 * @param value - the maximum value
	 * @param name - the name of the maximum value
	 * @returns the updated verifier
	 * @throws TypeError if <code>value</code> or <code>name</code> are null
	 * @throws RangeError if the actual value is greater than <code>value</code>.
	 * If <code>name</code> is empty.
	 */
	isLessThanOrEqualTo(value: number, name?: string): S;

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param startInclusive - the minimum value (inclusive)
	 * @param endExclusive - the maximum value (exclusive)
	 * @returns the updated verifier
	 * @throws TypeError if any of the arguments are null or not a number
	 * @throws RangeError if <code>endExclusive</code> is less than <code>startInclusive</code>.
	 * If the actual value is not in range.
	 */
	isBetween(startInclusive: number, endExclusive: number): S;

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param startInclusive - the minimum value (inclusive)
	 * @param endInclusive - the maximum value (inclusive)
	 * @returns the updated verifier
	 * @throws TypeError if any of the arguments are null or not a number
	 * @throws RangeError if <code>endInclusive</code> is less than <code>startInclusive</code>.
	 * If the actual value is not in range.
	 */
	isBetweenClosed(startInclusive: number, endInclusive: number): S;

	/**
	 * Ensures that the actual value is a number.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if actual value is not a number
	 */
	isNumber(): S;

	/**
	 * Ensures that the actual value is not a number.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if actual value is a number
	 */
	isNotNumber(): S;

	/**
	 * Ensures that the actual value is a finite number.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if actual value is not a finite number
	 */
	isFinite(): S;

	/**
	 * Ensures that the actual value is not a finite number.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if actual value is a finite number
	 */
	isNotFinite(): S;

	getActual(): number;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {type ExtensibleNumberVerifier as default};