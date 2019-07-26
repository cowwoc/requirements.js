import ArrayVerifierNoOp from "./circular_dependency/ArrayVerifierNoOpBase.js";
import SizeVerifierNoOp from "./SizeVerifierNoOp.js";
import SetVerifierNoOp from "./SetVerifierNoOp.js";

/**
 * @return {SizeVerifierNoOp} a verifier for the length of the array
 */
ArrayVerifierNoOp.prototype.length = function()
{
	return SizeVerifierNoOp.INSTANCE;
};

/**
 * @return {SetVerifierNoOp} a <code>Set</code> verifier
 */
ArrayVerifierNoOp.prototype.asSet = function()
{
	return SetVerifierNoOp.INSTANCE;
};

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayVerifierNoOp as default};