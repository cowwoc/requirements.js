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
	MapVerifier,
	ClassConstructor,
	BooleanValidator,
	BooleanVerifier,
	AnythingButClassConstructor
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
	ObjectVerifierImpl,
	BooleanVerifierImpl,
	BooleanValidatorImpl,
	StringVerifierImpl,
	StringValidatorImpl,
	NumberVerifierImpl,
	NumberValidatorImpl
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
function requireThat(actual: boolean, name: string): BooleanVerifier;
function requireThat(actual: string, name: string): StringVerifier;
function requireThat(actual: number, name: string): NumberVerifier;
function requireThat<E>(actual: Array<E>, name: string): ArrayVerifier<E>;
function requireThat<E>(actual: Set<E>, name: string): SetVerifier<E>;
function requireThat<K, V>(actual: Map<K, V>, name: string): MapVerifier<K, V>;
function requireThat<T>(actual: ClassConstructor<T>, name: string): ClassVerifier<T>;
function requireThat<T>(actual: AnythingButClassConstructor<T>, name: string): ObjectVerifier<T>;
function requireThat<E, K, V, T>
(actual: unknown, name: string): BooleanVerifier | StringVerifier | NumberVerifier |
	ArrayVerifier<E> | SetVerifier<E> | MapVerifier<K, V> | ClassVerifier<T> | ObjectVerifier<T>
{
	Objects.verifyName(name, "name");
	const config = new Configuration(MainGlobalConfiguration.INSTANCE);
	const typeOfActual = Objects.getTypeInfo(actual);
	switch (typeOfActual.type)
	{
		case "boolean":
			return new BooleanVerifierImpl(new BooleanValidatorImpl(config, actual as boolean, name, []));
		case "string":
			return new StringVerifierImpl(new StringValidatorImpl(config, actual as string, name, []));
		case "number":
			return new NumberVerifierImpl(new NumberValidatorImpl(config, actual as number, name, []));
		case "array":
		{
			return new ArrayVerifierImpl<E>(new ArrayValidatorImpl<E>(config, actual as E[], name,
				Pluralizer.ELEMENT, []));
		}
		case "object":
		{
			switch (typeOfActual.name)
			{
				case "Set":
					return new SetVerifierImpl<E>(new SetValidatorImpl<E>(config, actual as Set<E>, name, []));
				case "Map":
				{
					return new MapVerifierImpl<K, V>(new MapValidatorImpl<K, V>(config, actual as Map<K, V>, name,
						[]));
				}
			}
			break;
		}
		case "class":
		{
			return new ClassVerifierImpl<T>(new ClassValidatorImpl(config,
				actual as ClassConstructor<T> | undefined, name, []));
		}
	}
	return new ObjectVerifierImpl<ObjectValidator<T>, T>(new ObjectValidatorImpl<T>(config, actual as T, name,
		[]));
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
function validateThat(actual: boolean, name: string): BooleanValidator;
function validateThat(actual: string, name: string): StringValidator;
function validateThat(actual: number, name: string): NumberValidator;
function validateThat<E>(actual: Array<E>, name: string): ArrayValidator<E>;
function validateThat<E>(actual: Set<E>, name: string): SetValidator<E>;
function validateThat<K, V>(actual: Map<K, V>, name: string): MapValidator<K, V>;
function validateThat(actual: undefined, name: string): ObjectValidator<undefined>;
function validateThat(actual: null, name: string): ObjectValidator<null>;
function validateThat<T>(actual: AnythingButClassConstructor<T>, name: string): ObjectValidator<T>;
function validateThat<T>(actual: ClassConstructor<T>, name: string): ClassValidator<T>;
function validateThat(actual: unknown, name: string): ObjectValidator<unknown>;
function validateThat<E, K, V, T>
(actual: unknown, name: string): BooleanValidator | StringValidator | NumberValidator | ArrayValidator<E> |
	SetValidator<E> | MapValidator<K, V> | ObjectValidator<T> | ClassValidator<T> | ObjectValidator<unknown>
{
	Objects.verifyName(name, "name");
	const config = new Configuration(MainGlobalConfiguration.INSTANCE);
	const typeOfActual = Objects.getTypeInfo(actual);
	switch (typeOfActual.type)
	{
		case "boolean":
			return new BooleanValidatorImpl(config, actual as boolean, name, []);
		case "string":
			return new StringValidatorImpl(config, actual as string, name, []);
		case "number":
			return new NumberValidatorImpl(config, actual as number, name, []);
		case "array":
			return new ArrayValidatorImpl<E>(config, actual as E[], name, Pluralizer.ELEMENT, []);
		case "object":
		{
			switch (typeOfActual.name)
			{
				case "Set":
					return new SetValidatorImpl<E>(config, actual as Set<E>, name, []);
				case "Map":
					return new MapValidatorImpl<K, V>(config, actual as Map<K, V>, name, []);
			}
			break;
		}
		case "class":
			return new ClassValidatorImpl<T>(config, actual as ClassConstructor<T> | undefined, name, []);
	}
	return new ObjectValidatorImpl<T>(config, actual as T | undefined, name, []);
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