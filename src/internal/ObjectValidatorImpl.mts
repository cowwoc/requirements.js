import {
	AbstractObjectValidator,
	Configuration,
	type ObjectValidator,
	ValidationFailure
} from "./internal.mjs";

/**
 * Default implementation of <code>ObjectValidator</code>.
 */
class ObjectValidatorImpl extends AbstractObjectValidator<ObjectValidator>
	implements ObjectValidator
{
	/**
	 * Creates a new ObjectValidator.
	 *
	 * @param configuration - the instance configuration
	 * @param actual - the actual value
	 * @param name - the name of the value
	 * @param failures - the list of validation failures
	 * @throws TypeError if <code>configuration</code> or <code>name</code> are null or undefined
	 * @throws RangeError if <code>name</code> is empty
	 */
	constructor(configuration: Configuration, actual: unknown, name: string,
		failures: ValidationFailure[])
	{
		super(configuration, actual, name, failures);
	}

	protected getThis(): ObjectValidator
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ObjectValidatorImpl as default};