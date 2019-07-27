import ArrayValidator from "./internal/circular_dependency/ArrayValidatorBase.js";
import ArrayValidatorNoOp from "./internal/circular_dependency/ArrayValidatorNoOpBase.js";
import Objects from "./internal/Objects.js";
import ValidationFailure from "./ValidationFailure.js";
import SizeValidator from "./SizeValidator.js";
import SizeValidatorNoOp from "./internal/SizeValidatorNoOp.js";
import SetValidator from "./SetValidator.js";
import SetValidatorNoOp from "./internal/SetValidatorNoOp.js";

/**
 * @return {SizeValidator|SizeValidatorNoOp} a validator for the length of the array
 */
ArrayValidator.prototype.length = function()
{
	const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
	if (failureMessage !== null)
	{
		const failure = new ValidationFailure(this.config, TypeError.prototype, failureMessage);
		this.failures.push(failure);
		return new SizeValidatorNoOp(this.failures);
	}
	return new SizeValidator(this.config, this.actual, this.name, this.actual.length, this.name + ".length",
		this.pluralizer);
};

/**
 * @param {Function} consumer a function that accepts a {@link SizeValidator} for the length of the
 *   array
 * @return {ArrayValidator|ArrayValidatorNoOp} the updated validator
 * @throws {TypeError} if <code>consumer</code> is not set
 */
ArrayValidator.prototype.lengthConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.length());
	return this;
};

/**
 * Verifies the Set representation of the array.
 *
 * @return {SetValidator|SetValidatorNoOp} a <code>Set</code> validator
 */
ArrayValidator.prototype.asSet = function()
{
	const failureMessage = Objects.validateThatValueIsSet(this.actual, this.name);
	if (failureMessage !== null)
	{
		const failure = new ValidationFailure(this.config, TypeError.prototype, failureMessage);
		this.failures.push(failure);
		return new SetValidatorNoOp(this.failures);
	}
	return new SetValidator(this.config, new Set(this.actual), this.name + ".asSet()");
};

/**
 * @param {Function} consumer a function that accepts a {@link SetValidator} for the Set representation of
 *   the array
 * @return {ArrayValidator} the updated validator
 * @throws {TypeError} if <code>consumer</code> is not set
 */
ArrayValidator.prototype.asSetConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.asSet());
	return this;
};

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayValidator as default};