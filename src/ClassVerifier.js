import ObjectVerifier from "./ObjectVerifier";
import Objects from "./internal/Objects";
import ExceptionBuilder from "./internal/ExceptionBuilder";

class ClassVerifier extends ObjectVerifier
{
	/**
	 * Ensures that the actual value is the specified type, or a sub-type.
	 *
	 * @param {object} type the type to compare to
	 * @return {ClassVerifier} this
	 * @throws {RangeError} if the actual value does not have the specified <code>type</code>
	 */
	isSubTypeOf(type)
	{
		if (Objects.extends(this.actual, type))
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be a sub-type of " + type).
			addContext("Actual", Objects.getTypeOf(this.actual)).
			build();
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {ClassVerifier as default};