import isEqual from "lodash/isEqual.js";
import type {
	ContextLine,
	ObjectValidator,
	ClassConstructor,
	BooleanValidator,
	NumberValidator,
	ElementOf,
	ArrayValidator,
	StringValidator,
	SetValidator,
	MapValidator,
	InetAddressValidator,
	ClassValidator,
	ExtensibleObjectValidator
} from "../internal.mjs";
import {
	Objects,
	Configuration,
	ValidationFailure,
	ObjectValidatorImpl,
	BooleanValidatorImpl,
	NumberValidatorImpl,
	ArrayValidatorImpl,
	StringValidatorImpl,
	SetValidatorImpl,
	ClassValidatorImpl,
	Pluralizer,
	MapValidatorImpl,
	ContextGenerator
} from "../internal.mjs";

/**
 * Extensible implementation of <code>ExtensibleObjectValidator</code>.
 *
 * @typeParam S - the type of validator returned by the methods
 * @typeParam T - the type the actual value
 */
abstract class AbstractObjectValidator<S, T> implements ExtensibleObjectValidator<S, T>
{
	protected readonly config: Configuration;
	protected actual: T | undefined;
	protected readonly name: string;
	protected readonly failures: ValidationFailure[];

	/**
	 * @returns this
	 */
	protected getThis(): S
	{
		return this as unknown as S;
	}

	/**
	 * Creates a new AbstractObjectValidator.
	 *
	 * @param configuration - the instance configuration
	 * @param actual - the actual value
	 * @param name - the name of the value
	 * @param failures - the list of validation failures
	 * @throws TypeError if <code>configuration</code> or <code>name</code> are null or undefined
	 * @throws RangeError if <code>name</code> is empty
	 */
	protected constructor(configuration: Configuration, actual: T | undefined, name: string,
		failures: ValidationFailure[])
	{
		Objects.assertThatInstanceOf(configuration, "configuration", Configuration);
		Objects.verifyName(name, "name");
		this.config = configuration;
		this.actual = actual;
		this.name = name;
		this.failures = failures;
	}

	isPrimitive<T2 extends T = T & (string | number | bigint | boolean | null | undefined | symbol)>(): ObjectValidator<T2>
	{
		if (!this.requireThatActualIsDefinedAndNotNull())
			return this.getThis() as ObjectValidator<T2>;
		if (!Objects.isPrimitive(this.actual))
		{
			const typeOfActual = Objects.getTypeInfo(this.actual);
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be a primitive").
				addContext("Actual", this.actual).
				addContext("Type", typeOfActual);
			this.failures.push(failure);
		}
		return this.getThis() as ObjectValidator<T2>;
	}

	isInstanceOf<T2>(type: ClassConstructor<T2>): ObjectValidator<T2>
	{
		const typeOfType = Objects.getTypeInfo(type);
		const typeOfActual = Objects.getTypeInfo(this.actual);
		if (typeOfType.type === "class")
		{
			if (typeOfActual.type === "object" && this.actual instanceof type)
			{
				return new ObjectValidatorImpl<T2>(this.config, this.actual as T2 | undefined, this.name,
					this.failures);
			}
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be an instance of " + typeOfType.toString()).
				addContext("Actual", typeOfActual);
			this.failures.push(failure);
			return new ObjectValidatorImpl<T2>(this.config, undefined, this.name, this.failures);
		}
		else
		{
			throw new TypeError("type must be a class\n" +
				"Actual: " + typeOfType.toString());
		}
	}

