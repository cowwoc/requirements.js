import Configuration from "../Configuration.js";
import Objects from "./Objects.js";

/**
 * Pads a string with space on the right to reach the desired length.
 *
 * @param {string} text a string
 * @param {number} length the maximum length of the string
 * @return {string} the result
 * @ignore
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
 * @param {Error} type the default type of exception to throw
 * @return {Error} the type of exception to throw
 * @ignore
 */
function getExceptionType(configuration, type)
{
	const result = configuration.getException();
	if (result !== null)
		return result;
	return type;
}

/**
 * @param {Array<string>} entry a key-value pair
 * @throws {TypeError} if <code>entry</code> was not an array of size 2
 * @ignore
 */
function verifyEntry(entry)
{
	Objects.requireThatTypeOf(entry, "entry", "Array");
	if (entry.length !== 2)
	{
		throw new TypeError("entry must contain 2 entries.\n" +
			"Actual: " + entry + "\n" +
			"Length: " + entry.length);
	}
}

/**
 * Builds an exception.
 * @ignore
 */
class ExceptionBuilder
{
	/**
	 * Builds an exception.
	 *
	 * @param {Configuration} configuration a verifier's configuration
	 * @param {Error} type a function that takes an exception message and returns an exception instance
	 * @param {string} message the exception message
	 * @throws {TypeError} if any of the arguments are not set
	 */
	constructor(configuration, type, message)
	{
		Objects.assertThatTypeOf(configuration, "configuration", "Configuration");
		if (!Objects.extends(type, Error))
		{
			throw new TypeError("type must extend Error.\n" +
				"Actual: " + type + "\n" +
				"Type  : " + Objects.getTypeOf(type));
		}
		Objects.assertThatStringNotEmpty(message, "message");

		Object.defineProperty(this, "config",
			{
				value: configuration,
				writable: true
			});
		const typeOfException = getExceptionType(this.config, type);
		Object.defineProperty(this, "constructor",
			{
				value: typeOfException,
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
	 * @param {Error} type a function that takes an exception message and returns an <code>Error</code> instance
	 * @return {ExceptionBuilder} this
	 * @throws {TypeError} if <code>type</code> is not set
	 */
	type(type)
	{
		if (!Objects.extends(type, Error))
		{
			throw new TypeError("type must extend Error.\n" +
				"Actual: " + type + "\n" +
				"Type  : " + Objects.getTypeOf(type));
		}

		this.constructor = type;
		return this;
	}

	/**
	 * Adds contextual information to append to the exception message.
	 *
	 * @param {string} key   a key
	 * @param {object} value a value
	 * @return {ExceptionBuilder} this
	 * @throws {TypeError} if <code>key</code> is not a string
	 */
	addContext(key, value)
	{
		Objects.assertThatStringNotEmpty(key, "key");
		const entry = {};
		entry[key] = value;
		this.context.push(entry);
		return this;
	}

	/**
	 * Adds contextual information to append to the exception message.
	 *
	 * @param {Array<Array<string>>} context the list of name-value pairs to append to the exception message
	 * @return {ExceptionBuilder} this
	 * @throws {TypeError} if <code>context</code> is not a <code>string[][]</code>
	 */
	addContextList(context)
	{
		Objects.assertThatTypeOf(context, "context", "Array");
		for (const entry of context)
		{
			if (entry === null)
			{
				// empty lines between expected/actual pairs
				this.context.push(null);
				continue;
			}
			verifyEntry(entry);
			const key = entry[0];
			Objects.assertThatStringNotEmpty(key, "key");
			const copyOfEntry = {};
			copyOfEntry[key] = entry[1];
			this.context.push(copyOfEntry);
		}
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
			if (mergedContext[i] === null)
				continue;
			const keyLength = Object.keys(mergedContext[i])[0].length;
			if (keyLength > maxKeyLength)
				maxKeyLength = keyLength;
		}
		for (const entry of mergedContext)
		{
			if (entry === null)
			{
				contextToAdd.push("");
				continue;
			}
			// We can't use Object.values() until it is well-supported: http://stackoverflow.com/a/40421941/14731
			const key = Object.keys(entry)[0];
			const value = entry[Object.keys(entry)[0]];
			contextToAdd.push(justifyLeft(key, maxKeyLength) + ": " + this.config.convertToString(value));
		}
		const messageWithContext = contextToAdd.join("\n");

		return new this.constructor(messageWithContext.toString());
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {ExceptionBuilder as default};