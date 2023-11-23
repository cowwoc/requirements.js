import type {ExtensibleObjectVerifier} from "./internal/internal.mjs";

/**
 * Verifies the requirements of an object.
 *
 * @typeParam T - the type the actual value
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ObjectVerifier<T> extends ExtensibleObjectVerifier<ObjectVerifier<T>, T>
{
	/**
	 * {@inheritDoc}
	 */
	isNotNull(): ObjectVerifier<NonNullable<T>>;
}

export {type ObjectVerifier};