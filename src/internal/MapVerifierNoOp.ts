import {
	ArrayVerifier,
	ArrayVerifierNoOp,
	MapVerifier,
	NumberVerifier,
	NumberVerifierNoOp,
	ObjectVerifierNoOp
} from "./internal";

/**
 * An implementation of <code>Map</code> that does nothing.
 */
class MapVerifierNoOp extends ObjectVerifierNoOp
	implements MapVerifier
{
	static readonly INSTANCE = new MapVerifierNoOp();

	/**
	 * @return {MapVerifier} the updated verifier
	 */
	isEmpty(): MapVerifier
	{
		return this;
	}

	/**
	 * @return {MapVerifier} the updated verifier
	 */
	isNotEmpty(): MapVerifier
	{
		return this;
	}

	/**
	 * @return {ArrayVerifier} a verifier for the Map's keys
	 */
	keys(): ArrayVerifier
	{
		return ArrayVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {MapVerifier} the updated verifier
	 */
	keysConsumer(): MapVerifier
	{
		return this;
	}

	/**
	 * @return {ArrayVerifier} a verifier for the Map's values
	 */
	values(): ArrayVerifier
	{
		return ArrayVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {MapVerifier} the updated verifier
	 */
	valuesConsumer(): MapVerifier
	{
		return this;
	}

	/**
	 * @return {ArrayVerifier} a verifier for the Map's entries (an array of <code>[key, value]</code> for
	 *   each element in the Map)
	 */
	entries(): ArrayVerifier
	{
		return ArrayVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {MapVerifier} the updated verifier
	 */
	entriesConsumer(): MapVerifier
	{
		return this;
	}

	/**
	 * @return {NumberVerifier} a verifier for the number of entries this Map contains
	 */
	size(): NumberVerifier
	{
		return NumberVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {MapVerifier} the updated verifier
	 */
	sizeConsumer(): MapVerifier
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {MapVerifierNoOp as default};