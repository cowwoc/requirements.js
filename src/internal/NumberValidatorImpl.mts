import {
	AbstractNumberValidator,
	Configuration,
	type NumberValidator,
	ValidationFailure
} from "./internal.mjs";

/**
 * Default implementation of <code>NumberValidator</code>.
 */
class NumberValidatorImpl extends AbstractNumberValidator<NumberValidator>
	implements NumberValidator
{
	/**
	 * Creates a new NumberValidator.
	 *
	 * @param configuration - the instance configuration
	 * @param actual - the actual value
	 * @param name - (optional) the name of the value
	 * @param failures - the list of validation failures
	 * @throws TypeError if <code>configuration</code> or <code>name</code> are null or undefined
	 * @throws RangeError if <code>name</code> is empty
	 */
	constructor(configuration: Configuration, actual: unknown, name: string, failures: ValidationFailure[])
	{
		super(configuration, actual, name, failures);
	}

	protected getThis(): NumberValidator
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {NumberValidatorImpl as default};