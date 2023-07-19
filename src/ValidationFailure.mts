import type {Configuration} from "./internal/internal.mjs";
import {
	ContextLine,
	Objects
} from "./internal/internal.mjs";

/**
 * A failed validation.
 */
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
	 * @param configuration - the instance configuration
	 * @param exceptionType - the type of exception associated with the failure
	 * @param message - the message associated with the failure
	 * @throws TypeError if <code>exceptionType</code> is not a <code>Function</code> or <code>message</code>
	 *   is not a <code>string</code>
	 * @throws RangeError if <code>message</code> is empty
	 */
	constructor(configuration: Configuration, exceptionType: new (message: string) => Error, message: string)
	{
		Objects.assertThatObjectOf(configuration, "configuration", "Configuration");
		Objects.requireThatInstanceOf(exceptionType, "exceptionType", Function);
		Objects.requireThatStringIsNotEmpty(message, "message");

		this.config = configuration;
		this.exceptionType = exceptionType;
		this.message = message;
	}

	/**
	 * Returns the message associated with the failure.
	 *
	 * @returns the message associated with the failure
	 */
	getMessage()
	{
		if (this.messageWithContext === null)
			this.messageWithContext = this.createMessageWithContext();
		return this.messageWithContext;
	}

	/**
	 * Pads a string with space on the right to reach the desired length.
	 *
	 * @param text - a string
	 * @param length - the maximum length of the string
	 * @returns the result
	 */
	private static justifyLeft(text: string, length: number)
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
	 * @returns the failure message with contextual information
	 */
	private createMessageWithContext()
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
	 * @returns the merged failure context
	 */
	private mergeContext()
	{
		const mergedContext: ContextLine[] = [];
		const existingKeys = new Set();
		for (const entry of this.context)
		{
			Objects.requireThatObjectOf(entry, "entry", ContextLine.name);
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
				mergedContext.push(new ContextLine(this.config, key, value));
			}
		}
		return mergedContext;
	}

	/**
	 * Adds contextual information associated with the failure.
	 *
	 * @param name - the name of a variable
	 * @param value - the value of the variable
	 * @returns this
	 * @throws TypeError if <code>name</code> is null
	 */
	addContext(name: string, value: unknown)
	{
		Objects.requireThatStringIsNotEmpty(name, "name");
		this.context.push(new ContextLine(this.config, name, value));
		this.messageWithContext = null;
		return this;
	}

	/**
	 * Adds contextual information to append to the exception message.
	 *
	 * @param context - the list of name-value pairs to append to the exception message
	 * @returns this
	 * @throws TypeError if <code>context</code> is not an Array
	 * @see ConsumerToContext
	 */
	addContextList(context: ContextLine[])
	{
		Objects.requireThatTypeOf(context, "context", "array");
		this.context.push(...context);
		this.messageWithContext = null;
		return this;
	}

	/**
	 * Creates an exception containing the failure message.
	 *
	 * @typeParam E - the type of the exception
	 * @returns the exception corresponding to the validation failure
	 */
	createException<E>()
	{
		// eslint-disable-next-line new-cap
		return new this.exceptionType(this.getMessage()) as E;
	}

	/**
	 * Returns the String representation of the failure.
	 *
	 * @returns the String representation of the failure
	 */
	toString()
	{
		return "exception: " + this.exceptionType.name + "\n" +
			"message: " + this.message + "\n" +
			"context: " + this.config.convertToString(this.context);
	}
}

export {ValidationFailure};