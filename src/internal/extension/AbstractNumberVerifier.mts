import {
	AbstractObjectVerifier,
	type ExtensibleNumberValidator,
	type ExtensibleNumberVerifier
} from "../internal.mjs";

/**
 * Extensible implementation of <code>ExtensibleNumberVerifier</code>.
 *
 * @typeParam S - the type of validator returned by the methods
 */
abstract class AbstractNumberVerifier<S, V extends ExtensibleNumberValidator<V>>
	extends AbstractObjectVerifier<S, V>
	implements ExtensibleNumberVerifier<S>
{
	isNegative(): S
	{
		this.validator.isNegative();
		return this.validationResult(() => this.getThis());
	}

	isNotNegative(): S
	{
		this.validator.isNotNegative();
		return this.validationResult(() => this.getThis());
	}

	isZero(): S
	{
		this.validator.isZero();
		return this.validationResult(() => this.getThis());
	}

	isNotZero(): S
	{
		this.validator.isNotZero();
		return this.validationResult(() => this.getThis());
	}

	isPositive(): S
	{
		this.validator.isPositive();
		return this.validationResult(() => this.getThis());
	}

	isNotPositive(): S
	{
		this.validator.isNotPositive();
		return this.validationResult(() => this.getThis());
	}

	isGreaterThan(value: number, name?: string): S
	{
		this.validator.isGreaterThan(value, name);
		return this.validationResult(() => this.getThis());
	}

	isGreaterThanOrEqualTo(value: number, name?: string): S
	{
		this.validator.isGreaterThanOrEqualTo(value, name);
		return this.validationResult(() => this.getThis());
	}

	isLessThan(value: number, name?: string): S
	{
		this.validator.isLessThan(value, name);
		return this.validationResult(() => this.getThis());
	}

	isLessThanOrEqualTo(value: number, name?: string): S
	{
		this.validator.isLessThanOrEqualTo(value, name);
		return this.validationResult(() => this.getThis());
	}

	isBetween(startInclusive: number, endExclusive: number): S
	{
		this.validator.isBetween(startInclusive, endExclusive);
		return this.validationResult(() => this.getThis());
	}

	isBetweenClosed(startInclusive: number, endInclusive: number): S
	{
		this.validator.isBetweenClosed(startInclusive, endInclusive);
		return this.validationResult(() => this.getThis());
	}

	isNumber(): S
	{
		this.validator.isNumber();
		return this.validationResult(() => this.getThis());
	}

	isNotNumber(): S
	{
		this.validator.isNotNumber();
		return this.validationResult(() => this.getThis());
	}

	isFinite(): S
	{
		this.validator.isFinite();
		return this.validationResult(() => this.getThis());
	}

	isNotFinite(): S
	{
		this.validator.isNotFinite();
		return this.validationResult(() => this.getThis());
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