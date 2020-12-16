import type {
	ArrayVerifier,
	NumberVerifier,
	ObjectVerifier
} from "./internal/internal";

/**
 * Verifies the requirements of a <code>Map</code>.
 * <p>
 * All methods (except those found in {@link ObjectVerifier}) imply {@link #isNotNull()}.
 */
interface MapVerifier extends ObjectVerifier
{
	/**
	 * Ensures that value does not contain any entries
	 *
	 * @return {MapVerifier} the updated verifier
	 * @throws {TypeError} if the value contains any entries
	 */
	isEmpty(): MapVerifier;

	/**
	 * Ensures that value contains at least one entry.
	 *
	 * @return {MapVerifier} the updated verifier
	 * @throws {TypeError} if the value does not contain any entries
	 */
	isNotEmpty(): MapVerifier;

	/**
	 * @return {ArrayVerifier} a verifier for the Map's keys
	 */
	keys(): ArrayVerifier;

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayVerifier} for the Map's keys
	 * @return {MapVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	keysConsumer(consumer: (actual: ArrayVerifier) => void): MapVerifier;

	/**
	 * @return {ArrayVerifier} a verifier for the Map's values
	 */
	values(): ArrayVerifier;

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayVerifier} for the Map's values
	 * @return {MapVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	valuesConsumer(consumer: (actual: ArrayVerifier) => void): MapVerifier;

	/**
	 * @return {ArrayVerifier} a verifier for the Map's entries (an array of <code>[key, value]</code> for
	 *   each element in the Map)
	 */
	entries(): ArrayVerifier;

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayVerifier} for the Map's entries (an
	 *   array of <code>[key, value]</code> for each element in the Map)
	 * @return {MapVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	entriesConsumer(consumer: (actual: ArrayVerifier) => void): MapVerifier;

	/**
	 * @return {NumberVerifier} a verifier for the number of entries this Map contains
	 */
	size(): NumberVerifier;

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberVerifier} for the number of entries
	 *   this Map contains
	 * @return {MapVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	sizeConsumer(consumer: (actual: NumberVerifier) => void): MapVerifier;

	getActual(): Map<unknown, unknown>;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {MapVerifier as default};