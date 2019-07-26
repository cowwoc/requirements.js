import ArrayValidatorNoOp from "./circular_dependency/ArrayValidatorNoOpBase.js";
import ObjectValidatorNoOp from "./circular_dependency/ObjectValidatorNoOp.js";
import NumberValidatorNoOp from "./NumberValidatorNoOp.js";

/**
 * An implementation of <code>Map</code> that does nothing.
 */
class MapValidatorNoOp extends ObjectValidatorNoOp
{
	/**
	 * @return {MapValidatorNoOp} the updated validator
	 */
	isEmpty()
	{
		return this;
	}

	/**
	 * @return {MapValidatorNoOp} the updated validator
	 */
	isNotEmpty()
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} a validator for the Map's keys
	 */
	static keys()
	{
		return new ArrayValidatorNoOp(this.failures);
	}

	/**
	 * @return {MapValidatorNoOp} the updated validator
	 */
	keysConsumer()
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} a validator for the Map's values
	 */
	static values()
	{
		return new ArrayValidatorNoOp(this.failures);
	}

	/**
	 * @return {MapValidatorNoOp} the updated validator
	 */
	valuesConsumer()
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} a validator for the Map's entries (an array of <code>[key, value]</code> for
	 *   each element in the Map)
	 */
	static entries()
	{
		return new ArrayValidatorNoOp(this.failures);
	}

	/**
	 * @return {MapValidatorNoOp} the updated validator
	 */
	entriesConsumer()
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} a validator for the number of entries this Map contains
	 */
	static size()
	{
		return new NumberValidatorNoOp(this.failures);
	}

	/**
	 * @return {MapValidatorNoOp} the updated validator
	 */
	sizeConsumer()
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {MapValidatorNoOp as default};