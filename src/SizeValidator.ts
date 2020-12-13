import type {NumberValidator} from "./internal/internal";

/**
 * Validates the requirements of the size of a container.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
interface SizeValidator extends NumberValidator
{
	/**
	 * Ensures that the actual value is not negative.
	 *
	 * @return {SizeValidator} the updated validator
	 */
	isNotNegative(): SizeValidator;

	/**
	 * Ensures that the actual value is negative.
	 *
	 * @return {SizeValidator} the updated validator
	 */
	isNegative(): SizeValidator;

	/**
	 * Ensures that the actual value is equal to a value.
	 *
	 * @param {object} expected the expected value
	 * @param {string} [name] the name of the expected value
	 * @return {SizeValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	isEqualTo(expected: unknown, name?: string): SizeValidator;

	/**
	 * Ensures that the actual value is not equal to a value.
	 *
	 * @param {object} value the value to compare to
	 * @param {string} [name] the name of the expected value
	 * @return {SizeValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	isNotEqualTo(value: unknown, name?: string): SizeValidator;

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endExclusive  the maximum value (exclusive)
	 * @return {SizeValidator} the updated validator
	 * @throws {TypeError}  if any of the arguments are null or not a number
	 */
	isBetween(startInclusive: number, endExclusive: number): SizeValidator;

	/**
	 * Ensures that the actual value is within range.
	 *
	 * @param {number} startInclusive the minimum value (inclusive)
	 * @param {number} endInclusive  the maximum value (inclusive)
	 * @return {SizeValidator} the updated validator
	 * @throws {TypeError}  if any of the arguments are null or not a number
	 */
	isBetweenClosed(startInclusive: number, endInclusive: number): SizeValidator;

	getActual(): number | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SizeValidator as default};