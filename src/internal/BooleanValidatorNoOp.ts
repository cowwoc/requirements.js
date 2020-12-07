import {ObjectValidatorNoOp} from "./internal";

/**
 * An implementation of <code>BooleanValidator</code> that does nothing.
 */
class BooleanValidatorNoOp extends ObjectValidatorNoOp
{
	/**
	 * @return {BooleanValidatorNoOp} the updated validator
	 */
	isTrue(): BooleanValidatorNoOp
	{
		return this;
	}

	/**
	 * @return {BooleanValidatorNoOp} the updated validator
	 */
	isFalse(): BooleanValidatorNoOp
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {BooleanValidatorNoOp as default};