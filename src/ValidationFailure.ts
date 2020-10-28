import {
	Configuration,
	ContextLine,
	Objects
} from "./internal/internal";

class ValidationFailure
{
	private readonly config: Configuration;
	private readonly exceptionType: new (message: string) => Error;
	private readonly message: string;
	private messageWithContext: string | null = null;
	private readonly context: ContextLine[] = [];

	/**
	 * Creates a new validation failure.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {Function} exceptionType the type of exception associated with the failure
	 * @param {string} message the message associated with the failure
	 * @throws {TypeError} if <code>exceptionType</code> is not a <code>Function</code> or <code>message</code>
	 *   is not a <code>string</code>
	 * @throws {RangeError} if <code>message</code> is empty
	 */
	constructor(configuration: Configuration, exceptionType: new (message: string) => Error, message: string)
	{
		Objects.assertThatTypeOf(configuration, "configuration", "Configuration");
		Objects.requireThatInstanceOf(exceptionType, "exceptionType", Function);
		Objects.requireThatStringNotEmpty(message, "message");

		this.config = configuration;
		this.exceptionType = exceptionType;
		this.message = message;
	}

	/**
	 * Returns the message associated with the failure.
	 *
	 * @return {string} the message associated with the failure
	 */
	getMessage(): string
	{
		if (this.messageWithContext === null)
			this.messageWithContext = this.createMessageWithContext();
		return this.messageWithContext;
	}

	/**
	 * Pads a string with space on the right to reach the desired length.
	 *
	 * @param {string} text a string
	 * @param {number} length the maximum length of the string
	 * @return {string} the result
	 * @private
	 */
	private static justifyLeft(text: string, length: number): string
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
	 * @return {string} the failure message with contextual information
	 * @private
	 */
	private createMessageWithContext(): string
	{
		const mergedContext = this.mergeContext();

		let maxKeyLength = 0;
		for (const entry of mergedContext)
		{
			if (entry.key === "")
				continue;
			const keyLength = entry.key.length;
			if (keyLength > maxKeyLength)
				maxKeyLength = keyLength;
		}

		const contextToAdd = [this.message];
		for (const entry of mergedContext)
		{
			const key = entry.key;
			const value = entry.value;
			if (key === "")
				contextToAdd.push(this.config.convertToString(value));
			else
			{
				contextToAdd.push(ValidationFailure.justifyLeft(key, maxKeyLength) + ": " +
					this.config.convertToString(value));
			}
		}
		return contextToAdd.join("\n");
	}

	/**
	 * Merges the failure context from the <code>ValidationFailure</code> and <code>Configuration</code> object,
	 * where the former may override values set by the latter.
	 *
	 * @return {string} the merged failure context
	 * @private
	 */
	private mergeContext()
	{
		const mergedContext: ContextLine[] = [];
		const existingKeys = new Set();
		for (const entry of this.context)
		{
			Objects.requireThatTypeOf(entry, "entry", "ContextLine");
			mergedContext.push(entry);
			if (entry.key !== "")
				existingKeys.add(entry.key);
		}

		for (const entry of this.config.getContext())
		{
			const key = entry[0];
			if (!existingKeys.has(key))
			{
				existingKeys.add(key);
				const value = entry[1];
				mergedContext.push(new ContextLine(key, value));
			}
		}
		return mergedContext;
	}

	/**
	 * Adds contextual information associated with the failure.
	 *
	 * @param {string} name  the name of a variable
	 * @param {object} value the value of the variable
	 * @return {ValidationFailure} this
	 * @throws {TypeError} if <code>name</code> is null
	 */
	addContext(name: string, value: unknown): ValidationFailure
	{
		Objects.requireThatStringNotEmpty(name, "name");
		this.context.push(new ContextLine(name, value));
		this.messageWithContext = null;
		return this;
	}

	/**
	 * Adds contextual information to append to the exception message.
	 *
	 * @param {ContextLine[]} context the list of name-value pairs to append to the exception message
	 * @return {ValidationFailure} this
	 * @throws {TypeError} if <code>context</code> is not an Array
	 * @see ConsumerToContext
	 */
	addContextList(context: ContextLine[]): this
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
	createException(): never
	{
		// eslint-disable-next-line new-cap
		throw new this.exceptionType(this.getMessage());
	}

	/**
	 * Returns the String representation of the failure.
	 *
	 * @return {string} the String representation of the failure
	 */
	toString(): string
	{
		return "exception: " + this.exceptionType + "\n" +
			"message: " + this.message + "\n" +
			"context: " + this.config.convertToString(this.context);
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ValidationFailure as default};