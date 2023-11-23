import type {
	ClassValidator,
	ClassVerifier
} from "./internal.mjs";
import {AbstractObjectVerifier} from "./internal.mjs";

/**
 * Default implementation of <code>ClassVerifier</code>.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
class ClassVerifierImpl extends AbstractObjectVerifier<ClassVerifier, ClassValidator, Function>
	implements ClassVerifier
{
	/**
	 * Creates a new ClassVerifierImpl.
	 *
	 * @param validator - the validator to delegate to
	 * @throws TypeError if <code>validator</code> is null or undefined
	 */
	constructor(validator: ClassValidator)
	{
		super(validator);
	}

	protected getThis()
	{
		return this;
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	isSupertypeOf(type: Function)
	{
		this.validator.isSupertypeOf(type);
		return this.validationResult(() => this.getThis());
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	isSubtypeOf(type: Function)
	{
		this.validator.isSubtypeOf(type);
		return this.validationResult(() => this.getThis());
	}
}

export {ClassVerifierImpl};