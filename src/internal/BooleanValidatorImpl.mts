import type {
	BooleanValidator,
	Configuration
} from "./internal.mjs";
import {
	AbstractObjectValidator,
	ValidationFailure
} from "./internal.mjs";

/**
 * Default implementation of <code>BooleanValidator</code>.
 */
class BooleanValidatorImpl extends AbstractObjectValidator<BooleanValidator, boolean>
	implements BooleanValidator
{
	/**
	 * Creates a new BooleanValidator.
	 *
	 * @param configuration - the instance configuration
	 * @param actual - the actual value
	 * @param name - the name of the value
	 * @param failures - the list of validation failures
	 * @throws TypeError if <code>configuration</code> or <code>name</code> are null or undefined
	 * @throws RangeError if <code>name</code> is empty
	 */
	constructor(configuration: Configuration, actual: boolean | undefined, name: string,
		failures: ValidationFailure[])
	{
		super(configuration, actual, name, failures);
	}

	isTrue(): BooleanValidator
	{
		if (this.actual === undefined || !this.actual)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be true.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}

	isFalse(): BooleanValidator
	{
		if (this.actual === undefined || this.actual)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be false.").
				addContext("Actual", this.actual);
			this.failures.push(failure);
		}
		return this;
	}
}

export {BooleanValidatorImpl};