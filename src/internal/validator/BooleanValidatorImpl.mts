import {
	type BooleanValidator,
	type Configuration,
	type ValidationFailure,
	type ApplicationScope,
	isFalseFailed,
	isTrueFailed,
	AbstractValidator,
	ValidationTarget
} from "../internal.mjs";

/**
 * Default implementation of `BooleanValidator`.
 */
class BooleanValidatorImpl<T extends boolean | undefined | null> extends AbstractValidator<T>
	implements BooleanValidator<T>
{
	/**
	 * @param scope         - the application configuration
	 * @param configuration - the validator configuration
	 * @param name          - the name of the value
	 * @param value         - the value
	 * @param context       - the contextual information set by a parent validator or the user
	 * @param failures      - the list of validation failures
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace, or is empty
	 * @throws AssertionError if `scope`, `configuration`, `value`, `context` or `failures` are null
	 */
	public constructor(scope: ApplicationScope, configuration: Configuration, name: string,
	                   value: ValidationTarget<T>, context: Map<string, unknown>, failures: ValidationFailure[])
	{
		super(scope, configuration, name, value, context, failures);
	}

	public isTrue()
	{
		if (this.value.validationFailed(v => v))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				isTrueFailed(this).toString());
		}
		return this;
	}

	public isFalse()
	{
		if (this.value.validationFailed(v => !v))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				isFalseFailed(this).toString());
		}
		return this;
	}
}

export {BooleanValidatorImpl};