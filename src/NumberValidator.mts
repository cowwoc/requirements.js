import type {ExtensibleNumberValidator} from "./internal/internal.mjs";

/**
 * Validates the requirements of a <code>number</code>.
 *
 * Verifier and Validator methods are equivalent.
 * Validators return validation failures through the {@link getFailures} method, while Verifiers throw them
 * as exceptions.
 *
 * All methods (except those found in {@link ObjectValidator}) imply {@link isNotNull}.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NumberValidator extends ExtensibleNumberValidator<NumberValidator>
{
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {type NumberValidator as default};