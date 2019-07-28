import ObjectValidatorNoOp from "./circular_dependency/ObjectValidatorNoOp.js";

/**
 * An implementation of <code>ClassValidator</code> that does nothing.
 */
class ClassValidatorNoOp extends ObjectValidatorNoOp
{
	/**
	 * @return {ClassValidatorNoOp} the updated validator
	 */
	isSupertypeOf()
	{
		return this;
	}

	/**
	 * @return {ClassValidatorNoOp} the updated validator
	 */
	isSubtypeOf()
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ClassValidatorNoOp as default};