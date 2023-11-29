import type {
	Configuration,
	NumberValidator,
	ValidationFailure
} from "./internal.mjs";
import {AbstractNumberValidator} from "./internal.mjs";

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
	constructor(configuration: Configuration, actual: number | undefined, name: string, failures: ValidationFailure[])
	{
		super(configuration, actual, name, failures);
	}
}

export {NumberValidatorImpl};