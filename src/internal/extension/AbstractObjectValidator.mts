import isEqual from "lodash/isEqual.js";
import type {
	ArrayValidator,
	BooleanValidator,
	ClassValidator,
	ContextLine,
	ExtensibleObjectValidator,
	InetAddressValidator,
	MapValidator,
	NumberValidator,
	SetValidator,
	StringValidator
} from "../internal.mjs";
import {
	ArrayValidatorImpl,
	BooleanValidatorImpl,
	ClassValidatorImpl,
	Configuration,
	ContextGenerator,
	InetAddressValidatorImpl,
	MapValidatorImpl,
	NumberValidatorImpl,
	Objects,
	Pluralizer,
	SetValidatorImpl,
	StringValidatorImpl,
	ValidationFailure
} from "../internal.mjs";

/**
 * Extensible implementation of <code>ExtensibleObjectValidator</code>.
 *
 * @typeParam S - the type of validator returned by the methods
 */
abstract class AbstractObjectValidator<S> implements ExtensibleObjectValidator<S>
{
	protected readonly config: Configuration;
	protected actual: unknown;
	protected readonly name: string;
	protected readonly failures: ValidationFailure[];

	/**
	 * @returns this
	 */
	protected abstract getThis(): S;

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
	protected constructor(configuration: Configuration, actual: unknown, name: string, failures: ValidationFailure[])
	{
		Objects.assertThatInstanceOf(configuration, "configuration", Configuration);
		Objects.verifyName(name, "name");
		this.config = configuration;
		this.actual = actual;
		this.name = name;
		this.failures = failures;
	}

