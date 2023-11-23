import type {
	ArrayVerifier,
	NumberVerifier,
	ObjectVerifier
} from "./internal/internal.mjs";

/**
 * Verifies the requirements of a <code>Map</code>.
 * <p>
 * All methods (except those found in {@link ObjectVerifier}) imply {@link isNotNull}.
 *
 * @typeParam K - the type the map's keys
 * @typeParam V - the type the map's values
 */
interface MapVerifier<K, V> extends ObjectVerifier<Map<K, V>>
{
	/**
	 * Ensures that value does not contain any entries
	 *
	 * @returns the updated verifier
	 * @throws TypeError if the value contains any entries
	 */
	isEmpty(): MapVerifier<K, V>;

	/**
	 * Ensures that value contains at least one entry.
	 *
	 * @returns the updated verifier
	 * @throws TypeError if the value does not contain any entries
	 */
	isNotEmpty(): MapVerifier<K, V>;

	/**
	 * @returns a verifier for the Map's keys
	 */
	keys(): ArrayVerifier<K>;

	/**
	 * @param consumer - a function that accepts an {@link ArrayVerifier} for the Map's keys
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	keysConsumer(consumer: (actual: ArrayVerifier<K>) => void): MapVerifier<K, V>;

	/**
	 * @returns a verifier for the Map's values
	 */
	values(): ArrayVerifier<V>;

	/**
	 * @param consumer - a function that accepts an {@link ArrayVerifier} for the Map's values
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	valuesConsumer(consumer: (actual: ArrayVerifier<V>) => void): MapVerifier<K, V>;

	/**
	 * @returns a verifier for the Map's entries (an array of <code>[key, value]</code> for
	 *   each element in the Map)
	 */
	entries(): ArrayVerifier<[K, V]>;

	/**
	 * @param consumer - a function that accepts an {@link ArrayVerifier} for the Map's entries (an
	 *   array of <code>[key, value]</code> for each element in the Map)
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	entriesConsumer(consumer: (actual: ArrayVerifier<[K, V]>) => void): MapVerifier<K, V>;

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
	sizeConsumer(consumer: (actual: NumberVerifier) => void): MapVerifier<K, V>;

	/**
	 * @returns a verifier for the <code>Map</code>
	 * @deprecated returns this
	 */
	asMap(): MapVerifier<K, V>;

	asMap<K, V>(): MapVerifier<K, V>;

	/**
	 * @param consumer - a function that accepts a {@link MapVerifier} for the actual value
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set.
	 * If the actual value is not a <code>Map</code>.
	 */
	asMapConsumer(consumer: (input: MapVerifier<K, V>) => void): MapVerifier<K, V>;

	asMapConsumer<K, V>(consumer: (input: MapVerifier<K, V>) => void): MapVerifier<K, V>;

	getActual(): Map<K, V>;
}

export {type MapVerifier};