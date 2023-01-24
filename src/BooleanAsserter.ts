import type {ExtensibleObjectAsserter} from "./internal/internal.js";

/**
 * Verifies the requirements of a <code>boolean</code>.
 *
 * All methods (except those found in {@link ObjectAsserter}) imply {@link #isNotNull()}.
 *
 * Asserters throw the same exceptions as Verifiers if and only if
 * {@link GlobalConfiguration#assertionsAreEnabled assertions are enabled}.
 */
interface BooleanAsserter extends ExtensibleObjectAsserter<BooleanAsserter>
{
	/**
	 * Ensures that the actual value is true.
	 *
	 * @return {BooleanAsserter} the updated asserter
	 * @throws {RangeError} if the actual value is not true
	 */
	isTrue(): BooleanAsserter;

	/**
	 * Ensures that the actual value is false.
	 *
	 * @return {BooleanAsserter} the updated asserter
	 * @throws {RangeError} if the actual value is not false
	 */
	isFalse(): BooleanAsserter;

	getActual(): boolean | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {BooleanAsserter as default};