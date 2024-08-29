import {
	type Configuration,
	type ValidationFailure,
	type ApplicationScope,
	type ArrayValidator,
	AbstractCollectionValidator,
	ValidationTarget,
	Pluralizer,
	collectionIsSorted,
	type UnsignedNumberValidator,
	ObjectSizeValidatorImpl,
} from "../internal.mjs";
import isEqual from "lodash.isequal";

/**
 * Default implementation of `ArrayValidator`.
 */
class ArrayValidatorImpl<E> extends AbstractCollectionValidator<ArrayValidator<E>, E[], E>
	implements ArrayValidator<E>
{
	/**
	 * @param scope         - the application configuration
	 * @param configuration - the validator configuration
	 * @param name          - the name of the value
	 * @param value         - the value
	 * @param pluralizer    - the type of items in the array
	 * @param context       - the contextual information set by a parent validator or the user
	 * @param failures      - the list of validation failures
	 * @throws TypeError if `name` is null
	 * @throws RangeError if `name` contains whitespace, or is empty
	 * @throws AssertionError if `scope`, `configuration`, `value`, `context` or `failures` are null
	 */
	public constructor(scope: ApplicationScope, configuration: Configuration, name: string,
	                   value: ValidationTarget<E[]>, pluralizer: Pluralizer, context: Map<string, unknown>,
	                   failures: ValidationFailure[])
	{
		super(scope, configuration, name, value, pluralizer, context, failures);
	}

	isSorted(comparator: (first: unknown, second: unknown) => number): ArrayValidator<E>
	{
		if (this.value.isNull())
			this.onNull();
		const sorted = this.value.map(v =>
		{
			const valueAsList = this.collectionAsArray(v);
			const sortedList = [...valueAsList];
			sortedList.sort(comparator);
			if (isEqual(valueAsList, sortedList))
				return null;
			return sortedList;
		}).or(null);
		if (sorted !== null)
		{
			this.addRangeError(
				collectionIsSorted(this, sorted).toString());
		}
		return this.self();
	}

	size(): UnsignedNumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		return new ObjectSizeValidatorImpl(this.scope, this._configuration, this, this.name + ".size()",
			this.value.undefinedOrNullToInvalid().map(v => v.length), this.pluralizer, this.context, this.failures);
	}
}

export {ArrayValidatorImpl};