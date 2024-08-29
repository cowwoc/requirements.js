import {
	type ClassConstructor
} from "./internal/internal.mjs";

enum TypeCategory
{
	UNDEFINED,
	NULL,
	BOOLEAN,
	NUMBER,
	BIGINT,
	STRING,
	SYMBOL,
	ARRAY,
	FUNCTION,
	CLASS
}

const FUNCTION_NAME_REGEX = /^function\s+([^(]+)?\(/;
const CLASS_NAME_REGEX = /^class\s+([^{\s]+)?.*?{/;
const BUILT_IN_CLASS_NAME_REGEX = /^function\s+([^(]+)?\(\) { \[native code] }/;
const STARTS_WITH_VOWEL_REGEX = /^[aeiouAEIOU]/;

/**
 * Describes the type of a value.
 */
class Type
{
	public static readonly UNDEFINED = new Type(TypeCategory.UNDEFINED);
	public static readonly NULL = new Type(TypeCategory.NULL);
	public static readonly BOOLEAN = new Type(TypeCategory.BOOLEAN);
	public static readonly NUMBER = new Type(TypeCategory.NUMBER);
	public static readonly BIGINT = new Type(TypeCategory.BIGINT);
	public static readonly STRING = new Type(TypeCategory.STRING);
	public static readonly SYMBOL = new Type(TypeCategory.SYMBOL);
	public static readonly ARRAY = new Type(TypeCategory.ARRAY);
	/**
	 * An anonymous or arrow function.
	 */
	public static readonly ANONYMOUS_FUNCTION = new Type(TypeCategory.FUNCTION);

	public readonly category: TypeCategory;
	public readonly name: string | null;
	public readonly typeGuard?: (value: unknown) => boolean;

	/**
	 * Returns the type of a value.
	 *
	 * @param value - a value
	 * @returns the value's type
	 * @see <a href="http://stackoverflow.com/a/332429/14731">http://stackoverflow.com/a/332429/14731</a>
	 * @see {@link Type.isPrimitive}
	 */
	public static of(value: unknown): Type
	{
		const primitive = Type.getPrimitive(value);
		if (primitive !== null)
			return primitive;
		if (Array.isArray(value))
			return Type.ARRAY;
		const valueAsFunction = value as ClassConstructor<unknown>;
		const objectToString = Object.prototype.toString.call(value).slice(8, -1);
		if (objectToString === "Function")
		{
			// A function or a class
			const valueAsString = valueAsFunction.toString();
			const indexOfArrow = valueAsString.indexOf("=>");
			const indexOfBody = valueAsString.indexOf("{");
			if (indexOfArrow !== -1 && (indexOfBody === -1 || indexOfArrow < indexOfBody))
			{
				// Arrow function
				return Type.ANONYMOUS_FUNCTION;
			}
			const className = CLASS_NAME_REGEX.exec(valueAsString);
			if (className !== null && className[1] !== undefined)
			{
				// A class
				const name = className[1];
				// Class constructors are returned as named functions
				return Type.namedClass(name);
			}
			const builtInClassName = BUILT_IN_CLASS_NAME_REGEX.exec(valueAsString);
			if (builtInClassName !== null && builtInClassName[1] !== undefined)
			{
				// A built-in class
				const name = builtInClassName[1].trim();
				// Class constructors are returned as named functions
				return Type.namedClass(name);
			}
			// Anonymous and named functions
			const functionName = FUNCTION_NAME_REGEX.exec(valueAsString);
			if (functionName !== null && functionName[1] !== undefined)
			{
				// A named function
				const name = functionName[1].trim();
				return Type.namedFunction(name);
			}
			// Anonymous function
			return Type.ANONYMOUS_FUNCTION;
		}

		// Per https://stackoverflow.com/a/30560581/14731 the ES6 specification guarantees the following will
		// work
		return Type.namedClass(valueAsFunction.constructor.name);
	}

	/**
	 * Returns the type of a named class.
	 *
	 * @param name - the name of the class, or `null` to represent "any object".
	 * @param typeGuard - (optional) for certain types, such as Typescript interfaces, runtime validation is
	 *   not possible. In such a case, use a type guard to check if the value satisfies the type condition.
	 * @returns the type
	 */
	public static namedClass(name: string | null, typeGuard?: (value: unknown) => boolean): Type
	{
		return new Type(TypeCategory.CLASS, name, typeGuard);
	}

	/**
	 * Returns the type of a named function.
	 *
	 * @param name - (optional) the name of the function. `name` represents "any named function".
	 * @returns the type
	 */
	public static namedFunction(name: string | null): Type
	{
		return new Type(TypeCategory.FUNCTION, name);
	}

	/**
	 * Returns the type of an `undefined`, `null`, `boolean`, `number`, `bigint`, `string` or `symbol`
	 * value.
	 *
	 * @param value - a value
	 * @returns `null` if the value is not a primitive value
	 */
	public static getPrimitive(value: unknown)
	{
		if (value === undefined)
			return Type.UNDEFINED;
		if (value === null)
			return Type.NULL;
		switch (typeof (value))
		{
			case "boolean" :
				return Type.BOOLEAN;
			case "number" :
				return Type.NUMBER;
			case "bigint":
				return Type.BIGINT;
			case "string":
				return Type.STRING;
			case "symbol":
				return Type.SYMBOL;
		}
		return null;
	}

	/**
	 * Creates a new Type.
	 *
	 * @param category - the category of the type
	 * @param name - (optional) the name of the function or class. `null` represents any instance of the type.
	 * @param typeGuard - (optional) for certain types, such as Typescript interfaces, runtime validation is
	 *   not possible. In such a case, use a type guard to check if the value satisfies the type condition.
	 * @throws RangeError if neither `type` nor `name` are set.
	 * If `type` does not have a name (e.g. "number" or "array") but `name` is set.
	 */
	private constructor(category: TypeCategory, name: string | null = null,
	                    typeGuard?: (value: unknown) => boolean)
	{
		if (!Object.values(TypeCategory).includes(category))
		{
			throw new RangeError(`category must be an instance of TypeCategory.
Actual: ${Type.of(category).toString()}`);
		}
		this.category = category;
		this.name = name;
		this.typeGuard = typeGuard;
	}

	/**
	 * @returns `true` if the type is an `undefined`, `null`, `boolean`, `number`, `bigint`, `string` or
	 * `symbol` value
	 */
	public isPrimitive()
	{
		switch (this.category)
		{
			case TypeCategory.UNDEFINED:
			case TypeCategory.NULL:
			case TypeCategory.BOOLEAN:
			case TypeCategory.NUMBER:
			case TypeCategory.BIGINT:
			case TypeCategory.STRING:
			case TypeCategory.SYMBOL:
				return true;
			default:
				return false;
		}
	}

	/**
	 * Indicates if this type is equal to another type.
	 *
	 * @param other - another type
	 * @returns true if this type matches `other`
	 */
	public equals(other: Type): boolean
	{
		return other.category === this.category &&
			(other.name === this.name || this.name === null || other.name === null);
	}

	/**
	 * Returns the type of this type.
	 *
	 * @returns the type of this type
	 */
	public getTypeOf(): Type
	{
		switch (this.category)
		{
			case TypeCategory.UNDEFINED:
			case TypeCategory.NULL:
			case TypeCategory.BOOLEAN:
			case TypeCategory.NUMBER:
			case TypeCategory.BIGINT:
			case TypeCategory.STRING:
			case TypeCategory.SYMBOL:
			case TypeCategory.ARRAY:
			case TypeCategory.FUNCTION:
				return this;
			case TypeCategory.CLASS:
				return Type.namedClass(this.name);
		}
	}

	/**
	 * Indicates whether this type is a subtype of another type. Note that types are considered subtypes of
	 * themselves.
	 *
	 * @param parent - the parent type
	 * @returns
	 * <ul>
	 *   <li>`true` if `child` extends `parent`</li>
	 *   <li>`false` if `parent` or `child` are `undefined`, `null` or an object</li>
	 *   <li>`false` if `child` does not extend `parent`</li>
	 * </ul>
	 */
	public isSubtypeOf(parent: Type): boolean
	{
		// To convert a type to an object, use `prototype` such as `Error.prototype`.
		// To convert an object to a type, use `constructor` such as `instance.constructor`.
		switch (this.category)
		{
			case TypeCategory.UNDEFINED:
			case TypeCategory.NULL:
				return false;
			case TypeCategory.BOOLEAN:
			case TypeCategory.NUMBER:
			case TypeCategory.BIGINT:
			case TypeCategory.STRING:
			case TypeCategory.SYMBOL:
			case TypeCategory.ARRAY:
			case TypeCategory.FUNCTION:
				return this.equals(parent);
			case TypeCategory.CLASS:
			{
				if (parent === undefined || parent === null)
					return false;
				if (parent.name === null)
				{
					// null represents any class
					return true;
				}
				// There is no way to provide type-casting for a dynamic lookup of an unknown type
				// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
				const parentClass = (globalThis as unknown as any)[parent.name];
				if (this.name == null)
				{
					// null represents any class
					return true;
				}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
				const childClass = (globalThis as unknown as any)[this.name];
				// https://stackoverflow.com/a/14486171/14731
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				return childClass.prototype instanceof parentClass;
			}
		}
	}

	/**
	 * @returns the string representation of this object
	 */
	public toString(): string
	{
		switch (this.category)
		{
			case TypeCategory.UNDEFINED:
				return "undefined";
			case TypeCategory.NULL:
				return "null";
			case TypeCategory.BOOLEAN:
				return "a boolean";
			case TypeCategory.NUMBER:
				return "a number";
			case TypeCategory.BIGINT:
				return "a bigint";
			case TypeCategory.STRING:
				return "a string";
			case TypeCategory.SYMBOL:
				return "a symbol";
			case TypeCategory.ARRAY:
				return "an array";
			case TypeCategory.FUNCTION:
			{
				if (this.name === null)
					return "a function";
				return `a function named ${this.name}`;
			}
			case TypeCategory.CLASS:
			{
				if (this.name === null)
					return "an object";
				if (STARTS_WITH_VOWEL_REGEX.test(this.name))
					return `an ${this.name}`;
				return `a ${this.name}`;
			}
		}
	}
}

export {
	Type,
	TypeCategory
};