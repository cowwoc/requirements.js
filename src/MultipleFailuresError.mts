import {
	type ValidationFailure,
	requireThatTypeCategory,
	TypeCategory
} from "./internal/internal.mjs";

/**
 * Thrown if multiple validations have failed.
 */
class MultipleFailuresError extends Error
{
	private readonly failures: ValidationFailure[];

	/**
	 * Creates a new error.
	 *
	 * @param failures - the list of validation failures
	 * @throws TypeError  if `failures` is `undefined` or `null`
	 * @throws RangeError if `failures` contains less than two elements
	 */
	public constructor(failures: ValidationFailure[])
	{
		super(MultipleFailuresError.createMessage(failures));
		this.failures = failures;
	}

	private static createMessage(failures: ValidationFailure[])
	{
		requireThatTypeCategory(failures, "failures", TypeCategory.ARRAY);
		if (failures.length === 0)
			throw new RangeError("failures must contain at least two elements");
		let result = `There are ${failures.length} nested errors.\n`;
		let i = 1;
		for (const failure of failures)
		{
			result += `${i}. ${failure.getError().name}: ${failure.getMessage()}\n`;
			++i;
		}
		return result.toString();
	}

	/**
	 * Returns the list of validation failures.
	 *
	 * @returns the list of validation failures
	 */
	public getFailures(): ValidationFailure[]
	{
		return this.failures;
	}
}

export {MultipleFailuresError};