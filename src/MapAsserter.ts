import type {
	ArrayAsserter,
	NumberAsserter,
	ObjectAsserter
} from "./internal/internal";

/**
 * Verifies the requirements of a <code>Map</code>.
 *
 * All methods (except those found in {@link ObjectAsserter}) imply {@link #isNotNull()}.
 *
 * Asserters throw the same exceptions as Verifiers if and only if
 * {@link GlobalConfiguration#assertionsAreEnabled assertions are enabled}.
 */
interface MapAsserter extends ObjectAsserter
{
	/**
	 * Ensures that value does not contain any entries
	 *
	 * @return {MapAsserter} the updated asserter
	 * @throws {TypeError} if the value contains any entries
	 */
	isEmpty(): MapAsserter;

	/**
	 * Ensures that value contains at least one entry.
	 *
	 * @return {MapAsserter} the updated asserter
	 * @throws {TypeError} if the value does not contain any entries
	 */
	isNotEmpty(): MapAsserter;

	/**
	 * @return {ArrayAsserter} an asserter for the Map's keys
	 */
	keys(): ArrayAsserter;

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayAsserter} for the Map's keys
	 * @return {MapAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	keysConsumer(consumer: (actual: ArrayAsserter) => void): MapAsserter;

	/**
	 * @return {ArrayAsserter} an asserter for the Map's values
	 */
	values(): ArrayAsserter;

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayAsserter} for the Map's values
	 * @return {MapAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	valuesConsumer(consumer: (actual: ArrayAsserter) => void): MapAsserter;

	/**
	 * @return {ArrayAsserter} an asserter for the Map's entries (an array of <code>[key, value]</code> for
	 *   each element in the Map)
	 */
	entries(): ArrayAsserter;

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayAsserter} for the Map's entries (an
	 *   array of <code>[key, value]</code> for each element in the Map)
	 * @return {MapAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	entriesConsumer(consumer: (actual: ArrayAsserter) => void): MapAsserter;

	/**
	 * @return {NumberAsserter} an asserter for the number of entries this Map contains
	 */
	size(): NumberAsserter;

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberAsserter} for the number of entries
	 *   this Map contains
	 * @return {MapAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	sizeConsumer(consumer: (actual: NumberAsserter) => void): MapAsserter;

	getActual(): Map<unknown, unknown> | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {MapAsserter as default};