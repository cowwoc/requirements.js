import type {
	ClassValidator,
	ClassVerifier
} from "./internal.mjs";
import {AbstractObjectVerifier} from "./internal.mjs";

/**
 * Default implementation of <code>ClassVerifier</code>.
 */
class ClassVerifierImpl extends AbstractObjectVerifier<ClassVerifier, ClassValidator>
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

	// eslint-disable-next-line @typescript-eslint/ban-types
	getActual()
	{
		// eslint-disable-next-line @typescript-eslint/ban-types
		return super.getActual() as Function;
	}
}

export {ClassVerifierImpl};