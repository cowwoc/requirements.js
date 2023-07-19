import type {
	ArrayVerifier,
	NumberVerifier,
	ObjectVerifier
} from "./internal/internal.mjs";

/**
 * Verifies the requirements of a <code>Set</code>.
 * <p>
 * All methods (except those found in {@link ObjectVerifier}) imply {@link isNotNull}.
 */
interface SetVerifier extends ObjectVerifier
{
	/**
	 * Ensures that value does not contain any elements.
	 *
	 * @returns the updated verifier
	 * @throws TypeError if the value contains at least one element
	 */
	isEmpty(): SetVerifier;

	/**
	 * Ensures that value contains at least one element.
	 *
	 * @returns the updated verifier
	 * @throws TypeError if the value does not contain any elements
	 */
	isNotEmpty(): SetVerifier;

	/**
	 * Ensures that the actual value contains an entry.
	 *
	 * @param expected - the expected value
	 * @param name - (optional) the name of the expected value
	 * @returns the updated verifier
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty.
	 * If the Set does not contain <code>expected</code>.
	 */
	contains(expected: unknown, name?: string): SetVerifier;

	/**
	 * Ensures that the actual value contains exactly the same elements as the expected value; nothing less,
	 * nothing more.
	 *
	 * @param expected - the elements that must exist
	 * @param name - (optional) the name of the expected elements
	 * @returns the updated verifier
	 * @throws TypeError if <code>name</code> is null.
	 * If <code>expected</code> is not an <code>Array</code> or <code>Set</code>.
	 * @throws RangeError if <code>name</code> is empty.
	 * If the actual value is missing any elements in <code>expected</code>.
	 * If the actual value contains elements not found in <code>expected</code>.
	 */
	containsExactly(expected: unknown[] | Set<unknown>, name?: string): SetVerifier;

	/**
	 * Ensures that the actual value contains any of the elements in the expected value.
	 *
	 * @param expected - the elements that must exist
	 * @param name - (optional) the name of the expected elements
	 * @returns the updated verifier
	 * @throws TypeError if <code>name</code> is null.
	 * If <code>expected</code> is not an <code>Array</code> or <code>Set</code>.
	 * @throws RangeError if <code>name</code> is empty.
	 * If the actual value is missing any elements in <code>expected</code>.
	 * If the actual value contains elements not found in <code>expected</code>.
	 */
	containsAny(expected: unknown[] | Set<unknown>, name?: string): SetVerifier;

	/**
	 * Ensures that the actual value contains all the elements in the expected value.
	 *
	 * @param expected - the elements that must exist
	 * @param name - (optional) the name of the expected elements
	 * @returns the updated verifier
	 * @throws TypeError if <code>name</code> is null.
	 * If <code>expected</code> is not an <code>Array</code> or <code>Set</code>.
	 * @throws RangeError if <code>name</code> is empty.
	 * If the actual value does not contain all of <code>expected</code>.
	 */
	containsAll(expected: unknown[] | Set<unknown>, name?: string): SetVerifier;

	/**
	 * Ensures that the actual value does not contain an entry.
	 *
	 * @param entry - an entry
	 * @param name - (optional) the name of the entry
	 * @returns the updated verifier
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty.
	 * If the actual value contains <code>entry</code>.
	 */
	doesNotContain(entry: unknown, name?: string): SetVerifier;

	/**
	 * Ensures that the actual value does not contain any of the specified elements.
	 *
	 * @param elements - the elements that must not exist
	 * @param name - (optional) the name of the elements
	 * @returns the updated verifier
	 * @throws TypeError if <code>name</code> is null.
	 * If <code>elements</code> is not an <code>Array</code> or <code>Set</code>.
	 * @throws RangeError if <code>name</code> is empty.
	 * If the array contains any of <code>elements</code>.
	 */
	doesNotContainAny(elements: unknown[] | Set<unknown>, name?: string): SetVerifier;

	/**
	 * Ensures that the array does not contain all the specified elements.
	 *
	 * @param elements - the elements that must not exist
	 * @param name - (optional) the name of the elements
	 * @returns the updated verifier
	 * @throws TypeError if <code>name</code> is null.
	 * If <code>elements</code> is not an <code>Array</code> or <code>Set</code>.
	 * @throws RangeError if <code>name</code> is empty.
	 * If the actual value contains all of <code>elements</code>.
	 */
	doesNotContainAll(elements: unknown[] | Set<unknown>, name?: string): SetVerifier;

	/**
	 * @returns a verifier for the Set's size
	 */
	size(): NumberVerifier;

	/**
	 * @param consumer - a function that accepts a {@link NumberVerifier} for the Set's size
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	sizeConsumer(consumer: (actual: NumberVerifier) => void): SetVerifier;

	/**
	 * @returns a verifier for the Set's elements
	 */
	asArray(): ArrayVerifier;

	/**
	 * @param consumer - a function that accepts an {@link ArrayVerifier} for the Set's elements
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	asArrayConsumer(consumer: (actual: ArrayVerifier) => void): SetVerifier;

	getActual(): Set<unknown>;
}

export {type SetVerifier};