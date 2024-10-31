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
	objectIsNotEmpty,
	stringDoesNotContainWhitespace
} from "../internal.mjs";


/**
 * Default implementation of `StringValidator`.
 */
class StringValidatorImpl<T extends string | undefined | null> extends AbstractValidator<T>
	implements StringValidator<T>
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
	                   value: ValidationTarget<T>, context: Map<string, unknown>,
	                   failures: ValidationFailure[])
	{
		super(scope, configuration, name, value, context, failures);
	}

	isEmpty(): this
	{
		if (this.value.validationFailed(v => v.length === 0))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				objectIsEmpty(this).toString());
		}
		return this;
	}

	isNotEmpty(): this
	{
		if (this.value.validationFailed(v => v.length !== 0))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				objectIsNotEmpty(this).toString());
		}
		return this;
	}

	isTrimmed(): this
	{
		if (this.value.validationFailed(v => !/^\s|\s$/.test(v)))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				stringIsTrimmed(this).toString());
		}
		return this;
	}

	startsWith(prefix: string): this
	{
		if (this.value.validationFailed(v => v.startsWith(prefix)))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				stringStartsWith(this, prefix).toString());
		}
		return this;
	}

	doesNotStartWith(prefix: string): this
	{
		if (this.value.validationFailed(v => !v.startsWith(prefix)))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				stringDoesNotStartWith(this, prefix).toString());
		}
		return this;
	}

	endsWith(suffix: string): this
	{
		if (this.value.validationFailed(v => v.endsWith(suffix)))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				stringEndsWith(this, suffix).toString());
		}
		return this;
	}

	doesNotEndWith(suffix: string): this
	{
		if (this.value.validationFailed(v => !v.endsWith(suffix)))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				stringDoesNotEndWith(this, suffix).toString());
		}
		return this;
	}

	contains(expected: string): this
	{
		if (this.value.validationFailed(v => v.includes(expected)))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				stringContains(this, expected).toString());
		}
		return this;
	}

	doesNotContain(unwanted: string): this
	{
		if (this.value.validationFailed(v => !v.includes(unwanted)))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				stringDoesNotContain(this, unwanted).toString());
		}
		return this;
	}

	doesNotContainWhitespace(): this
	{
		if (this.value.validationFailed(v => !/\s/.test(v)))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				stringDoesNotContainWhitespace(this).toString());
		}
		return this;
	}

	matches(regex: RegExp): this
	{
		if (this.value.validationFailed(v => regex.test(v)))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				stringMatches(this, regex.source).toString());
		}
		return this;
	}

	length(): UnsignedNumberValidator
	{
		this.failOnUndefinedOrNull();
		return new ObjectSizeValidatorImpl(this.scope, this._configuration, this, this.name + ".length()",
			this.value.undefinedOrNullToInvalid().map(v => v.length), Pluralizer.CHARACTER, this.context,
			this.failures);
	}
}

export {StringValidatorImpl};