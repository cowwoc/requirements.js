import ObjectVerifierNoOp from "./circular_dependency/ObjectVerifierNoOpBase.js";
import InetAddressVerifierNoOp from "./InetAddressVerifierNoOp.js";
import MapVerifierNoOp from "./MapVerifierNoOp.js";
import NumberVerifierNoOp from "./NumberVerifierNoOp.js";
import SetVerifierNoOp from "./SetVerifierNoOp.js";
import StringVerifierNoOp from "./StringVerifierNoOp.js";
import UriVerifierNoOp from "./UriVerifierNoOp.js";
import ArrayVerifierNoOp from "./ArrayVerifierNoOp.js";
import ClassVerifierNoOp from "./ClassVerifierNoOp.js";

/**
 * @return {ArrayVerifierNoOp} a verifier for the <code>Array</code>
 */
ObjectVerifierNoOp.prototype.asArray = function()
{
	return ArrayVerifierNoOp.INSTANCE;
};

/**
 * @return {ObjectVerifierNoOp} the updated verifier
 */
ObjectVerifierNoOp.prototype.asArrayConsumer = function()
{
	return this;
};

/**
 * @return {StringVerifierNoOp} a verifier for the object's string representation
 */
ObjectVerifierNoOp.prototype.asString = function()
{
	return StringVerifierNoOp.INSTANCE;
};

/**
 * @return {ObjectVerifierNoOp} the updated verifier
 */
ObjectVerifierNoOp.prototype.asStringConsumer = function()
{
	return this;
};

/**
 * @return {NumberVerifierNoOp} a verifier for the <code>Number</code>
 */
ObjectVerifierNoOp.prototype.asNumber = function()
{
	return NumberVerifierNoOp.INSTANCE;
};

/**
 * @return {ObjectVerifierNoOp} the updated verifier
 */
ObjectVerifierNoOp.prototype.asNumberConsumer = function()
{
	return this;
};

/**
 * @return {SetVerifierNoOp} a verifier for the <code>Set</code>
 */
ObjectVerifierNoOp.prototype.asSet = function()
{
	return SetVerifierNoOp.INSTANCE;
};

/**
 * @return {ObjectVerifierNoOp} a verifier for the <code>Set</code>
 */
ObjectVerifierNoOp.prototype.asSetConsumer = function()
{
	return this;
};

/**
 * @return {MapVerifierNoOp} a verifier for the <code>Map</code>
 */
ObjectVerifierNoOp.prototype.asMap = function()
{
	return MapVerifierNoOp.INSTANCE;
};

/**
 * @return {ObjectVerifierNoOp} a verifier for the <code>Map</code>
 */
ObjectVerifierNoOp.prototype.asMapConsumer = function()
{
	return this;
};

/**
 * @return {InetAddressVerifierNoOp} a verifier for the value's Internet address representation
 */
ObjectVerifierNoOp.prototype.asInetAddress = function()
{
	return InetAddressVerifierNoOp.INSTANCE;
};

/**
 * @return {ObjectVerifierNoOp} the updated verifier
 */
ObjectVerifierNoOp.prototype.asInetAddressConsumer = function()
{
	return this;
};


/**
 * @return {UriVerifierNoOp} a verifier for the <code>URI</code>
 */
ObjectVerifierNoOp.prototype.asUri = function()
{
	return UriVerifierNoOp.INSTANCE;
};

/**
 * @return {ObjectVerifierNoOp} the updated verifier
 */
ObjectVerifierNoOp.prototype.asUriConsumer = function()
{
	return this;
};

/**
 * @return {ClassVerifierNoOp} a verifier for the object's class representation
 */
ObjectVerifierNoOp.prototype.asClass = function()
{
	return ClassVerifierNoOp.INSTANCE;
};

/**
 * @return {ObjectVerifierNoOp} the updated verifier
 * @throws {TypeError} if <code>consumer</code> is not set
 */
ObjectVerifierNoOp.prototype.asClassConsumer = function()
{
	return this;
};

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ObjectVerifierNoOp as default};