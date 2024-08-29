import {
	type ValidationFailure,
	Configuration,
	type ApplicationScope,
	type ValidatorComponent,
	MessageBuilder,
	JavascriptValidatorsImpl,
	type ErrorBuilder,
	ValidationFailureImpl,
	MultipleFailuresError,
	assertThatType,
	isApplicationScope,
	assertThatInstanceOf,
	Type,
	ValidationTarget,
	IllegalStateError,
	requireThatStringIsNotEmpty,
	assertThatValueIsNotNull,
	ObjectSizeValidatorImpl,
	messagesIsNotNull,
	messagesIsInstanceOf,
	messagesIsNotEqualTo,
	ValidationFailures,
	messagesIsEqualTo,
	messagesIsUndefined,
	type ObjectValidator,
	type NonUndefinable,
	messagesIsNull,
	type ClassConstructor
} from "../internal.mjs";
import isEqual from "lodash.isequal";

/**
 * Validates the state of a value, recording failures without throwing an error.
 *
 * @typeParam S - the type of validator that the methods should return
 * @typeParam T - the type of the value
 */
abstract class AbstractValidator<S, T> implements ValidatorComponent<S, T>
{
	protected static readonly VALUE_IS_UNDEFINED = () => new IllegalStateError("value is invalid");
	private static readonly CONTAINS_WHITESPACE = /.*\\s.*/u;
	/**
	 * The application configuration.
	 */
	protected readonly scope: ApplicationScope;
	/**
	 * The validator configuration.
	 */
	protected readonly _configuration: Configuration;
	/**
	 * The name of the value.
	 */
	protected readonly name: string;
	/**
	 * The value being validated.
	 */
	public readonly value: ValidationTarget<T>;
	/**
	 * The contextual information of this validator.
	 */
	protected readonly context: Map<string, unknown>;
	/**
	 * The list of validation failures.
	 */
	protected readonly failures: ValidationFailure[];

	/**
	 * @param scope - the application configuration
	 * @param configuration - the validator configuration
	 * @param name - the name of the value
	 * @param value - the value being validated
	 * @param context - the contextual information set by a parent validator or the user
	 * @param failures - the list of validation failures
	 * @throws TypeError if `name` is null
	 * @throws RangeError if `name` contains whitespace, or is empty
	 * @throws AssertionError if `scope`, `configuration`, `value`, `context` or `failures` are null
	 */
	protected constructor(scope: ApplicationScope, configuration: Configuration, name: string,
	                      value: ValidationTarget<T>, context: Map<string, unknown>,
	                      failures: ValidationFailure[])
	{
		assertThatType(scope, "scope", Type.namedClass("ApplicationScope", () => isApplicationScope(scope)));
		assertThatInstanceOf(configuration, "configuration", Configuration);

		requireThatStringIsNotEmpty(name, "name");
		if (AbstractValidator.CONTAINS_WHITESPACE.test(name))
		{
			throw new RangeError("name may not contain whitespace.\n" +
				"actual: \"" + name + "\"");
		}

		assertThatValueIsNotNull(value, "value");
		assertThatValueIsNotNull(context, "context");
		assertThatValueIsNotNull(failures, "failures");
		this.scope = scope;
		this._configuration = configuration;
		this.name = name;
		this.value = value;
		this.context = context;
		this.failures = failures;
	}

	/**
	 * @returns the application configuration
	 */
	public getScope()
	{
		return this.scope;
	}

	public getName()
	{
		return this.name;
	}

	public validationFailed()
	{
		return this.failures.length !== 0;
	}

	public getValue()
	{
		return this.value.orThrow(ObjectSizeValidatorImpl.VALUE_IS_UNDEFINED);
	}

	getValueOrDefault(defaultValue: T): T;
	public getValueOrDefault(defaultValue: T | null): T | null;
	public getValueOrDefault(defaultValue: T | null): T | null
	{
		return this.value.or(defaultValue);
	}

