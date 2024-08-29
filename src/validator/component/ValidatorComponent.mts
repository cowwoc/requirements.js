import {
	Type,
	ValidationFailures,
	type NonUndefinable,
	type ClassConstructor,
	type ObjectValidator
} from "../../internal/internal.mjs";

/**
 * Methods that all validators must contain.
 *
 * @typeParam S - the type of validator
 * @typeParam T - the type of the value
 */
interface ValidatorComponent<S, T>
{
	/**
	 * Returns the name of the value.
	 *
	 * @returns the name of the value
	 */
	getName(): string;

	/**
	 * Returns the value that is being validated.
	 *
	 * @returns the value
	 * @throws RangeError if the value is invalid (e.g. due to dereferencing a property of a `null` object)
	 */
	getValue(): T;

	/**
	 * Returns the value that is being validated.
	 *
	 * @param defaultValue - the fallback value to use if the value is invalid
	 * @returns the validated value, or `defaultValue` if the value is invalid (e.g. due to dereferencing a
	 *   property of a `null` object)
	 */
	getValueOrDefault(defaultValue: T): T;

	getValueOrDefault(defaultValue: T | null): T | null;

	/**
	 * Returns the contextual information for upcoming validations carried out by this validator. The contextual
	 * information is a map of key-value pairs that can provide more details about validation failures. For
	 * example, if the message is "Password may not be empty" and the map contains the key-value pair
	 * `{"username": "john.smith"}`, the error message would be:
	 * ```console
	 * Password may not be empty
	 * username: john.smith
	 * ```
	 *
	 * @returns an unmodifiable map from each entry's name to its value
	 * @see {@link Validators.getContext}
	 */
	getContext(): Map<string, unknown>;

	/**
	 * Sets the contextual information for upcoming validations.
	 * <p>
	 * This method adds contextual information to error messages. The contextual information is stored as
	 * key-value pairs in a map. Values set by this method override any values that are set using
	 * {@link Validators.withContext}.
	 * <p>
	 * There is no way to remove contextual information from a validator. Thread-level contextual information is
	 * removed automatically.
	 *
	 * @param value - the value of the entry
	 * @param name  - the name of an entry
	 * @returns this
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name`:
	 *                    <ul>
	 *                      <li>contains whitespace</li>
	 *                      <li>is empty</li>
	 *                      <li>is already in use by the value being validated or the validator
	 *                      context</li>
	 *                    </ul>
	 */
	withContext(value: unknown, name: string): S;

	/**
	 * Facilitates the validation of related properties. For example:
	 * <p>
	 * ```ts
	 * requireThat(nameToFrequency, "nameToFrequency").
	 *   and(m => m.size().isPositive()).
	 *   and(m => m.keySet().contains("John"));
	 * ```
	 * <p>
	 * Any changes made during the validation process will impact this validator.
	 *
	 * @param validation - the nested validation
	 * @returns this
	 * @throws TypeError if `validation` is `undefined` or `null`
	 */
	and(validation: (validator: S) => void): S;

	/**
	 * Checks if any validation has failed.
	 *
	 * @returns `true` if at least one validation has failed
	 */
	validationFailed(): boolean;

	/**
	 * Returns the array of failed validations.
	 *
	 * @returns an array of failed validations
	 */
	elseGetFailures(): ValidationFailures;

	/**
	 * Throws an error if a validation failed; otherwise, returns `true`.
	 *
	 * @returns true if the validation passed
	 * @throws RangeError if a method precondition, class invariant, or method postcondition was violated
	 * @throws MultipleFailuresError if more than one validation failed. This error contains an array of
	 * the failures.
	 */
	elseThrow(): boolean;

	/**
	 * Returns the contextual information associated with this validator.
	 *
	 * @returns the contextual information associated with this validator
	 */
	getContextAsString(): string;

	/**
	 * Ensures that the value is undefined.
	 *
	 * @returns this
	 * @throws TypeError if the value is not `undefined`
	 */
	isUndefined(): ObjectValidator<undefined>;

