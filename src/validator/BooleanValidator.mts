import type {ValidatorComponent} from "../internal/internal.mjs";

/**
 * Validates the state of a `boolean`.
 */
interface BooleanValidator extends ValidatorComponent<BooleanValidator, boolean>
{
	/**
	 * Ensures that the value is `true`.
	 *
	 * @returns this
	 * @throws TypeError     if the value is `undefined` or `null`
	 * @throws RangeError if the value is `false`
	 */
	isTrue(): BooleanValidator;

	/**
	 * Ensures that the value is `false`.
	 *
	 * @returns this
	 * @throws TypeError     if the value is `undefined` or `null`
	 * @throws RangeError if the value is `true`
	 */
	isFalse(): BooleanValidator;
}

export type {BooleanValidator};