import NoOpObjectVerifier from "./NoOpObjectVerifier.js";

/**
 * An implementation of <code>NumberVerifier</code> that does nothing.
 */
class NoOpNumberVerifier extends NoOpObjectVerifier
{
	/**
	 * @return {NoOpNumberVerifier} this
	 */
	isNegative()
	{
		return this;
	}

	/**
	 * @return {NoOpNumberVerifier} this
	 */
	isNotNegative()
	{
		return this;
	}

	/**
	 * @return {NoOpNumberVerifier} this
	 */
	isZero()
	{
		return this;
	}

	/**
	 * @return {NoOpNumberVerifier} this
	 */
	isNotZero()
	{
		return this;
	}

	/**
	 * @return {NoOpNumberVerifier} this
	 */
	isPositive()
	{
		return this;
	}

	/**
	 * @return {NoOpNumberVerifier} this
	 */
	isNotPositive()
	{
		return this;
	}

	/**
	 * @return {NoOpNumberVerifier} this
	 */
	isGreaterThan()
	{
		return this;
	}

	/**
	 * @return {NoOpNumberVerifier} this
	 */
	isGreaterThanOrEqualTo()
	{
		return this;
	}

	/**
	 * @return {NoOpNumberVerifier} this
	 */
	isLessThan()
	{
		return this;
	}

	/**
	 * @return {NoOpNumberVerifier} this
	 */
	isLessThanOrEqualTo()
	{
		return this;
	}

	/**
	 * @return {NoOpNumberVerifier} this
	 */
	isBetween()
	{
		return this;
	}

	/**
	 * @return {NoOpNumberVerifier} this
	 */
	isBetweenClosed()
	{
		return this;
	}

	/**
	 * @return {NoOpNumberVerifier} this
	 */
	isNumber()
	{
		return this;
	}

	/**
	 * @return {NoOpNumberVerifier} this
	 */
	isNotNumber()
	{
		return this;
	}

	/**
	 * @return {NoOpNumberVerifier} this
	 */
	isFinite()
	{
		return this;
	}

	/**
	 * @return {NoOpNumberVerifier} this
	 */
	isNotFinite()
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {NoOpNumberVerifier as default};