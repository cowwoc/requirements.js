import {
	ObjectValidatorNoOp,
	SetValidatorNoOp,
	SizeValidatorNoOp
} from "./internal";

/**
 * An implementation of <code>ArrayValidator</code> that does nothing.
 */
class ArrayValidatorNoOp extends ObjectValidatorNoOp
{
	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	isEmpty(): this
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	isNotEmpty(): this
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	contains(): this
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	containsExactly(): this
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	containsAny(): this
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	containsAll(): this
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	doesNotContain(): this
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	doesNotContainAny(): this
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	doesNotContainAll(): this
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	doesNotContainDuplicates(): this
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	lengthConsumer(): this
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	asSetConsumer(): this
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} a validator for the length of the array
	 */
	length(): SizeValidatorNoOp
	{
		return new SizeValidatorNoOp(this.failures);
	}

	/**
	 * @return {SetValidatorNoOp} a <code>Set</code> validator
	 */
	asSet(): SetValidatorNoOp
	{
		return new SetValidatorNoOp(this.failures);
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayValidatorNoOp as default};