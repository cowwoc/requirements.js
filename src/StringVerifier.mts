import type {
	ExtensibleObjectValidator,
	NumberVerifier,
	ObjectVerifier
} from "./internal/internal.mjs";

const typedocWorkaround: null | ExtensibleObjectValidator<void, void> = null;
// noinspection PointlessBooleanExpressionJS
if (typedocWorkaround !== null)
	console.log("WORKAROUND: https://github.com/microsoft/tsdoc/issues/348");

/**
 * Verifies the requirements of a <code>string</code>.
 * <p>
 * Verifier and Validator methods are equivalent.
 * Validators return validation failures through the
 * {@link ExtensibleObjectValidator.getFailures | getFailures()} method, while Verifiers throw them as
 * exceptions.
 *
 * All methods (except for {@link asString} and those found in {@link ObjectValidator}) imply
 * {@link isNotNull}.
 */
interface StringVerifier extends ObjectVerifier<string>
{
	/**
	 * Ensures that the actual value starts with a value.
	 *
	 * @param prefix - the value that the string must start with
	 * @returns the updated verifier
	 * @throws RangeError if the actual value does not start with <code>prefix</code>
	 */
	startsWith(prefix: string): StringVerifier;

	/**
	 * Ensures that the actual value does not start with a value.
	 *
	 * @param prefix - the value that the string may not start with
	 * @returns the updated verifier
	 * @throws RangeError if the actual value does not start with <code>prefix</code>
	 */
	doesNotStartWith(prefix: string): StringVerifier;

	/**
	 * Ensures that the actual value contains a value.
	 *
	 * @param expected - the value that the string must contain
	 * @returns the updated verifier
	 * @throws RangeError if the actual value does not contain <code>expected</code>
	 */
	contains(expected: string): StringVerifier;

	/**
	 * Ensures that the actual value does not contain a value.
	 *
	 * @param value - the value that the string may not contain
	 * @returns the updated verifier
	 * @throws RangeError if the actual value does not contain <code>value</code>
	 */
	doesNotContain(value: string): StringVerifier;

	/**
	 * Ensures that the actual value ends with a value.
	 *
	 * @param suffix - the value that the string must end with
	 * @returns the updated verifier
	 * @throws RangeError if the actual value does not end with <code>suffix</code>
	 */
	endsWith(suffix: string): StringVerifier;

	/**
	 * Ensures that the actual value does not end with a value.
	 *
	 * @param suffix - the value that the string may not end with
	 * @returns the updated verifier
	 * @throws RangeError if the actual value does not start with <code>suffix</code>
	 */
	doesNotEndWith(suffix: string): StringVerifier;

	/**
	 * Ensures that the value is an empty string.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the value is not an empty string
	 */
	isEmpty(): StringVerifier;

	/**
	 * Ensures that the value is not an empty string.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the value is an empty string
	 */
	isNotEmpty(): StringVerifier;

	/**
	 * Trims whitespace at the beginning and end of the actual value.
	 *
	 * @returns a verifier for the trimmed representation of the actual value
	 */
	trim(): StringVerifier;

	/**
	 * @param consumer - a function that accepts a {@link StringVerifier} for the trimmed
	 *   representation of the string
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	trimConsumer(consumer: (actual: StringVerifier) => void): StringVerifier;

	/**
	 * Ensures that the actual value does not contain leading or trailing whitespace.
	 *
	 * @returns a verifier for the trimmed representation of the actual value
	 * @see #trim
	 */
	isTrimmed(): StringVerifier;

	/**
	 * @returns a verifier for the length of the string
	 */
	length(): NumberVerifier;

	/**
	 * @param consumer - a function that accepts a {@link NumberVerifier} for the length of the string
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	lengthConsumer(consumer: (actual: NumberVerifier) => void): StringVerifier;

	/**
	 * @returns the updated verifier
	 * @deprecated <code>actual</code> value is already a String
	 */
	asString(): StringVerifier;

	/**
	 * @param consumer - a function that accepts <code>this</code>
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	asStringConsumer(consumer: (actual: StringVerifier) => void): StringVerifier;

	/**
	 * {@inheritDoc}
	 */
	getActual(): string;
}

export {type StringVerifier};