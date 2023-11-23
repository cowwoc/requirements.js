import type {
	StringVerifier,
	BooleanVerifier,
	NumberVerifier,
	InetAddressVerifier,
	ClassVerifier,
	ArrayVerifier,
	SetVerifier,
	MapVerifier,
	ObjectVerifier
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
	 * Throws an exception if the validation failed.
	 *
	 * @typeParam E - the type of error that may be thrown
	 * @param result - (optional) a no-arg function that returns the value to return on success.
	 *   By default, this function returns "this".
	 * @returns the updated verifier
	 * @throws Error if the validation failed
	 */
	validationResult(result: () => S): S;

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
	 * Ensures that the actual value is a primitive. To check if the actual value is an object, use
	 * <code>isInstanceOf(Object)</code>.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is not a <code>string</code>, <code>number</code>,
	 *   <code>bigint</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, or
	 *   <code>symbol</code>
	 */
	isPrimitive(): S;

	/**
	 * Ensures that <code>typeof(actual)</code> is equal to <code>type</code>.
	 *
	 * @param type - the expected
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>
	 * of the actual value
	 * @returns the updated verifier
	 * @throws TypeError if <code>type</code> is not set
	 * @throws RangeError if the <code>typeof(actual)</code> is not equal to <code>type</code>
	 */
	isTypeOf(type: string): S;

	/**
	 * Ensures that the actual value is an object that is an instance of the specified type.
	 *
	 * @param type - the type to compare to
	 * @returns the updated verifier
	 * @throws TypeError if <code>type</code> is not a function or a class
	 * @throws RangeError if the actual value is not an instance of <code>type</code>
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isInstanceOf(type: Function): S;

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
	isNotNull(): S;

	/**
	 * Ensures that the actual value is defined.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is undefined
	 */
	isDefined(): S;

	/**
	 * Ensures that the actual value is undefined.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is not undefined
	 */
	isNotDefined(): S;

	/**
	 * Ensures that value is not undefined or null.
	 *
	 * @returns the updated verifier
	 * @throws TypeError if the value is undefined or null
	 */
	isSet(): S;

	/**
	 * Ensures that value is not undefined or null.
	 *
	 * @returns the updated verifier
	 * @throws TypeError if the value is not undefined or null
	 */
	isNotSet(): S;

	/**
	 * Returns the actual value.
	 *
	 * @returns the actual value
	 */
	getActual(): T;

	/**
	 * @returns a verifier for the object's string representation
	 */
	asString(): StringVerifier;

	/**
	 * @param consumer - a function that accepts a {@link StringVerifier} for the string representation of the
	 *   actual value
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	asStringConsumer(consumer: (actual: StringVerifier) => void): S;

	/**
	 * @returns a verifier for the <code>boolean</code>
	 * @throws TypeError if the actual value is not a <code>boolean</code>
	 */
	asBoolean(): BooleanVerifier;

	/**
	 * @param consumer - a function that accepts a {@link BooleanVerifier} for the actual value
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set.
	 * If the actual value is not a <code>boolean</code>.
	 */
	asBooleanConsumer(consumer: (actual: BooleanVerifier) => void): S;

	/**
	 * @returns a verifier for the <code>number</code>
	 * @throws TypeError if the actual value is not a <code>number</code>
	 */
	asNumber(): NumberVerifier;

	/**
	 * @param consumer - a function that accepts a {@link NumberVerifier} for the actual value
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set.
	 * If the actual value is not a <code>number</code>.
	 */
	asNumberConsumer(consumer: (actual: NumberVerifier) => void): S;

	/**
	 * @typeParam E - the type the array elements
	 * @returns a verifier for the <code>Array</code>
	 * @throws TypeError if the actual value is not an <code>Array</code>
	 */
	asArray<E>(): ArrayVerifier<E>;

	/**
	 * @typeParam E - the type the array elements
	 * @param consumer - a function that accepts a {@link ArrayVerifier} for the actual value
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set.
	 * If the actual value is not an <code>Array</code>.
	 */
	asArrayConsumer<E>(consumer: (actual: ArrayVerifier<E>) => void): S;

	/**
	 * @typeParam E - the type the set elements
	 * @returns a verifier for the <code>Set</code>
	 * @throws TypeError if the actual value is not a <code>Set</code>
	 */
	asSet<E>(): SetVerifier<E>;

	/**
	 * @typeParam E - the type the set elements
	 * @param consumer - a function that accepts a {@link SetVerifier} for the actual value
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set.
	 * If the actual value is not a <code>Set</code>.
	 */
	asSetConsumer<E>(consumer: (actual: SetVerifier<E>) => void): S;

	/**
	 * @typeParam K - the type the map's keys
	 * @typeParam V - the type the map's values
	 * @returns a verifier for the <code>Map</code>
	 * @throws TypeError if the actual value is not a <code>Map</code>
	 */
	asMap<K, V>(): MapVerifier<K, V>;

	/**
	 * @typeParam K - the type the map's keys
	 * @typeParam V - the type the map's values
	 * @param consumer - a function that accepts a {@link MapVerifier} for the actual value
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set.
	 * If the actual value is not a <code>Map</code>.
	 */
	asMapConsumer<K, V>(consumer: (actual: MapVerifier<K, V>) => void): S;

	/**
	 * @returns a verifier for the value's Internet address representation
	 * @throws RangeError if the actual value does not contain a valid Internet address format
	 */
	asInetAddress(): InetAddressVerifier;

	/**
	 * @param consumer - a function that accepts an {@link InetAddressVerifier} for the value's Internet
	 *   address representation
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set
	 * @throws RangeError if the actual value does not contain a valid Internet address format
	 */
	asInetAddressConsumer(consumer: (input: InetAddressVerifier) => void): S;

	/**
	 * @returns a verifier for the object's class representation
	 * @throws TypeError if the actual value is not a <code>Function</code>
	 */
	asClass(): ClassVerifier;

	/**
	 * @param consumer - a function that accepts a {@link ClassVerifier} for the class representation of the
	 *   actual value
	 * @returns the updated verifier
	 * @throws TypeError if <code>consumer</code> is not set
	 */
	asClassConsumer(consumer: (actual: ClassVerifier) => void): S;
}

export {type ExtensibleObjectVerifier};