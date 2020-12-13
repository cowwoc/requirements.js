import {
	AbstractObjectValidatorNoOp,
	ArrayValidator,
	SetValidator,
	SetValidatorNoOp,
	SizeValidator,
	SizeValidatorNoOp,
	ValidationFailure
} from "./internal";

/**
 * An implementation of <code>ArrayValidator</code> that does nothing.
 */
class ArrayValidatorNoOp extends AbstractObjectValidatorNoOp<ArrayValidator>
	implements ArrayValidator
{
	/**
	 * Creates a new ArrayValidatorNoOp.
	 *
	 * @param {ValidationFailure[]} failures the list of validation failures
	 * @throws {TypeError} if <code>failures</code> is null or undefined
	 */
	constructor(failures: ValidationFailure[])
	{
		super(failures);
	}

	protected getThis(): ArrayValidator
	{
		return this;
	}

	/**
	 * @return {ArrayValidator} the updated validator
	 */
	isEmpty(): ArrayValidator
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayValidator} the updated validator
	 */
	isNotEmpty(): ArrayValidator
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayValidator} the updated validator
	 */
	contains(): ArrayValidator
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayValidator} the updated validator
	 */
	containsExactly(): ArrayValidator
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayValidator} the updated validator
	 */
	containsAny(): ArrayValidator
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayValidator} the updated validator
	 */
	containsAll(): ArrayValidator
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayValidator} the updated validator
	 */
	doesNotContain(): ArrayValidator
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayValidator} the updated validator
	 */
	doesNotContainAny(): ArrayValidator
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayValidator} the updated validator
	 */
	doesNotContainAll(): ArrayValidator
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayValidator} the updated validator
	 */
	doesNotContainDuplicates(): ArrayValidator
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayValidator} the updated validator
	 */
	lengthConsumer(): ArrayValidator
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayValidator} the updated validator
	 */
	asSetConsumer(): ArrayValidator
	{
		return this.getThis();
	}

	/**
	 * @return {SizeValidator} a validator for the length of the array
	 */
	length(): SizeValidator
	{
		return new SizeValidatorNoOp(this.failures);
	}

	/**
	 * @return {SetValidator} a <code>Set</code> validator
	 */
	asSet(): SetValidator
	{
		return new SetValidatorNoOp(this.failures);
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayValidatorNoOp as default};