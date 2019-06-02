/**
 * Thrown when a method is invoked at an illegal or inappropriate time.
 */
class IllegalStateError extends Error
{
	constructor(message)
	{
		super(message);
		this.name = "IllegalStateError";
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {IllegalStateError as default};