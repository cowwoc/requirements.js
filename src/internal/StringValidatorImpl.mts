import type {
	Configuration,
	NumberValidator,
	StringValidator,
	InetAddressValidator
} from "./internal.mjs";
import {
	AbstractObjectValidator,
	Objects,
	Pluralizer,
	SizeValidatorImpl,
	ValidationFailure,
	InetAddressValidatorImpl
} from "./internal.mjs";

/**
 * Default implementation of <code>StringValidator</code>.
 */
class StringValidatorImpl extends AbstractObjectValidator<StringValidator, string>
	implements StringValidator
{
	/**
	 * Creates a new StringValidatorImpl.
	 *
	 * @param configuration - the instance configuration
	 * @param actual - the actual value
	 * @param name - the name of the value
	 * @param failures - the list of validation failures
	 * @throws TypeError if <code>configuration</code> or <code>name</code> are null or undefined
	 * @throws RangeError if <code>name</code> is empty
	 */
	constructor(configuration: Configuration, actual: string | undefined, name: string, failures: ValidationFailure[])
	{
		super(configuration, actual, name, failures);
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

	isInetAddress(): InetAddressValidator
	{
		if (this.actual !== undefined)
		{
			const actualString = this.actual;
			if (StringValidatorImpl.isIpV4Impl(actualString))
			{
				return new InetAddressValidatorImpl(this.config, actualString, this.name, true, false, false,
					this.failures);
			}
			if (StringValidatorImpl.isIpV6Impl(actualString))
			{
				return new InetAddressValidatorImpl(this.config, actualString, this.name, false, true, false,
					this.failures);
			}
			if (StringValidatorImpl.isHostnameImpl(actualString))
			{
				return new InetAddressValidatorImpl(this.config, actualString, this.name, false, false, true,
					this.failures);
			}
		}
		const typeOfActual = Objects.getTypeInfo(this.actual);
		const failure = new ValidationFailure(this.config, RangeError,
			this.name + " must contain a valid IP address or hostname.").
			addContext("Actual", this.actual).
			addContext("Type", typeOfActual);
		this.failures.push(failure);
		return new InetAddressValidatorImpl(this.config, undefined, this.name, false, false, false, this.failures);
	}

	startsWith(prefix: string): StringValidator
	{
		if (this.actual === undefined || !this.actual.startsWith(prefix))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must start with \"" + this.config.convertToString(prefix) + "\".").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	doesNotStartWith(prefix: string): StringValidator
	{
		if (this.actual === undefined || this.actual.startsWith(prefix))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not start with \"" + this.config.convertToString(prefix) + "\".").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	contains(expected: string): StringValidator
	{
		if (this.actual === undefined || !this.actual.includes(expected))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must contain \"" + this.config.convertToString(expected) + "\".").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	doesNotContain(value: string): StringValidator
	{
		if (this.actual === undefined || this.actual.includes(value))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not contain \"" + this.config.convertToString(value) + "\".").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	endsWith(suffix: string): StringValidator
	{
		if (this.actual === undefined || !this.actual.endsWith(suffix))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must end with \"" + this.config.convertToString(suffix) + "\".").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	doesNotEndWith(suffix: string): StringValidator
	{
		if (this.actual === undefined || this.actual.endsWith(suffix))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not end with \"" + this.config.convertToString(suffix) + "\".").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	isEmpty(): StringValidator
	{
		if (this.actual === undefined || this.actual.length !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be empty.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	isNotEmpty(): StringValidator
	{
		if (this.actual === undefined || this.actual.length <= 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be empty");
			this.failures.push(failure);
		}
		return this;
	}

	isTrimmed(): StringValidator
	{
		if (this.actual === undefined || /^\s|\s$/.test(this.actual))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not contain leading or trailing whitespace").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	length(): NumberValidator
	{
		let value: number | undefined;
		if (this.actual === undefined)
			value = undefined;
		else
			value = this.actual.length;
		return new SizeValidatorImpl(this.config, this.actual, this.name, value, this.name + ".length",
			Pluralizer.CHARACTER, this.failures);
	}

	lengthConsumer(consumer: (actual: NumberValidator) => void): StringValidator
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.length());
		return this;
	}
}

export {StringValidatorImpl};