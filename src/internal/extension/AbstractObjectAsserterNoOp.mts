import
{
	ArrayAsserter,
	ArrayAsserterNoOp,
	BooleanAsserter,
	BooleanAsserterNoOp,
	ClassAsserter,
	ClassAsserterNoOp,
	ExtensibleObjectAsserter,
	InetAddressAsserter,
	InetAddressAsserterNoOp,
	MapAsserter,
	MapAsserterNoOp,
	NumberAsserter,
	NumberAsserterNoOp,
	SetAsserter,
	SetAsserterNoOp,
	StringAsserter,
	StringAsserterNoOp
} from "../internal.mjs";

/**
 * An implementation of <code>ExtensibleObjectAsserter</code> that does nothing. An asserter that ignores all
 * subsequent failures because they are guaranteed to fail and wouldn't add any value to the end-user. For
 * example, an attempt was made to dereference null or cast the value to an incompatible type.
 */
abstract class AbstractObjectAsserterNoOp<S> implements ExtensibleObjectAsserter<S>
{
	/**
	 * @return this
	 */
	protected abstract getThis(): S;

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 */
	isEqualTo(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 */
	validationResult<R>(): R | S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 */
	isNotEqualTo(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 */
	isNotInArray(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 */
	isPrimitive(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 */
	isTypeOf(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 */
	isInstanceOf(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 */
	isNull(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 */
	isNotNull(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 */
	isDefined(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 */
	isNotDefined(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 */
	isSet(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 */
	isNotSet(): S
	{
		return this.getThis();
	}

	/**
	 * Indicates if the actual value is available.
	 *
	 * @return {boolean} <code>false</code>
	 */
	isActualAvailable(): boolean
	{
		return false;
	}

	/**
	 * Returns the actual value. The return value is undefined if {@link #isActualAvailable()} is
	 * <code>false</code>.
	 */
	getActual(): void
	{
		// Value not available
	}

	/**
	 * @return {ArrayAsserter} an asserter for the <code>Array</code>
	 */
	asArray(): ArrayAsserter
	{
		return ArrayAsserterNoOp.INSTANCE;
	}

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 */
	asArrayConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {BooleanAsserter} an asserter for the <code>boolean</code>
	 */
	asBoolean(): BooleanAsserter
	{
		return BooleanAsserterNoOp.INSTANCE;
	}

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 */
	asBooleanConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {StringAsserter} an asserter for the object's string representation
	 */
	asString(): StringAsserter
	{
		return StringAsserterNoOp.INSTANCE;
	}

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 */
	asStringConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {NumberAsserter} an asserter for the <code>number</code>
	 */
	asNumber(): NumberAsserter
	{
		return NumberAsserterNoOp.INSTANCE;
	}

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 */
	asNumberConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {SetAsserter} an asserter for the <code>Set</code>
	 */
	asSet(): SetAsserter
	{
		return SetAsserterNoOp.INSTANCE;
	}

	/**
	 * @return {ExtensibleObjectAsserter} an asserter for the <code>Set</code>
	 */
	asSetConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {MapAsserter} an asserter for the <code>Map</code>
	 */
	asMap(): MapAsserter
	{
		return MapAsserterNoOp.INSTANCE;
	}

	/**
	 * @return {ExtensibleObjectAsserter} an asserter for the <code>Map</code>
	 */
	asMapConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {InetAddressAsserter} an asserter for the value's Internet address representation
	 */
	asInetAddress(): InetAddressAsserter
	{
		return InetAddressAsserterNoOp.INSTANCE;
	}

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 */
	asInetAddressConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ClassAsserter} an asserter for the object's class representation
	 */
	asClass(): ClassAsserter
	{
		return ClassAsserterNoOp.INSTANCE;
	}

	/**
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asClassConsumer(): S
	{
		return this.getThis();
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {AbstractObjectAsserterNoOp as default};