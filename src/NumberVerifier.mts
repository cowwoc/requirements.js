import type {ExtensibleNumberVerifier} from "./internal/internal.mjs";

/**
 * Verifies the requirements of a <code>number</code>.
 * <p>
 * All methods (except those found in {@link ObjectVerifier}) imply {@link isNotNull}.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NumberVerifier extends ExtensibleNumberVerifier<NumberVerifier>
{
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {type NumberVerifier as default};