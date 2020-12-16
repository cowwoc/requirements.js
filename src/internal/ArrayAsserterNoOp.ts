import {
	AbstractObjectAsserterNoOp,
	ArrayAsserter,
	NumberAsserter,
	NumberAsserterNoOp,
	SetAsserter,
	SetAsserterNoOp
} from "./internal";

/**
 * An implementation of <code>ArrayAsserter</code> that does nothing.
 */
class ArrayAsserterNoOp extends AbstractObjectAsserterNoOp<ArrayAsserter>
	implements ArrayAsserter
{
	static readonly INSTANCE = new ArrayAsserterNoOp();

	protected getThis(): ArrayAsserter
	{
		return this;
	}

	/**
	 * @return {ArrayAsserterNoOp} the updated asserter
	 */
	isEmpty(): ArrayAsserter
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayAsserterNoOp} the updated asserter
	 */
	isNotEmpty(): ArrayAsserter
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayAsserterNoOp} the updated asserter
	 */
	contains(): ArrayAsserter
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayAsserterNoOp} the updated asserter
	 */
	containsExactly(): ArrayAsserter
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayAsserterNoOp} the updated asserter
	 */
	containsAny(): ArrayAsserter
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayAsserterNoOp} the updated asserter
	 */
	containsAll(): ArrayAsserter
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayAsserterNoOp} the updated asserter
	 */
	doesNotContain(): ArrayAsserter
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayAsserterNoOp} the updated asserter
	 */
	doesNotContainAny(): ArrayAsserter
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayAsserterNoOp} the updated asserter
	 */
	doesNotContainAll(): ArrayAsserter
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayAsserterNoOp} the updated asserter
	 */
	doesNotContainDuplicates(): ArrayAsserter
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayAsserterNoOp} the updated asserter
	 */
	lengthConsumer(): ArrayAsserter
	{
		return this.getThis();
	}

	/**
	 * @return {ArrayAsserterNoOp} the updated asserter
	 */
	asSetConsumer(): ArrayAsserter
	{
		return this.getThis();
	}

	/**
	 * @return {NumberAsserter} an asserter for the length of the array
	 */
	length(): NumberAsserter
	{
		return NumberAsserterNoOp.INSTANCE;
	}

	/**
	 * @return {SetAsserter} a <code>Set</code> asserter
	 */
	asSet(): SetAsserter
	{
		return SetAsserterNoOp.INSTANCE;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayAsserterNoOp as default};