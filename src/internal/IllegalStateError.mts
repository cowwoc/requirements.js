/**
 * Thrown when a method is invoked at an illegal or inappropriate time.
 */
class IllegalStateError extends Error
{
	constructor(message: string)
	{
		super(message);
		this.name = this.constructor.name;
	}
}

export {IllegalStateError};