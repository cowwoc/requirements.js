import type {ObjectAsserter} from "./internal/internal.js";

/**
 * Verifies the requirements of a class.
 *
 * All methods (except those found in {@link ObjectAsserter}) imply {@link #isNotNull()}.
 *
 * Asserters throw the same exceptions as Verifiers if and only if
 * {@link GlobalConfiguration#assertionsAreEnabled assertions are enabled}.
 */
interface ClassAsserter extends ObjectAsserter
{
	/**
	 * Ensures that the actual value is the specified type, or a super-type.
	 *
	 * @param {Function} type the type to compare to
	 * @return {ClassAsserter} the updated asserter
	 * @throws {RangeError} if the actual value is not a supertype of <code>type</code>
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isSupertypeOf(type: Function): ClassAsserter;

	/**
	 * Ensures that the actual value is the specified type, or a sub-type.
	 *
	 * @param {Function} type the type to compare to
	 * @return {ClassAsserter} the updated asserter
	 * @throws {RangeError} if the actual value is not a subtype of <code>type</code>
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isSubtypeOf(type: Function): ClassAsserter;

	// eslint-disable-next-line @typescript-eslint/ban-types
	getActual(): Function | void;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ClassAsserter as default};