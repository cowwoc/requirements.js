import {
	AbstractObjectValidator,
	BooleanValidator,
	BooleanValidatorNoOp,
	Configuration,
	ValidationFailure
} from "./internal";

/**
 * Default implementation of <code>BooleanValidator</code>.
 */
class BooleanValidatorImpl extends AbstractObjectValidator<BooleanValidator>
	implements BooleanValidator
{
	private readonly actualBoolean: boolean;

	/**
	 * Creates a new BooleanValidator.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {object} actual the actual value
	 * @param {string} name   the name of the value
	 * @throws {TypeError} if <code>configuration</code> or <code>name</code> are null or undefined
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	constructor(configuration: Configuration, actual: unknown, name: string)
	{
		super(configuration, actual, name);
		this.actualBoolean = actual as boolean;
	}

	protected getThis(): BooleanValidator
	{
		return this;
	}

	protected getNoOp(): BooleanValidator
	{
		return new BooleanValidatorNoOp(this.failures);
	}

	isTrue(): BooleanValidator
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		if (!this.actualBoolean)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be true.").
				addContext("Actual", this.actualBoolean);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	isFalse(): BooleanValidator
	{
		if (!this.requireThatActualIsSet())
			return this.getNoOp();
		if (this.actualBoolean)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be false.").
				addContext("Actual", this.actualBoolean);
			this.failures.push(failure);
		}
		return this.getThis();
	}

	getActual(): boolean
	{
		return super.getActual() as boolean;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {BooleanValidatorImpl as default};