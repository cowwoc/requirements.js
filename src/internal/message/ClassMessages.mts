/*
 * Copyright (c) 2019 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import {
	AbstractValidator,
	messagesConstraint,
	type ClassConstructor
} from "../internal.mjs";


	/**
	 * @param validator - the validator
	 * @returns a message for the validation failure
	 */
	function classIsPrimitive(validator: AbstractValidator<unknown>)
	{
		return messagesConstraint(validator, "must be a primitive type");
	}
	
/**
 * @param subtype - the subtype
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function classIsSupertypeOf(validator: AbstractValidator<unknown>, subtype: ClassConstructor<unknown>)
{
	return messagesConstraint(validator, " must be a supertype of " + subtype.toString());
}

/**
 * @param supertype - the supertype
 * @param validator - the validator
 * @returns a message for the validation failure
 */
function classIsSubtypeOf(validator: AbstractValidator<unknown>, supertype: ClassConstructor<unknown>)
{
	return messagesConstraint(validator, "must be a subtype of " + supertype.toString());
}

export
{
	classIsPrimitive,
	classIsSupertypeOf,
	classIsSubtypeOf
};