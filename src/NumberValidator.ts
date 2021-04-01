import type {ExtensibleNumberValidator} from "./internal/internal";

/**
 * Validates the requirements of a <code>number</code>.
 *
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 *
 * Verifiers and Validators contain corresponding methods. Some exceptions are thrown by both methods.
 * The remaining exceptions that are thrown by the verifier are wrapped as validation failures and are
 * returned by {@link #getFailures}.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NumberValidator extends ExtensibleNumberValidator<NumberValidator>
{
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {NumberValidator as default};