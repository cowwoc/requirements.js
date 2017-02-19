import NoOpArrayVerifier from "./NoOpArrayVerifier";
import NoOpNumberVerifier from "./NoOpNumberVerifier";
import NoOpObjectVerifier from "./NoOpObjectVerifierSuperclass";

/**
 * An implementation of <code>Map</code> that does nothing.
 *
 * @class
 * @author Gili Tzabari
 */
class NoOpMapVerifier extends NoOpObjectVerifier {
	/**
	 * @return {NoOpMapVerifier} this
	 */
	isEmpty()
	{
		return this;
	}

	/**
	 * @return {NoOpMapVerifier} this
	 */
	isNotEmpty()
	{
		return this;
	}

	/**
	 * @return {NoOpArrayVerifier} a verifier for the Map's keys
	 */
	keys()
	{
		return new NoOpArrayVerifier();
	}

	/**
	 * @return {NoOpMapVerifier} this
	 */
	keysConsumer()
	{
		return this;
	}

	/**
	 * @return {NoOpArrayVerifier} a verifier for the Map's values
	 */
	values()
	{
		return new NoOpArrayVerifier();
	}

	/**
	 * @return {NoOpMapVerifier} this
	 */
	valuesConsumer()
	{
		return this;
	}

	/**
	 * @return {NoOpArrayVerifier} a verifier for the Map's entries (an array of <code>[key, value]</code> for each
	 *   element in the Map)
	 */
	entries()
	{
		return new NoOpArrayVerifier();
	}

	/**
	 * @return {NoOpMapVerifier} this
	 */
	entriesConsumer()
	{
		return this;
	}

	/**
	 * @return {NoOpNumberVerifier} a verifier for the number of entries this Map contains
	 */
	size()
	{
		return new NoOpNumberVerifier();
	}

	/**
	 * @return {NoOpMapVerifier} this
	 */
	sizeConsumer()
	{
		return this;
	}
}

export default NoOpMapVerifier;