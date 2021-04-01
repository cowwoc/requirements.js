import {
	AbstractObjectVerifier,
	ExtensibleNumberValidator,
	ExtensibleNumberVerifier
} from "../internal";

/**
 * Extensible implementation of <code>ExtensibleNumberVerifier</code>.
 */
abstract class AbstractNumberVerifier<S, V extends ExtensibleNumberValidator<V>>
	extends AbstractObjectVerifier<S, V>
	implements ExtensibleNumberVerifier<S>
{
	isNegative(): S
	{
		this.validator.isNegative();
		return this.validationResult();
	}

	isNotNegative(): S
	{
		this.validator.isNotNegative();
		return this.validationResult();
	}

	isZero(): S
	{
		this.validator.isZero();
		return this.validationResult();
	}

	isNotZero(): S
	{
		this.validator.isNotZero();
		return this.validationResult();
	}

	isPositive(): S
	{
		this.validator.isPositive();
		return this.validationResult();
	}

	isNotPositive(): S
	{
		this.validator.isNotPositive();
		return this.validationResult();
	}

	isGreaterThan(value: number, name?: string): S
	{
		this.validator.isGreaterThan(value, name);
		return this.validationResult();
	}

	isGreaterThanOrEqualTo(value: number, name?: string): S
	{
		this.validator.isGreaterThanOrEqualTo(value, name);
		return this.validationResult();
	}

	isLessThan(value: number, name?: string): S
	{
		this.validator.isLessThan(value, name);
		return this.validationResult();
	}

	isLessThanOrEqualTo(value: number, name?: string): S
	{
		this.validator.isLessThanOrEqualTo(value, name);
		return this.validationResult();
	}

	isBetween(startInclusive: number, endExclusive: number): S
	{
		this.validator.isBetween(startInclusive, endExclusive);
		return this.validationResult();
	}

	isBetweenClosed(startInclusive: number, endInclusive: number): S
	{
		this.validator.isBetweenClosed(startInclusive, endInclusive);
		return this.validationResult();
	}

	isNumber(): S
	{
		this.validator.isNumber();
		return this.validationResult();
	}

	isNotNumber(): S
	{
		this.validator.isNotNumber();
		return this.validationResult();
	}

	isFinite(): S
	{
		this.validator.isFinite();
		return this.validationResult();
	}

	isNotFinite(): S
	{
		this.validator.isNotFinite();
		return this.validationResult();
	}

	getActual(): number
	{
		return super.getActual() as number;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {AbstractNumberVerifier as default};