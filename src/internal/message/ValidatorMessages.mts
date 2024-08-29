import {
	AbstractValidator,
	MessageBuilder,
	StringMappers,
	Type
} from "../internal.mjs";

/**
 * The minimum length of a value that triggers a diff.
 */
const MINIMUM_LENGTH_FOR_DIFF = 10;

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function messagesIsUndefined(validator: AbstractValidator<unknown, unknown>)
{
	const messageBuilder = new MessageBuilder(validator,
		MessageBuilder.quoteName(validator.getName()) + " must be undefined.");
	if (validator.value.isValid())
		messageBuilder.withContext(validator.getValue(), validator.getName());
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @param name - the name of the value
 * @returns a message for the validation failure
 */
function messagesIsNotUndefined(validator: AbstractValidator<unknown, unknown>, name: string)
{
	return new MessageBuilder(validator, MessageBuilder.quoteName(name) + " may not be undefined.");
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function messagesIsNull(validator: AbstractValidator<unknown, unknown>)
{
	const name = validator.getName();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} must be null.`);
	const value = validator.getValueOrDefault(null);
	if (value !== null)
		messageBuilder.withContext(value, name);
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function messagesIsNotNull(validator: AbstractValidator<unknown, unknown>)
{
	return new MessageBuilder(validator, MessageBuilder.quoteName(validator.getName()) + " may not be null.");
}

/**
 * @typeParam T - the type of the value
 * @param validator - the validator
 * @param constraint - the constraint that the value must adhere to (e.g. "must be negative")
 * @returns a message for the validation failure
 */
function messagesConstraint<T>(validator: AbstractValidator<unknown, T>, constraint: string)
{
	// "actual" must be negative.
	// actual: 5
	const actualName = validator.getName();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(actualName)} ${constraint}.`);
	const invalidToNull = validator.getValueOrDefault(null);
	if (invalidToNull !== null)
		messageBuilder.withContext(invalidToNull, validator.getName());
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @param expectedName - the name of the expected value
 * @param expected - the expected value
 * @returns a message for the validation failure
 */
function messagesIsEqualTo(validator: AbstractValidator<unknown, unknown>, expectedName: string | null,
                                 expected: unknown)
{
	const stringMappers = validator.configuration().stringMappers();
	const name = validator.getName();
	const invalidToNull = validator.getValueOrDefault(null);
	if (invalidToNull == null || unnecessaryDiff(invalidToNull, stringMappers) ||
		unnecessaryDiff(expected, stringMappers))
	{
		// 1. One of the values is short and simple enough to make a diff unnecessary.
		//
		//     "actual" must be equal to "expected".
		//     actual  : 123
		//     expected: 456
		const expectedNameOrValue = validator.getNameOrValue("", expectedName, "", expected);
		const messageBuilder = new MessageBuilder(validator,
			`${MessageBuilder.quoteName(name)} must be equal to ${expectedNameOrValue}.`);

		validator.value.ifValid(v => messageBuilder.withContext(v, name));
		if (expectedName != null)
			messageBuilder.withContext(expected, expectedName);
		return messageBuilder;
	}

	// 2. Both values are long and/or complex.
	//
	//    "actual" had an unexpected value.
	//
	//    actual  : 456
	//    diff    : ---+++
	//    expected:    123
	const resolvedExpectedName = expectedName ?? "expected";
	return new MessageBuilder(validator, `${MessageBuilder.quoteName(name)} had an unexpected value.`).
		addDiff(name, invalidToNull, resolvedExpectedName, expected);
}

/**
 * @param value - a value
 * @param stringMappers - the configuration used to map contextual values to a String
 * @returns true if the value is short and simple enough to forego a diff
 */
function unnecessaryDiff(value: unknown, stringMappers: StringMappers)
{
	const valueForDiff = stringMappers.toString(value);
	return valueForDiff.length < MINIMUM_LENGTH_FOR_DIFF &&
		!valueForDiff.includes("\n");
}

/**
 * @param validator - the validator
 * @param expected - the expected type
 * @returns a message for the validation failure
 */
function messagesIsInstanceOf(validator: AbstractValidator<unknown, unknown>, expected: Type)
{
	const name = validator.getName();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} must be ${expected.toString()}.`);
	const value = validator.getValueOrDefault(null);
	if (value !== null || validator.value.isValid())
	{
		messageBuilder.withContext(value, name);
		if (value !== null)
			messageBuilder.withContext(Type.of(value), `${name}.type`);
	}
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @param unwanted - the unwanted type
 * @returns a message for the validation failure
 */
function messagesIsNotInstanceOf(validator: AbstractValidator<unknown, unknown>, unwanted: Type)
{
	const name = validator.getName();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} may not be ${unwanted.toString()}.`);

	const value = validator.getValueOrDefault(null);
	if (value !== null || validator.value.isValid())
	{
		messageBuilder.withContext(value, name).
			withContext(Type.of(value), `${name}.type`);
	}
	return messageBuilder;
}


/**
 * @param validator - the validator
 * @param unwantedName - the name of the unwanted element
 * @param unwanted - the unwanted element
 * @returns a message for the validation failure
 */
function messagesIsNotEqualTo(validator: AbstractValidator<unknown, unknown>,
                              unwantedName: string | null, unwanted: unknown)
{
	//     "actual" may not be equal to "expected".
	//     actual  : 123
	//     expected: 456
	const unwantedNameOrValue = validator.getNameOrValue("", unwantedName, "", unwanted);
	const name = validator.getName();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} may not be equal to ${unwantedNameOrValue}.`);
	validator.value.ifValid(v => messageBuilder.withContext(v, name));
	if (unwantedName != null)
		messageBuilder.withContext(unwanted, unwantedName);
	return messageBuilder;
}

export
{
	messagesIsUndefined,
	messagesIsNotUndefined,
	messagesIsNull,
	messagesIsNotNull,
	messagesConstraint,
	messagesIsEqualTo,
	messagesIsInstanceOf,
	messagesIsNotInstanceOf,
	messagesIsNotEqualTo,
	MINIMUM_LENGTH_FOR_DIFF
};