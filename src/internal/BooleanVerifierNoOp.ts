import {ObjectVerifierNoOp} from "./internal";

/**
 * An implementation of <code>BooleanVerifier</code> that does nothing.
 */
class BooleanVerifierNoOp extends ObjectVerifierNoOp
{
	static readonly INSTANCE = new BooleanVerifierNoOp();

	/**
	 * @return {BooleanVerifierNoOp} the updated verifier
	 */
	isTrue(): this
	{
		return this;
	}

	/**
	 * @return {BooleanVerifierNoOp} the updated verifier
	 */
	isFalse(): this
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {BooleanVerifierNoOp as default};