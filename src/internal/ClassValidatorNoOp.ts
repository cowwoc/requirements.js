import {
	AbstractObjectValidatorNoOp,
	ClassValidator,
	ValidationFailure
} from "./internal";

/**
 * An implementation of <code>ClassValidator</code> that does nothing.
 */
class ClassValidatorNoOp extends AbstractObjectValidatorNoOp<ClassValidator>
	implements ClassValidator
{
	/**
	 * Creates a new ClassValidatorNoOp.
	 *
	 * @param {ValidationFailure[]} failures the list of validation failures
	 * @throws {TypeError} if <code>failures</code> is null or undefined
	 */
	constructor(failures: ValidationFailure[])
	{
		super(failures);
	}

	protected getThis(): ClassValidator
	{
		return this;
	}

	/**
	 * @return {ClassValidator} the updated validator
	 */
	isSupertypeOf(): ClassValidator
	{
		return this;
	}

	/**
	 * @return {ClassValidator} the updated validator
	 */
	isSubtypeOf(): ClassValidator
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ClassValidatorNoOp as default};