import {
	AbstractValidator,
	MessageBuilder
} from "../internal.mjs";

/**
 * @param validator  - the validator
 * @returns a message for the validation failure
 */
function objectIsEmpty(validator: AbstractValidator<unknown, unknown>)
{
	const name = validator.getName();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} must be empty.`);
	const value = validator.getValueOrDefault(null);
	if (value !== null)
		messageBuilder.withContext(value, name);
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function objectIsNotEmpty(validator: AbstractValidator<unknown, unknown>)
{
	const name = validator.getName();
	return new MessageBuilder(validator, MessageBuilder.quoteName(name) + " may not be empty.");
}

export {
	objectIsEmpty,
	objectIsNotEmpty
};