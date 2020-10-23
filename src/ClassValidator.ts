import {
	Objects,
	ObjectValidator,
	ValidationFailure
} from "./internal/internal";

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
	 * @param {Function} type the type to compare to
	 * @return {ClassValidator} the updated validator
	 */
	isSupertypeOf(type: new (...args: never[]) => unknown): this
	{
		const nameOfType = Objects.getTypeOf(type);
		if (nameOfType === "Function")
		{
			const actualClass = this.actual as new (...args: never[]) => unknown;
			if (Objects.extends(type, actualClass))
				return this;
		}
		const failure = new ValidationFailure(this.config, RangeError,
			this.name + " must be a super-type of " + nameOfType).
			addContext("Actual", nameOfType);
		this.failures.push(failure);
		return this;
	}

	/**
	 * Ensures that the actual value is the specified type, or a sub-type.
	 *
	 * @param {Function} type the type to compare to
	 * @return {ClassValidator} the updated validator
	 */
	isSubtypeOf(type: new (...args: never[]) => unknown): this
	{
		const nameOfType = Objects.getTypeOf(type);
		if (nameOfType === "Function")
		{
			const actualClass = this.actual as new (...args: never[]) => unknown;
			if (Objects.extends(actualClass, type))
				return this;
		}
		const failure = new ValidationFailure(this.config, RangeError,
			this.name + " must be a sub-type of " + nameOfType).
			addContext("Actual", Objects.getTypeOf(this.actual));
		this.failures.push(failure);
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ClassValidator as default};