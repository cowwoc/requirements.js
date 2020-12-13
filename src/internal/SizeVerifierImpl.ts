import {
	AbstractNumberVerifier,
	NumberValidator,
	SizeValidator,
	SizeVerifier
} from "./internal";

/**
 * Default implementation of <code>SizeVerifier</code>.
 */
class SizeVerifierImpl extends AbstractNumberVerifier<SizeVerifier, SizeValidator>
	implements SizeVerifier
{
	/**
	 * Creates a new SizeVerifierImpl.
	 *
	 * @param {object} validator the validator to delegate to
	 * @throws {TypeError} if <code>validator</code> is null or undefined
	 */
	constructor(validator: NumberValidator)
	{
		super(validator);
	}

	protected getThis(): SizeVerifier
	{
		return this;
	}

	isGreaterThanOrEqualTo(value: number, name?: string): SizeVerifier
	{
		this.validator.isGreaterThanOrEqualTo(value, name);
		return this.validationResult();
	}

	isGreaterThan(value: number, name?: string): SizeVerifier
	{
		this.validator.isGreaterThan(value, name);
		return this.validationResult();
	}

	isLessThanOrEqualTo(value: number, name?: string): SizeVerifier
	{
		this.validator.isLessThanOrEqualTo(value, name);
		return this.validationResult();
	}

	isLessThan(value: number, name?: string): SizeVerifier
	{
		this.validator.isLessThan(value, name);
		return this.validationResult();
	}

	isNotPositive(): SizeVerifier
	{
		this.validator.isNotPositive();
		return this.validationResult();
	}

	isPositive(): SizeVerifier
	{
		this.validator.isPositive();
		return this.validationResult();
	}

	isNotZero(): SizeVerifier
	{
		this.validator.isNotZero();
		return this.validationResult();
	}

	isZero(): SizeVerifier
	{
		this.validator.isZero();
		return this.validationResult();
	}

	isNotNegative(): SizeVerifier
	{
		this.validator.isNotNegative();
		return this.validationResult();
	}

	isNegative(): SizeVerifier
	{
		this.validator.isNegative();
		return this.validationResult();
	}

	isBetween(startInclusive: number, endExclusive: number): SizeVerifier
	{
		this.validator.isBetween(startInclusive, endExclusive);
		return this.validationResult();
	}

	isBetweenClosed(startInclusive: number, endInclusive: number): SizeVerifier
	{
		this.validator.isBetweenClosed(startInclusive, endInclusive);
		return this.validationResult();
	}

	isEqualTo(expected: unknown, name?: string): SizeVerifier
	{
		this.validator.isEqualTo(expected, name);
		return this.validationResult();
	}

	isNotEqualTo(value: unknown, name?: string): SizeVerifier
	{
		this.validator.isNotEqualTo(value, name);
		return this.validationResult();
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {SizeVerifierImpl as default};