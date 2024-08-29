import type {
	ValidatorComponent,
	NumberComponent,
	ZeroNumberComponent,
	PositiveNumberComponent
} from "../internal/internal.mjs";

/**
 * Validates the state of an unsigned `number`.
 */
interface UnsignedNumberValidator extends ValidatorComponent<UnsignedNumberValidator, number>,
	NumberComponent<UnsignedNumberValidator>,
	ZeroNumberComponent<UnsignedNumberValidator>,
	PositiveNumberComponent<UnsignedNumberValidator>
{
}

export type {UnsignedNumberValidator};