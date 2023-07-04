import type
{
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
 * Verifiers and Validators contain corresponding methods. Some exceptions are thrown by both methods. The
 * remaining exceptions that are thrown by the verifier are wrapped as validation failures and are returned
 * by {@link #getFailures}.
 */
interface ExtensibleObjectValidator<S>
{
	/**
	 * Ensures that the actual value is equal to a value.
	 *
	 * @param {object} expected the expected value
	 * @param {string} name the name of the expected value
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	isEqualTo(expected: unknown, name?: string): S;

	/**
	 * Ensures that the actual value is not equal to a value.
	 *
	 * @param {object} value the value to compare to
	 * @param {string} [name] the name of the expected value
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	isNotEqualTo(value: unknown, name?: string): S;

	/**
	 * Ensures that the actual value is a primitive. To check if the actual value is an object, use
	 * <code>isInstanceOf(Object)</code>.
	 *
	 * @return {ExtensibleObjectValidator} the updated validator
	 */
	isPrimitive(): S;

	/**
	 * Ensures that <code>typeof(actual)</code> is equal to <code>type</code>.
	 *
	 * @param {string} type the expected
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>
	 * of the actual value
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>type</code> is not set
	 */
	isTypeOf(type: string): S;

	/**
	 * Ensures that the actual value is an object that is an instance of the specified type.
	 *
	 * @param {Function} type the type to compare to
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>type</code> is not a function or a class
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isInstanceOf(type: Function): S;

	/**
	 * Ensures that the actual value is null.
	 *
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {RangeError} if the actual value is not null
	 */
	isNull(): S;

	/**
	 * Ensures that the actual value is not null.
	 *
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {RangeError} if the actual value is null
	 */
	isNotNull(): S;

	/**
	 * Ensures that the actual value is defined.
	 *
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {RangeError} if the actual value is undefined
	 */
	isDefined(): S;

	/**
	 * Ensures that the actual value is undefined.
	 *
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {RangeError} if the actual value is not undefined
	 */
	isNotDefined(): S;

	/**
	 * Ensures that value is not undefined or null.
	 *
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if the value is undefined or null
	 */
	isSet(): S;

	/**
	 * Ensures that value is not undefined or null.
	 *
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if the value is not undefined or null
	 */
	isNotSet(): S;

	/**
	 * Indicates if the actual value is available.
	 *
	 * @return {boolean} <code>true</code> unless the actual value was converted to an incompatible type
	 */
	isActualAvailable(): boolean;

	/**
	 * Returns the actual value. The return value is <code>undefined</code> if {@link #isActualAvailable()}
	 * is <code>false</code>.
	 *
	 * @return {object} the actual value
	 */
	getActual(): unknown;

	/**
	 * @return {StringValidator} a validator for the object's string representation
	 */
	asString(): StringValidator;

	/**
	 * @param {Function} consumer a function that accepts a {@link StringValidator} for the string
	 *   representation of the actual value
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asStringConsumer(consumer: (actual: unknown) => StringValidator): S;

	/**
	 * @return {ArrayValidator} a validator for the <code>Array</code>
	 */
	asArray(): ArrayValidator;

	/**
	 * @param {Function} consumer a function that accepts a {@link ArrayValidator} for the actual value
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asArrayConsumer(consumer: (input: ArrayValidator) => void): S;

	/**
	 * @return {BooleanValidator} a validator for the <code>boolean</code>
	 */
	asBoolean(): BooleanValidator;

	/**
	 * @param {Function} consumer a function that accepts a {@link BooleanValidator} for the actual value
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asBooleanConsumer(consumer: (input: BooleanValidator) => void): S;

	/**
	 * @return {NumberValidator} a validator for the <code>number</code>
	 */
	asNumber(): NumberValidator;

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberValidator} for the actual value
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asNumberConsumer(consumer: (input: NumberValidator) => void): S;

	/**
	 * @return {SetValidator} a validator for the <code>Set</code>
	 */
	asSet(): SetValidator;

	/**
	 * @param {Function} consumer a function that accepts a {@link SetValidator} for the actual value
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asSetConsumer(consumer: (actual: SetValidator) => void): S;

	/**
	 * @return {MapValidator} a validator for the <code>Map</code>
	 */
	asMap(): MapValidator;

	/**
	 * @param {Function} consumer a function that accepts a {@link MapValidator} for the actual value
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set. If the actual value is not a <code>Map</code>.
	 */
	asMapConsumer(consumer: (input: MapValidator) => void): S;

	/**
	 * @return {InetAddressValidator} a validator for the value's Internet address
	 *   representation
	 */
	asInetAddress(): InetAddressValidator;

	/**
	 * @param {Function} consumer a function that accepts an {@link InetAddressValidator} for the value's
	 *   Internet address representation
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 * @throws {RangeError} if the actual value does not contain a valid Internet address format
	 */
	asInetAddressConsumer(consumer: (actual: InetAddressValidator) => void): S;

	/**
	 * @return {ClassValidator} a validator for the object's class representation
	 */
	asClass(): ClassValidator;

	/**
	 * @param {Function} consumer a function that accepts a {@link ClassValidator} for the class representation
	 *   of the actual value
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asClassConsumer(consumer: (input: ClassValidator) => void): S;

	/**
	 * Returns the list of failed validations. Modifying the returned list results in an undefined behavior.
	 *
	 * @return {ValidationFailure[]} the list of failed validations
	 */
	getFailures(): ValidationFailure[];
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ExtensibleObjectValidator as default};