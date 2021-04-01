import type {
	ArrayAsserter,
	BooleanAsserter,
	ClassAsserter,
	InetAddressAsserter,
	MapAsserter,
	NumberAsserter,
	SetAsserter,
	StringAsserter
} from "../internal/internal";

/**
 * Asserts the requirements of an object.
 *
 * Asserters throw the same exceptions as Verifiers if and only if
 * {@link GlobalConfiguration#assertionsAreEnabled assertions are enabled}.
 */
interface ExtensibleObjectAsserter<S>
{
	/**
	 * Ensures that the actual value is equal to a value.
	 *
	 * @param {object} expected the expected value
	 * @param {string} [name] the name of the expected value
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty. If the actual value is not equal to value.
	 */
	isEqualTo(expected: unknown, name?: string): S;

	/**
	 * Throws an exception if the validation failed.
	 *
	 * @param {Function} [result] a no-arg function that returns the value to return on success. By default,
	 *   this function returns "this".
	 * @return {object} the updated asserter
	 * @throws {RangeError} if the validation failed
	 */
	validationResult<R>(result: () => R | S): R | S;

	/**
	 * Ensures that the actual value is not equal to a value.
	 *
	 * @param {object} value the value to compare to
	 * @param {string} [name] the name of the expected value
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty. If the actual value is equal to <code>value</code>.
	 */
	isNotEqualTo(value: unknown, name?: string): S;

	/**
	 * Ensures that the actual value is a primitive. To check if the actual value is an object, use
	 * <code>isInstanceOf(Object)</code>.
	 *
	 * @return {ExtensibleObjectAsserter} the updated asserter
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
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 * @throws {RangeError} if the actual value does not have the specified <code>type</code>
	 */
	isTypeOf(type: string): S;

	/**
	 * Ensures that the actual value is an object that is an instance of the specified type.
	 *
	 * @param {Function} type the type to compare to
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 * @throws {TypeError}  if <code>type</code> is undefined, null, anonymous function or an arrow function
	 * @throws {RangeError} if the actual value is not an instance of <code>type</code>
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isInstanceOf(type: Function): S;

	/**
	 * Ensures that the actual value is null.
	 *
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 * @throws {RangeError} if the actual value is not null
	 */
	isNull(): S;

	/**
	 * Ensures that the actual value is not null.
	 *
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 * @throws {RangeError} if the actual value is null
	 */
	isNotNull(): S;

	/**
	 * Ensures that the actual value is defined.
	 *
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 * @throws {RangeError} if the actual value is undefined
	 */
	isDefined(): S;

	/**
	 * Ensures that the actual value is undefined.
	 *
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 * @throws {RangeError} if the actual value is not undefined
	 */
	isNotDefined(): S;

	/**
	 * Ensures that value is not undefined or null.
	 *
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 * @throws {TypeError} if the value is undefined or null
	 */
	isSet(): S;

	/**
	 * Ensures that value is not undefined or null.
	 *
	 * @return {ExtensibleObjectAsserter} the updated asserter
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
	 * Returns the actual value. The return value is undefined if {@link #isActualAvailable()} is
	 * <code>false</code>.
	 *
	 * @return {object} the actual value
	 */
	getActual(): unknown | void;

	/**
	 * @return {StringAsserter} an asserter for the object's string representation
	 */
	asString(): StringAsserter;

	/**
	 * @param {Function} consumer a function that accepts a {@link StringAsserter} for the string
	 *   representation of the actual value
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asStringConsumer(consumer: (actual: StringAsserter) => void): S;

	/**
	 * @return {ArrayAsserter} an asserter for the <code>Array</code>
	 * @throws {TypeError} if the actual value is not an <code>Array</code>
	 */
	asArray(): ArrayAsserter;

	/**
	 * @param {Function} consumer a function that accepts an {@link ArrayAsserter} for the actual value
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set. If the actual value is not an
	 * <code>Array</code>.
	 */
	asArrayConsumer(consumer: (actual: ArrayAsserter) => void): S;

	/**
	 * @return {BooleanAsserter} an asserter for the <code>boolean</code>
	 * @throws {TypeError} if the actual value is not a <code>boolean</code>
	 */
	asBoolean(): BooleanAsserter;

	/**
	 * @param {Function} consumer a function that accepts a {@link BooleanAsserter} for the actual value
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set. If the actual value is not a
	 * <code>boolean</code>.
	 */
	asBooleanConsumer(consumer: (actual: BooleanAsserter) => void): S;

	/**
	 * @return {NumberAsserter} an asserter for the <code>number</code>
	 * @throws {TypeError} if the actual value is not a <code>number</code>
	 */
	asNumber(): NumberAsserter;

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberAsserter} for the actual value
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set. If the actual value is not a
	 * <code>number</code>.
	 */
	asNumberConsumer(consumer: (actual: NumberAsserter) => void): S;

	/**
	 * @return {SetAsserter} an asserter for the <code>Set</code>
	 * @throws {TypeError} if the actual value is not a <code>Set</code>
	 */
	asSet(): SetAsserter;

	/**
	 * @param {Function} consumer a function that accepts a {@link SetAsserter} for the actual value
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set. If the actual value is not a <code>Set</code>.
	 */
	asSetConsumer(consumer: (actual: SetAsserter) => void): S;

	/**
	 * @return {MapAsserter} an asserter for the <code>Map</code>
	 * @throws {TypeError} if the actual value is not a <code>Map</code>
	 */
	asMap(): MapAsserter;

	/**
	 * @param {Function} consumer a function that accepts a {@link MapAsserter} for the actual value
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set. If the actual value is not a <code>Map</code>.
	 */
	asMapConsumer(consumer: (actual: MapAsserter) => void): S;

	/**
	 * @return {InetAddressAsserter} an asserter for the value's Internet address representation
	 * @throws {RangeError} if the actual value does not contain a valid Internet address format
	 */
	asInetAddress(): InetAddressAsserter;

	/**
	 * @param {Function} consumer a function that accepts an {@link InetAddressAsserter} for the value's
	 *   Internet address representation
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set
	 * @throws {RangeError} if the actual value does not contain a valid Internet address format
	 */
	asInetAddressConsumer(consumer: (input: InetAddressAsserter) => void): S;

	/**
	 * @return {ClassAsserter} an asserter for the object's class representation
	 * @throws {TypeError} if the actual value is not a <code>Function</code>
	 */
	asClass(): ClassAsserter;

	/**
	 * @param {Function} consumer a function that accepts a {@link ClassAsserter} for the class representation
	 *   of the actual value
	 * @return {ExtensibleObjectAsserter} the updated asserter
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asClassConsumer(consumer: (actual: ClassAsserter) => void): S;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ExtensibleObjectAsserter as default};