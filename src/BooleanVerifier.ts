import type {ExtensibleObjectVerifier} from "./internal/internal";

/**
 * Verifies the requirements of a <code>boolean</code>.
 * <p>
 * All methods (except those found in {@link ObjectVerifier}) imply {@link #isNotNull()}.
 */
interface BooleanVerifier extends ExtensibleObjectVerifier<BooleanVerifier>
{
	/**
	 * Ensures that the actual value is true.
	 *
	 * @return {BooleanVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not true
	 */
	isTrue(): BooleanVerifier;

	/**
	 * Ensures that the actual value is false.
	 *
	 * @return {BooleanVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not false
	 */
	isFalse(): BooleanVerifier;

	getActual(): boolean;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {BooleanVerifier as default};