	/**
	 * Ensures that the value is not undefined.
	 * <p>
	 * This method should be used to validate method arguments that are assigned to class fields but not
	 * accessed right away (such as constructor and setter arguments). It should also be used to validate any
	 * method arguments when the validator contains
	 * {@link ValidatorComponent.getContext|additional contextual information}.
	 *
	 * @returns this
	 * @throws TypeError if the value is `undefined`
	 */
	isNotUndefined(): ObjectValidator<NonUndefinable<T>>;

	/**
	 * Ensures that the value is `null`.
	 *
	 * @returns this
	 * @throws TypeError if the value is not `null`
	 */
	isNull(): ObjectValidator<null>;

	/**
	 * Ensures that the value is not `null`.
	 * <p>
	 * This method should be used to validate method arguments that are assigned to class fields but not
	 * accessed right away (such as constructor and setter arguments). It should also be used to validate any
	 * method arguments when the validator contains
	 * {@link ValidatorComponent.getContext|additional contextual information}.
	 *
	 * @returns this
	 * @throws TypeError if the value is `null`
	 */
	isNotNull(): ObjectValidator<NonNullable<T>>;

	/**
	 * Ensures that the object is an instance of a class.
	 *
	 * @typeParam U - the desired class
	 * @param expected - the desired class
	 * @returns a validator for an object of the desired class
	 * @throws TypeError if the value or `expected` are `undefined` or `null`
	 * @throws RangeError if the value is not an instance of the desired class
	 */
	isInstanceOf<U extends object>(expected: ClassConstructor<U>): ObjectValidator<U>;

	/**
	 * Ensures that the value has the specified type.
	 *
	 * @param expected  - the expected type of the value
	 * @returns this
	 * @throws TypeError if the value is not an instance of the specified type
	 */
	isType(expected: Type): S;

	/**
	 * Ensures that the object is not an instance of a class.
	 *
	 * @param unwanted - the unwanted class
	 * @returns this
	 * @throws TypeError if the value or `unwanted` are `undefined` or `null`
	 * @throws RangeError if the value is an instance of the unwanted class
	 */
	isNotInstanceOf<U extends object>(unwanted: ClassConstructor<U>): ObjectValidator<T>;

	/**
	 * Ensures that the object is equal to `expected`.
	 *
	 * @param expected - the expected value
	 * @returns this
	 * @throws RangeError if the value is not equal to `expected`
	 * @see <a href="https://github.com/cowwoc/requirements.java/blob/master/docs/Textual_Diff.md">An
	 *   explanation of the output format</a>
	 */
	isEqualTo(expected: unknown): S;

	/**
	 * Ensures that the object is equal to `expected`.
	 *
	 * @param expected - the expected value
	 * @param name     - the name of the expected value
	 * @returns this
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if:
	 *                    <ul>
	 *                      <li>`name` is empty</li>
	 *                      <li>`name` contains whitespace</li>
	 *                      <li>`name` is already in use by the value being validated or
	 *                      the validator context</li>
	 *                      <li>the value is not equal to `expected`</li>
	 *                    </ul>
	 * @see <a href="https://github.com/cowwoc/requirements.java/blob/master/docs/Textual_Diff.md">An
	 * explanation of the output format</a>
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	isEqualTo(expected: unknown, name: string): S;

	/**
	 * Ensures that the object is not equal to `unwanted`.
	 *
	 * @param unwanted - the unwanted value
	 * @returns this
	 * @throws RangeError if the value is equal to `expected`
	 * @see <a href="https://github.com/cowwoc/requirements.java/blob/master/docs/Textual_Diff.md">An
	 * explanation of the output format</a>
	 */
	isNotEqualTo(unwanted: unknown): S;

	/**
	 * Ensures that the object is not equal to `unwanted`.
	 *
	 * @param unwanted - the unwanted value
	 * @param name     - the name of the other value
	 * @returns this
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if:
	 *                    <ul>
	 *                      <li>`name` is empty</li>
	 *                      <li>`name` contains whitespace</li>
	 *                      <li>`name` is already in use by the value being validated or
	 *                      the validator context</li>
	 *                      <li>the value is equal to the `unwanted` value</li>
	 *                    </ul>
	 * @see <a href="https://github.com/cowwoc/requirements.java/blob/master/docs/Textual_Diff.md">An
	 * explanation of the output format</a>
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	isNotEqualTo(unwanted: unknown, name: string): S;
}

export type {ValidatorComponent};