import type {
	ObjectValidator,
	ObjectVerifier
} from "./internal.mjs";
import {AbstractObjectVerifier} from "./internal.mjs";

/**
 * Default implementation of <code>ObjectVerifier</code>.
 *
 * @typeParam T - the type the actual value
 */
class ObjectVerifierImpl<V extends ObjectValidator<T>, T> extends AbstractObjectVerifier<ObjectVerifier<T>, ObjectValidator<T>, T>
	implements ObjectVerifier<T>
{
	/**
	 * Creates a new ObjectVerifier.
	 *
	 * @param validator - the validator to delegate to
	 * @throws TypeError if <code>validator</code> is null or undefined
	 */
	constructor(validator: V)
	{
		super(validator);
	}

	isEqualTo(expected: T, name?: string): ObjectVerifier<T>
	{
		this.validator.isEqualTo(expected, name);
		return this.validationResult(() => this.getThis());
	}

	isNotEqualTo(value: T, name?: string): ObjectVerifier<T>
	{
		this.validator.isNotEqualTo(value, name);
		return this.validationResult(() => this.getThis());
	}

	validationResult<T2>(result: () => T2): T2
	{
		if (result === null)
			throw new TypeError("result may not be null");

		const failures = this.validator.getFailures();
		if (failures.length === 0)
		{
			// eslint-disable-next-line no-undefined
			return result.apply(undefined);
		}
		const failure = failures[0];
		throw failure.createException();
	}
}

export {ObjectVerifierImpl};