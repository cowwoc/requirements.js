import {
	type Configuration,
	type StringValidator,
	type ValidationFailure,
	Pluralizer,
	ObjectSizeValidatorImpl,
	type ApplicationScope,
	type UnsignedNumberValidator,
	AbstractValidator,
	ValidationTarget,
	stringStartsWith,
	stringDoesNotStartWith,
	stringEndsWith,
	stringDoesNotEndWith,
	stringContains,
	stringDoesNotContain,
	stringMatches,
	stringIsTrimmed,
	objectIsEmpty,
	objectIsNotEmpty
} from "../internal.mjs";


/**
 * Default implementation of `StringValidator`.
 */
class StringValidatorImpl extends AbstractValidator<StringValidator, string>
	implements StringValidator
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
	                   value: ValidationTarget<string>, context: Map<string, unknown>,
	                   failures: ValidationFailure[])
	{
		super(scope, configuration, name, value, context, failures);
	}

	isEmpty(): StringValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && v.length === 0))
		{
			this.addRangeError(
				objectIsEmpty(this).toString());
		}
		return this;
	}

	isNotEmpty(): StringValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && v.length !== 0))
		{
			this.addRangeError(
				objectIsNotEmpty(this).toString());
		}
		return this;
	}

	isTrimmed(): StringValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => !/^\s|\s$/.test(v)))
		{
			this.addRangeError(
				stringIsTrimmed(this).toString());
		}
		return this;
	}

	startsWith(prefix: string): StringValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && v.startsWith(prefix)))
		{
			this.addRangeError(
				stringStartsWith(this, prefix).toString());
		}
		return this;
	}

	doesNotStartWith(prefix: string): StringValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && !v.startsWith(prefix)))
		{
			this.addRangeError(
				stringDoesNotStartWith(this, prefix).toString());
		}
		return this;
	}

	endsWith(suffix: string): StringValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && v.endsWith(suffix)))
		{
			this.addRangeError(
				stringEndsWith(this, suffix).toString());
		}
		return this;
	}

	doesNotEndWith(suffix: string): StringValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && !v.endsWith(suffix)))
		{
			this.addRangeError(
				stringDoesNotEndWith(this, suffix).toString());
		}
		return this;
	}

	contains(expected: string): StringValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && v.includes(expected)))
		{
			this.addRangeError(
				stringContains(this, expected).toString());
		}
		return this;
	}

	doesNotContain(unwanted: string): StringValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && !v.includes(unwanted)))
		{
			this.addRangeError(
				stringDoesNotContain(this, unwanted).toString());
		}
		return this;
	}

	matches(regex: RegExp): StringValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && regex.test(v)))
		{
			this.addRangeError(
				stringMatches(this, regex.source).toString());
		}
		return this;
	}

	length(): UnsignedNumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		return new ObjectSizeValidatorImpl(this.scope, this._configuration, this, this.name + ".length()",
			this.value.undefinedOrNullToInvalid().map(v => v.length), Pluralizer.ELEMENT, this.context,
			this.failures);
	}
}

export {StringValidatorImpl};