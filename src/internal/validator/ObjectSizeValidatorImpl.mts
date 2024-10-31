import {
	type Configuration,
	type Pluralizer,
	type ValidationFailure,
	NumberValidatorImpl,
	type ApplicationScope,
	AbstractValidator,
	type UnsignedNumberValidator,
	numberIsMultipleOf,
	numberIsNotMultipleOf,
	ValidationTarget,
	JavascriptValidatorsImpl,
	numberIsFinite,
	numberIsInfinite,
	numberIsNumber,
	numberIsNotNumber,
	collectionContainsSize,
	objectIsNotEmpty,
	objectIsEmpty,
	collectionSizeIsBetween
} from "../internal.mjs";
import {requireThatValueIsDefined} from "./Objects.mjs";

/**
 * Validates the state of an object's size.
 */
class ObjectSizeValidatorImpl extends AbstractValidator<number>
	implements UnsignedNumberValidator
{
	private readonly objectValidator: AbstractValidator<unknown>;
	private readonly pluralizer: Pluralizer;

	/**
	 * @param scope           - the application configuration
	 * @param configuration   - the validator configuration
	 * @param objectValidator - the object's validator
	 * @param sizeName        - the name of the object's size
	 * @param size            - the object's size
	 * @param pluralizer      - the type of elements in the object
	 * @param context         - the contextual information set by a parent validator or the user
	 * @param failures        - the list of validation failures
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace, or is empty
	 * @throws AssertionError if `scope`, `configuration`, `value`, `context` or `failures` are null
	 */
	public constructor(scope: ApplicationScope, configuration: Configuration,
	                   objectValidator: AbstractValidator<unknown>, sizeName: string,
	                   size: ValidationTarget<number>, pluralizer: Pluralizer, context: Map<string, unknown>,
	                   failures: ValidationFailure[])
	{
		super(scope, configuration, sizeName, size, context, failures);

		requireThatValueIsDefined(objectValidator, "objectValidator");
		requireThatValueIsDefined(pluralizer, "pluralizer");

		this.objectValidator = objectValidator;
		this.pluralizer = pluralizer;
	}

	public isZero(): this
	{
		if (this.value.validationFailed(value => value == 0))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(objectIsEmpty(this.objectValidator).toString());
		}
		return this;
	}

	public isNotZero(): this
	{
		if (this.value.validationFailed(v => !(v == 0)))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(objectIsNotEmpty(this.objectValidator).toString());
		}
		return this;
	}

	public isPositive()
	{
		return this.isNotZero();
	}

	public isNotPositive()
	{
		return this.isZero();
	}

	public isLessThan(maximumExclusive: number): this;
	public isLessThan(maximumExclusive: number, name?: string): this
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.validationFailed(v => v < maximumExclusive))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				collectionContainsSize(this.objectValidator, this.name, this.value.or(null),
					"must contain less than", name ?? null, maximumExclusive, this.pluralizer).toString());
		}
		return this;
	}

	public isLessThanOrEqualTo(maximumInclusive: number): this;
	public isLessThanOrEqualTo(maximumInclusive: number, name?: string)
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.validationFailed(v => v <= maximumInclusive))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				collectionContainsSize(this.objectValidator, this.name, this.value.or(null),
					"may not contain more than", name ?? null, maximumInclusive, this.pluralizer).toString());
		}
		return this;
	}

	public isGreaterThanOrEqualTo(minimumInclusive: number): this;
	public isGreaterThanOrEqualTo(minimumInclusive: number, name?: string)
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.validationFailed(v => v >= minimumInclusive))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				collectionContainsSize(this.objectValidator, this.name, this.value.or(null),
					"must contain at least", name ?? null, minimumInclusive, this.pluralizer).toString());
		}
		return this;
	}

	public isGreaterThan(minimumExclusive: number): this;
	public isGreaterThan(minimumExclusive: number, name?: string): this
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.validationFailed(v => v >= minimumExclusive))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				collectionContainsSize(this.objectValidator, this.name, this.value.or(null),
					"must contain more than", name ?? null, minimumExclusive, this.pluralizer).toString());
		}
		return this;
	}

	public isBetween(minimumInclusive: number, maximumExclusive: number): this;
	public isBetween(minimum: number, minimumIsInclusive: boolean, maximum: number,
	                 maximumIsInclusive: boolean): this;
	public isBetween(minimum: number, maximumExclusiveOrMinimumIsInclusive: number | boolean,
	                 maximum?: number, maximumIsInclusive?: boolean)
	{
		const normalized = NumberValidatorImpl.normalizeIsBetweenParameters(
			minimum, maximumExclusiveOrMinimumIsInclusive, maximum, maximumIsInclusive);

		const internalValidators = JavascriptValidatorsImpl.INTERNAL;
		internalValidators.requireThatNumber(normalized.minimum, "minimum").
			isLessThanOrEqualTo(normalized.maximum, "maximum");
		if (this.value.validationFailed(v => ObjectSizeValidatorImpl.inBounds(v, normalized.minimum,
			normalized.minimumIsInclusive, normalized.maximum, normalized.maximumIsInclusive)))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				collectionSizeIsBetween(this, this.name, this.value.or(null), normalized.minimum,
					normalized.minimumIsInclusive, normalized.maximum, normalized.maximumIsInclusive, this.pluralizer).
					toString());
		}
		return this;
	}

	/**
	 * @param value              - the value being validated
	 * @param minimum            - the lower bound of the range
	 * @param minimumIsInclusive - `true` if the lower bound of the range is inclusive
	 * @param maximum            - the upper bound of the range
	 * @param maximumIsInclusive - `true` if the upper bound of the range is inclusive
	 * @returns `true` if the value is in bounds; false otherwise
	 */
	private static inBounds(value: number, minimum: number, minimumIsInclusive: boolean, maximum: number,
	                        maximumIsInclusive: boolean)
	{
		if (minimumIsInclusive)
		{
			if (value < minimum)
				return false;
		}
		else if (value <= minimum)
			return false;
		if (maximumIsInclusive)
			return value <= maximum;
		return value < maximum;
	}

	public isMultipleOf(factor: number): this;
	public isMultipleOf(factor: number, name?: string)
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.validationFailed(v => NumberValidatorImpl.valueIsMultipleOf(v, factor)))
		{
			this.failOnUndefinedOrNull();
			const messageBuilder = numberIsMultipleOf(this, name ?? null, factor);
			this.objectValidator.value.ifValid(v =>
				messageBuilder.withContext(v, this.objectValidator.getName()));
			this.addRangeError(messageBuilder.toString());
		}
		return this;
	}

	public isNotMultipleOf(factor: number): this;
	public isNotMultipleOf(factor: number, name?: string)
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.validationFailed(v => !NumberValidatorImpl.valueIsMultipleOf(v, factor)))
		{
			this.failOnUndefinedOrNull();
			const messageBuilder = numberIsNotMultipleOf(this, name ?? null, factor);
			this.objectValidator.value.ifValid(v => messageBuilder.withContext(v, this.objectValidator.getName()));
			this.addRangeError(messageBuilder.toString());
		}
		return this;
	}

	public isFinite(): this
	{
		if (this.value.validationFailed(v => Number.isFinite(v)))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				numberIsFinite(this).toString());
		}
		return this;
	}

	public isInfinite(): this
	{
		if (this.value.validationFailed(v => !Number.isFinite(v) && !Number.isNaN(v)))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				numberIsInfinite(this).toString());
		}
		return this;
	}

	isNumber(): this
	{
		if (this.value.validationFailed(v => !Number.isNaN(v)))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				numberIsNumber(this).toString());
		}
		return this;
	}

	isNotNumber(): this
	{
		if (this.value.validationFailed(v => Number.isNaN(v)))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				numberIsNotNumber(this).toString());
		}
		return this;
	}
}

export {ObjectSizeValidatorImpl};