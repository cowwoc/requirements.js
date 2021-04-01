import type {
	NumberAsserter,
	ObjectAsserter
} from "./internal/internal";

/**
 * Verifies the requirements of a <code>string</code>.
 *
 * All methods (except for {@link #asString} and those found in {@link ObjectValidator}) imply
 * {@link #isNotNull()}.
 *
 * Asserters throw the same exceptions as Verifiers if and only if
 * {@link GlobalConfiguration#assertionsAreEnabled assertions are enabled}.
 */
interface StringAsserter extends ObjectAsserter
{
	/**
	 * Ensures that the actual value starts with a value.
	 *
	 * @param {string} prefix the value that the string must start with
	 * @return {StringAsserter} the updated asserter
	 * @throws {RangeError} if the actual value does not start with <code>prefix</code>
	 */
	startsWith(prefix: string): StringAsserter;

	/**
	 * Ensures that the actual value does not start with a value.
	 *
	 * @param {string} prefix the value that the string may not start with
	 * @return {StringAsserter} the updated asserter
	 * @throws {RangeError} if the actual value does not start with <code>prefix</code>
	 */
	doesNotStartWith(prefix: string): StringAsserter;

	/**
	 * Ensures that the actual value contains a value.
	 *
	 * @param {string} expected the value that the string must contain
	 * @return {StringAsserter} the updated asserter
	 * @throws {RangeError} if the actual value does not contain <code>expected</code>
	 */
	contains(expected: string): StringAsserter;

	/**
	 * Ensures that the actual value does not contain a value.
	 *
	 * @param {string} value the value that the string may not contain
	 * @return {StringAsserter} the updated asserter
	 * @throws {RangeError} if the actual value does not contain <code>value</code>
	 */
	doesNotContain(value: string): StringAsserter;

	/**
	 * Ensures that the actual value ends with a value.
	 *
	 * @param {string} suffix the value that the string must end with
	 * @return {StringAsserter} the updated asserter
	 * @throws {RangeError} if the actual value does not end with <code>suffix</code>
	 */
	endsWith(suffix: string): StringAsserter;

	/**
	 * Ensures that the actual value does not end with a value.
	 *
	 * @param {string} suffix the value that the string may not end with
	 * @return {StringAsserter} the updated asserter
	 * @throws {RangeError} if the actual value does not start with <code>suffix</code>
	 */
	doesNotEndWith(suffix: string): StringAsserter;

	/**
	 * Ensures that the value is an empty string.
	 *
	 * @return {StringAsserter} the updated asserter
	 * @throws {RangeError} if the value is not an empty string
	 */
	isEmpty(): StringAsserter;

	/**
	 * Ensures that the value is not an empty string.
	 *
	 * @return {StringAsserter} the updated asserter
	 * @throws {RangeError} if the value is an empty string
	 */
	isNotEmpty(): StringAsserter;

	/**
	 * Trims whitespace at the beginning and end of the actual value.
	 *
	 * @return {StringAsserter} an asserter for the trimmed representation of the actual value
	 */
	trim(): StringAsserter;

	/**
	 * @param {Function} consumer a function that accepts a {@link StringAsserter} for the trimmed
	 *   representation of the string
	 * @return {StringAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	trimConsumer(consumer: (actual: StringAsserter) => void): StringAsserter;

	/**
	 * Ensures that the actual value does not contain leading or trailing whitespace.
	 *
	 * @return {StringAsserter} an asserter for the trimmed representation of the actual value
	 * @see #trim
	 */
	isTrimmed(): StringAsserter;

	/**
	 * @return {NumberAsserter} an asserter for the length of the string
	 */
	length(): NumberAsserter;

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberAsserter} for the length of the string
	 * @return {StringAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	lengthConsumer(consumer: (actual: NumberAsserter) => void): StringAsserter;

	/**
	 * @return {StringAsserter} the updated asserter
	 */
	asString(): StringAsserter;

	/**
	 * @param {Function} consumer a function that accepts <code>this</code>
	 * @return {StringAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asStringConsumer(consumer: (actual: StringAsserter) => void): StringAsserter;

	getActual(): string | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {StringAsserter as default};