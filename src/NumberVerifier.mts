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

export {type NumberVerifier};