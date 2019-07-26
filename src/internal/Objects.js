/**
 * @param {object} value a value
 * @return {boolean} true if <code>value</code> is a primitive type (<code>string</code>, <code>number</code>,
 *   <code>bigint</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, or
 *   <code>symbol</code>)
 * @ignore
 */
function isPrimitiveImpl(value)
{
	// Per https://jsperf.com/testing-value-is-primitive/7 the following is the fastest
	if (value === null)
		return true;
	const type = typeof (value);
	return type !== "function" && type !== "object";
}

/**
 * Returns the name of an object's type.
 *
 * If the input is undefined, returns "undefined".
 * If the input is null, returns "null".
 * If the input is a primitive boolean, returns "boolean".
 * If the input is a boolean object, returns "Boolean".
 * If the input is a primitive number, returns "number".
 * If the input is a number object, returns "Number".
 * If the input is a primitive bigint, returns "bigint".
 * If the input is a bigint object, returns "BigInt".
 * If the input is a primitive string, returns "string".
 * If the input is a string object, returns "String".
 * If the input is a primitive symbol, returns "symbol".
 * If the input is a symbol object, returns "Symbol".
 * If the input is an array, returns "Array".
 * If the input is a named function or a class constructor, returns "Function".
 * If the input is an anonymous function, returns "AnonymousFunction".
 * If the input is an arrow function, returns "ArrowFunction".
 * If the input is a class instance, returns the class name.
 *
 * @param {object} object an object
 * @return {string} the name of the object's type
 * @see <a href="http://stackoverflow.com/a/332429/14731">http://stackoverflow.com/a/332429/14731</a>
 * @ignore
 */
function getTypeOfImpl(object)
{
	if (object === null)
		return "null";
	const typeOfObject = typeof (object);
	const isPrimitive = typeOfObject !== "function" && typeOfObject !== "object";
	if (isPrimitive)
		return typeOfObject;
	const objectToString = Object.prototype.toString.call(object).slice(8, -1);
	if (objectToString === "Function")
	{
		if (object.name !== null && object.name !== "")
			return object.name;
		const instanceToString = object.toString();
		const indexOfArrow = instanceToString.indexOf("=>");
		const indexOfBody = instanceToString.indexOf("{");
		if (indexOfArrow !== -1 && (indexOfBody === -1 || indexOfArrow < indexOfBody))
			return "ArrowFunction";
		return "AnonymousFunction";
	}
	// Built-in types (e.g. String) or class instances
	if (objectToString === "Object")
		return getObjectClass(object);
	return objectToString;
}

/**
 * @param {object} object an object
 * @return {string} the string representation of the object
 * @ignore
 */
function toStringImpl(object)
{
	if (typeof (object) === "undefined")
		return "undefined";
	if (object === null)
		return "null";
	// Invoke toString() if it was overridden; otherwise, prefer JSON.stringify() to Object.toString().
	let current = object;
	switch (getTypeOfImpl(current))
	{
		case "Set":
			current = Array.from(current.values());
		// fallthrough
		case "Array":
		{
			let result = "[";
			// Can't use Array.join() because it doesn't handle nested arrays well
			const size = current.length;
			for (let i = 0; i < size; ++i)
			{
				result += toStringImpl(current[i]);
				if (i < size - 1)
					result += ", ";
			}
			result += "]";
			return result;
		}
		case "Map":
		{
			const result = {};
			for (const entry of object.entries())
				result[entry[0]] = entry[1];
			return JSON.stringify(result, null, 2);
		}
		case "Object":
			return JSON.stringify(current, null, 2);
	}
	while (true)
	{
		// See http://stackoverflow.com/a/22445303/14731, https://stackoverflow.com/q/57214613/14731
		if (Object.prototype.hasOwnProperty.call(current.constructor.prototype, "toString"))
			return current.constructor.prototype.toString.call(object);
		current = Object.getPrototypeOf(current.constructor.prototype);
		if (getTypeOfImpl(current) === "Object")
			return JSON.stringify(current, null, 2);
	}
}

/**
 * @param {object} object an object
 * @return {string} the name of the object's class
 * @throws {TypeError} if <code>object</code> is not an Object
 * @see Objects.getTypeOf
 * @ignore
 */
