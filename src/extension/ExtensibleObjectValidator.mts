import type {
	ArrayValidator,
	BooleanValidator,
	ClassValidator,
	InetAddressValidator,
	MapValidator,
	NumberValidator,
	SetValidator,
	StringValidator,
	ValidationFailure
} from "../internal/internal.mjs";

/**
 * Validates the requirements of an object.
 *
 * @typeParam S - the type of validator returned by the methods
 */
interface ExtensibleObjectValidator<S>
{
	/**
	 * Ensures that the actual value is equal to a value.
	 *
	 * @param expected - the expected value
	 * @param name - the name of the expected value
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	isEqualTo(expected: unknown, name?: string): S;

	/**
	 * Ensures that the actual value is not equal to a value.
	 *
	 * @param value - the value to compare to
	 * @param name - the name of the expected value
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	isNotEqualTo(value: unknown, name?: string): S;

	/**
	 * Ensures that the actual value is a primitive. To check if the actual value is an object, use
	 * <code>isInstanceOf(Object)</code>.
	 *
	 * @returns the updated validator
	 */
	isPrimitive(): S;

	/**
	 * Ensures that <code>typeof(actual)</code> is equal to <code>type</code>.
	 *
	 * @param type - the expected
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>
	 * of the actual value
	 * @returns the updated validator
	 * @throws TypeError if <code>type</code> is not set
	 */
	isTypeOf(type: string): S;

	/**
	 * Ensures that the actual value is an object that is an instance of the specified type.
	 *
	 * @param type - the type to compare to
	 * @returns the updated validator
	 * @throws TypeError if <code>type</code> is not a function or a class
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isInstanceOf(type: Function): S;

	/**
	 * Ensures that the actual value is null.
	 *
	 * @returns the updated validator
	 * @throws RangeError if the actual value is not null
	 */
	isNull(): S;

	/**
	 * Ensures that the actual value is not null.
	 *
	 * @returns the updated validator
	 * @throws RangeError if the actual value is null
	 */
	isNotNull(): S;

	/**
	 * Ensures that the actual value is defined.
	 *
	 * @returns the updated validator
	 * @throws RangeError if the actual value is undefined
	 */
	isDefined(): S;

	/**
	 * Ensures that the actual value is undefined.
	 *
	 * @returns the updated validator
	 * @throws RangeError if the actual value is not undefined
	 */
	isNotDefined(): S;

	/**
	 * Ensures that value is not undefined or null.
	 *
	 * @returns the updated validator
	 * @throws TypeError if the value is undefined or null
	 */
	isSet(): S;

	/**
	 * Ensures that value is not undefined or null.
	 *
	 * @returns the updated validator
	 * @throws TypeError if the value is not undefined or null
	 */
	isNotSet(): S;

	/**
	 * Returns the actual value.
	 *
	 * @returns the actual value
	 */
	getActual(): unknown;

	/**
	 * @returns a validator for the object's string representation
	 */
	asString(): StringValidator;

	/**
	 * @param consumer - a function that accepts a {@link StringValidator} for the string representation of the
	 *   actual value
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	asStringConsumer(consumer: (actual: unknown) => StringValidator): S;

	/**
	 * @returns a validator for the <code>Array</code>
	 */
	asArray(): ArrayValidator;

	/**
	 * @param consumer - a function that accepts a {@link ArrayValidator} for the actual value
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	asArrayConsumer(consumer: (input: ArrayValidator) => void): S;

	/**
	 * @returns a validator for the <code>boolean</code>
	 */
	asBoolean(): BooleanValidator;

	/**
	 * @param consumer - a function that accepts a {@link BooleanValidator} for the actual value
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	asBooleanConsumer(consumer: (input: BooleanValidator) => void): S;

	/**
	 * @returns a validator for the <code>number</code>
	 */
	asNumber(): NumberValidator;

	/**
	 * @param consumer - a function that accepts a {@link NumberValidator} for the actual value
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	asNumberConsumer(consumer: (input: NumberValidator) => void): S;

	/**
	 * @returns a validator for the <code>Set</code>
	 */
	asSet(): SetValidator;

	/**
	 * @param consumer - a function that accepts a {@link SetValidator} for the actual value
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	asSetConsumer(consumer: (actual: SetValidator) => void): S;

	/**
	 * @returns a validator for the <code>Map</code>
	 */
	asMap(): MapValidator;

	/**
	 * @param consumer - a function that accepts a {@link MapValidator} for the actual value
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set.
	 * If the actual value is not a <code>Map</code>.
	 */
	asMapConsumer(consumer: (input: MapValidator) => void): S;

	/**
	 * @returns a validator for the value's Internet address representation
	 */
	asInetAddress(): InetAddressValidator;

	/**
	 * @param consumer - a function that accepts an {@link InetAddressValidator} for the value's Internet
	 *   address representation
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 * @throws RangeError if the actual value does not contain a valid Internet address format
	 */
	asInetAddressConsumer(consumer: (actual: InetAddressValidator) => void): S;

	/**
	 * @returns a validator for the object's class representation
	 */
	asClass(): ClassValidator;

	/**
	 * @param consumer - a function that accepts a {@link ClassValidator} for the class representation of the
	 *   actual value
	 * @returns the updated validator
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	asClassConsumer(consumer: (input: ClassValidator) => void): S;

	/**
	 * Returns the list of failed validations. Modifying the returned list results in an undefined behavior.
	 *
	 * @returns the list of failed validations
	 */
	getFailures(): ValidationFailure[];
}

export {type ExtensibleObjectValidator};