import {
	AbstractValidator,
	MessageBuilder,
	StringMappers
} from "../internal.mjs";

/**
 * @param validator - the validator
 * @param expectedName - the name of the expected value
 * @param expected - the expected value
 * @returns a message for the validation failure
 */
function comparableIsEqualTo(validator: AbstractValidator<unknown, unknown>, expectedName: string | null,
                             expected: unknown)
{
	return comparableCompareValues(validator, "must be equal to", expectedName, expected);
}

/**
 * @param validator - the validator
 * @param limitName - the name of the value's bound
 * @param maximumExclusive - the exclusive upper bound
 * @returns a message for the validation failure
 */
function comparableIsLessThan(validator: AbstractValidator<unknown, unknown>, limitName: string | null,
                              maximumExclusive: unknown)
{
	return comparableCompareValues(validator, "must be less than", limitName, maximumExclusive);
}

/**
 * @param validator - the validator
 * @param limitName - the name of the value's bound
 * @param maximumInclusive - the inclusive upper bound
 * @returns a message for the validation failure
 */
function comparableIsLessThanOrEqualTo(validator: AbstractValidator<unknown, unknown>,
                                       limitName: string | null, maximumInclusive: unknown)
{
	return comparableCompareValues(validator, "must be less than or equal to", limitName, maximumInclusive);
}

/**
 * @param validator - the validator
 * @param limitName - the name of the value's bound
 * @param minimumInclusive - the inclusive lower bound
 * @returns a message for the validation failure
 */
function comparableIsGreaterThanOrEqualTo(validator: AbstractValidator<unknown, unknown>,
                                          limitName: string | null, minimumInclusive: unknown)
{
	return comparableCompareValues(validator, "must be greater than or equal to", limitName, minimumInclusive);
}

/**
 * @param validator - the validator
 * @param limitName - the name of the value's bound
 * @param minimumExclusive - the exclusive lower bound
 * @returns a message for the validation failure
 */
function comparableIsGreaterThan(validator: AbstractValidator<unknown, unknown>,
                                 limitName: string | null, minimumExclusive: unknown)
{
	return comparableCompareValues(validator, "must be greater than", limitName, minimumExclusive);
}

/**
 * @param validator - the validator
 * @param relationship - a description of the relationship between the actual and expected value (e.g. "must
 *                     be equal to")
 * @param expectedName - the name of the expected value
 * @param expected - the expected value
 * @returns a message for the validation failure
 */
function comparableCompareValues(validator: AbstractValidator<unknown, unknown>, relationship: string,
                                 expectedName: string | null, expected: unknown)
{
	const actualName = validator.getName();

	//     "actual" must be equal to "expected".
	//     actual  : 123
	//     expected: 456
	const expectedNameOrValue = validator.getNameOrValue("", expectedName, "", expected);

	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(actualName)} ${relationship} ${expectedNameOrValue}.`);

	const invalidToNull = validator.getValueOrDefault(null);
	if (invalidToNull != null)
		messageBuilder.withContext(invalidToNull, actualName);
	if (expectedName != null)
		messageBuilder.withContext(expected, expectedName);
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @param minimum - the object representation of the lower limit
 * @param minimumInclusive - `true` if the lower bound of the range is inclusive
 * @param maximum - the object representation of the upper limit
 * @param maximumInclusive - `true` if the upper bound of the range is inclusive
 * @returns a message for the validation failure
 */
function isBetweenFailed(validator: AbstractValidator<unknown, unknown>, minimum: unknown,
                         minimumInclusive: boolean, maximum: unknown, maximumInclusive: boolean)
{
	const name = validator.getName();
	const builder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} is out of bounds.`);
	const value = validator.getValueOrDefault(null);
	if (value != null)
		builder.withContext(value, name);

	const bounds = comparableGetBounds(minimum, minimumInclusive, maximum, maximumInclusive,
		validator.configuration().stringMappers());
	builder.withContext(bounds, "bounds");
	return builder;
}

/**
 * @param minimum - the Object representation of the lower limit
 * @param minimumInclusive - `true` if the lower bound of the range is inclusive
 * @param maximum - the Object representation of the upper limit
 * @param maximumInclusive - `true` if the upper bound of the range is inclusive
 * @param stringMappers - the configuration used to map contextual values to a String
 * @returns a message for the validation failure
 */
function comparableGetBounds(minimum: unknown, minimumInclusive: boolean, maximum: unknown,
                             maximumInclusive: boolean, stringMappers: StringMappers)
{
	let bounds = "";
	if (minimumInclusive)
		bounds += "[";
	else
		bounds += "(";
	const minimumAsString = stringMappers.toString(minimum);
	const maximumAsString = stringMappers.toString(maximum);
	bounds += `${minimumAsString}, ${maximumAsString}`;
	if (maximumInclusive)
		bounds += "]";
	else
		bounds += ")";
	return bounds;
}


export {
	comparableIsEqualTo,
	comparableIsLessThan,
	comparableIsLessThanOrEqualTo,
	comparableIsGreaterThanOrEqualTo,
	comparableIsGreaterThan,
	comparableCompareValues,
	isBetweenFailed,
	comparableGetBounds
};