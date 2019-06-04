import ObjectVerifier from "./ObjectVerifier.js";
import ContainerSizeVerifier from "./ContainerSizeVerifier.js";
import ExceptionBuilder from "./internal/ExceptionBuilder.js";
import Pluralizer from "./Pluralizer.js";

/**
 * Verifies a <code>string</code>.
 */
class StringVerifier extends ObjectVerifier
{
	/**
	 * Ensures that the actual value starts with a value.
	 *
	 * @param {string} prefix the value that the string must start with
	 * @return {StringVerifier} this
	 * @throws {RangeError} if the actual value does not start with <code>prefix</code>
	 */
	startsWith(prefix)
	{
		if (this.actual.startsWith(prefix))
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must start with \"" +
			this.config.convertToString(prefix) + "\".").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value does not start with a value.
	 *
	 * @param {string} prefix the value that the string may not start with
	 * @return {StringVerifier} this
	 * @throws {RangeError} if the actual value does not start with <code>prefix</code>
	 */
	doesNotStartWith(prefix)
	{
		if (!this.actual.startsWith(prefix))
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not start with \"" +
			this.config.convertToString(prefix) + "\".").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value contains a value.
	 *
	 * @param {string} expected the value that the string must contain
	 * @return {StringVerifier} this
	 * @throws {RangeError} if the actual value does not contain <code>expected</code>
	 */
	includes(expected)
	{
		if (this.actual.includes(expected))
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must contain \"" +
			this.config.convertToString(expected) + "\".").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value does not contain a value.
	 *
	 * @param {string} value the value that the string may not contain
	 * @return {StringVerifier} this
	 * @throws {RangeError} if the actual value does not contain <code>value</code>
	 */
	doesNotContain(value)
	{
		if (!this.actual.includes(value))
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not contain \"" +
			this.config.convertToString(value) + "\".").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value ends with a value.
	 *
	 * @param {string} suffix the value that the string must end with
	 * @return {StringVerifier} this
	 * @throws {RangeError} if the actual value does not end with <code>suffix</code>
	 */
	endsWith(suffix)
	{
		if (this.actual.endsWith(suffix))
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must end with \"" +
			this.config.convertToString(suffix) + "\".").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value does not end with a value.
	 *
	 * @param {string} suffix the value that the string may not end with
	 * @return {StringVerifier} this
	 * @throws {RangeError} if the actual value does not start with <code>suffix</code>
	 */
	doesNotEndWith(suffix)
	{
		if (!this.actual.endsWith(suffix))
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not end with \"" +
			this.config.convertToString(suffix) + "\".").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the value is an empty string.
	 *
	 * @return {StringVerifier} this
	 * @throws {RangeError} if the value is not an empty string
	 */
	isEmpty()
	{
		if (this.actual.length === 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be empty.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the value is not an empty string.
	 *
	 * @return {StringVerifier} this
	 * @throws {RangeError} if the value is an empty string
	 */
	isNotEmpty()
	{
		if (this.actual.length > 0)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not be empty").
			build();
	}

	/**
	 * Trims whitespace at the beginning and end of the actual value.
	 *
	 * @return {StringVerifier} a verifier for the trimmed representation of the actual value
	 */
	trim()
	{
		const trimmed = this.actual.trim();
		if (trimmed === this.actual)
			return this;
		return new StringVerifier(this.config, trimmed, this.name);
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link StringVerifier} for the trimmed representation of the
	 * string
	 * @return {StringVerifier} this
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	trimConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this.trim());
		return this;
	}

	/**
	 * @return {ContainerSizeVerifier} a verifier for the length of the string
	 */
	length()
	{
		return new ContainerSizeVerifier(this.config, this.actual, this.actual.length, this.name, this.name + ".length",
			Pluralizer.CHARACTER);
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link ContainerSizeVerifier} for the length of the string
	 * @return {StringVerifier} this
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	lengthConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this.length());
		return this;
	}

	/**
	 * @return {StringVerifier} this
	 */
	asString()
	{
		return this;
	}

	/**
	 * @param {Function} consumer a function that accepts <code>this</code>
	 * @return {StringVerifier} this
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asStringConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this);
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {StringVerifier as default};