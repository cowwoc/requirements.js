import type {
	ObjectVerifier,
	SetVerifier,
	ArrayVerifier,
	ClassVerifier,
	ArrayValidator,
	SetValidator,
	ClassValidator,
	ObjectValidator,
	MapVerifier,
	StringVerifier,
	NumberVerifier,
	StringValidator,
	NumberValidator,
	MapValidator,
	BooleanVerifier,
	BooleanValidator,
	ClassConstructor,
	AnythingButClassConstructor
} from "./internal/internal.mjs";
import {
	Configuration,
	MainGlobalConfiguration,
	Objects,
	ObjectValidatorImpl,
	ObjectVerifierImpl,
	SetValidatorImpl,
	SetVerifierImpl,
	ArrayVerifierImpl,
	ArrayValidatorImpl,
	Pluralizer,
	ClassVerifierImpl,
	ClassValidatorImpl,
	MapVerifierImpl,
	MapValidatorImpl,
	BooleanVerifierImpl,
	BooleanValidatorImpl,
	StringVerifierImpl,
	StringValidatorImpl,
	NumberVerifierImpl,
	NumberValidatorImpl
} from "./internal/internal.mjs";

/**
 * Verifies the requirements of types from the Javascript core API.
 */
class Requirements
{
	private readonly config: Configuration;

	/**
	 * Verifies a value.
	 * <p>
	 * Unlike {@link Requirements}, instances of this class can be configured prior to initiating verification.
	 * Doing so causes the same configuration to get reused across runs.
	 *
	 * @param configuration - the instance configuration
	 */
	constructor(configuration?: Configuration)
	{
		if (typeof (configuration) === "undefined")
			configuration = new Configuration(MainGlobalConfiguration.INSTANCE);
		this.config = configuration;
	}

	/**
	 * Verifies the requirements of an object.
	 *
	 * @typeParam T - the type the actual value
	 * @typeParam E - the type elements in the array or set
	 * @param actual - the actual value
	 * @param name - the name of the value
	 * @returns a verifier
	 * @throws TypeError  if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	requireThat(actual: boolean, name: string): BooleanVerifier;
	requireThat(actual: string, name: string): StringVerifier;
	requireThat(actual: number, name: string): NumberVerifier;
	requireThat<E>(actual: Array<E>, name: string): ArrayVerifier<E>;
	requireThat<E>(actual: Set<E>, name: string): SetVerifier<E>;
	requireThat<K, V>(actual: Map<K, V>, name: string): MapVerifier<K, V>;
	requireThat<T>(actual: ClassConstructor<T>, name: string): ClassVerifier<T>;
	requireThat<T>(actual: T, name: string): ObjectVerifier<T>;
	requireThat<T, E, K, V>
	(actual: unknown, name: string): BooleanVerifier | StringVerifier | NumberVerifier | ArrayVerifier<E> |
		SetVerifier<E> | MapVerifier<K, V> | ClassVerifier<T> | ObjectVerifier<T>
	{
		Objects.verifyName(name, "name");
		const typeOfActual = Objects.getTypeInfo(actual);
		switch (typeOfActual.type)
		{
			case "boolean":
				return new BooleanVerifierImpl(new BooleanValidatorImpl(this.config, actual as boolean, name, []));
			case "string":
				return new StringVerifierImpl(new StringValidatorImpl(this.config, actual as string, name, []));
			case "number":
				return new NumberVerifierImpl(new NumberValidatorImpl(this.config, actual as number, name, []));
			case "array":
			{
				return new ArrayVerifierImpl<E>(new ArrayValidatorImpl<E>(this.config, actual as E[], name,
					Pluralizer.ELEMENT, []));
			}
			case "object":
			{
				switch (typeOfActual.name)
				{
					case "Set":
						return new SetVerifierImpl<E>(new SetValidatorImpl<E>(this.config, actual as Set<E>, name, []));
					case "Map":
					{
						return new MapVerifierImpl<K, V>(new MapValidatorImpl<K, V>(this.config, actual as Map<K, V>,
							name, []));
					}
				}
				break;
			}
			case "class":
			{
				return new ClassVerifierImpl<T>(new ClassValidatorImpl(this.config,
					actual as ClassConstructor<T> | undefined, name, []));
			}
		}
		return new ObjectVerifierImpl<ObjectValidator<T>, T>(new ObjectValidatorImpl<T>(this.config,
			actual as T | undefined, name, []));
	}

	/**
	 * Validates the requirements of an object.
	 *
	 * @typeParam T - the type the actual value
	 * @typeParam E - the type elements in the array or set
	 * @param actual - the actual value
	 * @param name - the name of the value
	 * @returns validator for the value
	 * @throws TypeError  if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	validateThat(actual: boolean, name: string): BooleanValidator;
	validateThat(actual: string, name: string): StringValidator;
	validateThat(actual: number, name: string): NumberValidator;
	validateThat<E>(actual: Array<E>, name: string): ArrayValidator<E>;
	validateThat<E>(actual: Set<E>, name: string): SetValidator<E>;
	validateThat<K, V>(actual: Map<K, V>, name: string): MapValidator<K, V>;
	validateThat<T>(actual: AnythingButClassConstructor<T>, name: string): ObjectValidator<T>;
	validateThat<T>(actual: ClassConstructor<T>, name: string): ClassValidator<T>;
	validateThat(actual: unknown, name: string): ObjectValidator<unknown>;
	validateThat<E, K, V, T>
	(actual: unknown, name: string): BooleanValidator | StringValidator | NumberValidator |
		ArrayValidator<E> | SetValidator<E> | MapValidator<K, V> | ObjectValidator<T> | ClassValidator<T> |
		ObjectValidator<unknown>
	{
		Objects.verifyName(name, "name");
		const typeOfActual = Objects.getTypeInfo(actual);
		switch (typeOfActual.type)
		{
			case "boolean":
				return new BooleanValidatorImpl(this.config, actual as boolean, name, []);
			case "string":
				return new StringValidatorImpl(this.config, actual as string, name, []);
			case "number":
				return new NumberValidatorImpl(this.config, actual as number, name, []);
			case "class":
				return new ClassValidatorImpl<T>(this.config, actual as ClassConstructor<T> | undefined, name, []);
			case "array":
				return new ArrayValidatorImpl<E>(this.config, actual as E[], name, Pluralizer.ELEMENT, []);
			case "object":
			{
				switch (typeOfActual.name)
				{
					case "Set":
						return new SetValidatorImpl<E>(this.config, actual as Set<E>, name, []);
					case "Map":
						return new MapValidatorImpl<K, V>(this.config, actual as Map<K, V>, name, []);
				}
			}
		}
		return new ObjectValidatorImpl(this.config, actual, name, []);
	}

	/**
	 * Verifies requirements only if assertions are enabled.
	 *
	 * @param requirements - the requirements to verify
	 * @throws TypeError  if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	assertThat(requirements: (requirements: Requirements) => void)
	{
		Objects.requireThatValueIsDefinedAndNotNull(requirements, "requirements");
		if (this.config.assertionsAreEnabled())
			requirements(this.copy());
	}

	/**
	 * Verifies requirements only if assertions are enabled.
	 *
	 * @param requirements - the requirements to verify
	 * @returns the value returned by the operation, or <code>undefined</code> if assertions are disabled
	 * @throws TypeError  if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 * @see #assertThat
	 */
	assertThatAndReturn<V>(requirements: (requirements: Requirements) => V)
	{
		Objects.requireThatValueIsDefinedAndNotNull(requirements, "requirements");
		if (this.config.assertionsAreEnabled())
			return requirements(this.copy());
		return undefined;
	}

