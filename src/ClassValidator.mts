import type {ExtensibleObjectValidator} from "./internal/internal.mjs";

/**
 * Validates the requirements of a type.
 *
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 *
 * Verifiers and Validators contain corresponding methods. Some exceptions are thrown by both methods.
 * The remaining exceptions that are thrown by the verifier are wrapped as validation failures and are
 * returned by {@link #getFailures}.
 */
interface ClassValidator extends ExtensibleObjectValidator<ClassValidator>
{
	/**
	 * Ensures that the actual value is the specified type, or a sub-type.
	 *
	 * @param {Function} type the type to compare to
	 * @return {ClassValidator} the updated validator
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isSupertypeOf(type: Function): ClassValidator;

	/**
	 * Ensures that the actual value is the specified type, or a sub-type.
	 *
	 * @param {Function} type the type to compare to
	 * @return {ClassValidator} the updated validator
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isSubtypeOf(type: Function): ClassValidator;

	// eslint-disable-next-line @typescript-eslint/ban-types
	getActual(): Function | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ClassValidator as default};