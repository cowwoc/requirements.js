import type {
	NumberValidator,
	NumberVerifier
} from "./internal.mjs";
import {AbstractNumberVerifier} from "./internal.mjs";

/**
 * Default implementation of <code>NumberVerifier</code>.
 */
class NumberVerifierImpl extends AbstractNumberVerifier<NumberVerifier, NumberValidator>
	implements NumberVerifier
{
	/**
	 * Creates a new NumberVerifierImpl.
	 *
	 * @param validator - the validator to delegate to
	 * @throws TypeError if <code>validator</code> is null or undefined
	 */
	constructor(validator: NumberValidator)
	{
		super(validator);
	}

	protected getThis()
	{
		return this;
	}
}

export {NumberVerifierImpl};