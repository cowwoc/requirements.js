import type
{
	ArrayVerifier,
	BooleanVerifier,
	ClassVerifier,
	InetAddressVerifier,
	MapVerifier,
	NumberVerifier,
	SetVerifier,
	StringVerifier
} from "../internal/internal.js";

/**
 * Verifies the requirements of an object.
 */
interface ExtensibleObjectVerifier<S>
{
	/**
	 * Ensures that the actual value is equal to a value.
	 *
	 * @param {object} expected the expected value
	 * @param {string} [name] the name of the expected value
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty. If the actual value is not equal to value.
	 */
	isEqualTo(expected: unknown, name?: string): S;

	/**
	 * Throws an exception if the validation failed.
	 *
	 * @param {Function} [result] a no-arg function that returns the value to return on success. By default,
	 *   this function returns "this".
	 * @return {object} the updated verifier
	 * @throws {RangeError} if the validation failed
	 */
	validationResult<R>(result: () => R | S): R | S;

	/**
	 * Ensures that the actual value is not equal to a value.
	 *
	 * @param {object} value the value to compare to
	 * @param {string} [name] the name of the expected value
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty. If the actual value is equal to <code>value</code>.
	 */
	isNotEqualTo(value: unknown, name?: string): S;

	/**
	 * Ensures that the actual value is a primitive. To check if the actual value is an object, use
	 * <code>isInstanceOf(Object)</code>.
	 *
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not a <code>string</code>, <code>number</code>,
	 *   <code>bigint</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, or
	 *   <code>symbol</code>)
	 */
	isPrimitive(): S;

	/**
	 * Ensures that <code>typeof(actual)</code> is equal to <code>type</code>.
	 *
	 * @param {string} type the expected
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>
	 * of the actual value
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 * @throws {TypeError} if <code>type</code> is not set
	 * @throws {RangeError} if the <code>typeof(actual)</code> is not equal to <code>type</code>
	 */
	isTypeOf(type: string): S;

	/**
	 * Ensures that the actual value is an object that is an instance of the specified type.
	 *
	 * @param {Function} type the type to compare to
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 * @throws {TypeError}  if <code>type</code> is not a function or a class
	 * @throws {RangeError} if the actual value is not an instance of <code>type</code>
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isInstanceOf(type: Function): S;

	/**
	 * Ensures that the actual value is null.
	 *
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not null
	 */
	isNull(): S;

	/**
	 * Ensures that the actual value is not null.
	 *
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is null
	 */
	isNotNull(): S;

	/**
	 * Ensures that the actual value is defined.
	 *
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is undefined
	 */
	isDefined(): S;

	/**
	 * Ensures that the actual value is undefined.
	 *
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 * @throws {RangeError} if the actual value is not undefined
	 */
	isNotDefined(): S;

	/**
	 * Ensures that value is not undefined or null.
	 *
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 * @throws {TypeError} if the value is undefined or null
	 */
	isSet(): S;

	/**
	 * Ensures that value is not undefined or null.
	 *
	 * @return {ExtensibleObjectVerifier} the updated verifier
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
	getActual(): unknown;

	/**
	 * @return {StringVerifier} a verifier for the object's string representation
	 */
	asString(): StringVerifier;

	/**
	 * @param {Function} consumer a function that accepts a {@link StringVerifier} for the string
	 *   representation of the actual value
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asStringConsumer(consumer: (actual: StringVerifier) => void): S;

	/**
	 * @return {ArrayVerifier} a verifier for the <code>Array</code>
	 * @throws {TypeError} if the actual value is not an <code>Array</code>
	 */
	asArray(): ArrayVerifier;

	/**
	 * @param {Function} consumer a function that accepts a {@link ArrayVerifier} for the actual value
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set. If the actual value is not an
	 *   <code>Array</code>.
	 */
	asArrayConsumer(consumer: (actual: ArrayVerifier) => void): S;

	/**
	 * @return {BooleanVerifier} a verifier for the <code>boolean</code>
	 * @throws {TypeError} if the actual value is not a <code>boolean</code>
	 */
	asBoolean(): BooleanVerifier;

	/**
	 * @param {Function} consumer a function that accepts a {@link BooleanVerifier} for the actual value
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set. If the actual value is not a
	 * <code>boolean</code>.
	 */
	asBooleanConsumer(consumer: (actual: BooleanVerifier) => void): S;

	/**
	 * @return {NumberVerifier} a verifier for the <code>number</code>
	 * @throws {TypeError} if the actual value is not a <code>number</code>
	 */
	asNumber(): NumberVerifier;

	/**
	 * @param {Function} consumer a function that accepts a {@link NumberVerifier} for the actual value
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set. If the actual value is not a
	 *   <code>number</code>.
	 */
	asNumberConsumer(consumer: (actual: NumberVerifier) => void): S;

	/**
	 * @return {SetVerifier} a verifier for the <code>Set</code>
	 * @throws {TypeError} if the actual value is not a <code>Set</code>
	 */
	asSet(): SetVerifier;

	/**
	 * @param {Function} consumer a function that accepts a {@link SetVerifier} for the actual value
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set. If the actual value is not a <code>Set</code>.
	 */
	asSetConsumer(consumer: (actual: SetVerifier) => void): S;

	/**
	 * @return {MapVerifier} a verifier for the <code>Map</code>
	 * @throws {TypeError} if the actual value is not a <code>Map</code>
	 */
	asMap(): MapVerifier;

	/**
	 * @param {Function} consumer a function that accepts a {@link MapVerifier} for the actual value
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set. If the actual value is not a <code>Map</code>.
	 */
	asMapConsumer(consumer: (actual: MapVerifier) => void): S;

	/**
	 * @return {InetAddressVerifier} a verifier for the value's Internet address representation
	 * @throws {RangeError} if the actual value does not contain a valid Internet address format
	 */
	asInetAddress(): InetAddressVerifier;

	/**
	 * @param {Function} consumer a function that accepts an {@link InetAddressVerifier} for the value's
	 *   Internet address representation
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 * @throws {RangeError} if the actual value does not contain a valid Internet address format
	 */
	asInetAddressConsumer(consumer: (input: InetAddressVerifier) => void): S;

	/**
	 * @return {ClassVerifier} a verifier for the object's class representation
	 * @throws {TypeError} if the actual value is not a <code>Function</code>
	 */
	asClass(): ClassVerifier;

	/**
	 * @param {Function} consumer a function that accepts a {@link ClassVerifier} for the class representation
	 *   of the actual value
	 * @return {ExtensibleObjectVerifier} the updated verifier
	 * @throws {TypeError} if <code>consumer</code> is not set
	 */
	asClassConsumer(consumer: (actual: ClassVerifier) => void): S;
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ExtensibleObjectVerifier as default};