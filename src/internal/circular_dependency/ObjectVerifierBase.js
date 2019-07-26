import Objects from "../Objects.js";
import ObjectValidator from "./ObjectValidatorBase.js";

// Avoid circular dependencies by doing the following:
// * Declare the class without methods that trigger circular dependencies
// * Load the dependencies
// * Add the missing methods

/**
 * Verifies the requirements of an object.
 */
class ObjectVerifier
{
	/**
	 * Creates a new ObjectVerifier.
	 *
	 * @param {ObjectValidator} validator the validator to delegate to
	 * @throws {TypeError} if <code>validator</code> is null or undefined
	 */
	constructor(validator)
	{
		Objects.requireThatInstanceOf(validator, "validator", ObjectValidator);
		Object.defineProperty(this, "validator",
			{
				value: validator
			});
	}

	/**
	 * Ensures that the actual value is equal to a value.
	 *
	 * @param {object} expected the expected value
	 * @param {string} [name] the name of the expected value
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value is not equal to value
	 */
	isEqualTo(expected, name)
	{
		this.validator.isEqualTo(expected, name);
		return this.validationResult();
	}

	/**
	 * Throws an exception if the validation failed.
	 *
	 * @param {Function} [result] a no-arg function that returns the value to return on success. By default,
	 * this function returns "this".
	 * @return {object} the updated verifier
	 * @throws {RangeError} if the validation failed
	 */
	validationResult(result)
	{
		if (result === null)
			throw new TypeError("result may not be null");
		if (typeof (result) === "undefined")
			result = () => this;

		if (this.validator.failures.length === 0)
			return result.apply(result);
		const failure = this.validator.failures[0];
		throw failure.createException();
	}

	/**
	 * Ensures that the actual value is not equal to a value.
	 *
	 * @param {object} value the value to compare to
	 * @param {string} [name] the name of the expected value
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value is equal to <code>value</code>
	 */
	isNotEqualTo(value, name)
	{
		this.validator.isNotEqualTo(value, name);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is a primitive. To check if the actual value is an object, use
	 * <code>isInstanceOf(Object)</code>.
	 *
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not a <code>string</code>, <code>number</code>,
	 *   <code>bigint</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, or
	 *   <code>symbol</code>)
	 */
	isPrimitive()
	{
		this.validator.isPrimitive();
		return this.validationResult();
	}

	/**
	 * Ensures that the type of the actual value has the specified name.
	 *
	 * If the actual value is undefined, the name is "undefined".
	 * If the actual value is null, the name is "null".
	 * If the actual value is a primitive boolean, the name is "boolean".
	 * If the actual value is a boolean object, the name is "Boolean".
	 * If the actual value is a primitive number, the name is "number".
	 * If the actual value is a number object, the name is "Number".
	 * If the actual value is a primitive bigint, the name is "bigint".
	 * If the actual value is a bigint object, the name is "BigInt".
	 * If the actual value is a primitive string, the name is "string".
	 * If the actual value is a string object, the name is "String".
	 * If the actual value is a primitive symbol, the name is "symbol".
	 * If the actual value is a symbol object, the name is "Symbol".
	 * If the actual value is an array, the name is "Array".
	 * If the actual value is a named function or a class constructor, the name is "Function".
	 * If the actual value is an anonymous function, the name is "AnonymousFunction".
	 * If the actual value is an arrow function, the name is "ArrowFunction".
	 * If the actual value is a class instance, the name is the class name.
	 *
	 * @param {string} type the name of the type to compare to
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {RangeError} if the actual value does not have the specified <code>type</code>
	 */
	isTypeOf(type)
	{
		this.validator.isTypeOf(type);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is an object that is an instance of the specified type.
	 *
	 * @param {object} type the type to compare to
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {TypeError}  if <code>type</code> is undefined, null, anonymous function or an arrow function
	 * @throws {RangeError} if the actual value is not an instance of <code>type</code>
	 */
	isInstanceOf(type)
	{
		this.validator.isInstanceOf(type);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is null.
	 *
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not null
	 */
	isNull()
	{
		this.validator.isNull();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is not null.
	 *
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is null
	 */
	isNotNull()
	{
		this.validator.isNotNull();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is defined.
	 *
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is undefined
	 */
	isDefined()
	{
		this.validator.isDefined();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is undefined.
	 *
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not undefined
	 */
	isNotDefined()
	{
		this.validator.isNotDefined();
		return this.validationResult();
	}

	/**
	 * Ensures that value is not undefined or null.
	 *
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {TypeError} if the value is undefined or null
	 */
	isSet()
	{
		this.validator.isSet();
		return this.validationResult();
	}

	/**
	 * Ensures that value is not undefined or null.
	 *
	 * @return {ObjectVerifier} the updated verifier
	 * @throws {TypeError} if the value is not undefined or null
	 */
	isNotSet()
	{
		this.validator.isNotSet();
		return this.validationResult();
	}

	/**
	 * Indicates if the actual value is available.
	 *
	 * @return {boolean} <code>true</code>
	 */
	isActualAvailable()
	{
		return true;
	}

	/**
	 * Returns the actual value. The return value is undefined if {@link #isActualAvailable()} is
	 * <code>false</code>.
	 *
	 * @return {object} the actual value
	 */
	getActual()
	{
		return this.validator.actual;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ObjectVerifier as default};