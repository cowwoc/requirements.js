import type {
	ClassConstructor,
	ValidatorComponent
} from "../internal/internal.mjs";

/**
 * Validates the state of a type.
 *
 * @typeParam T - the type of the class
 */
interface ClassValidator<T> extends ValidatorComponent<ClassValidator<T>, ClassConstructor<T>>
{
	/**
	 * Ensures that the value is a primitive type.
	 *
	 * @returns this
	 * @throws TypeError if the value is null
	 * @throws RangeError if value is not a primitive type
	 */
	isPrimitive(): ClassValidator<T>;

	/**
	 * Ensures that the actual value is the specified type, or a subtype.
	 *
	 * @typeParam U - the child type
	 * @param type - the child type
	 * @returns the updated validator
	 */
	isSupertypeOf<U>(type: ClassConstructor<U>): ClassValidator<U>;

	/**
	 * Ensures that the actual value is the specified type, or a subtype.
	 *
	 * @typeParam U - the parent type
	 * @param type - the parent type
	 * @returns the updated validator
	 */
	isSubtypeOf<U>(type: ClassConstructor<U>): ClassValidator<U>;
}

export {type ClassValidator};