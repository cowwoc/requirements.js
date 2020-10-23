import {ObjectVerifierNoOp} from "./internal";

/**
 * An implementation of <code>ClassVerifier</code> that does nothing.
 */
class ClassVerifierNoOp extends ObjectVerifierNoOp
{
	static readonly INSTANCE = new ClassVerifierNoOp();

	/**
	 * @return {ClassVerifierNoOp} the updated verifier
	 */
	isSupertypeOf(): this
	{
		return this;
	}

	/**
	 * @return {ClassVerifierNoOp} the updated verifier
	 */
	isSubtypeOf(): this
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ClassVerifierNoOp as default};