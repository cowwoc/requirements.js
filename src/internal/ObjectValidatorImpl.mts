import
{
	AbstractObjectValidator,
	Configuration,
	ObjectValidator,
	ObjectValidatorNoOp
} from "./internal.mjs";

/**
 * Default implementation of <code>ObjectValidator</code>.
 */
class ObjectValidatorImpl extends AbstractObjectValidator<ObjectValidator>
	implements ObjectValidator
{
	/**
	 * Creates a new ObjectValidator.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {object} actual the actual value
	 * @param {string} name the name of the value
	 * @throws {TypeError} if <code>configuration</code> or <code>name</code> are null or undefined
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	constructor(configuration: Configuration, actual: unknown, name: string)
	{
		super(configuration, actual, name);
	}

	protected getThis(): ObjectValidator
	{
		return this;
	}

	protected getNoOp(): ObjectValidator
	{
		return new ObjectValidatorNoOp(this.failures);
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ObjectValidatorImpl as default};