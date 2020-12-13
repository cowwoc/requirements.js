import {
	AbstractObjectValidatorNoOp,
	ArrayValidator,
	ArrayValidatorNoOp,
	SetValidator,
	SizeValidator,
	SizeValidatorNoOp,
	ValidationFailure
} from "./internal";

/**
 * An implementation of <code>SetValidator</code> that does nothing. A validator that ignores all
 * subsequent failures because they are guaranteed to fail and wouldn't add any value to the end-user. For
 * example, an attempt was made to dereference null or cast the value to an incompatible type.
 */
class SetValidatorNoOp extends AbstractObjectValidatorNoOp<SetValidator>
	implements SetValidator
{
	/**
	 * Creates a new SetValidatorNoOp.
	 *
	 * @param {ValidationFailure[]} failures the list of validation failures
	 * @throws {TypeError} if <code>failures</code> is null or undefined
	 */
	constructor(failures: ValidationFailure[])
	{
		super(failures);
	}

	protected getThis(): SetValidator
	{
		return this;
	}

	/**
	 * @return {SetValidator} the updated validator
	 */
	isEmpty(): SetValidator
	{
		return this;
	}

	/**
	 * @return {SetValidator} the updated validator
	 */
	isNotEmpty(): SetValidator
	{
		return this;
	}

	/**
	 * @return {SetValidator} the updated validator
	 */
	contains(): SetValidator
	{
		return this;
	}

	/**
	 * @return {SetValidator} the updated validator
	 */
	containsExactly(): SetValidator
	{
		return this;
	}

	/**
	 * @return {SetValidator} the updated validator
	 */
	containsAny(): SetValidator
	{
		return this;
	}

	/**
	 * @return {SetValidator} the updated validator
	 */
	containsAll(): SetValidator
	{
		return this;
	}

	/**
	 * @return {SetValidator} the updated validator
	 */
	doesNotContain(): SetValidator
	{
		return this;
	}

	/**
	 * @return {SetValidator} the updated validator
	 */
	doesNotContainAny(): SetValidator
	{
		return this;
	}

	/**
	 * @return {SetValidator} the updated validator
	 */
	doesNotContainAll(): SetValidator
	{
		return this;
	}

	/**
	 * @return {SizeValidator} a validator for the Set's size
	 */
	size(): SizeValidator
	{
		return new SizeValidatorNoOp(this.failures);
	}

	/**
	 * @return {SetValidator} the updated validator
	 */
	sizeConsumer(): SetValidator
	{
		return this;
	}

	/**
	 * @return {ArrayValidator} a validator for the Set's elements
	 */
	asArray(): ArrayValidator
	{
		return new ArrayValidatorNoOp(this.failures);
	}

	/**
	 * @return {SetValidator} the updated validator
	 */
	asArrayConsumer(): SetValidator
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SetValidatorNoOp as default};