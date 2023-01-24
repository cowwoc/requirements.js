import
{
	AbstractObjectValidatorNoOp,
	NumberValidator,
	NumberValidatorNoOp,
	StringValidator,
	ValidationFailure
} from "./internal.js";

/**
 * An implementation of <code>StringValidator</code> that does nothing. A validator that ignores all
 * subsequent failures because they are guaranteed to fail and wouldn't add any value to the end-user. For
 * example, an attempt was made to dereference null or cast the value to an incompatible type.
 */
class StringValidatorNoOp extends AbstractObjectValidatorNoOp<StringValidator>
	implements StringValidator
{
	/**
	 * Creates a new StringValidatorNoOp.
	 *
	 * @param {ValidationFailure[]} failures the list of validation failures
	 * @throws {TypeError} if <code>failures</code> is null or undefined
	 */
	constructor(failures: ValidationFailure[])
	{
		super(failures);
	}

	protected getThis(): StringValidator
	{
		return this;
	}

	/**
	 * @return {StringValidator} the updated validator
	 */
	startsWith(): StringValidator
	{
		return this;
	}

	/**
	 * @return {StringValidator} the updated validator
	 */
	doesNotStartWith(): StringValidator
	{
		return this;
	}

	/**
	 * @return {StringValidator} the updated validator
	 */
	contains(): StringValidator
	{
		return this;
	}

	/**
	 * @return {StringValidator} the updated validator
	 */
	doesNotContain(): StringValidator
	{
		return this;
	}

	/**
	 * @return {StringValidator} the updated validator
	 */
	endsWith(): StringValidator
	{
		return this;
	}

	/**
	 * @return {StringValidator} the updated validator
	 */
	doesNotEndWith(): StringValidator
	{
		return this;
	}

	/**
	 * @return {StringValidator} the updated validator
	 */
	isEmpty(): StringValidator
	{
		return this;
	}

	/**
	 * @return {StringValidator} the updated validator
	 */
	isNotEmpty(): StringValidator
	{
		return this;
	}

	/**
	 * @return {StringValidator} a validator for the trimmed representation of the actual value
	 */
	trim(): StringValidator
	{
		return this;
	}

	/**
	 * @return {StringValidator} the updated validator
	 */
	trimConsumer(): StringValidator
	{
		return this;
	}

	/**
	 * @return {StringValidator} the updated validator
	 */
	isTrimmed(): StringValidator
	{
		return this;
	}

	/**
	 * @return {NumberValidator} a validator for the length of the string
	 */
	length(): NumberValidator
	{
		return new NumberValidatorNoOp(this.failures);
	}

	/**
	 * @return {StringValidator} the updated validator
	 */
	lengthConsumer(): StringValidator
	{
		return this;
	}

	/**
	 * @return {StringValidator} the updated validator
	 */
	asString(): StringValidator
	{
		return this;
	}

	/**
	 * @return {StringValidator} the updated validator
	 */
	asStringConsumer(): StringValidator
	{
		return this;
	}

	/**
	 * @return {StringValidator} the updated validator
	 */
	asInetAddressConsumer(): StringValidator
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {StringValidatorNoOp as default};