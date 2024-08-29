import {internalValueToString} from "./internal.mjs";

/**
 * Returns the string representation of a value.
 *
 * @param value - a value
 * @param seen - the objects that we've seen before
 * @returns the string representation of the value
 */
type StringMapper = (value: unknown, seen?: Set<unknown>) => string;

/**
 * @param value - a value
 * @returns true if the value has the number of parameters expected by `StringMapper`
 */
function isStringMapper(value: unknown): value is StringMapper
{
	return typeof (value) === "function" && value.length >= 1 && value.length <= 2;
}

/**
 * Uses {@link internalValueToString} to convert objects to a string.
 */
const INTERNAL_VALUE_TO_STRING = (value: unknown) => internalValueToString(value);

export {
	type StringMapper,
	isStringMapper,
	INTERNAL_VALUE_TO_STRING
};