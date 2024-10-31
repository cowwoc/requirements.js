import {
	type BooleanValidator,
	type StringValidator,
	type NumberValidator,
	type ArrayValidator,
	type SetValidator,
	type MapValidator,
	type UnknownValidator,
	Configuration,
	JavascriptValidatorsImpl,
	MainApplicationScope,
	type ConfigurationUpdater,
	type ValidatorComponent,
	JavascriptValidators,
	AssertionError
} from "./internal/internal.mjs";

const typedocWorkaround: null | ValidatorComponent<unknown> | JavascriptValidators |
	AssertionError = null;
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// noinspection PointlessBooleanExpressionJS
if (typedocWorkaround !== null)
	console.log("WORKAROUND: https://github.com/microsoft/tsdoc/issues/348");
/* eslint-enable @typescript-eslint/no-unnecessary-condition */

/**
 * Creates validators for the Javascript API.
 * <p>
 * There are three kinds of validators:
 * <ul>
 *   <li>`requireThat()` for method preconditions.</li>
 *   <li>`assertThat()` for class invariants, and method postconditions.</li>
 *   <li>`checkIf()` for returning multiple validation failures.</li>
 * </ul>
 * <p>
 */
const DELEGATE = new JavascriptValidatorsImpl(MainApplicationScope.INSTANCE, Configuration.DEFAULT);

