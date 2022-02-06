import {
	ArrayValidator,
	ArrayValidatorNoOp,
	BooleanValidator,
	BooleanValidatorNoOp,
	ClassValidator,
	ClassValidatorNoOp,
	ExtensibleObjectValidator,
	InetAddressValidator,
	InetAddressValidatorNoOp,
	MapValidator,
	MapValidatorNoOp,
	NumberValidator,
	NumberValidatorNoOp,
	Objects,
	SetValidator,
	SetValidatorNoOp,
	StringValidator,
	StringValidatorNoOp,
	ValidationFailure
} from "../internal";

/**
 * An extensible implementation of <code>ObjectValidator</code> that does nothing. A validator that ignores
 * all subsequent failures because they are guaranteed to fail and wouldn't add any value to the end-user. For
 * example, an attempt was made to dereference null or cast the value to an incompatible type.
 */
abstract class AbstractObjectValidatorNoOp<S> implements ExtensibleObjectValidator<S>
{
	protected readonly failures: ValidationFailure[];

	/**
	 * Creates a new AbstractObjectValidatorNoOp.
	 *
	 * @param {ValidationFailure[]} failures the list of validation failures
	 * @throws {TypeError} if <code>failures</code> is null or undefined
	 */
	protected constructor(failures: ValidationFailure[])
	{
		Objects.assertThatTypeOf(failures, "failures", "array");
		this.failures = failures;
	}

	/**
	 * @return this
	 */
	protected abstract getThis(): S;

	/**
	 * @return {ExtensibleObjectValidator} the updated validator
	 */
	isEqualTo(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectValidator} the updated validator
	 */
	isNotEqualTo(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectValidator} the updated validator
	 */
	isNotInArray(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectValidator} the updated validator
	 */
	isPrimitive(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectValidator} the updated validator
	 */
	isTypeOf(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectValidator} the updated validator
	 */
	isInstanceOf(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectValidator} the updated validator
	 */
	isNull(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectValidator} the updated validator
	 */
	isNotNull(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectValidator} the updated validator
	 */
	isDefined(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectValidator} the updated validator
	 */
	isNotDefined(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectValidator} the updated validator
	 */
	isSet(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ExtensibleObjectValidator} the updated validator
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
	 * @return {ArrayValidator} a validator for the <code>Array</code>
	 */
	asArray(): ArrayValidator
	{
		return new ArrayValidatorNoOp(this.failures);
	}

	/**
	 * @return {ExtensibleObjectValidator} the updated validator
	 */
	asArrayConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {StringValidator} a validator for the object's string representation
	 */
	asString(): StringValidator
	{
		return new StringValidatorNoOp(this.failures);
	}

	/**
	 * @return {ExtensibleObjectValidator} the updated validator
	 */
	asStringConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {BooleanValidator} a validator for the <code>boolean</code>
	 */
	asBoolean(): BooleanValidator
	{
		return new BooleanValidatorNoOp(this.failures);
	}

	/**
	 * @return {ExtensibleObjectValidator} the updated validator
	 */
	asBooleanConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {BooleanValidator} a validator for the <code>number</code>
	 */
	asNumber(): NumberValidator
	{
		return new NumberValidatorNoOp(this.failures);
	}

	/**
	 * @return {ExtensibleObjectValidator} the updated validator
	 */
	asNumberConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {SetValidator} a validator for the <code>Set</code>
	 */
	asSet(): SetValidator
	{
		return new SetValidatorNoOp(this.failures);
	}

	/**
	 * @return {ExtensibleObjectValidator} a validator for the <code>Set</code>
	 */
	asSetConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {MapValidator} a validator for the <code>Map</code>
	 */
	asMap(): MapValidator
	{
		return new MapValidatorNoOp(this.failures);
	}

	/**
	 * @return {ExtensibleObjectValidator} a validator for the <code>Map</code>
	 */
	asMapConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {InetAddressValidator} a validator for the value's Internet address representation
	 */
	asInetAddress(): InetAddressValidator
	{
		return new InetAddressValidatorNoOp(this.failures);
	}

	/**
	 * @return {ExtensibleObjectValidator} the updated validator
	 */
	asInetAddressConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * @return {ClassValidator} a validator for the object's class representation
	 */
	asClass(): ClassValidator
	{
		return new ClassValidatorNoOp(this.failures);
	}

	/**
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asClassConsumer(): S
	{
		return this.getThis();
	}

	/**
	 * Returns the list of failed validations. Modifying the returned list results in an undefined behavior.
	 *
	 * @return {ValidationFailure[]} the list of failed validations
	 */
	getFailures(): ValidationFailure[]
	{
		return this.failures;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {AbstractObjectValidatorNoOp as default};