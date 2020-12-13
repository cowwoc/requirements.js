import {
	ArrayValidator,
	ArrayValidatorImpl,
	ArrayValidatorNoOp,
	BooleanValidator,
	BooleanValidatorImpl,
	BooleanValidatorNoOp,
	ClassValidator,
	ClassValidatorImpl,
	ClassValidatorNoOp,
	Configuration,
	ContextGenerator,
	ContextLine,
	ExtensibleObjectValidator,
	InetAddressValidator,
	InetAddressValidatorImpl,
	InetAddressValidatorNoOp,
	MapValidator,
	MapValidatorImpl,
	MapValidatorNoOp,
	NumberValidator,
	NumberValidatorImpl,
	NumberValidatorNoOp,
	Objects,
	Pluralizer,
	SetValidator,
	SetValidatorImpl,
	SetValidatorNoOp,
	StringValidator,
	StringValidatorImpl,
	ValidationFailure
} from "../internal";
import {isEqual} from "lodash";

/**
 * Extensible implementation of <code>ExtensibleObjectValidator</code>.
 */
abstract class AbstractObjectValidator<S> implements ExtensibleObjectValidator<S>
{
	protected readonly config: Configuration;
	protected actual: unknown;
	protected readonly name: string;
	readonly failures: ValidationFailure[] = [];

	/**
	 * @return {ExtensibleObjectValidator} this
	 * @protected
	 */
	protected abstract getThis(): S;

	/**
	 * @return {ExtensibleObjectValidator} a validator that does nothing
	 * @protected
	 */
	protected abstract getNoOp(): S;

	/**
	 * Creates a new AbstractObjectValidator.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {object} actual the actual value
	 * @param {string} name the name of the value
	 * @throws {TypeError} if <code>configuration</code> or <code>name</code> are null or undefined
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	protected constructor(configuration: Configuration, actual: unknown, name: string)
	{
		Objects.assertThatInstanceOf(configuration, "configuration", Configuration);
		Objects.verifyName(name, "name");
		this.config = configuration;
		this.actual = actual;
		this.name = name;
	}

	isEqualTo(expected: unknown, name?: string): S
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
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
			Objects.requireThatStringNotEmpty(name, "name");
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
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		if (!Objects.isPrimitive(this.actual))
		{
			const typeOfActual = Objects.getTypeOf(this.actual);
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be a primitive").
				addContext("Actual", this.actual).
				addContext("Type", typeOfActual);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	/**
	 * Ensures that the type of the actual value has the specified name.
	 *
	 * <ul>
	 * <li>If the actual value is undefined, the name is "undefined".</li>
	 * <li>If the actual value is null, the name is "null".</li>
	 * <li>If the actual value is a primitive boolean, the name is "boolean".</li>
	 * <li>If the actual value is a primitive number, the name is "number".</li>
	 * <li>If the actual value is a primitive bigint, the name is "bigint".</li>
	 * <li>If the actual value is a primitive string, the name is "string".</li>
	 * <li>If the actual value is a primitive symbol, the name is "symbol".</li>
	 * <li>If the actual value is an array, the name is "Array".</li>
	 * <li>If the actual value is a named function or a class constructor, the name is "Function".</li>
	 * <li>If the actual value is an anonymous function, the name is "AnonymousFunction".</li>
	 * <li>If the actual value is an arrow function, the name is "ArrowFunction".</li>
	 * <li>If the actual value is a class instance, returns the class name.</li>
	 * </ul>
	 *
	 * @param {string} type the name of the type to compare to
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {RangeError} if the actual value does not have the specified <code>type</code>
	 */
	isTypeOf(type: string): S
	{
		Objects.requireThatStringNotEmpty(type, "type");
		const typeOfActual = Objects.getTypeOf(this.actual);
		if (typeOfActual !== type)
		{
			let message;
			switch (type)
			{
				case "undefined":
				case "null":
				{
					message = type + ".";
					break;
				}
				case "AnonymousFunction":
				{
					message = "an anonymous function.";
					break;
				}
				case "ArrowFunction":
				{
					message = "an arrow function.";
					break;
				}
				case "Array":
				{
					message = "an Array.";
					break;
				}
				default:
				{
					message = "a " + type + ".";
					break;
				}
			}
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be " + message).
				addContext("Actual", typeOfActual);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	/**
	 * Ensures that the actual value is an object that is an instance of the specified type.
	 *
	 * @param {Function} type the type to compare to
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError}  if <code>type</code> is undefined, null, anonymous function or an arrow function
	 * @throws {RangeError} if the actual value is not an instance of <code>type</code>
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isInstanceOf(type: Function): S
	{
		if (!(this.actual instanceof type))
		{
			const typeOfType = Objects.getTypeOf(type);
			let failure;
			switch (typeOfType)
			{
				case "undefined":
				case "null":
				case "AnonymousFunction":
				case "ArrowFunction":
				case "boolean":
				case "number":
				case "bigint":
				case "string":
				case "Array":
				{
					failure = new ValidationFailure(this.config, TypeError, "type must be a class.").
						addContext("Actual", typeOfType);
					break;
				}
				default:
				{
					failure = new ValidationFailure(this.config, RangeError,
						this.name + " must be an instance of " + typeOfType).
						addContext("Actual", Objects.getTypeOf(this.actual));
					break;
				}
			}
			this.failures.push(failure);
		}
		return this.getThis();
	}

	/**
	 * Ensures that the actual value is null.
	 *
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {RangeError} if the actual value is not null
	 */
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

	/**
	 * Ensures that the actual value is not null.
	 *
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {RangeError} if the actual value is null
	 */
	isNotNull(): S
	{
		if (this.actual === null)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " may not be null");
			this.failures.push(failure);
		}
		return this.getThis();
	}

