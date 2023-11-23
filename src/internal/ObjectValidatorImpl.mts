import type {
	Configuration,
	ObjectValidator,
	ValidationFailure
} from "./internal.mjs";
import {AbstractObjectValidator} from "./internal.mjs";

/**
 * Default implementation of <code>ObjectValidator</code>.
 *
 * @typeParam T - the type the actual value
 */
class ObjectValidatorImpl<T> extends AbstractObjectValidator<ObjectValidator<T>, T>
	implements ObjectValidator<T>
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
	constructor(configuration: Configuration, actual: T, name: string,
		failures: ValidationFailure[])
	{
		super(configuration, actual, name, failures);
	}

	protected getThis(): ObjectValidator<T>
	{
		return this;
	}
}

export {ObjectValidatorImpl};