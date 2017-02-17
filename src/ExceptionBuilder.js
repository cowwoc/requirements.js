import Utilities from "./Utilities";

/**
 * Constructs an exception.
 * @constructs Error
 * @name ExceptionConstructor
 * @param {String} message the exception message
 */

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
	return text + " ".repeat(needed);
}

/**
 * Checks if the configuration overrides the type of exception that should be thrown.
 *
 * @param {Configuration} configuration the verifier's configuration
 * @param {ExceptionConstructor} type the default type of exception to throw
 * @return {ExceptionConstructor} the type of exception to throw
 */
function getExceptionType(configuration, type)
{
	const result = configuration.getException();
	if (result !== null)
		return result;
	return type;
}

/**
 * Builds an exception.
 *
 * @class
 * @author Gili Tzabari
 */
class ExceptionBuilder {
	/**
	 * Builds an exception.
	 *
	 * @constructor
	 * @param {Configuration} configuration a verifier's configuration
	 * @param {ExceptionConstructor} type a function that takes an exception message and returns an exception instance
	 * @param {String} message the exception message
	 * @throws {TypeError} if any of the arguments are not set
	 */
	constructor(configuration, type, message)
	{
		if (typeof(configuration) === "undefined" || configuration === null)
		{
			throw new TypeError("configuration must be set.\n" +
				"Actual: " + Utilities.getTypeOf(configuration));
		}
		if (!type)
		{
			throw new TypeError("type must be set.\n" +
				"Actual: " + Utilities.getTypeOf(type));
		}
		if (!message)
		{
			throw new TypeError("message must be set.\n" +
				"Actual: " + Utilities.getTypeOf(message));
		}

		Object.defineProperty(this, "config",
			{
				value: configuration,
				writable: true
			});
		const exceptionType = getExceptionType(this.config, type);
		Object.defineProperty(this, "constructor",
			{
				value: exceptionType,
				writable: true
			});
		Object.defineProperty(this, "message",
			{
				value: message
			});
		Object.defineProperty(this, "contextPostfix",
			{
				value: this.config.context
			});
		Object.defineProperty(this, "context",
			{
				value: [],
				writable: true
			});
	}

	/**
	 * @param {ExceptionConstructor} type a function that takes an exception message and returns an exception
	 *   instance
	 * @return {ExceptionBuilder} this
	 * @throws {TypeError} if {@code type} is not set
	 */
	type(type)
	{
		if (!type)
		{
			throw new TypeError("type must be set.\n" +
				"Actual: " + Utilities.getTypeOf(type));
		}

		this.constructor = type;
		return this;
	}

	/**
	 * Adds contextual information to append to the exception message.
	 *
	 * @param {String} key   a key
	 * @param {Object} value a value
	 * @return {ExceptionBuilder} this
	 * @throws {TypeError} if {@code key} is not a String
	 */
	addContext(key, value)
	{
		if (typeof(key) !== "string")
		{
			throw new TypeError("key must be a String.\n" +
				"Actual: " + Utilities.getTypeOf(key));
		}
		const entry = {};
		entry[key] = value;
		this.context.push(entry);
		return this;
	}

	/**
	 * Adds contextual information to append to the exception message.
	 *
	 * @param {Array.<Array>} context a list of key-value pairs to add
	 * @return {ExceptionBuilder} this
	 * @throws {TypeError} if {@code context} is not set
	 */
	addContextArray(context)
	{
		Utilities.verifyContext(context);
		this.context.push([...context]);
		return this;
	}

	/**
	 * @return {Error} a new exception
	 */
	build()
	{
		const contextToAdd = [this.message];

		let mergedContext;
		if (this.contextPostfix.length === 0)
			mergedContext = this.context;
		else
			mergedContext = [...this.context, ...this.contextPostfix];

		let maxKeyLength = 0;
		for (let i = 0; i < mergedContext.length; ++i)
		{
			const keyLength = Object.keys(mergedContext[i])[0].length;
			if (keyLength > maxKeyLength)
				maxKeyLength = keyLength;
		}
		for (const entry of mergedContext)
		{
			// We can't use Object.values() until it is well-supported: http://stackoverflow.com/a/40421941/14731
			const key = Object.keys(entry)[0];
			const value = entry[Object.keys(entry)[0]];
			contextToAdd.push(justifyLeft(key, maxKeyLength) + ": " + Utilities.toString(value));
		}
		const messageWithContext = contextToAdd.join("\n");

		return new this.constructor(messageWithContext.toString());
	}
}

export default ExceptionBuilder;