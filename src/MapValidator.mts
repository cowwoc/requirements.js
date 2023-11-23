import type {
	ArrayValidator,
	ExtensibleObjectValidator,
	NumberValidator
} from "./internal/internal.mjs";

/**
 * Validates the requirements of a <code>Map</code>.
 *
 * Verifier and Validator methods are equivalent.
 * Validators return validation failures through the
 * {@link ExtensibleObjectValidator.getFailures | getFailures()} method, while Verifiers throw them as
 * exceptions.
 *
 * All methods (except those found in {@link ObjectValidator}) imply {@link isNotNull}.
 *
 * @typeParam K - the type the map's keys
 * @typeParam V - the type the map's values
 */
interface MapValidator<K, V> extends ExtensibleObjectValidator<MapValidator<K, V>, Map<K, V>>
{
	/**
	 * Ensures that value does not contain any entries
	 *
	 * @returns the updated validator
	 */
	isEmpty(): MapValidator<K, V>;

	/**
	 * Ensures that value contains at least one entry.
	 *
	 * @returns the updated validator
	 */
	isNotEmpty(): MapValidator<K, V>;

	/**
	 * @returns a validator for the Map's keys
	 */
	keys(): ArrayValidator<K>;

	/**
	 * @param consumer - a function that accepts an {@link ArrayValidator} for the Map's keys
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	keysConsumer(consumer: (actual: ArrayValidator<K>) => void): MapValidator<K, V>;

	/**
	 * @returns a validator for the Map's values
	 */
	values(): ArrayValidator<V>;

	/**
	 * @param consumer - a function that accepts an {@link ArrayValidator} for the Map's values
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	valuesConsumer(consumer: (actual: ArrayValidator<V>) => void): MapValidator<K, V>;

	/**
	 * @returns validator for the Map's entries (an array of
	 *   <code>[key, value]</code> for each element in the Map)
	 */
	entries(): ArrayValidator<[K, V]>;

	/**
	 * @param consumer - a function that accepts an {@link ArrayValidator} for the Map's entries (an
	 *   array of <code>[key, value]</code> for each element in the Map)
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	entriesConsumer(consumer: (actual: ArrayValidator<[K, V]>) => void): MapValidator<K, V>;

	/**
	 * @returns a validator for the number of entries this Map contains
	 */
	size(): NumberValidator;

	/**
	 * @param consumer - a function that accepts a {@link NumberValidator} for the number of entries
	 *   this Map contains
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	sizeConsumer(consumer: (actual: NumberValidator) => void): MapValidator<K, V>;

	/**
	 * @returns a validator for the <code>Map</code>
	 * @deprecated returns this
	 */
	asMap(): MapValidator<K, V>;

	asMap<K, V>(): MapValidator<K, V>;

	/**
	 * @param consumer - a function that accepts a {@link MapValidator} for the actual value
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set.
	 * If the actual value is not a <code>Map</code>.
	 */
	asMapConsumer(consumer: (input: MapValidator<K, V>) => void): MapValidator<K, V>;

	asMapConsumer<K, V>(consumer: (input: MapValidator<K, V>) => void): MapValidator<K, V>;

	getActual(): Map<K, V> | undefined;
}

export {type MapValidator};