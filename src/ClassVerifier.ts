import {
	ClassValidator,
	ClassValidatorNoOp,
	ObjectVerifier
} from "./internal/internal";

/**
 * Verifies the requirements of a class.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class ClassVerifier extends ObjectVerifier<ClassValidator | ClassValidatorNoOp>
{
	/**
	 * Ensures that the actual value is the specified type, or a super-type.
	 *
	 * @param {Function} type the type to compare to
	 * @return {ClassVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not a supertype of <code>type</code>
	 */
	isSupertypeOf(type: new (...args: never[]) => unknown): this
	{
		this.validator.isSupertypeOf(type);
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is the specified type, or a sub-type.
	 *
	 * @param {Function} type the type to compare to
	 * @return {ClassVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not a subtype of <code>type</code>
	 */
	isSubtypeOf(type: new (...args: never[]) => unknown): this
	{
		this.validator.isSubtypeOf(type);
		return this.validationResult();
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ClassVerifier as default};