/**
 * Validates the state of a number.
 * <p>
 * The returned validator throws an error immediately if a validation fails.
 *
 * @typeParam T - the type the value
 * @param value - the value
 * @param name - the name of the value
 * @returns a verifier
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function requireThatNumber<T extends number | undefined | null>
(value: T, name: string): NumberValidator<T>
{
	return DELEGATE.requireThatNumber<T>(value, name);
}

/**
 * Validates the state of a boolean.
 * <p>
 * The returned validator throws an error immediately if a validation fails.
 *
 * @typeParam T - the type the value
 * @param value - the value
 * @param name - the name of the value
 * @returns a verifier
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function requireThatBoolean<T extends boolean | undefined | null>
(value: T, name: string): BooleanValidator<T>
{
	return DELEGATE.requireThatBoolean<T>(value, name);
}

/**
 * Validates the state of an array.
 * <p>
 * The returned validator throws an exception immediately if a validation fails. This exception is then
 * converted into an {@link AssertionError}. Exceptions unrelated to validation failures are not converted.
 *
 * @typeParam T - the type the value
 * @typeParam E - the type elements in the array
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function requireThatArray<T extends E[] | undefined | null, E>
(value: T, name: string): ArrayValidator<T, E>
{
	return DELEGATE.requireThatArray<T, E>(value, name);
}

/**
 * Validates the state of a set.
 * <p>
 * The returned validator throws an exception immediately if a validation fails. This exception is then
 * converted into an {@link AssertionError}. Exceptions unrelated to validation failures are not converted.
 *
 * @typeParam T - the type the value
 * @typeParam E - the type elements in the set
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function requireThatSet<T extends Set<E> | undefined | null, E>
(value: T, name: string): SetValidator<T, E>
{
	return DELEGATE.requireThatSet<T, E>(value, name);
}

/**
 * Validates the state of a map.
 * <p>
 * The returned validator throws an exception immediately if a validation fails. This exception is then
 * converted into an {@link AssertionError}. Exceptions unrelated to validation failures are not converted.
 *
 * @typeParam T - the type the value
 * @typeParam K - the type of keys in the map
 * @typeParam V - the type of values in the map
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function requireThatMap<T extends Map<K, V> | undefined | null, K, V>
(value: T, name: string): MapValidator<T, K, V>
{
	return DELEGATE.requireThatMap<T, K, V>(value, name);
}

/**
 * Validates the state of a string.
 * <p>
 * The returned validator throws an exception immediately if a validation fails. This exception is then
 * converted into an {@link AssertionError}. Exceptions unrelated to validation failures are not converted.
 *
 * @typeParam T - the type the value
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function requireThatString<T extends string | undefined | null>
(value: T, name: string): StringValidator<T>
{
	return DELEGATE.requireThatString<T>(value, name);
}

/**
 * Validates the state of an unknown value or a value that does not have a specialized validator.
 * <p>
 * The returned validator throws an exception immediately if a validation fails. This exception is then
 * converted into an {@link AssertionError}. Exceptions unrelated to validation failures are not converted.
 *
 * @typeParam T - the type the value
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function requireThat<T>(value: T, name: string): UnknownValidator<T>
{
	return DELEGATE.requireThat<T>(value, name);
}

/**
 * Validates the state of a number.
 * <p>
 * The returned validator throws an exception immediately if a validation fails. This exception is then
 * converted into an {@link AssertionError}. Exceptions unrelated to validation failures are not converted.
 *
 * @typeParam T - the type the value
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function assertThatNumber<T extends number | undefined | null>
(value: T, name?: string): NumberValidator<T>
{
	return DELEGATE.assertThatNumber<T>(value, name);
}

/**
 * Validates the state of a boolean.
 * <p>
 * The returned validator throws an exception immediately if a validation fails. This exception is then
 * converted into an {@link AssertionError}. Exceptions unrelated to validation failures are not converted.
 *
 * @typeParam T - the type the value
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function assertThatBoolean<T extends boolean | undefined | null>
(value: T, name?: string): BooleanValidator<T>
{
	return DELEGATE.assertThatBoolean<T>(value, name);
}

/**
 * Validates the state of an array.
 * <p>
 * The returned validator throws an exception immediately if a validation fails. This exception is then
 * converted into an {@link AssertionError}. Exceptions unrelated to validation failures are not converted.
 *
 * @typeParam T - the type the value
 * @typeParam E - the type elements in the array
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function assertThatArray<T extends E[] | undefined | null, E>
(value: T, name?: string): ArrayValidator<T, E>
{
	return DELEGATE.assertThatArray<T, E>(value, name);
}

/**
 * Validates the state of a set.
 * <p>
 * The returned validator throws an exception immediately if a validation fails. This exception is then
 * converted into an {@link AssertionError}. Exceptions unrelated to validation failures are not converted.
 *
 * @typeParam T - the type the value
 * @typeParam E - the type elements in the set
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function assertThatSet<T extends Set<E> | undefined | null, E>
(value: T, name?: string): SetValidator<T, E>
{
	return DELEGATE.assertThatSet<T, E>(value, name);
}

/**
 * Validates the state of a map.
 * <p>
 * The returned validator throws an exception immediately if a validation fails. This exception is then
 * converted into an {@link AssertionError}. Exceptions unrelated to validation failures are not converted.
 *
 * @typeParam T - the type the value
 * @typeParam K - the type of keys in the map
 * @typeParam V - the type of values in the map
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function assertThatMap<T extends Map<K, V> | undefined | null, K, V>
(value: T, name?: string): MapValidator<T, K, V>
{
	return DELEGATE.assertThatMap<T, K, V>(value, name);
}

/**
 * Validates the state of a string.
 * <p>
 * The returned validator throws an exception immediately if a validation fails. This exception is then
 * converted into an {@link AssertionError}. Exceptions unrelated to validation failures are not converted.
 *
 * @typeParam T - the type the value
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function assertThatString<T extends string | undefined | null>
(value: T, name?: string): StringValidator<T>
{
	return DELEGATE.assertThatString<T>(value, name);
}

/**
 * Validates the state of an unknown value or a value that does not have a specialized validator.
 * <p>
 * The returned validator throws an exception immediately if a validation fails. This exception is then
 * converted into an {@link AssertionError}. Exceptions unrelated to validation failures are not converted.
 *
 * @typeParam T - the type the value
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function assertThat<T>(value: T, name?: string): UnknownValidator<T>
{
	return DELEGATE.assertThat<T>(value, name);
}

/**
 * Validates the state of a number.
 * <p>
 * The returned validator throws an error immediately if a validation fails.
 *
 * @typeParam T - the type the value
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function checkIfNumber<T extends number | undefined | null>
(value: T, name: string): NumberValidator<T>
{
	return DELEGATE.checkIfNumber<T>(value, name);
}

/**
 * Validates the state of a boolean.
 * <p>
 * The returned validator throws an error immediately if a validation fails.
 *
 * @typeParam T - the type the value
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function checkIfBoolean<T extends boolean | undefined | null>
(value: T, name: string): BooleanValidator<T>
{
	return DELEGATE.checkIfBoolean<T>(value, name);
}

/**
 * Validates the state of an array.
 * <p>
 * The returned validator throws an error immediately if a validation fails.
 *
 * @typeParam T - the type the value
 * @typeParam E - the type elements in the array
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function checkIfArray<T extends E[] | undefined | null, E>
(value: T, name: string): ArrayValidator<T, E>
{
	return DELEGATE.checkIfArray<T, E>(value, name);
}

/**
 * Validates the state of a set.
 * <p>
 * The returned validator throws an error immediately if a validation fails.
 *
 * @typeParam T - the type the value
 * @typeParam E - the type elements in the array or set
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function checkIfSet<T extends Set<E> | undefined | null, E>
(value: T, name: string): SetValidator<T, E>
{
	return DELEGATE.checkIfSet<T, E>(value, name);
}

/**
 * Validates the state of a map.
 * <p>
 * The returned validator throws an error immediately if a validation fails.
 *
 * @typeParam T - the type the value
 * @typeParam K - the type of keys in the map
 * @typeParam V - the type of values in the map
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function checkIfMap<T extends Map<K, V>, K, V>
(value: T, name: string): MapValidator<T, K, V>
{
	return DELEGATE.checkIfMap<T, K, V>(value, name);
}

/**
 * Validates the state of a string.
 * <p>
 * The returned validator throws an error immediately if a validation fails.
 *
 * @typeParam T - the type the value
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function checkIfString<T extends string | undefined | null>
(value: T, name: string): StringValidator<T>
{
	return DELEGATE.checkIfString<T>(value, name);
}

/**
 * Validates the state of an unknown value or a value that does not have a specialized validator.
 * <p>
 * The returned validator throws an error immediately if a validation fails.
 *
 * @typeParam T - the type the value
 * @typeParam E - the type elements in the array or set
 * @typeParam K - the type of keys in the map
 * @typeParam V - the type of values in the map
 * @param value - the value
 * @param name - the name of the value
 * @returns validator for the value
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function checkIf<T>(value: T, name: string): UnknownValidator<T>
{
	return DELEGATE.checkIf<T>(value, name);
}

/**
 * Updates the configuration that will be used by new validators.
 *
 * @param updater - a function that updates the configuration
 * @returns this
 * @see {@link JavascriptValidators.newInstance|Creating an independent configuration}
 */
