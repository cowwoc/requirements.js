import type {
	UnsignedNumberValidator,
	ValidatorComponent
} from "../../internal/internal.mjs";

/* eslint-disable @typescript-eslint/no-unnecessary-condition */
const typedocWorkaround: null | ValidatorComponent<unknown> = null;
// noinspection PointlessBooleanExpressionJS
if (typedocWorkaround !== null)
	console.log("WORKAROUND: https://github.com/microsoft/tsdoc/issues/348");

/* eslint-enable @typescript-eslint/no-unnecessary-condition */

/**
 * Methods that all collection validators must contain.
 *
 * @typeParam E - the type of elements in the collection
 */
interface CollectionComponent<E>
{
	/**
	 * Ensures that the collection is empty.
	 *
	 * @returns this
	 * @throws TypeError  if the value is `undefined` or `null`
	 * @throws RangeError if the collection is not empty
	 */
	isEmpty(): this;

	/**
	 * Ensures that the collection is not empty.
	 *
	 * @returns this
	 * @throws TypeError  if the value is `undefined` or `null`
	 * @throws RangeError if the collection is empty
	 */
	isNotEmpty(): this;

	/**
	 * Ensures that the collection contains an element.
	 *
	 * @param expected - the element
	 * @returns this
	 * @throws TypeError  if the value or `expected` are `undefined` or `null`
	 * @throws RangeError if the collection does not contain `expected`
	 */
	contains(expected: E): this;

	/**
	 * Ensures that the collection does not contain `unwanted`.
	 *
	 * @param unwanted - the unwanted element
	 * @returns this
	 * @throws TypeError  if the value or `unwanted` are `undefined` or `null`
	 * @throws RangeError if the collection contains `unwanted`
	 */
	doesNotContain(unwanted: E): this;

	/**
	 * Ensures that the collection contains an element.
	 *
	 * @param expected - the element
	 * @param name     - the name of the element
	 * @returns this
	 * @throws TypeError if the value or any of the arguments are `undefined` or `null`
	 * @throws RangeError if:
	 *                                  <ul>
	 *                                    <li>`name` is empty</li>
	 *                                    <li>`name` contains whitespace</li>
	 *                                    <li>`name` is already in use by the value being validated or
	 *                                    the validator context</li>
	 *                                    <li>the collection does not contain `expected`</li>
	 *                                  </ul>
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	contains(expected: E, name: string): this;

	/**
	 * Ensures that the collection does not contain `unwanted`.
	 *
	 * @param unwanted - the unwanted element
	 * @param name     - the name of the element
	 * @returns this
	 * @throws TypeError if the value or any of the arguments are `undefined` or `null`
	 * @throws RangeError if:
	 *                                  <ul>
	 *                                    <li>`name` is empty</li>
	 *                                    <li>`name` contains whitespace</li>
	 *                                    <li>`name` is already in use by the value being validated or
	 *                                    the validator context</li>
	 *                                    <li>the collection contains `unwanted`</li>
	 *                                  </ul>
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	doesNotContain(unwanted: E, name: string): this;

	/**
	 * Ensures that the collection consists of the same elements as `expected`, irrespective of their
	 * order.
	 * <p>
	 * In contrast, {@link ValidatorComponent.isEqualTo|isEqualTo()} requires the same element ordering.
	 *
	 * @param expected - the desired elements
	 * @returns this
	 * @throws TypeError if the value or `expected` are `undefined` or `null`
	 * @throws RangeError if:
	 *                    <ul>
	 *                      <li>the collection is missing any element in `expected`</li>
	 *                      <li>the collection contains any element that is not in `expected`</li>
	 *                    </ul>
	 */
	containsExactly(expected: Set<E>): this;

	/**
	 * Ensures that the collection and `unwanted` consist of different elements, irrespective of their
	 * order.
	 *
	 * @param unwanted - the unwanted elements
	 * @returns this
	 * @throws TypeError  if the value or `unwanted` are `undefined` or `null`
	 * @throws RangeError if the collection consists of the same elements as `unwanted`,
	 *                    irrespective of their order
	 */
	doesNotContainExactly(unwanted: Set<E>): this;

