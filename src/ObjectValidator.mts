import type {ExtensibleObjectValidator} from "./internal/internal.mjs";

/**
 * Validates the requirements of an object.
 *
 * Verifiers and Validators contain corresponding methods. Some exceptions are thrown by both methods.
 * The remaining exceptions that are thrown by the verifier are wrapped as validation failures and are
 * returned by {@link #getFailures}.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ObjectValidator extends ExtensibleObjectValidator<ObjectValidator>
{
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ObjectValidator as default};