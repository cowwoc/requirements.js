import {
	AbstractObjectValidatorNoOp,
	ObjectValidator,
	ValidationFailure
} from "./internal";

/**
 * An implementation of <code>ObjectValidator</code> that does nothing. A validator that ignores all
 * subsequent failures because they are guaranteed to fail and wouldn't add any value to the end-user. For
 * example, an attempt was made to dereference null or cast the value to an incompatible type.
 */
class ObjectValidatorNoOp extends AbstractObjectValidatorNoOp<ObjectValidator>
	implements ObjectValidator
{
	/**
	 * Creates a new ObjectValidatorNoOp.
	 *
	 * @param {ValidationFailure[]} failures the list of validation failures
	 * @throws {TypeError} if <code>failures</code> is null or undefined
	 */
	constructor(failures: ValidationFailure[])
	{
		super(failures);
	}

	protected getThis(): ObjectValidator
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ObjectValidatorNoOp as default};