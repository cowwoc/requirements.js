import ObjectValidator from "./internal/circular_dependency/ObjectValidatorBase.js";
import ValidationFailure from "./ValidationFailure.js";
import Objects from "./internal/Objects";
import UriValidatorNoOp from "./internal/UriValidatorNoOp.js";

/**
 * Validates the requirements of a <code>URI</code>.
 * <p>
 * All methods (except those found in {@link ObjectValidator}) imply {@link #isNotNull()}.
 */
class UriValidator extends ObjectValidator
{
	/**
	 * Ensures that the URI is absolute.
	 *
	 * @return {UriValidator|UriValidatorNoOp} the updated validator
	 */
	isAbsolute()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError.prototype, failureMessage);
			this.failures.push(failure);
			return new UriValidatorNoOp(this.failures);
		}
		if (!this.actual.is("absolute"))
		{
			const failure = new ValidationFailure(this.config, RangeError.prototype,
				this.name + " must be absolute: " + this.config.convertToString(this.actual));
			this.failures.push(failure);
		}
		return this;
	}

	/**
	 * Ensures that the URI is relative.
	 *
	 * @return {UriValidator|UriValidatorNoOp} the updated validator
	 */
	isRelative()
	{
		const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
		if (failureMessage !== null)
		{
			const failure = new ValidationFailure(this.config, TypeError.prototype, failureMessage);
			this.failures.push(failure);
			return new UriValidatorNoOp(this.failures);
		}
		if (!this.actual.is("relative"))
		{
			const failure = new ValidationFailure(this.config, RangeError.prototype,
				this.name + " must be relative: " + this.config.convertToString(this.actual));
			this.failures.push(failure);
		}
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {UriValidator as default};