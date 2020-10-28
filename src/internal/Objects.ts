/**
 * Object helper functions.
 */
class Objects
{
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
	 * Returns the name of an object's type.
	 *
	 * <ul>
	 * <li>If the input is undefined, returns "undefined".</li>
	 * <li>If the input is null, returns "null".</li>
	 * <li>If the input is a primitive boolean, returns "boolean".</li>
	 * <li>If the input is a primitive number, returns "number".</li>
	 * <li>If the input is a primitive bigint, returns "bigint".</li>
	 * <li>If the input is a primitive string, returns "string".</li>
	 * <li>If the input is a primitive symbol, returns "symbol".</li>
	 * <li>If the input is an array, returns "Array".</li>
	 * <li>If the input is a named function or a class constructor, returns "Function".</li>
	 * <li>If the input is an anonymous function, returns "AnonymousFunction".</li>
	 * <li>If the input is an arrow function, returns "ArrowFunction".</li>
	 * <li>If the input is a class instance, returns the class name.</li>
	 * </ul>
	 *
	 * @param {object} value a value
	 * @return {string} the name of the value's type
	 * @see <a href="http://stackoverflow.com/a/332429/14731">http://stackoverflow.com/a/332429/14731</a>
	 * @see isPrimitive
	 */
	static getTypeOf(value: unknown): string
	{
		if (value === null)
			return "null";
		const typeOfValue = typeof (value);
		const isPrimitive = typeOfValue !== "function" && typeOfValue !== "object";
		if (isPrimitive)
			return typeOfValue;
		const valueToString = Object.prototype.toString.call(value).slice(8, -1);
		if (valueToString === "Function")
		{
			// eslint-disable-next-line @typescript-eslint/ban-types
			const valueAsFunction = value as Function;
			// A function or a constructor
			const instanceToString = valueAsFunction.toString();
			const indexOfArrow = instanceToString.indexOf("=>");
			const indexOfBody = instanceToString.indexOf("{");
			if (indexOfArrow !== -1 && (indexOfBody === -1 || indexOfArrow < indexOfBody))
				return "ArrowFunction";
			// Anonymous and named functions
			const functionNamePattern = /^function(\s+[^(]+)?\(/;
			const functionName = functionNamePattern.exec(instanceToString);
			if (functionName !== null && typeof (functionName[1]) !== "undefined")
			{
				// Found a named function: equivalent to a class constructor under ES5-
				return "Function";
			}
			const classNamePattern = /^class(\s+[^{]+)?{/;
			const className = classNamePattern.exec(instanceToString);
			if (className !== null && typeof (className[1]) !== "undefined")
			{
				// When running under ES6+
				return "Function";
			}
			return "AnonymousFunction";
		}
		// Built-in types (e.g. String) or class instances
		if (valueToString === "Object")
		{
			const valueAsObject = value as Record<string, unknown>;
			return Objects.getClassName(valueAsObject);
		}
		return valueToString;
	}

	/**
	 * @param {object} object an object
	 * @return {string} the name of the object's class
	 * @throws {TypeError} if <code>object</code> is not an Object
	 * @see Objects.getTypeOf
	 * @private
	 */
	private static getClassName(object: Record<string, unknown>)
	{
		const constructorString = object.constructor.toString();
		// Anonymous and named functions
		const functionNamePattern = /^function(\s+[^(]+)?\(/;
		const functionName = functionNamePattern.exec(constructorString);
		if (functionName !== null)
		{
			if (typeof (functionName[1]) === "undefined")
			{
				// Found an anonymous function: JQuery uses anonymous functions to construct selector objects
				return "Object";
			}
			// Found a named function: equivalent to a class constructor
			return functionName[1].trim();
		}

		const classNamePattern = /^class ([^{]+){/;
		const className = classNamePattern.exec(constructorString);
		if (className === null)
		{
			throw new TypeError("object must be an Object.\n" +
				"Actual: " + Objects.toString(object));
		}
		return className[1].trim();
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
		const typeOfName = Objects.getTypeOf(name);
		if (typeOfName !== "string")
		{
			throw new TypeError("name must be a string.\n" +
				"Actual: " + Objects.toString(name) + "\n" +
				"Type  : " + typeOfName);
		}
		if (typeof (value) === "undefined")
			throw new TypeError(name + " must be set");
		if (value === null)
			throw new TypeError(name + " may not be null");
		return true;
	}

	/**
	 * Requires that an object has the expected type.
	 *
	 * @param {object} value the value of a parameter
	 * @param {string} name the name of the parameter
	 * @param {string} type the name of the expected type of the object
	 * @return {boolean} true
	 * @throws {TypeError} if <code>value</code> is not of type <code>type</code>. If <code>name</code> is not
	 * a string
	 */
	static requireThatTypeOf(value: unknown, name: string, type: string): boolean
	{
		const typeOfName = Objects.getTypeOf(name);
		if (typeOfName !== "string")
		{
			throw new TypeError("name must be a string.\n" +
				"Actual: " + Objects.toString(name) + "\n" +
				"Type  : " + typeOfName);
		}
		const typeOfValue = Objects.getTypeOf(value);
		if (typeOfValue !== type)
		{
			throw new TypeError(name + " must be a " + type + ".\n" +
				"Actual: " + Objects.toString(value) + "\n" +
				"Type  : " + typeOfValue);
		}
		return true;
	}

	/**
	 * Requires that an object is an instance of the expected type.
	 *
	 * @param {object} value the value of a parameter
	 * @param {string} name the name of the parameter
	 * @param {Function} type the class the value is expected to be an instance of
	 * @return {boolean} true
	 * @throws {TypeError} if <code>value</code> is not an instance of <code>type</code>. If <code>name</code>
	 * is not a string
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	static requireThatInstanceOf(value: unknown, name: string, type: Function): boolean
	{
		const typeOfName = Objects.getTypeOf(name);
		if (typeOfName !== "string")
		{
			throw new TypeError("name must be a string.\n" +
				"Actual     : " + Objects.toString(name) + "\n" +
				"Actual.type: " + typeOfName);
		}
		const typeOfType = Objects.getTypeOf(type);
		if (typeOfType !== "Function")
		{
			throw new TypeError("\"type\" must be a Function.\n" +
				"Actual     : " + Objects.toString(type) + "\n" +
				"Actual.type: " + typeOfType);
		}
		if (!(value instanceof type))
		{
			throw new TypeError(name + " must be an instance of " + Objects.getTypeOf(type) + ".\n" +
				"Actual.type: " + Objects.getTypeOf(value));
		}
		return true;
	}

	/**
	 * Requires that the <code>value</code> extends the <code>expected</code> type.
	 *
	 * @param {Function} child the child class
	 * @param {string} name the name of the type
	 * @param {Function} parent the parent class
	 * @return {boolean} true
	 * @throws {TypeError} if <code>value</code> does not extend <code>type</code>. If <code>name</code> is not
	 * a string
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	static requireThatExtends(child: Function, name: string, parent: Function): boolean
	{
		const typeOfName = Objects.getTypeOf(name);
		if (typeOfName !== "string")
		{
			throw new TypeError("name must be a string.\n" +
				"Actual     : " + Objects.toString(name) + "\n" +
				"Actual.type: " + typeOfName);
		}
		if (!Objects.extends(child, parent))
		{
			throw new TypeError(name + " must extend " + Objects.getTypeOf(parent) + ".\n" +
				"Actual.type: " + Objects.getTypeOf(child));
		}
		return true;
	}

	/**
	 * Requires that an object has the expected type if assertions are enabled. We assume that
	 * <code>console.assert()</code> will be stripped out at build-time if assertions are disabled.
	 *
	 * @param {object} value the value of a parameter
	 * @param {string} name the name of the parameter
	 * @param {string} type the expected type of the object
	 * @throws {TypeError} if <code>value</code> is not of type <code>type</code>. If <code>name</code> is not
	 * a string
	 */
	static assertThatTypeOf(value: unknown, name: string, type: string): void
	{
		console.assert(this.requireThatTypeOf(value, name, type));
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
		console.assert(this.requireThatInstanceOf(value, name, type));
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
	 * <code>console.assert()</code> will be stripped out at build-time if assertions are disabled.
	 *
	 * @param {object} value the value of a parameter
	 * @param {string} name the name of the parameter
	 * @throws {TypeError} if <code>name</code> or <code>value</code> are empty. If <code>name</code> is not a
	 * string
	 */
	static assertThatStringNotEmpty(value: string, name: string): void
	{
		console.assert(this.requireThatStringNotEmpty(value, name));
	}

	/**
	 * @param {object} object an object
	 * @return {string} the string representation of the object
	 */
	static toString(object: unknown): string
	{
		if (typeof (object) === "undefined")
			return "undefined";
		if (object === null)
			return "null";
		// Invoke toString() if it was overridden; otherwise, prefer JSON.stringify() to Object.toString().
		let current = object;
		let currentAsSet;
		switch (Objects.getTypeOf(current))
		{
			case "Set":
				currentAsSet = current as Set<unknown>;
				current = Array.from(currentAsSet.values());
			// fallthrough
			case "Array":
			{
				let result = "[";
				// Can't use Array.join() because it doesn't handle nested arrays well
				const array = current as unknown[];
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
			case "object":
				return JSON.stringify(current, null, 2);
		}
		while (true)
		{
			// eslint-disable-next-line @typescript-eslint/ban-types
			const safeTypes = current as string | number | bigint | boolean | symbol | Function;
			// See http://stackoverflow.com/a/22445303/14731, https://stackoverflow.com/q/57214613/14731
			if (Object.prototype.hasOwnProperty.call(safeTypes.constructor.prototype, "toString"))
				return safeTypes.toString();

			// Get the superclass and try again
			current = Object.getPrototypeOf(safeTypes.constructor.prototype) as string;
			if (Objects.getTypeOf(current) === "Object")
				return JSON.stringify(current, null, 2);
		}
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

	/**
	 * Returns an error message if <code>value</code> is not set.
	 *
	 * @param {object} value the value of the parameter
	 * @param {string} name the name of the parameter
	 * @return {string} an error message or null if the value is set
	 */
	static validateThatValueIsSet(value: unknown, name: string): string | null
	{
		this.assertThatStringNotEmpty(name, "name");
		if (typeof (value) === "undefined")
			return name + " must be set";
		if (value === null)
			return name + " may not be null";
		return null;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {Objects as default};