import type {
	ExtensibleObjectValidator,
	SetValidator,
	SizeValidator
} from "./internal/internal";

/**
 * Validates the requirements of an array.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
interface ArrayValidator extends ExtensibleObjectValidator<ArrayValidator>
{
	/**
	 * Ensures that the actual value is empty.
	 *
	 * @return {ArrayValidator} the updated validator
	 */
	isEmpty(): ArrayValidator;

	/**
	 * Ensures that the actual value is not empty.
	 *
	 * @return {ArrayValidator} the updated validator
	 */
	isNotEmpty(): ArrayValidator;

	/**
	 * Ensures that the array contains an element.
	 *
	 * @param {object} element the element that must exist
	 * @param {string} [name] the name of the element
	 * @return {ArrayValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	contains(element: unknown, name?: string): ArrayValidator;

	/**
	 * Ensures that the array contains exactly the specified elements; nothing less, nothing more.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {ArrayValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	containsExactly(expected: unknown[], name?: string): ArrayValidator;

	/**
	 * Ensures that the array contains any of the specified elements.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {ArrayValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	containsAny(expected: unknown[], name?: string): ArrayValidator;

	/**
	 * Ensures that the array contains all of the specified elements.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {ArrayValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	containsAll(expected: unknown[], name?: string): ArrayValidator;

	/**
	 * Ensures that the array does not contain an element.
	 *
	 * @param {object} element the element that must not exist
	 * @param {string} [name] the name of the element
	 * @return {ArrayValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	doesNotContain(element: unknown, name?: string): ArrayValidator;

	/**
	 * Ensures that the array does not contain any of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {ArrayValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	doesNotContainAny(elements: unknown[], name?: string): ArrayValidator;

	/**
	 * Ensures that the array does not contain all of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {ArrayValidator} the updated validator
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	doesNotContainAll(elements: unknown[], name?: string): ArrayValidator;

	/**
	 * Ensures that the array does not contain any duplicate elements.
	 *
	 * @return {ArrayValidator} the updated validator
	 */
	doesNotContainDuplicates(): ArrayValidator;

	/**
	 * @return {SizeValidator} a validator for the length of the array
	 */
	length(): SizeValidator;

	/**
	 * @param {Function} consumer a function that accepts a {@link SizeValidator} for the length of the array
	 * @return {ArrayValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	lengthConsumer(consumer: (length: SizeValidator) => void): ArrayValidator;

	/**
	 * Verifies the Set representation of the array.
	 *
	 * @return {SetValidator} a <code>Set</code> validator
	 */
	asSet(): SetValidator;

	/**
	 * @param {Function} consumer a function that accepts a {@link SetValidator} for the Set representation of
	 *   the array
	 * @return {ArrayValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asSetConsumer(consumer: (actual: SetValidator) => void): ArrayValidator;

	getActual(): unknown[] | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayValidator as default};