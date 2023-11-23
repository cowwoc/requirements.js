import type {ExtensibleObjectVerifier} from "./internal/internal.mjs";

/**
 * Verifies the requirements of a <code>boolean</code>.
 * <p>
 * All methods (except those found in {@link ObjectVerifier}) imply {@link isNotNull}.
 */
interface BooleanVerifier extends ExtensibleObjectVerifier<BooleanVerifier, boolean>
{
	/**
	 * Ensures that the actual value is true.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is not true
	 */
	isTrue(): BooleanVerifier;

	/**
	 * Ensures that the actual value is false.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is not false
	 */
	isFalse(): BooleanVerifier;

	/**
	 * {@inheritDoc}
	 */
	getActual(): boolean;
}

export {type BooleanVerifier};