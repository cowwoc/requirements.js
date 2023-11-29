import {
	VariableType,
	type ClassConstructor
} from "./internal.mjs";

/**
 * Object helper functions.
 */
class Objects
{
	static readonly functionNamePattern = /^function\s+([^(]+)?\(/;
	static readonly classNamePattern = /^class(\s+[^{]+)?{/;
	static readonly builtInClassNamePattern = /^function\s+([^(]+)?\(\) { \[native code] }/;

	/**
	 * @param value - a value
	 * @returns <code>true</code> if <code>value</code> is a primitive type (<code>string</code>,
	 *   <code>number</code>, <code>bigint</code>, <code>boolean</code>, <code>null</code>,
	 *   <code>undefined</code>, or <code>symbol</code>)
	 */
	static isPrimitive(value: unknown)
	{
		// Per https://jsperf.com/testing-value-is-primitive/7 the following is the fastest
		if (value === null)
			return true;
		const type = typeof (value);
		return type !== "function" && type !== "object";
	}

	/**
	 * Indicates if an object is an instance of a type. To convert a type to an object, use
	 * <code>prototype</code> such as <code>Error.prototype</code>. To convert an object to a type, use
	 * <code>constructor</code> such as <code>instance.constructor</code>.
	 *
	 * @param child - the child class
	 * @param parent - the parent class
	 * @returns <code>true</code> if <code>child</code> extends <code>parent</code>; false if
	 *   <code>parent</code> or <code>child</code> are null or undefined; false if <code>child</code> does not
	 *   extend <code>parent</code>
	 */
	static extends(child: ClassConstructor<unknown>, parent: ClassConstructor<unknown>)
	{
		if (typeof (child) === "undefined" || child === null || typeof (parent) === "undefined" ||
			parent === null)
		{
			return false;
		}
		// https://stackoverflow.com/a/14486171/14731
		return child.prototype instanceof parent;
	}

	/**
	 * Throws an <code>Error</code> if <code>condition</code> is false.
	 *
	 * @param condition - a condition
	 * @param error - the type of error to throw (Default: <code>Error</code>)
	 * @param message - the error message to use on failure
	 * @throws Error if <code>condition</code> is false
	 */
	static assert(condition: boolean, error: (message?: string) => Error = Error, message?: string):
		asserts condition
	{
		// Will be stripped out using uglify.js option "pure_funcs"
		if (!condition)
			throw error(message);
	}

	/**
	 * Returns the type information of a value.
	 *
	 * <ul>
	 *   <li>If the input is undefined, returns <code>(type="undefined", name=null)</code>.</li>
	 *   <li>If the input is null, returns <code>(type="null", name=null)</code>.</li>
	 *   <li>If the input is a primitive boolean, returns <code>(type="boolean", name=null)</code>.</li>
	 *   <li>If the input is a primitive number, returns <code>(type="number", name=null)</code>.</li>
	 *   <li>If the input is a primitive or wrapper bigint, returns
	 *   <code>(type="bigint", name=null)</code>.</li>
	 *   <li>If the input is an array, returns <code>(type="array", name=null)</code>.</li>
	 *   <li>If the input is a primitive string, returns <code>(type="string", name=null)</code>.</li>
	 *   <li>If the input is a primitive symbol, returns <code>(type="symbol", null)</code>.</li>
	 *   <li>If the input is a function, returns <code>(type="function", name=the function name)</code>. If the
	 *   input is an arrow or anonymous function, its name is <code>null</code>.</li>
	 *   <li>If the input is a function, returns <code>(type="function", name=the function name)</code>.</li>
	 *   <li>If the input is a class, returns <code>(type="class", name=the name of the class)</code>.
	 *   <li>If the input is an object, returns
	 *   <code>(type="object", name=the name of the object's class)</code>.
	 *   </li>
	 * </ul>
	 *
	 * Please note that built-in types (such as <code>Object</code>, <code>String</code> or <code>Number</code>)
	 * may return a <code>function</code> instead of <code>class</code>.
	 *
	 * @param value - a value
	 * @returns <code>value</code>'s type
	 * @see <a href="http://stackoverflow.com/a/332429/14731">http://stackoverflow.com/a/332429/14731</a>
	 * @see isPrimitive
	 */
	static getTypeInfo(value: unknown)
	{
		if (value === undefined)
			return VariableType.UNDEFINED;
		if (value === null)
			return VariableType.NULL;
		if (Array.isArray(value))
			return VariableType.ARRAY;
		const typeOfValue = typeof (value);
		const isPrimitive = typeOfValue !== "function" && typeOfValue !== "object";
		if (isPrimitive)
			return VariableType.of(typeOfValue);
		const valueAsFunction = value as ClassConstructor<unknown>;
		const objectToString = Object.prototype.toString.call(value).slice(8, -1);
		if (objectToString === "Function")
		{
			// A function or a class
			const valueToString = valueAsFunction.toString();
			const indexOfArrow = valueToString.indexOf("=>");
			const indexOfBody = valueToString.indexOf("{");
			if (indexOfArrow !== -1 && (indexOfBody === -1 || indexOfArrow < indexOfBody))
			{
				// Arrow function
				return VariableType.ANONYMOUS_FUNCTION;
			}
			const className = this.classNamePattern.exec(valueToString);
			if (className !== null && typeof (className[1]) !== "undefined")
			{
				// A class
				const name = className[1].trim();
				return VariableType.of("class", name);
			}
			const builtInClassName = this.builtInClassNamePattern.exec(valueToString);
			if (builtInClassName !== null && typeof (builtInClassName[1]) !== "undefined")
			{
				// A built-in class
				const name = builtInClassName[1].trim();
				return VariableType.of("class", name);
			}
			// Anonymous and named functions
			const functionName = this.functionNamePattern.exec(valueToString);
			if (functionName !== null && typeof (functionName[1]) !== "undefined")
			{
				// A named function
				const name = functionName[1].trim();
				return VariableType.of("function", name);
			}
			// Anonymous function
			return VariableType.ANONYMOUS_FUNCTION;
		}

		// Per https://stackoverflow.com/a/30560581/14731 the ES6 specification guarantees the following will
		// work
		return VariableType.of("object", valueAsFunction.constructor.name);
	}

	/**
	 * Ensures that an object is defined and not null.
	 *
	 * @param value - the value of a parameter
	 * @param name - the name of the parameter
	 * @returns <code>true</code>
	 * @throws TypeError if <code>name</code> is not a string
	 * If <code>value</code> is <code>undefined</code> or <code>null</code>.
	 */
	static requireThatValueIsDefinedAndNotNull(value: unknown, name: string)
	{
		const nameInfo = Objects.getTypeInfo(name);
		if (nameInfo.type !== "string")
		{
			throw new TypeError("name must be a string.\n" +
				"Actual: " + Objects.toString(name) + "\n" +
				"Type  : " + nameInfo.toString());
		}
		if (typeof (value) === "undefined")
			throw new TypeError(name + " must be defined");
		if (value === null)
			throw new TypeError(name + " may not be null");
		return true;
	}

	/**
	 * Requires that an object has the expected type.
	 *
	 * @param value - the value of a parameter
	 * @param name - the name of the parameter
	 * @param type - the expected
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>
	 * of <code>value</code>
	 * @returns <code>true</code>
	 * @throws TypeError if <code>typeof(value)</code> is not equal to <code>type</code>'s type.
	 * If <code>name</code> is not a string.
	 */
	static requireThatTypeOf(value: unknown, name: string, type: string)
	{
		const nameInfo = Objects.getTypeInfo(name);
		if (nameInfo.type !== "string")
		{
			throw new TypeError("name must be a string.\n" +
				"Actual: " + Objects.toString(name) + "\n" +
				"Type  : " + nameInfo.toString());
		}
		const valueInfo = Objects.getTypeInfo(value);
		if (valueInfo.type !== type)
		{
			throw new TypeError(name + " must be a " + type + ".\n" +
				"Actual: " + Objects.toString(value) + "\n" +
				"Type  : " + valueInfo.toString());
		}
		return true;
	}

	/**
	 * Requires that a value is an object whose class has the specified name if assertions are enabled. We
	 * assume that <code>Objects.assert()</code> will be stripped out at build-time if assertions are disabled.
	 *
	 * @param value - the value of a parameter
	 * @param name - the name of the parameter
	 * @param clazz - he expected class name of <code>value</code>
	 * @returns <code>true</code>
	 * @throws TypeError if <code>value</code> is not an object of type <code>clazz</code>. If
	 * <code>name</code> is not a string.
	 */
	static requireThatObjectOf(value: unknown, name: string, clazz: string)
	{
		const nameInfo = Objects.getTypeInfo(name);
		if (nameInfo.type !== "string")
		{
			throw new TypeError("name must be a string.\n" +
				"Actual: " + Objects.toString(name) + "\n" +
				"Type  : " + nameInfo.toString());
		}
		const valueInfo = Objects.getTypeInfo(value);
		if (valueInfo.type !== "object")
		{
			throw new TypeError("value must be an object.\n" +
				"Actual: " + Objects.toString(value) + "\n" +
				"Type  : " + valueInfo.toString());
		}
		if (valueInfo.name !== clazz)
		{
			throw new TypeError(name + " must be an object of type " + clazz + ".\n" +
				"Actual: " + Objects.toString(value) + "\n" +
				"Type  : " + valueInfo.toString());
		}
		return true;
	}

	/**
	 * Requires that an object is an instance of <code>type</code>.
	 *
	 * @param value - the value of a parameter
	 * @param name - the name of the parameter
	 * @param type - the class that <code>value</code> is expected to be an instance of
	 * @returns <code>true</code>
	 * @throws TypeError if <code>value</code> is not an instance of <code>type</code>.
	 * If <code>name</code> is not a string.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static requireThatInstanceOf(value: unknown, name: string, type: ClassConstructor<any>): boolean
	{
		const nameInfo = Objects.getTypeInfo(name);
		if (nameInfo.type !== "string")
		{
			throw new TypeError("name must be a string.\n" +
				"Actual     : " + Objects.toString(name) + "\n" +
				"Actual.type: " + nameInfo.toString());
		}
		const typeInfo = Objects.getTypeInfo(type);
		if (!(value instanceof type))
		{
			throw new TypeError(name + " must be an instance of " + typeInfo.toString() + ".\n" +
				"Actual: " + Objects.toString(type) + "\n" +
				"Type  : " + typeInfo.toString());
		}
		return true;
	}

	/**
	 * Requires that a value has the expected type if assertions are enabled. We assume that
	 * <code>Objects.assert()</code> will be stripped out at build-time if assertions are disabled.
	 *
	 * @param value - the value of a parameter
	 * @param name - the name of the parameter
	 * @param type - the expected
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>
	 * of <code>value</code>
	 * @throws TypeError if <code>value</code> is not of type <code>type</code>. If <code>name</code> is not
	 * a string.
	 */
	static assertThatTypeOf(value: unknown, name: string, type: string): void
	{
		Objects.assert(this.requireThatTypeOf(value, name, type));
	}

	/**
	 * Requires that a value is an object whose class has the specified name if assertions are enabled. We
	 * assume that <code>Objects.assert()</code> will be stripped out at build-time if assertions are disabled.
	 *
	 * @param value - the value of a parameter
	 * @param name - the name of the parameter
	 * @param type - the expected class name of <code>value</code>
	 * @throws TypeError if <code>value</code> is not an object of type <code>type</code>. If
	 * <code>name</code> is not a string.
	 */
	static assertThatObjectOf(value: unknown, name: string, type: string): void
	{
		Objects.assert(this.requireThatObjectOf(value, name, type));
	}

	/**
	 * Requires that an object is an instance of the expected type.
	 *
	 * @param value - the value of a parameter
	 * @param name - the name of the parameter
	 * @param type - the class the value is expected to be an instance of
	 * @throws TypeError if <code>value</code> is not an instance of <code>type</code>.
	 * If <code>name</code> is not a string.
	 */
	static assertThatInstanceOf<T>(value: T, name: string, type: ClassConstructor<T>): void
	{
		Objects.assert(this.requireThatInstanceOf(value, name, type));
	}

	/**
	 * Requires that a string is not empty.
	 *
	 * @param value - the value of a parameter
	 * @param name - the name of the parameter
	 * @returns <code>true</code>
	 * @throws TypeError if <code>name</code> or <code>value</code> are empty.
	 * If <code>name</code> is not a string.
	 */
	static requireThatStringIsNotEmpty(value: string, name: string): boolean
	{
		this.requireThatTypeOf(name, "name", "string");
		name = name.trim();
		if (name.length === 0)
			throw new RangeError("name may not be empty");
		this.requireThatTypeOf(value, "value", "string");
		value = value.trim();
		if (value.length === 0)
			throw new RangeError(name + " may not be empty");
		return true;
	}

	/**
	 * Requires that a string is not empty if assertions are enabled. We assume that
	 * <code>Objects.assert()</code> will be stripped out at build-time if assertions are disabled.
	 *
	 * @param value - the value of a parameter
	 * @param name - the name of the parameter
	 * @throws TypeError if <code>name</code> or <code>value</code> are empty. If <code>name</code> is not a
	 * string.
	 */
	static assertThatStringNotEmpty(value: string, name: string): void
	{
		Objects.assert(this.requireThatStringIsNotEmpty(value, name));
	}

	/**
	 * @param object - an object
	 * @returns the string representation of the object
	 */
	static toString(object: unknown): string
	{
		let currentInfo = Objects.getTypeInfo(object);
		switch (currentInfo.type)
		{
			case "undefined":
			case "null":
				return currentInfo.type;
			case "array":
				return Objects.arrayToString(object as unknown[]);
			case "string":
				return object as string;
			case "boolean" :
			case "number" :
			case "bigint":
			case "symbol":
			case "function":
			case "class":
				break;
			case "object":
			{
				switch (currentInfo.name)
				{
					case "Set":
					{
						const set = object as Set<unknown>;
						return Objects.arrayToString(Array.from(set.values()));
					}
					case "Map":
					{
						const result: { [key: string]: unknown } = {};
						const map = object as Map<unknown, unknown>;
						for (const entry of map.entries())
						{
							const key = Objects.toString(entry[0]);
							result[key] = entry[1];
						}
						return JSON.stringify(result, null, 2);
					}
				}
				// Other kind of classes
				break;
			}
			default:
				throw new Error("Unexpected type: " + currentInfo.toString());
		}

		let current = object as boolean | number | bigint | symbol | ClassConstructor<unknown> | object;
		while (true)
		{
			// See http://stackoverflow.com/a/22445303/14731,
			// Invoke toString() if it was defined
			// https://stackoverflow.com/a/57214796/14731: invoke toString() on safeTypes
			if (Object.prototype.hasOwnProperty.call(current.constructor.prototype, "toString"))
			{
				// eslint-disable-next-line @typescript-eslint/no-base-to-string
				return current.toString();
			}

			// Get the superclass and try again
			current = Object.getPrototypeOf(current.constructor.prototype) as object;
			currentInfo = Objects.getTypeInfo(current);
			if (currentInfo.type === "object")
			{
				// Prefer JSON.stringify() to Object.toString().
				return JSON.stringify(current, null, 2);
			}
		}
	}

	/**
	 * @param array - an array
	 * @returns the string representation of the array, using Objects.toString() to convert nested values
	 */
	private static arrayToString(array: unknown[]): string
	{
		let result = "[";
		// Can't use Array.join() because it doesn't handle nested arrays well
		const size = array.length;
		for (let i = 0; i < size; ++i)
		{
			result += Objects.toString(array[i]);
			if (i < size - 1)
				result += ", ";
		}
		result += "]";
		return result;
	}

	/**
	 * @param value - a name
	 * @param name - the name of the name
	 * @throws TypeError if <code>name</code> or <code>value</code> are not a string
	 * @throws RangeError if <code>value</code> is empty
	 */
	static verifyName(value: string, name: string): void
	{
		if (typeof (name) !== "undefined")
			this.requireThatTypeOf(name, "name", "string");
		this.requireThatTypeOf(value, "value", "string");
		const trimmed = value.trim();
		if (trimmed.length === 0)
			throw new RangeError(name + " may not be empty");
	}
}

export {Objects};