import {
	AbstractValidator,
	messagesConstraint,
	comparableCompareValues
} from "../internal.mjs";

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function numberIsNegative(validator: AbstractValidator<unknown, unknown>)
{
	return messagesConstraint(validator, "must be negative");
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function numberIsNotNegative(validator: AbstractValidator<unknown, unknown>)
{
	return messagesConstraint(validator, "may not be negative");
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function numberIsZero(validator: AbstractValidator<unknown, unknown>)
{
	return messagesConstraint(validator, "must be zero");
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function numberIsNotZero(validator: AbstractValidator<unknown, unknown>)
{
	return messagesConstraint(validator, "may not be zero");
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function numberIsPositive(validator: AbstractValidator<unknown, unknown>)
{
	return messagesConstraint(validator, "must be positive");
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function numberIsNotPositive(validator: AbstractValidator<unknown, unknown>)
{
	return messagesConstraint(validator, "may not be positive");
}

/**
 * @param validator - the validator
 * @param factorName - the name of the factor
 * @param factor - the value being multiplied by
 * @returns a message for the validation failure
 */
function numberIsMultipleOf(validator: AbstractValidator<unknown, unknown>,
                            factorName: string | null, factor: number)
{
	return comparableCompareValues(validator, "must be a multiple of", factorName, factor);
}

/**
 * @param validator - the validator
 * @param factorName - the name of the factor
 * @param factor - the value being multiplied by
 * @returns a message for the validation failure
 */
function numberIsNotMultipleOf(validator: AbstractValidator<unknown, unknown>,
                               factorName: string | null, factor: number)
{
	return comparableCompareValues(validator, "may not be a multiple of", factorName, factor);
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function numberIsWholeNumber(validator: AbstractValidator<unknown, unknown>)
{
	return messagesConstraint(validator, "must be a whole number");
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function numberIsNotWholeNumber(validator: AbstractValidator<unknown, unknown>)
{
	return messagesConstraint(validator, "may not be a whole number");
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function numberIsNumber(validator: AbstractValidator<unknown, unknown>)
{
	return messagesConstraint(validator, "must be a well-defined number");
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function numberIsNotNumber(validator: AbstractValidator<unknown, unknown>)
{
	return messagesConstraint(validator, "may not be a well-defined number");
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function numberIsFinite(validator: AbstractValidator<unknown, unknown>)
{
	return messagesConstraint(validator, "must be a finite number");
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function numberIsInfinite(validator: AbstractValidator<unknown, unknown>)
{
	return messagesConstraint(validator, "must be an infinite number");
}

export {
	numberIsNegative,
	numberIsNotNegative,
	numberIsZero,
	numberIsNotZero,
	numberIsPositive,
	numberIsNotPositive,
	numberIsMultipleOf,
	numberIsNotMultipleOf,
	numberIsWholeNumber,
	numberIsNotWholeNumber,
	numberIsNumber,
	numberIsNotNumber,
	numberIsFinite,
	numberIsInfinite
};