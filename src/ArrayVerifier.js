import ArrayVerifier from "./internal/circular_dependency/ArrayVerifierBase.js";
import SizeVerifier from "./SizeVerifier.js";
import Objects from "./internal/Objects";
import SetVerifier from "./SetVerifier.js";

/**
 * @return {SizeVerifier} a verifier for the length of the array
 */
ArrayVerifier.prototype.length = function()
{
	const newValidator = this.validator.length();
	return this.validationResult(() => new SizeVerifier(newValidator));
};

/**
 * @param {Function} consumer a function that accepts a {@link SizeVerifier} for the length of the
 *   array
 * @return {ArrayVerifier} the updated verifier
 * @throws {TypeError} if <code>consumer</code> is not set
 */
ArrayVerifier.prototype.lengthConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.length());
	return this;
};

/**
 * Verifies the Set representation of the array.
 *
 * @return {SetVerifier} a <code>Set</code> verifier
 */
ArrayVerifier.prototype.asSet = function()
{
	const newValidator = this.validator.asSet();
	return this.validationResult(() => new SetVerifier(newValidator));
};

/**
 * @param {Function} consumer a function that accepts a {@link SetVerifier} for the Set representation of
 *   the array
 * @return {ArrayVerifier} the updated verifier
 * @throws {TypeError} if <code>consumer</code> is not set
 */
ArrayVerifier.prototype.asSetConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.asSet());
	return this;
};

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ArrayVerifier as default};