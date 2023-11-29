import type {
	NumberVerifier,
	ObjectVerifier,
	ExtensibleObjectVerifier
} from "./internal/internal.mjs";

const typedocWorkaround: null | ObjectVerifier<void> = null;
// noinspection PointlessBooleanExpressionJS
if (typedocWorkaround !== null)
	console.log("WORKAROUND: https://github.com/microsoft/tsdoc/issues/348");

/**
 * Verifies the requirements of a <code>Set</code>.
 * <p>
 * All methods (except those found in {@link ObjectVerifier}) assume that the actual value is not null.
 *
 * @typeParam E - the type the array elements
 */
interface SetVerifier<E> extends ExtensibleObjectVerifier<SetVerifier<E>, Set<E>>
{
	/**
	 * Ensures that value does not contain any elements.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the value contains at least one element
	 */
	isEmpty(): SetVerifier<E>;

	/**
	 * Ensures that value contains at least one element.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the value does not contain any elements
	 */
	isNotEmpty(): SetVerifier<E>;

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
	contains(expected: E, name?: string): SetVerifier<E>;

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
	containsExactly(expected: E[] | Set<E>, name?: string): SetVerifier<E>;

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
	containsAny(expected: E[] | Set<E>, name?: string): SetVerifier<E>;

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
	containsAll(expected: E[] | Set<E>, name?: string): SetVerifier<E>;

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
	doesNotContain(entry: E, name?: string): SetVerifier<E>;

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
	doesNotContainAny(elements: E[] | Set<E>, name?: string): SetVerifier<E>;

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
	doesNotContainAll(elements: E[] | Set<E>, name?: string): SetVerifier<E>;

	/**
	 * @returns a verifier for the Set's size
	 */
	size(): NumberVerifier;

	/**
	 * @param consumer - a function that accepts a {@link NumberVerifier} for the Set's size
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	sizeConsumer(consumer: (actual: NumberVerifier) => void): SetVerifier<E>;

	/**
	 * {@inheritDoc}
	 */
	getActual(): Set<E>;
}

export {type SetVerifier};