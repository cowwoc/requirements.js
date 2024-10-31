import {
	Type,
	TypeCategory,
	AssertionError
} from "../internal.mjs";
import isEqual from "lodash.isequal";

type ElementOf<T> = T extends readonly (infer E)[] ? E : (T extends Set<infer E> ? E : never);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MapKey<T> = T extends Map<infer K, any> ? K : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MapValue<T> = T extends Map<any, infer V> ? V : never;

// Object and all its subclasses, excluding Function which is its superclass.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClassConstructor<T> = abstract new (...args: any[]) => NonNullable<T>;
type Comparable = number | string | boolean;
type NonUndefinable<T> = Exclude<T, undefined>

/**
 * Indicates if an object is an instance of a type. To convert a type to an object, use
 * `prototype` such as `Error.prototype`. To convert an object to a type, use
 * `constructor` such as `instance.constructor`.
 *
 * @param child - the child class
 * @param parent - the parent class
 * @returns `true` if `child` extends `parent`; false if
 *   `parent` or `child` are `undefined` or `null`; false if `child` does not extend `parent`
 */
function classExtends(child: ClassConstructor<unknown>, parent: ClassConstructor<unknown>)
{
	// https://stackoverflow.com/a/14486171/14731
	return child.prototype instanceof parent;
}

/**
 * Throws an `Error` if `condition` is false.
 *
 * @param condition - a condition
 * @param error - the type of error to throw (Default: `Error`)
 * @param message - the error message to use on failure
 * @throws AssertionError if `condition` is false
 */
function assert(condition: boolean,
                error: (message?: string) => Error = (message?: string) => new AssertionError(message),
                message?: string):
	asserts condition
{
	// Will be stripped out using uglify.js option "pure_funcs"
	if (!condition)
		throw error(message);
}

/**
 * Ensures that an object is defined.
 *
 * @param value - the value of a parameter
 * @param name - the name of the parameter
 * @returns `true`
 * @throws TypeError if:
 * <ul>
 *   <li>`name` is not a string</li>
 *   <li>if `value` is `undefined`</li>
 * </ul>
 */
function requireThatValueIsDefined(value: unknown, name: string)
{
	const type = Type.of(name);
	if (type !== Type.STRING)
	{
		throw new TypeError(`name must be a string.
Actual: ${internalValueToString(name)}
Type  : ${internalValueToString(type)}`);
	}
	if (value === undefined)
		throw new TypeError(name + " must be defined");
	return true;
}

/**
 * Ensures that an object is defined and not null.
 *
 * @param value - the value of a parameter
 * @param name - the name of the parameter
 * @returns `true`
 * @throws TypeError if:
 * <ul>
 *   <li>`name` is not a string</li>
 *   <li>if `value` is `undefined` or `null`</li>
 * </ul>
 */
function requireThatValueIsNotNull(value: unknown, name: string)
{
	requireThatValueIsDefined(value, name);
	if (value === null)
		throw new TypeError(name + " may not be null");
	return true;
}

/**
 * Ensures that an object is defined and not null.
 *
 * @param value - the value of a parameter
 * @param name - the name of the parameter
 * @returns `true`
 * @throws AssertionError if:
 * <ul>
 *   <li>`name` is not a string</li>
 *   <li>if `value` is `undefined` or `null`</li>
 * </ul>
 */
function assertThatValueIsNotNull(value: unknown, name: string): void
{
	try
	{
		assert(requireThatValueIsNotNull(value, name));
	}
	catch (e)
	{
		if (e instanceof Error)
		{
			const assertionError = new AssertionError(e.message);
			assertionError.stack = e.stack?.replace(e.name, assertionError.name);
			throw assertionError;
		}
		throw e;
	}
}


/**
 * Requires that an object has the expected type.
 *
 * @param value - the value of a parameter
 * @param name - the name of the parameter
 * @param type - `value`'s expected type
 * @returns `true`
 * @throws TypeError if `value` does not have the expected `type`. If `name` is not a string.
 */
