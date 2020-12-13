import {
	AbstractNumberValidator,
	Configuration,
	NumberValidator,
	NumberValidatorNoOp
} from "./internal";

/**
 * Default implementation of <code>NumberValidator</code>.
 */
class NumberValidatorImpl extends AbstractNumberValidator<NumberValidator>
	implements NumberValidator
{
	/**
	 * Creates a new NumberValidator.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {Array} actual the actual value
	 * @param {string} [name] the name of the value
	 * @throws {TypeError} if <code>configuration</code> or <code>name</code> are null or undefined
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	constructor(configuration: Configuration, actual: unknown, name: string)
	{
		super(configuration, actual, name);
	}

	protected getNoOp(): NumberValidator
	{
		return new NumberValidatorNoOp(this.failures);
	}

	protected getThis(): NumberValidator
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {NumberValidatorImpl as default};