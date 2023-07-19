import type {ExtensibleObjectValidator} from "./internal/internal.mjs";

/**
 * Validates the requirements of an object.
 *
 * Verifier and Validator methods are equivalent.
 * Validators return validation failures through the
 * {@link ExtensibleObjectValidator.getFailures | getFailures()} method, while Verifiers throw them as
 * exceptions.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ObjectValidator extends ExtensibleObjectValidator<ObjectValidator>
{
}

export {type ObjectValidator};