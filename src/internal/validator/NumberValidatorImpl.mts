import {
	type Configuration,
	type NumberValidator,
	type ValidationFailure,
	Type,
	type ApplicationScope,
	requireThatType,
	AbstractValidator,
	JavascriptValidatorsImpl,
	comparableIsGreaterThan,
	comparableIsLessThan,
	comparableIsLessThanOrEqualTo,
	comparableIsGreaterThanOrEqualTo,
	numberIsNegative,
	numberIsZero,
	numberIsNotZero,
	numberIsPositive,
	numberIsNotPositive,
	numberIsFinite,
	numberIsMultipleOf,
	numberIsNotMultipleOf,
	isBetweenFailed,
	numberIsInfinite,
	numberIsNotNumber,
	numberIsNumber,
	ValidationTarget
} from "../internal.mjs";

/**
 * Default implementation of `NumberValidator`.
 */
class NumberValidatorImpl extends AbstractValidator<NumberValidator, number>
	implements NumberValidator
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
	                   value: ValidationTarget<number>, context: Map<string, unknown>,
	                   failures: ValidationFailure[])
	{
		super(scope, configuration, name, value, context, failures);
	}

	isNegative(): NumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && v < 0))
		{
			this.addRangeError(
				numberIsNegative(this).toString());
		}
		return this;
	}

	isNotNegative(): NumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && !(v < 0)))
		{
			this.addRangeError(
				numberIsNegative(this).toString());
		}
		return this;
	}

	isZero(): NumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && v === 0))
		{
			this.addRangeError(
				numberIsZero(this).toString());
		}
		return this;
	}

	isNotZero(): NumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && !(v === 0)))
		{
			this.addRangeError(
				numberIsNotZero(this).toString());
		}
		return this;
	}

	isPositive(): NumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && v > 0))
		{
			this.addRangeError(
				numberIsPositive(this).toString());
		}
		return this;
	}

	isNotPositive(): NumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && !(v > 0)))
		{
			this.addRangeError(
				numberIsNotPositive(this).toString());
		}
		return this;
	}

	isGreaterThan(value: number): NumberValidator;
	isGreaterThan(minimumExclusive: number, name?: string)
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && v > minimumExclusive))
		{
			this.addRangeError(
				comparableIsGreaterThan(this, name ?? null, minimumExclusive).toString());
		}
		return this;
	}

	isGreaterThanOrEqualTo(minimumInclusive: number, name?: string): NumberValidator
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && v >= minimumInclusive))
		{
			this.
				addRangeError(
					comparableIsGreaterThanOrEqualTo(this, name ?? null, minimumInclusive).toString());
		}
		return this;
	}

	isLessThan(maximumExclusive: number, name?: string): NumberValidator
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && v < maximumExclusive))
		{
			this.
				addRangeError(
					comparableIsLessThan(this, name ?? null, maximumExclusive).toString());
		}
		return this;
	}

	isLessThanOrEqualTo(maximumInclusive: number, name?: string): NumberValidator
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && v <= maximumInclusive))
		{
			this.
				addRangeError(
					comparableIsLessThanOrEqualTo(this, name ?? null, maximumInclusive).toString());
		}
		return this;
	}

	isBetween(minimumInclusive: number, maximumExclusive: number): NumberValidator;
	isBetween(minimum: number, minimumIsInclusive: boolean, maximum: number,
	          maximumIsInclusive: boolean): NumberValidator;
	isBetween(minimum: number, maximumExclusiveOrMinimumIsInclusive: number | boolean, maximum?: number,
	          maximumInclusive?: boolean): NumberValidator
	{
		const normalized = NumberValidatorImpl.normalizeIsBetweenParameters(minimum,
			maximumExclusiveOrMinimumIsInclusive, maximum, maximumInclusive);

		const internalValidators = JavascriptValidatorsImpl.INTERNAL;
		internalValidators.requireThat(normalized.minimum, "minimum").
			isLessThanOrEqualTo(normalized.maximum, "maximum");
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v =>
		{
			if (normalized.minimumIsInclusive)
			{
				if (v < normalized.minimum)
					return false;
			}
			else if (v <= normalized.minimum)
				return false;
			if (normalized.maximumIsInclusive)
				return v <= normalized.maximum;
			return v < normalized.maximum;
		}))
		{
			this.addRangeError(
				isBetweenFailed(this, normalized.minimum, normalized.minimumIsInclusive, normalized.maximum,
					normalized.maximumIsInclusive).toString());
		}
		return this.self();
	}

	/**
	 * Normalize the parameters of isBetween().
	 *
	 * @param minimum          - the lower bound of the range
	 * @param maximumExclusiveOrMinimumIsInclusive - the upper bound of the range, or `true` if the lower bound
	 *   of the range is inclusive
	 * @param maximum          - the upper bound of the range
	 * @param maximumIsInclusive - `true` if the upper bound of the range is inclusive
	 */
	public static normalizeIsBetweenParameters(minimum: number,
	                                           maximumExclusiveOrMinimumIsInclusive: number | boolean,
	                                           maximum?: number, maximumIsInclusive?: boolean):
		{ minimum: number, minimumIsInclusive: boolean, maximum: number, maximumIsInclusive: boolean }
	{
		if (maximum === undefined)
		{
			if (maximumIsInclusive !== undefined)
				throw new TypeError("maximum may not be undefined");
		}
		else if (maximumIsInclusive === undefined)
			throw new TypeError("maximumIsInclusive may not be undefined");

		if (maximum === undefined)
		{
			requireThatType(minimum, "minimum", Type.NUMBER);
			requireThatType(maximumExclusiveOrMinimumIsInclusive, "maximumExclusiveOrMinimumIsInclusive",
				Type.NUMBER);
			return {
				minimum,
				minimumIsInclusive: true,
				maximum: maximumExclusiveOrMinimumIsInclusive as number,
				maximumIsInclusive: false
			};
		}
		requireThatType(minimum, "minimum", Type.NUMBER);
		requireThatType(maximumExclusiveOrMinimumIsInclusive, "maximumExclusiveOrMinimumIsInclusive",
			Type.BOOLEAN);
		requireThatType(maximum, "maximum", Type.NUMBER);
		requireThatType(maximumIsInclusive, "maximumIsInclusive", Type.BOOLEAN);
		return {
			minimum,
			minimumIsInclusive: maximumExclusiveOrMinimumIsInclusive as boolean,
			maximum,
			maximumIsInclusive: maximumIsInclusive as boolean
		};
	}

	isFinite(): NumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		// See http://stackoverflow.com/a/1830844/14731
		if (this.value.validationFailed(v => v != null && Number.isFinite(v)))
		{
			this.
				addRangeError(
					numberIsFinite(this).toString());
		}
		return this;
	}

	isInfinite(): NumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		// See http://stackoverflow.com/a/1830844/14731
		if (this.value.validationFailed(v => v != null && !Number.isFinite(v)))
		{
			this.
				addRangeError(
					numberIsInfinite(this).toString());
		}
		return this;
	}

	public isMultipleOf(factor: number): NumberValidator;
	public isMultipleOf(factor: number, name?: string)
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && NumberValidatorImpl.valueIsMultipleOf(v, factor)))
		{
			this.
				addRangeError(
					numberIsMultipleOf(this, name ?? null, factor).toString());
		}
		return this;
	}

	/**
	 * @param value  - the value
	 * @param factor - the number that the value is being divided by
	 * @returns true if the value is a multiple of `factor`
	 */
	public static valueIsMultipleOf(value: number, factor: number)
	{
		return factor !== 0 && (value === 0 || (value % factor === 0));
	}

	public isNotMultipleOf(factor: number): NumberValidator;
	public isNotMultipleOf(factor: number, name?: string)
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && !NumberValidatorImpl.valueIsMultipleOf(v, factor)))
		{
			this.
				addRangeError(
					numberIsNotMultipleOf(this, name ?? null, factor).toString());
		}
		return this;
	}

	isNumber(): NumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && Number.isNaN(v)))
		{
			this.
				addRangeError(
					numberIsNumber(this).toString());
		}
		return this;
	}

	isNotNumber(): NumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && !Number.isNaN(v)))
		{
			this.
				addRangeError(
					numberIsNotNumber(this).toString());
		}
		return this;
	}
}

export {NumberValidatorImpl};