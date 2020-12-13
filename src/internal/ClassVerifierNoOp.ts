import {
	ClassVerifier,
	ObjectVerifierNoOp
} from "./internal";

/**
 * An implementation of <code>ClassVerifier</code> that does nothing.
 */
class ClassVerifierNoOp extends ObjectVerifierNoOp
	implements ClassVerifier
{
	static readonly INSTANCE = new ClassVerifierNoOp();

	/**
	 * @return {ClassVerifier} the updated verifier
	 */
	isSupertypeOf(): ClassVerifier
	{
		return this;
	}

	/**
	 * @return {ClassVerifier} the updated verifier
	 */
	isSubtypeOf(): ClassVerifier
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ClassVerifierNoOp as default};