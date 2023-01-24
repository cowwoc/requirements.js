import
{
	AbstractNumberAsserterNoOp,
	NumberAsserter
} from "./internal.js";

/**
 * An implementation of <code>NumberAsserter</code> that does nothing. An asserter that ignores all
 * subsequent failures because they are guaranteed to fail and wouldn't add any value to the end-user. For
 * example, an attempt was made to dereference null or cast the value to an incompatible type.
 */
class NumberAsserterNoOp extends AbstractNumberAsserterNoOp<NumberAsserter>
	implements NumberAsserter
{
	static readonly INSTANCE = new NumberAsserterNoOp();

	protected getThis(): NumberAsserter
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {NumberAsserterNoOp as default};