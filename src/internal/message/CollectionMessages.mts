import {
	AbstractValidator,
	MessageBuilder,
	Pluralizer,
	assert,
	AssertionError,
	Difference,
	objectIsNotEmpty,
	objectIsEmpty,
	comparableGetBounds
} from "../internal.mjs";


/**
 * @param validator - the collection's validator
 * @param actualSizeName - the name of the collection's size
 * @param actualSize - the collection's size
 * @param relationship - the relationship between the actual and expected sizes (e.g. "must contain less
 *                       than")
 * @param expectedSizeName - an expression representing the expected size of the collection
 * @param expectedSize - the number of elements that should be in the collection
 * @param pluralizer - the type of items in the collection
 * @returns a message for the validation failure
 */
function collectionContainsSize(validator: AbstractValidator<unknown>, actualSizeName: string,
                                actualSize: number | null, relationship: string,
                                expectedSizeName: string | null, expectedSize: number, pluralizer: Pluralizer)
{
	// "actual" must contain exactly expected.size() characters.
	// actual         : "hello world"
	// actual.size()  : 11
	// expected.size(): 15
	const expectedNameOrSize = validator.getNameOrValue("", expectedSizeName, "", expectedSize);

	const name = validator.getName();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} ${relationship} ${expectedNameOrSize} ${pluralizer.nameOf(
			expectedSize)}.`);

	validator.value.undefinedOrNullToInvalid().ifValid(v => messageBuilder.withContext(v, name));
	if (actualSize !== null)
		messageBuilder.withContext(actualSize, actualSizeName);
	if (expectedSizeName !== null)
		messageBuilder.withContext(expectedSize, expectedSizeName);
	return messageBuilder;
}

/**
 * @param validator - the collection's validator
 * @param actualSizeName - the name of the collection's size
 * @param actualSize - the collection's size
 * @param minimum - the collection's minimum size
 * @param minimumInclusive - `true` if minimum size is inclusive
 * @param maximum - the collection's maximum size
 * @param maximumInclusive - `true` if maximum size is inclusive
 * @param pluralizer - the type of items in the collection
 */
function collectionSizeIsBetween(validator: AbstractValidator<unknown>, actualSizeName: string,
                                 actualSize: number | null, minimum: number, minimumInclusive: boolean,
                                 maximum: number, maximumInclusive: boolean, pluralizer: Pluralizer)
{
	assert(maximum >= minimum, undefined, `"minimum: ${minimum}, maximum: ${maximum}`);

	const bounds = comparableGetBounds(minimum, minimumInclusive, maximum, maximumInclusive,
		validator.configuration().stringMappers());

	const name = validator.getName();
	let message = MessageBuilder.quoteName(name);

	if (actualSize === null)
	{
		// The size is null (e.g. the collection is null)
		//
		//  "actual" must contain [1, 3] elements
		message += ` must contain ${bounds} ${pluralizer.nameOf(2)} .`;
		return new MessageBuilder(validator, message);
	}

	// actual must contain at least 4 characters.
	// actual         : "hey"
	// actual.length(): 3
	// Bounds         : [4, 6]
	let inclusiveMinimum;
	if (minimumInclusive)
		inclusiveMinimum = minimum;
	else
		inclusiveMinimum = minimum + 1;

	let exclusiveMaximum;
	if (maximumInclusive)
		exclusiveMaximum = maximum - 1;
	else
		exclusiveMaximum = maximum;

	message += " must contain ";
	if (actualSize < inclusiveMinimum)
		message += "at least ";
	else if (actualSize >= exclusiveMaximum)
		message += "at most ";
	else
	{
		throw new AssertionError(`Value should have been out of bounds.
actual: ${actualSize.toString()}
bounds: ${bounds}`);
	}
	message += `${pluralizer.nameOf(2)}.`;
	return new MessageBuilder(validator, message).
		withContext(validator.getValue(), name).
		withContext(actualSize, actualSizeName).
		withContext(bounds, "bounds");
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function collectionIsEmpty(validator: AbstractValidator<unknown>)
{
	return objectIsEmpty(validator);
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function collectionIsNotEmpty(validator: AbstractValidator<unknown>)
{
	return objectIsNotEmpty(validator);
}


/**
 * @param validator - the validator
 * @param expectedName - the name of the expected value
 * @param expected - the expected value
 * @returns a message for the validation failure
 */
function collectionContains(validator: AbstractValidator<unknown>, expectedName: string | null,
                            expected: unknown)
{
	// "actual" must contain the same value as "expected".
	// actual  : 5
	// expected: 2
	return collectionContainsImpl(validator, "must contain", expectedName, expected);
}


/**
 * @param validator - the validator
 * @param relationship - the relationship between the actual and other value (e.g. "must contain")
 * @param otherName - the name of the other value
 * @param other - the other value
 * @returns a message for the validation failure
 */
function collectionContainsImpl(validator: AbstractValidator<unknown>, relationship: string,
                                otherName: string | null, other: unknown)
{
	// "actual" must contain the same value as "expected".
	// actual: 5
	// factor: 2
	const otherNameOrValue = validator.getNameOrValue("the same value as ", otherName, "", other);

	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(validator.getName())} ${relationship} ${otherNameOrValue}.`);
	if (otherName !== null)
		messageBuilder.withContext(other, otherName);
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @param unwantedName - the name of the unwanted value
 * @param unwanted - the unwanted value
 * @returns a message for the validation failure
 */
function collectionDoesNotContain(validator: AbstractValidator<unknown>, unwantedName: string | null,
                                  unwanted: unknown)
{
	// "actual" may not contain the same value as "unwanted".
	// actual  : 5
	// unwanted: 2
	return collectionContainsImpl(validator, "may not contain", unwantedName, unwanted);
}

/**
 * @param validator - the validator
 * @param expectedName - the name of the expected collection
 * @param expected - the collection of expected values
 * @param pluralizer - the type of items in the collections
 * @returns a message for the validation failure
 */
function collectionContainsAny(validator: AbstractValidator<unknown>, expectedName: string | null,
                               expected: unknown, pluralizer: Pluralizer)
{
	// "actual" must contain any of the elements present in "expected".
	// actual  : [1, 2, 3]
	// expected: [2, 3, 4]
	const expectedNameOrValue = validator.getNameOrValue("", expectedName, "the set ", expected);

	const name = validator.getName();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} must contain any of the ${pluralizer.nameOf(2)} \
present in ${expectedNameOrValue}.`);

	validator.value.undefinedOrNullToInvalid().ifValid(v => messageBuilder.withContext(v, name));
	if (expectedName !== null)
		messageBuilder.withContext(expected, expectedName);
	return messageBuilder;
}

