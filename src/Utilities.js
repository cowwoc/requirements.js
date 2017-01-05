const Utilities = {};

/**
 * @param {Object} value a value
 * @param {Object} type a type (e.g. {@code String} not "string")
 * @return {Boolean} true if {@code value} is of type {@code type}; false if {@code value} or {@code type} are null,
 * undefined or unequal
 */
Utilities.instanceOf = function(value, type)
{
	if ((value === undefined || value === null || type === undefined || type === null) && value !== type)
		return false;
	// instanceof works for most objects, constructor works for literals
	// http://stackoverflow.com/a/1185835/14731
	return value instanceof type || value.constructor === type ||
		value.constructor instanceof type;
};

/**
 * @param {Object} child the child class
 * @param {Object} parent the parent class
 * @return {Boolean} true if {@code child} extends {@code parent}; false if {@code parent} or {@code child} are null or
 *   undefined; false if {@code child} does not extend {@code parent}
 */
Utilities.extends = function(child, parent)
{
	if (child === undefined || child === null || parent == undefined || parent === null)
		return false;
	return child.prototype instanceof parent;
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
		if (instanceToString.indexOf(" => ") != -1)
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
		if (instanceToString.indexOf(" => ") != -1)
			return "=>";
		const getFunctionName = /^function ([^(]+)\(/;
		const match = instanceToString.match(getFunctionName);
		if (match === null)
		{
			const objectToString = Object.prototype.toString.call(fn).slice(8, -1);
			if (objectToString === "Function")
				return "";
			throw TypeError("object must be a Function.\n" +
				"Actual: " + Utilities.getTypeName(fn));
		}
		return match[1];
	}
	catch (e)
	{
		throw TypeError("object must be a Function.\n" +
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
		throw TypeError("object must be an Object.\n" +
			"Actual: " + Utilities.getTypeName(object));
	}
	return result;
};

/**
 * @param object an object
 * @returns {String} the String representation of the object
 */
Utilities.toString = function(object)
{
	if (object === undefined)
		return "undefined";
	if (object === null)
		return "null";
	// Invoke toString() if it was overridden; otherwise, prefer JSON.stringify() to Object.toString().
	let current = object;
	switch (Utilities.getTypeName(current))
	{
		case "Array":
			return "[" + current.join(", ") + "]";
		case "Object":
			if (Utilities.getObjectClass(current) === "Object")
				return JSON.stringify(current);
	}
	while (true)
	{
		// See http://stackoverflow.com/a/22445303/14731
		if (current.constructor.prototype.hasOwnProperty("toString"))
			return current.constructor.prototype.toString.call(object);
		current = Object.getPrototypeOf(current.constructor.prototype);
		if (Utilities.getTypeName(current) === "Object" && Utilities.getObjectClass(current) === "Object")
			return JSON.stringify(current);
	}
};

/**
 * @param {Object} actual the actual value
 * @param {String} name the name of the value
 * @param {Object} type the expected type of the value
 * @throws {TypeError} if value is not of the expected type
 */
Utilities.verifyValue = function(value, name, type)
{
	if (value === undefined || value === null)
		return;
	if (!Utilities.instanceOf(value, type))
	{
		const nameOfType = Utilities.getTypeName(type);
		throw new TypeError(name + " must be an instance of " + nameOfType + ".\n" +
			"Actual: " + Utilities.getTypeName(actual));
	}
};

/**
 * @param {String} value a name
 * @param {String} name the name of the name
 * @throws {TypeError} if name is undefined or null or not a String
 * @throws {RangeError} if name is empty
 */
Utilities.verifyName = function(value, name)
{
	if (name === undefined || name === null)
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

export default Utilities;