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
 * Returns the failure message with contextual information.
 *
 * @param {ValidationFailure} validationFailure the validation failure
 * @return {string} the failure message with contextual information
 */
function createMessageWithContext(validationFailure)
{
	const mergedContext = mergeContext(validationFailure);

	let maxKeyLength = 0;
	for (const entry of mergedContext)
	{
		if (entry === null)
			continue;
		const keyLength = entry[0].length;
		if (keyLength > maxKeyLength)
			maxKeyLength = keyLength;
	}

	const contextToAdd = [validationFailure.message];
	for (const entry of mergedContext)
	{
		if (entry === null)
		{
			contextToAdd.push("");
			continue;
		}

		const key = entry[0];
		const value = entry[1];
		contextToAdd.push(justifyLeft(key, maxKeyLength) + ": " +
			validationFailure.config.convertToString(value));
	}
	return contextToAdd.join("\n");
}

/**
 * Merges the failure context from the <code>ValidationFailure</code> and <code>Configuration</code> object,
 * where the former may override values set by the latter.
 *
 * @param {ValidationFailure} validationFailure the validation failure
 * @return {Array<Array<string>>} the merged failure context
 */
function mergeContext(validationFailure)
{
	const mergedContext = [];
	const existingKeys = new Set();
	for (const entry of validationFailure.context)
	{
		if (entry === null)
		{
			// empty lines between expected/actual pairs
			mergedContext.push(null);
			continue;
		}
		verifyEntry(entry);
		const key = entry[0];
		Objects.assertThatStringNotEmpty(key, "key");
		const copyOfLine = [];
		copyOfLine[0] = key;
		copyOfLine[1] = entry[1];
		mergedContext.push(copyOfLine);
		existingKeys.add(key);
	}

	for (const entry of validationFailure.config.context)
	{
		if (!existingKeys.has(entry[0]))
		{
			existingKeys.add(entry[0]);
			mergedContext.push(entry);
		}
	}
	return mergedContext;
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
	 * @param {Error.prototype.constructor} exceptionType the type of exception associated with the failure
	 * @param {string} message the message associated with the failure
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
			this.messageWithContext = createMessageWithContext(this);
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
	 * @throws NullPointerException if {@code context} is not an Array
	 * @see ConsumerToContext
	 */
	addContextList(context)
	{
		Objects.requireThatTypeOf(context, "context", "Array");
		this.context.push(...context);
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

	/**
	 * Returns the String representation of the failure.
	 *
	 * @return {string} the String representation of the failure
	 */
	toString()
	{
		return this.getMessage();
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ValidationFailure as default};