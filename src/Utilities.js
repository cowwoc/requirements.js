const Utilities = {};

/**
 * @param {Object} value a value
 * @param {Object} type a type (e.g. {@code String} not "string")
 * @return {Boolean} true if {@code value} is of type {@code type}; false if {@code value} or {@code type} are null,
 * undefined or unequal
 * @throws {TypeError} if {@code type} is not a constructor
 */
Utilities.instanceOf = function(value, type)
{
	if ((typeof(value) === "undefined" || value === null || typeof(type) === "undefined" || type === null) &&
		value !== type)
	{
		return false;
	}
	// instanceof only works for non-primitives: http://stackoverflow.com/a/203757/14731
	// So we wrap them...

	/* eslint-disable no-new-wrappers */
	let wrappedValue;
	switch (Utilities.getTypeName(value))
	{
		case "String":
		{
			if (value instanceof String)
				wrappedValue = value;
			else
				wrappedValue = new String(value);
			break;
		}
		case "Number":
		{
			if (value instanceof Number)
				wrappedValue = value;
			else
				wrappedValue = new Number(value);
			break;
		}
		case "Boolean":
		{
			if (value instanceof Boolean)
				wrappedValue = value;
			else
				wrappedValue = new Boolean(value);
			break;
		}
		default:
			wrappedValue = value;
	}
	/* eslint-enable no-new-wrappers */
	return wrappedValue instanceof type;
};

/**
 * @param {Object} child the child class
 * @param {Object} parent the parent class
 * @return {Boolean} true if {@code child} extends {@code parent}; false if {@code parent} or {@code child} are null or
 *   undefined; false if {@code child} does not extend {@code parent}
 */
Utilities.extends = function(child, parent)
{
	if (typeof(child) === "undefined" || child === null || typeof(parent) === "undefined" || parent === null)
		return false;
	return child.prototype instanceof parent;
};

/**
 * Returns the name of a type.
 *
 * If the input is undefined, returns "undefined".
 * If the input is null, returns "null".
 * If the input is a primitive, returns the name of the wrapper class (e.g. "String" for primitive strings).
 * If the input is a class, returns the class name.
 *
 * @param {Object} object an object
 * @return {String} the name of the object's class
 * @throws {TypeError} if {@code object} is a function or a class instance
 */
Utilities.getClassName = function(object)
{
	const typeName = Utilities.getTypeName(object);
	switch (typeName)
	{
		case "Undefined":
			return "undefined";
		case "Null":
			return "null";
		case "Function":
			return Utilities.getFunctionName(object);
		case "AnonymousFunction":
		case "ArrowFunction":
		case "Object":
			throw new TypeError("Expecting a class type.\n" +
				"Actual: " + typeName);
		default:
			return typeName;
	}
};

/**
 * Returns the name of an object's type.
 *
 * If the input is undefined, returns "Undefined".
 * If the input is null, returns "Null".
 * If the input is a boolean, returns "Boolean".
 * If the input is a number, returns "Number".
 * If the input is a string, returns "String".
 * If the input is a named function or a class constructor, returns "Function".
 * If the input is an anonymous function, returns "AnonymousFunction".
 * If the input is an arrow function, returns "ArrowFunction".
 * If the input is a class instance, returns "Object".
 *
 * @param {Object} object an object
 * @return {String} the name of the object's class
 * @see <a href="http://stackoverflow.com/a/332429/14731">http://stackoverflow.com/a/332429/14731</a>
 * @see Utilities.getFunctionName
 * @see Utilities.getObjectClass
 */
