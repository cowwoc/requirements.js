import type {ValidatorComponent} from "../internal/internal.mjs";

/**
 * Validates the state of a `boolean`.
 *
 * @typeParam T - the type of the value
 */
interface BooleanValidator<T extends boolean | undefined | null> extends ValidatorComponent<T>
{
	/**
	 * Ensures that the value is `true`.
	 *
	 * @returns this
	 * @throws TypeError if the value is `undefined` or `null`
	 * @throws RangeError if the value is `false`
	 */
	isTrue(): this;

	/**
	 * Ensures that the value is `false`.
	 *
	 * @returns this
	 * @throws TypeError if the value is `undefined` or `null`
	 * @throws RangeError if the value is `true`
	 */
	isFalse(): this;
}

export type {BooleanValidator};