	isNull(): ObjectValidator<null>
	{
		if (this.actual !== null)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be null.").
				addContextList(this.getContext(undefined, true));
			this.failures.push(failure);
		}
		return this.getThis() as ObjectValidator<null>;
	}

	isNotNull(): ObjectValidator<Exclude<T, null>>
	{
		if (this.actual === null)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " may not be null");
			this.failures.push(failure);
		}
		return this.getThis() as ObjectValidator<Exclude<T, null>>;
	}

	isDefined<T2 = Exclude<T, undefined>>(): ObjectValidator<T2>
	{
		if (typeof (this.actual) === "undefined")
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be defined");
			this.failures.push(failure);
		}
		return this.getThis() as unknown as ObjectValidator<T2>;
	}

	isUndefined(): ObjectValidator<undefined>
	{
		if (typeof (this.actual) !== "undefined")
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be undefined.").addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this.getThis() as ObjectValidator<undefined>;
	}

	isDefinedAndNotNull<T2 = Exclude<T, undefined | null>>(): ObjectValidator<T2>
	{
		if (typeof (this.actual) === "undefined" || this.actual === null)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name +
				" may not be undefined or null");
			this.failures.push(failure);
		}
		return this.getThis() as unknown as ObjectValidator<T2>;
	}

	isUndefinedOrNull<T2 extends T = T & (undefined | null)>(): ObjectValidator<T2>
	{
		if (typeof (this.actual) !== "undefined" && this.actual !== null)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name +
				" must be undefined or null");
			this.failures.push(failure);
		}
		return this.getThis() as ObjectValidator<T2>;
	}

	isBoolean(): BooleanValidator
	{
		const typeOfActual = Objects.getTypeInfo(this.actual);
		if (typeOfActual.type === "boolean")
			return new BooleanValidatorImpl(this.config, Boolean(this.actual), this.name, this.failures);
		const failure = new ValidationFailure(this.config, RangeError,
			this.name + " must be a boolean.").
			addContext("Actual", this.actual).
			addContext("Type", typeOfActual);
		this.failures.push(failure);
		return new BooleanValidatorImpl(this.config, undefined, this.name, this.failures);
	}

	isNumber(): NumberValidator
	{
		const typeOfActual = Objects.getTypeInfo(this.actual);
		if (typeOfActual.type === "number")
		{
			// https://stackoverflow.com/a/23440948
			return new NumberValidatorImpl(this.config, Number(this.actual), this.name, this.failures);
		}

		const failure = new ValidationFailure(this.config, RangeError,
			this.name + " must be a number.").
			addContext("Actual", this.actual).
			addContext("Type", typeOfActual);
		this.failures.push(failure);
		return new NumberValidatorImpl(this.config, undefined, this.name, this.failures);
	}

	isArray<E = ElementOf<T>>(): ArrayValidator<E>
	{
		const typeOfActual = Objects.getTypeInfo(this.actual);
		if (typeOfActual.type === "array")
		{
			return new ArrayValidatorImpl<E>(this.config, this.actual as E[], this.name, Pluralizer.ELEMENT,
				this.failures) as ArrayValidator<E>;
		}

		const failure = new ValidationFailure(this.config, RangeError,
			this.name + " must be an Array.").
			addContext("Actual", this.actual).
			addContext("Type", typeOfActual);
		this.failures.push(failure);
		return new ArrayValidatorImpl<E>(this.config, undefined, this.name, Pluralizer.ELEMENT,
			this.failures) as ArrayValidator<E>;
	}

	isString(): StringValidator
	{
		const typeOfActual = Objects.getTypeInfo(this.actual);
		let value: string | undefined;
		if (typeOfActual.type === "string")
			value = this.actual as string;
		else
		{
			value = undefined;
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be a string.").
				addContext("Actual", this.config.convertToString(this.actual)).
				addContext("Type", typeOfActual);
			this.failures.push(failure);
		}
		return new StringValidatorImpl(this.config, value, this.name, this.failures);
	}

	isSet<E>(): SetValidator<E>
	{
		const typeOfActual = Objects.getTypeInfo(this.actual);
		if (typeOfActual.type === "object" && typeOfActual.name === "Set")
			return new SetValidatorImpl(this.config, this.actual as Set<E>, this.name, this.failures);

		const failure = new ValidationFailure(this.config, RangeError, this.name + " must be a Set.").
			addContext("Actual", this.config.convertToString(this.actual)).
			addContext("Type", typeOfActual);
		this.failures.push(failure);
		return new SetValidatorImpl<E>(this.config, undefined, this.name, this.failures);
	}

	isMap<K, V>(): MapValidator<K, V>
	{
		const typeOfActual = Objects.getTypeInfo(this.actual);
		if (typeOfActual.type === "object" && typeOfActual.name === "Map")
			return new MapValidatorImpl(this.config, this.actual as Map<K, V>, this.name, this.failures);

		const failure = new ValidationFailure(this.config, RangeError, this.name + " must be a Map.").
			addContext("Actual", this.config.convertToString(this.actual)).
			addContext("Type", typeOfActual);
		this.failures.push(failure);
		return new MapValidatorImpl<K, V>(this.config, undefined, this.name, this.failures);
	}

	isInetAddress(): InetAddressValidator
	{
		return this.isString().isInetAddress();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	isClass<T2>(type: ClassConstructor<T2>): ClassValidator<T2>
	{
		const typeOfActual = Objects.getTypeInfo(this.actual);
		if (typeOfActual.type === "class")
		{
			return new ClassValidatorImpl<T2>(this.config, this.actual as ClassConstructor<T2> | undefined,
				this.name, this.failures);
		}

		const failure = new ValidationFailure(this.config, RangeError,
			this.name + " must contain a class.").
			addContext("Actual", this.actual).
			addContext("Type", typeOfActual);
		this.failures.push(failure);
		return new ClassValidatorImpl<T2>(this.config, undefined, this.name, this.failures);
	}

	isEqualTo(expected: T, name?: string): S
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (!isEqual(this.actual, expected))
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be equal to " + name).
					addContextList(this.getContext(expected, false));
			}
			else
			{
				const expectedIsString = this.config.convertToString(expected);
				const terminalWidth = this.config.getGlobalConfiguration().getTerminalWidth();
				const message = this.name + " must be equal to " + expectedIsString + ".";
				if (message.length < terminalWidth)
				{
					failure = new ValidationFailure(this.config, RangeError, message).
						addContextList(this.getContext(expected, true));
				}
				else
				{
					failure = new ValidationFailure(this.config, RangeError,
						this.name + " had an unexpected value.").
						addContextList(this.getContext(expected, false));
				}
			}
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isNotEqualTo(value: T, name?: string): S
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (isEqual(this.actual, value))
		{
			let failure;
			if (name)
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " may not be equal to " + name).
					addContext("Actual", this.actual);
			}
			else
			{
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " may not be equal to " + this.config.convertToString(value));
			}
			this.failures.push(failure);
		}
		return this.getThis();
	}

	/**
	 * {@inheritDoc}
	 */
	getActual(): T | undefined
	{
		return this.actual;
	}

	isTypeOf(type: string): S
	{
		Objects.requireThatValueIsDefinedAndNotNull(type, "type");
		const typeOfActual = typeof (this.actual);
		if (type !== typeOfActual)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				"typeof(" + this.name + ") must be equal to " + type).
				addContext("Actual", Objects.getTypeInfo(this.actual));
			this.failures.push(failure);
		}
		return this.getThis();
	}

	getFailures(): ValidationFailure[]
	{
		return this.failures;
	}

	/**
	 * @param expected - the expected value
	 * @param expectedInMessage - true if the expected value is already mentioned in the failure message
	 * @returns the list of name-value pairs to append to the exception message
	 */
	protected getContext(expected: T | undefined, expectedInMessage: boolean): ContextLine[]
	{
		const contextGenerator = new ContextGenerator(this.config);
		return contextGenerator.getContext("Actual", this.actual, "Expected", expected,
			expectedInMessage);
	}

	/**
	 * Ensures that <code>actual</code> is defined and not null; otherwise, an entry is added to
	 * <code>failures</code>.
	 *
	 * @returns <code>false</code> if the actual value is <code>undefined</code> or <code>null</code>
	 */
	protected requireThatActualIsDefinedAndNotNull(): boolean
	{
		if (typeof (this.actual) === "undefined")
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be defined.").
				addContextList(this.getContext(undefined, true));
			this.failures.push(failure);
			return false;
		}
		if (this.actual === null)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " may not be null.").
				addContextList(this.getContext(undefined, true));
			this.failures.push(failure);
			return false;
		}
		return true;
	}
}

export {AbstractObjectValidator};