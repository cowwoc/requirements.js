import {
	ObjectVerifier,
	UriValidator,
	UriValidatorNoOp
} from "./internal/internal";

/**
 * Verifies the requirements of a <code>URI</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class UriVerifier extends ObjectVerifier<UriValidator | UriValidatorNoOp>
{
	/**
	 * Ensures that the URI is absolute.
	 *
	 * @return {UriVerifier} the updated verifier
	 * @throws {RangeError} if the path is not absolute
	 */
	isAbsolute(): this
	{
		this.validator.isAbsolute();
		return this.validationResult();
	}

	/**
	 * Ensures that the URI is relative.
	 *
	 * @return {UriVerifier} the updated verifier
	 * @throws {RangeError} if the path is not a relative
	 */
	isRelative(): this
	{
		this.validator.isRelative();
		return this.validationResult();
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {UriVerifier as default};