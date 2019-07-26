import ObjectVerifier from "./ObjectVerifierBase.js";

// DESIGN:
// * Declare the class without methods that trigger circular dependencies
// * Load the dependencies
// * Add the missing methods

/**
 * Verifies the requirements of an array.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class ArrayVerifier extends ObjectVerifier
{
	/**
	 * Ensures that the actual value is empty.
	 *
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not empty
	 */
	isEmpty()
	{
		this.validator.isEmpty();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is not empty.
	 *
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is empty
	 */
	isNotEmpty()
	{
		this.validator.isNotEmpty();
		return this.validationResult();
	}

	/**
	 * Ensures that the array contains an element.
	 *
	 * @param {object} element the element that must exist
	 * @param {string} [name] the name of the element
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty; if the array does not contain <code>element</code>
	 */
	contains(element, name)
	{
		this.validator.contains(element, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the array contains exactly the specified elements; nothing less, nothing more.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty; if the array is missing any elements in
	 *   <code>expected</code>; if the array contains elements not found in <code>expected</code>
	 */
	containsExactly(expected, name)
	{
		this.validator.containsExactly(expected, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the array contains any of the specified elements.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty; if the array is missing any elements in
	 *   <code>expected</code>; if the array contains elements not found in <code>expected</code>
	 */
	containsAny(expected, name)
	{
		this.validator.containsAny(expected, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the array contains all of the specified elements.
	 *
	 * @param {Array} expected the elements that must exist
	 * @param {string} [name] the name of the expected elements
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null; if <code>expected</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty; if the array does not contain all of
	 *   <code>expected</code>
	 */
	containsAll(expected, name)
	{
		this.validator.containsAll(expected, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the array does not contain an element.
	 *
	 * @param {object} element the element that must not exist
	 * @param {string} [name] the name of the element
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty; if the array contains <code>element</code>
	 */
	doesNotContain(element, name)
	{
		this.validator.doesNotContain(element, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the array does not contain any of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty; if the array contains any of <code>elements</code>
	 */
	doesNotContainAny(elements, name)
	{
		this.validator.doesNotContainAny(elements, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the array does not contain all of the specified elements.
	 *
	 * @param {Array} elements the elements that must not exist
	 * @param {string} [name] the name of the elements
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {TypeError} if <code>name</code> is null; if <code>elements</code> is not an Array
	 * @throws {RangeError} if <code>name</code> is empty; if the array contains all of <code>elements</code>
	 */
	doesNotContainAll(elements, name)
	{
		this.validator.doesNotContainAll(elements, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the array does not contain any duplicate elements.
	 *
	 * @return {ArrayVerifier} the updated verifier
	 * @throws {RangeError} if the array contains any duplicate elements
	 */
	doesNotContainDuplicates()
	{
		this.validator.doesNotContainDuplicates();
		return this.validationResult();
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayVerifier as default};