/**
 * Thrown when assertion has failed or a condition thought to be impossible has occurred.
 */
class AssertionError extends Error
{
	/**
	 * Creates a new error.
	 *
	 * @param message - an explanation of what went wrong
	 * @param options - configuration options
	 */
	constructor(message?: string, options?: { cause: Error })
	{
		super(message, options);
		this.name = this.constructor.name;
		if (options !== undefined && options.cause !== undefined)
		{
			const originalError = options.cause;
			this.stack = originalError.stack?.replace(originalError.name, this.name);
		}
	}
}

export {AssertionError};