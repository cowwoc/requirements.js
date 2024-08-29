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
class ObjectSizeValidatorImpl extends AbstractValidator<UnsignedNumberValidator, number>
	implements UnsignedNumberValidator
{
	private readonly objectValidator: AbstractValidator<unknown, unknown>;
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
	 * @throws TypeError if `name` is null
	 * @throws RangeError if `name` contains whitespace, or is empty
	 * @throws AssertionError if `scope`, `configuration`, `value`, `context` or `failures` are null
	 */
	public constructor(scope: ApplicationScope, configuration: Configuration,
	                   objectValidator: AbstractValidator<unknown, unknown>, sizeName: string,
	                   size: ValidationTarget<number>, pluralizer: Pluralizer, context: Map<string, unknown>,
	                   failures: ValidationFailure[])
	{
		super(scope, configuration, sizeName, size, context, failures);

		requireThatValueIsDefined(objectValidator, "objectValidator");
		requireThatValueIsDefined(pluralizer, "pluralizer");

		this.objectValidator = objectValidator;
		this.pluralizer = pluralizer;
	}

	public isZero(): UnsignedNumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(value => value == 0))
			this.addRangeError(objectIsEmpty(this.objectValidator).toString());
		return this.self();
	}

	public isNotZero(): UnsignedNumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v !== null && !(v == 0)))
			this.addRangeError(objectIsNotEmpty(this.objectValidator).toString());
		return this.self();
	}

	public isPositive()
	{
		return this.isNotZero();
	}

	public isNotPositive()
	{
		return this.isZero();
	}

	public isLessThan(maximumExclusive: number): UnsignedNumberValidator;
	public isLessThan(maximumExclusive: number, name?: string): UnsignedNumberValidator
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v !== null && v < maximumExclusive))
		{
			this.addRangeError(
				collectionContainsSize(this.objectValidator, this.name, this.value.or(null),
					"must contain less than", name ?? null, maximumExclusive, this.pluralizer).toString());
		}
		return this.self();
	}

	public isLessThanOrEqualTo(maximumInclusive: number): UnsignedNumberValidator;
	public isLessThanOrEqualTo(maximumInclusive: number, name?: string)
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v !== null && v <= maximumInclusive))
		{
			this.addRangeError(
				collectionContainsSize(this.objectValidator, this.name, this.value.or(null),
					"may not contain more than", name ?? null, maximumInclusive, this.pluralizer).toString());
		}
		return this.self();
	}

	public isGreaterThanOrEqualTo(minimumInclusive: number): UnsignedNumberValidator;
	public isGreaterThanOrEqualTo(minimumInclusive: number, name?: string)
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(value => value >= minimumInclusive))
		{
			this.addRangeError(
				collectionContainsSize(this.objectValidator, this.name, this.value.or(null),
					"must contain at least", name ?? null, minimumInclusive, this.pluralizer).toString());
		}
		return this.self();
	}

	public isGreaterThan(minimumExclusive: number): UnsignedNumberValidator;
	public isGreaterThan(minimumExclusive: number, name?: string): UnsignedNumberValidator
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(value => value >= minimumExclusive))
		{
			this.addRangeError(
				collectionContainsSize(this.objectValidator, this.name, this.value.or(null),
					"must contain more than", name ?? null, minimumExclusive, this.pluralizer).toString());
		}
		return this.self();
	}

	public isBetween(minimumInclusive: number, maximumExclusive: number): UnsignedNumberValidator;
	public isBetween(minimum: number, minimumIsInclusive: boolean, maximum: number,
	                 maximumIsInclusive: boolean): UnsignedNumberValidator;
	public isBetween(minimum: number, maximumExclusiveOrMinimumIsInclusive: number | boolean,
	                 maximum?: number, maximumIsInclusive?: boolean)
	{
		const normalized = NumberValidatorImpl.normalizeIsBetweenParameters(
			minimum, maximumExclusiveOrMinimumIsInclusive, maximum, maximumIsInclusive);

		const internalValidators = JavascriptValidatorsImpl.INTERNAL;
		internalValidators.requireThat(normalized.minimum, "minimum").
			isLessThanOrEqualTo(normalized.maximum, "maximum");
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v !== null &&
			ObjectSizeValidatorImpl.inBounds(v, normalized.minimum, normalized.minimumIsInclusive,
				normalized.maximum, normalized.maximumIsInclusive)))
		{
			this.addRangeError(
				collectionSizeIsBetween(this, this.name, this.value.or(null), normalized.minimum,
					normalized.minimumIsInclusive, normalized.maximum, normalized.maximumIsInclusive, this.pluralizer).
					toString());
		}
		return this.self();
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

	public isMultipleOf(factor: number): UnsignedNumberValidator;
	public isMultipleOf(factor: number, name?: string)
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v !== null && NumberValidatorImpl.valueIsMultipleOf(v, factor)))
		{
			{
				const messageBuilder = numberIsMultipleOf(this, name ?? null, factor);
				this.objectValidator.value.ifValid(v =>
					messageBuilder.withContext(v, this.objectValidator.getName()));
				this.addRangeError(messageBuilder.toString());
			}
		}
		return this.self();
	}

	public isNotMultipleOf(factor: number): UnsignedNumberValidator;
	public isNotMultipleOf(factor: number, name?: string)
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v !== null && !NumberValidatorImpl.valueIsMultipleOf(v, factor)))
		{
			const messageBuilder = numberIsNotMultipleOf(this, name ?? null, factor);
			this.objectValidator.value.ifValid(v => messageBuilder.withContext(v, this.objectValidator.getName()));
			this.addRangeError(messageBuilder.toString());
		}
		return this.self();
	}

	public isFinite(): UnsignedNumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v !== null && Number.isFinite(v)))
		{
			this.addRangeError(
				numberIsFinite(this).toString());
		}
		return this.self();
	}

	public isInfinite(): UnsignedNumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v !== null && !Number.isFinite(v) && !Number.isNaN(v)))
		{
			this.addRangeError(
				numberIsInfinite(this).toString());
		}
		return this.self();
	}

	isNumber(): UnsignedNumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v !== null && !Number.isNaN(v)))
		{
			this.addRangeError(
				numberIsNumber(this).toString());
		}
		return this.self();
	}

	isNotNumber(): UnsignedNumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v !== null && Number.isNaN(v)))
		{
			this.addRangeError(
				numberIsNotNumber(this).toString());
		}
		return this.self();
	}
}

export {ObjectSizeValidatorImpl};