/**
 * @typeParam E - the type of elements in the value
 * @param validator - the validator
 * @param difference - the difference between the actual and unwanted values
 * @param unwantedName - the name of the unwanted collection
 * @param unwanted - the collection of unwanted elements
 * @param pluralizer - the type of items in the collections
 * @returns a message for the validation failure
 */
function collectionDoesNotContainAny<E>(validator: AbstractValidator<unknown>,
                                        difference: Difference<E> | null, unwantedName: string | null,
                                        unwanted: unknown, pluralizer: Pluralizer)
{
	// "actual" may not contain any of the elements present in "unwanted".
	// actual  : [1, 2, 3]
	// unwanted: [2, 3, 4]
	// elementsToRemove: [2, 3, 4]
	const unwantedNameOrValue = validator.getNameOrValue("", unwantedName, "the set ", unwanted);

	const name = validator.getName();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} may not contain any of the ${pluralizer.nameOf(2)} \
present in ${unwantedNameOrValue}.`);

	validator.value.undefinedOrNullToInvalid().ifValid(v => messageBuilder.withContext(v, name));
	if (unwantedName !== null)
		messageBuilder.withContext(unwanted, unwantedName);
	if (difference !== null)
		messageBuilder.withContext(difference.common, "elementsToRemove");
	return messageBuilder;
}

/**
 * @typeParam E - the type of elements in the value
 * @param validator - the validator
 * @param difference - the difference between the actual and expected values
 * @param expectedName - the name of the collection
 * @param expected - the collection
 * @param pluralizer - the type of items in the value
 * @returns a message for the validation failure
 */
function collectionContainsExactly<E>(validator: AbstractValidator<unknown>, difference: Difference<E> | null,
                                      expectedName: string | null, expected: unknown, pluralizer: Pluralizer)
{
	// "actual" must consist of the elements [2, 3, 4], regardless of their order.
	//
	// or
	//
	// "actual" must consist of the same elements as "expected", regardless of their order.
	// actual  : [1, 2, 3]
	// expected: [2, 3, 4]
	// missing : [4]
	// unwanted: [1]

	const name = validator.getName();
	let message = `${MessageBuilder.quoteName(name)} must consist of the `;
	if (expectedName !== null)
		message += "same ";
	message += `${pluralizer.nameOf(2)} `;
	const expectedNameOrValue = validator.getNameOrValue("as ", expectedName, "", expected);
	message += `${expectedNameOrValue}, regardless of their order.`;

	const messageBuilder = new MessageBuilder(validator, message);
	validator.value.undefinedOrNullToInvalid().ifValid(v => messageBuilder.withContext(v, name));
	if (expectedName !== null)
		messageBuilder.withContext(expected, expectedName);
	if (difference !== null)
	{
		messageBuilder.withContext(difference.onlyInOther, "missing").
			withContext(difference.onlyInActual, "unwanted");
	}
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @param unwantedName - the name of the collection
 * @param unwanted - the collection
 * @param pluralizer - the type of items in the value
 * @returns a message for the validation failure
 */
function collectionDoesNotContainExactly(validator: AbstractValidator<unknown>, unwantedName: string | null,
                                         unwanted: unknown, pluralizer: Pluralizer)
{
	// "actual" may not consist of the elements [2, 3, 4], regardless of their order.
	//
	// or
	//
	// "actual" may not consist of the same elements as "expected", regardless of their order.
	// unwanted  : [1, 2, 3]
	let message = `${MessageBuilder.quoteName(validator.getName())} may not consist of the `;
	if (unwantedName !== null)
		message += "same ";
	message += `${pluralizer.nameOf(2)} `;
	const unwantedStringNameOrValue = validator.getNameOrValue("as ", unwantedName, "", unwanted);
	message += `${unwantedStringNameOrValue}, regardless of their order.`;

	const messageBuilder = new MessageBuilder(validator, message);
	if (unwantedName !== null)
		messageBuilder.withContext(unwanted, unwantedName);
	return messageBuilder;
}

/**
 * @typeParam E - the type of elements in the value
 * @param validator - the validator
 * @param difference - the difference between the actual and expected values
 * @param expectedName - the name of the expected collection
 * @param expected - the collection of expected values
 * @param pluralizer - the type of items in the value
 * @returns a message for the validation failure
 */
function collectionContainsAll<E>(validator: AbstractValidator<unknown>, difference: Difference<E> | null,
                                  expectedName: string | null, expected: unknown, pluralizer: Pluralizer)
{
	// "actual" must contain all the elements present in "expected".
	// actual  : [1, 2, 3]
	// expected: [2, 3, 4]
	// missing : [4]
	const expectedNameOrValue = validator.getNameOrValue("", expectedName, "the set ", expected);

	const name = validator.getName();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} must contain all the ${pluralizer.nameOf(2)} \
present in ${expectedNameOrValue}.`);

	validator.value.undefinedOrNullToInvalid().ifValid(v => messageBuilder.withContext(v, name));
	if (expectedName !== null)
		messageBuilder.withContext(expected, expectedName);
	if (difference !== null)
		messageBuilder.withContext(difference.onlyInOther, "missing");
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @param unwantedName - the name of the unwanted collection
 * @param unwanted - the collection of unwanted values
 * @param pluralizer - the type of items in the value
 * @returns a message for the validation failure
 */
