import {
	type BooleanValidator,
	type StringValidator,
	type NumberValidator,
	type ArrayValidator,
	type SetValidator,
	type MapValidator,
	type ObjectValidator,
	Configuration,
	JavascriptValidatorsImpl,
	MainApplicationScope,
	type ConfigurationUpdater,
	type ValidatorComponent,
	JavascriptValidators,
	AssertionError
} from "./internal/internal.mjs";

const typedocWorkaround: null | ValidatorComponent<unknown, unknown> | JavascriptValidators |
	AssertionError = null;
// noinspection PointlessBooleanExpressionJS
if (typedocWorkaround !== null)
	console.log("WORKAROUND: https://github.com/microsoft/tsdoc/issues/348");

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
 * Validates the state of a value.
 * <p>
 * The returned validator throws an error immediately if a validation fails.
 *
 * @typeParam T - the type the value
 * @typeParam E - the type elements in the array or set
 * @typeParam K - the type of keys in the map
 * @typeParam V - the type of values in the map
 * @param value - the value
 * @param name - the name of the value
 * @returns a verifier
 * @throws TypeError  if `name` is `undefined` or `null`
 * @throws RangeError if `name` is empty
 */
function requireThat(value: number, name: string): NumberValidator;
function requireThat(value: boolean, name: string): BooleanValidator;
function requireThat<E>(value: E[], name: string): ArrayValidator<E>;
function requireThat<E>(value: Set<E>, name: string): SetValidator<E>;
function requireThat<K, V>(value: Map<K, V>, name: string): MapValidator<K, V>;
function requireThat(value: string, name: string): StringValidator;
function requireThat<T>(value: T, name: string): ObjectValidator<T>;
function requireThat<T, E, K, V>(value: T, name: string): NumberValidator | BooleanValidator |
	ArrayValidator<E> | SetValidator<E> | MapValidator<K, V> | StringValidator | ObjectValidator<T>
{
	return DELEGATE.requireThat(value, name);
}

/**
 * Validates the state of a value.
 * <p>
 * The returned validator throws an exception immediately if a validation fails. This exception is then
 * converted into an {@link AssertionError}. Exceptions unrelated to validation failures are not converted.
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
function assertThat(value: number, name?: string): NumberValidator;
function assertThat(value: boolean, name?: string): BooleanValidator;
function assertThat<E>(value: E[], name?: string): ArrayValidator<E>;
function assertThat<E>(value: Set<E>, name?: string): SetValidator<E>;
function assertThat<K, V>(value: Map<K, V>, name?: string): MapValidator<K, V>;
function assertThat(value: string, name?: string): StringValidator;
function assertThat<T>(value: T, name?: string): ObjectValidator<T>;
function assertThat<T, E, K, V>(value: T, name?: string): NumberValidator | BooleanValidator |
	ArrayValidator<E> | SetValidator<E> | MapValidator<K, V> | StringValidator | ObjectValidator<T>
{
	return DELEGATE.assertThat(value, name);
}

/**
 * Validates the state of a value.
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
function checkIf(value: number, name: string): NumberValidator;
function checkIf(value: boolean, name: string): BooleanValidator;
function checkIf<E>(value: E[], name: string): ArrayValidator<E>;
function checkIf<E>(value: Set<E>, name: string): SetValidator<E>;
function checkIf<K, V>(value: Map<K, V>, name: string): MapValidator<K, V>;
function checkIf(value: string, name: string): StringValidator;
function checkIf<T>(value: T, name: string): ObjectValidator<T>;
function checkIf<T, E, K, V>(value: T, name: string): NumberValidator | BooleanValidator |
	ArrayValidator<E> | SetValidator<E> | MapValidator<K, V> | StringValidator | ObjectValidator<T>
{
	return DELEGATE.checkIf(value, name);
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
	requireThat,
	assertThat,
	checkIf,
	updateConfiguration,
	getContext,
	withContext,
	removeContext,
	globalConfiguration
};