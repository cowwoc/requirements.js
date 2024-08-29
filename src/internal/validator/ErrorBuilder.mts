/**
 * Creates a new error.
 *
 * @param message - a message that explains what went wrong
 * @returns a new error
 */
type ErrorBuilder = (message: string) => Error;

/**
 * @param value - a value
 * @returns true if the value has the number of parameters expected by `ErrorBuilder`
 */
function isErrorBuilder(value: unknown): value is ErrorBuilder
{
	return typeof (value) === "function" && value.length === 1;
}

export {
	type ErrorBuilder,
	isErrorBuilder
};