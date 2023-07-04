import type
{
	ExtensibleObjectAsserter,
	NumberAsserter,
	SetAsserter
} from "./internal/internal.mjs";

/**
 * Verifies the requirements of an array.
 *
 * All methods (except those found in {@link ObjectAsserter}) imply {@link #isNotNull()}.
 *
 * Asserters throw the same exceptions as Verifiers if and only if
 * {@link GlobalConfiguration#assertionsAreEnabled assertions are enabled}.
 */
interface ArrayAsserter extends ExtensibleObjectAsserter<ArrayAsserter>
{
	/**
	 * Ensures that the actual value is empty.
	 *
	 * @return {ArrayAsserter} the updated asserter
	 * @throws {RangeError} if assertions are enabled and the actual value is not empty
	 */
	isEmpty(): ArrayAsserter;

	/**
	 * Ensures that the actual value is not empty.
	 *
	 * @return {ArrayAsserter} the updated asserter
	 * @throws {RangeError} if assertions are enabled and the actual value is empty
	 */
	isNotEmpty(): ArrayAsserter;

	/**
	 * Ensures that the array contains an element.
	 *
	 * @param {object} element the element that must exist
	 * @param {string} [name] the name of the element
	 * @return {ArrayAsserter} the updated asserter
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty. If assertions are enabled and the array does not
	 *   contain <code>element</code>.
	 */
	contains(element: unknown, name?: string): ArrayAsserter;

	/**
	 * Ensures that the array contains exactly the specified elements; nothing less, nothing more.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {ArrayAsserter} the updated asserter
	 * @throws {TypeError} if <code>name</code> is null. If <code>expected</code> is not an Array.
	 * @throws {RangeError} if <code>name</code> is empty. If assertions are enabled, and the array is missing
	 *   any elements in <code>expected</code> or the array contains elements not found in
	 *   <code>expected</code>.
	 */
	containsExactly(expected: unknown[], name?: string): ArrayAsserter;

	/**
	 * Ensures that the array contains any of the specified elements.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {ArrayAsserter} the updated asserter
	 * @throws {TypeError} if <code>name</code> is null. If <code>expected</code> is not an Array.
	 * @throws {RangeError} if <code>name</code> is empty. If the array is missing any elements in
	 *   <code>expected</code>. If the array contains elements not found in <code>expected</code>.
	 */
	containsAny(expected: unknown[], name?: string): ArrayAsserter;

	/**
	 * Ensures that the array contains all of the specified elements.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {ArrayAsserter} the updated asserter
	 * @throws {TypeError} if <code>name</code> is null. If <code>expected</code> is not an Array.
	 * @throws {RangeError} if <code>name</code> is empty. If the array does not contain all of
	 *   <code>expected</code>.
	 */
	containsAll(expected: unknown[], name?: string): ArrayAsserter;

	/**
	 * Ensures that the array does not contain an element.
	 *
	 * @param {object} element the element that must not exist
	 * @param {string} [name] the name of the element
	 * @return {ArrayAsserter} the updated asserter
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty. If the array contains <code>element</code>.
	 */
	doesNotContain(element: unknown, name?: string): ArrayAsserter;

	/**
	 * Ensures that the array does not contain any of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {ArrayAsserter} the updated asserter
	 * @throws {TypeError} if <code>name</code> is null. If <code>elements</code> is not an Array.
	 * @throws {RangeError} if <code>name</code> is empty. If the array contains any of <code>elements</code>.
	 */
	doesNotContainAny(elements: unknown[], name?: string): ArrayAsserter;

	/**
	 * Ensures that the array does not contain all of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {ArrayAsserter} the updated asserter
	 * @throws {TypeError} if <code>name</code> is null. If <code>elements</code> is not an Array.
	 * @throws {RangeError} if <code>name</code> is empty. If the array contains all of <code>elements</code>.
	 */
	doesNotContainAll(elements: unknown[], name?: string): ArrayAsserter;

	/**
	 * Ensures that the array does not contain any duplicate elements.
	 *
	 * @return {ArrayAsserter} the updated asserter
	 * @throws {RangeError} if the array contains any duplicate elements
	 */
	doesNotContainDuplicates(): ArrayAsserter;

	/**
	 * @return {NumberAsserter} an asserter for the length of the array
	 */
	length(): NumberAsserter;

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberAsserter} for the length of the array
	 * @return {ArrayAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	lengthConsumer(consumer: (actual: NumberAsserter) => void): ArrayAsserter;

	/**
	 * Verifies the Set representation of the array.
	 *
	 * @return {SetAsserter} a <code>Set</code> asserter
	 */
	asSet(): SetAsserter;

	/**
	 * @param {Function} consumer a function that accepts a {@link SetAsserter} for the Set representation of the array
	 * @return {ArrayAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asSetConsumer(consumer: (actual: SetAsserter) => void): ArrayAsserter;

	getActual(): unknown[] | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayAsserter as default};