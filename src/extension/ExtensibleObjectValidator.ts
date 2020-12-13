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
} from "../internal/internal";

/**
 * Validates the requirements of an object.
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
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value is not equal to value
	 */
	isEqualTo(expected: unknown, name?: string): S;

	/**
	 * Ensures that the actual value is not equal to a value.
	 *
	 * @param {object} value the value to compare to
	 * @param {string} [name] the name of the expected value
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value is equal to <code>value</code>
	 */
	isNotEqualTo(value: unknown, name?: string): S;

	/**
	 * Ensures that the actual value is a primitive. To check if the actual value is an object, use
	 * <code>isInstanceOf(Object)</code>.
	 *
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {RangeError} if the actual value is not a <code>string</code>, <code>number</code>,
	 *   <code>bigint</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, or
	 *   <code>symbol</code>)
	 */
	isPrimitive(): S;

	/**
	 * Ensures that the type of the actual value has the specified name.
	 *
	 * <ul>
	 * <li>If the actual value is undefined, the name is "undefined".</li>
	 * <li>If the actual value is null, the name is "null".</li>
	 * <li>If the actual value is a primitive boolean, the name is "boolean".</li>
	 * <li>If the actual value is a primitive number, the name is "number".</li>
	 * <li>If the actual value is a primitive bigint, the name is "bigint".</li>
	 * <li>If the actual value is a primitive string, the name is "string".</li>
	 * <li>If the actual value is a primitive symbol, the name is "symbol".</li>
	 * <li>If the actual value is an array, the name is "Array".</li>
	 * <li>If the actual value is a named function or a class constructor, the name is "Function".</li>
	 * <li>If the actual value is an anonymous function, the name is "AnonymousFunction".</li>
	 * <li>If the actual value is an arrow function, the name is "ArrowFunction".</li>
	 * <li>If the actual value is a class instance, returns the class name.</li>
	 * </ul>
	 *
	 * @param {string} type the name of the type to compare to
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {RangeError} if the actual value does not have the specified <code>type</code>
	 */
	isTypeOf(type: string): S;

	/**
	 * Ensures that the actual value is an object that is an instance of the specified type.
	 *
	 * @param {Function} type the type to compare to
	 * @return {ExtensibleObjectValidator} the updated validator
	 * @throws {TypeError}  if <code>type</code> is undefined, null, anonymous function or an arrow function
	 * @throws {RangeError} if the actual value is not an instance of <code>type</code>
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
	 * Returns the actual value. The return value is <code>undefined</code> if
	 * {@link module:DefaultRequirements~assertThat assertThat()} was invoked and assertions are disabled
	 * (in which case the value is discarded) is <code>false</code>.
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
	 * @throws {TypeError} if <code>consumer</code> is not set; if the actual value is not a <code>Map</code>
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
	 * Returns the list of failed validations. Modifying the returned list results in undefined behavior.
	 *
	 * @return {ValidationFailure[]} the list of failed validations
	 */
	getFailures(): ValidationFailure[];
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ExtensibleObjectValidator as default};