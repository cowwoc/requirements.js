import {
	ObjectVerifier,
	UrlValidator,
	UrlValidatorNoOp
} from "./internal/internal";

/**
 * Verifies the requirements of a <code>URL</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class UrlVerifier extends ObjectVerifier<UrlValidator | UrlValidatorNoOp>
{
	/**
	 * Ensures that the URL is absolute.
	 *
	 * @return {UrlVerifier} the updated verifier
	 * @throws {RangeError} if the path is not absolute
	 */
	isAbsolute(): this
	{
		this.validator.isAbsolute();
		return this.validationResult();
	}

	/**
	 * Ensures that the URL is relative.
	 *
	 * @return {UrlVerifier} the updated verifier
	 * @throws {RangeError} if the path is not a relative
	 */
	isRelative(): this
	{
		this.validator.isRelative();
		return this.validationResult();
	}

	getActual(): URL
	{
		return super.getActual() as URL;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {UrlVerifier as default};