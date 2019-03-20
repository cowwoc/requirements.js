import NoOpArrayVerifier from "./NoOpArrayVerifier";
import NoOpNumberVerifier from "./NoOpNumberVerifier";
import NoOpObjectVerifier from "./internal/NoOpObjectVerifier";

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

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {NoOpMapVerifier as default};