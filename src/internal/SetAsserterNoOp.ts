import
{
	ArrayAsserter,
	ArrayAsserterNoOp,
	NumberAsserter,
	NumberAsserterNoOp,
	ObjectAsserterNoOp,
	SetAsserter
} from "./internal.js";

/**
 * An implementation of <code>SetAsserter</code> that does nothing. An asserter that ignores all
 * subsequent failures because they are guaranteed to fail and wouldn't add any value to the end-user. For
 * example, an attempt was made to dereference null or cast the value to an incompatible type.
 */
class SetAsserterNoOp extends ObjectAsserterNoOp
	implements SetAsserter
{
	static readonly INSTANCE = new SetAsserterNoOp();

	/**
	 * @return {SetAsserter} the updated asserter
	 */
	isEmpty(): SetAsserter
	{
		return this;
	}

	/**
	 * @return {SetAsserter} the updated asserter
	 */
	isNotEmpty(): SetAsserter
	{
		return this;
	}

	/**
	 * @return {SetAsserter} the updated asserter
	 */
	contains(): SetAsserter
	{
		return this;
	}

	/**
	 * @return {SetAsserter} the updated asserter
	 */
	containsExactly(): SetAsserter
	{
		return this;
	}

	/**
	 * @return {SetAsserter} the updated asserter
	 */
	containsAny(): SetAsserter
	{
		return this;
	}

	/**
	 * @return {SetAsserter} the updated asserter
	 */
	containsAll(): SetAsserter
	{
		return this;
	}

	/**
	 * @return {SetAsserter} the updated asserter
	 */
	doesNotContain(): SetAsserter
	{
		return this;
	}

	/**
	 * @return {SetAsserter} the updated asserter
	 */
	doesNotContainAny(): SetAsserter
	{
		return this;
	}

	/**
	 * @return {SetAsserter} the updated asserter
	 */
	doesNotContainAll(): SetAsserter
	{
		return this;
	}

	/**
	 * @return {NumberAsserter} an asserter for the Set's size
	 */
	size(): NumberAsserter
	{
		return NumberAsserterNoOp.INSTANCE;
	}

	/**
	 * @return {SetAsserter} the updated asserter
	 */
	sizeConsumer(): SetAsserter
	{
		return this;
	}

	/**
	 * @return {ArrayAsserter} an asserter for the Set's elements
	 */
	static asArray(): ArrayAsserter
	{
		return ArrayAsserterNoOp.INSTANCE;
	}

	/**
	 * @return {SetAsserter} the updated asserter
	 */
	asArrayConsumer(): SetAsserter
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SetAsserterNoOp as default};