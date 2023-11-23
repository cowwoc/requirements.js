import type {ExtensibleObjectValidator} from "./internal/internal.mjs";

/**
 * Validates the requirements of an object.
 *
 * Verifier and Validator methods are equivalent.
 * Validators return validation failures through the
 * {@link ExtensibleObjectValidator.getFailures | getFailures()} method, while Verifiers throw them as
 * exceptions.
 *
 * @typeParam T - the type the actual value
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ObjectValidator<T> extends ExtensibleObjectValidator<ObjectValidator<T>, T>
{
	/**
	 * {@inheritDoc}
	 */
	isNotNull(): ObjectValidator<NonNullable<T>>;
}

export {type ObjectValidator};