	/**
	 * Returns a copy of this configuration.
	 *
	 * @returns a copy of this configuration
	 */
	copy()
	{
		return new Requirements(this.config.copy());
	}

	/**
	 * Indicates whether <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @returns true if <code>assertThat()</code> should delegate to <code>requireThat()</code>; false if it
	 *   shouldn't do anything
	 */
	assertionsAreEnabled()
	{
		return this.config.assertionsAreEnabled();
	}

	/**
	 * Indicates that <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @returns this
	 */
	withAssertionsEnabled()
	{
		this.config.withAssertionsEnabled();
		return this;
	}

	/**
	 * Indicates that <code>assertThat()</code> shouldn't do anything.
	 *
	 * @returns this
	 */
	withAssertionsDisabled()
	{
		this.config.withAssertionsDisabled();
		return this;
	}

	/**
	 * Indicates if exceptions should show the difference between the actual and expected values.
	 *
	 * @returns true by default
	 */
	isDiffEnabled()
	{
		return this.config.isDiffEnabled();
	}

	/**
	 * Indicates that exceptions should show the difference between the actual and expected values.
	 *
	 * @returns this
	 */
	withDiff()
	{
		this.config.withDiff();
		return this;
	}

	/**
	 * Indicates that exceptions should not show the difference between the actual and expected
	 * values.
	 *
	 * @returns this
	 */
	withoutDiff()
	{
		this.config.withoutDiff();
		return this;
	}

	/**
	 * @returns a map of key-value pairs to append to the exception message
	 * @see #putContext
	 */
	getContext()
	{
		return this.config.getContext();
	}

	/**
	 * Appends contextual information to the exception message.
	 *
	 * @param key - a key
	 * @param value - a value
	 * @returns this
	 * @throws TypeError if <code>key</code> is not a string
	 * @see #getContext
	 */
	putContext(key: string, value: unknown)
	{
		this.config.putContext(key, value);
		return this;
	}
}

export {Requirements};