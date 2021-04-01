import {
	ArrayAsserter,
	ArrayAsserterNoOp,
	MapAsserter,
	NumberAsserter,
	NumberAsserterNoOp,
	ObjectAsserterNoOp
} from "./internal";

/**
 * An implementation of <code>Map</code> that does nothing.
 */
class MapAsserterNoOp extends ObjectAsserterNoOp
	implements MapAsserter
{
	static readonly INSTANCE = new MapAsserterNoOp();

	/**
	 * @return {MapAsserter} the updated asserter
	 */
	isEmpty(): MapAsserter
	{
		return this;
	}

	/**
	 * @return {MapAsserter} the updated asserter
	 */
	isNotEmpty(): MapAsserter
	{
		return this;
	}

	/**
	 * @return {ArrayAsserter} an asserter for the Map's keys
	 */
	keys(): ArrayAsserter
	{
		return ArrayAsserterNoOp.INSTANCE;
	}

	/**
	 * @return {MapAsserter} the updated asserter
	 */
	keysConsumer(): MapAsserter
	{
		return this;
	}

	/**
	 * @return {ArrayAsserter} an asserter for the Map's values
	 */
	values(): ArrayAsserter
	{
		return ArrayAsserterNoOp.INSTANCE;
	}

	/**
	 * @return {MapAsserter} the updated asserter
	 */
	valuesConsumer(): MapAsserter
	{
		return this;
	}

	/**
	 * @return {ArrayAsserter} an asserter for the Map's entries (an array of <code>[key, value]</code> for
	 *   each element in the Map)
	 */
	entries(): ArrayAsserter
	{
		return ArrayAsserterNoOp.INSTANCE;
	}

	/**
	 * @return {MapAsserter} the updated asserter
	 */
	entriesConsumer(): MapAsserter
	{
		return this;
	}

	/**
	 * @return {NumberAsserter} an asserter for the number of entries this Map contains
	 */
	size(): NumberAsserter
	{
		return NumberAsserterNoOp.INSTANCE;
	}

	/**
	 * @return {MapAsserter} the updated asserter
	 */
	sizeConsumer(): MapAsserter
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {MapAsserterNoOp as default};