Utilities.getTypeName = function(object)
{
	const objectToString = Object.prototype.toString.call(object).slice(8, -1);
	if (objectToString === "Function")
	{
		const instanceToString = object.toString();
		if (instanceToString.indexOf(" => ") !== -1)
			return "ArrowFunction";
		const getFunctionName = /^function ([^(]+)\(/;
		const match = instanceToString.match(getFunctionName);
		if (match === null)
			return "AnonymousFunction";
		return "Function";
	}
	// Built-in types (e.g. String) or class instances
	return objectToString;
};

/**
 * Returns the name of a function or class.
 *
 * If the input is an anonymous function, returns "".
 * If the input is an arrow function, returns "=>".
 *
 * @param {Function} fn a function
 * @return {String} the name of the function
 * @throws {TypeError} if {@code fn} is not a function
 * @see Utilities.getTypeName
 */
Utilities.getFunctionName = function(fn)
{
	try
	{
		const instanceToString = fn.toString();
		if (instanceToString.indexOf(" => ") !== -1)
			return "=>";
		const getFunctionName = /^function ([^(]+)\(/;
		const match = instanceToString.match(getFunctionName);
		if (match === null)
		{
			const objectToString = Object.prototype.toString.call(fn).slice(8, -1);
			if (objectToString === "Function")
				return "";
			throw new TypeError("object must be a Function.\n" +
				"Actual: " + Utilities.getTypeName(fn));
		}
		return match[1];
	}
	catch (e)
	{
		throw new TypeError("object must be a Function.\n" +
			"Actual: " + Utilities.getTypeName(fn));
	}
};

/**
 * @param {Object} object an object
 * @return {String} the name of the object's class
 * @throws {TypeError} if {@code object} is not an Object
 * @see Utilities.getTypeName
 */
Utilities.getObjectClass = function(object)
{
	const getFunctionName = /^function ([^(]+)\(/;
	const result = object.constructor.toString().match(getFunctionName)[1];
	if (result === "Function")
	{
		throw new TypeError("object must be an Object.\n" +
			"Actual: " + Utilities.getTypeName(object));
	}
	return result;
};

/**
 * @param {Object} object an object
 * @return {String} the String representation of the object
 */
Utilities.toString = function(object)
{
	if (typeof(object) === "undefined")
		return "undefined";
	if (object === null)
		return "null";
	// Invoke toString() if it was overridden; otherwise, prefer JSON.stringify() to Object.toString().
	let current = object;
	switch (Utilities.getTypeName(current))
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
				result += Utilities.toString(current[i]);
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
			if (Utilities.getObjectClass(current) === "Object")
				return JSON.stringify(current, null, 2);
	}
	while (true)
	{
		// See http://stackoverflow.com/a/22445303/14731
		if (current.constructor.prototype.hasOwnProperty("toString"))
			return current.constructor.prototype.toString.call(object);
		current = Object.getPrototypeOf(current.constructor.prototype);
		if (Utilities.getTypeName(current) === "Object" && Utilities.getObjectClass(current) === "Object")
			return JSON.stringify(current, null, 2);
	}
};

/**
 * @param {Object} value the actual value
 * @param {String} name the name of the value
 * @param {Object} type the expected type of the value
 * @return {undefined}
 * @throws {TypeError} if value is not of the expected type
 */
Utilities.verifyValue = function(value, name, type)
{
	if (typeof(value) === "undefined" || value === null)
		return;
	if (!Utilities.instanceOf(value, type))
	{
		throw new TypeError(name + " must be an instance of " + Utilities.getClassName(type) + ".\n" +
			"Actual: " + value);
	}
};

/**
 * @param {String} value a name
 * @param {String} name the name of the name
 * @return {undefined}
 * @throws {TypeError} if name is undefined or null or not a String
 * @throws {RangeError} if name is empty
 */
Utilities.verifyName = function(value, name)
{
	if (typeof(name) === "undefined" || name === null)
	{
		throw new TypeError(name + " must be set.\n" +
			"Actual: " + value);
	}
	const type = Utilities.getTypeName(value);
	if (type !== "String")
	{
		throw new TypeError(name + " must be an instance of String.\n" +
			"Actual: " + type);
	}
	const trimmed = value.trim();
	if (trimmed.length === 0)
		throw new RangeError(name + " may not be empty");
};

/**
 * @param {Array.<Array>} context a list of key-value pairs to append to the exception message
 * @throws {TypeError} if {@code context} or one of its elements are not an array; if the nested array contains less
 * or more than 2 elements; if the elements nested in the array are not strings
 * @throws {RangeError} if the elements nested in the array are undefined, null, or are empty
 * @return {undefined}
 */
Utilities.verifyContext = function(context)
{
	if (!context)
	{
		throw new TypeError("context must be set.\n" +
			"Actual: " + Utilities.getTypeName(context));
	}
	if (!Array.isArray(context))
	{
		throw new TypeError("context must be an array.\n" +
			"Actual: " + Utilities.getTypeName(context));
	}
	let i = 0;
	for (const entry of context)
	{
		if (!Array.isArray(entry))
		{
			throw new TypeError("context must be an array at index " + i + ".\n" +
				"Actual: " + Utilities.getTypeName(context));
		}
		if (entry.length !== 2)
		{
			throw new TypeError("context must contain 2 elements (key-value pair) at index " + i + ".\n" +
				"Actual: " + Utilities.getTypeName(context));
		}
		verifyContextElement(entry[0], "context.key", i);
		verifyContextElement(entry[1], "context.value", i);
		++i;
	}
};

/**
 * @param {Object} element an element in the array
 * @param {String} name the name of the element
 * @param {Number} index the index of the element in the array
 * @return {undefined}
 * @throws {TypeError} if the element is not an array; if the element is not a string
 * @throws {RangeError} if the element is undefined, null, or empty
 */
function verifyContextElement(element, name, index)
{
	if (typeof(element) !== "string")
	{
		throw new TypeError(name + " must be a String at index " + index + ".\n" +
			"Actual: " + Utilities.getTypeName(element));
	}
	if (typeof(element) === "undefined" || element === null)
	{
		throw new RangeError(name + " must be set at index " + index + ".\n" +
			"Actual: " + Utilities.getTypeName(element));
	}
	if (element.length === 0)
	{
		throw new RangeError(name + " may not be empty at index " + index + ".\n" +
			"Actual: " + Utilities.getTypeName(element));
	}
}

export default Utilities;