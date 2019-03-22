import ObjectVerifier from "./internal/ObjectVerifier";
// internal/ObjectVerifier must be loaded before all other imports to avoid circular dependencies
import ArrayVerifier from "./ArrayVerifier";
import InetAddressVerifier from "./InetAddressVerifier";
import MapVerifier from "./MapVerifier";
import NumberVerifier from "./NumberVerifier";
import SetVerifier from "./SetVerifier";
import StringVerifier from "./StringVerifier";
import URI from "urijs";
import UriVerifier from "./UriVerifier";
import Utilities from "./Utilities";

/**
 * @return {StringVerifier} a verifier for the object's string representation
 */
ObjectVerifier.prototype.asString = function()
{
	return new StringVerifier(this.config, Utilities.toString(this.actual), this.name + ".asString()");
};

/**
 * @param {Function} consumer a function that accepts a {@link StringVerifier} for the string representation of the
 *   actual value
 * @return {ObjectVerifier} this
 * @throws {TypeError} if <code>consumer</code> is not set
 */
ObjectVerifier.prototype.asStringConsumer = function(consumer)
{
	this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
	consumer(this.asString());
	return this;
};

/**
 * @return {ArrayVerifier} a verifier for the <code>Array</code>
 * @throws {TypeError} if the actual value is not an <code>Array</code>
 */
ObjectVerifier.prototype.asArray = function()
{
	const actualType = Utilities.getTypeOf(this.actual);
	if (actualType === "Array")
		return new ArrayVerifier(this.config, this.actual, this.name);
	throw new TypeError("actual must be an Array.\n" +
		"Actual: " + actualType);
};

/**
 * @param {Function} consumer a function that accepts a {@link ArrayVerifier} for the actual value
 * @return {ObjectVerifier} this
 * @throws {TypeError} if <code>consumer</code> is not set; if the actual value is not an <code>Array</code>
 */
ObjectVerifier.prototype.asArrayConsumer = function(consumer)
{
	this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
	consumer(this.asArray());
	return this;
};

/**
 * @return {NumberVerifier} a verifier for the <code>Number</code>
 * @throws {TypeError} if the actual value is not a <code>Number</code>
 */
ObjectVerifier.prototype.asNumber = function()
{
	const actualType = Utilities.getTypeOf(this.actual);
	if (actualType === "Number")
		return new NumberVerifier(this.config, this.actual, this.name);
	throw new TypeError("actual must be a Number.\n" +
		"Actual: " + actualType);
};

/**
 * @param {Function} consumer a function that accepts a {@link NumberVerifier} for the actual value
 * @return {ObjectVerifier} this
 * @throws {TypeError} if <code>consumer</code> is not set; if the actual value is not a <code>Number</code>
 */
ObjectVerifier.prototype.asNumberConsumer = function(consumer)
{
	this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
	consumer(this.asNumber());
	return this;
};

/**
 * @return {SetVerifier} a verifier for the <code>Set</code>
 * @throws {TypeError} if the actual value is not a <code>Set</code>
 */
ObjectVerifier.prototype.asSet = function()
{
	const actualType = Utilities.getTypeOf(this.actual);
	if (actualType === "Set")
		return new SetVerifier(this.config, this.actual, this.name);
	throw new TypeError("actual must be a Set.\n" +
		"Actual: " + actualType);
};

/**
 * @param {Function} consumer a function that accepts a {@link SetVerifier} for the actual value
 * @return {ObjectVerifier} this
 * @throws {TypeError} if <code>consumer</code> is not set; if the actual value is not a <code>Set</code>
 */
ObjectVerifier.prototype.asSetConsumer = function(consumer)
{
	this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
	consumer(this.asSet());
	return this;
};


/**
 * @return {MapVerifier} a verifier for the <code>Map</code>
 * @throws {TypeError} if the actual value is not a <code>Map</code>
 */
ObjectVerifier.prototype.asMap = function()
{
	const actualType = Utilities.getTypeOf(this.actual);
	if (actualType === "Map")
		return new MapVerifier(this.config, this.actual, this.name);
	throw new TypeError("actual must be a Map.\n" +
		"Actual: " + actualType);
};

/**
 * @param {Function} consumer a function that accepts a {@link MapVerifier} for the actual value
 * @return {ObjectVerifier} this
 * @throws {TypeError} if <code>consumer</code> is not set; if the actual value is not a <code>Map</code>
 */
ObjectVerifier.prototype.asMapConsumer = function(consumer)
{
	this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
	consumer(this.asMap());
	return this;
};


/**
 * @return {InetAddressVerifier} a verifier for the value's Internet address representation
 * @throws {RangeError} if the actual value does not contain a valid Internet address format
 */
ObjectVerifier.prototype.asInetAddress = function()
{
	return new InetAddressVerifier(this.config, this.actual, this.name);
};

/**
 * @param {Function} consumer a function that accepts an {@link InetAddressVerifier} for the value's Internet
 * address representation
 * @return {StringVerifier} this
 * @throws {TypeError} if <code>consumer</code> is not set
 * @throws {RangeError} if the actual value does not contain a valid Internet address format
 */
ObjectVerifier.prototype.asInetAddressConsumer = function(consumer)
{
	this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
	consumer(this.asInetAddress());
	return this;
};

/**
 * @return {UriVerifier} a verifier for the <code>URI</code>
 */
ObjectVerifier.prototype.asUri = function()
{
	return new UriVerifier(this.config, new URI(this.actual), this.name);
};

/**
 * @param {Function} consumer a function that accepts a {@link UriVerifier} for the URI representation of the actual
 * value
 * @return {ObjectVerifier} this
 * @throws {TypeError} if <code>consumer</code> is not set
 */
ObjectVerifier.prototype.asUriConsumer = function(consumer)
{
	this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
	consumer(this.asUri());
	return this;
};

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {ObjectVerifier as default};