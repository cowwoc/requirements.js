import type {
	ValidatorComponent,
	NumberComponent,
	ZeroNumberComponent,
	PositiveNumberComponent
} from "../internal/internal.mjs";

/**
 * Validates the state of an unsigned `number`.
 */
interface UnsignedNumberValidator extends ValidatorComponent<number>,
	NumberComponent<number>,
	ZeroNumberComponent,
	PositiveNumberComponent
{
}

export type {UnsignedNumberValidator};