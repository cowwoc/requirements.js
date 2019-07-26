import ObjectValidatorNoOp from "./circular_dependency/ObjectValidatorNoOp.js";
import SizeValidatorNoOp from "./SizeValidatorNoOp.js";

/**
 * An implementation of <code>String</code> that does nothing.
 */
class StringValidatorNoOp extends ObjectValidatorNoOp
{
	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	startsWith()
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	doesNotStartWith()
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	contains()
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	doesNotContain()
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	endsWith()
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	doesNotEndWith()
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	isEmpty()
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	isNotEmpty()
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} a validator for the trimmed representation of the actual value
	 */
	trim()
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	trimConsumer()
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} a validator for the length of the string
	 */
	static length()
	{
		return new SizeValidatorNoOp(this.failures);
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	lengthConsumer()
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	asString()
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	asStringConsumer()
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	asInetAddressConsumer()
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {StringValidatorNoOp as default};