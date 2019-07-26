import ObjectVerifierNoOp from "./circular_dependency/ObjectVerifierNoOpBase.js";

/**
 * An implementation of <code>ClassVerifier</code> that does nothing.
 */
class ClassVerifierNoOp extends ObjectVerifierNoOp
{
	/**
	 * @return {ClassVerifierNoOp} the updated verifier
	 */
	isSubTypeOf()
	{
		return this;
	}
}

ClassVerifierNoOp.INSTANCE = new ClassVerifierNoOp();

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ClassVerifierNoOp as default};