	/**
	 * Ensures that the collection consists of the same elements as `expected`, irrespective of
	 * their order.
	 * <p>
	 * In contrast, {@link ValidatorComponent.isEqualTo|isEqualTo()} requires the same element ordering.
	 *
	 * @param expected - the desired elements
	 * @returns this
	 * @throws TypeError  if the value or `expected` are `undefined` or `null`
	 * @throws RangeError if:
	 *                                  <ul>
	 *                                    <li>the collection is missing any element in `expected`</li>
	 *                                    <li>the collection contains any element that is not in
	 *                                    `expected`</li>
	 *                                  </ul>
	 */
	containsExactly(expected: E[]): this;

	/**
	 * Ensures that the collection and `unwanted` consist of different elements, irrespective of their
	 * order.
	 *
	 * @param unwanted - the unwanted elements
	 * @returns this
	 * @throws TypeError  if the value or `unwanted` are `undefined` or `null`
	 * @throws RangeError if the collection consists of the same elements as `unwanted`,
	 *                    irrespective of their order
	 */
	doesNotContainExactly(unwanted: E[]): this;

	/**
	 * Ensures that the collection consists of the same elements as `expected`, irrespective of their
	 * order.
	 * <p>
	 * In contrast, {@link ValidatorComponent.isEqualTo|isEqualTo()} requires the same element ordering.
	 *
	 * @param expected - the desired elements
	 * @param name     - the name of the expected collection
	 * @returns this
	 * @throws TypeError  if the value or any of the arguments are `undefined` or `null`
	 * @throws RangeError if:
	 *                    <ul>
	 *                      <li>`name` is empty</li>
	 *                      <li>`name` contains whitespace</li>
	 *                      <li>`name` is already in use by the value being validated or
	 *                      the validator context</li>
	 *                      <li>the collection and `expected` contain different elements,
	 *                      irrespective of their order</li>
	 *                    </ul>
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	containsExactly(expected: Set<E>, name: string): this;

	/**
	 * Ensures that the collection and `unwanted` consist of different elements, irrespective of
	 * their order.
	 *
	 * @param unwanted - the unwanted elements
	 * @param name     - the name of the unwanted collection
	 * @returns this
	 * @throws TypeError  if the value or any of the arguments are `undefined` or `null`
	 * @throws RangeError if:
	 *                    <ul>
	 *                      <li>`name` is empty</li>
	 *                      <li>`name` contains whitespace</li>
	 *                      <li>`name` is already in use by the value being validated or
	 *                      the validator context</li>
	 *                      <li>the collection consists of the same elements as `unwanted`,
	 *                      irrespective of their order</li>
	 *                    </ul>
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	doesNotContainExactly(unwanted: Set<E>, name: string): this;

	/**
	 * Ensures that the collection consists of the same elements as `expected`, irrespective of
	 * their order.
	 * <p>
	 * In contrast, {@link ValidatorComponent.isEqualTo|isEqualTo()} requires the same element ordering.
	 *
	 * @param expected - the desired elements
	 * @param name     - the name of the expected collection
	 * @returns this
	 * @throws TypeError  if the value or any of the arguments are `undefined` or `null`
	 * @throws RangError if:
	 *                   <ul>
	 *                     <li>`name` is empty</li>
	 *                     <li>`name` contains whitespace</li>
	 *                     <li>`name` is already in use by the value being validated or
	 *                     the validator context</li>
	 *                     <li>the collection and `expected` contain different elements,
	 *                     irrespective of their order</li>
	 *                   </ul>
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	containsExactly(expected: E[], name: string): this;

	/**
	 * Ensures that the collection and `unwanted` consist of different elements, irrespective of their
	 * order.
	 *
	 * @param unwanted - the unwanted elements
	 * @param name     - the name of the unwanted collection
	 * @returns this
	 * @throws TypeError  if the value or any of the arguments are `undefined` or `null`
	 * @throws RangeError if:
	 *                    <ul>
	 *                      <li>`name` is empty</li>
	 *                      <li>`name` contains whitespace</li>
	 *                      <li>`name` is already in use by the value being validated or
	 *                      the validator context</li>
	 *                      <li>the collection consists of the same elements as `unwanted`,
	 *                      irrespective of their order</li>
	 *                    </ul>
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	doesNotContainExactly(unwanted: E[], name: string): this;

	/**
	 * Ensures that the collection contains any elements in `expected`.
	 *
	 * @param expected - the desired elements
	 * @returns this
	 * @throws TypeError  if the value or `expected` are `undefined` or `null`
	 * @throws RangeError if the collection does not contain any element in `expected`
	 */
	containsAny(expected: Set<E>): this;

