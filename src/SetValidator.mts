import type
{
	ArrayValidator,
	ExtensibleObjectValidator,
	NumberValidator
} from "./internal/internal.mjs";

/**
 * Validates the requirements of a <code>Set</code>.
 *
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 *
 * Verifiers and Validators contain corresponding methods. Some exceptions are thrown by both methods.
 * The remaining exceptions that are thrown by the verifier are wrapped as validation failures and are
 * returned by {@link #getFailures}.
 */
interface SetValidator extends ExtensibleObjectValidator<SetValidator>
{
	/**
	 * Ensures that value does not contain any elements.
	 *
	 * @return {SetValidator} the updated validator
	 */
	isEmpty(): SetValidator;

	/**
	 * Ensures that value contains at least one element.
	 *
	 * @return {SetValidator} the updated validator
	 */
	isNotEmpty(): SetValidator;

	/**
	 * Ensures that the actual value contains an entry.
	 *
	 * @param {object} expected the expected value
	 * @param {string} [name] the name of the expected value
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	contains(expected: unknown, name?: string): SetValidator;

	/**
	 * Ensures that the actual value contains exactly the same elements as the expected value; nothing less,
	 * nothing more.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null. If <code>expected</code> is not an <code>Array</code>
	 * or <code>Set</code>.
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	containsExactly(expected: unknown[] | Set<unknown>, name?: string): SetValidator;

	/**
	 * Ensures that the actual value contains any of the elements in the expected value.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null. If <code>expected</code> is not an <code>Array</code>
	 * or <code>Set</code>.
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	containsAny(expected: unknown[] | Set<unknown>, name?: string): SetValidator;

	/**
	 * Ensures that the actual value contains all of the elements in the expected value.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null. If <code>expected</code> is not an <code>Array</code>
	 * or <code>Set</code>.
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	containsAll(expected: unknown[] | Set<unknown>, name?: string): SetValidator;

	/**
	 * Ensures that the actual value does not contain an entry.
	 *
	 * @param {object} entry an entry
	 * @param {string} [name] the name of the entry
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	doesNotContain(entry: unknown, name?: string): SetValidator;

	/**
	 * Ensures that the actual value does not contain any of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null. If <code>elements</code> is not an <code>Array</code>
	 * or [@code Set}.
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	doesNotContainAny(elements: unknown[] | Set<unknown>, name?: string): SetValidator;

	/**
	 * Ensures that the array does not contain all of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null. If <code>elements</code> is not an <code>Array</code>
	 * or [@code Set}.
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	doesNotContainAll(elements: unknown[] | Set<unknown>, name?: string): SetValidator;

	/**
	 * @return {NumberValidator} a validator for the Set's size
	 */
	size(): NumberValidator;

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberValidator} for the Set's size
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	sizeConsumer(consumer: (actual: NumberValidator) => void): SetValidator;

	/**
	 * @return {ArrayValidator} a validator for the Set's elements
	 */
	asArray(): ArrayValidator;

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayValidator} for the Set's elements
	 * @return {SetValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asArrayConsumer(consumer: (actual: ArrayValidator) => void): SetValidator;

	getActual(): Set<unknown> | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SetValidator as default};