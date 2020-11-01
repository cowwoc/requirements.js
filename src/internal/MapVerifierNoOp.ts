import {
	ArrayVerifierNoOp,
	NumberVerifierNoOp,
	ObjectVerifierNoOp
} from "./internal";

/**
 * An implementation of <code>Map</code> that does nothing.
 */
class MapVerifierNoOp extends ObjectVerifierNoOp
{
	static readonly INSTANCE = new MapVerifierNoOp();

	/**
	 * @return {MapVerifierNoOp} the updated verifier
	 */
	isEmpty(): this
	{
		return this;
	}

	/**
	 * @return {MapVerifierNoOp} the updated verifier
	 */
	isNotEmpty(): this
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} a verifier for the Map's keys
	 */
	static keys(): ArrayVerifierNoOp
	{
		return ArrayVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {MapVerifierNoOp} the updated verifier
	 */
	keysConsumer(): this
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} a verifier for the Map's values
	 */
	static values(): ArrayVerifierNoOp
	{
		return ArrayVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {MapVerifierNoOp} the updated verifier
	 */
	valuesConsumer(): this
	{
		return this;
	}

	/**
	 * @return {ArrayVerifierNoOp} a verifier for the Map's entries (an array of <code>[key, value]</code> for
	 *   each element in the Map)
	 */
	static entries(): ArrayVerifierNoOp
	{
		return ArrayVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {MapVerifierNoOp} the updated verifier
	 */
	entriesConsumer(): this
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} a verifier for the number of entries this Map contains
	 */
	static size(): NumberVerifierNoOp
	{
		return NumberVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {MapVerifierNoOp} the updated verifier
	 */
	sizeConsumer(): this
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {MapVerifierNoOp as default};