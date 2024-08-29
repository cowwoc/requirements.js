import {
	type Configuration,
	type SetValidator,
	type ValidationFailure,
	AbstractCollectionValidator,
	Pluralizer,
	type ApplicationScope,
	type UnsignedNumberValidator,
	ObjectSizeValidatorImpl,
	ValidationTarget
} from "../internal.mjs";

/**
 * Default implementation of `SetValidator`.
 */
class SetValidatorImpl<E> extends AbstractCollectionValidator<SetValidator<E>, Set<E>, E>
	implements SetValidator<E>
{
	/**
	 * @param scope         - the application configuration
	 * @param configuration - the validator configuration
	 * @param name          - the name of the value
	 * @param value         - the value being validated
	 * @param pluralizer    - the type of items in the array
	 * @param context       - the contextual information set by a parent validator or the user
	 * @param failures      - the list of validation failures
	 * @throws TypeError if `name` is null
	 * @throws RangeError if `name` contains whitespace or is empty
	 * @throws AssertionError if `scope`, `configuration`, `value` `context` or `failures` are null
	 */
	public constructor(scope: ApplicationScope, configuration: Configuration, name: string,
	                   value: ValidationTarget<Set<E>>, pluralizer: Pluralizer, context: Map<string, unknown>,
	                   failures: ValidationFailure[])
	{
		super(scope, configuration, name, value, pluralizer, context, failures);
	}

	size(): UnsignedNumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		return new ObjectSizeValidatorImpl(this.scope, this._configuration, this, this.name + ".size()",
			this.value.undefinedOrNullToInvalid().map(v => this.getLength(v)), this.pluralizer, this.context,
			this.failures);
	}
}

export {SetValidatorImpl};