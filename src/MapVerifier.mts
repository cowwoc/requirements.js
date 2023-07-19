import type {
	ArrayVerifier,
	NumberVerifier,
	ObjectVerifier
} from "./internal/internal.mjs";

/**
 * Verifies the requirements of a <code>Map</code>.
 * <p>
 * All methods (except those found in {@link ObjectVerifier}) imply {@link isNotNull}.
 */
interface MapVerifier extends ObjectVerifier
{
	/**
	 * Ensures that value does not contain any entries
	 *
	 * @returns the updated verifier
	 * @throws TypeError if the value contains any entries
	 */
	isEmpty(): MapVerifier;

	/**
	 * Ensures that value contains at least one entry.
	 *
	 * @returns the updated verifier
	 * @throws TypeError if the value does not contain any entries
	 */
	isNotEmpty(): MapVerifier;

	/**
	 * @returns a verifier for the Map's keys
	 */
	keys(): ArrayVerifier;

	/**
	 * @param consumer - a function that accepts an {@link ArrayVerifier} for the Map's keys
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	keysConsumer(consumer: (actual: ArrayVerifier) => void): MapVerifier;

	/**
	 * @returns a verifier for the Map's values
	 */
	values(): ArrayVerifier;

	/**
	 * @param consumer - a function that accepts an {@link ArrayVerifier} for the Map's values
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	valuesConsumer(consumer: (actual: ArrayVerifier) => void): MapVerifier;

	/**
	 * @returns a verifier for the Map's entries (an array of <code>[key, value]</code> for
	 *   each element in the Map)
	 */
	entries(): ArrayVerifier;

	/**
	 * @param consumer - a function that accepts an {@link ArrayVerifier} for the Map's entries (an
	 *   array of <code>[key, value]</code> for each element in the Map)
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	entriesConsumer(consumer: (actual: ArrayVerifier) => void): MapVerifier;

	/**
	 * @returns a verifier for the number of entries this Map contains
	 */
	size(): NumberVerifier;

	/**
	 * @param consumer - a function that accepts a {@link NumberVerifier} for the number of entries
	 *   this Map contains
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	sizeConsumer(consumer: (actual: NumberVerifier) => void): MapVerifier;

	getActual(): Map<unknown, unknown>;
}

export {type MapVerifier};