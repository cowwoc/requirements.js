import {
	ArrayVerifier,
	ArrayVerifierNoOp,
	BooleanVerifier,
	BooleanVerifierNoOp,
	ClassVerifier,
	ClassVerifierNoOp,
	ExtensibleObjectVerifier,
	InetAddressVerifier,
	InetAddressVerifierNoOp,
	MapVerifier,
	MapVerifierNoOp,
	NumberVerifier,
	NumberVerifierNoOp,
	SetVerifier,
	SetVerifierNoOp,
	StringVerifier,
	StringVerifierNoOp
} from "../internal";

/**
 * An implementation of <code>ObjectVerifier</code> that does nothing. A verifier that ignores all
 * subsequent failures because they are guaranteed to fail and wouldn't add any value to the end-user. For
 * example, an attempt was made to dereference null or cast the value to an incompatible type.
 */
abstract class AbstractObjectVerifierNoOp<S> implements ExtensibleObjectVerifier<S>
{
	/**
	 * @return this
	 */
	protected abstract getThis(): S;

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 */
	isEqualTo(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 */
	validationResult<R>(): R | S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 */
	isNotEqualTo(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 */
	isNotInArray(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 */
	isPrimitive(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 */
	isTypeOf(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 */
	isInstanceOf(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 */
	isNull(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 */
	isNotNull(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 */
	isDefined(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 */
	isNotDefined(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 */
	isSet(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
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
	 * @return {ArrayVerifier} a verifier for the <code>Array</code>
	 */
	asArray(): ArrayVerifier
	{
		return ArrayVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 */
	asArrayConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {BooleanVerifier} a verifier for the <code>boolean</code>
	 */
	asBoolean(): BooleanVerifier
	{
		return BooleanVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 */
	asBooleanConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {StringVerifier} a verifier for the object's string representation
	 */
	asString(): StringVerifier
	{
		return StringVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 */
	asStringConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {NumberVerifier} a verifier for the <code>number</code>
	 */
	asNumber(): NumberVerifier
	{
		return NumberVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 */
	asNumberConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {SetVerifier} a verifier for the <code>Set</code>
	 */
	asSet(): SetVerifier
	{
		return SetVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {ExtensibleObjectVerifier} a verifier for the <code>Set</code>
	 */
	asSetConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {MapVerifier} a verifier for the <code>Map</code>
	 */
	asMap(): MapVerifier
	{
		return MapVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {ExtensibleObjectVerifier} a verifier for the <code>Map</code>
	 */
	asMapConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {InetAddressVerifier} a verifier for the value's Internet address representation
	 */
	asInetAddress(): InetAddressVerifier
	{
		return InetAddressVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 */
	asInetAddressConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ClassVerifier} a verifier for the object's class representation
	 */
	asClass(): ClassVerifier
	{
		return ClassVerifierNoOp.INSTANCE;
	}

	/**
	 * @return {ExtensibleObjectVerifier} the updated verifier
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
export {AbstractObjectVerifierNoOp as default};