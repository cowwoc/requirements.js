import type
{
	ExtensibleObjectValidator,
	NumberValidator
} from "./internal/internal.mjs";

/**
 * Validates the requirements of a <code>string</code>.
 *
 * All methods (except for {@link #asString} and those found in {@link ObjectValidator}) imply
 * {@link #isNotNull()}.
 *
 * Verifiers and Validators contain corresponding methods. Some exceptions are thrown by both methods.
 * The remaining exceptions that are thrown by the verifier are wrapped as validation failures and are
 * returned by {@link #getFailures}.
 */
interface StringValidator extends ExtensibleObjectValidator<StringValidator>
{
	/**
	 * Ensures that the actual value starts with a value.
	 *
	 * @param {string} prefix the value that the string must start with
	 * @return {StringValidator} the updated validator
	 */
	startsWith(prefix: string): StringValidator;

	/**
	 * Ensures that the actual value does not start with a value.
	 *
	 * @param {string} prefix the value that the string may not start with
	 * @return {StringValidator} the updated validator
	 */
	doesNotStartWith(prefix: string): StringValidator;

	/**
	 * Ensures that the actual value contains a value.
	 *
	 * @param {string} expected the value that the string must contain
	 * @return {StringValidator} the updated validator
	 */
	contains(expected: string): StringValidator;

	/**
	 * Ensures that the actual value does not contain a value.
	 *
	 * @param {string} value the value that the string may not contain
	 * @return {StringValidator} the updated validator
	 */
	doesNotContain(value: string): StringValidator;

	/**
	 * Ensures that the actual value ends with a value.
	 *
	 * @param {string} suffix the value that the string must end with
	 * @return {StringValidator} the updated validator
	 */
	endsWith(suffix: string): StringValidator;

	/**
	 * Ensures that the actual value does not end with a value.
	 *
	 * @param {string} suffix the value that the string may not end with
	 * @return {StringValidator} the updated validator
	 */
	doesNotEndWith(suffix: string): StringValidator;

	/**
	 * Ensures that the value is an empty string.
	 *
	 * @return {StringValidator} the updated validator
	 */
	isEmpty(): StringValidator;

	/**
	 * Ensures that the value is not an empty string.
	 *
	 * @return {StringValidator} the updated validator
	 */
	isNotEmpty(): StringValidator;

	/**
	 * Trims whitespace at the beginning and end of the actual value.
	 *
	 * @return {StringValidator} the updated validator
	 */
	trim(): StringValidator;

	/**
	 * @param {Function} consumer a function that accepts a {@link StringValidator} for the trimmed
	 *   representation of the string
	 * @return {StringValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	trimConsumer(consumer: (actual: StringValidator) => void): StringValidator;

	/**
	 * Ensures that the actual value does not contain leading or trailing whitespace.
	 *
	 * @return {StringValidator} the updated validator
	 * @see #trim
	 */
	isTrimmed(): StringValidator;

	/**
	 * @return {NumberValidator} a validator for the length of the string
	 */
	length(): NumberValidator;

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberValidator} for the length of the
	 *   string
	 * @return {StringValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	lengthConsumer(consumer: (actual: NumberValidator) => void): StringValidator;

	/**
	 * @return {StringValidator} the updated validator
	 * @deprecated returns this
	 */
	asString(): StringValidator;

	/**
	 * @param {Function} consumer a function that accepts <code>this</code>
	 * @return {StringValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asStringConsumer(consumer: (actual: StringValidator) => void): StringValidator;

	getActual(): string | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {StringValidator as default};