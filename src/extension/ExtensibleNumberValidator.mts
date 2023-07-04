import type ExtensibleObjectValidator from "./ExtensibleObjectValidator.mjs";

/**
 * Validates the requirements of a <code>number</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
interface ExtensibleNumberValidator<S> extends ExtensibleObjectValidator<S>
{
	/**
	 * Ensures that the actual value is negative.
	 *
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isNegative(): S;

	/**
	 * Ensures that the actual value is not negative.
	 *
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isNotNegative(): S;

	/**
	 * Ensures that the actual value is zero.
	 *
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isZero(): S;

	/**
	 * Ensures that the actual value is not zero.
	 *
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isNotZero(): S;

	/**
	 * Ensures that the actual value is positive.
	 *
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isPositive(): S;

	/**
	 * Ensures that the actual value is not positive.
	 *
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isNotPositive(): S;

	/**
	 * Ensures that the actual value is greater than a value.
	 *
	 * @param {number} value the lower bound
	 * @param {string} [name]  the name of the lower bound
	 * @return {ExtensibleNumberValidator} the updated validator
	 * @throws {TypeError}   if <code>name</code> is null
	 * @throws {RangeError}  if <code>name</code> is empty
	 */
	isGreaterThan(value: number, name?: string): S;

	/**
	 * Ensures that the actual value is greater than or equal to a value.
	 *
	 * @param {number} value the minimum value
	 * @param {string} [name]  the name of the minimum value
	 * @return {ExtensibleNumberValidator} the updated validator
	 * @throws {TypeError}   if <code>name</code> is null
	 * @throws {RangeError}  if <code>name</code> is empty
	 */
	isGreaterThanOrEqualTo(value: number, name?: string): S;

	/**
	 * Ensures that the actual value is less than a value.
	 *
	 * @param {number} value the upper bound
	 * @param {string} [name]  the name of the upper bound
	 * @return {ExtensibleNumberValidator} the updated validator
	 * @throws {TypeError}   if <code>name</code> is null
	 * @throws {RangeError}  if <code>name</code> is empty
	 */
	isLessThan(value: number, name?: string): S;

	/**
	 * Ensures that the actual value is less or equal to a value.
	 *
	 * @param {number} value the maximum value
	 * @param {string} [name]  the name of the maximum value
	 * @return {ExtensibleNumberValidator} the updated validator
	 * @throws {TypeError}   if <code>name</code> is null
	 * @throws {RangeError}  if <code>name</code> is empty
	 */
	isLessThanOrEqualTo(value: number, name?: string): S;

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endExclusive  the maximum value (exclusive)
	 * @return {ExtensibleNumberValidator} the updated validator
	 * @throws {TypeError}  if any of the arguments are null or not a number
	 */
	isBetween(startInclusive: number, endExclusive: number): S;

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endInclusive  the maximum value (inclusive)
	 * @return {ExtensibleNumberValidator} the updated validator
	 * @throws {TypeError}  if any of the arguments are null or not a number
	 */
	isBetweenClosed(startInclusive: number, endInclusive: number): S;

	/**
	 * Ensures that the actual value is a number.
	 *
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isNumber(): S;

	/**
	 * Ensures that the actual value is not a number.
	 *
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isNotNumber(): S;

	/**
	 * Ensures that the actual value is a finite number.
	 *
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isFinite(): S;

	/**
	 * Ensures that the actual value is not a finite number.
	 *
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isNotFinite(): S;

	getActual(): number | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ExtensibleNumberValidator as default};