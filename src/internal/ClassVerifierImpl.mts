import type {
	ClassValidator,
	ClassVerifier,
	ClassConstructor
} from "./internal.mjs";
import {AbstractObjectVerifier} from "./internal.mjs";

/**
 * Default implementation of <code>ClassVerifier</code>.
 */
class ClassVerifierImpl<T>
	extends AbstractObjectVerifier<ClassVerifier<T>, ClassValidator<T>, ClassConstructor<T>>
	implements ClassVerifier<T>
{
	/**
	 * Creates a new ClassVerifierImpl.
	 *
	 * @param validator - the validator to delegate to
	 * @throws TypeError if <code>validator</code> is null or undefined
	 */
	constructor(validator: ClassValidator<T>)
	{
		super(validator);
	}

	isSupertypeOf<T2>(type: ClassConstructor<T2>): ClassVerifier<T>
	{
		this.validator.isSupertypeOf(type);
		return this.validationResult(() => this.getThis());
	}

	isSubtypeOf<T2>(type: ClassConstructor<T2>): ClassVerifier<T>
	{
		this.validator.isSubtypeOf(type);
		return this.validationResult(() => this.getThis());
	}
}

export {ClassVerifierImpl};