import
{
	AbstractNumberVerifier,
	NumberValidator,
	NumberVerifier
} from "./internal.js";

/**
 * Default implementation of <code>NumberVerifier</code>.
 */
class NumberVerifierImpl extends AbstractNumberVerifier<NumberVerifier, NumberValidator>
	implements NumberVerifier
{
	/**
	 * Creates a new NumberVerifierImpl.
	 *
	 * @param {object} validator the validator to delegate to
	 * @throws {TypeError} if <code>validator</code> is null or undefined
	 */
	constructor(validator: NumberValidator)
	{
		super(validator);
	}

	protected getThis(): NumberVerifier
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {NumberVerifierImpl as default};