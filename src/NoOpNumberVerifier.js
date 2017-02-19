import NoOpObjectVerifier from "./NoOpObjectVerifierSuperclass";

/**
 * An implementation of <code>NumberVerifier</code> that does nothing.
 *
 * @class
 * @author Gili Tzabari
 */
class NoOpNumberVerifier extends NoOpObjectVerifier {
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

export default NoOpNumberVerifier;