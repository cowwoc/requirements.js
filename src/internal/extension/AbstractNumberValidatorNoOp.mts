import
{
	AbstractObjectValidatorNoOp,
	ExtensibleNumberValidator
} from "../internal.mjs";

/**
 * An implementation of <code>NumberValidator</code> that does nothing.
 */
abstract class AbstractNumberValidatorNoOp<S> extends AbstractObjectValidatorNoOp<S>
	implements ExtensibleNumberValidator<S>
{
	/**
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isNegative(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isNotNegative(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isZero(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isNotZero(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isPositive(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isNotPositive(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isGreaterThan(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isGreaterThanOrEqualTo(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isLessThan(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isLessThanOrEqualTo(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isBetween(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isBetweenClosed(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isNumber(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isNotNumber(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isFinite(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleNumberValidator} the updated validator
	 */
	isNotFinite(): S
	{
		return this.getThis();
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {AbstractNumberValidatorNoOp as default};