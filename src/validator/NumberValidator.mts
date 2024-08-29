import {
	type ValidatorComponent,
	type NegativeNumberComponent,
	type ZeroNumberComponent,
	type PositiveNumberComponent,
	type NumberComponent
} from "../internal/internal.mjs";

/**
 * Validates the state of a `number`.
 */
interface NumberValidator extends ValidatorComponent<NumberValidator, number>,
	NumberComponent<NumberValidator>,
	NegativeNumberComponent<NumberValidator>,
	ZeroNumberComponent<NumberValidator>,
	PositiveNumberComponent<NumberValidator>
{
}

export type {NumberValidator};