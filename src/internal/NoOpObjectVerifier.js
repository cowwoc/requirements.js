// DESIGN:
// * Declare the class without methods that trigger circular dependencies
// * Load the dependencies
// * Add the missing methods

/**
 * An implementation of <code>ObjectVerifier</code> that does nothing.
 */
class NoOpObjectVerifier
{
	/**
	 * @return {NoOpObjectVerifier} this
	 */
	isEqualTo()
	{
		return this;
	}

	/**
	 * @return {NoOpObjectVerifier} this
	 */
	isNotEqualTo()
	{
		return this;
	}

	/**
	 * @return {NoOpObjectVerifier} this
	 */
	isNotInArray()
	{
		return this;
	}

	/**
	 * @return {NoOpObjectVerifier} this
	 */
	isPrimitive()
	{
		return this;
	}

	/**
	 * @return {NoOpObjectVerifier} this
	 */
	isTypeOf()
	{
		return this;
	}

	/**
	 * @return {NoOpObjectVerifier} this
	 */
	isInstanceOf()
	{
		return this;
	}

	/**
	 * @return {NoOpObjectVerifier} this
	 */
	isNull()
	{
		return this;
	}

	/**
	 * @return {NoOpObjectVerifier} this
	 */
	isNotNull()
	{
		return this;
	}

	/**
	 * @return {NoOpObjectVerifier} this
	 */
	isDefined()
	{
		return this;
	}

	/**
	 * @return {NoOpObjectVerifier} this
	 */
	isNotDefined()
	{
		return this;
	}

	/**
	 * @return {NoOpObjectVerifier} this
	 */
	isSet()
	{
		return this;
	}

	/**
	 * @return {NoOpObjectVerifier} this
	 */
	isNotSet()
	{
		return this;
	}

	/**
	 * @throws RangeError because assertions are disabled and the verifier does not need to retain a reference
	 *   to the actual value)
	 * @see #getActualIfPresent()
	 */
	getActual()
	{
		throw new RangeError("Assertions are disabled");
	}


	/**
	 * Returns the actual value.
	 *
	 * @return {undefined} <code>undefined</code> if the verifier does not have access to the actual value
	 * @see #getActualLines()
	 */
	getActualIfPresent()
	{
		// eslint-disable-next-line no-undefined
		return undefined;
	}
}

NoOpObjectVerifier.INSTANCE = new NoOpObjectVerifier();

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {NoOpObjectVerifier as default};