	and(validation: (validator: S) => void): S
	{
		validation(this.self());
		return this.self();
	}

	/**
	 * Adds a validation failure and throws an error if the validator is configured to throw an error on
	 * failure.
	 *
	 * @param message - a message that explains what went wrong
	 * @param errorBuilder - creates the error associated with this failure
	 */
	public addFailure(message: string, errorBuilder: ErrorBuilder)
	{
		const failure = new ValidationFailureImpl(this._configuration, message, errorBuilder);
		this.failures.push(failure);
		if (this._configuration.throwOnFailure())
			throw failure.getError();
	}

	/**
	 * Adds a `TypeError` validation failure and throws an error if the validator is
	 * configured to throw an error on failure.
	 *
	 * @param message - a message that explains what went wrong
	 */
	protected addTypeError(message: string): void
	{
		this.addFailure(message, (theMessage: string) => new TypeError(theMessage));
	}

	/**
	 * Adds a `RangeError` validation failure and throws an error if the validator is configured
	 * to throw an error on failure.
	 *
	 * @param message - a message that explains what went wrong
	 */
	protected addRangeError(message: string)
	{
		this.addFailure(message, (theMessage: string) => new RangeError(theMessage));
	}

	public configuration(): Configuration
	{
		return this._configuration;
	}

	/**
	 * @typeParam U - the expected return type
	 * @returns this
	 */
	protected self<U>(): U
	{
		return this as unknown as U;
	}

	public elseGetFailures()
	{
		return new ValidationFailures(this.failures);
	}

	public elseThrow(): boolean
	{
		const error = this.elseGetError();
		if (error === null)
			return true;
		throw error;
	}

	public elseGetError(): Error | null
	{
		if (this.failures.length === 0)
			return null;
		if (this.failures.length === 1)
			return this.failures[0].getError();
		return new MultipleFailuresError(this.failures);
	}

	public getContext(): Map<string, unknown>
	{
		return new Map(this.context);
	}

	public withContext(value: unknown, name: string): S
	{
		this.requireThatNameIsUnique(name, false);
		if (value === null)
			this.context.delete(name);
		else
			this.context.set(name, value);
		return this.self();
	}

	public getContextAsString(): string
	{
		return new MessageBuilder(this, "").toString();
	}

	/**
	 * Ensures that a name does not conflict with other variable names already in use by the validator.
	 *
	 * @param name - the name of the parameter
	 * @param checkContext - `false` to allow the name to be used even if it conflicts with an
	 * existing name in the validator context
	 * @returns the internal validator of the name
	 * @throws RangeError if `name` is null
	 * @throws RangeError if `name`:
	 *                    <ul>
	 *                      <li>contains whitespace</li>
	 *                      <li>is empty</li>
	 *                      <li>is already in use by the value being validated or the validator context</li>
	 *                    </ul>
	 */
	protected requireThatNameIsUnique(name: string, checkContext = true)
	{
		const internalValidators = JavascriptValidatorsImpl.INTERNAL;
		internalValidators.requireThat(name, "name").isTrimmed().isNotEmpty();
		if (AbstractValidator.CONTAINS_WHITESPACE.test(name))
			throw new RangeError("name may not contain whitespace");

		if (name === this.name)
		{
			throw new RangeError(`The name "${name}" is already in use by the value being validated.
Choose a different name.`);
		}
		if (checkContext && this.context.has(name))
		{
			throw new RangeError(`The name "${name}" is already in use by the validator context. Choose a \
different name.`);
		}
		return internalValidators;
	}

	public isUndefined()
	{
		if (this.value.validationFailed(v => v === undefined))
		{
			this.addTypeError(
				messagesIsUndefined(this).toString());
		}
		return this as unknown as ObjectValidator<undefined>;
	}

