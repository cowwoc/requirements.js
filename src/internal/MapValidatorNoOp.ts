import {
	AbstractObjectValidatorNoOp,
	ArrayValidator,
	ArrayValidatorNoOp,
	MapValidator,
	SizeValidator,
	SizeValidatorNoOp,
	ValidationFailure
} from "./internal";

/**
 * An implementation of <code>MapValidator</code> that does nothing.
 */
class MapValidatorNoOp extends AbstractObjectValidatorNoOp<MapValidator>
	implements MapValidator
{
	/**
	 * Creates a new MapValidatorNoOp.
	 *
	 * @param {ValidationFailure[]} failures the list of validation failures
	 * @throws {TypeError} if <code>failures</code> is null or undefined
	 */
	constructor(failures: ValidationFailure[])
	{
		super(failures);
	}

	protected getThis(): MapValidator
	{
		return this;
	}

	/**
	 * @return {MapValidator} the updated validator
	 */
	isEmpty(): MapValidator
	{
		return this;
	}

	/**
	 * @return {MapValidator} the updated validator
	 */
	isNotEmpty(): MapValidator
	{
		return this;
	}

	/**
	 * @return {ArrayValidator} a validator for the Map's keys
	 */
	keys(): ArrayValidator
	{
		return new ArrayValidatorNoOp(this.failures);
	}

	/**
	 * @return {MapValidator} the updated validator
	 */
	keysConsumer(): MapValidator
	{
		return this;
	}

	/**
	 * @return {ArrayValidator} a validator for the Map's values
	 */
	values(): ArrayValidator
	{
		return new ArrayValidatorNoOp(this.failures);
	}

	/**
	 * @return {MapValidator} the updated validator
	 */
	valuesConsumer(): MapValidator
	{
		return this;
	}

	/**
	 * @return {ArrayValidator} a validator for the Map's entries (an array of <code>[key, value]</code>
	 *   for each element in the Map)
	 */
	entries(): ArrayValidator
	{
		return new ArrayValidatorNoOp(this.failures);
	}

	/**
	 * @return {MapValidator} the updated validator
	 */
	entriesConsumer(): MapValidator
	{
		return this;
	}

	/**
	 * @return {SizeValidator} a validator for the number of entries this Map contains
	 */
	size(): SizeValidator
	{
		return new SizeValidatorNoOp(this.failures);
	}

	/**
	 * @return {MapValidator} the updated validator
	 */
	sizeConsumer(): MapValidator
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {MapValidatorNoOp as default};