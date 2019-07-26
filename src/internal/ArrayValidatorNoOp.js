import ArrayValidatorNoOp from "./circular_dependency/ArrayValidatorNoOpBase.js";
import SizeValidatorNoOp from "./SizeValidatorNoOp.js";
import SetValidatorNoOp from "./SetValidatorNoOp.js";

/**
 * @return {SizeValidatorNoOp} a validator for the length of the array
 */
ArrayValidatorNoOp.prototype.length = function()
{
	return new SizeValidatorNoOp(this.failures);
};

/**
 * @return {SetValidatorNoOp} a <code>Set</code> validator
 */
ArrayValidatorNoOp.prototype.asSet = function()
{
	return new SetValidatorNoOp(this.failures);
};

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayValidatorNoOp as default};