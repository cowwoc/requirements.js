import ObjectVerifierNoOp from "./circular_dependency/ObjectVerifierNoOpBase.js";

/**
 * An implementation of <code>UriVerifier</code> that does nothing.
 */
class UriVerifierNoOp extends ObjectVerifierNoOp
{
	/**
	 * @return {UriVerifierNoOp} the updated verifier
	 */
	isAbsolute()
	{
		return this;
	}

	/**
	 * @return {UriVerifierNoOp} the updated verifier
	 */
	isRelative()
	{
		return this;
	}
}

UriVerifierNoOp.INSTANCE = new UriVerifierNoOp();

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {UriVerifierNoOp as default};