import
{
	AbstractObjectValidator,
	Configuration,
	NumberValidator,
	NumberValidatorNoOp,
	Objects,
	Pluralizer,
	SizeValidatorImpl,
	StringValidator,
	StringValidatorNoOp,
	ValidationFailure
} from "./internal.mjs";

/**
 * Default implementation of <code>StringValidator</code>.
 */
class StringValidatorImpl extends AbstractObjectValidator<StringValidator>
	implements StringValidator
{
	private actualString: string;

	/**
	 * Creates a new StringValidatorImpl.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {object} actual the actual value
	 * @param {string} name the name of the value
	 * @throws {TypeError} if <code>configuration</code> or <code>name</code> are null or undefined
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	constructor(configuration: Configuration, actual: unknown, name: string)
	{
		super(configuration, actual, name);
		this.actualString = actual as string;
	}

	protected getThis(): StringValidator
	{
		return this;
	}

	protected getNoOp(): StringValidator
	{
		return new StringValidatorNoOp(this.failures);
	}

	startsWith(prefix: string): StringValidator
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
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
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
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
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
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
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
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
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
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
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
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
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
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
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
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
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		this.actualString = this.actualString.trim();
		return this;
	}

	trimConsumer(consumer: (actual: StringValidator) => void): StringValidator
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.trim());
		return this;
	}

	isTrimmed(): StringValidator
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		const trimmed = this.actualString.trim();
		if (trimmed !== this.actualString)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not contain leading or trailing whitespace").
				addContext("Actual", this.actualString);
			this.failures.push(failure);
			return this.getNoOp();
		}
		return this;
	}

	length(): NumberValidator
	{
		if (!this.requireThatActualIsSet())
			return new NumberValidatorNoOp(this.failures);
		return new SizeValidatorImpl(this.config, this.actualString, this.name, this.actualString.length,
			this.name + ".length", Pluralizer.CHARACTER);
	}

	lengthConsumer(consumer: (actual: NumberValidator) => void): StringValidator
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.length());
		return this;
	}

	asString(): StringValidator
	{
		if (typeof (this.actualString) === "undefined")
			return new StringValidatorImpl(this.config, "undefined", this.name);
		if (this.actualString === null)
			return new StringValidatorImpl(this.config, "null", this.name);
		return this;
	}

	asStringConsumer(consumer: (actual: StringValidator) => void): StringValidator
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this);
		return this;
	}

	getActual(): string
	{
		return this.actualString;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {StringValidatorImpl as default};