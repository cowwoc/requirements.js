import type {ExtensibleObjectValidator} from "./internal/internal.mjs";

/**
 * Validates the requirements of a <code>boolean</code>.
 *
 * Verifier and Validator methods are equivalent.
 * Validators return validation failures through the
 * {@link ExtensibleObjectValidator.getFailures | getFailures()} method, while Verifiers throw them as
 * exceptions.
 *
 * All methods (except those found in {@link ObjectValidator}) imply {@link isNotNull}.
 */
interface BooleanValidator extends ExtensibleObjectValidator<BooleanValidator, boolean>
{
	/**
	 * Ensures that the actual value is true.
	 *
	 * @returns the updated validator
	 */
	isTrue(): BooleanValidator;

	/**
	 * Ensures that the actual value is false.
	 *
	 * @returns the updated validator
	 */
	isFalse(): BooleanValidator;

	getActual(): boolean | undefined;
}

export {type BooleanValidator};