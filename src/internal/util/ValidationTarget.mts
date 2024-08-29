import {Type} from "../internal.mjs";

/**
 * Represents a value that is being validated.
 *
 * This class is not intended to replace `undefined` or `null` references but to record additional
 * information alongside them.
 *
 * Instead of throwing an error when an `undefined` or `null` value is accessed, the system
 * marks it as invalid and continues to record validation failures.
 *
 * @typeParam T - the type of the value
 */
class ValidationTarget<T>
{
	private static readonly INVALID: ValidationTarget<unknown> = new ValidationTarget<unknown>(false,
		undefined);
	private readonly valid: boolean;
	private readonly value: T;

	/**
	 * Creates a value that may be invalid.
	 *
	 * @param valid - `true` if the value is valid, or `false` if invalid
	 * @param value - the value
	 */
	public constructor(valid: boolean, value: T)
	{
		this.valid = valid;
		this.value = value;
	}

	/**
	 * Returns an invalid value.
	 *
	 * @typeParam T - the type of the value
	 * @returns an invalid value
	 */
	public static invalid<T>()
	{
		return ValidationTarget.INVALID as ValidationTarget<T>;
	}

	/**
	 * Returns a valid value.
	 *
	 * @typeParam T - the type of the value
	 * @param value - a value
	 * @returns a valid value
	 */
	public static valid<T>(value: T)
	{
		return new ValidationTarget<T>(true, value);
	}

	/**
	 * Returns the valid value, or a default value if invalid. A value of `null` does not hold any
	 * special significance. It does not imply that the value is invalid.
	 *
	 * @param defaultValue - a value
	 * @returns the valid value, or `defaultValue` if the value is invalid
	 */
	public or(defaultValue: T): T;
	public or(defaultValue: T | null): T | null;
	public or(defaultValue: T | null): T | null
	{
		if (this.valid)
			return this.value;
		return defaultValue;
	}

	/**
	 * Returns the valid value, or a default value if invalid. A value of `null` does not hold any
	 * special significance. It does not imply that the value is invalid.
	 *
	 * @param defaultValue - a supplier that returns the default value
	 * @returns the valid value, or `defaultValue` if the value is invalid
	 */
	public orGet(defaultValue: () => T)
	{
		if (this.valid)
			return this.value;
		return defaultValue();
	}

	/**
	 * Consumes the value if it is valid. If the value is invalid, no action is taken.
	 *
	 * @param consumer - consumes the value if it is valid
	 */
	public ifValid(consumer: (value: T) => void)
	{
		if (this.valid)
			consumer(this.value);
	}

	/**
	 * Applies a function to the value if it is valid. If the value is invalid, no action is taken.
	 *
	 * @typeParam U - the type of value returned by the mapper
	 * @param mapper - the function to apply to the value if it is valid
	 * @returns `this` if the value is invalid; otherwise, a `MaybeInvalid` instance wrapping the
	 * result of applying the mapper to the value
	 */
	public map<U>(mapper: (value: T) => U): ValidationTarget<U>
	{
		if (!this.valid)
			return this as unknown as ValidationTarget<U>;
		const newValue = mapper(this.value);
		if (this.value as unknown as U === newValue)
			return this as unknown as ValidationTarget<U>;
		return ValidationTarget.valid(newValue);
	}

	/**
	 * Converts an `undefined` or `null` value to an invalid value. If the value is invalid or non-`null`, no
	 * action is taken.
	 *
	 * @returns an invalid value if the original value was `undefined` or `null`; otherwise, returns `this`
	 */
	public undefinedOrNullToInvalid(): ValidationTarget<T>
	{
		if (this.valid && (this.value === undefined || this.value === null))
			return ValidationTarget.invalid();
		return this;
	}

	/**
	 * Returns the value or throws an error if invalid.
	 *
	 * @typeParam U - the type of error to throw
	 * @param errorSupplier - returns the error to throw if the value is invalid
	 * @returns the value
	 * @throws U if the value is invalid
	 */
	public orThrow<U extends Error>(errorSupplier: () => U): T
	{
		if (this.valid)
			return this.value;
		// WORKAROUND: https://github.com/typescript-eslint/typescript-eslint/issues/9882
		throw errorSupplier() as Error;
	}

	/**
	 * Checks if the value is valid.
	 *
	 * @returns `true` if the value is valid; `false` otherwise
	 */
	public isValid()
	{
		return this.valid;
	}

	/**
	 * Checks if the value is null.
	 *
	 * @returns `true` if the value is null; `false` otherwise
	 */
	public isNull()
	{
		return this.valid && this.value === null;
	}

	/**
	 * Evaluates a condition on the value.
	 *
	 * @param condition - the condition to evaluate
	 * @returns `true` if the value is invalid or if the `condition` returns `false`;
	 * otherwise, returns `false`
	 */
	public validationFailed(condition: (value: T) => boolean)
	{
		return !this.valid || !condition(this.value);
	}

	public toString()
	{
		if (!this.valid)
			return "invalid";
		if (this.value === null)
			return "null";
		return `${JSON.stringify(Type.of(this.value), null, 2)}: ${JSON.stringify(this.value, undefined, 2)}`;
	}
}

export {
	ValidationTarget
};