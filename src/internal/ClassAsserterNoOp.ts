import {
	ClassAsserter,
	ObjectAsserterNoOp
} from "./internal";

/**
 * An implementation of <code>ClassAsserter</code> that does nothing.
 */
class ClassAsserterNoOp extends ObjectAsserterNoOp
	implements ClassAsserter
{
	static readonly INSTANCE = new ClassAsserterNoOp();

	/**
	 * @return {ClassAsserter} the updated asserter
	 */
	isSupertypeOf(): ClassAsserter
	{
		return this;
	}

	/**
	 * @return {ClassAsserter} the updated asserter
	 */
	isSubtypeOf(): ClassAsserter
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ClassAsserterNoOp as default};