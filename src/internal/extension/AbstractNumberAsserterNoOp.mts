import
{
	AbstractObjectAsserterNoOp,
	ExtensibleNumberAsserter
} from "../internal.mjs";

/**
 * An implementation of <code>ExtensibleNumberAsserter</code> that does nothing. An asserter that ignores all
 * subsequent failures because they are guaranteed to fail and wouldn't add any value to the end-user. For
 * example, an attempt was made to dereference null or cast the value to an incompatible type.
 */
abstract class AbstractNumberAsserterNoOp<S> extends AbstractObjectAsserterNoOp<S>
	implements ExtensibleNumberAsserter<S>
{
	/**
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 */
	isNegative(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 */
	isNotNegative(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 */
	isZero(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 */
	isNotZero(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 */
	isPositive(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 */
	isNotPositive(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 */
	isGreaterThan(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 */
	isGreaterThanOrEqualTo(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 */
	isLessThan(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 */
	isLessThanOrEqualTo(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 */
	isBetween(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 */
	isBetweenClosed(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 */
	isNumber(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 */
	isNotNumber(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 */
	isFinite(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberAsserter} the updated asserter
	 */
	isNotFinite(): S
	{
		return this.getThis();
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {AbstractNumberAsserterNoOp as default};