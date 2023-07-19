import type {ExtensibleObjectVerifier} from "./internal/internal.mjs";

/**
 * Verifies the requirements of an object.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ObjectVerifier extends ExtensibleObjectVerifier<ObjectVerifier>
{
}

export {type ObjectVerifier};