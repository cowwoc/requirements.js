import type {ObjectValidatorNoOp} from "./internal";
import {
	ArrayValidatorNoOp,
	Configuration,
	ContextGenerator,
	ContextLine,
	Objects,
	ValidationFailure
} from "./internal";

/**
 * Validates the requirements of an object.
 */
abstract class AbstractObjectValidator
{
	protected readonly config: Configuration;
	protected actual: unknown;
	protected readonly name: string;
	readonly failures: ValidationFailure[] = [];

	/**
	 * @return {ObjectValidatorNoOp | ArrayValidatorNoOp} a validator that does nothing
	 * @protected
	 */
	protected abstract getNoOp(): ObjectValidatorNoOp | ArrayValidatorNoOp;

	/**
	 * Creates a new AbstractObjectValidator.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {object} actual the actual value
	 * @param {string} name the name of the value
	 * @throws {TypeError}  if <code>name</code> or <code>config</code> are null or undefined
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	protected constructor(configuration: Configuration, actual: unknown, name: string)
	{
		Objects.assertThatInstanceOf(configuration, "configuration", Configuration);
		Objects.verifyName(name, "name");
		this.config = configuration;
		this.actual = actual;
		this.name = name;
	}

	/**
	 * @return {boolean} false if the actual value is <code>null</code> or <code>undefined</code>
	 * @protected
	 */
	protected actualIsSet(): boolean
	{
		if (typeof (this.actual) === "undefined")
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " must be defined.").
				addContextList(this.getContext(null, true));
			this.failures.push(failure);
			return false;
		}
		if (this.actual === null)
		{
			const failure = new ValidationFailure(this.config, RangeError, this.name + " may not be null.").
				addContextList(this.getContext(null, true));
			this.failures.push(failure);
			return false;
		}
		return true;
	}


	/**
	 * @param {object} expected the expected value
	 * @param {boolean} expectedInMessage true if the expected value is already mentioned in the failure message
	 * @return {ContextLine[]} the list of name-value pairs to append to the exception message
	 * @private
	 */
	protected getContext(expected: unknown, expectedInMessage: boolean): ContextLine[]
	{
		const contextGenerator = new ContextGenerator(this.config);
		return contextGenerator.getContext("Actual", this.actual, "Expected", expected,
			expectedInMessage);
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {AbstractObjectValidator as default};