import type {
	ArrayValidator,
	ExtensibleObjectValidator,
	NumberValidator
} from "./internal/internal.mjs";

/**
 * Validates the requirements of a <code>Set</code>.
 *
 * Verifier and Validator methods are equivalent.
 * Validators return validation failures through the {@link getFailures} method, while Verifiers throw them
 * as exceptions.
 *
 * All methods (except those found in {@link ObjectValidator}) imply {@link isNotNull}.
 */
interface SetValidator extends ExtensibleObjectValidator<SetValidator>
{
	/**
	 * Ensures that value does not contain any elements.
	 *
	 * @returns the updated validator
	 */
	isEmpty(): SetValidator;

	/**
	 * Ensures that value contains at least one element.
	 *
	 * @returns the updated validator
	 */
	isNotEmpty(): SetValidator;

	/**
	 * Ensures that the actual value contains an entry.
	 *
	 * @param expected - the expected value
	 * @param name - (optional) the name of the expected value
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	contains(expected: unknown, name?: string): SetValidator;

	/**
	 * Ensures that the actual value contains exactly the same elements as the expected value; nothing less,
	 * nothing more.
	 *
	 * @param expected - the elements that must exist
	 * @param name - (optional) the name of the expected elements
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null.
	 * If <code>expected</code> is not an <code>Array</code> or <code>Set</code>.
	 * @throws RangeError if <code>name</code> is empty
	 */
	containsExactly(expected: unknown[] | Set<unknown>, name?: string): SetValidator;

	/**
	 * Ensures that the actual value contains any of the elements in the expected value.
	 *
	 * @param expected - the elements that must exist
	 * @param name - (optional) the name of the expected elements
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null.
	 * If <code>expected</code> is not an <code>Array</code> or <code>Set</code>.
	 * @throws RangeError if <code>name</code> is empty
	 */
	containsAny(expected: unknown[] | Set<unknown>, name?: string): SetValidator;

	/**
	 * Ensures that the actual value contains all the elements in the expected value.
	 *
	 * @param expected - the elements that must exist
	 * @param name - (optional) the name of the expected elements
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null.
	 * If <code>expected</code> is not an <code>Array</code> or <code>Set</code>.
	 * @throws RangeError if <code>name</code> is empty
	 */
	containsAll(expected: unknown[] | Set<unknown>, name?: string): SetValidator;

	/**
	 * Ensures that the actual value does not contain an entry.
	 *
	 * @param entry - an entry
	 * @param name - (optional) the name of the entry
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	doesNotContain(entry: unknown, name?: string): SetValidator;

	/**
	 * Ensures that the actual value does not contain any of the specified elements.
	 *
	 * @param elements - the elements that must not exist
	 * @param name - (optional) the name of the elements
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null.
	 * If <code>elements</code> is not an <code>Array</code> or <code>Set</code>.
	 * @throws RangeError if <code>name</code> is empty
	 */
	doesNotContainAny(elements: unknown[] | Set<unknown>, name?: string): SetValidator;

	/**
	 * Ensures that the array does not contain all the specified elements.
	 *
	 * @param elements - the elements that must not exist
	 * @param name - (optional) the name of the elements
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null.
	 * If <code>elements</code> is not an <code>Array</code> or <code>Set</code>.
	 * @throws RangeError if <code>name</code> is empty
	 */
	doesNotContainAll(elements: unknown[] | Set<unknown>, name?: string): SetValidator;

	/**
	 * @returns a validator for the Set's size
	 */
	size(): NumberValidator;

	/**
	 * @param consumer - a function that accepts a {@link NumberValidator} for the Set's size
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	sizeConsumer(consumer: (actual: NumberValidator) => void): SetValidator;

	/**
	 * @returns a validator for the Set's elements
	 */
	asArray(): ArrayValidator;

	/**
	 * @param consumer - a function that accepts an {@link ArrayValidator} for the Set's elements
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	asArrayConsumer(consumer: (actual: ArrayValidator) => void): SetValidator;

	getActual(): void | Set<unknown>;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {type SetValidator as default};