import ObjectValidator from "./internal/circular_dependency/ObjectValidatorBase.js";
import Objects from "./internal/Objects.js";
import ValidationFailure from "./ValidationFailure.js";

/**
 * Validates the requirements of a type.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class ClassValidator extends ObjectValidator
{
	/**
	 * Ensures that the actual value is the specified type, or a sub-type.
	 *
	 * @param {object} type the type to compare to
	 * @return {ClassValidator} the updated validator
	 */
	isSubTypeOf(type)
	{
		if (!Objects.extends(this.actual, type))
		{
			const failure = new ValidationFailure(this.config, RangeError,
				this.name + " must be a sub-type of " + type).
				addContext("Actual", Objects.getTypeOf(this.actual));
			this.failures.push(failure);
		}
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ClassValidator as default};