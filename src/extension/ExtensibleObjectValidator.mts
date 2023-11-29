import type {
	BooleanValidator,
	NumberValidator,
	StringValidator,
	InetAddressValidator,
	ClassConstructor,
	ClassValidator,
	ArrayValidator,
	SetValidator,
	MapKey,
	MapValue,
	MapValidator,
	ObjectValidator,
	ValidationFailure
} from "../internal/internal.mjs";

/**
 * Validates the requirements of an object.
 *
 * @typeParam S - the type of validator returned by the methods
 * @typeParam T - the type the actual value
 */
interface ExtensibleObjectValidator<S, T>
{
	/**
	 * Ensures that the actual value is null.
	 *
	 * @returns the updated validator
	 */
	isNull(): ObjectValidator<null>;

	/**
	 * Ensures that the actual value is not null.
	 *
	 * @returns the updated validator
	 */
	isNotNull(): ObjectValidator<Exclude<T, null>>;

	/**
	 * Ensures that the actual value is defined.
	 *
	 * @returns the updated validator
	 */
	isDefined<T2 = Exclude<T, undefined>>(): ObjectValidator<T2>;

	/**
	 * Ensures that the actual value is undefined.
	 *
	 * @returns the updated validator
	 */
	isUndefined(): ObjectValidator<undefined>;

	/**
	 * Ensures that the actual value is not undefined or null.
	 *
	 * @returns the updated validator
	 */
	isDefinedAndNotNull<T2 = Exclude<T, undefined | null>>(): ObjectValidator<T2>;

	/**
	 * Ensures that the actual value is not undefined or null.
	 *
	 * @returns the updated validator
	 */
	isUndefinedOrNull<T2 extends T = T & (undefined | null)>(): ObjectValidator<T2>;

	/**
	 * Ensures that the actual value is a boolean.
	 *
	 * @returns a validator for the <code>boolean</code>
	 */
	isBoolean(): BooleanValidator;

	/**
	 * Ensures that the actual value is a number.
	 *
	 * @returns a validator for the <code>number</code>
	 */
	isNumber(): NumberValidator;

	/**
	 * Ensures that the actual value is a string.
	 *
	 * @returns a validator for the <code>string</code>
	 */
	isString(): StringValidator;

	/**
	 * Ensures that the actual value is an internet address.
	 *
	 * @returns a validator for the internet address
	 */
	isInetAddress(): InetAddressValidator;

	/**
	 * Ensures that the actual value is a class constructor.
	 *
	 * @typeParam T2 - the type of the class
	 * @param type - the type of class to check for
	 * @returns a validator for the <code>class</code>
	 */
	isClass<T2>(type: ClassConstructor<T2>): ClassValidator<T2>;

	/**
	 * Ensures that the actual value is an array.
	 *
	 * @typeParam E - the type of elements in the array
	 * @returns a validator for the <code>Array</code>
	 */
	isArray<E>(): ArrayValidator<E>;

	/**
	 * Ensures that the actual value is a set.
	 *
	 * @typeParam E - the type of elements in the set
	 * @returns a validator for the <code>Set</code>
	 */
	isSet<E>(): SetValidator<E>;

	/**
	 * Ensures that the actual value is a map.
	 *
	 * @typeParam K - the type of keys in the map
	 * @typeParam K - the type of values in the map
	 * @returns a validator for the <code>Map</code>
	 */
	isMap<K = MapKey<T>, V = MapValue<T>>(): MapValidator<K, V>;

	/**
	 * Ensures that the actual value is a primitive type (<code>string</code>,
	 * <code>number</code>, <code>bigint</code>, <code>boolean</code>, <code>null</code>,
	 * <code>undefined</code>, or <code>symbol</code>).
	 * To check if the actual value is an object, use <code>isInstanceOf(Object)</code>.
	 *
	 * @returns the updated validator
	 */
	isPrimitive<T2 extends T = T & (string | number | bigint | boolean | null | undefined | symbol)>():
		ObjectValidator<T2>;

	/**
	 * Ensures that the actual value is an instance of an array or class.
	 *
	 * @typeParam T2 - the type of the actual value
	 * @param type - the array or class constructor
	 * @returns the updated validator
	 * @throws TypeError if <code>type</code> is not a class
	 */
	isInstanceOf<T2>(type: ClassConstructor<T2>): ObjectValidator<T2>;

	/**
	 * Ensures that the actual value is equal to a value.
	 *
	 * @param expected - the expected value
	 * @param name - the name of the expected value
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	isEqualTo(expected: T, name?: string): S;

	/**
	 * Ensures that the actual value is not equal to a value.
	 *
	 * @param value - the value to compare to
	 * @param name - the name of the expected value
	 * @returns the updated validator
	 * @throws TypeError if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	isNotEqualTo(value: T, name?: string): S;

	/**
	 * Ensures that <code>typeof(actual)</code> is equal to <code>type</code>.
	 *
	 * @param type - the expected
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>
	 * of the actual value
	 * @returns the updated validator
	 */
	isTypeOf(type: string): S;

	/**
	 * Returns the actual value.
	 *
	 * @returns undefined if the validation failed
	 */
	getActual(): T | undefined;

	/**
	 * Returns the list of failed validations. Modifying the returned list results in an undefined behavior.
	 *
	 * @returns the list of failed validations
	 */
	getFailures(): ValidationFailure[];
}

export {type ExtensibleObjectValidator};