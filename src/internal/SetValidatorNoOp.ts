import {
	ArrayValidatorNoOp,
	NumberValidatorNoOp,
	ObjectValidatorNoOp
} from "./internal";

/**
 * An implementation of <code>SetValidator</code> that does nothing.
 */
class SetValidatorNoOp extends ObjectValidatorNoOp
{
	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	isEmpty(): this
	{
		return this;
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	isNotEmpty(): this
	{
		return this;
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	contains(): this
	{
		return this;
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	containsExactly(): this
	{
		return this;
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	containsAny(): this
	{
		return this;
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	containsAll(): this
	{
		return this;
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	doesNotContain(): this
	{
		return this;
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	doesNotContainAny(): this
	{
		return this;
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	doesNotContainAll(): this
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} a validator for the Set's size
	 */
	size(): NumberValidatorNoOp
	{
		return new NumberValidatorNoOp(this.failures);
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	sizeConsumer(): this
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} a validator for the Set's elements
	 */
	asArray(): ArrayValidatorNoOp
	{
		return new ArrayValidatorNoOp(this.failures);
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	asArrayConsumer(): this
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SetValidatorNoOp as default};