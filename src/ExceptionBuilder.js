import Utilities from "./Utilities";

/**
 * Constructs an exception.
 * @function
 * @name ExceptionConstructor
 * @param {String} message the exception message
 * @return {Error} the exception instance
 */

/**
 * Builds an exception.
 *
 * @param {ExceptionConstructor} constructor           a function that takes an exception message and returns an
 *   exception instance
 * @param {String} message        the exception message
 * @param {List<Object>} contextPostfix the key-value pairs to append to the context set by the user
 *
 * @property {ExceptionConstructor} constructor           a function that takes an exception message and returns
 *   an exception instance
 * @property {String} message        the exception message
 * @property {List<Object>} contextPostfix the key-value pairs to append to the context set by the user
 * @throws {TypeError} if any of the arguments are not set
 * @author Gili Tzabari
 */
function ExceptionBuilder(constructor, message, contextPostfix)
{
	if (!constructor)
	{
		throw new TypeError("constructor must be set.\n" +
			"Actual: " + Utilities.getClassName(constructor));
	}
	if (!message)
	{
		throw new TypeError("message must be set.\n" +
			"Actual: " + Utilities.getClassName(message));
	}
	if (!contextPostfix)
	{
		throw new TypeError("contextPostfix must be set.\n" +
			"Actual: " + Utilities.getClassName(contextPostfix));
	}

	Object.defineProperty(this, "constructor",
		{
			value: constructor
		});
	Object.defineProperty(this, "message",
		{
			value: message
		});
	Object.defineProperty(this, "contextPostfix",
		{
			value: contextPostfix
		});
	Object.defineProperty(this, "context",
		{
			value: [],
			writable: true
		});
}
ExceptionBuilder.prototype = Object.create(ExceptionBuilder.prototype);
ExceptionBuilder.prototype.constructor = ExceptionBuilder;

/**
 * @param {ExceptionConstructor} constructor a function that takes an exception message and returns an exception
 *   instance
 * @return {ExceptionBuilder} this
 * @throws {TypeError} if {@code constructor} is not set
 */
ExceptionBuilder.prototype.constructor = function(constructor)
{
	if (!constructor)
	{
		throw new TypeError("constructor must be set." +
			"Actual: " + Utilities.getClassName(constructor));
	}

	this.constructor = constructor;
	return this;
};

/**
 * Adds contextual information to append to the exception message.
 *
 * @param {String} key   a key
 * @param {Object} value a value
 * @return {ExceptionBuilder} this
 * @throws {TypeError} if {@code key} is not a String
 * @throws {RangeError} if {@code key} is not set
 */
ExceptionBuilder.prototype.addContext = function(key, value)
{
	if (typeof(key) !== "string")
	{
		throw new TypeError("key must be a String.\n" +
			"Actual: " + Utilities.getClassName(key));
	}
	if (!key)
	{
		throw new RangeError("key must be set.\n" +
			"Actual: " + Utilities.getClassName(key));
	}
	const entry = {};
	entry[key] = value;
	this.context.push(entry);
	return this;
};

/**
 * Adds contextual information to append to the exception message.
 *
 * @param {Object} context the key-value pairs to add
 * @return {ExceptionBuilder} this
 * @throws {TypeError} if {@code context} is not set
 */
ExceptionBuilder.prototype.addContextArray = function(context)
{
	if (!context)
	{
		throw new TypeError("context must be set.\n" +
			"Actual: " + Utilities.getClassName(context));
	}
	if (!Array.isArray(context))
	{
		throw new TypeError("context must be an Array.\n" +
			"Actual: " + Utilities.getClassName(context));
	}
	this.context.push(context);
	return this;
};

/**
 * @return {Error} a new exception
 */
ExceptionBuilder.prototype.build = function()
{
	let contextToAdd = [this.message];

	let mergedContext;
	if (this.contextPostfix === 0)
		mergedContext = this.context;
	else
		mergedContext = [...this.context, ...this.contextPostfix];

	let maxKeyLength = 0;
	for (let i = 0; i < mergedContext.length; ++i)
	{
		let keyLength = Object.keys(mergedContext[i])[0].length;
		if (keyLength > maxKeyLength)
			maxKeyLength = keyLength;
	}
	for (let entry of mergedContext)
	{
		// We can't use Object.values() until it is well-supported: http://stackoverflow.com/a/40421941/14731
		let value = entry[Object.keys(entry)[0]];
		contextToAdd.push(justifyLeft(Object.keys(entry)[0], maxKeyLength) + ": " + Utilities.toString(value));
	}
	let messageWithContext = contextToAdd.join("\n");

	return this.constructor(messageWithContext.toString());
};

/**
 * Pads a string with space on the right to reach the desired length.
 *
 * @param {String} text a string
 * @param {Number} length the maximum length of the string
 * @return {String} the result
 */
function justifyLeft(text, length)
{
	// See http://stackoverflow.com/a/36247412/14731
	const needed = length - text.length;
	if (needed === 0)
		return text;
	return " ".repeat(needed) + text;
}

export default ExceptionBuilder;