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
	AssertionError,
	Pluralizer,
	messagesIsInstanceOf,
	AbstractValidator
} from "../internal.mjs";

const typedocWorkaround: null | ConfigurationUpdater | AssertionError = null;
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// noinspection PointlessBooleanExpressionJS
if (typedocWorkaround !== null)
	console.log("WORKAROUND: https://github.com/microsoft/tsdoc/issues/348");

/* eslint-enable @typescript-eslint/no-unnecessary-condition */

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
	public static readonly INTERNAL = new JavascriptValidatorsImpl(MainApplicationScope.INSTANCE,
		Configuration.DEFAULT);

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
		super(scope, JavascriptValidatorsImpl.getRequireThatConfiguration(configurationOrOther));
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
	private static getRequireThatConfiguration(configurationOrOther: Configuration | JavascriptValidatorsImpl)
	{
		if (configurationOrOther instanceof Configuration)
			return configurationOrOther;
		return configurationOrOther.getRequireThatConfiguration();
	}

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
	public requireThatNumber<T extends number | undefined | null>
	(value: T, name: string): NumberValidator<T>
	{
		verifyName(name, "name");
		return this.validateNumber(value, name, this.getRequireThatConfiguration());
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
	public requireThatBoolean<T extends boolean | undefined | null>
	(value: T, name: string): BooleanValidator<T>
	{
		verifyName(name, "name");
		return this.validateBoolean(value, name, this.getRequireThatConfiguration());
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
	 * @returns a verifier
	 * @throws TypeError  if `name` is `undefined` or `null`
	 * @throws RangeError if `name` is empty
	 */
	public requireThatArray<T extends E[] | undefined | null, E>
	(value: T, name: string): ArrayValidator<T, E>
	{
		verifyName(name, "name");
		return this.validateArray(value, name, this.getRequireThatConfiguration());
	}

	/**
	 * Validates the state of a set.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails.
	 *
	 * @typeParam T - the type the value
	 * @typeParam E - the type elements in the set
	 * @param value - the value
	 * @param name - the name of the value
	 * @returns a verifier
	 * @throws TypeError  if `name` is `undefined` or `null`
	 * @throws RangeError if `name` is empty
	 */
	public requireThatSet<T extends Set<E> | undefined | null, E>
	(value: T, name: string): SetValidator<T, E>
	{
		verifyName(name, "name");
		return this.validateSet(value, name, this.getRequireThatConfiguration());
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
	 * @returns a verifier
	 * @throws TypeError  if `name` is `undefined` or `null`
	 * @throws RangeError if `name` is empty
	 */
	public requireThatMap<T extends Map<K, V> | undefined | null, K, V>
	(value: T, name: string): MapValidator<T, K, V>
	{
		verifyName(name, "name");
		return this.validateMap(value, name, this.getRequireThatConfiguration());
	}

	/**
	 * Validates the state of a string.
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
	public requireThatString<T extends string | undefined | null>
	(value: T, name: string): StringValidator<T>
	{
		verifyName(name, "name");
		return this.validateString(value, name, this.getRequireThatConfiguration());
	}

	/**
	 * Validates the state of an object.
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
	public requireThatObject<T extends object | undefined | null>
	(value: T, name: string): ObjectValidator<T>
	{
		verifyName(name, "name");
		return this.validateObject(value, name, this.getRequireThatConfiguration());
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
	public assertThatNumber<T extends number | undefined | null>
	(value: T, name?: string): NumberValidator<T>
	{
		return this.validateNumber(value, name, this.getAssertThatConfiguration());
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
	public assertThatBoolean<T extends boolean | undefined | null>
	(value: T, name?: string): BooleanValidator<T>
	{
		return this.validateBoolean(value, name, this.getAssertThatConfiguration());
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
	public assertThatArray<T extends E[] | undefined | null, E>
	(value: T, name?: string): ArrayValidator<T, E>
	{
		return this.validateArray(value, name, this.getAssertThatConfiguration());
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
	public assertThatSet<T extends Set<E> | undefined | null, E>
	(value: T, name?: string): SetValidator<T, E>
	{
		return this.validateSet(value, name, this.getAssertThatConfiguration());
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
	public assertThatMap<T extends Map<K, V> | undefined | null, K, V>
	(value: T, name?: string): MapValidator<T, K, V>
	{
		return this.validateMap(value, name, this.getAssertThatConfiguration());
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
	public assertThatString<T extends string | undefined | null>
	(value: T, name?: string): StringValidator<T>
	{
		return this.validateString(value, name, this.getAssertThatConfiguration());
	}

	/**
	 * Validates the state of an object.
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
	public assertThatObject<T extends object | undefined | null>
	(value: T, name?: string): ObjectValidator<T>
	{
		return this.validateObject(value, name, this.getAssertThatConfiguration());
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
	public checkIfNumber<T extends number | undefined | null>
	(value: T, name?: string): NumberValidator<T>
	{
		return this.validateNumber(value, name, this.getCheckIfConfiguration());
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
	public checkIfBoolean<T extends boolean | undefined | null>
	(value: T, name?: string): BooleanValidator<T>
	{
		return this.validateBoolean(value, name, this.getCheckIfConfiguration());
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
	public checkIfArray<T extends E[] | undefined | null, E>
	(value: T, name?: string): ArrayValidator<T, E>
	{
		return this.validateArray(value, name, this.getCheckIfConfiguration());
	}

	/**
	 * Validates the state of a set.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails.
	 *
	 * @typeParam T - the type the value
	 * @typeParam E - the type elements in the set
	 * @param value - the value
	 * @param name - the name of the value
	 * @returns validator for the value
	 * @throws TypeError  if `name` is `undefined` or `null`
	 * @throws RangeError if `name` is empty
	 */
	public checkIfSet<T extends Set<E> | undefined | null, E>
	(value: T, name?: string): SetValidator<T, E>
	{
		return this.validateSet(value, name, this.getCheckIfConfiguration());
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
	public checkIfMap<T extends Map<K, V> | undefined | null, K, V>
	(value: T, name?: string): MapValidator<T, K, V>
	{
		return this.validateMap(value, name, this.getCheckIfConfiguration());
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
	public checkIfString<T extends string | undefined | null>
	(value: T, name?: string): StringValidator<T>
	{
		return this.validateString(value, name, this.getCheckIfConfiguration());
	}

	/**
	 * Validates the state of an object.
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
	public checkIfObject<T extends object | undefined | null>
	(value: T, name?: string): ObjectValidator<T>
	{
		return this.validateObject(value, name, this.getCheckIfConfiguration());
	}

	public validateNumber<T extends number | undefined | null>
	(value: T, name: string | undefined, configuration: Configuration): NumberValidator<T>
	{
		if (name === undefined)
			name = JavascriptValidatorsImpl.DEFAULT_NAME;
		else
			verifyName(name, "name");

		const validator = new NumberValidatorImpl<T>(this.scope, configuration, name,
			ValidationTarget.valid(value), new Map<string, unknown>(), []);
		this.validateType(validator, value, Type.NUMBER);
		return validator;
	}

	/**
	 * Ensures that the value's runtime and compile-time types match.
	 *
	 * @param validator - a validator
	 * @param value - the value
	 * @param expectedType - the value's expected type
	 */
	private validateType(validator: AbstractValidator<unknown>, value: unknown, expectedType: Type)
	{
		const actualType = Type.of(value);
		switch (actualType)
		{
			case Type.UNDEFINED:
			case Type.NULL:
				return;
		}
		if (!expectedType.equals(expectedType))
		{
			// Cannot compare Type inside a switch statement because it doesn't map "name == null" to any class
			validator.addTypeError(
				messagesIsInstanceOf(validator, expectedType).toString());
		}
	}

	public validateBoolean<T extends boolean | undefined | null>
	(value: T, name: string | undefined, configuration: Configuration): BooleanValidator<T>
	{
		if (name === undefined)
			name = JavascriptValidatorsImpl.DEFAULT_NAME;
		else
			verifyName(name, "name");

		const validator = new BooleanValidatorImpl<T>(this.scope, configuration, name,
			ValidationTarget.valid(value), new Map<string, unknown>(), []);
		this.validateType(validator, value, Type.BOOLEAN);
		return validator;
	}

	public validateArray<T extends E[] | undefined | null, E>
	(value: T, name: string | undefined, configuration: Configuration): ArrayValidator<T, E>
	{
		if (name === undefined)
			name = JavascriptValidatorsImpl.DEFAULT_NAME;
		else
			verifyName(name, "name");

		const validator = new ArrayValidatorImpl<T, E>(this.scope, configuration, name,
			ValidationTarget.valid(value), Pluralizer.ELEMENT, new Map<string, unknown>(), []);
		this.validateType(validator, value, Type.ARRAY);
		return validator;
	}

	public validateSet<T extends Set<E> | undefined | null, E>
	(value: T, name: string | undefined, configuration: Configuration): SetValidator<T, E>
	{
		if (name === undefined)
			name = JavascriptValidatorsImpl.DEFAULT_NAME;
		else
			verifyName(name, "name");

		const validator = new SetValidatorImpl<T, E>(this.scope, configuration, name,
			ValidationTarget.valid(value), Pluralizer.ELEMENT, new Map<string, unknown>(), []);
		this.validateType(validator, value, Type.namedClass("Set"));
		return validator;
	}

	public validateMap<T extends Map<K, V> | undefined | null, K, V>
	(value: T, name: string | undefined, configuration: Configuration): MapValidator<T, K, V>
	{
		if (name === undefined)
			name = JavascriptValidatorsImpl.DEFAULT_NAME;
		else
			verifyName(name, "name");

		const validator = new MapValidatorImpl<T, K, V>(this.scope, configuration, name,
			ValidationTarget.valid(value), new Map<string, unknown>(), []);
		this.validateType(validator, value, Type.namedClass("Map"));
		return validator;
	}

	public validateString<T extends string | undefined | null>
	(value: T, name: string | undefined, configuration: Configuration): StringValidator<T>
	{
		if (name === undefined)
			name = JavascriptValidatorsImpl.DEFAULT_NAME;
		else
			verifyName(name, "name");
		const validator = new StringValidatorImpl<T>(this.scope, configuration, name,
			ValidationTarget.valid(value), new Map<string, unknown>(), []);
		this.validateType(validator, value, Type.STRING);
		return validator;
	}

	public validateObject<T extends object | undefined | null>
	(value: T, name: string | undefined, configuration: Configuration): ObjectValidator<T>
	{
		if (name === undefined)
			name = JavascriptValidatorsImpl.DEFAULT_NAME;
		else
			verifyName(name, "name");
		const validator = new ObjectValidatorImpl<T>(this.scope, configuration, name,
			ValidationTarget.valid(value), new Map<string, unknown>(), []);
		this.validateType(validator, value, Type.namedClass(null));
		return validator;
	}

	public copy(): JavascriptValidators
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