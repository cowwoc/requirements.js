import type {ExtensibleObjectValidator} from "./internal/internal.mjs";

/**
 * Validates the requirements of a <code>boolean</code>.
 *
 * Verifier and Validator methods are equivalent.
 * Validators return validation failures through the {@link getFailures} method, while Verifiers throw them
 * as exceptions.
 *
 * All methods (except those found in {@link ObjectValidator}) imply {@link isNotNull}.
 */
interface BooleanValidator extends ExtensibleObjectValidator<BooleanValidator>
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

	getActual(): boolean | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {type BooleanValidator as default};