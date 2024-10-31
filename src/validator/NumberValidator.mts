import {
	type ValidatorComponent,
	type NegativeNumberComponent,
	type ZeroNumberComponent,
	type PositiveNumberComponent,
	type NumberComponent
} from "../internal/internal.mjs";

/**
 * Validates the state of a `number`.
 *
 * @typeParam T - the type of the value
 */
interface NumberValidator<T extends number | undefined | null> extends ValidatorComponent<T>,
	NumberComponent<T>,
	NegativeNumberComponent,
	ZeroNumberComponent,
	PositiveNumberComponent
{
}

export type {NumberValidator};