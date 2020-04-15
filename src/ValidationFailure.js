import Objects from "./internal/Objects.js";
import Configuration from "./Configuration.js";
import ContextLine from "./internal/diff/ContextLine";

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
		if (entry.key === "")
			continue;
		const keyLength = entry.key.length;
		if (keyLength > maxKeyLength)
			maxKeyLength = keyLength;
	}

	const contextToAdd = [validationFailure.message];
	for (const entry of mergedContext)
	{
		const key = entry.key;
		const value = entry.value;
		if (key === "")
			contextToAdd.push(validationFailure.config.convertToString(value));
		else
		{
			contextToAdd.push(justifyLeft(key, maxKeyLength) + ": " +
				validationFailure.config.convertToString(value));
		}
	}
	return contextToAdd.join("\n");
}

/**
 * Merges the failure context from the <code>ValidationFailure</code> and <code>Configuration</code> object,
 * where the former may override values set by the latter.
 *
 * @param {ValidationFailure} validationFailure the validation failure
 * @return {Array<ContextLine>} the merged failure context
 */
function mergeContext(validationFailure)
{
	const mergedContext = [];
	const existingKeys = new Set();
	for (const entry of validationFailure.context)
	{
		Objects.requireThatTypeOf(entry, "entry", "ContextLine");
		mergedContext.push(entry);
		if (entry.key !== "")
			existingKeys.add(entry.key);
	}

	for (const entry of validationFailure.config.context)
	{
		if (!existingKeys.has(entry.key))
		{
			existingKeys.add(entry.key);
			mergedContext.push(entry);
		}
	}
	return mergedContext;
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
		this.context.push(new ContextLine(name, value));
		this.messageWithContext = null;
		return this;
	}

	/**
	 * Adds contextual information to append to the exception message.
	 *
	 * @param {Array<ContextLine>} context the list of name-value pairs to append to the exception message
	 * @return {ValidationFailure} this
	 * @throws NullPointerException if <code>context</code> is not an Array
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