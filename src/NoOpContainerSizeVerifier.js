import NoOpNumberVerifier from "./NoOpNumberVerifier";

/**
 * An implementation of {@link ContainerSizeVerifier} that does nothing.
 *
 * @class
 * @author Gili Tzabari
 */
class NoOpContainerSizeVerifier extends NoOpNumberVerifier {
	/**
	 * @return {NoOpContainerSizeVerifier} this
	 */
	isGreaterThanOrEqualTo()
	{
		return this;
	}

	/**
	 * @return {NoOpContainerSizeVerifier} this
	 */
	isGreaterThan()
	{
		return this;
	}

	/**
	 * @return {NoOpContainerSizeVerifier} this
	 */
	isLessThanOrEqualTo()
	{
		return this;
	}

	/**
	 * @return {NoOpContainerSizeVerifier} this
	 */
	isLessThan()
	{
		return this;
	}

	/**
	 * @return {NoOpContainerSizeVerifier} this
	 */
	isNotPositive()
	{
		return this;
	}

	/**
	 * @return {NoOpContainerSizeVerifier} this
	 */
	isPositive()
	{
		return this;
	}

	/**
	 * @return {NoOpContainerSizeVerifier} this
	 */
	isNotZero()
	{
		return this;
	}

	/**
	 * @return {NoOpContainerSizeVerifier} this
	 */
	isZero()
	{
		return this;
	}

	/**
	 * @return {NoOpContainerSizeVerifier} this
	 */
	isNotNegative()
	{
		return this;
	}

	/**
	 * @return {NoOpContainerSizeVerifier} this
	 */
	isNegative()
	{
		return this;
	}

	/**
	 * @return {NoOpContainerSizeVerifier} this
	 */
	isBetween()
	{
		return this;
	}

	/**
	 * @return {NoOpContainerSizeVerifier} this
	 */
	isEqualTo()
	{
		return this;
	}

	/**
	 * @return {NoOpContainerSizeVerifier} this
	 */
	isNotEqualTo()
	{
		return this;
	}
}

export default NoOpContainerSizeVerifier;