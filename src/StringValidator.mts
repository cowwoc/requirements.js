import type {
	ExtensibleObjectValidator,
	NumberValidator
} from "./internal/internal.mjs";

/**
 * Validates the requirements of a <code>string</code>.
 *
 * Verifier and Validator methods are equivalent.
 * Validators return validation failures through the
 * {@link ExtensibleObjectValidator.getFailures | getFailures()} method, while Verifiers throw them as
 * exceptions.
 *
 * All methods (except those found in {@link ObjectValidator}) assume that the actual value is not null.
 */
interface StringValidator extends ExtensibleObjectValidator<StringValidator, string>
{
	/**
	 * Ensures that the actual value starts with a value.
	 *
	 * @param prefix - the value that the string must start with
	 * @returns the updated validator
	 */
	startsWith(prefix: string): StringValidator;

	/**
	 * Ensures that the actual value does not start with a value.
	 *
	 * @param prefix - the value that the string may not start with
	 * @returns the updated validator
	 */
	doesNotStartWith(prefix: string): StringValidator;

	/**
	 * Ensures that the actual value contains a value.
	 *
	 * @param expected - the value that the string must contain
	 * @returns the updated validator
	 */
	contains(expected: string): StringValidator;

	/**
	 * Ensures that the actual value does not contain a value.
	 *
	 * @param value - the value that the string may not contain
	 * @returns the updated validator
	 */
	doesNotContain(value: string): StringValidator;

	/**
	 * Ensures that the actual value ends with a value.
	 *
	 * @param suffix - the value that the string must end with
	 * @returns the updated validator
	 */
	endsWith(suffix: string): StringValidator;

	/**
	 * Ensures that the actual value does not end with a value.
	 *
	 * @param suffix - the value that the string may not end with
	 * @returns the updated validator
	 */
	doesNotEndWith(suffix: string): StringValidator;

	/**
	 * Ensures that the value is an empty string.
	 *
	 * @returns the updated validator
	 */
	isEmpty(): StringValidator;

	/**
	 * Ensures that the value is not an empty string.
	 *
	 * @returns the updated validator
	 */
	isNotEmpty(): StringValidator;

	/**
	 * Ensures that the actual value does not contain leading or trailing whitespace.
	 *
	 * @returns the updated validator
	 * @see #trim
	 */
	isTrimmed(): StringValidator;

	/**
	 * @returns a validator for the length of the string
	 */
	length(): NumberValidator;

	/**
	 * @param consumer - a function that accepts a {@link NumberValidator} for the length of the
	 *   string
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	lengthConsumer(consumer: (actual: NumberValidator) => void): StringValidator;

	/**
	 * {@inheritDoc}
	 */
	getActual(): string | undefined;
}

export {type StringValidator};