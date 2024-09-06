import {
	ContextGenerator,
	AbstractValidator,
	assert,
	StringSection,
	ContextSection,
	type MessageSection,
	requireThatStringIsNotEmpty,
	AssertionError,
	requireThatValueIsNotNull,
	assertThatValueIsNotNull
} from "../../internal.mjs";

/**
 * Builds an error message.
 */
class MessageBuilder
{
	public static readonly DIFF_LEGEND = `\

Legend
------
+           : Add this character to the value
-           : Remove this character from the value
[index]     : Refers to the index of a collection element
@line-number: Refers to the line number of a multiline string
`;
	private readonly validator: AbstractValidator<unknown>;
	private readonly message: string;
	private readonly failureContext = new Map<string, unknown>();
	/**
	 * A string that describes the difference between the expected and actual values.
	 */
	private readonly diff: MessageSection[] = [];

	/**
	 * @param validator - the validator
	 * @param message   - (optional) the error message (empty string when absent)
	 * @throws AssertionError if:
	 *                        <ul>
	 *                          <li>any of the arguments are null</li>
	 *                          <li>`message` is blank or does not end with a dot</li>
	 *                        </ul>
	 */
	public constructor(validator: AbstractValidator<unknown>, message: string)
	{
		assertThatValueIsNotNull(validator, "validator");
		if (!message.endsWith("."))
			throw new AssertionError(`Message must end with a dot: ${message}`);
		this.validator = validator;
		this.message = message;
	}

	/**
	 * Appends context to the error message. If the context previously contained a mapping for the name, the
	 * old value is replaced.
	 *
	 * @param value - the value of the context
	 * @param name  - (optional) the name of the context (empty string if absent)
	 * @returns this
	 * @throws AssertionError if `name`:
	 *                        <ul>
	 *                          <li>is `undefined` or `null`</li>
	 *                          <li>is empty</li>
	 *                          <li>contains whitespace or a colon</li>
	 *                        </ul>
	 */
	public withContext(value: unknown, name: string)
	{
		requireThatValueIsNotNull(name, "name");
		this.failureContext.set(name, value);
		return this;
	}

	/**
	 * Adds a DIFF to the context that compares the value to an expected value
	 *
	 * @param actualName    - the name of the value
	 * @param actualValue   - the object representation of the value
	 * @param expectedName  - the name of the expected value
	 * @param expectedValue - the object representation of the expected value
	 * @returns this
	 */
	public addDiff(actualName: string, actualValue: unknown, expectedName: string, expectedValue: unknown)
	{
		const contextGenerator = new ContextGenerator(this.validator.getScope(), this.validator.configuration(),
			actualName, expectedName).
			actualValue(actualValue).
			expectedValue(expectedValue);
		this.diff.push(...contextGenerator.build());
		return this;
	}

	/**
	 * @returns the contextual information associated with a validation failure
	 */
	private getValidatorContext()
	{
		const mergedContext = new Map<string, unknown>(this.failureContext);
		for (const entry of this.validator.getContext())
			mergedContext.set(entry[0], entry[1]);

		const stringMappers = this.validator.configuration().stringMappers();
		const contextAsString = new Map<string, string>();
		for (const [key, value] of mergedContext.entries())
			contextAsString.set(key, stringMappers.toString(value));
		return new ContextSection(contextAsString);
	}

	/**
	 * Quotes the name of a parameter, unless it references a method call.
	 *
	 * @param name - the name of a parameter
	 * @returns the updated name
	 */
	public static quoteName(name: string): string
	{
		if (name.includes("."))
			return name;
		return "\"" + name + "\"";
	}

	public toString()
	{
		const context: MessageSection[] = [];
		this.addValidatorContextToContext(context);
		this.addDiffToContext(context);
		this.addErrorMessageToContext(context);
		return this.contextToString(context);
	}

	private addDiffToContext(context: MessageSection[])
	{
		if (this.diff.length === 0)
			return;
		if (context.length !== 0 || this.message.length !== 0)
		{
			// Add an extra newline in front of the diff
			context.push(new StringSection(""));
		}
		context.push(...this.diff);
	}

	private addValidatorContextToContext(context: MessageSection[])
	{
		const validatorContext = this.getValidatorContext();
		if (validatorContext.value.size !== 0)
			context.push(validatorContext);
	}

	private contextToString(context: MessageSection[])
	{
		let maxKeyLength = 0;
		for (const section of context)
			maxKeyLength = Math.max(maxKeyLength, section.getMaxKeyLength());

		let result = "";
		const lines: string[] = [];
		for (const section of context)
			lines.push(...section.getLines(maxKeyLength));
		result += lines.join("\n");
		return result.toString();
	}

	private addErrorMessageToContext(context: MessageSection[])
	{
		let updatedMessage;
		if (context.length === 0 && !this.message.includes("\n"))
		{
			requireThatStringIsNotEmpty(this.message, "message");
			assert(this.message.endsWith("."), undefined, this.message);

			// Strip the period from the end of single-line messages, unless it contains a comma.
			if (this.message.includes(","))
				updatedMessage = this.message;
			else
				updatedMessage = this.message.substring(0, this.message.length - 1);
		}
		else
			updatedMessage = this.message;
		context.unshift(new StringSection(updatedMessage));
	}
}

export {MessageBuilder};