import ObjectVerifier from "./internal/circular_dependency/ObjectVerifierBase.js";
import SizeVerifier from "./SizeVerifier.js";
import Objects from "./internal/Objects.js";

/**
 * Verifies the requirements of a <code>string</code>.
 * <p>
 * All methods (except for {@link #asString} and those found in {@link ObjectValidator}) imply
 * {@link #isNotNull()}.
 */
class StringVerifier extends ObjectVerifier
{
	/**
	 * Ensures that the actual value starts with a value.
	 *
	 * @param {string} prefix the value that the string must start with
	 * @return {StringVerifier} the updated verifier
	 * @throws {RangeError} if the actual value does not start with <code>prefix</code>
	 */
	startsWith(prefix)
	{
		this.validator.startsWith(prefix);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value does not start with a value.
	 *
	 * @param {string} prefix the value that the string may not start with
	 * @return {StringVerifier} the updated verifier
	 * @throws {RangeError} if the actual value does not start with <code>prefix</code>
	 */
	doesNotStartWith(prefix)
	{
		this.validator.doesNotStartWith(prefix);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value contains a value.
	 *
	 * @param {string} expected the value that the string must contain
	 * @return {StringVerifier} the updated verifier
	 * @throws {RangeError} if the actual value does not contain <code>expected</code>
	 */
	contains(expected)
	{
		this.validator.contains(expected);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value does not contain a value.
	 *
	 * @param {string} value the value that the string may not contain
	 * @return {StringVerifier} the updated verifier
	 * @throws {RangeError} if the actual value does not contain <code>value</code>
	 */
	doesNotContain(value)
	{
		this.validator.doesNotContain(value);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value ends with a value.
	 *
	 * @param {string} suffix the value that the string must end with
	 * @return {StringVerifier} the updated verifier
	 * @throws {RangeError} if the actual value does not end with <code>suffix</code>
	 */
	endsWith(suffix)
	{
		this.validator.endsWith(suffix);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value does not end with a value.
	 *
	 * @param {string} suffix the value that the string may not end with
	 * @return {StringVerifier} the updated verifier
	 * @throws {RangeError} if the actual value does not start with <code>suffix</code>
	 */
	doesNotEndWith(suffix)
	{
		this.validator.doesNotEndWith(suffix);
		return this.validationResult();
	}

	/**
	 * Ensures that the value is an empty string.
	 *
	 * @return {StringVerifier} the updated verifier
	 * @throws {RangeError} if the value is not an empty string
	 */
	isEmpty()
	{
		this.validator.isEmpty();
		return this.validationResult();
	}

	/**
	 * Ensures that the value is not an empty string.
	 *
	 * @return {StringVerifier} the updated verifier
	 * @throws {RangeError} if the value is an empty string
	 */
	isNotEmpty()
	{
		this.validator.isNotEmpty();
		return this.validationResult();
	}

	/**
	 * Trims whitespace at the beginning and end of the actual value.
	 *
	 * @return {StringVerifier} a verifier for the trimmed representation of the actual value
	 */
	trim()
	{
		this.validator.trim();
		return this;
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link StringVerifier} for the trimmed
	 *   representation of the string
	 * @return {StringVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	trimConsumer(consumer)
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.trim());
		return this;
	}

	/**
	 * @return {SizeVerifier} a verifier for the length of the string
	 */
	length()
	{
		const newValidator = this.validator.length();
		return this.validationResult(() => new SizeVerifier(newValidator));
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link SizeVerifier} for the length of the
	 *   string
	 * @return {StringVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	lengthConsumer(consumer)
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.length());
		return this;
	}

	/**
	 * @return {StringVerifier} the updated verifier
	 */
	asString()
	{
		return this;
	}

	/**
	 * @param {Function} consumer a function that accepts <code>this</code>
	 * @return {StringVerifier} the updated verifier
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
export {StringVerifier as default};