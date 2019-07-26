import ObjectVerifier from "./internal/circular_dependency/ObjectVerifierBase.js";
import ArrayVerifier from "./internal/circular_dependency/ArrayVerifierBase.js";
import NumberVerifier from "./NumberVerifier.js";
import Objects from "./internal/Objects.js";

/**
 * Verifies the requirements of a <code>Set</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class SetVerifier extends ObjectVerifier
{
	/**
	 * Ensures that value does not contain any elements.
	 *
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if the value contains at least one element
	 */
	isEmpty()
	{
		this.validator.isEmpty();
		return this.validationResult();
	}

	/**
	 * Ensures that value contains at least one element.
	 *
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if the value does not contain any elements
	 */
	isNotEmpty()
	{
		this.validator.isNotEmpty();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value contains an entry.
	 *
	 * @param {object} expected the expected value
	 * @param {string} [name] the name of the expected value
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty; if the Set does not contain <code>expected</code>
	 */
	contains(expected, name)
	{
		this.validator.contains(expected, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value contains exactly the same elements as the expected value; nothing less,
	 * nothing more.
	 *
	 * @param {Array|Set} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an <code>Array</code>
	 *   or <code>Set</code>
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value is missing any elements in
	 *   <code>expected</code>; if the actual value contains elements not found in <code>expected</code>
	 */
	containsExactly(expected, name)
	{
		this.validator.containsExactly(expected, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value contains any of the elements in the expected value.
	 *
	 * @param {Set} expected the Set of elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an <code>Array</code>
	 *   or <code>Set</code>
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value is missing any elements in
	 *   <code>expected</code>; if the actual value contains elements not found in <code>expected</code>
	 */
	containsAny(expected, name)
	{
		this.validator.containsAny(expected, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value contains all of the elements in the expected value.
	 *
	 * @param {Set} expected the Set of elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an <code>Array</code>
	 *   or <code>Set</code>
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value does not contain all of
	 *   <code>expected</code>
	 */
	containsAll(expected, name)
	{
		this.validator.containsAll(expected, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value does not contain an entry.
	 *
	 * @param {object} entry an entry
	 * @param {string} [name] the name of the entry
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value contains <code>entry</code>
	 */
	doesNotContain(entry, name)
	{
		this.validator.doesNotContain(entry, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value does not contain any of the specified elements.
	 *
	 * @param {Array|Set} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an <code>Array</code>
	 *   or [@code Set}
	 * @throws {RangeError} if <code>name</code> is empty; if the array contains any of <code>elements</code>
	 */
	doesNotContainAny(elements, name)
	{
		this.validator.doesNotContainAny(elements, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the array does not contain all of the specified elements.
	 *
	 * @param {Set} elements a Set of elements
	 * @param {string} [name] the name of the elements
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an <code>Array</code>
	 *   or [@code Set}
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value contains all of
	 *   <code>elements</code>
	 */
	doesNotContainAll(elements, name)
	{
		this.validator.doesNotContainAll(elements, name);
		return this.validationResult();
	}

	/**
	 * @return {NumberVerifier} a verifier for the Set's size
	 */
	size()
	{
		const newValidator = this.validator.size();
		return this.validationResult(() => new NumberVerifier(newValidator));
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberVerifier} for the Set's size
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	sizeConsumer(consumer)
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.size());
		return this;
	}

	/**
	 * @return {ArrayVerifier} a verifier for the Set's elements
	 */
	asArray()
	{
		const newValidator = this.validator.asArray();
		return this.validationResult(() => new ArrayVerifier(newValidator));
	}

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayVerifier} for the Set's elements
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asArrayConsumer(consumer)
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asArray());
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SetVerifier as default};