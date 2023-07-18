import type {
	ArrayValidator,
	ExtensibleObjectValidator,
	NumberValidator
} from "./internal/internal.mjs";

/**
 * Validates the requirements of a <code>Map</code>.
 *
 * Verifier and Validator methods are equivalent.
 * Validators return validation failures through the {@link getFailures} method, while Verifiers throw them
 * as exceptions.
 *
 * All methods (except those found in {@link ObjectValidator}) imply {@link isNotNull}.
 */
interface MapValidator extends ExtensibleObjectValidator<MapValidator>
{
	/**
	 * Ensures that value does not contain any entries
	 *
	 * @returns the updated validator
	 */
	isEmpty(): MapValidator;

	/**
	 * Ensures that value contains at least one entry.
	 *
	 * @returns the updated validator
	 */
	isNotEmpty(): MapValidator;

	/**
	 * @returns a validator for the Map's keys
	 */
	keys(): ArrayValidator;

	/**
	 * @param consumer - a function that accepts an {@link ArrayValidator} for the Map's keys
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	keysConsumer(consumer: (actual: ArrayValidator) => void): MapValidator;

	/**
	 * @returns a validator for the Map's values
	 */
	values(): ArrayValidator;

	/**
	 * @param consumer - a function that accepts an {@link ArrayValidator} for the Map's values
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	valuesConsumer(consumer: (actual: ArrayValidator) => void): MapValidator;

	/**
	 * @returns validator for the Map's entries (an array of
	 *   <code>[key, value]</code> for each element in the Map)
	 */
	entries(): ArrayValidator;

	/**
	 * @param consumer - a function that accepts an {@link ArrayValidator} for the Map's entries (an
	 *   array of <code>[key, value]</code> for each element in the Map)
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	entriesConsumer(consumer: (actual: ArrayValidator) => void): MapValidator;

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
	sizeConsumer(consumer: (actual: NumberValidator) => void): MapValidator;

	getActual(): Map<unknown, unknown> | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {type MapValidator as default};