import ArrayVerifier from "./ArrayVerifier";
import InetAddressVerifier from "./InetAddressVerifier";
import MapVerifier from "./MapVerifier";
import NumberVerifier from "./NumberVerifier";
import ObjectVerifier from "./internal/ObjectVerifier";
import SetVerifier from "./SetVerifier";
import StringVerifier from "./StringVerifier";
import URI from "urijs";
import UriVerifier from "./UriVerifier";
import Utilities from "./Utilities";

// DESIGN:
// * ObjectVerifierSuperclass declares ObjectVerifier without any circular dependencies.
// * First we load ObjectVerifierSuperclass.
// * Next we load the circular dependencies (classes that depend on ObjectVerifier and vice-versa).
// * Finally, we add methods to ObjectVerifier that reference the circular dependencies.

/**
 * @return {StringVerifier} a verifier for the object's string representation
 */
ObjectVerifier.prototype.asString = function()
{
	return new StringVerifier(this.config, Utilities.toString(this.actual), this.name + ".asString()");
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
 * @return {InetAddressVerifier} a verifier for the value's Internet address representation
 * @throws {RangeError} if the actual value does not contain a valid Internet address format
 */
ObjectVerifier.prototype.asInetAddress = function()
{
	return new InetAddressVerifier(this.config, this.actual, this.name);
};

/**
 * @return {UriVerifier} a verifier for the <code>URI</code>
 */
ObjectVerifier.prototype.asUri = function()
{
	return new UriVerifier(this.config, new URI(this.actual), this.name);
};

export default ObjectVerifier;