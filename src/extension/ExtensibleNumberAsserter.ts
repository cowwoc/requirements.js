import type {ExtensibleObjectAsserter} from "../internal/internal.js";

/**
 * Asserts the requirements of a <code>number</code>.
 * <p>
 * All methods (except those found in {@link ObjectAsserter}) imply {@link #isNotNull()}.
 *
 * Asserters throw the same exceptions as Verifiers if and only if
 * {@link GlobalConfiguration#assertionsAreEnabled assertions are enabled}.
 */
interface ExtensibleNumberAsserter<S> extends ExtensibleObjectAsserter<S>
{
	/**
	 * Ensures that the actual value is negative.
	 *
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 * @throws {RangeError} if the actual value is not negative
	 */
	isNegative(): S;

	/**
	 * Ensures that the actual value is not negative.
	 *
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 * @throws {RangeError} if the actual value is negative
	 */
	isNotNegative(): S;

	/**
	 * Ensures that the actual value is zero.
	 *
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 * @throws {RangeError} if the actual value is not zero
	 */
	isZero(): S;

	/**
	 * Ensures that the actual value is not zero.
	 *
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 * @throws {RangeError} if the actual value is zero
	 */
	isNotZero(): S;

	/**
	 * Ensures that the actual value is positive.
	 *
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 * @throws {RangeError} if the actual value is not positive
	 */
	isPositive(): S;

	/**
	 * Ensures that the actual value is not positive.
	 *
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 * @throws {RangeError} if the actual value is positive
	 */
	isNotPositive(): S;

	/**
	 * Ensures that the actual value is greater than a value.
	 *
	 * @param {number} value the lower bound
	 * @param {string} [name]  the name of the lower bound
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null
	 * @throws {RangeError}  if the actual value is less than or equal to <code>value</code>. If
	 *   <code>name</code> is empty.
	 */
	isGreaterThan(value: number, name?: string): S;

	/**
	 * Ensures that the actual value is greater than or equal to a value.
	 *
	 * @param {number} value the minimum value
	 * @param {string} [name]  the name of the minimum value
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null
	 * @throws {RangeError}  if the actual value is less than <code>value</code>. If <code>name</code> is empty.
	 */
	isGreaterThanOrEqualTo(value: number, name?: string): S;

	/**
	 * Ensures that the actual value is less than a value.
	 *
	 * @param {number} value the upper bound
	 * @param {string} [name]  the name of the upper bound
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null
	 * @throws {RangeError}  if the actual value is greater than or equal to <code>value</code>. If
	 *   <code>name</code> is empty.
	 */
	isLessThan(value: number, name?: string): S;

	/**
	 * Ensures that the actual value is less or equal to a value.
	 *
	 * @param {number} value the maximum value
	 * @param {string} [name]  the name of the maximum value
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 * @throws {TypeError}   if <code>value</code> or <code>name</code> are null
	 * @throws {RangeError}  if the actual value is greater than <code>value</code>. If <code>name</code> is
	 *   empty.
	 */
	isLessThanOrEqualTo(value: number, name?: string): S;

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endExclusive  the maximum value (exclusive)
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 * @throws {TypeError}  if any of the arguments are null or not a number
	 * @throws {RangeError} if <code>endExclusive</code> is less than <code>startInclusive</code>. If the
	 *   actual value is not in range.
	 */
	isBetween(startInclusive: number, endExclusive: number): S;

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endInclusive  the maximum value (inclusive)
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 * @throws {TypeError}  if any of the arguments are null or not a number
	 * @throws {RangeError} if <code>endInclusive</code> is less than <code>startInclusive</code>. If the
	 *   actual value is not in range.
	 */
	isBetweenClosed(startInclusive: number, endInclusive: number): S;

	/**
	 * Ensures that the actual value is a number.
	 *
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 * @throws {RangeError} if actual value is not a number
	 */
	isNumber(): S;

	/**
	 * Ensures that the actual value is not a number.
	 *
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 * @throws {RangeError} if actual value is a number
	 */
	isNotNumber(): S;

	/**
	 * Ensures that the actual value is a finite number.
	 *
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 * @throws {RangeError} if actual value is not a finite number
	 */
	isFinite(): S;

	/**
	 * Ensures that the actual value is not a finite number.
	 *
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 * @throws {RangeError} if actual value is a finite number
	 */
	isNotFinite(): S;

	getActual(): number | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ExtensibleNumberAsserter as default};