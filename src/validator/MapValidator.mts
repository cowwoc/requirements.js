import type {
	ValidatorComponent,
	ArrayValidator,
	UnsignedNumberValidator
} from "../internal/internal.mjs";

/**
 * Validates the state of a `Map`.
 *
 * @typeParam K - the type of keys in the map
 * @typeParam V - the type of values in the map
 */
interface MapValidator<K, V> extends ValidatorComponent<MapValidator<K, V>, Map<K, V>>
{
	/**
	 * Returns a validator for the value's {@link Map.keys|keys}.
	 * @returns a validator for the value's {@link Map.keys|keys}
	 * @throws TypeError if the value is `undefined` or `null`
	 */
	keys(): ArrayValidator<K>;

	/**
	 * Returns a validator for the value's {@link Map.values|values}.
	 *
	 * @returns a validator for the value's {@link Map.values|values}
	 * @throws TypeError if the value is `undefined` or `null`
	 */
	values(): ArrayValidator<V>;

	/**
	 * Returns a validator for the value's {@link Map.entries|entries}
	 * (an array of `[key, this.value]` for each element in the Map).
	 *
	 * @returns a validator for the value's {@link Map.entries|entries}
	 * @throws TypeError if the value is `undefined` or `null`
	 */
	entries(): ArrayValidator<[K, V]>;

	/**
	 * Ensures that the value is empty.
	 *
	 * @returns this
	 * @throws TypeError     if the value is `undefined` or `null`
	 * @throws RangeError if value is not empty
	 */
	isEmpty(): MapValidator<K, V>;

	/**
	 * Ensures that the value is not empty.
	 *
	 * @returns this
	 * @throws TypeError     if the value is `undefined` or `null`
	 * @throws RangeError if value is empty
	 */
	isNotEmpty(): MapValidator<K, V>;

	/**
	 * Returns a validator for the map's {@link Map.size|size}.
	 *
	 * @returns a validator for the map's {@link Map.size|size}
	 * @throws TypeError if the value is `undefined` or `null`
	 */
	size(): UnsignedNumberValidator;
}

export type {MapValidator};