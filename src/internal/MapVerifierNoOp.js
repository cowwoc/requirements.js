import ObjectVerifierNoOp from "./circular_dependency/ObjectVerifierNoOpBase.js";
import ArrayVerifierNoOp from "./ArrayVerifierNoOp.js";
import NumberVerifierNoOp from "./NumberVerifierNoOp.js";

/**
 * An implementation of <code>Map</code> that does nothing.
 */
class MapVerifierNoOp extends ObjectVerifierNoOp
{
	/**
	 * @return {MapVerifierNoOp} the updated verifier
	 */
	isEmpty()
	{
		return this;
	}

	/**
	 * @return {MapVerifierNoOp} the updated verifier
	 */
	isNotEmpty()
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} a verifier for the Map's keys
	 */
	static keys()
	{
		return ArrayVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {MapVerifierNoOp} the updated verifier
	 */
	keysConsumer()
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} a verifier for the Map's values
	 */
	static values()
	{
		return ArrayVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {MapVerifierNoOp} the updated verifier
	 */
	valuesConsumer()
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} a verifier for the Map's entries (an array of <code>[key, value]</code> for
	 *   each element in the Map)
	 */
	static entries()
	{
		return ArrayVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {MapVerifierNoOp} the updated verifier
	 */
	entriesConsumer()
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} a verifier for the number of entries this Map contains
	 */
	static size()
	{
		return NumberVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {MapVerifierNoOp} the updated verifier
	 */
	sizeConsumer()
	{
		return this;
	}
}

MapVerifierNoOp.INSTANCE = new MapVerifierNoOp();

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {MapVerifierNoOp as default};