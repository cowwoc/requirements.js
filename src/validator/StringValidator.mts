import type {
	ValidatorComponent,
	UnsignedNumberValidator
} from "../internal/internal.mjs";

/**
 * Validates the state of a `string`.
 */
interface StringValidator<T extends string | undefined | null> extends ValidatorComponent<T>
{
	/**
	 * Ensures that the value starts with some prefix.
	 *
	 * @param prefix - the value that the string must start with
	 * @returns this
	 * @throws TypeError     if the value or `prefix` are `undefined` or `null`
	 * @throws RangeError if the value does not start with `prefix`
	 */
	startsWith(prefix: string): this;

	/**
	 * Ensures that the value does not start with some prefix.
	 *
	 * @param prefix - the value that the string may not start with
	 * @returns this
	 * @throws TypeError     if the value or `prefix` are `undefined` or `null`
	 * @throws RangeError if the value starts with `prefix`
	 */
	doesNotStartWith(prefix: string): this;

	/**
	 * Ensures that the value ends with some suffix.
	 *
	 * @param suffix - the value that the string must end with
	 * @returns this
	 * @throws TypeError     if the value or `suffix` are `undefined` or `null`
	 * @throws RangeError if the value does not end with `suffix`
	 */
	endsWith(suffix: string): this;

	/**
	 * Ensures that the value does not end with some suffix.
	 *
	 * @param suffix - the value that the string may not end with
	 * @returns this
	 * @throws TypeError     if the value or `suffix` are `undefined` or `null`
	 * @throws RangeError if the value ends with `suffix`
	 */
	doesNotEndWith(suffix: string): this;

	/**
	 * Ensures that the value contains some substring.
	 *
	 * @param expected - the string that the value must contain
	 * @returns this
	 * @throws TypeError     if the value or `expected` are `undefined` or `null`
	 * @throws RangeError if the value does not contain `expected`
	 */
	contains(expected: string): this;

	/**
	 * Ensures that the value does not contain some substring.
	 *
	 * @param unwanted - the string that the value may not contain
	 * @returns this
	 * @throws TypeError     if the value or `unwanted` are `undefined` or `null`
	 * @throws RangeError if the value contains `unwanted`
	 */
	doesNotContain(unwanted: string): this;

	/**
	 * Ensures that the value does not contain whitespace characters.
	 *
	 * @returns this
	 * @throws NullPointerException     if the value is `undefined` or `null`
	 * @throws IllegalArgumentException if the value contains whitespace characters
	 */
	doesNotContainWhitespace(): this;

	/**
	 * Ensures that the value matches a regular expression.
	 *
	 * @param regex - the regular expression
	 * @returns this
	 * @throws TypeError     if the value is `undefined` or `null`
	 * @throws RangeError if the value does not match `regex`
	 */
	matches(regex: RegExp): this;

	/**
	 * Ensures that the value is empty.
	 *
	 * @returns this
	 * @throws TypeError     if the value is `undefined` or `null`
	 * @throws RangeError if the value is not empty
	 */
	isEmpty(): this;

	/**
	 * Ensures that the value is not empty.
	 *
	 * @returns this
	 * @throws TypeError     if the value is `undefined` or `null`
	 * @throws RangeError if the value is empty
	 */
	isNotEmpty(): this;

	/**
	 * Ensures that the value does not contain leading or trailing whitespace, where whitespace is defined by
	 * {@link String.trim}.
	 *
	 * @returns this
	 * @throws TypeError     if the value is `undefined` or `null`
	 * @throws RangeError if the value contains leading or trailing whitespace
	 * @see {@link String.trim}
	 * @see {@link isEmpty}
	 */
	isTrimmed(): this;

	/**
	 * Returns a validator for the length of the string.
	 *
	 * @returns a validator for the length of the string
	 * @throws TypeError if the value is `undefined` or `null`
	 */
	length(): UnsignedNumberValidator;
}

export type {StringValidator};