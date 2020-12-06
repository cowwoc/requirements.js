import {ObjectVerifierNoOp} from "./internal";

/**
 * An implementation of <code>UrlVerifier</code> that does nothing.
 */
class UrlVerifierNoOp extends ObjectVerifierNoOp
{
	static readonly INSTANCE = new UrlVerifierNoOp();

	/**
	 * @return {UrlVerifierNoOp} the updated verifier
	 */
	isAbsolute(): this
	{
		return this;
	}

	/**
	 * @return {UrlVerifierNoOp} the updated verifier
	 */
	isRelative(): this
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {UrlVerifierNoOp as default};