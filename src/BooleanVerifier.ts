import {
	BooleanValidator,
	BooleanValidatorNoOp,
	ObjectVerifier
} from "./internal/internal";

/**
 * Verifies the requirements of a <code>boolean</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class BooleanVerifier<V extends BooleanValidator | BooleanValidatorNoOp> extends ObjectVerifier<V>
{
	/**
	 * Ensures that the actual value is true.
	 *
	 * @return {BooleanVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not true
	 */
	isTrue(): this
	{
		this.validator.isTrue();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is false.
	 *
	 * @return {BooleanVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not false
	 */
	isFalse(): this
	{
		this.validator.isFalse();
		return this.validationResult();
	}

	getActual(): boolean
	{
		return super.getActual() as boolean;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {BooleanVerifier as default};