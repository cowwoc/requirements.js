import {
	Configuration,
	Objects,
	ObjectValidator,
	Pluralizer,
	SizeValidator,
	ValidationFailure
} from "./internal/internal";

/**
 * Validates the requirements of a <code>string</code>.
 * <p>
 * All methods (except for {@link #asString} and those found in {@link ObjectValidator}) imply
 * {@link #isNotNull()}.
 */
class StringValidator extends ObjectValidator
{
	private actualString: string;

	constructor(configuration: Configuration, actual: unknown, name: string)
	{
		super(configuration, actual, name);
		this.actualString = actual as string;
	}

	/**
	 * Ensures that the actual value starts with a value.
	 *
	 * @param {string} prefix the value that the string must start with
	 * @return {StringValidator} the updated validator
	 */
	startsWith(prefix: string): this
	{
		if (!this.actualString.startsWith(prefix))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must start with \"" + this.config.convertToString(prefix) + "\".").
				addContext("Actual", this.actualString);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value does not start with a value.
	 *
	 * @param {string} prefix the value that the string may not start with
	 * @return {StringValidator} the updated validator
	 */
	doesNotStartWith(prefix: string): this
	{
		if (this.actualString.startsWith(prefix))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not start with \"" + this.config.convertToString(prefix) + "\".").
				addContext("Actual", this.actualString);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value contains a value.
	 *
	 * @param {string} expected the value that the string must contain
	 * @return {StringValidator} the updated validator
	 */
	contains(expected: string): this
	{
		if (!this.actualString.includes(expected))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must contain \"" + this.config.convertToString(expected) + "\".").
				addContext("Actual", this.actualString);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value does not contain a value.
	 *
	 * @param {string} value the value that the string may not contain
	 * @return {StringValidator} the updated validator
	 */
	doesNotContain(value: string): this
	{
		if (this.actualString.includes(value))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not contain \"" + this.config.convertToString(value) + "\".").
				addContext("Actual", this.actualString);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value ends with a value.
	 *
	 * @param {string} suffix the value that the string must end with
	 * @return {StringValidator} the updated validator
	 */
	endsWith(suffix: string): this
	{
		if (!this.actualString.endsWith(suffix))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must end with \"" + this.config.convertToString(suffix) + "\".").
				addContext("Actual", this.actualString);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value does not end with a value.
	 *
	 * @param {string} suffix the value that the string may not end with
	 * @return {StringValidator} the updated validator
	 */
	doesNotEndWith(suffix: string): this
	{
		if (this.actualString.endsWith(suffix))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not end with \"" + this.config.convertToString(suffix) + "\".").
				addContext("Actual", this.actualString);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the value is an empty string.
	 *
	 * @return {StringValidator} the updated validator
	 */
	isEmpty(): this
	{
		if (this.actualString.length !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be empty.").
				addContext("Actual", this.actualString);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the value is not an empty string.
	 *
	 * @return {StringValidator} the updated validator
	 */
	isNotEmpty(): this
	{
		if (this.actualString.length <= 0)
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " may not be empty");
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Trims whitespace at the beginning and end of the actual value.
	 *
	 * @return {StringValidator} the updated validator
	 */
	trim(): this
	{
		this.actualString = this.actualString.trim();
		return this;
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link StringValidator} for the trimmed
	 *   representation of the string
	 * @return {StringValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	trimConsumer(consumer: (actual: StringValidator) => void): this
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.trim());
		return this;
	}

	/**
	 * @return {SizeValidator} a validator for the length of the string
	 */
	length(): SizeValidator
	{
		return new SizeValidator(this.config, this.actualString, this.name, this.actualString.length,
			this.name + ".length", Pluralizer.CHARACTER);
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link SizeValidator} for the length of the
	 *   string
	 * @return {StringValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	lengthConsumer(consumer: (actual: SizeValidator) => void): this
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.length());
		return this;
	}

	/**
	 * @return {StringValidator} the updated validator
	 */
	asString(): StringValidator
	{
		if (typeof (this.actualString) === "undefined")
			return new StringValidator(this.config, "undefined", this.name);
		if (this.actualString === null)
			return new StringValidator(this.config, "null", this.name);
		return this;
	}

	/**
	 * @param {Function} consumer a function that accepts <code>this</code>
	 * @return {StringValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asStringConsumer(consumer: (actual: StringValidator) => void): this
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
export {StringValidator as default};