function collectionDoesNotContainAll(validator: AbstractValidator<unknown>, unwantedName: string | null,
                                     unwanted: unknown, pluralizer: Pluralizer)
{
	// "actual" may not contain some, but not all, the elements present in "unwanted".
	// actual  : [1, 2, 3]
	// unwanted: [2, 3, 4]
	const unwantedNameOrValue = validator.getNameOrValue("", unwantedName, "the set ", unwanted);

	const name = validator.getName();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} may contain some, but not all, the \
${pluralizer.nameOf(2)} present in ${unwantedNameOrValue}.`);

	validator.value.undefinedOrNullToInvalid().ifValid(v => messageBuilder.withContext(v, name));
	if (unwantedName !== null)
		messageBuilder.withContext(unwanted, unwantedName);
	return messageBuilder;
}

/**
 * @typeParam E - the type of elements in the value
 * @param validator - the validator
 * @param duplicates - the duplicate values in the value being validated
 * @param pluralizer - the type of items in the value
 * @returns a message for the validation failure
 */
function collectionDoesNotContainDuplicates<E>(validator: AbstractValidator<unknown>,
                                               duplicates: Set<E> | null, pluralizer: Pluralizer)
{
	const name = validator.getName();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} may not contain any duplicate ${pluralizer.nameOf(2)}.`);
	if (duplicates !== null)
		messageBuilder.withContext(duplicates, "duplicates");
	validator.value.undefinedOrNullToInvalid().ifValid(v => messageBuilder.withContext(v, name));
	return messageBuilder;
}

/**
 * @param validator - the validator
 * @param sorted - the sorted representation of the value being validated
 * @returns a message for the validation failure
 */
function collectionIsSorted(validator: AbstractValidator<unknown>, sorted: unknown[] | null)
{
	const name = validator.getName();
	const messageBuilder = new MessageBuilder(validator,
		`${MessageBuilder.quoteName(name)} must be sorted.`);
	validator.value.undefinedOrNullToInvalid().ifValid(v => messageBuilder.withContext(v, name));
	if (sorted !== null)
		messageBuilder.withContext(sorted, "expected");
	return messageBuilder;
}

export {
	collectionContainsSize,
	collectionSizeIsBetween,
	collectionIsEmpty,
	collectionIsNotEmpty,
	collectionContains,
	collectionDoesNotContain,
	collectionContainsExactly,
	collectionDoesNotContainExactly,
	collectionContainsAny,
	collectionDoesNotContainAny,
	collectionContainsAll,
	collectionDoesNotContainAll,
	collectionDoesNotContainDuplicates,
	collectionIsSorted
};