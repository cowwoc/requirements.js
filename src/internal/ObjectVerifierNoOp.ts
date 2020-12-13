import {
	AbstractObjectVerifierNoOp,
	ObjectVerifier
} from "./internal";

/**
 * An implementation of <code>ObjectVerifier</code> that does nothing. A verifier that ignores all
 * subsequent failures because they are guaranteed to fail and wouldn't add any value to the end-user. For
 * example, an attempt was made to dereference null or cast the value to an incompatible type.
 */
class ObjectVerifierNoOp extends AbstractObjectVerifierNoOp<ObjectVerifier>
	implements ObjectVerifier
{
	static readonly INSTANCE = new ObjectVerifierNoOp();

	protected getThis(): ObjectVerifierNoOp
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ObjectVerifierNoOp as default};