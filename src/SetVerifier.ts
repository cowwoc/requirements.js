import {
	ArrayVerifier,
	NumberValidator,
	NumberVerifier,
	Objects,
	ObjectVerifier,
	SetValidator,
	SetValidatorNoOp
} from "./internal/internal";

/**
 * Verifies the requirements of a <code>Set</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class SetVerifier extends ObjectVerifier<SetValidator | SetValidatorNoOp>
{
	/**
	 * Ensures that value does not contain any elements.
	 *
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if the value contains at least one element
	 */
	isEmpty(): this
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
	isNotEmpty(): this
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
	contains(expected: unknown, name?: string): this
	{
		this.validator.contains(expected, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value contains exactly the same elements as the expected value; nothing less,
	 * nothing more.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an <code>Array</code>
	 *   or <code>Set</code>
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value is missing any elements in
	 *   <code>expected</code>; if the actual value contains elements not found in <code>expected</code>
	 */
	containsExactly(expected: unknown[] | Set<unknown>, name?: string): this
	{
		this.validator.containsExactly(expected, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value contains any of the elements in the expected value.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an <code>Array</code>
	 *   or <code>Set</code>
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value is missing any elements in
	 *   <code>expected</code>; if the actual value contains elements not found in <code>expected</code>
	 */
	containsAny(expected: unknown[] | Set<unknown>, name?: string): this
	{
		this.validator.containsAny(expected, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value contains all of the elements in the expected value.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an <code>Array</code>
	 *   or <code>Set</code>
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value does not contain all of
	 *   <code>expected</code>
	 */
	containsAll(expected: unknown[] | Set<unknown>, name?: string): this
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
	doesNotContain(entry: unknown, name?: string): this
	{
		this.validator.doesNotContain(entry, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value does not contain any of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an <code>Array</code>
	 *   or [@code Set}
	 * @throws {RangeError} if <code>name</code> is empty; if the array contains any of <code>elements</code>
	 */
	doesNotContainAny(elements: unknown[] | Set<unknown>, name?: string): this
	{
		this.validator.doesNotContainAny(elements, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the array does not contain all of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an <code>Array</code>
	 *   or [@code Set}
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value contains all of
	 *   <code>elements</code>
	 */
	doesNotContainAll(elements: unknown[] | Set<unknown>, name?: string): this
	{
		this.validator.doesNotContainAll(elements, name);
		return this.validationResult();
	}

	/**
	 * @return {NumberVerifier} a verifier for the Set's size
	 */
	size(): NumberVerifier<NumberValidator>
	{
		const newValidator = this.validator.size();
		return this.validationResult(() => new NumberVerifier(newValidator)) as
			NumberVerifier<NumberValidator>;
	}

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberVerifier} for the Set's size
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	sizeConsumer(consumer: (actual: NumberVerifier<NumberValidator>) => void): this
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.size());
		return this;
	}

	/**
	 * @return {ArrayVerifier} a verifier for the Set's elements
	 */
	asArray(): ArrayVerifier
	{
		const newValidator = this.validator.asArray();
		return this.validationResult(() => new ArrayVerifier(newValidator)) as ArrayVerifier;
	}

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayVerifier} for the Set's elements
	 * @return {SetVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asArrayConsumer(consumer: (actual: ArrayVerifier) => void): this
	{
		Objects.requireThatIsSet(consumer, "consumer");
		consumer(this.asArray());
		return this;
	}

	getActual(): Set<unknown>
	{
		return super.getActual() as Set<unknown>;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SetVerifier as default};