	/**
	 * Ensures that the collection does not contain any of the elements in `unwanted`.
	 *
	 * @param unwanted - the unwanted elements
	 * @returns this
	 * @throws TypeError  if the value or `unwanted` are `undefined` or `null`
	 * @throws RangeError if the collection contains any of the elements in `unwanted`
	 */
	doesNotContainAny(unwanted: Set<E>): this;

	/**
	 * Ensures that the collection contains any elements in `expected`.
	 *
	 * @param expected - the desired elements
	 * @returns this
	 * @throws TypeError  if the value or `expected` are `undefined` or `null`
	 * @throws RangeError if the collection does not contain any element in `expected`
	 */
	containsAny(expected: E[]): this;

	/**
	 * Ensures that the collection does not contain any of the elements in `unwanted`.
	 *
	 * @param unwanted - the unwanted elements
	 * @returns this
	 * @throws TypeError  if the value or `unwanted` are `undefined` or `null`
	 * @throws RangeError if the collection contains any of the elements in `unwanted`
	 */
	doesNotContainAny(unwanted: E[]): this;

	/**
	 * Ensures that the collection contains at least one element in `expected`.
	 *
	 * @param expected - the desired elements
	 * @param name     - the name of the expected collection
	 * @returns this
	 * @throws TypeError  if the value or any of the arguments are `undefined` or `null`
	 * @throws RangeError if:
	 *                    <ul>
	 *                      <li>`name` is empty</li>
	 *                      <li>`name` contains whitespace</li>
	 *                      <li>`name` is already in use by the value being validated or
	 *                      the validator context</li>
	 *                      <li>the collection does not contain any element in `expected`</li>
	 *                    </ul>
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	containsAny(expected: Set<E>, name: string): this;

	/**
	 * Ensures that the collection does not contain any of the elements in `unwanted`.
	 *
	 * @param unwanted - the unwanted elements
	 * @param name     - the name of the unwanted collection
	 * @returns this
	 * @throws TypeError  if the value or any of the arguments are `undefined` or `null`
	 * @throws RangeError if:
	 *                    <ul>
	 *                      <li>`name` is empty</li>
	 *                      <li>`name` contains whitespace</li>
	 *                      <li>`name` is already in use by the value being validated or
	 *                      the validator context</li>
	 *                      <li>the collection contains any of the elements in `unwanted`</li>
	 *                    </ul>
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	doesNotContainAny(unwanted: Set<E>, name: string): this;

	/**
	 * Ensures that the collection contains at least one element in `expected`.
	 *
	 * @param expected - the desired elements
	 * @param name     - the name of the expected collection
	 * @returns this
	 * @throws TypeError  if the value or any of the arguments are `undefined` or `null`
	 * @throws RangeError if:
	 *                    <ul>
	 *                      <li>`name` is empty</li>
	 *                      <li>`name` contains whitespace</li>
	 *                      <li>`name` is already in use by the value being validated or
	 *                      the validator context</li>
	 *                      <li>the collection does not contain any element in `expected`</li>
	 *                    </ul>
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	containsAny(expected: E[], name: string): this;

	/**
	 * Ensures that the collection does not contain any of the elements in `unwanted`.
	 *
	 * @param unwanted - the unwanted elements
	 * @param name     - the name of the unwanted collection
	 * @returns this
	 * @throws TypeError  if the value or any of the arguments are `undefined` or `null`
	 * @throws RangeError if:
	 *                    <ul>
	 *                      <li>`name` is empty</li>
	 *                      <li>`name` contains whitespace</li>
	 *                      <li>`name` is already in use by the value being validated or
	 *                      the validator context</li>
	 *                      <li>the collection contains any of the elements in `unwanted`</li>
	 *                    </ul>
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	doesNotContainAny(unwanted: E[], name: string): this;

	/**
	 * Ensures that the collection contains all the elements in `expected`.
	 *
	 * @param expected - the desired elements
	 * @returns this
	 * @throws TypeError  if the value or `expected` are `undefined` or `null`
	 * @throws RangeError if the collection does not contain all the elements in `expected`
	 */
	containsAll(expected: Set<E>): this;

	/**
	 * Allows the collection to contain some, but not all, elements from a collection.
	 *
	 * @param unwanted - the unwanted elements
	 * @returns this
	 * @throws TypeError  if the value or `unwanted` are `undefined` or `null`
	 * @throws RangeError if the collection contains all the elements of `unwanted`
	 */
	doesNotContainAll(unwanted: Set<E>): this;

