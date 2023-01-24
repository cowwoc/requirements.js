import
{
	AbstractObjectValidatorNoOp,
	BooleanValidator,
	ValidationFailure
} from "./internal.js";

/**
 * An implementation of <code>BooleanValidator</code> that does nothing.
 */
class BooleanValidatorNoOp extends AbstractObjectValidatorNoOp<BooleanValidator>
	implements BooleanValidator
{
	/**
	 * Creates a new BooleanValidatorNoOp.
	 *
	 * @param {ValidationFailure[]} failures the list of validation failures
	 * @throws {TypeError} if <code>failures</code> is null or undefined
	 */
	constructor(failures: ValidationFailure[])
	{
		super(failures);
	}

	protected getThis(): BooleanValidator
	{
		return this;
	}

	/**
	 * @return {BooleanValidator} the updated validator
	 */
	isTrue(): BooleanValidator
	{
		return this;
	}

	/**
	 * @return {BooleanValidator} the updated validator
	 */
	isFalse(): BooleanValidator
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {BooleanValidatorNoOp as default};