function updateConfiguration(updater: (configuration: ConfigurationUpdater) => void)
{
	return DELEGATE.updateConfiguration(updater);
}

/**
 * Returns the contextual information for validators created out by this factory. The contextual information
 * is a map of key-value pairs that can provide more details about validation failures. For example, if the
 * message is "Password may not be empty" and the map contains the key-value pair
 * `{"username": "john.smith"}`, the error message would be:
 * <p>
 * ```console
 * Password may not be empty
 * username: john.smith
 * ```
 *
 * @returns an unmodifiable map from each entry's name to its value
 */
function getContext()
{
	return DELEGATE.getContext();
}

/**
 * Sets the contextual information for validators created by this factory.
 * <p>
 * This method adds contextual information to error messages. The contextual information is stored as
 * key-value pairs in a map. Values set by this method may be overridden by
 * {@link ValidatorComponent.withContext}.
 *
 * @param value - the value of the entry
 * @param name  - the name of an entry
 * @returns the underlying validator factory
 * @throws NullPointerError if `name` is not a string
 */
function withContext(value: unknown, name: string)
{
	return DELEGATE.withContext(value, name);
}

/**
 * Removes the contextual information of validators created by this factory.
 *
 * @param name - the parameter name
 * @returns the underlying validator factory
 * @throws NullPointerError     if `name` is not a string
 * @throws IllegalArgumentError if `name` contains leading or trailing whitespace, or is
 * empty
 */
function removeContext(name: string)
{
	return DELEGATE.removeContext(name);
}

/**
 * Returns the global configuration shared by all validators.
 * <p>
 * <b>NOTE</b>: Updating this configuration affects existing and new validators.
 *
 * @returns the global configuration updater
 */
function globalConfiguration()
{
	return DELEGATE.getGlobalConfiguration();
}

export {
	requireThatNumber,
	requireThatBoolean,
	requireThatArray,
	requireThatSet,
	requireThatMap,
	requireThatString,
	requireThat,
	assertThatNumber,
	assertThatBoolean,
	assertThatArray,
	assertThatSet,
	assertThatMap,
	assertThatString,
	assertThat,
	checkIfNumber,
	checkIfBoolean,
	checkIfArray,
	checkIfSet,
	checkIfMap,
	checkIfString,
	checkIf,
	updateConfiguration,
	getContext,
	withContext,
	removeContext,
	globalConfiguration
};