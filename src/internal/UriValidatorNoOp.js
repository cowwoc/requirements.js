import ObjectValidatorNoOp from "./circular_dependency/ObjectValidatorNoOp.js";

/**
 * An implementation of <code>UriValidator</code> that does nothing.
 */
class UriValidatorNoOp extends ObjectValidatorNoOp
{
	/**
	 * @return {UriValidatorNoOp} the updated validator
	 */
	isAbsolute()
	{
		return this;
	}

	/**
	 * @return {UriValidatorNoOp} the updated validator
	 */
	isRelative()
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {UriValidatorNoOp as default};