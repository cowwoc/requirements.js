import {
	Configuration,
	ObjectValidator,
	ValidationFailure
} from "./internal/internal";

/**
 * Validates the requirements of a <code>boolean</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class BooleanValidator extends ObjectValidator
{
	private readonly actualBoolean: boolean;

	constructor(configuration: Configuration, actual: unknown, name: string)
	{
		super(configuration, actual, name);
		this.actualBoolean = actual as boolean;
	}

	/**
	 * Ensures that the actual value is true.
	 *
	 * @return {BooleanValidator} the updated validator
	 */
	isTrue(): this
	{
		if (!this.actualBoolean)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be true.").
				addContext("Actual", this.actualBoolean);
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the actual value is false.
	 *
	 * @return {BooleanValidator} the updated validator
	 */
	isFalse(): this
	{
		if (this.actualBoolean)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be false.").
				addContext("Actual", this.actualBoolean);
			this.failures.push(failure);
		}
		return this;
	}

	getActual(): boolean
	{
		return super.getActual() as boolean;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {BooleanValidator as default};