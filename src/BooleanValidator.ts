import {
	BooleanValidatorNoOp,
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

	protected getNoOp(): BooleanValidatorNoOp
	{
		return new BooleanValidatorNoOp(this.failures);
	}

	/**
	 * Ensures that the actual value is true.
	 *
	 * @return {BooleanValidator | BooleanValidatorNoOp} the updated validator
	 */
	isTrue(): this | BooleanValidatorNoOp
	{
		if (!this.actualIsSet())
			return this.getNoOp();
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
	 * @return {BooleanValidator | BooleanValidatorNoOp} the updated validator
	 */
	isFalse(): this | BooleanValidatorNoOp
	{
		if (!this.actualIsSet())
			return this.getNoOp();
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