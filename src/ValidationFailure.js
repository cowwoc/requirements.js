import Objects from "./internal/Objects.js";
import Configuration from "./Configuration.js";

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

class ValidationFailure
{
	/**
	 * Creates a new validation failure.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {Error} exceptionType the type of exception associated with the failure
	 * @param {string} message the exception message associated with the failure
	 * @throws {TypeError} if <code>exceptionType</code> or <code>message</code> are null
	 * @throws {RangeError} if <code>message</code> is empty
	 */
	constructor(configuration, exceptionType, message)
	{
		Objects.assertThatTypeOf(configuration, "configuration", "Configuration");
		Objects.requireThatExtends(exceptionType, "exceptionType", Error);
		Objects.requireThatStringNotEmpty(message, "message");

		Object.defineProperty(this, "config",
			{
				value: configuration
			});
		Object.defineProperty(this, "exceptionType",
			{
				value: exceptionType
			});
		Object.defineProperty(this, "message",
			{
				value: message
			});
		Object.defineProperty(this, "messageWithContext",
			{
				value: null,
				writable: true
			});
		Object.defineProperty(this, "context",
			{
				value: []
			});
	}

	/**
	 * Returns the message associated with the failure.
	 *
	 * @return {string} the message associated with the failure
	 */
	getMessage()
	{
		if (this.messageWithContext === null)
		{
			const contextToAdd = [this.message];

			let mergedContext;
			if (this.config.context.length === 0)
				mergedContext = this.context;
			else
				mergedContext = [...this.context, ...this.config.context];

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
			this.messageWithContext = contextToAdd.join("\n");
		}
		return this.messageWithContext;
	}

	/**
	 * Adds contextual information associated with the failure.
	 *
	 * @param {string} name  the name of a variable
	 * @param {object} value the value of the variable
	 * @return {ValidationFailure} this
	 * @throws {TypeError} if <code>name</code> is null
	 */
	addContext(name, value)
	{
		Objects.requireThatStringNotEmpty(name, "name");
		this.context.push([name, value]);
		this.messageWithContext = null;
		return this;
	}

	/**
	 * Adds contextual information to append to the exception message.
	 *
	 * @param {Array<Array<string>>} context the list of name-value pairs to append to the exception message
	 * @return {ValidationFailure} this
	 * @throws NullPointerException if {@code context} is null
	 */
	addContextList(context)
	{
		Objects.requireThatTypeOf(context, "context", "Array");
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
		this.messageWithContext = null;
		return this;
	}

	/**
	 * Creates an exception containing the failure message.
	 *
	 * @throws {Error} the exception corresponding to the validation failure
	 */
	createException()
	{
		throw this.exceptionType(this.getMessage());
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ValidationFailure as default};