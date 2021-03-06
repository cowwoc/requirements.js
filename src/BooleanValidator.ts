import type {ExtensibleObjectValidator} from "./internal/internal";

/**
 * Validates the requirements of a <code>boolean</code>.
 *
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 *
 * Verifiers and Validators contain corresponding methods. Some exceptions are thrown by both methods.
 * The remaining exceptions that are thrown by the verifier are wrapped as validation failures and are
 * returned by {@link #getFailures}.
 */
interface BooleanValidator extends ExtensibleObjectValidator<BooleanValidator>
{
	/**
	 * Ensures that the actual value is true.
	 *
	 * @return {BooleanValidator} the updated validator
	 */
	isTrue(): BooleanValidator;

	/**
	 * Ensures that the actual value is false.
	 *
	 * @return {BooleanValidator} the updated validator
	 */
	isFalse(): BooleanValidator;

	getActual(): boolean | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {BooleanValidator as default};