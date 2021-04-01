import {
	AbstractNumberValidatorNoOp,
	NumberValidator,
	ValidationFailure
} from "./internal";

/**
 * An implementation of <code>NumberValidator</code> that does nothing.
 */
class NumberValidatorNoOp extends AbstractNumberValidatorNoOp<NumberValidator>
	implements NumberValidator
{
	/**
	 * Creates a new NumberValidatorNoOp.
	 *
	 * @param {ValidationFailure[]} failures the list of validation failures
	 * @throws {TypeError} if <code>failures</code> is null or undefined
	 */
	constructor(failures: ValidationFailure[])
	{
		super(failures);
	}

	protected getThis(): NumberValidator
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {NumberValidatorNoOp as default};