function getObjectClass(object)
{
	const constructorString = object.constructor.toString();
	// Anonymous and named functions
	const functionNamePattern = /^function(\s+[^(]+)?\(/;
	const functionName = constructorString.match(functionNamePattern);
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
	const className = constructorString.match(classNamePattern);
	if (className === null)
	{
		throw new TypeError("object must be an Object.\n" +
			"Actual: " + toStringImpl(object));
	}
	return className[1].trim();
}

/**
 * Object helper functions.
 *
 * @ignore
 */
class Objects
{
	/**
	 * @param {object} value a value
	 * @return {boolean} true if <code>value</code> is a primitive type
	 */
	static isPrimitive(value)
	{
		return isPrimitiveImpl(value);
	}

	/**
	 * @param {object} child the child class
	 * @param {object} parent the parent class
	 * @return {boolean} true if <code>child</code> extends <code>parent</code>; false if <code>parent</code> or
	 *   <code>child</code> are null or undefined; false if <code>child</code> does not extend
	 *   <code>parent</code>
	 */
	static extends(child, parent)
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
	 * If the input is undefined, returns "undefined".
	 * If the input is null, returns "null".
	 * If the input is a boolean, returns "boolean".
	 * If the input is a number, returns "number".
	 * If the input is a string, returns "string".
	 * If the input is an array, returns "Array".
	 * If the input is a named function or a class constructor, returns "Function".
	 * If the input is an anonymous function, returns "AnonymousFunction".
	 * If the input is an arrow function, returns "ArrowFunction".
	 * If the input is a class instance, returns the class name.
	 *
	 * @param {object} object an object
	 * @return {string} the name of the object's type
	 * @see <a href="http://stackoverflow.com/a/332429/14731">http://stackoverflow.com/a/332429/14731</a>
	 * @see isPrimitive
	 */
	static getTypeOf(object)
	{
		return getTypeOfImpl(object);
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
	static requireThatIsSet(value, name)
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
	 * @param {string} type the expected type of the object
	 * @return {boolean} true
	 * @throws {TypeError} if <code>value</code> is not of type <code>type</code>. If <code>name</code> is not
	 * a string
	 */
	static requireThatTypeOf(value, name, type)
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
	 * @param {object} type the class the value is expected to be an instance of
	 * @return {boolean} true
	 * @throws {TypeError} if <code>value</code> is not an instance of <code>type</code>. If <code>name</code>
	 * is not a string
	 */
	static requireThatInstanceOf(value, name, type)
	{
		const typeOfName = Objects.getTypeOf(name);
		if (typeOfName !== "string")
		{
			throw new TypeError("name must be a string.\n" +
				"Actual     : " + Objects.toString(name) + "\n" +
				"Actual.type: " + typeOfName);
		}
		if (!(value instanceof type))
		{
			throw new TypeError(name + " must be an instance of " + Objects.getTypeOf(type) + ".\n" +
				"Actual.type: " + Objects.getTypeOf(value));
		}
		return true;
	}

	/**
	 * Requires that a class extends the expected type.
	 *
	 * @param {object} value the value of a parameter
	 * @param {string} name the name of the parameter
	 * @param {object} type the class the value is expected to extend
	 * @return {boolean} true
	 * @throws {TypeError} if <code>value</code> does not extend <code>type</code>. If <code>name</code> is not
	 * a string
	 */
	static requireThatExtends(value, name, type)
	{
		const typeOfName = Objects.getTypeOf(name);
		if (typeOfName !== "string")
		{
			throw new TypeError("name must be a string.\n" +
				"Actual     : " + Objects.toString(name) + "\n" +
				"Actual.type: " + typeOfName);
		}
		if (!Objects.extends(value, type))
		{
			throw new TypeError(name + " must extend " + Objects.getTypeOf(type) + ".\n" +
				"Actual.type: " + Objects.getTypeOf(value));
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
	static assertThatTypeOf(value, name, type)
	{
		console.assert(this.requireThatTypeOf(value, name, type));
	}

	/**
	 * Requires that a string is not empty.
	 *
	 * @param {string} value the value of the parameter
	 * @param {string} name the name of the parameter
	 * @return {boolean} true
	 * @throws {TypeError} if <code>name</code> or <code>value</code> are empty. If <code>name</code> is not a
	 * string
	 */
	static requireThatStringNotEmpty(value, name)
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
	 * @param {string} value the value of the parameter
	 * @param {string} name the name of the parameter
	 * @throws {TypeError} if <code>name</code> or <code>value</code> are empty. If <code>name</code> is not a
	 * string
	 */
	static assertThatStringNotEmpty(value, name)
	{
		console.assert(this.requireThatStringNotEmpty(value, name));
	}

	/**
	 * @param {object} object an object
	 * @return {string} the String representation of the object
	 */
	static toString(object)
	{
		return toStringImpl(object);
	}

	/**
	 * @param {string} value a name
	 * @param {string} name the name of the name
	 * @throws {TypeError} if <code>name</code> or <code>value</code> are not a String
	 * @throws {RangeError} if <code>value</code> is empty
	 */
	static verifyName(value, name)
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
	 * @param {object} value the name of the parameter
	 * @param {string} name the name of the parameter
	 * @return {string|null} an error message or null if the value is set
	 */
	static validateThatValueIsSet(value, name)
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