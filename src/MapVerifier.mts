import type {
	ArrayVerifier,
	NumberVerifier,
	ObjectVerifier,
	ExtensibleObjectVerifier
} from "./internal/internal.mjs";

const typedocWorkaround: null | ObjectVerifier<void> = null;
// noinspection PointlessBooleanExpressionJS
if (typedocWorkaround !== null)
	console.log("WORKAROUND: https://github.com/microsoft/tsdoc/issues/348");

/**
 * Verifies the requirements of a <code>Map</code>.
 * <p>
 * All methods (except those found in {@link ObjectVerifier}) assume that the actual value is not null.
 *
 * @typeParam K - the type the map's keys
 * @typeParam V - the type the map's values
 */
interface MapVerifier<K, V> extends ExtensibleObjectVerifier<MapVerifier<K, V>, Map<K, V>>
{
	/**
	 * Ensures that value does not contain any entries
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the value contains any entries
	 */
	isEmpty(): MapVerifier<K, V>;

	/**
	 * Ensures that value contains at least one entry.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the value does not contain any entries
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
	 * {@inheritDoc}
	 */
	getActual(): Map<K, V>;
}

export {type MapVerifier};