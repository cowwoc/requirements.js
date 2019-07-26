// DESIGN:
// * Declare the class without methods that trigger circular dependencies
// * Load the dependencies
// * Add the missing methods

/**
 * An implementation of <code>ObjectVerifier</code> that does nothing.
 */
class ObjectVerifierNoOp
{
	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isEqualTo()
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isNotEqualTo()
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isNotInArray()
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isPrimitive()
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isTypeOf()
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isInstanceOf()
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isNull()
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isNotNull()
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isDefined()
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isNotDefined()
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isSet()
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isNotSet()
	{
		return this;
	}

	/**
	 * Indicates if the actual value is available.
	 *
	 * @return {boolean} <code>false</code>
	 */
	isActualAvailable()
	{
		return false;
	}

	/**
	 * Returns the actual value. The return value is undefined if {@link #isActualAvailable()} is
	 * <code>false</code>.
	 *
	 * @return {undefined}
	 */
	getActual()
	{
	}
}

ObjectVerifierNoOp.INSTANCE = new ObjectVerifierNoOp();

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ObjectVerifierNoOp as default};