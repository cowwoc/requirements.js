import type {
	UnsignedNumberValidator,
	ValidatorComponent,
	CollectionComponent
} from "../internal/internal.mjs";

/**
 * Validates the state of an array.
 *
 * @typeParam E - the type of elements in the collection
 */
interface ArrayValidator<E> extends
	ValidatorComponent<ArrayValidator<E>, E[]>,
	CollectionComponent<ArrayValidator<E>, E>
{
	/**
	 * Returns a validator for the array's length.
	 *
	 * @throws TypeError if the value is `undefined` or `null`
	 * @returns a validator for the array's length
	 */
	length(): UnsignedNumberValidator;

	/**
	 * Ensures that the array is sorted.
	 *
	 * @param comparator - a function that returns a negative number if `first` should come
	 * before `second`, zero or `NaN` if the two values are equal, or a positive number
	 * if `first` should come after `second`.
	 * @throws TypeError  if the value or `comparator` are `undefined` or `null`
	 * @throws RangeError if the collection is not sorted
	 * @returns this
	 */
	isSorted(comparator: (first: unknown, second: unknown) => number): ArrayValidator<E>;
}

export type {ArrayValidator};