function requireThatType(value: unknown, name: string, type: Type)
{
	const typeOfName = Type.of(name);
	if (typeOfName !== Type.STRING)
	{
		throw new TypeError(`name must be a string.
Actual: ${internalValueToString(name)}
Type  : ${typeOfName.toString()}`);
	}

	const typeOfValue = Type.of(value);
	let matchFound;
	if (typeof (type.typeGuard) !== "undefined")
		matchFound = type.typeGuard(value);
	else
		matchFound = isEqual(typeOfValue, type);
	if (!matchFound)
	{
		throw new TypeError(`${name} must be a ${internalValueToString(type)}.
Actual: ${internalValueToString(value)}
Type  : ${typeOfValue.toString()}`);
	}
	return true;
}

/**
 * Requires that a value has the expected type if assertions are enabled. We assume that
 * `assert()` will be stripped out at build-time if assertions are disabled.
 *
 * @param value - the value of a parameter
 * @param name - the name of the parameter
 * @param type - `value`'s expected type
 * @returns `true`
 * @throws TypeError if `value` does not have the expected `type`. If `name` is not a string.
 */
function assertThatType(value: unknown, name: string, type: Type): void
{
	try
	{
		assert(requireThatType(value, name, type));
	}
	catch (e)
	{
		if (e instanceof Error)
		{
			const assertionError = new AssertionError(e.message);
			assertionError.stack = e.stack?.replace(e.name, assertionError.name);
			throw assertionError;
		}
		throw e;
	}
}

/**
 * Requires that an object has the expected type category.
 *
 * @param value - the value of a parameter
 * @param name - the name of the parameter
 * @param typeCategory - `value`'s expected type category
 * @param typeGuard - (optional) for certain types, such as Typescript interfaces, runtime validation is not
 * possible. In such a case, use a type guard to check if the value satisfies the type condition.
 * @returns `true`
 * @throws TypeError if `value` does not have the expected `typeCategory`. If `name` is not a string.
 */
function requireThatTypeCategory(value: unknown, name: string, typeCategory: TypeCategory,
                                 typeGuard?: (value: unknown) => boolean)
{
	const typeOfName = Type.of(name);
	if (typeOfName !== Type.STRING)
	{
		throw new TypeError(`name must be a string.
Actual: ${internalValueToString(name)}
Type  : ${typeOfName.toString()}`);
	}

	const typeCategoryOfValue = Type.of(value).category;
	let matchFound;
	if (typeGuard !== undefined)
		matchFound = typeGuard(value);
	else
		matchFound = isEqual(typeCategoryOfValue, typeCategory);
	if (!matchFound)
	{
		throw new TypeError(`${name} must be a ${TypeCategory[typeCategory]}.
Actual      : ${internalValueToString(value)}
TypeCategory: ${TypeCategory[typeCategoryOfValue]}`);
	}
	return true;
}

/**
 * Requires that a value has the expected type category if assertions are enabled. We assume that
 * `assert()` will be stripped out at build-time if assertions are disabled.
 *
 * @param value - the value of a parameter
 * @param name  - the name of the parameter
 * @param category - `value`'s expected type category
 * @param typeGuard - (optional) for certain types, such as Typescript interfaces, runtime validation is not
 * possible. In such a case, use a type guard to check if the value satisfies the type condition.
 * @returns `true`
 * @throws TypeError if `value` does not have the expected `typeCategory` category. If `name` is not a string.
 */
function assertThatTypeCategory(value: unknown, name: string, category: TypeCategory,
                                typeGuard?: (value: unknown) => boolean): void
{
	try
	{
		assert(requireThatTypeCategory(value, name, category, typeGuard));
	}
	catch (e)
	{
		if (e instanceof Error)
		{
			const assertionError = new AssertionError(e.message);
			assertionError.stack = e.stack?.replace(e.name, assertionError.name);
			throw assertionError;
		}
		throw e;
	}

}

