import
{
	VariableType
} from "./internal.mjs";

/**
 * Object helper functions.
 */
class Objects
{
	static readonly functionNamePattern = /^function\s+([^(]+)?\(/;
	static readonly classNamePattern = /^class(\s+[^{]+)?{/;

	/**
	 * @param {object} value a value
	 * @return {boolean} true if <code>value</code> is a primitive type (<code>string</code>,
	 *   <code>number</code>, <code>bigint</code>, <code>boolean</code>, <code>null</code>,
	 *   <code>undefined</code>, or <code>symbol</code>)
	 */
	static isPrimitive(value: unknown): boolean
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
	 * @param {Function} child the child class
	 * @param {Function} parent the parent class
	 * @return {boolean} true if <code>child</code> extends <code>parent</code>; false if <code>parent</code>
	 *   or <code>child</code> are null or undefined; false if <code>child</code> does not extend
	 *   <code>parent</code>
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	static extends(child: Function, parent: Function): boolean
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
	 * @param {boolean} condition a condition
	 * @param {Error} [error = Error] the type of error to throw
	 * @param {string} message the error message to use on failure
	 * @throws {Error} if <code>condition</code> is false
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
	 * may return type <code>function</code> instead of <code>class</code>.
	 *
	 * @param {object} value a value
	 * @return {VariableType} <code>value</code>'s type
	 * @see <a href="http://stackoverflow.com/a/332429/14731">http://stackoverflow.com/a/332429/14731</a>
	 * @see isPrimitive
	 */
	static getTypeInfo(value: unknown): VariableType
	{
		if (value === null)
			return new VariableType("null");
		const typeOfValue = typeof (value);
		const isPrimitive = typeOfValue !== "function" && typeOfValue !== "object";
		if (isPrimitive)
			return new VariableType(typeOfValue);
		const objectToString = Object.prototype.toString.call(value).slice(8, -1);
		// eslint-disable-next-line @typescript-eslint/ban-types
		const valueAsFunction = value as Function;
		const valueToString = valueAsFunction.toString();
		if (objectToString === "Function")
		{
			// A function or a constructor
			const indexOfArrow = valueToString.indexOf("=>");
			const indexOfBody = valueToString.indexOf("{");
			if (indexOfArrow !== -1 && (indexOfBody === -1 || indexOfArrow < indexOfBody))
			{
				// Arrow function
				return new VariableType("function");
			}
			// Anonymous and named functions
			const functionName = this.functionNamePattern.exec(valueToString);
			if (functionName !== null && typeof (functionName[1]) !== "undefined")
			{
				// Found a named function or class constructor
				return new VariableType("function", functionName[1].trim());
			}
			const className = this.classNamePattern.exec(valueToString);
			if (className !== null && typeof (className[1]) !== "undefined")
			{
				// When running under ES6+
				return new VariableType("class", className[1].trim());
			}
			// Anonymous function
			return new VariableType("function");
		}
		if (objectToString === "Array")
			return new VariableType("array");

		const classInfo = this.getTypeInfo(valueAsFunction.constructor);
		Objects.assert(classInfo !== null, TypeError, "classInfo may not be null");
		Objects.assert(classInfo.name !== null, RangeError, classInfo.toString());
		return new VariableType("object", classInfo.name);
	}

	/**
	 * Requires that an object is set.
	 *
	 * @param {object} value the value of a parameter
	 * @param {string} name the name of the parameter
	 * @return {boolean} true
	 * @throws {TypeError} if <code>value</code> is <code>undefined</code> or <code>null</code>. If
	 * <code>name</code> is not a string
	 */
	static requireThatIsSet(value: unknown, name: string): boolean
	{
		const nameInfo = Objects.getTypeInfo(name);
		if (nameInfo.type !== "string")
		{
			throw new TypeError("name must be a string.\n" +
				"Actual: " + Objects.toString(name) + "\n" +
				"Type  : " + nameInfo);
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
	 * @param {object} value the value of a parameter
	 * @param {string} name the name of the parameter
	 * @param {string} type the expected
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>
	 * of <code>value</code>
	 * @return {boolean} true
	 * @throws {TypeError} if <code>typeof(value)</code> is not equal to <code>type</code>'s type. If
	 * <code>name</code> is not a string
	 */
	static requireThatTypeOf(value: unknown, name: string, type: string): boolean
	{
		const nameInfo = Objects.getTypeInfo(name);
		if (nameInfo.type !== "string")
		{
			throw new TypeError("name must be a string.\n" +
				"Actual: " + Objects.toString(name) + "\n" +
				"Type  : " + nameInfo);
		}
		const valueInfo = Objects.getTypeInfo(value);
		if (valueInfo.type !== type)
		{
			throw new TypeError(name + " must be a " + type + ".\n" +
				"Actual: " + Objects.toString(value) + "\n" +
				"Type  : " + valueInfo);
		}
		return true;
	}

	/**
	 * Requires that a value is an object whose class has the specified name if assertions are enabled. We
	 * assume that <code>Objects.assert()</code> will be stripped out at build-time if assertions are disabled.
	 *
	 * @param {object} value the value of a parameter
	 * @param {string} name the name of the parameter
	 * @param {string} clazz the expected class name of <code>value</code>
	 * @return {boolean} true
	 * @throws {TypeError} if <code>value</code> is not an object of type <code>clazz</code>. If
	 * <code>name</code> is not a string
	 */
	static requireThatObjectOf(value: unknown, name: string, clazz: string): boolean
	{
		const nameInfo = Objects.getTypeInfo(name);
		if (nameInfo.type !== "string")
		{
			throw new TypeError("name must be a string.\n" +
				"Actual: " + Objects.toString(name) + "\n" +
				"Type  : " + nameInfo);
		}
		const valueInfo = Objects.getTypeInfo(value);
		if (valueInfo.type !== "object")
		{
			throw new TypeError("value must be an object.\n" +
				"Actual: " + Objects.toString(value) + "\n" +
				"Type  : " + valueInfo);
		}
		if (valueInfo.name !== clazz)
		{
			throw new TypeError(name + " must be an object of type " + clazz + ".\n" +
				"Actual: " + Objects.toString(value) + "\n" +
				"Type  : " + valueInfo);
		}
		return true;
	}

	/**
	 * Requires that an object is an instance of <code>type</code>.
	 *
	 * @param {object} value the value of a parameter
	 * @param {string} name the name of the parameter
	 * @param {Function} type the class that <code>value</code> is expected to be an instance of
	 * @return {boolean} true
	 * @throws {TypeError} if <code>value</code> is not an instance of <code>type</code>. If <code>name</code>
	 * is not a string
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	static requireThatInstanceOf(value: unknown, name: string, type: Function): boolean
	{
		const nameInfo = Objects.getTypeInfo(name);
		if (nameInfo.type !== "string")
		{
			throw new TypeError("name must be a string.\n" +
				"Actual     : " + Objects.toString(name) + "\n" +
				"Actual.type: " + nameInfo);
		}
		const typeInfo = Objects.getTypeInfo(type);
		if (!(value instanceof type))
		{
			throw new TypeError(name + " must be an instance of " + typeInfo + ".\n" +
				"Actual: " + Objects.toString(type) + "\n" +
				"Type  : " + typeInfo);
		}
		return true;
	}

	/**
	 * Requires that a value has the expected type if assertions are enabled. We assume that
	 * <code>Objects.assert()</code> will be stripped out at build-time if assertions are disabled.
	 *
	 * @param {object} value the value of a parameter
	 * @param {string} name the name of the parameter
	 * @param {string} type the expected
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>
	 * of <code>value</code>
	 * @throws {TypeError} if <code>value</code> is not of type <code>type</code>. If <code>name</code> is not
	 * a string
	 */
	static assertThatTypeOf(value: unknown, name: string, type: string): void
	{
		Objects.assert(this.requireThatTypeOf(value, name, type));
	}

	/**
	 * Requires that a value is an object whose class has the specified name if assertions are enabled. We
	 * assume that <code>Objects.assert()</code> will be stripped out at build-time if assertions are disabled.
	 *
	 * @param {object} value the value of a parameter
	 * @param {string} name the name of the parameter
	 * @param {string} type the expected class name of <code>value</code>
	 * @throws {TypeError} if <code>value</code> is not an object of type <code>type</code>. If
	 * <code>name</code> is not a string
	 */
	static assertThatObjectOf(value: unknown, name: string, type: string): void
	{
		Objects.assert(this.requireThatObjectOf(value, name, type));
	}

	/**
	 * Requires that an object is an instance of the expected type.
	 *
	 * @param {object} value the value of a parameter
	 * @param {string} name the name of the parameter
	 * @param {Function} type the class the value is expected to be an instance of
	 * @throws {TypeError} if <code>value</code> is not an instance of <code>type</code>. If <code>name</code>
	 * is not a string
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	static assertThatInstanceOf(value: unknown, name: string, type: Function): void
	{
		Objects.assert(this.requireThatInstanceOf(value, name, type));
	}

	/**
	 * Requires that a string is not empty.
	 *
	 * @param {object} value the value of a parameter
	 * @param {string} name the name of the parameter
	 * @return {boolean} true
	 * @throws {TypeError} if <code>name</code> or <code>value</code> are empty. If <code>name</code> is not a
	 * string
	 */
	static requireThatStringNotEmpty(value: string, name: string): boolean
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
	 * @param {object} value the value of a parameter
	 * @param {string} name the name of the parameter
	 * @throws {TypeError} if <code>name</code> or <code>value</code> are empty. If <code>name</code> is not a
	 * string
	 */
	static assertThatStringNotEmpty(value: string, name: string): void
	{
		Objects.assert(this.requireThatStringNotEmpty(value, name));
	}

	/**
	 * @param {object} object an object
	 * @return {string} the string representation of the object
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
				throw new Error("Unexpected type: " + currentInfo);
		}

		// eslint-disable-next-line @typescript-eslint/ban-types
		let current = object as boolean | number | bigint | symbol | Function | object;
		while (true)
		{
			// See http://stackoverflow.com/a/22445303/14731,
			// Invoke toString() if it was defined
			// https://stackoverflow.com/a/57214796/14731: invoke toString() on safeTypes
			if (Object.prototype.hasOwnProperty.call(current.constructor.prototype, "toString"))
				return current.toString();

			// Get the superclass and try again
			// eslint-disable-next-line @typescript-eslint/ban-types
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
	 * @param {string} array an array
	 * @return {string} the string representation of the array, using Objects.toString() to convert nested
	 *   values
	 * @private
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
	 * @param {string} value a name
	 * @param {string} name the name of the name
	 * @throws {TypeError} if <code>name</code> or <code>value</code> are not a String
	 * @throws {RangeError} if <code>value</code> is empty
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

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {Objects as default};