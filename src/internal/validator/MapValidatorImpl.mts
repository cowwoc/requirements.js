import {
	type Configuration,
	type MapValidator,
	type ValidationFailure,
	ObjectSizeValidatorImpl,
	Pluralizer,
	type ApplicationScope,
	ArrayValidatorImpl,
	AbstractValidator,
	ValidationTarget,
	objectIsEmpty,
	objectIsNotEmpty
} from "../internal.mjs";

/**
 * Default implementation of `MapValidator`.
 *
 * @typeParam T - the type of the value
 * @typeParam K - the type of keys in the map
 * @typeParam V - the type of values in the map
 */
class MapValidatorImpl<T extends Map<K, V> | undefined | null, K, V> extends AbstractValidator<T>
	implements MapValidator<T, K, V>
{
	/**
	 * Creates a new MapValidatorImpl.
	 *
	 * @param scope         - the application configuration
	 * @param configuration - the validator configuration
	 * @param name          - the name of the value
	 * @param value         - the value being validated
	 * @param context       - the contextual information set by the user
	 * @param failures      - the list of validation failures
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace, or is empty
	 * @throws AssertionError if `scope`, `configuration, `value`, `context or `failures` are null
	 */
	public constructor(scope: ApplicationScope, configuration: Configuration, name: string,
	                   value: ValidationTarget<T>, context: Map<string, unknown>,
	                   failures: ValidationFailure[])
	{
		super(scope, configuration, name, value, context, failures);
	}

	isEmpty()
	{
		if (this.value.validationFailed(v => v.size === 0))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				objectIsEmpty(this).toString());
		}
		return this;
	}

	isNotEmpty()
	{
		if (this.value.validationFailed(v => v.size !== 0))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				objectIsNotEmpty(this).toString());
		}
		return this;
	}

	keys()
	{
		this.failOnUndefinedOrNull();
		const undefinedOrNullToInvalid = this.value.undefinedOrNullToInvalid();
		const newValidator = new ArrayValidatorImpl(this.scope, this._configuration, this.name + ".keys()",
			undefinedOrNullToInvalid.map(v => [...v.keys()]), Pluralizer.KEY, this.context, this.failures);
		undefinedOrNullToInvalid.ifValid(v => newValidator.withContext(v, this.name));
		return newValidator;
	}

	values()
	{
		this.failOnUndefinedOrNull();
		const undefinedOrNullToInvalid = this.value.undefinedOrNullToInvalid();
		const newValidator = new ArrayValidatorImpl(this.scope, this._configuration, this.name + ".values()",
			undefinedOrNullToInvalid.map(v => [...v.values()]), Pluralizer.VALUE, this.context, this.failures);
		undefinedOrNullToInvalid.ifValid(v => newValidator.withContext(v, this.name));
		return newValidator;
	}

	entries()
	{
		this.failOnUndefinedOrNull();
		const undefinedOrNullToInvalid = this.value.undefinedOrNullToInvalid();
		const newValidator = new ArrayValidatorImpl(this.scope, this._configuration, this.name + ".entries()",
			undefinedOrNullToInvalid.map(v => [...v.entries()]), Pluralizer.ENTRY, this.context, this.failures);
		undefinedOrNullToInvalid.ifValid(v => newValidator.withContext(v, this.name));
		return newValidator;
	}

	size()
	{
		this.failOnUndefinedOrNull();
		return new ObjectSizeValidatorImpl(this.scope, this._configuration, this, this.name + ".size()",
			this.value.undefinedOrNullToInvalid().map(v => v.size), Pluralizer.ELEMENT, this.context,
			this.failures);
	}
}

export {MapValidatorImpl};