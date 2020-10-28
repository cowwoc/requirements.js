import {
	Configuration,
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
	// eslint-disable-next-line @typescript-eslint/ban-types
	private readonly actualClass: Function;

	constructor(configuration: Configuration, actual: unknown, name: string)
	{
		super(configuration, actual, name);

		// eslint-disable-next-line @typescript-eslint/ban-types
		this.actualClass = actual as Function;
	}

	/**
	 * Ensures that the actual value is the specified type, or a sub-type.
	 *
	 * @param {Function} type the type to compare to
	 * @return {ClassValidator} the updated validator
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isSupertypeOf(type: Function): this
	{
		const typeOfType = Objects.getTypeOf(type);
		if (typeOfType === "Function")
		{
			if (Objects.extends(type, this.actualClass))
				return this;
		}
		const failure = new ValidationFailure(this.config, RangeError,
			this.name + " must be a super-type of " + typeOfType).
			addContext("Actual", typeOfType);
		this.failures.push(failure);
		return this;
	}

	/**
	 * Ensures that the actual value is the specified type, or a sub-type.
	 *
	 * @param {Function} type the type to compare to
	 * @return {ClassValidator} the updated validator
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isSubtypeOf(type: Function): this
	{
		const typeOfType = Objects.getTypeOf(type);
		if (typeOfType === "Function")
		{
			if (Objects.extends(this.actualClass, type))
				return this;
		}
		const failure = new ValidationFailure(this.config, RangeError,
			this.name + " must be a sub-type of " + typeOfType).
			addContext("Actual", Objects.getTypeOf(this.actual));
		this.failures.push(failure);
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ClassValidator as default};