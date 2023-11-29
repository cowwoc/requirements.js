import type {
	ObjectVerifier,
	ExtensibleObjectVerifier,
	ClassConstructor
} from "./internal/internal.mjs";


const typedocWorkaround: null | ObjectVerifier<void> = null;
// noinspection PointlessBooleanExpressionJS
if (typedocWorkaround !== null)
	console.log("WORKAROUND: https://github.com/microsoft/tsdoc/issues/348");

/**
 * Verifies the requirements of a class.
 * <p>
 * All methods (except those found in {@link ObjectVerifier}) assume that the actual value is not null.
 *
 * @typeParam T - the type of the class
 */
interface ClassVerifier<T> extends ExtensibleObjectVerifier<ClassVerifier<T>, ClassConstructor<T>>
{
	/**
	 * Ensures that the actual value is the specified type, or a super-type.
	 *
	 * @param type -the type to compare to
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is not a supertype of <code>type</code>
	 */
	isSupertypeOf<T2>(type: ClassConstructor<T2>): ClassVerifier<T>;

	/**
	 * Ensures that the actual value is the specified type, or a subtype.
	 *
	 * @param type -the type to compare to
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is not a subtype of <code>type</code>
	 */
	isSubtypeOf<T2>(type: ClassConstructor<T2>): ClassVerifier<T>;

	/**
	 * {@inheritDoc}
	 */
	getActual(): ClassConstructor<T>;
}

export {type ClassVerifier};