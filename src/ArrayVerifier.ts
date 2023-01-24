import type
{
	ExtensibleObjectVerifier,
	NumberVerifier,
	SetVerifier
} from "./internal/internal.js";

/**
 * Verifies the requirements of an array.
 *
 * All methods (except those found in {@link ObjectVerifier}) imply {@link #isNotNull()}.
 */
interface ArrayVerifier extends ExtensibleObjectVerifier<ArrayVerifier>
{
	/**
	 * Ensures that the actual value is empty.
	 *
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not empty
	 */
	isEmpty(): ArrayVerifier;

	/**
	 * Ensures that the actual value is not empty.
	 *
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is empty
	 */
	isNotEmpty(): ArrayVerifier;

	/**
	 * Ensures that the array contains an element.
	 *
	 * @param {object} element the element that must exist
	 * @param {string} [name] the name of the element
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty. If the array does not contain <code>element</code>.
	 */
	contains(element: unknown, name?: string): ArrayVerifier;

	/**
	 * Ensures that the array contains exactly the specified elements; nothing less, nothing more.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null. If <code>expected</code> is not an Array.
	 * @throws {RangeError} if <code>name</code> is empty. If the array is missing any elements in
	 *   <code>expected</code>. If the array contains elements not found in <code>expected</code>.
	 */
	containsExactly(expected: unknown[], name?: string): ArrayVerifier;

	/**
	 * Ensures that the array contains any of the specified elements.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null. If <code>expected</code> is not an Array.
	 * @throws {RangeError} if <code>name</code> is empty. If the array is missing any elements in
	 *   <code>expected</code>. If the array contains elements not found in <code>expected</code>.
	 */
	containsAny(expected: unknown[], name?: string): ArrayVerifier;

	/**
	 * Ensures that the array contains all of the specified elements.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null. If <code>expected</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty. If the array does not contain all of
	 *   <code>expected</code>.
	 */
	containsAll(expected: unknown[], name?: string): ArrayVerifier;

	/**
	 * Ensures that the array does not contain an element.
	 *
	 * @param {object} element the element that must not exist
	 * @param {string} [name] the name of the element
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty. If the array contains <code>element</code>.
	 */
	doesNotContain(element: unknown, name?: string): ArrayVerifier;

	/**
	 * Ensures that the array does not contain any of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null. If <code>elements</code> is not an Array.
	 * @throws {RangeError} if <code>name</code> is empty. If the array contains any of <code>elements</code>.
	 */
	doesNotContainAny(elements: unknown[], name?: string): ArrayVerifier;

	/**
	 * Ensures that the array does not contain all of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null. If <code>elements</code> is not an Array.
	 * @throws {RangeError} if <code>name</code> is empty. If the array contains all of <code>elements</code>.
	 */
	doesNotContainAll(elements: unknown[], name?: string): ArrayVerifier;

	/**
	 * Ensures that the array does not contain any duplicate elements.
	 *
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {RangeError} if the array contains any duplicate elements
	 */
	doesNotContainDuplicates(): ArrayVerifier;

	/**
	 * @return {NumberVerifier} a verifier for the length of the array
	 */
	length(): NumberVerifier;

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberVerifier} for the length of the array
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	lengthConsumer(consumer: (actual: NumberVerifier) => void): ArrayVerifier;

	/**
	 * Verifies the Set representation of the array.
	 *
	 * @return {SetVerifier} a <code>Set</code> verifier
	 */
	asSet(): SetVerifier;

	/**
	 * @param {Function} consumer a function that accepts a {@link SetVerifier} for the Set representation of the array
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asSetConsumer(consumer: (actual: SetVerifier) => void): ArrayVerifier;

	getActual(): unknown[];
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayVerifier as default};