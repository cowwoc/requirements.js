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
class SetValidatorImpl<T extends Set<E> | undefined | null, E> extends AbstractCollectionValidator<T, E>
	implements SetValidator<T, E>
{
	/**
	 * @param scope         - the application configuration
	 * @param configuration - the validator configuration
	 * @param name          - the name of the value
	 * @param value         - the value being validated
	 * @param pluralizer    - the type of items in the array
	 * @param context       - the contextual information set by a parent validator or the user
	 * @param failures      - the list of validation failures
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 * @throws AssertionError if `scope`, `configuration`, `value` `context` or `failures` are null
	 */
	public constructor(scope: ApplicationScope, configuration: Configuration, name: string,
	                   value: ValidationTarget<T>, pluralizer: Pluralizer, context: Map<string, unknown>,
	                   failures: ValidationFailure[])
	{
		super(scope, configuration, name, value, pluralizer, context, failures);
	}

	size(): UnsignedNumberValidator
	{
		this.failOnUndefinedOrNull();
		return new ObjectSizeValidatorImpl(this.scope, this._configuration, this, this.name + ".size()",
			this.value.undefinedOrNullToInvalid().map(v => this.getLength(v)), this.pluralizer, this.context,
			this.failures);
	}
}

export {SetValidatorImpl};