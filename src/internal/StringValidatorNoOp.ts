import {
	ObjectValidatorNoOp,
	SizeValidatorNoOp
} from "./internal";

/**
 * An implementation of <code>String</code> that does nothing.
 */
class StringValidatorNoOp extends ObjectValidatorNoOp
{
	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	startsWith(): this
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	doesNotStartWith(): this
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	contains(): this
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	doesNotContain(): this
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	endsWith(): this
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	doesNotEndWith(): this
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	isEmpty(): this
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	isNotEmpty(): this
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} a validator for the trimmed representation of the actual value
	 */
	trim(): this
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	trimConsumer(): this
	{
		return this;
	}

	/**
	 * @return {SizeValidatorNoOp} a validator for the length of the string
	 */
	length(): SizeValidatorNoOp
	{
		return new SizeValidatorNoOp(this.failures);
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	lengthConsumer(): this
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	asString(): this
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	asStringConsumer(): this
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} the updated validator
	 */
	asInetAddressConsumer(): this
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {StringValidatorNoOp as default};