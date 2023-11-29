import type {
	ClassConstructor,
	ClassVerifier,
	ArrayVerifier,
	SetVerifier,
	MapKey,
	MapValue,
	MapVerifier,
	ObjectVerifier,
	BooleanVerifier,
	NumberVerifier,
	StringVerifier,
	InetAddressVerifier,
	ElementOf
} from "../internal/internal.mjs";

/**
 * Verifies the requirements of an object.
 *
 * @typeParam S - the type of verifier returned by the methods
 * @typeParam T - the type the actual value
 */
interface ExtensibleObjectVerifier<S, T>
{
	/**
	 * Ensures that the actual value is null.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is not null
	 */
	isNull(): ObjectVerifier<null>;

	/**
	 * Ensures that the actual value is not null.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is null
	 */
	isNotNull(): ObjectVerifier<Exclude<T, null>>;

	/**
	 * Ensures that the actual value is defined.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is undefined
	 */
	isDefined<T2 = Exclude<T, undefined>>(): ObjectVerifier<T2>;

	/**
	 * Ensures that the actual value is undefined.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is not undefined
	 */
	isUndefined(): ObjectVerifier<undefined>;

	/**
	 * Ensures that the actual value is not undefined or null.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the value is undefined or null
	 */
	isDefinedAndNotNull<T2 = Exclude<T, undefined | null>>(): ObjectVerifier<T2>;

	/**
	 * Ensures that the actual value is not undefined or null.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the value is not undefined or null
	 */
	isUndefinedOrNull<T2 extends T = T & (undefined | null)>(): ObjectVerifier<T2>;

	/**
	 * Ensures that the actual value is a boolean.
	 *
	 * @returns a verifier for the <code>boolean</code>
	 * @throws RangeError if the actual value is not a <code>boolean</code>
	 */
	isBoolean(): BooleanVerifier;

	/**
	 * Ensures that the actual value is a number.
	 *
	 * @returns a verifier for the <code>number</code>
	 * @throws RangeError if the actual value is not a <code>number</code>
	 */
	isNumber(): NumberVerifier;

	/**
	 * Ensures that the actual value is a string.
	 *
	 * @returns a verifier for the <code>string</code>
	 * @throws RangeError if the actual value is not a <code>string</code>
	 */
	isString(): StringVerifier;

	/**
	 * Ensures that the actual value is an internet address.
	 *
	 * @returns a verifier for the internet address
	 * @throws RangeError if the actual value is not an internet address
	 */
	isInetAddress(): InetAddressVerifier;

	/**
	 * Ensures that the actual value is class-like.
	 *
	 * @typeParam T2 - the type of the class
	 * @param type - the type of class to check for
	 * @returns a verifier for the object's class representation
	 * @throws RangeError if the actual value is not a class constructor
	 */
	isClass<T2>(type: ClassConstructor<T2>): ClassVerifier<T2>;

	/**
	 * Ensures that the actual value is an array.
	 *
	 * @typeParam E - the type of elements in the array
	 * @returns a verifier for the <code>Array</code>
	 * @throws RangeError if the actual value is not an <code>Array</code>
	 */
	isArray<E = ElementOf<T>>(): ArrayVerifier<E>;

	/**
	 * Ensures that the actual value is a set.
	 *
	 * @typeParam E - the type of elements in the set
	 * @returns a verifier for the <code>Set</code>
	 * @throws RangeError if the actual value is not a <code>Set</code>
	 */
	isSet<E = ElementOf<T>>(): SetVerifier<E>;

	/**
	 * Ensures that the actual value is a map.
	 *
	 * @typeParam K - the type of keys in the map
	 * @typeParam K - the type of values in the map
	 * @returns a verifier for the <code>Map</code>
	 * @throws RangeError if the actual value is not a <code>Map</code>
	 */
	isMap<K = MapKey<T>, V = MapValue<T>>(): MapVerifier<K, V>;

	/**
	 * Ensures that the actual value is a primitive type (<code>string</code>,
	 * <code>number</code>, <code>bigint</code>, <code>boolean</code>, <code>null</code>,
	 * <code>undefined</code>, or <code>symbol</code>).
	 * To check if the actual value is an object, use <code>isInstanceOf(Object)</code>.
	 *
	 * @returns the updated verifier
	 */
	isPrimitive<T2 extends T = T & (string | number | bigint | boolean | null | undefined | symbol)>():
		ObjectVerifier<T2>;

	/**
	 * Ensures that the actual value is an instance of a class.
	 *
	 * @typeParam T2 - the type of the actual value
	 * @param type - the class constructor
	 * @returns the updated validator
	 * @throws TypeError if <code>type</code> is not a class
	 * @throws RangeError if the actual value is not an instance of the specified class
	 */
	isInstanceOf<T2>(type: ClassConstructor<T2>): ObjectVerifier<T2>;

	/**
	 * Ensures that the actual value is equal to a value.
	 *
	 * @param expected - the expected value
	 * @param name - the name of the expected value
	 * @returns the updated verifier
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty.
	 * If the actual value is not equal to <code>expected</code>.
	 */
	isEqualTo(expected: T, name?: string): S;

	/**
	 * Ensures that the actual value is not equal to a value.
	 *
	 * @param value - the value to compare to
	 * @param name - (optional) the name of the expected value
	 * @returns the updated verifier
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty.
	 * If the actual value is equal to <code>value</code>.
	 */
	isNotEqualTo(value: T, name?: string): S;

	/**
	 * Ensures that <code>typeof(actual)</code> is equal to <code>type</code>.
	 *
	 * @param type - the expected
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>
	 * of the actual value
	 * @returns the updated verifier
	 */
	isTypeOf(type: string): S;

	/**
	 * Returns the actual value.
	 *
	 * @returns the actual value
	 */
	getActual(): T;

	/**
	 * Throws an exception if the validation failed.
	 *
	 * @typeParam T2 - the type of the updated verifier
	 * @param result - (optional) a no-arg function that returns the value to return on success.
	 *   By default, this function returns "this".
	 * @returns the updated verifier
	 * @throws Error if the validation failed
	 */
	validationResult<T2>(result: () => T2): T2;
}

export {type ExtensibleObjectVerifier};