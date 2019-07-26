import ObjectValidator from "./internal/circular_dependency/ObjectValidatorBase.js";
import SizeValidator from "./SizeValidator.js";
import Pluralizer from "./Pluralizer.js";
import ValidationFailure from "./ValidationFailure.js";
import Objects from "./internal/Objects.js";
import StringValidatorNoOp from "./internal/StringValidatorNoOp.js";

/**
 * Validates the requirements of a <code>string</code>.
 * <p>
 * All methods (except for {@link #asString} and those found in {@link ObjectValidator}) imply
 * {@link #isNotNull()}.
 */
class StringValidator extends ObjectValidator
{
	/**
	 * Ensures that the actual value starts with a value.
	 *
	 * @param {string} prefix the value that the string must start with
	 * @return {StringValidator|StringValidatorNoOp} the updated validator
	 */
	startsWith(prefix)
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new StringValidatorNoOp(this.failures);
		}
		if (!this.actual.startsWith(prefix))
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must start with \"" +
				this.config.convertToString(prefix) + "\".").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value does not start with a value.
	 *
	 * @param {string} prefix the value that the string may not start with
	 * @return {StringValidator|StringValidatorNoOp} the updated validator
	 */
	doesNotStartWith(prefix)
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new StringValidatorNoOp(this.failures);
		}
		if (this.actual.startsWith(prefix))
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " may not start with \"" +
				this.config.convertToString(prefix) + "\".").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value contains a value.
	 *
	 * @param {string} expected the value that the string must contain
	 * @return {StringValidator|StringValidatorNoOp} the updated validator
	 */
	contains(expected)
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new StringValidatorNoOp(this.failures);
		}
		if (!this.actual.includes(expected))
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must contain \"" +
				this.config.convertToString(expected) + "\".").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value does not contain a value.
	 *
	 * @param {string} value the value that the string may not contain
	 * @return {StringValidator|StringValidatorNoOp} the updated validator
	 */
	doesNotContain(value)
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new StringValidatorNoOp(this.failures);
		}
		if (this.actual.includes(value))
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " may not contain \"" +
				this.config.convertToString(value) + "\".").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value ends with a value.
	 *
	 * @param {string} suffix the value that the string must end with
	 * @return {StringValidator|StringValidatorNoOp} the updated validator
	 */
	endsWith(suffix)
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new StringValidatorNoOp(this.failures);
		}
		if (!this.actual.endsWith(suffix))
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must end with \"" +
				this.config.convertToString(suffix) + "\".").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value does not end with a value.
	 *
	 * @param {string} suffix the value that the string may not end with
	 * @return {StringValidator|StringValidatorNoOp} the updated validator
	 */
	doesNotEndWith(suffix)
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new StringValidatorNoOp(this.failures);
		}
		if (this.actual.endsWith(suffix))
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " may not end with \"" +
				this.config.convertToString(suffix) + "\".").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the value is an empty string.
	 *
	 * @return {StringValidator|StringValidatorNoOp} the updated validator
	 */
	isEmpty()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new StringValidatorNoOp(this.failures);
		}
		if (this.actual.length !== 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be empty.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the value is not an empty string.
	 *
	 * @return {StringValidator|StringValidatorNoOp} the updated validator
	 */
	isNotEmpty()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new StringValidatorNoOp(this.failures);
		}
		if (this.actual.length <= 0)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " may not be empty");
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Trims whitespace at the beginning and end of the actual value.
	 *
	 * @return {StringValidator|StringValidatorNoOp} the updated validator
	 */
	trim()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new StringValidatorNoOp(this.failures);
		}
		this.actual = this.actual.trim();
		return this;
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link StringValidator} for the trimmed
	 *   representation of the string
	 * @return {StringValidator|StringValidatorNoOp} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	trimConsumer(consumer)
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.trim());
		return this;
	}

	/**
	 * @return {SizeValidator|StringValidatorNoOp} a validator for the length of the string
	 */
	length()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError, failureMessage);
			this.failures.push(failure);
			return new StringValidatorNoOp(this.failures);
		}
		return new SizeValidator(this.config, this.actual, this.name, this.actual.length, this.name + ".length",
			Pluralizer.CHARACTER);
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link SizeValidator} for the length of the
	 *   string
	 * @return {StringValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	lengthConsumer(consumer)
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.length());
		return this;
	}

	/**
	 * @return {StringValidator} the updated validator
	 */
	asString()
	{
		if (typeof (this.actual) === "undefined")
			return new StringValidator(this.config, "undefined", this.name);
		if (this.actual === null)
			return new StringValidator(this.config, "null", this.name);
		return this;
	}

	/**
	 * @param {Function} consumer a function that accepts <code>this</code>
	 * @return {StringValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asStringConsumer(consumer)
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this);
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {StringValidator as default};