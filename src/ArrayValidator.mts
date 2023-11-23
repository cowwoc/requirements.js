import type {
	ExtensibleObjectValidator,
	NumberValidator,
	SetValidator
} from "./internal/internal.mjs";

/**
 * Validates the requirements of an array.
 *
 * Verifier and Validator methods are equivalent.
 * Validators return validation failures through the
 * {@link ExtensibleObjectValidator.getFailures | getFailures()} method, while Verifiers throw them as
 * exceptions.
 *
 * All methods (except those found in {@link ObjectValidator}) imply {@link isNotNull}.
 *
 * @typeParam E - the type the array elements
 */
interface ArrayValidator<E> extends ExtensibleObjectValidator<ArrayValidator<E>, E[]>
{
	/**
	 * Ensures that the actual value is empty.
	 *
	 * @returns the updated validator
	 */
	isEmpty(): ArrayValidator<E>;

	/**
	 * Ensures that the actual value is not empty.
	 *
	 * @returns the updated validator
	 */
	isNotEmpty(): ArrayValidator<E>;

	/**
	 * Ensures that the array contains an element.
	 *
	 * @param element - the element that must exist
	 * @param name - (optional) the name of the element
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	contains(element: E, name?: string): ArrayValidator<E>;

	/**
	 * Ensures that the array contains exactly the specified elements; nothing less, nothing more.
	 *
	 * @param expected - the elements that must exist
	 * @param name - (optional) the name of the expected elements
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	containsExactly(expected: E[], name?: string): ArrayValidator<E>;

	/**
	 * Ensures that the array contains any of the specified elements.
	 *
	 * @param expected - the elements that must exist
	 * @param name - (optional) the name of the expected elements
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	containsAny(expected: E[], name?: string): ArrayValidator<E>;

	/**
	 * Ensures that the array contains all the specified elements.
	 *
	 * @param expected - the elements that must exist
	 * @param name - (optional) the name of the expected elements
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	containsAll(expected: E[], name?: string): ArrayValidator<E>;

	/**
	 * Ensures that the array does not contain an element.
	 *
	 * @param element - the element that must not exist
	 * @param name - (optional) the name of the element
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	doesNotContain(element: E, name?: string): ArrayValidator<E>;

	/**
	 * Ensures that the array does not contain any of the specified elements.
	 *
	 * @param elements - the elements that must not exist
	 * @param name - (optional) the name of the elements
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	doesNotContainAny(elements: E[], name?: string): ArrayValidator<E>;

	/**
	 * Ensures that the array does not contain all the specified elements.
	 *
	 * @param elements - the elements that must not exist
	 * @param name - (optional) the name of the elements
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	doesNotContainAll(elements: E[], name?: string): ArrayValidator<E>;

	/**
	 * Ensures that the array does not contain any duplicate elements.
	 *
	 * @returns the updated validator
	 */
	doesNotContainDuplicates(): ArrayValidator<E>;

	/**
	 * @returns a validator for the length of the array
	 */
	length(): NumberValidator;

	/**
	 * @param consumer - a function that accepts a {@link NumberValidator} for the length of the array
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	lengthConsumer(consumer: (length: NumberValidator) => void): ArrayValidator<E>;

	/**
	 * @returns a validator for the <code>Array</code>
	 * @deprecated returns this
	 */
	asArray(): ArrayValidator<E>;

	asArray<E>(): ArrayValidator<E>;

	/**
	 * @param consumer - a function that accepts a {@link ArrayValidator} for the actual value
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	asArrayConsumer(consumer: (input: ArrayValidator<E>) => void): ArrayValidator<E>;

	asArrayConsumer<E>(consumer: (input: ArrayValidator<E>) => void): ArrayValidator<E>;

	/**
	 * Verifies the Set representation of the array.
	 *
	 * @returns a <code>Set</code> validator
	 */
	asSet(): SetValidator<E>;

	asSet<E>(): SetValidator<E>;

	/**
	 * @param consumer - a function that accepts a {@link SetValidator} for the Set representation of the array
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	asSetConsumer(consumer: (actual: SetValidator<E>) => void): ArrayValidator<E>;

	asSetConsumer<E>(consumer: (actual: SetValidator<E>) => void): ArrayValidator<E>;

	getActual(): E[] | undefined;
}

export {type ArrayValidator};