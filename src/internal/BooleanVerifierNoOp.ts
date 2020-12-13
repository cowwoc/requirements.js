import {
	AbstractObjectVerifierNoOp,
	BooleanVerifier
} from "./internal";

/**
 * An implementation of <code>BooleanVerifier</code> that does nothing.
 */
class BooleanVerifierNoOp extends AbstractObjectVerifierNoOp<BooleanVerifier>
	implements BooleanVerifier
{
	static readonly INSTANCE = new BooleanVerifierNoOp();

	protected getThis(): BooleanVerifier
	{
		return this;
	}

	/**
	 * @return {BooleanVerifier} the updated verifier
	 */
	isTrue(): BooleanVerifier
	{
		return this;
	}

	/**
	 * @return {BooleanVerifier} the updated verifier
	 */
	isFalse(): BooleanVerifier
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {BooleanVerifierNoOp as default};