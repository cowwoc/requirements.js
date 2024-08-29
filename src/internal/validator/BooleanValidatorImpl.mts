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
class BooleanValidatorImpl extends AbstractValidator<BooleanValidator, boolean>
	implements BooleanValidator
{
	/**
	 * @param scope         - the application configuration
	 * @param configuration - the validator configuration
	 * @param name          - the name of the value
	 * @param value         - the value
	 * @param context       - the contextual information set by a parent validator or the user
	 * @param failures      - the list of validation failures
	 * @throws TypeError if `name` is null
	 * @throws RangeError if `name` contains whitespace, or is empty
	 * @throws AssertionError if `scope`, `configuration`, `value`, `context` or `failures` are null
	 */
	public constructor(scope: ApplicationScope, configuration: Configuration, name: string,
	                   value: ValidationTarget<boolean>, context: Map<string, unknown>,
	                   failures: ValidationFailure[])
	{
		super(scope, configuration, name, value, context, failures);
	}

	public isTrue()
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && v))
		{
			this.addRangeError(
				isTrueFailed(this).toString());
		}
		return this;
	}

	public isFalse()
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && !v))
		{
			this.addRangeError(
				isFalseFailed(this).toString());
		}
		return this;
	}
}

export {BooleanValidatorImpl};