	public isNotUndefined()
	{
		if (this.value.validationFailed(v => v !== undefined))
		{
			this.addTypeError(
				messagesIsUndefined(this).toString());
		}
		return this as unknown as ObjectValidator<NonUndefinable<T>>;
	}


	public isNull()
	{
		if (this.value.validationFailed(v => v === null))
		{
			this.addTypeError(
				messagesIsNull(this).toString());
		}
		return this as unknown as ObjectValidator<null>;
	}

	public isNotNull()
	{
		if (this.value.validationFailed(v => v !== null))
		{
			this.addTypeError(
				messagesIsNotNull(this).toString());
		}
		return this as unknown as ObjectValidator<NonNullable<T>>;
	}

	/**
	 * @param otherType - another type
	 * @param mustBeEqual  - `true` if the value must match the other type, `false` if it must not match the
	 *   other type
	 * @throws TypeError if the value does not match the expected type and the validator is configured to throw
	 * an error on failure
	 * @returns true if the value does not match the expected type
	 */
	private validateType(otherType: Type, mustBeEqual: boolean): boolean
	{
		const validationFailed = this.value.validationFailed(v =>
		{
			const typeOfValue = Type.of(v);
			if (typeof (otherType.typeGuard) !== "undefined")
				return otherType.typeGuard(v);
			return isEqual(typeOfValue, otherType) === mustBeEqual;
		});
		if (validationFailed)
		{
			this.addTypeError(
				messagesIsInstanceOf(this, otherType).toString());
			return false;
		}
		return true;
	}

	public isType(expected: Type): S
	{
		JavascriptValidatorsImpl.INTERNAL.requireThat(expected, "expected").isNotNull();
		if (this.value.validationFailed(v => Type.of(v).equals(expected)))
		{
			this.addTypeError(
				messagesIsInstanceOf(this, expected).toString());
		}
		return this.self();
	}

	public isInstanceOf<U extends object>(expected: ClassConstructor<U>): ObjectValidator<U>
	{
		JavascriptValidatorsImpl.INTERNAL.requireThat(expected, "expected").isNotNull();
		const className = Type.of(expected).name;
		this.validateType(Type.namedClass(className), true);
		return this as unknown as ObjectValidator<U>;
	}

	public isNotInstanceOf<U extends object>(expected: ClassConstructor<U>): ObjectValidator<T>
	{
		JavascriptValidatorsImpl.INTERNAL.requireThat(expected, "expected").isNotNull();
		const className = Type.of(expected).name;
		this.validateType(Type.namedClass(className), false);
		return this.self();
	}

	public isEqualTo(expected: unknown): S;
	public isEqualTo(expected: unknown, name?: string)
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.validationFailed(v => isEqual(v, expected)))
		{
			this.addRangeError(
				messagesIsEqualTo(this, name ?? null, expected).toString());
		}
		return this.self();
	}

	public isNotEqualTo(unwanted: unknown): S;
	public isNotEqualTo(unwanted: unknown, name?: string)
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.validationFailed(v => !isEqual(v, unwanted)))
		{
			this.addRangeError(
				messagesIsNotEqualTo(this, name ?? null, unwanted).toString());
		}
		return this.self();
	}

	/**
	 * @param name - the name of the value
	 * @param namePrefix - the string to prepend to the name if the name is null
	 * @param value - a value
	 * @param valuePrefix - the string to prepend to the value if the name is null
	 * @returns the prefixed name if it is defined; otherwise, the prefixed string representation of the value
	 */
	public getNameOrValue(namePrefix: string, name: string | null, valuePrefix: string, value: unknown)
	{
		if (name === null)
			return valuePrefix + this.configuration().stringMappers().toString(value);
		return namePrefix + MessageBuilder.quoteName(name);
	}

	/**
	 * Invoked by a validation if the value is null. Sets the value to `undefined`.
	 */
	protected onNull()
	{
		this.addRangeError(messagesIsNotNull(this).toString());
	}
}

export {AbstractValidator};