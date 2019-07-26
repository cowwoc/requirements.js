import ArrayValidatorNoOp from "./circular_dependency/ArrayValidatorNoOpBase.js";
import ObjectValidatorNoOp from "./circular_dependency/ObjectValidatorNoOp.js";
import NumberValidatorNoOp from "./NumberValidatorNoOp.js";

/**
 * An implementation of <code>SetValidator</code> that does nothing.
 */
class SetValidatorNoOp extends ObjectValidatorNoOp
{
	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	isEmpty()
	{
		return this;
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	isNotEmpty()
	{
		return this;
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	contains()
	{
		return this;
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	containsExactly()
	{
		return this;
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	containsAny()
	{
		return this;
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	containsAll()
	{
		return this;
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	doesNotContain()
	{
		return this;
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	doesNotContainAny()
	{
		return this;
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	doesNotContainAll()
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} a validator for the Set's size
	 */
	static size()
	{
		return new NumberValidatorNoOp(this.failures);
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	sizeConsumer()
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} a validator for the Set's elements
	 */
	static asArray()
	{
		return new ArrayValidatorNoOp(this.failures);
	}

	/**
	 * @return {SetValidatorNoOp} the updated validator
	 */
	asArrayConsumer()
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SetValidatorNoOp as default};