	isEqualTo(expected: unknown, name?: string): S
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0)
			return this.getThis();
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
				const expectedAsString = this.config.convertToString(expected);
				const terminalWidth = this.config.getGlobalConfiguration().getTerminalWidth();
				const message = this.name + " must be equal to " + expectedAsString + ".";
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

	isNotEqualTo(value: unknown, name?: string): S
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringIsNotEmpty(name, "name");
		if (this.failures.length > 0)
			return this.getThis();
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

	isPrimitive(): S
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this.getThis();
		if (!Objects.isPrimitive(this.actual))
		{
			const typeOfActual = Objects.getTypeInfo(this.actual);
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be a primitive").
				addContext("Actual", this.actual).
				addContext("Type", typeOfActual);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isTypeOf(type: string): S
	{
		Objects.requireThatValueIsDefinedAndNotNull(type, "type");
		if (this.failures.length > 0)
			return this.getThis();
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

	// eslint-disable-next-line @typescript-eslint/ban-types
	isInstanceOf(type: Function): S
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this.getThis();
		const typeOfType = Objects.getTypeInfo(type);
		let failure;
		switch (typeOfType.type)
		{
			case "function":
			case "class":
			{
				if (this.actual instanceof type)
					return this.getThis();
				failure = new ValidationFailure(this.config, RangeError,
					this.name + " must be an instance of " + typeOfType.toString()).
					addContext("Actual", Objects.getTypeInfo(this.actual));
				break;
			}
			default:
			{
				failure = new ValidationFailure(this.config, TypeError, "type must be a function or class.").
					addContext("Actual", typeOfType);
				break;
			}
		}
		this.failures.push(failure);
		return this.getThis();
	}

	isNull(): S
	{
		if (this.actual !== null)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be null.").
				addContextList(this.getContext(null, true));
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isNotNull(): S
	{
		if (this.actual === null)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " may not be null");
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isDefined(): S
	{
		if (typeof (this.actual) === "undefined")
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be defined");
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isNotDefined(): S
	{
		if (typeof (this.actual) !== "undefined")
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be undefined.").addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isSet(): S
	{
		if (typeof (this.actual) === "undefined" || this.actual === null)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be set.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isNotSet(): S
	{
		if (typeof (this.actual) !== "undefined" && this.actual !== null)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " may not be set.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	getActual(): unknown
	{
		return this.actual;
	}

	asString(): StringValidator
	{
		let newName;
		if (typeof (this.actual) === "string")
			newName = this.name;
		else
			newName = this.name + ".asString()";
		let value: undefined | string;
		if (this.failures.length > 0)
			value = undefined;
		else
			value = this.config.convertToString(this.actual);
		return new StringValidatorImpl(this.config, value, newName, this.failures);
	}

	asStringConsumer(consumer: (actual: unknown) => StringValidator): S
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.asString());
		return this.getThis();
	}

	asArray(): ArrayValidator
	{
		if (this.failures.length === 0)
		{
			const typeOfActual = Objects.getTypeInfo(this.actual);
			if (typeOfActual.type === "array")
			{
				return new ArrayValidatorImpl(this.config, this.actual as unknown[], this.name, Pluralizer.ELEMENT,
					this.failures);
			}

			const failure = new ValidationFailure(this.config, TypeError,
				this.name + " must be an Array.").
				addContext("Actual", this.actual).
				addContext("Type", typeOfActual);
			this.failures.push(failure);
		}
		return new ArrayValidatorImpl(this.config, undefined, this.name, Pluralizer.ELEMENT, this.failures);
	}

	asArrayConsumer(consumer: (input: ArrayValidator) => void): S
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.asArray());
		return this.getThis();
	}

	asBoolean(): BooleanValidator
	{
		if (this.failures.length === 0)
		{
			try
			{
				return new BooleanValidatorImpl(this.config, Boolean(this.actual), this.name, this.failures);
			}
			catch (e)
			{
				const failure = new ValidationFailure(this.config, TypeError,
					this.name + " must be convertible to a boolean.").
					addContext("Actual", this.actual).
					addContext("Type", Objects.getTypeInfo(this.actual));
				this.failures.push(failure);
			}
		}
		return new BooleanValidatorImpl(this.config, undefined, this.name, this.failures);
	}

	asBooleanConsumer(consumer: (input: BooleanValidator) => void): S
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.asBoolean());
		return this.getThis();
	}

	asNumber(): NumberValidator
	{
		if (this.failures.length === 0)
		{
			const typeOfActual = Objects.getTypeInfo(this.actual);
			if (typeOfActual.type === "number")
			{
				// https://stackoverflow.com/a/23440948
				return new NumberValidatorImpl(this.config, Number(this.actual), this.name, this.failures);
			}

			const failure = new ValidationFailure(this.config, TypeError,
				this.name + " must be a number.").
				addContext("Actual", this.actual).
				addContext("Type", typeOfActual);
			this.failures.push(failure);
		}
		return new NumberValidatorImpl(this.config, undefined, this.name, this.failures);
	}

	asNumberConsumer(consumer: (input: NumberValidator) => void): S
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.asNumber());
		return this.getThis();
	}

	asSet(): SetValidator
	{
		if (this.failures.length === 0)
		{
			const typeOfActual = Objects.getTypeInfo(this.actual);
			if (typeOfActual.type === "array")
			{
				return new SetValidatorImpl(this.config, new Set<unknown>(this.actual as unknown[]), this.name,
					this.failures);
			}
			else if (typeOfActual.type === "object" && typeOfActual.name === "Set")
				return new SetValidatorImpl(this.config, this.actual as Set<unknown>, this.name, this.failures);

			const failure = new ValidationFailure(this.config, TypeError, this.name + " must be a Set.").
				addContext("Actual", this.config.convertToString(this.actual)).
				addContext("Type", typeOfActual);
			this.failures.push(failure);
		}
		return new SetValidatorImpl(this.config, undefined, this.name, this.failures);
	}

	asSetConsumer(consumer: (actual: SetValidator) => void): S
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.asSet());
		return this.getThis();
	}

	asMap(): MapValidator
	{
		if (this.failures.length === 0)
		{
			const typeOfActual = Objects.getTypeInfo(this.actual);
			if (typeOfActual.type === "object" && typeOfActual.name === "Map")
				return new MapValidatorImpl(this.config, this.actual, this.name, this.failures);

			const failure = new ValidationFailure(this.config, TypeError, this.name + " must be a Map.").
				addContext("Actual", this.config.convertToString(this.actual)).
				addContext("Type", typeOfActual);
			this.failures.push(failure);
		}
		return new MapValidatorImpl(this.config, undefined, this.name, this.failures);
	}

	asMapConsumer(consumer: (input: MapValidator) => void): S
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.asMap());
		return this.getThis();
	}

	/**
	 * @param value - a String
	 * @returns <code>true</code> if the String is a valid IPv4 address; false otherwise
	 */
	private static isIpV4Impl(value: string): boolean
	{
		// See https://devblogs.microsoft.com/oldnewthing/20060522-08/?p=31113
		const match = (/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/).exec(value);
		return match !== null && Number(match[1]) <= 255 && Number(match[2]) <= 255 &&
			Number(match[3]) <= 255 && Number(match[4]) <= 255;
	}

	/**
	 * @param value - a string
	 * @returns <code>true</code> if the String is a valid IPv6 address; false otherwise
	 */
	private static isIpV6Impl(value: string): boolean
	{
		// See https://blogs.msdn.microsoft.com/oldnewthing/20060522-08/?p=31113 and
		// https://4sysops.com/archives/ipv6-tutorial-part-4-ipv6-address-syntax/
		const components = value.split(":");
		if (components.length < 2 || components.length > 8)
			return false;
		if (components[0] !== "" || components[1] !== "")
		{
			// Address does not begin with a zero compression ("::")
			if (!(/^[\da-f]{1,4}/i).exec(components[0]))
			{
				// Component must contain 1-4 hex characters
				return false;
			}
		}

		let numberOfColons = 0;
		let numberOfZeroCompressions = 0;
		for (let i = 1; i < components.length; ++i)
		{
			++numberOfColons;
			const component = components[i];
			if (component === "")
				continue;
			if (numberOfColons === 2)
				++numberOfZeroCompressions;
			if (numberOfZeroCompressions > 1 || numberOfColons > 2)
			{
				// Zero compression can only occur once in an address
				return false;
			}
			numberOfColons = 0;
			if (!(/^[\da-f]{1,4}/i).exec(component))
			{
				// Component must contain 1-4 hex characters
				return false;
			}
		}
		if (numberOfColons === 2)
		{
			++numberOfZeroCompressions;
			numberOfColons = 0;
		}
		// Lines may not end with a colon. If they end with a zero compression, it must have been the first one.
		return numberOfColons === 0 && numberOfZeroCompressions <= 1;
	}

	/**
	 * @param value - a String
	 * @returns true if the String is a valid hostname; false otherwise
	 */
	private static isHostnameImpl(value: string): boolean
	{
		// See http://serverfault.com/a/638270/15584 and
		// https://blogs.msdn.microsoft.com/oldnewthing/20120412-00/?p=7873
		const components = value.split(".");

		// Top-level domain names may not be empty or all-numeric
		const topLevelDomain = components[components.length - 1];
		if ((/^[a-zA-Z-]+$/).exec(topLevelDomain) === null)
			return false;

		let sum = 0;
		for (let i = 0; i < components.length; ++i)
		{
			const label = components[i];
			// label may not be empty. It must consist of only the ASCII alphabetic and numeric characters, plus the
			// hyphen.
			if ((/^[a-zA-Z0-9-]+$/).exec(label) === null)
				return false;
			const length = label.length;
			if (length > 63)
				return false;
			if (label.startsWith("-") || label.endsWith("-"))
			{
				// If the hyphen is used, it is not permitted to appear at either the beginning or end of a label.
				return false;
			}
			// Each label is prefixed by a byte denoting its length
			sum += 1 + length;
		}
		// The last label is terminated by a byte denoting a length of zero
		++sum;
		return sum <= 255;
	}

	asInetAddress(): InetAddressValidator
	{
		if (this.failures.length === 0)
		{
			const typeOfActual = Objects.getTypeInfo(this.actual);
			switch (typeOfActual.type)
			{
				case "undefined":
				case "null":
					break;
				case "string":
				{
					const actualString = this.actual as string;
					if (AbstractObjectValidator.isIpV4Impl(actualString))
					{
						return new InetAddressValidatorImpl(this.config, actualString, this.name, true, false, false,
							this.failures);
					}
					if (AbstractObjectValidator.isIpV6Impl(actualString))
					{
						return new InetAddressValidatorImpl(this.config, actualString, this.name, false, true, false,
							this.failures);
					}
					if (AbstractObjectValidator.isHostnameImpl(actualString))
					{
						return new InetAddressValidatorImpl(this.config, actualString, this.name, false, false, true,
							this.failures);
					}
					break;
				}
			}
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must contain a valid IP address or hostname.").
				addContext("Actual", this.actual).
				addContext("Type", typeOfActual);
			this.failures.push(failure);
		}
		return new InetAddressValidatorImpl(this.config, undefined, this.name, false, false, false, this.failures);
	}

	asInetAddressConsumer(consumer: (actual: InetAddressValidator) => void): S
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.asInetAddress());
		return this.getThis();
	}

	asClass(): ClassValidator
	{
		if (this.failures.length === 0)
		{
			if (typeof (this.actual) === "function")
				return new ClassValidatorImpl(this.config, this.actual, this.name, this.failures);

			const typeOfActual = Objects.getTypeInfo(this.actual);
			const failure = new ValidationFailure(this.config, TypeError,
				this.name + " must contain a class.").
				addContext("Actual", this.actual).
				addContext("Type", typeOfActual);
			this.failures.push(failure);
		}
		return new ClassValidatorImpl(this.config, undefined, this.name, this.failures);
	}

	asClassConsumer(consumer: (input: ClassValidator) => void): S
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.asClass());
		return this.getThis();
	}

	getFailures(): ValidationFailure[]
	{
		return this.failures;
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
				addContextList(this.getContext(null, true));
			this.failures.push(failure);
			return false;
		}
		if (this.actual === null)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " may not be null.").
				addContextList(this.getContext(null, true));
			this.failures.push(failure);
			return false;
		}
		return true;
	}

	/**
	 * @param expected - the expected value
	 * @param expectedInMessage - true if the expected value is already mentioned in the failure message
	 * @returns the list of name-value pairs to append to the exception message
	 */
	protected getContext(expected: unknown, expectedInMessage: boolean): ContextLine[]
	{
		const contextGenerator = new ContextGenerator(this.config);
		return contextGenerator.getContext("Actual", this.actual, "Expected", expected,
			expectedInMessage);
	}
}

export {AbstractObjectValidator};