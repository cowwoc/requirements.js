import type {ObjectVerifier} from "./internal/internal.mjs";

/**
 * Verifies the requirements of a class.
 * <p>
 * All methods (except those found in {@link ObjectVerifier}) imply {@link isNotNull}.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
interface ClassVerifier extends ObjectVerifier<Function>
{
	/**
	 * Ensures that the actual value is the specified type, or a super-type.
	 *
	 * @param type -the type to compare to
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is not a supertype of <code>type</code>
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isSupertypeOf(type: Function): ClassVerifier;

	/**
	 * Ensures that the actual value is the specified type, or a subtype.
	 *
	 * @param type -the type to compare to
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is not a subtype of <code>type</code>
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isSubtypeOf(type: Function): ClassVerifier;

	/**
	 * {@inheritDoc}
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	getActual(): Function;
}

export {type ClassVerifier};