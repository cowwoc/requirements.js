import type
{
	ArrayAsserter,
	NumberAsserter,
	ObjectAsserter
} from "./internal/internal.mjs";

/**
 * Verifies the requirements of a <code>Set</code>.
 *
 * All methods (except those found in {@link ObjectAsserter}) imply {@link #isNotNull()}.
 *
 * Asserters throw the same exceptions as Verifiers if and only if
 * {@link GlobalConfiguration#assertionsAreEnabled assertions are enabled}.
 */
interface SetAsserter extends ObjectAsserter
{
	/**
	 * Ensures that value does not contain any elements.
	 *
	 * @return {SetAsserter} the updated asserter
	 * @throws {TypeError} if the value contains at least one element
	 */
	isEmpty(): SetAsserter;

	/**
	 * Ensures that value contains at least one element.
	 *
	 * @return {SetAsserter} the updated asserter
	 * @throws {TypeError} if the value does not contain any elements
	 */
	isNotEmpty(): SetAsserter;

	/**
	 * Ensures that the actual value contains an entry.
	 *
	 * @param {object} expected the expected value
	 * @param {string} [name] the name of the expected value
	 * @return {SetAsserter} the updated asserter
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty. If the Set does not contain <code>expected</code>.
	 */
	contains(expected: unknown, name?: string): SetAsserter;

	/**
	 * Ensures that the actual value contains exactly the same elements as the expected value; nothing less,
	 * nothing more.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetAsserter} the updated asserter
	 * @throws {TypeError} if <code>name</code> is null. If <code>expected</code> is not an <code>Array</code>
	 *   or <code>Set</code>.
	 * @throws {RangeError} if <code>name</code> is empty. If the actual value is missing any elements in
	 *   <code>expected</code>. If the actual value contains elements not found in <code>expected</code>.
	 */
	containsExactly(expected: unknown[] | Set<unknown>, name?: string): SetAsserter;

	/**
	 * Ensures that the actual value contains any of the elements in the expected value.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetAsserter} the updated asserter
	 * @throws {TypeError} if <code>name</code> is null. If <code>expected</code> is not an <code>Array</code>
	 *   or <code>Set</code>.
	 * @throws {RangeError} if <code>name</code> is empty. If the actual value is missing any elements in
	 *   <code>expected</code>. If the actual value contains elements not found in <code>expected</code>.
	 */
	containsAny(expected: unknown[] | Set<unknown>, name?: string): SetAsserter;

	/**
	 * Ensures that the actual value contains all of the elements in the expected value.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {SetAsserter} the updated asserter
	 * @throws {TypeError} if <code>name</code> is null. If <code>expected</code> is not an <code>Array</code>
	 *   or <code>Set</code>.
	 * @throws {RangeError} if <code>name</code> is empty. If the actual value does not contain all of
	 *   <code>expected</code>.
	 */
	containsAll(expected: unknown[] | Set<unknown>, name?: string): SetAsserter;

	/**
	 * Ensures that the actual value does not contain an entry.
	 *
	 * @param {object} entry an entry
	 * @param {string} [name] the name of the entry
	 * @return {SetAsserter} the updated asserter
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty. If the actual value contains <code>entry</code>.
	 */
	doesNotContain(entry: unknown, name?: string): SetAsserter;

	/**
	 * Ensures that the actual value does not contain any of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {SetAsserter} the updated asserter
	 * @throws {TypeError} if <code>name</code> is null. If <code>elements</code> is not an <code>Array</code>
	 *   or [@code Set}.
	 * @throws {RangeError} if <code>name</code> is empty. If the array contains any of <code>elements</code>.
	 */
	doesNotContainAny(elements: unknown[] | Set<unknown>, name?: string): SetAsserter;

	/**
	 * Ensures that the array does not contain all of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {SetAsserter} the updated asserter
	 * @throws {TypeError} if <code>name</code> is null. If <code>elements</code> is not an <code>Array</code>
	 *   or [@code Set}.
	 * @throws {RangeError} if <code>name</code> is empty. If the actual value contains all of
	 *   <code>elements</code>.
	 */
	doesNotContainAll(elements: unknown[] | Set<unknown>, name?: string): SetAsserter;

	/**
	 * @return {NumberAsserter} an asserter for the Set's size
	 */
	size(): NumberAsserter;

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberAsserter} for the Set's size
	 * @return {SetAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	sizeConsumer(consumer: (actual: NumberAsserter) => void): SetAsserter;

	/**
	 * @return {ArrayAsserter} an asserter for the Set's elements
	 */
	asArray(): ArrayAsserter;

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayAsserter} for the Set's elements
	 * @return {SetAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asArrayConsumer(consumer: (actual: ArrayAsserter) => void): SetAsserter;

	getActual(): Set<unknown> | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SetAsserter as default};