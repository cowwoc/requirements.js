import type {
	Configuration,
	NumberValidator,
	StringValidator
} from "./internal.mjs";
import {
	AbstractObjectValidator,
	Objects,
	Pluralizer,
	SizeValidatorImpl,
	ValidationFailure
} from "./internal.mjs";

/**
 * Default implementation of <code>StringValidator</code>.
 */
class StringValidatorImpl extends AbstractObjectValidator<StringValidator, string>
	implements StringValidator
{
	private actualString: string;

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
		this.actualString = actual as string;
	}

	protected getThis(): StringValidator
	{
		return this;
	}

	startsWith(prefix: string): StringValidator
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this.getThis();
		if (!this.actualString.startsWith(prefix))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must start with \"" + this.config.convertToString(prefix) + "\".").
				addContext("Actual", this.actualString);
			this.failures.push(failure);
		}
		return this;
	}

	doesNotStartWith(prefix: string): StringValidator
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;
		if (this.actualString.startsWith(prefix))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not start with \"" + this.config.convertToString(prefix) + "\".").
				addContext("Actual", this.actualString);
			this.failures.push(failure);
		}
		return this;
	}

	contains(expected: string): StringValidator
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;
		if (!this.actualString.includes(expected))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must contain \"" + this.config.convertToString(expected) + "\".").
				addContext("Actual", this.actualString);
			this.failures.push(failure);
		}
		return this;
	}

	doesNotContain(value: string): StringValidator
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;
		if (this.actualString.includes(value))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not contain \"" + this.config.convertToString(value) + "\".").
				addContext("Actual", this.actualString);
			this.failures.push(failure);
		}
		return this;
	}

	endsWith(suffix: string): StringValidator
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;
		if (!this.actualString.endsWith(suffix))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must end with \"" + this.config.convertToString(suffix) + "\".").
				addContext("Actual", this.actualString);
			this.failures.push(failure);
		}
		return this;
	}

	doesNotEndWith(suffix: string): StringValidator
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;
		if (this.actualString.endsWith(suffix))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not end with \"" + this.config.convertToString(suffix) + "\".").
				addContext("Actual", this.actualString);
			this.failures.push(failure);
		}
		return this;
	}

	isEmpty(): StringValidator
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;
		if (this.actualString.length !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be empty.").
				addContext("Actual", this.actualString);
			this.failures.push(failure);
		}
		return this;
	}

	isNotEmpty(): StringValidator
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;
		if (this.actualString.length <= 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be empty");
			this.failures.push(failure);
		}
		return this;
	}

	trim(): StringValidator
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;
		this.actualString = this.actualString.trim();
		return this;
	}

	trimConsumer(consumer: (actual: StringValidator) => void): StringValidator
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.trim());
		return this;
	}

	isTrimmed(): StringValidator
	{
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			return this;
		const trimmed = this.actualString.trim();
		if (trimmed !== this.actualString)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not contain leading or trailing whitespace").
				addContext("Actual", this.actualString);
			this.failures.push(failure);
		}
		return this;
	}

	length(): NumberValidator
	{
		let value: number | undefined;
		if (this.failures.length > 0 || !this.requireThatActualIsDefinedAndNotNull())
			value = undefined;
		else
			value = this.actualString.length;
		return new SizeValidatorImpl(this.config, this.actualString, this.name, value, this.name + ".length",
			Pluralizer.CHARACTER, this.failures);
	}

	lengthConsumer(consumer: (actual: NumberValidator) => void): StringValidator
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this.length());
		return this;
	}

	asString(): StringValidator
	{
		return this;
	}

	asStringConsumer(consumer: (actual: StringValidator) => void): StringValidator
	{
		Objects.requireThatValueIsDefinedAndNotNull(consumer, "consumer");
		if (this.failures.length === 0)
			consumer(this);
		return this;
	}

	getActual(): string
	{
		return this.actualString;
	}
}

export {StringValidatorImpl};