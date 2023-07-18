import type {
	ExtensibleObjectValidator,
	NumberValidator,
	SetValidator
} from "./internal/internal.mjs";

/**
 * Validates the requirements of an array.
 *
 * Verifier and Validator methods are equivalent.
 * Validators return validation failures through the {@link getFailures} method, while Verifiers throw them
 * as exceptions.
 *
 * All methods (except those found in {@link ObjectValidator}) imply {@link isNotNull}.
 */
interface ArrayValidator extends ExtensibleObjectValidator<ArrayValidator>
{
	/**
	 * Ensures that the actual value is empty.
	 *
	 * @returns the updated validator
	 */
	isEmpty(): ArrayValidator;

	/**
	 * Ensures that the actual value is not empty.
	 *
	 * @returns the updated validator
	 */
	isNotEmpty(): ArrayValidator;

	/**
	 * Ensures that the array contains an element.
	 *
	 * @param element - the element that must exist
	 * @param name - (optional) the name of the element
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	contains(element: unknown, name?: string): ArrayValidator;

	/**
	 * Ensures that the array contains exactly the specified elements; nothing less, nothing more.
	 *
	 * @param expected - the elements that must exist
	 * @param name - (optional) the name of the expected elements
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	containsExactly(expected: unknown[], name?: string): ArrayValidator;

	/**
	 * Ensures that the array contains any of the specified elements.
	 *
	 * @param expected - the elements that must exist
	 * @param name - (optional) the name of the expected elements
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	containsAny(expected: unknown[], name?: string): ArrayValidator;

	/**
	 * Ensures that the array contains all the specified elements.
	 *
	 * @param expected - the elements that must exist
	 * @param name - (optional) the name of the expected elements
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	containsAll(expected: unknown[], name?: string): ArrayValidator;

	/**
	 * Ensures that the array does not contain an element.
	 *
	 * @param element - the element that must not exist
	 * @param name - (optional) the name of the element
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	doesNotContain(element: unknown, name?: string): ArrayValidator;

	/**
	 * Ensures that the array does not contain any of the specified elements.
	 *
	 * @param elements - the elements that must not exist
	 * @param name - (optional) the name of the elements
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	doesNotContainAny(elements: unknown[], name?: string): ArrayValidator;

	/**
	 * Ensures that the array does not contain all the specified elements.
	 *
	 * @param elements - the elements that must not exist
	 * @param name - (optional) the name of the elements
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	doesNotContainAll(elements: unknown[], name?: string): ArrayValidator;

	/**
	 * Ensures that the array does not contain any duplicate elements.
	 *
	 * @returns the updated validator
	 */
	doesNotContainDuplicates(): ArrayValidator;

	/**
	 * @returns a validator for the length of the array
	 */
	length(): NumberValidator;

	/**
	 * @param consumer - a function that accepts a {@link NumberValidator} for the length of the array
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	lengthConsumer(consumer: (length: NumberValidator) => void): ArrayValidator;

	/**
	 * Verifies the Set representation of the array.
	 *
	 * @returns a <code>Set</code> validator
	 */
	asSet(): SetValidator;

	/**
	 * @param consumer - a function that accepts a {@link SetValidator} for the Set representation of the array
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	asSetConsumer(consumer: (actual: SetValidator) => void): ArrayValidator;

	getActual(): unknown[] | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {type ArrayValidator as default};