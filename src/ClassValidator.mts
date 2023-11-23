import type {ExtensibleObjectValidator} from "./internal/internal.mjs";

/**
 * Validates the requirements of a type.
 *
 * Verifier and Validator methods are equivalent.
 * Validators return validation failures through the
 * {@link ExtensibleObjectValidator.getFailures | getFailures()} method, while Verifiers throw them as
 * exceptions.
 *
 * All methods (except those found in {@link ObjectValidator}) imply {@link isNotNull}.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
interface ClassValidator extends ExtensibleObjectValidator<ClassValidator, Function>
{
	/**
	 * Ensures that the actual value is the specified type, or a subtype.
	 *
	 * @param type -the type to compare to
	 * @returns the updated validator
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isSupertypeOf(type: Function): ClassValidator;

	/**
	 * Ensures that the actual value is the specified type, or a subtype.
	 *
	 * @param type -the type to compare to
	 * @returns the updated validator
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	isSubtypeOf(type: Function): ClassValidator;

	/**
	 * {@inheritDoc}
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	getActual(): Function | undefined;
}

export {type ClassValidator};