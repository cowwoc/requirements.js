/**
 * Thrown when a method is invoked at an illegal or inappropriate time.
 */
class IllegalStateError extends Error
{
	/**
	 * Creates a new error.
	 *
	 * @param message - an explanation of what went wrong
	 */
	constructor(message: string)
	{
		super(message);
		this.name = this.constructor.name;
	}
}

export {IllegalStateError};