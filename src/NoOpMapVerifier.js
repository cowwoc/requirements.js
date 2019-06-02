import NoOpObjectVerifier from "./NoOpObjectVerifier";
import NoOpArrayVerifier from "./NoOpArrayVerifier";
import NoOpNumberVerifier from "./NoOpNumberVerifier";

/**
 * An implementation of <code>Map</code> that does nothing.
 */
class NoOpMapVerifier extends NoOpObjectVerifier
{
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
	static keys()
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
	static values()
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
	 * element in the Map)
	 */
	static entries()
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
	static size()
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

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {NoOpMapVerifier as default};