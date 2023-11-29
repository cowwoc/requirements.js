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
interface ObjectValidator<T> extends ExtensibleObjectValidator<ObjectValidator<T>, T>
{
}

export {type ObjectValidator};