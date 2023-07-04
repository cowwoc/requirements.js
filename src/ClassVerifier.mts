import type {ObjectVerifier} from "./internal/internal.mjs";

/**
 * Verifies the requirements of a class.
 * <p>
 * All methods (except those found in {@link ObjectVerifier}) imply {@link #isNotNull()}.
 */
interface ClassVerifier extends ObjectVerifier
{
	/**
	 * Ensures that the actual value is the specified type, or a super-type.
	 *
	 * @param {Function} type the type to compare to
	 * @return {ClassVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not a supertype of <code>type</code>
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isSupertypeOf(type: Function): ClassVerifier;

	/**
	 * Ensures that the actual value is the specified type, or a sub-type.
	 *
	 * @param {Function} type the type to compare to
	 * @return {ClassVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not a subtype of <code>type</code>
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isSubtypeOf(type: Function): ClassVerifier;

	// eslint-disable-next-line @typescript-eslint/ban-types
	getActual(): Function;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ClassVerifier as default};