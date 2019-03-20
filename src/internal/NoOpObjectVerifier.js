/**
 * An implementation of <code>ObjectVerifier</code> that does nothing.
 *
 * @class
 * @author Gili Tzabari
 */
class NoOpObjectVerifier {
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
	isInArray()
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
	 * @return {NoOpObjectVerifier} this
	 */
	asStringConsumer()
	{
		return this;
	}

	/**
	 * @return {NoOpObjectVerifier} this
	 */
	asInetAddressConsumer()
	{
		return this;
	}

	/**
	 * @return {NoOpObjectVerifier} this
	 */
	asUriConsumer()
	{
		return this;
	}

	/**
	 * @return {Object} the actual value
	 * @throws RangeError if if the verifier does not have access to the actual value (e.g. if {@link
		*   Verifiers#assertThat() assertThat()} is used when assertions are disabled, the verifier does not need to retain
	 *   a reference to the actual value)
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
	 * @see #getActual()
	 */
	getActualIfPresent()
	{
		// eslint-disable-next-line no-undefined
		return undefined;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {NoOpObjectVerifier as default};