import ObjectValidatorNoOp from "./ObjectValidatorNoOp.js";

// DESIGN:
// * Declare the class without methods that trigger circular dependencies
// * Load the dependencies
// * Add the missing methods

/**
 * An implementation of <code>ArrayValidator</code> that does nothing.
 */
class ArrayValidatorNoOp extends ObjectValidatorNoOp
{
	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	isEmpty()
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	isNotEmpty()
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	contains()
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	containsExactly()
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	containsAny()
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	containsAll()
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	doesNotContain()
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	doesNotContainAny()
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	doesNotContainAll()
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	doesNotContainDuplicates()
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	lengthConsumer()
	{
		return this;
	}

	/**
	 * @return {ArrayValidatorNoOp} the updated validator
	 */
	asSetConsumer()
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayValidatorNoOp as default};