/**
 * Requires that an object is an instance of `type`.
 *
 * @param value - the value of a parameter
 * @param name - the name of the parameter
 * @param type - the class that `value` is expected to be an instance of. This may not reference
 * an interface or abstract class because
 * <a href="https://stackoverflow.com/a/47082428/14731">Typescript does not expose them at runtime</a>.
 * @returns `true`
 * @throws TypeError if `value` is not an instance of `type`.
 * If `name` is not a string.
 */
function requireThatInstanceOf(value: unknown, name: string,
                               // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
                               type: ClassConstructor<unknown> | Record<string | number, string | number>)
{
	// WARNING: Per https://github.com/typescript-eslint/typescript-eslint/issues/9370 instanceof returns false
	// if a class "implements" an interface or another class.
	const typeOfName = Type.of(name);
	if (typeOfName !== Type.STRING)
	{
		throw new TypeError(`name must be a string.
Actual     : ${internalValueToString(name)}
Actual.type: ${typeOfName.toString()}`);
	}
	const typeOfType = Type.of(type);
	switch (typeOfType.category)
	{
		case TypeCategory.CLASS:
		{
			const classType = type as ClassConstructor<unknown>;
			if (!(value instanceof classType))
			{
				const typeOfValue = Type.of(value);
				throw new TypeError(`${name} must be ${typeOfType.toString()}.
Actual: ${typeOfValue.toString()}`);
			}
			break;
		}
		case TypeCategory.NUMBER:
		case TypeCategory.STRING:
		{
			// Enum
			if (!Object.values(type).includes(value))
			{
				throw new TypeError(`${name} must be ${typeOfType.toString()}.
Actual: ${internalValueToString(type)}
Type  : ${typeOfType.toString()}`);
			}
			break;
		}
		default:
			throw new TypeError(`type must be a class or enum.
Actual: ${internalValueToString(typeOfType)}`);
	}
	return true;
}

/**
 * Requires that an object is an instance of the expected type.
 *
 * @param value - the value of a parameter
 * @param name - the name of the parameter
 * @param type - the class the value is expected to be an instance of
 * @throws TypeError if `value` is not an instance of `type`.
 * If `name` is not a string.
 */
function assertThatInstanceOf<T>(value: T, name: string, type: ClassConstructor<T>): void
{
	try
	{
		assert(requireThatInstanceOf(value, name, type));
	}
	catch (e)
	{
		if (e instanceof Error)
		{
			const assertionError = new AssertionError(e.message);
			assertionError.stack = e.stack?.replace(e.name, assertionError.name);
			throw assertionError;
		}
		throw e;
	}
}

/**
 * Requires that a string is not empty.
 *
 * @param value - the value of a parameter
 * @param name - the name of the parameter
 * @returns `true`
 * @throws TypeError if `name` or `value` are empty.
 * If `name` is not a string.
 */
function requireThatStringIsNotEmpty(value: string, name: string): boolean
{
	requireThatType(name, "name", Type.STRING);
	name = name.trim();
	if (name.length === 0)
		throw new RangeError("name may not be empty");
	requireThatType(value, "value", Type.STRING);
	value = value.trim();
	if (value.length === 0)
		throw new RangeError(`${name} may not be empty`);
	return true;
}

/**
 * Requires that a string is not empty.
 *
 * @param value - the value of a parameter
 * @param name - the name of the parameter
 * @returns `true`
 * @throws TypeError if `name` or `value` are empty.
 * If `name` is not a string.
 */
function assertThatStringIsNotEmpty(value: string, name: string): void
{
	try
	{
		assert(requireThatStringIsNotEmpty(value, name));
	}
	catch (e)
	{
		if (e instanceof Error)
		{
			const assertionError = new AssertionError(e.message);
			assertionError.stack = e.stack?.replace(e.name, assertionError.name);
			throw assertionError;
		}
		throw e;
	}
}

/**
 * Converts an internal value to a string.
 *
 * @param value - a value
 * @returns the string representation of the value
 */
