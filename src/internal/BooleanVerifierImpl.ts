import
{
	AbstractObjectVerifier,
	BooleanValidator,
	BooleanVerifier
} from "./internal.js";

/**
 * Default implementation of <code>BooleanVerifier</code>.
 */
class BooleanVerifierImpl extends AbstractObjectVerifier<BooleanVerifier, BooleanValidator>
	implements BooleanVerifier
{
	/**
	 * Creates a new BooleanVerifierImpl.
	 *
	 * @param {object} validator the validator to delegate to
	 * @throws {TypeError} if <code>validator</code> is null or undefined
	 */
	constructor(validator: BooleanValidator)
	{
		super(validator);
	}

	protected getThis(): BooleanVerifier
	{
		return this;
	}

	/**
	 * Ensures that the actual value is true.
	 *
	 * @return {BooleanVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not true
	 */
	isTrue(): BooleanVerifier
	{
		this.validator.isTrue();
		return this.validationResult();
	}

	/**
	 * Ensures that the actual value is false.
	 *
	 * @return {BooleanVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not false
	 */
	isFalse(): BooleanVerifier
	{
		this.validator.isFalse();
		return this.validationResult();
	}

	getActual(): boolean
	{
		return super.getActual() as boolean;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {BooleanVerifierImpl as default};