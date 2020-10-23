import {
	ArrayValidatorNoOp,
	ClassValidatorNoOp,
	InetAddressValidatorNoOp,
	MapValidatorNoOp,
	NumberValidatorNoOp,
	Objects,
	SetValidatorNoOp,
	StringValidatorNoOp,
	UriValidatorNoOp,
	ValidationFailure
} from "./internal";

/**
 * An implementation of <code>ObjectValidator</code> that does nothing. A validator that ignores all
 * subsequent failures because they are guaranteed to fail and would add any value to the end-user. For
 * example, an attempt was made to dereference null or cast the value to an incompatible type.
 */
class ObjectValidatorNoOp
{
	protected readonly failures: ValidationFailure[];

	/**
	 * Creates a new ObjectValidatorNoOp.
	 *
	 * @param {ValidationFailure[]} failures the list of validation failures
	 * @throws {TypeError} if <code>failures</code> is null or undefined
	 */
	constructor(failures: ValidationFailure[])
	{
		Objects.assertThatTypeOf(failures, "failures", "Array");
		this.failures = failures;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isEqualTo(): this
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isNotEqualTo(): this
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isNotInArray(): this
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isPrimitive(): this
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isTypeOf(): this
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isInstanceOf(): this
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isNull(): this
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isNotNull(): this
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isDefined(): this
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isNotDefined(): this
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	isSet(): this
	{
		return this;
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
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
	 * @return {ArrayValidatorNoOp} a validator for the <code>Array</code>
	 */
	asArray(): ArrayValidatorNoOp
	{
		return new ArrayValidatorNoOp(this.failures);
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	asArrayConsumer(): this
	{
		return this;
	}

	/**
	 * @return {StringValidatorNoOp} a validator for the object's string representation
	 */
	asString(): StringValidatorNoOp
	{
		return new StringValidatorNoOp(this.failures);
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	asStringConsumer(): this
	{
		return this;
	}

	/**
	 * @return {NumberValidatorNoOp} a validator for the <code>Number</code>
	 */
	asNumber(): NumberValidatorNoOp
	{
		return new NumberValidatorNoOp(this.failures);
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	asNumberConsumer(): this
	{
		return this;
	}

	/**
	 * @return {SetValidatorNoOp} a validator for the <code>Set</code>
	 */
	asSet(): SetValidatorNoOp
	{
		return new SetValidatorNoOp(this.failures);
	}

	/**
	 * @return {ObjectValidatorNoOp} a validator for the <code>Set</code>
	 */
	asSetConsumer(): this
	{
		return this;
	}

	/**
	 * @return {MapValidatorNoOp} a validator for the <code>Map</code>
	 */
	asMap(): MapValidatorNoOp
	{
		return new MapValidatorNoOp(this.failures);
	}

	/**
	 * @return {ObjectValidatorNoOp} a validator for the <code>Map</code>
	 */
	asMapConsumer(): this
	{
		return this;
	}

	/**
	 * @return {InetAddressValidatorNoOp} a validator for the value's Internet address representation
	 */
	asInetAddress(): InetAddressValidatorNoOp
	{
		return new InetAddressValidatorNoOp(this.failures);
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	asInetAddressConsumer(): this
	{
		return this;
	}


	/**
	 * @return {UriValidatorNoOp} a validator for the <code>URI</code>
	 */
	asUri(): UriValidatorNoOp
	{
		return new UriValidatorNoOp(this.failures);
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 */
	asUriConsumer(): this
	{
		return this;
	}

	/**
	 * @return {ClassValidatorNoOp} a validator for the object's class representation
	 */
	asClass(): ClassValidatorNoOp
	{
		return new ClassValidatorNoOp(this.failures);
	}

	/**
	 * @return {ObjectValidatorNoOp} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asClassConsumer(): this
	{
		return this;
	}

	/**
	 * Returns the list of failed validations. Modifying the returned list results in undefined behavior.
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
export {ObjectValidatorNoOp as default};