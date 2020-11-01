import {
	ArrayValidatorNoOp,
	NumberValidatorNoOp,
	ObjectValidatorNoOp
} from "./internal";

/**
 * An implementation of <code>Map</code> that does nothing.
 */
class MapValidatorNoOp extends ObjectValidatorNoOp
{
	/**
	 * @return {MapValidatorNoOp} the updated validator
	 */
	isEmpty(): this
	{
		return this;
	}

	/**
	 * @return {MapValidatorNoOp} the updated validator
	 */
	isNotEmpty(): this
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} a validator for the Map's keys
	 */
	keys(): ArrayValidatorNoOp
	{
		return new ArrayValidatorNoOp(this.failures);
	}

	/**
	 * @return {MapValidatorNoOp} the updated validator
	 */
	keysConsumer(): this
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} a validator for the Map's values
	 */
	values(): ArrayValidatorNoOp
	{
		return new ArrayValidatorNoOp(this.failures);
	}

	/**
	 * @return {MapValidatorNoOp} the updated validator
	 */
	valuesConsumer(): this
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} a validator for the Map's entries (an array of <code>[key, value]</code>
	 *   for each element in the Map)
	 */
	entries(): ArrayValidatorNoOp
	{
		return new ArrayValidatorNoOp(this.failures);
	}

	/**
	 * @return {MapValidatorNoOp} the updated validator
	 */
	entriesConsumer(): this
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} a validator for the number of entries this Map contains
	 */
	size(): NumberValidatorNoOp
	{
		return new NumberValidatorNoOp(this.failures);
	}

	/**
	 * @return {MapValidatorNoOp} the updated validator
	 */
	sizeConsumer(): this
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {MapValidatorNoOp as default};