import {
	ArrayVerifierNoOp,
	ClassVerifierNoOp,
	InetAddressVerifierNoOp,
	MapVerifierNoOp,
	NumberVerifierNoOp,
	SetVerifierNoOp,
	StringVerifierNoOp
} from "./internal";

/**
 * An implementation of <code>ObjectVerifier</code> that does nothing.
 */
class ObjectVerifierNoOp
{
	static readonly INSTANCE = new ObjectVerifierNoOp();

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isEqualTo(): this
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isNotEqualTo(): this
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isNotInArray(): this
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isPrimitive(): this
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isTypeOf(): this
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isInstanceOf(): this
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isNull(): this
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isNotNull(): this
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isDefined(): this
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isNotDefined(): this
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isSet(): this
	{
		return this;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	isNotSet(): this
	{
		return this;
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
	 * @return {ArrayVerifierNoOp} a verifier for the <code>Array</code>
	 */
	asArray(): ArrayVerifierNoOp
	{
		return ArrayVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	asArrayConsumer(): this
	{
		return this;
	}

	/**
	 * @return {StringVerifierNoOp} a verifier for the object's string representation
	 */
	asString(): StringVerifierNoOp
	{
		return StringVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	asStringConsumer(): this
	{
		return this;
	}

	/**
	 * @return {NumberVerifierNoOp} a verifier for the <code>number</code>
	 */
	asNumber(): NumberVerifierNoOp
	{
		return NumberVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	asNumberConsumer(): this
	{
		return this;
	}

	/**
	 * @return {SetVerifierNoOp} a verifier for the <code>Set</code>
	 */
	asSet(): SetVerifierNoOp
	{
		return SetVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {ObjectVerifierNoOp} a verifier for the <code>Set</code>
	 */
	asSetConsumer(): this
	{
		return this;
	}

	/**
	 * @return {MapVerifierNoOp} a verifier for the <code>Map</code>
	 */
	asMap(): MapVerifierNoOp
	{
		return MapVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {ObjectVerifierNoOp} a verifier for the <code>Map</code>
	 */
	asMapConsumer(): this
	{
		return this;
	}

	/**
	 * @return {InetAddressVerifierNoOp} a verifier for the value's Internet address representation
	 */
	asInetAddress(): InetAddressVerifierNoOp
	{
		return InetAddressVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 */
	asInetAddressConsumer(): this
	{
		return this;
	}

	/**
	 * @return {ClassVerifierNoOp} a verifier for the object's class representation
	 */
	asClass(): ClassVerifierNoOp
	{
		return ClassVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {ObjectVerifierNoOp} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asClassConsumer(): this
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ObjectVerifierNoOp as default};