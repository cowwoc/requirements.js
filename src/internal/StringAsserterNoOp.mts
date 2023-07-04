import
{
	NumberAsserter,
	NumberAsserterNoOp,
	ObjectAsserterNoOp,
	StringAsserter
} from "./internal.mjs";

/**
 * An implementation of <code>StringAsserter</code> that does nothing. An asserter that ignores all
 * subsequent failures because they are guaranteed to fail and wouldn't add any value to the end-user. For
 * example, an attempt was made to dereference null or cast the value to an incompatible type.
 */
class StringAsserterNoOp extends ObjectAsserterNoOp
	implements StringAsserter
{
	static readonly INSTANCE = new StringAsserterNoOp();

	/**
	 * @return {StringAsserter} the updated asserter
	 */
	startsWith(): StringAsserter
	{
		return this;
	}

	/**
	 * @return {StringAsserter} the updated asserter
	 */
	doesNotStartWith(): StringAsserter
	{
		return this;
	}

	/**
	 * @return {StringAsserter} the updated asserter
	 */
	contains(): StringAsserter
	{
		return this;
	}

	/**
	 * @return {StringAsserter} the updated asserter
	 */
	doesNotContain(): StringAsserter
	{
		return this;
	}

	/**
	 * @return {StringAsserter} the updated asserter
	 */
	endsWith(): StringAsserter
	{
		return this;
	}

	/**
	 * @return {StringAsserter} the updated asserter
	 */
	doesNotEndWith(): StringAsserter
	{
		return this;
	}

	/**
	 * @return {StringAsserter} the updated asserter
	 */
	isEmpty(): StringAsserter
	{
		return this;
	}

	/**
	 * @return {StringAsserter} the updated asserter
	 */
	isNotEmpty(): StringAsserter
	{
		return this;
	}

	/**
	 * @return {StringAsserter} an asserter for the trimmed representation of the actual value
	 */
	trim(): StringAsserter
	{
		return this;
	}

	/**
	 * @return {StringAsserter} the updated asserter
	 */
	trimConsumer(): StringAsserter
	{
		return this;
	}

	/**
	 * @return {StringAsserter} the updated asserter
	 */
	isTrimmed(): StringAsserter
	{
		return this;
	}

	/**
	 * @return {NumberAsserter} an asserter for the length of the string
	 */
	length(): NumberAsserter
	{
		return NumberAsserterNoOp.INSTANCE;
	}

	/**
	 * @return {StringAsserter} the updated asserter
	 */
	lengthConsumer(): StringAsserter
	{
		return this;
	}

	/**
	 * @return {StringAsserter} the updated asserter
	 */
	asString(): StringAsserter
	{
		return this;
	}

	/**
	 * @return {StringAsserter} the updated asserter
	 */
	asStringConsumer(): StringAsserter
	{
		return this;
	}

	/**
	 * @return {StringAsserter} the updated asserter
	 */
	asInetAddressConsumer(): StringAsserter
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {StringAsserterNoOp as default};