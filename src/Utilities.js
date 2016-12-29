const Utilities = {};

/**
 * @param {Object} value a value
 * @param {Object} type a type (e.g. String not "string")
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
 * Returns an object's class name.
 *
 * @param {Object} object an object
 * @return {String} the name of the object's class
 * @see <a href="http://stackoverflow.com/a/332429/14731">http://stackoverflow.com/a/332429/14731</a>
 */
Utilities.getClassName = function(object)
{
	// We cannot modify Object.prototype directly because libraries like JQuery blow up:
	// http://stackoverflow.com/q/14941657/14731
	// See also http://sugarjs.com/native#enumerable_properties.
	if (object === undefined)
		return "undefined";
	if (object === null)
		return "null";

	let results = object.constructor.toString().match(/^function ([^(]+)\(/);
	if (results && results.length > 1)
	{
		if (object === Array)
			return "Array";
		let constructor = results[1];
		if (constructor === "Function")
		{
			// Built-in types (e.g. String)
			return object.toString().match(/^function ([^(]+)\(/)[1];
		}
		// User-defined types
		return constructor;
	}

	// Instances of built-in types (e.g. "abc")
	return Object.prototype.toString.call(object).match(/^\[object (.*)\]$/)[1];
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
	while (true)
	{
		if (Utilities.getClassName(current) === "Object")
			return JSON.stringify(current);
		// See http://stackoverflow.com/a/22445303/14731
		if (current.constructor.prototype.hasOwnProperty("toString"))
			return current.constructor.prototype.toString.call(object);
		current = Object.getPrototypeOf(current.constructor.prototype);
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
		const nameOfType = Utilities.getClassName(type);
		throw new TypeError(name + " must be an instance of " + nameOfType + ".\n" +
			"Actual: " + Utilities.getClassName(actual));
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
	const type = Utilities.getClassName(value);
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