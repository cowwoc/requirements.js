import ObjectVerifier from "./internal/circular_dependency/ObjectVerifierBase.js";
import ArrayVerifier from "./ArrayVerifier.js";
import InetAddressVerifier from "./InetAddressVerifier.js";
import MapVerifier from "./MapVerifier.js";
import NumberVerifier from "./NumberVerifier.js";
import SetVerifier from "./SetVerifier.js";
import StringVerifier from "./StringVerifier.js";
import UriVerifier from "./UriVerifier.js";
import ClassVerifier from "./ClassVerifier.js";
import Objects from "./internal/Objects";

// Avoid circular dependencies by doing the following:
// * Declare the class without methods that trigger circular dependencies
// * Load the dependencies
// * Add the missing methods

/**
 * @return {StringVerifier} a verifier for the object's string representation
 */
ObjectVerifier.prototype.asString = function()
{
	const newValidator = this.validator.asString();
	return this.validationResult(() => new StringVerifier(newValidator));
};

/**
 * @param {Function} consumer a function that accepts a {@link StringVerifier} for the string representation
 *   of the actual value
 * @return {ObjectVerifier} the updated verifier
 * @throws {TypeError} if <code>consumer</code> is not set
 */
ObjectVerifier.prototype.asStringConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.asString());
	return this;
};

/**
 * @return {ArrayVerifier} a verifier for the <code>Array</code>
 * @throws {TypeError} if the actual value is not an <code>Array</code>
 */
ObjectVerifier.prototype.asArray = function()
{
	const newValidator = this.validator.asArray();
	return this.validationResult(() => new ArrayVerifier(newValidator));
};

/**
 * @param {Function} consumer a function that accepts a {@link ArrayVerifier} for the actual value
 * @return {ObjectVerifier} the updated verifier
 * @throws {TypeError} if <code>consumer</code> is not set; if the actual value is not an <code>Array</code>
 */
ObjectVerifier.prototype.asArrayConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.asArray());
	return this;
};

/**
 * @return {NumberVerifier} a verifier for the <code>Number</code>
 * @throws {TypeError} if the actual value is not a <code>Number</code>
 */
ObjectVerifier.prototype.asNumber = function()
{
	const newValidator = this.validator.asNumber();
	return this.validationResult(() => new NumberVerifier(newValidator));
};

/**
 * @param {Function} consumer a function that accepts a {@link NumberVerifier} for the actual value
 * @return {ObjectVerifier} the updated verifier
 * @throws {TypeError} if <code>consumer</code> is not set; if the actual value is not a <code>Number</code>
 */
ObjectVerifier.prototype.asNumberConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.asNumber());
	return this;
};

/**
 * @return {SetVerifier} a verifier for the <code>Set</code>
 * @throws {TypeError} if the actual value is not a <code>Set</code>
 */
ObjectVerifier.prototype.asSet = function()
{
	const newValidator = this.validator.asSet();
	return this.validationResult(() => new SetVerifier(newValidator));
};

/**
 * @param {Function} consumer a function that accepts a {@link SetVerifier} for the actual value
 * @return {ObjectVerifier} the updated verifier
 * @throws {TypeError} if <code>consumer</code> is not set; if the actual value is not a <code>Set</code>
 */
ObjectVerifier.prototype.asSetConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.asSet());
	return this;
};


/**
 * @return {MapVerifier} a verifier for the <code>Map</code>
 * @throws {TypeError} if the actual value is not a <code>Map</code>
 */
ObjectVerifier.prototype.asMap = function()
{
	const newValidator = this.validator.asMap();
	return this.validationResult(() => new MapVerifier(newValidator));
};

/**
 * @param {Function} consumer a function that accepts a {@link MapVerifier} for the actual value
 * @return {ObjectVerifier} the updated verifier
 * @throws {TypeError} if <code>consumer</code> is not set; if the actual value is not a <code>Map</code>
 */
ObjectVerifier.prototype.asMapConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.asMap());
	return this;
};

/**
 * @return {InetAddressVerifier} a verifier for the value's Internet address representation
 * @throws {RangeError} if the actual value does not contain a valid Internet address format
 */
ObjectVerifier.prototype.asInetAddress = function()
{
	const newValidator = this.validator.asInetAddress();
	return this.validationResult(() => new InetAddressVerifier(newValidator));
};

/**
 * @param {Function} consumer a function that accepts an {@link InetAddressVerifier} for the value's Internet
 *   address representation
 * @return {StringVerifier} the updated verifier
 * @throws {TypeError} if <code>consumer</code> is not set
 * @throws {RangeError} if the actual value does not contain a valid Internet address format
 */
ObjectVerifier.prototype.asInetAddressConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.asInetAddress());
	return this;
};

/**
 * @return {UriVerifier} a verifier for the <code>URI</code>
 */
ObjectVerifier.prototype.asUri = function()
{
	const newValidator = this.validator.asUri();
	return this.validationResult(() => new UriVerifier(newValidator));
};

/**
 * @param {Function} consumer a function that accepts a {@link UriVerifier} for the URI representation of the
 *   actual value
 * @return {ObjectVerifier} the updated verifier
 * @throws {TypeError} if <code>consumer</code> is not set
 */
ObjectVerifier.prototype.asUriConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.asUri());
	return this;
};

/**
 * @return {ClassVerifier} a verifier for the object's class representation
 */
ObjectVerifier.prototype.asClass = function()
{
	const newValidator = this.validator.asClass();
	return this.validationResult(() => new ClassVerifier(newValidator));
};

/**
 * @param {Function} consumer a function that accepts a {@link ClassVerifier} for the class representation of
 *   the actual value
 * @return {ObjectVerifier} the updated verifier
 * @throws {TypeError} if <code>consumer</code> is not set
 */
ObjectVerifier.prototype.asClassConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.asClass());
	return this;
};

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ObjectVerifier as default};