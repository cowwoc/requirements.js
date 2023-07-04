import
{
	AbstractObjectAsserterNoOp,
	BooleanAsserter
} from "./internal.mjs";

/**
 * An implementation of <code>BooleanAsserter</code> that does nothing.
 */
class BooleanAsserterNoOp extends AbstractObjectAsserterNoOp<BooleanAsserter>
	implements BooleanAsserter
{
	static readonly INSTANCE = new BooleanAsserterNoOp();

	protected getThis(): BooleanAsserter
	{
		return this;
	}

	/**
	 * @return {BooleanAsserter} the updated asserter
	 */
	isTrue(): BooleanAsserter
	{
		return this;
	}

	/**
	 * @return {BooleanAsserter} the updated asserter
	 */
	isFalse(): BooleanAsserter
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {BooleanAsserterNoOp as default};