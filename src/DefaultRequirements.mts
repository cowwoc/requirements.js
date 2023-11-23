import type {
	GlobalConfiguration,
	ObjectValidator,
	ObjectVerifier,
	StringValidator,
	NumberValidator,
	ClassValidator,
	ArrayValidator,
	SetValidator,
	MapValidator,
	StringVerifier,
	NumberVerifier,
	ClassVerifier,
	ArrayVerifier,
	SetVerifier,
	MapVerifier
} from "./internal/internal.mjs";
import {
	Requirements,
	Objects,
	ArrayValidatorImpl,
	Pluralizer,
	SetValidatorImpl,
	ClassValidatorImpl,
	ObjectValidatorImpl,
	Configuration,
	MainGlobalConfiguration,
	ArrayVerifierImpl,
	SetVerifierImpl,
	MapVerifierImpl,
	MapValidatorImpl,
	ClassVerifierImpl,
	ObjectVerifierImpl
} from "./internal/internal.mjs";

const typedocWorkaround: null | GlobalConfiguration = null;
// noinspection PointlessBooleanExpressionJS
if (typedocWorkaround !== null)
	console.log("WORKAROUND: https://github.com/microsoft/tsdoc/issues/348");

/**
 * Verifies the requirements of an object.
 *
 * @typeParam T - the type the actual value
 * @param actual - the actual value
 * @param name - the name of the value
 * @returns a verifier
 * @throws TypeError  if <code>name</code> is null
 * @throws RangeError if <code>name</code> is empty
 */
function requireThat(actual: string, name: string): StringVerifier;
function requireThat(actual: number, name: string): NumberVerifier;
function requireThat(actual: null, name: string): ObjectVerifier<null>;
// eslint-disable-next-line @typescript-eslint/ban-types
function requireThat(actual: Function, name: string): ClassVerifier;
function requireThat<E>(actual: Array<E>, name: string): ArrayVerifier<E>;
function requireThat<E>(actual: Set<E>, name: string): SetVerifier<E>;
function requireThat<K, V>(actual: Map<K, V>, name: string): MapVerifier<K, V>;
function requireThat<T>(actual: T, name: string): ObjectVerifier<T>;
// eslint-disable-next-line @typescript-eslint/ban-types
function requireThat<T extends string | number | Function | Array<E> | Set<E> | Map<K, V>, E, K, V>
(actual: T, name: string): StringVerifier | NumberVerifier | ClassVerifier | ArrayVerifier<E> | SetVerifier<E> | MapVerifier<K, V> | ObjectVerifier<T>
{
	Objects.verifyName(name, "name");
	const config = new Configuration(MainGlobalConfiguration.INSTANCE);
	const typeOfActual = Objects.getTypeInfo(actual);
	if (typeOfActual.type === "array")
		return new ArrayVerifierImpl<E>(new ArrayValidatorImpl<E>(config, actual as E[], name, Pluralizer.ELEMENT, []));
	if (typeOfActual.type === "object" && typeOfActual.name === "Set")
		return new SetVerifierImpl<E>(new SetValidatorImpl<E>(config, actual as Set<E>, name, []));
	if (typeOfActual.type === "object" && typeOfActual.name === "Map")
		return new MapVerifierImpl<K, V>(new MapValidatorImpl<K, V>(config, actual as Map<K, V>, name, []));
	if (typeOfActual.type === "class")
	{
		// eslint-disable-next-line @typescript-eslint/ban-types
		return new ClassVerifierImpl(new ClassValidatorImpl(config, actual as Function, name, []));
	}
	return new ObjectVerifierImpl(new ObjectValidatorImpl(config, actual, name, []));
}

/**
 * Validates the requirements of an object.
 *
 * @typeParam T - the type the actual value
 * @param actual - the actual value
 * @param name - the name of the value
 * @returns a validator
 * @throws TypeError  if <code>name</code> is null
 * @throws RangeError if <code>name</code> is empty
 * @see {@link GlobalConfiguration.assertionsAreEnabled | GlobalConfiguration.assertionsAreEnabled}
 */
function validateThat(actual: string, name: string): StringValidator;
function validateThat(actual: number, name: string): NumberValidator;
function validateThat(actual: null, name: string): ObjectValidator<null>;
// eslint-disable-next-line @typescript-eslint/ban-types
function validateThat(actual: Function, name: string): ClassValidator;
function validateThat<E>(actual: Array<E>, name: string): ArrayValidator<E>;
function validateThat<E>(actual: Set<E>, name: string): SetValidator<E>;
function validateThat<K, V>(actual: Map<K, V>, name: string): MapValidator<K, V>;
function validateThat<T>(actual: T, name: string): ObjectValidator<T>;
// eslint-disable-next-line @typescript-eslint/ban-types
function validateThat<T extends string | number | Function | Array<E> | Set<E> | Map<K, V>, E, K, V>
(actual: T, name: string): StringValidator | NumberValidator | ClassValidator | ArrayValidator<E> | SetValidator<E> | MapValidator<K, V> | ObjectValidator<T>
{
	Objects.verifyName(name, "name");
	const config = new Configuration(MainGlobalConfiguration.INSTANCE);
	const typeOfActual = Objects.getTypeInfo(actual);
	if (typeOfActual.type === "array")
		return new ArrayValidatorImpl<E>(config, actual as E[], name, Pluralizer.ELEMENT, []);
	if (typeOfActual.type === "object" && typeOfActual.name === "Set")
		return new SetValidatorImpl<E>(config, actual as Set<E>, name, []);
	if (typeOfActual.type === "class")
	{
		// eslint-disable-next-line @typescript-eslint/ban-types
		return new ClassValidatorImpl(config, actual as Function, name, []);
	}
	return new ObjectValidatorImpl(config, actual, name, []);
}

/**
 * Verifies requirements only if assertions are enabled.
 *
 * By default, assertions are disabled.
 * See {@link GlobalConfiguration.assertionsAreEnabled | GlobalConfiguration.assertionsAreEnabled} to change
 * the default.
 *
 * @param requirements - the requirements to verify
 * @throws TypeError  if <code>name</code> is null
 * @throws RangeError if <code>name</code> is empty
 * @see {@link GlobalConfiguration.assertionsAreEnabled | GlobalConfiguration.assertionsAreEnabled}
 */
function assertThat(requirements: (requirements: Requirements) => void)
{
	Objects.requireThatValueIsDefinedAndNotNull(requirements, "requirements");
	const config = new Configuration(MainGlobalConfiguration.INSTANCE);
	if (config.assertionsAreEnabled())
		requirements(new Requirements());
}

/**
 * Verifies requirements only if assertions are enabled.
 *
 * By default, assertions are disabled.
 * See {@link GlobalConfiguration.assertionsAreEnabled | GlobalConfiguration.assertionsAreEnabled} to change
 * the default.
 *
 * @param requirements - the requirements to verify
 * @returns the value returned by <code>requirements</code>
 * @throws TypeError  if <code>name</code> is null
 * @throws RangeError if <code>name</code> is empty
 * @see {@link GlobalConfiguration.assertionsAreEnabled | GlobalConfiguration.assertionsAreEnabled}
 */
function assertThatAndReturn(requirements: (requirements: Requirements) => void)
{
	Objects.requireThatValueIsDefinedAndNotNull(requirements, "requirements");
	const config = new Configuration(MainGlobalConfiguration.INSTANCE);
	if (config.assertionsAreEnabled())
		return requirements(new Requirements());
	return undefined;
}

export
{
	requireThat,
	validateThat,
	assertThat,
	assertThatAndReturn
};