	/**
	 * Ensures that the collection contains all the elements in `expected`.
	 *
	 * @param expected - the desired elements
	 * @returns this
	 * @throws TypeError  if the value or `expected` are `undefined` or `null`
	 * @throws RangeError if the collection does not contain all the elements in `expected`
	 */
	containsAll(expected: E[]): this;

	/**
	 * Allows the collection to contain some, but not all, elements from a collection.
	 *
	 * @param unwanted - the unwanted elements
	 * @returns this
	 * @throws TypeError  if the value or `unwanted` are `undefined` or `null`
	 * @throws RangeError if the collection contains all the elements of `unwanted`
	 */
	doesNotContainAll(unwanted: E[]): this;

	/**
	 * Ensures that the collection contains all the elements in `expected`.
	 *
	 * @param expected - the desired elements
	 * @param name     - the name of the expected collection
	 * @returns this
	 * @throws TypeError  if the value or any of the arguments are `undefined` or `null`
	 * @throws RangeError if:
	 *                    <ul>
	 *                      <li>`name` is empty</li>
	 *                      <li>`name` contains whitespace</li>
	 *                      <li>`name` is already in use by the value being validated or
	 *                      the validator context</li>
	 *                      <li>the collection does not contain all elements in `expected`</li>
	 *                    </ul>
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	containsAll(expected: Set<E>, name: string): this;

	/**
	 * Allows the collection to contain some, but not all, elements from a collection.
	 *
	 * @param unwanted - the unwanted elements
	 * @param name     - the name of the unwanted collection
	 * @returns this
	 * @throws TypeError  if the value or any of the arguments are `undefined` or `null`
	 * @throws RangeError if:
	 *                    <ul>
	 *                      <li>`name` is empty</li>
	 *                      <li>`name` contains whitespace</li>
	 *                      <li>`name` is already in use by the value being validated or
	 *                      the validator context</li>
	 *                      <li>the collection contains all the elements in `unwanted`</li>
	 *                    </ul>
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	doesNotContainAll(unwanted: Set<E>, name: string): this;

	/**
	 * Ensures that the collection contains all the elements in `expected`.
	 *
	 * @param expected - the desired elements
	 * @param name     - the name of the expected collection
	 * @returns this
	 * @throws TypeError  if the value or any of the arguments are `undefined` or `null`
	 * @throws RangeError if:
	 *                    <ul>
	 *                      <li>`name` is empty</li>
	 *                      <li>`name` contains whitespace</li>
	 *                      <li>`name` is already in use by the value being validated or
	 *                      the validator context</li>
	 *                      <li>the collection does not contain all elements in `expected`</li>
	 *                    </ul>
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	containsAll(expected: E[], name: string): this;

	/**
	 * Allows the collection to contain some, but not all, elements from a collection.
	 *
	 * @param unwanted - the unwanted elements
	 * @param name     - the name of the unwanted collection
	 * @returns this
	 * @throws TypeError  if the value or any of the arguments are `undefined` or `null`
	 * @throws RangeError if:
	 *                    <ul>
	 *                      <li>`name` is empty</li>
	 *                      <li>`name` contains whitespace</li>
	 *                      <li>`name` is already in use by the value being validated or
	 *                      the validator context</li>
	 *                      <li>the collection contains all the elements in `unwanted`</li>
	 *                    </ul>
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	doesNotContainAll(unwanted: E[], name: string): this;

	/**
	 * Ensures that the collection contains only `null` values or only non-`null` values.
	 *
	 * @returns this
	 * @throws TypeError if the value is `undefined` or `null`
	 * @throws RangeError if the collection contains `undefined` or a mix of `null` and non-`null` values
	 */
	containsSameNullity(): this;

	/**
	 * Ensures that the collection does not contain any duplicate elements.
	 *
	 * @returns this
	 * @throws TypeError  if the value is `undefined` or `null`
	 * @throws RangeError if the collection contains any duplicate elements
	 */
	doesNotContainDuplicates(): this;

	/**
	 * Returns a validator for the collection's size.
	 *
	 * @returns a validator for the collection's size
	 * @throws TypeError if the value is `undefined` or `null`
	 */
	size(): UnsignedNumberValidator;
}

export type {CollectionComponent};