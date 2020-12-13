import {
	AbstractNumberValidatorNoOp,
	SizeValidator,
	ValidationFailure
} from "./internal";

/**
 * An implementation of <code>SizeValidator</code> that does nothing. A validator that ignores all
 * subsequent failures because they are guaranteed to fail and wouldn't add any value to the end-user. For
 * example, an attempt was made to dereference null or cast the value to an incompatible type.
 */
class SizeValidatorNoOp extends AbstractNumberValidatorNoOp<SizeValidator>
	implements SizeValidator
{
	/**
	 * Creates a new SizeValidatorNoOp.
	 *
	 * @param {ValidationFailure[]} failures the list of validation failures
	 * @throws {TypeError} if <code>failures</code> is null or undefined
	 */
	constructor(failures: ValidationFailure[])
	{
		super(failures);
	}

	protected getThis(): SizeValidator
	{
		return this;
	}

	/**
	 * @return {SizeValidator} the updated validator
	 */
	isGreaterThanOrEqualTo(): SizeValidator
	{
		return this;
	}

	/**
	 * @return {SizeValidator} the updated validator
	 */
	isGreaterThan(): SizeValidator
	{
		return this;
	}

	/**
	 * @return {SizeValidator} the updated validator
	 */
	isLessThanOrEqualTo(): SizeValidator
	{
		return this;
	}

	/**
	 * @return {SizeValidator} the updated validator
	 */
	isLessThan(): SizeValidator
	{
		return this;
	}

	/**
	 * @return {SizeValidator} the updated validator
	 */
	isNotPositive(): SizeValidator
	{
		return this;
	}

	/**
	 * @return {SizeValidator} the updated validator
	 */
	isPositive(): SizeValidator
	{
		return this;
	}

	/**
	 * @return {SizeValidator} the updated validator
	 */
	isNotZero(): SizeValidator
	{
		return this;
	}

	/**
	 * @return {SizeValidator} the updated validator
	 */
	isZero(): SizeValidator
	{
		return this;
	}

	/**
	 * @return {SizeValidator} the updated validator
	 */
	isNotNegative(): SizeValidator
	{
		return this;
	}

	/**
	 * @return {SizeValidator} the updated validator
	 */
	isNegative(): SizeValidator
	{
		return this;
	}

	/**
	 * @return {SizeValidator} the updated validator
	 */
	isBetween(): SizeValidator
	{
		return this;
	}

	/**
	 * @return {SizeValidator} the updated validator
	 */
	isBetweenClosed(): SizeValidator
	{
		return this;
	}

	/**
	 * @return {SizeValidator} the updated validator
	 */
	isEqualTo(): SizeValidator
	{
		return this;
	}

	/**
	 * @return {SizeValidator} the updated validator
	 */
	isNotEqualTo(): SizeValidator
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SizeValidatorNoOp as default};