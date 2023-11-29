import type {ExtensibleObjectVerifier} from "./internal/internal.mjs";

/**
 * Verifies the requirements of an object.
 *
 * @typeParam T - the type the actual value
 */
interface ObjectVerifier<T> extends ExtensibleObjectVerifier<ObjectVerifier<T>, T>
{
}

export {type ObjectVerifier};