function internalValueToString(value: unknown): string
{
	let typeOfObject = Type.of(value);
	switch (typeOfObject.category)
	{
		case TypeCategory.CLASS:
		{
			switch (typeOfObject.name)
			{
				case "Set":
				{
					const set = value as Set<unknown>;
					return arrayToString(Array.from(set.values()));
				}
				case "Map":
				{
					const result: { [key: string]: unknown } = {};
					const map = value as Map<unknown, unknown>;
					for (const entry of map.entries())
					{
						const key = internalValueToString(entry[0]);
						result[key] = entry[1];
					}
					return JSON.stringify(result, null, 2);
				}
			}
			break;
		}
		case TypeCategory.UNDEFINED:
			return "undefined";
		case TypeCategory.NULL:
			return "null";
		case TypeCategory.STRING:
			return quoteString(value as string);
		default:
			return JSON.stringify(value, undefined, 2);
	}

	// An instance of a user class
	let current = value as ClassConstructor<unknown>;
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	while (true)
	{
		// See http://stackoverflow.com/a/22445303/14731,
		// Invoke toString() if it was defined
		// https://stackoverflow.com/a/57214796/14731: invoke toString() on safeTypes
		if (Object.prototype.hasOwnProperty.call(current.constructor.prototype, "toString"))
			return current.toString();

		// Get the superclass and try again
		const superclass = getSuperclass(current);

		let className;
		if (superclass === null)
			className = "Object";
		else
		{
			current = superclass;
			typeOfObject = Type.of(current);
			assert(typeOfObject.category === TypeCategory.CLASS, undefined,
				`expected: CLASS
actual: ${typeOfObject.toString()}`);
			className = typeOfObject.name as string;
		}

		if (className === "Object")
		{
			// Prefer JSON.stringify() to Object.toString().
			return JSON.stringify(value, null, 2);
		}
	}
}

/**
 * Quotes a String, escaping any nested quotes.
 *
 * @param value - a `String`
 * @returns the quoted string
 */
function quoteString(value: string)
{
	let result = "";

	for (let i = 0; i < value.length; ++i)
	{
		const char = value.charAt(i);
		if (char == "\"")
			result += "\\\"";
		else
			result += char;
	}
	result = "\"" + result;
	result = result + "\"";
	return result.toString();
}


/**
 * Returns the superclass of a value's type.
 *
 * @param value - a value
 * @returns `null` if the type does not have a superclass
 */
function getSuperclass(value: ClassConstructor<unknown>)
{
	return Object.getPrototypeOf(value.constructor.prototype) as ClassConstructor<unknown> | null;
}

/**
 * @param array - an array
 * @returns the string representation of the array, using toString() to convert nested values
 */
function arrayToString(array: unknown[]): string
{
	let result = "[";
	// Can't use Array.join() because it doesn't handle nested arrays well
	const size = array.length;
	for (let i = 0; i < size; ++i)
	{
		result += internalValueToString(array[i]);
		if (i < size - 1)
			result += ", ";
	}
	result += "]";
	return result;
}

/**
 * @param value - a name
 * @param name - the name of the name variable
 * @throws TypeError if `name` or `value` are not a string
 * @throws RangeError if `value` is empty
 */
function verifyName(value: string, name: string): void
{
	requireThatType(name, "name", Type.STRING);
	requireThatType(value, "value", Type.STRING);
	const trimmed = value.trim();
	if (value.length !== trimmed.length)
		throw new RangeError(`${name} may not contain leading or trailing whitespace.
Actual: "${name}"`);
	if (trimmed.length === 0)
		throw new RangeError(`${name} may not be empty`);
}

export type {
	ElementOf,
	MapKey,
	MapValue,
	ClassConstructor,
	Comparable,
	NonUndefinable
};
export {
	classExtends,
	assert,
	requireThatValueIsDefined,
	requireThatValueIsNotNull,
	assertThatValueIsNotNull,
	requireThatType,
	assertThatType,
	requireThatTypeCategory,
	assertThatTypeCategory,
	requireThatInstanceOf,
	assertThatInstanceOf,
	requireThatStringIsNotEmpty,
	assertThatStringIsNotEmpty,
	internalValueToString,
	getSuperclass,
	verifyName,
	quoteString
};