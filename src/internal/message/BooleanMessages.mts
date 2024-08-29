/*
 * Copyright (c) 2019 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import {
	AbstractValidator,
	messagesConstraint
} from "../internal.mjs";

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function isTrueFailed(validator: AbstractValidator<unknown, unknown>)
{
	return messagesConstraint(validator, "must be true");
}

/**
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function isFalseFailed(validator: AbstractValidator<unknown, unknown>)
{
	return messagesConstraint(validator, "must be false");
}

export {
	isTrueFailed,
	isFalseFailed
};