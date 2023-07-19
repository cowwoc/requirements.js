import type {
	ExtensibleObjectVerifier,
	NumberVerifier,
	SetVerifier
} from "./internal/internal.mjs";

/**
 * Verifies the requirements of an array.
 *
 * All methods (except those found in {@link ObjectVerifier}) imply {@link isNotNull}.
 */
interface ArrayVerifier extends ExtensibleObjectVerifier<ArrayVerifier>
{
	/**
	 * Ensures that the actual value is empty.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is not empty
	 */
	isEmpty(): ArrayVerifier;

	/**
	 * Ensures that the actual value is not empty.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is empty
	 */
	isNotEmpty(): ArrayVerifier;

	/**
	 * Ensures that the array contains an element.
	 *
	 * @param element - the element that must exist
	 * @param name - (optional) the name of the element
	 * @returns the updated verifier
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty.
	 * If the array does not contain <code>element</code>.
	 */
	contains(element: unknown, name?: string): ArrayVerifier;

	/**
	 * Ensures that the array contains exactly the specified elements; nothing less, nothing more.
	 *
	 * @param expected - the elements that must exist
	 * @param name - (optional) the name of the expected elements
	 * @returns the updated verifier
	 * @throws TypeError if <code>name</code> is null.
	 * If <code>expected</code> is not an Array.
	 * @throws RangeError if <code>name</code> is empty.
	 * If the array is missing any elements in <code>expected</code>.
	 * If the array contains elements not found in <code>expected</code>.
	 */
	containsExactly(expected: unknown[], name?: string): ArrayVerifier;

	/**
	 * Ensures that the array contains any of the specified elements.
	 *
	 * @param expected - the elements that must exist
	 * @param name - (optional) the name of the expected elements
	 * @returns the updated verifier
	 * @throws TypeError if <code>name</code> is null.
	 * If <code>expected</code> is not an Array.
	 * @throws RangeError if <code>name</code> is empty.
	 * If the array is missing any elements in <code>expected</code>.
	 * If the array contains elements not found in <code>expected</code>.
	 */
	containsAny(expected: unknown[], name?: string): ArrayVerifier;

	/**
	 * Ensures that the array contains all the specified elements.
	 *
	 * @param expected - the elements that must exist
	 * @param name - (optional) the name of the expected elements
	 * @returns the updated verifier
	 * @throws TypeError if <code>name</code> is null.
	 * If <code>expected</code> is not an Array
	 * @throws RangeError if <code>name</code> is empty.
	 * If the array does not contain all of <code>expected</code>.
	 */
	containsAll(expected: unknown[], name?: string): ArrayVerifier;

	/**
	 * Ensures that the array does not contain an element.
	 *
	 * @param element - the element that must not exist
	 * @param name - (optional) the name of the element
	 * @returns the updated verifier
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty.
	 * If the array contains <code>element</code>.
	 */
	doesNotContain(element: unknown, name?: string): ArrayVerifier;

	/**
	 * Ensures that the array does not contain any of the specified elements.
	 *
	 * @param elements - the elements that must not exist
	 * @param name - (optional) the name of the elements
	 * @returns the updated verifier
	 * @throws TypeError if <code>name</code> is null.
	 * If <code>elements</code> is not an Array.
	 * @throws RangeError if <code>name</code> is empty.
	 * If the array contains any of <code>elements</code>.
	 */
	doesNotContainAny(elements: unknown[], name?: string): ArrayVerifier;

	/**
	 * Ensures that the array does not contain all the specified elements.
	 *
	 * @param elements - the elements that must not exist
	 * @param name - (optional) the name of the elements
	 * @returns the updated verifier
	 * @throws TypeError if <code>name</code> is null.
	 * If <code>elements</code> is not an Array.
	 * @throws RangeError if <code>name</code> is empty.
	 * If the array contains all of <code>elements</code>.
	 */
	doesNotContainAll(elements: unknown[], name?: string): ArrayVerifier;

	/**
	 * Ensures that the array does not contain any duplicate elements.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the array contains any duplicate elements
	 */
	doesNotContainDuplicates(): ArrayVerifier;

	/**
	 * @returns a verifier for the length of the array
	 */
	length(): NumberVerifier;

	/**
	 * @param consumer - a function that accepts a {@link NumberVerifier} for the length of the array
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	lengthConsumer(consumer: (actual: NumberVerifier) => void): ArrayVerifier;

	/**
	 * Verifies the Set representation of the array.
	 *
	 * @returns a <code>Set</code> verifier
	 */
	asSet(): SetVerifier;

	/**
	 * @param consumer - a function that accepts a {@link SetVerifier} for the Set representation of the array
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	asSetConsumer(consumer: (actual: SetVerifier) => void): ArrayVerifier;

	getActual(): unknown[];
}

export {type ArrayVerifier};