	/**
	 * Ensures that the actual value is defined.
	 *
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {RangeError} if the actual value is undefined
	 */
	isDefined(): S
	{
		if (typeof (this.actual) === "undefined")
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be defined");
			this.failures.push(failure);
		}
		return this.getThis();
	}

	/**
	 * Ensures that the actual value is undefined.
	 *
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {RangeError} if the actual value is not undefined
	 */
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

	/**
	 * Ensures that value is not undefined or null.
	 *
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if the value is undefined or null
	 */
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

	/**
	 * Ensures that value is not undefined or null.
	 *
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if the value is not undefined or null
	 */
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

	/**
	 * Returns the actual value. The return value is <code>undefined</code> if
	 * {@link module:DefaultRequirements~assertThat assertThat()} was invoked and assertions are disabled
	 * (in which case the value is discarded) is <code>false</code>.
	 *
	 * @return {object} the actual value
	 */
	getActual(): unknown
	{
		return this.actual;
	}

	/**
	 * @return {StringValidator} a validator for the object's string representation
	 */
	asString(): StringValidator
	{
		let newName;
		if (typeof (this.actual) === "string")
			newName = this.name;
		else
			newName = this.name + ".asString()";
		return new StringValidatorImpl(this.config, this.config.convertToString(this.actual), newName);
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link StringValidator} for the string
	 *   representation of the actual value
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asStringConsumer(consumer: (actual: unknown) => StringValidator): S
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asString());
		return this.getThis();
	}

	/**
	 * @return {ArrayValidator} a validator for the <code>Array</code>
	 */
	asArray(): ArrayValidator
	{
		const typeOfActual = Objects.getTypeOf(this.actual);
		switch (typeOfActual)
		{
			case "Array":
				return new ArrayValidatorImpl(this.config, this.actual as unknown[], this.name, Pluralizer.ELEMENT);
			default:
			{
				const failure = new ValidationFailure(this.config, TypeError,
					this.name + " must be an Array.").
					addContext("Actual", this.actual).
					addContext("Type", typeOfActual);
				this.failures.push(failure);
				return new ArrayValidatorNoOp(this.failures);
			}
		}
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link ArrayValidator} for the actual value
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asArrayConsumer(consumer: (input: ArrayValidator) => void): S
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asArray());
		return this.getThis();
	}

	/**
	 * @return {BooleanValidator} a validator for the <code>boolean</code>
	 */
	asBoolean(): BooleanValidator
	{
		try
		{
			const actualBoolean = Boolean(this.actual);
			return new BooleanValidatorImpl(this.config, actualBoolean.valueOf(), this.name);
		}
		catch (e)
		{
			const failure = new ValidationFailure(this.config, TypeError,
				this.name + " must be convertible to a boolean.").
				addContext("Actual", this.actual).
				addContext("Type", Objects.getTypeOf(this.actual));
			this.failures.push(failure);
			return new BooleanValidatorNoOp(this.failures);
		}
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link BooleanValidator} for the actual value
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asBooleanConsumer(consumer: (input: BooleanValidator) => void): S
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asBoolean());
		return this.getThis();
	}

	/**
	 * @return {NumberValidator} a validator for the <code>number</code>
	 */
	asNumber(): NumberValidator
	{
		const typeOfActual = Objects.getTypeOf(this.actual);
		switch (typeOfActual)
		{
			case "number":
			{
				// https://stackoverflow.com/a/23440948
				return new NumberValidatorImpl(this.config, Number(this.actual), this.name);
			}
			default:
			{
				const failure = new ValidationFailure(this.config, TypeError,
					this.name + " must be a number.").
					addContext("Actual", this.actual).
					addContext("Type", typeOfActual);
				this.failures.push(failure);
				return new NumberValidatorNoOp(this.failures);
			}
		}
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberValidator} for the actual value
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asNumberConsumer(consumer: (input: NumberValidator) => void): S
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asNumber());
		return this.getThis();
	}

	/**
	 * @return {SetValidator} a validator for the <code>Set</code>
	 */
	asSet(): SetValidator
	{
		const typeOfActual = Objects.getTypeOf(this.actual);
		let actualSet;
		switch (typeOfActual)
		{
			case "Set":
			{
				actualSet = this.actual as Set<unknown>;
				break;
			}
			case "Array":
			{
				actualSet = new Set<unknown>(this.actual as unknown[]);
				break;
			}
			default:
			{
				const failure = new ValidationFailure(this.config, TypeError, this.name + " must be a Set.").
					addContext("Actual", this.config.convertToString(this.actual)).
					addContext("Type", typeOfActual);
				this.failures.push(failure);
				return new SetValidatorNoOp(this.failures);
			}
		}
		return new SetValidatorImpl(this.config, actualSet, this.name);
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link SetValidator} for the actual value
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asSetConsumer(consumer: (actual: SetValidator) => void): S
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asSet());
		return this.getThis();
	}

	/**
	 * @return {MapValidator} a validator for the <code>Map</code>
	 */
	asMap(): MapValidator
	{
		const typeOfActual = Objects.getTypeOf(this.actual);
		switch (typeOfActual)
		{
			case "Map":
				return new MapValidatorImpl(this.config, this.actual, this.name);
			default:
			{
				const failure = new ValidationFailure(this.config, TypeError,
					this.name + " must be a Map.").addContext("Actual", this.actual).
					addContext("Type", typeOfActual);
				this.failures.push(failure);
				return new MapValidatorNoOp(this.failures);
			}
		}
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link MapValidator} for the actual value
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set; if the actual value is not a <code>Map</code>
	 */
	asMapConsumer(consumer: (input: MapValidator) => void): S
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asMap());
		return this.getThis();
	}

	/**
	 * @param {string} value a String
	 * @return {boolean} true if the String is a valid IPv4 address; false otherwise
	 * @private
	 */
	private static isIpV4Impl(value: string): boolean
	{
		// See https://devblogs.microsoft.com/oldnewthing/20060522-08/?p=31113
		const match = (/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/).exec(value);
		return match !== null && Number(match[1]) <= 255 && Number(match[2]) <= 255 &&
			Number(match[3]) <= 255 && Number(match[4]) <= 255;
	}

	/**
	 * @param {string} value a string
	 * @return {boolean} true if the String is a valid IPv6 address; false otherwise
	 * @private
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
	 * @param {string} value a String
	 * @return {boolean} true if the String is a valid hostname; false otherwise
	 * @private
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

	/**
	 * @return {InetAddressValidator} a validator for the value's Internet address
	 *   representation
	 */
	asInetAddress(): InetAddressValidator
	{
		const typeOfActual = Objects.getTypeOf(this.actual);
		switch (typeOfActual)
		{
			case "undefined":
			case "null":
				break;
			case "string":
			{
				const actualString = this.actual as string;
				if (AbstractObjectValidator.isIpV4Impl(actualString))
					return new InetAddressValidatorImpl(this.config, actualString, this.name, true, false, false);
				if (AbstractObjectValidator.isIpV6Impl(actualString))
					return new InetAddressValidatorImpl(this.config, actualString, this.name, false, true, false);
				if (AbstractObjectValidator.isHostnameImpl(actualString))
					return new InetAddressValidatorImpl(this.config, actualString, this.name, false, false, true);
				break;
			}
		}
		const failure = new ValidationFailure(this.config, RangeError,
			this.name + " must contain a valid IP address or hostname.").
			addContext("Actual", this.actual).
			addContext("Type", typeOfActual);
		this.failures.push(failure);
		return new InetAddressValidatorNoOp(this.failures);
	}

	/**
	 * @param {Function} consumer a function that accepts an {@link InetAddressValidator} for the value's
	 *   Internet address representation
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 * @throws {RangeError} if the actual value does not contain a valid Internet address format
	 */
	asInetAddressConsumer(consumer: (actual: InetAddressValidator) => void): S
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asInetAddress());
		return this.getThis();
	}

	/**
	 * @return {ClassValidator} a validator for the object's class representation
	 */
	asClass(): ClassValidator
	{
		if (typeof (this.actual) === "function")
			return new ClassValidatorImpl(this.config, this.actual, this.name);
		const typeOfActual = Objects.getTypeOf(this.actual);
		const failure = new ValidationFailure(this.config, TypeError,
			this.name + " must contain a class.").
			addContext("Actual", this.actual).
			addContext("Type", typeOfActual);
		this.failures.push(failure);
		return new ClassValidatorNoOp(this.failures);
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link ClassValidator} for the class representation
	 *   of the actual value
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asClassConsumer(consumer: (input: ClassValidator) => void): S
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asClass());
		return this.getThis();
	}

	/**
	 * Returns the list of failed validations. Modifying the returned list results in undefined behavior.
	 *
	 * @return {ValidationFailure[]} the list of failed validations
	 */
	getFailures(): ValidationFailure[]
	{
		return this.failures;
	}

	/**
	 * Indicates that <code>actual</code> must be set; otherwise, an entry is added to <code>failures</code>.
	 *
	 * @return {boolean} false if the actual value is <code>null</code> or <code>undefined</code>
	 * @protected
	 */
	protected requireThatActualIsSet(): boolean
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
	 * @param {object} expected the expected value
	 * @param {boolean} expectedInMessage true if the expected value is already mentioned in the failure message
	 * @return {ContextLine[]} the list of name-value pairs to append to the exception message
	 * @private
	 */
	protected getContext(expected: unknown, expectedInMessage: boolean): ContextLine[]
	{
		const contextGenerator = new ContextGenerator(this.config);
		return contextGenerator.getContext("Actual", this.actual, "Expected", expected,
			expectedInMessage);
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {AbstractObjectValidator as default};