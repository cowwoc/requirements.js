/**
 * A failed validation.
 */
interface ValidationFailure
{
	/**
	 * Returns the message corresponding to the validation failure.
	 *
	 * @returns the message corresponding to the validation failure
	 */
	getMessage(): string;


	/**
	 * Returns the type of error that is associated with this failure.
	 *
	 * @returns the type of error that is associated with this failure
	 */
	getType(): string;

	/**
	 * Returns the error corresponding to the validation failure.
	 *
	 * @returns the error corresponding to the validation failure
	 */
	getError(): Error;
}

/**
 * @param value - a value
 * @returns true if the value is an instance of `ValidationFailure`
 */
function isValidationFailure(value: unknown): value is ValidationFailure
{
	const validationFailure = value as ValidationFailure;
	return validationFailure.getMessage !== undefined &&
		validationFailure.getType !== undefined &&
		validationFailure.getError !== undefined;
}

export {type ValidationFailure, isValidationFailure};