import {
	BooleanValidatorImpl,
	StringValidatorImpl,
	NumberValidatorImpl,
	SetValidatorImpl,
	MapValidatorImpl,
	ObjectValidatorImpl,
	Configuration,
	AbstractValidators,
	type BooleanValidator,
	type StringValidator,
	type NumberValidator,
	type SetValidator,
	type ObjectValidator,
	type MapValidator,
	TypeCategory,
	type ArrayValidator,
	ArrayValidatorImpl,
	type ApplicationScope,
	MainApplicationScope,
	verifyName,
	type ConfigurationUpdater,
	JavascriptValidators,
	Type,
	requireThatType,
	ValidationTarget,
	Pluralizer,
	AssertionError
} from "../internal.mjs";

const typedocWorkaround: null | ConfigurationUpdater | AssertionError = null;
// noinspection PointlessBooleanExpressionJS
if (typedocWorkaround !== null)
	console.log("WORKAROUND: https://github.com/microsoft/tsdoc/issues/348");


/**
 * The default implementation of JavascriptValidators.
 */
class JavascriptValidatorsImpl extends AbstractValidators<JavascriptValidators>
	implements JavascriptValidators
{
	private static readonly DEFAULT_NAME = "value";
	/**
	 * A validator factory that creates validators to check the arguments of validation methods.
	 */
	public static readonly INTERNAL = new JavascriptValidatorsImpl(
		MainApplicationScope.INSTANCE, Configuration.DEFAULT);

	/**
	 * Creates a new instance of this validator with an independent configuration.
	 *
	 * @param scope         - the application configuration
	 * @param configuration - the configuration to use for new validators
	 * @throws TypeError if any of the arguments are `undefined` or `null`
	 */
	public constructor(scope: ApplicationScope, configuration: Configuration);
	/**
	 * Creates a new instance of this validator with an independent configuration.
	 *
	 * @param scope - the application configuration
	 * @param other - the factory to copy
	 * @throws TypeError if any of the arguments are `undefined` or `null`
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	public constructor(scope: ApplicationScope, other: JavascriptValidatorsImpl);
	public constructor(scope: ApplicationScope, configurationOrOther: Configuration | JavascriptValidatorsImpl)
	{
		super(scope, JavascriptValidatorsImpl.getConfiguration(configurationOrOther));
		if (configurationOrOther instanceof JavascriptValidatorsImpl)
		{
			for (const entry of configurationOrOther.context)
				this.context.set(entry[0], entry[1]);
		}
	}

	/**
	 * @param configurationOrOther - the configuration to use for new validators or the factory to copy
	 * @returns the configuration to use for new validators
	 */
	private static getConfiguration(configurationOrOther: Configuration | JavascriptValidatorsImpl)
	{
		if (configurationOrOther instanceof Configuration)
			return configurationOrOther;
		return configurationOrOther.getConfiguration();
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
	 * @returns a verifier
	 * @throws TypeError  if `name` is `undefined` or `null`
	 * @throws RangeError if `name` is empty
	 */
	public requireThat(value: number, name: string): NumberValidator;
	public requireThat(value: boolean, name: string): BooleanValidator;
	public requireThat<E>(value: E[], name: string): ArrayValidator<E>;
	public requireThat<E>(value: Set<E>, name: string): SetValidator<E>;
	public requireThat<K, V>(value: Map<K, V>, name: string): MapValidator<K, V>;
	public requireThat(value: string, name: string): StringValidator;
	public requireThat<T>(value: T, name: string): ObjectValidator<T>;
	public requireThat<T, E, K, V>(value: T, name: string): NumberValidator | BooleanValidator |
		ArrayValidator<E> | SetValidator<E> | MapValidator<K, V> | StringValidator | ObjectValidator<T>
	{
		verifyName(name, "name");
		return this.newInstance(value, name, this.getConfiguration());
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
	public assertThat(value: number, name?: string): NumberValidator;
	public assertThat(value: boolean, name?: string): BooleanValidator;
	public assertThat<E>(value: E[], name?: string): ArrayValidator<E>;
	public assertThat<E>(value: Set<E>, name?: string): SetValidator<E>;
	public assertThat<K, V>(value: Map<K, V>, name?: string): MapValidator<K, V>;
	public assertThat(value: string, name?: string): StringValidator;
	public assertThat<T>(value: T, name?: string): ObjectValidator<T>;
	public assertThat<E, K, V, T>(value: T, name?: string): NumberValidator | BooleanValidator |
		ArrayValidator<E> | SetValidator<E> | MapValidator<K, V> | StringValidator | ObjectValidator<T>
	{
		return this.newInstance(value, name, this.getAssertThatConfiguration());
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
	public checkIf(value: number, name?: string): NumberValidator;
	public checkIf(value: boolean, name?: string): BooleanValidator;
	public checkIf<E>(value: E[], name?: string): ArrayValidator<E>;
	public checkIf<E>(value: Set<E>, name?: string): SetValidator<E>;
	public checkIf<K, V>(value: Map<K, V>, name?: string): MapValidator<K, V>;
	public checkIf(value: string, name?: string): StringValidator;
	public checkIf<T>(value: T, name?: string): ObjectValidator<T>;
	public checkIf<E, K, V, T>(value: T, name?: string): NumberValidator | BooleanValidator |
		ArrayValidator<E> | SetValidator<E> | MapValidator<K, V> | StringValidator | ObjectValidator<T>
	{
		return this.newInstance(value, name, this.getCheckIfConfiguration());
	}

	public newInstance<E, K, V, T>(value: T, name: string | undefined, configuration: Configuration):
		NumberValidator | BooleanValidator | ArrayValidator<E> | SetValidator<E> | MapValidator<K, V> |
		StringValidator | ObjectValidator<T>
	{
		if (name === undefined)
			name = JavascriptValidatorsImpl.DEFAULT_NAME;

		const typeOfValue = Type.of(value);
		switch (typeOfValue.category)
		{
			case TypeCategory.BOOLEAN:
			{
				return new BooleanValidatorImpl(this.scope, configuration, name,
					ValidationTarget.valid(value as boolean), new Map<string, unknown>(), []);
			}
			case TypeCategory.STRING:
			{
				return new StringValidatorImpl(this.scope, configuration, name,
					ValidationTarget.valid(value as string), new Map<string, unknown>(), []);
			}
			case TypeCategory.NUMBER:
			{
				return new NumberValidatorImpl(this.scope, configuration, name,
					ValidationTarget.valid(value as number), new Map<string, unknown>(), []);
			}
			case TypeCategory.ARRAY:
			{
				return new ArrayValidatorImpl<E>(this.scope, configuration, name,
					ValidationTarget.valid(value as E[]), Pluralizer.ELEMENT, new Map<string, unknown>(), []);
			}
			case TypeCategory.CLASS:
			{
				switch (typeOfValue.name)
				{
					case "Set":
					{
						return new SetValidatorImpl<E>(this.scope, configuration, name,
							ValidationTarget.valid(value as Set<E>), Pluralizer.ELEMENT, new Map<string, unknown>(), []);
					}
					case "Map":
					{
						return new MapValidatorImpl<K, V>(this.scope, configuration, name,
							ValidationTarget.valid(value as Map<K, V>), new Map<string, unknown>(), []);
					}
				}
				break;
			}
		}
		return new ObjectValidatorImpl<T>(this.scope, configuration, name, ValidationTarget.valid(value),
			new Map<string, unknown>(), []);
	}

	public copy()
	{
		return new JavascriptValidatorsImpl(this.scope, this);
	}

	public withContext(value: unknown, name: string)
	{
		requireThatType(name, "name", Type.STRING);
		this.context.set(name, value);
		return this;
	}

	public removeContext(name: string)
	{
		this.context.delete(name);
		return this;
	}
}

export {JavascriptValidatorsImpl};