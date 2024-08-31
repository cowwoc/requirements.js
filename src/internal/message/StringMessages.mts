import {
	MessageBuilder,
	AbstractValidator
} from "../internal.mjs";

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function stringIsBlank(validator: AbstractValidator<unknown, string>)
{
	const name = validator.getName();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} must be empty or contain only whitespace codepoints.`);
	const value = validator.getValueOrDefault(null);
	if (value !== null)
		messageBuilder.withContext(value, name);
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function stringIsNotBlank(validator: AbstractValidator<unknown, string>)
{
	const name = validator.getName();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} may not be empty or contain only whitespace codepoints.`);
	const value = validator.getValueOrDefault(null);
	if (value !== null)
		messageBuilder.withContext(value, name);
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function stringIsTrimmed(validator: AbstractValidator<unknown, string>)
{
	const name = validator.getName();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} may not contain leading or trailing whitespace.`);
	const value = validator.getValueOrDefault(null);
	if (value !== null)
		messageBuilder.withContext(value, name);
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function stringIsStripped(validator: AbstractValidator<unknown, string>)
{
	const name = validator.getName();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} may not contain leading or trailing whitespace.`);
	const value = validator.getValueOrDefault(null);
	if (value !== null)
		messageBuilder.withContext(value, name);
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @param prefix    - the value that the string must start with
 * @returns a message for the validation failure
 */
function stringStartsWith(validator: AbstractValidator<unknown, string>, prefix: string)
{
	const name = validator.getName();
	const stringMappers = validator.configuration().stringMappers();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} must start with ${stringMappers.toString(prefix)}.`);
	const value = validator.getValueOrDefault(null);
	if (value !== null)
		messageBuilder.withContext(value, name);
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @param prefix    - the value that the string must start with
 * @returns a message for the validation failure
 */
function stringDoesNotStartWith(validator: AbstractValidator<unknown, string>, prefix: string)
{
	const name = validator.getName();
	const stringMappers = validator.configuration().stringMappers();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} may not start with ${stringMappers.toString(prefix)}.`);
	const value = validator.getValueOrDefault(null);
	if (value !== null)
		messageBuilder.withContext(value, name);
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @param suffix    - the value that the string must end with
 * @returns a message for the validation failure
 */
function stringEndsWith(validator: AbstractValidator<unknown, string>, suffix: string)
{
	const name = validator.getName();
	const stringMappers = validator.configuration().stringMappers();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} must end with ${stringMappers.toString(suffix)}.`);
	const value = validator.getValueOrDefault(null);
	if (value !== null)
		messageBuilder.withContext(value, name);
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @param suffix    - the value that the string must end with
 * @returns a message for the validation failure
 */
function stringDoesNotEndWith(validator: AbstractValidator<unknown, string>, suffix: string)
{
	const name = validator.getName();
	const stringMappers = validator.configuration().stringMappers();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} may not end with ${stringMappers.toString(suffix)}.`);
	const value = validator.getValueOrDefault(null);
	if (value !== null)
		messageBuilder.withContext(value, name);
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @param expected  - the expected value
 * @returns a message for the validation failure
 */
function stringContains(validator: AbstractValidator<unknown, string>, expected: string)
{
	const name = validator.getName();
	const stringMappers = validator.configuration().stringMappers();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} must contain ${stringMappers.toString(expected)}.`);
	const value = validator.getValueOrDefault(null);
	if (value !== null)
		messageBuilder.withContext(value, name);
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @param unwanted  - the unwanted value
 * @returns a message for the validation failure
 */
function stringDoesNotContain(validator: AbstractValidator<unknown, string>, unwanted: string)
{
	const name = validator.getName();
	const stringMappers = validator.configuration().stringMappers();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} may not contain ${stringMappers.toString(unwanted)}.`);
	const value = validator.getValueOrDefault(null);
	if (value !== null)
		messageBuilder.withContext(value, name);
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function stringDoesNotContainWhitespace(validator: AbstractValidator<unknown, string>)
{
	const name = validator.getName();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} may not contain whitespace.`);
	const value = validator.getValueOrDefault(null);
	if (value !== null)
		messageBuilder.withContext(value, name);
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @param regex     - the regular expression
 * @returns a message for the validation failure
 */
function stringMatches(validator: AbstractValidator<unknown, string>, regex: string)
{
	const name = validator.getName();
	const stringMappers = validator.configuration().stringMappers();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} must match the regular expression ${stringMappers.toString(regex)}.`);
	const value = validator.getValueOrDefault(null);
	if (value !== null)
		messageBuilder.withContext(value, name);
	return messageBuilder;
}

export
{
	stringIsBlank,
	stringIsNotBlank,
	stringIsTrimmed,
	stringIsStripped,
	stringStartsWith,
	stringDoesNotStartWith,
	stringEndsWith,
	stringDoesNotEndWith,
	stringContains,
	stringDoesNotContain,
	stringDoesNotContainWhitespace,
	stringMatches
};