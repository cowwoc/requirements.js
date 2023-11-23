import type {
	BooleanValidator,
	BooleanVerifier
} from "./internal.mjs";
import {AbstractObjectVerifier} from "./internal.mjs";

/**
 * Default implementation of <code>BooleanVerifier</code>.
 */
class BooleanVerifierImpl extends AbstractObjectVerifier<BooleanVerifier, BooleanValidator, boolean>
	implements BooleanVerifier
{
	/**
	 * Creates a new BooleanVerifierImpl.
	 *
	 * @param validator - the validator to delegate to
	 * @throws TypeError if <code>validator</code> is null or undefined
	 */
	constructor(validator: BooleanValidator)
	{
		super(validator);
	}

	protected getThis(): BooleanVerifier
	{
		return this;
	}

	/**
	 * Ensures that the actual value is true.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is not true
	 */
	isTrue(): BooleanVerifier
	{
		this.validator.isTrue();
		return this.validationResult(() => this.getThis());
	}

	/**
	 * Ensures that the actual value is false.
	 *
	 * @returns the updated verifier
	 * @throws RangeError if the actual value is not false
	 */
	isFalse(): BooleanVerifier
	{
		this.validator.isFalse();
		return this.validationResult(() => this.getThis());
	}

	getActual(): boolean
	{
		return super.getActual() as boolean;
	}
}

export {BooleanVerifierImpl};