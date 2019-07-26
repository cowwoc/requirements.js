// DESIGN:
// * Declare the class without methods that trigger circular dependencies
// * Load the dependencies
// * Add the missing methods

import Objects from "../Objects.js";
import ValidationFailure from "../../ValidationFailure.js";

/**
 * An implementation of <code>ObjectValidator</code> that does nothing. A validator that ignores all
 * subsequent failures because they are guaranteed to fail and would add any value to the end-user. For
 * example, an attempt was made to dereference null or cast the value to an incompatible type.
 */
class ObjectValidatorNoOp
{
	/**
	 * Creates a new ObjectValidatorNoOp.
	 *
	 * @param {Array<ValidationFailure>} failures the list of validation failures
	 * @return {ObjectValidatorNoOp} a new ObjectValidatorNoOp
	 * @throws {TypeError}  if <code>failures</code> is null or undefined
	 */
	constructor(failures)
	{
		Objects.assertThatTypeOf(failures, "failures", "Array");
		Object.defineProperty(this, "failures",
			{
				value: failures
			});
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isEqualTo()
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isNotEqualTo()
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isNotInArray()
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isPrimitive()
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isTypeOf()
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isInstanceOf()
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isNull()
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isNotNull()
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isDefined()
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isNotDefined()
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isSet()
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isNotSet()
	{
		return this;
	}

	/**
	 * Indicates if the actual value is available.
	 *
	 * @return {boolean} <code>false</code>
	 */
	isActualAvailable()
	{
		return false;
	}

	/**
	 * Returns the actual value. The return value is undefined if {@link #isActualAvailable()} is
	 * <code>false</code>.
	 *
	 * @return {undefined}
	 */
	getActual()
	{
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ObjectValidatorNoOp as default};