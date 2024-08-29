import type {
	ValidatorComponent,
	CollectionComponent,
	UnsignedNumberValidator
} from "../internal/internal.mjs";

/**
 * Validates the state of a `Set`.
 *
 * @typeParam E - the type of elements in the set
 */
interface SetValidator<E> extends ValidatorComponent<SetValidator<E>, Set<E>>,
	CollectionComponent<SetValidator<E>, E>
{
	/**
	 * Returns a validator for the set's size.
	 *
	 * @throws TypeError if the value is `undefined` or `null`
	 * @returns a validator for the set's size
	 */
	size(): UnsignedNumberValidator;
}

export type {SetValidator};