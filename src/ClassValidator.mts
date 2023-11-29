import type {
	ExtensibleObjectValidator,
	ClassConstructor
} from "./internal/internal.mjs";

/**
 * Validates the requirements of a type.
 *
 * Verifier and Validator methods are equivalent.
 * Validators return validation failures through the
 * {@link ExtensibleObjectValidator.getFailures | getFailures()} method, while Verifiers throw them as
 * exceptions.
 *
 * All methods (except those found in {@link ObjectValidator}) assume that the actual value is not null.
 *
 * @typeParam T - the type of the class
 */
interface ClassValidator<T> extends ExtensibleObjectValidator<ClassValidator<T>, ClassConstructor<T>>
{
	/**
	 * Ensures that the actual value is the specified type, or a subtype.
	 *
	 * @param type -the type to compare to
	 * @returns the updated validator
	 */
	isSupertypeOf<T2>(type: ClassConstructor<T2>): ClassValidator<T>;

	/**
	 * Ensures that the actual value is the specified type, or a subtype.
	 *
	 * @param type -the type to compare to
	 * @returns the updated validator
	 */
	isSubtypeOf<T2>(type: ClassConstructor<T2>): ClassValidator<T>;

	/**
	 * {@inheritDoc}
	 */
	getActual(): ClassConstructor<T> | undefined;
}

export {type ClassValidator};