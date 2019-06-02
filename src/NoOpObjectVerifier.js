import NoOpObjectVerifier from "./internal/NoOpObjectVerifier";
// internal/NoOpObjectVerifier must be loaded before all other imports to avoid circular dependencies
import NoOpInetAddressVerifier from "./NoOpInetAddressVerifier";
import NoOpMapVerifier from "./NoOpMapVerifier";
import NoOpNumberVerifier from "./NoOpNumberVerifier";
import NoOpSetVerifier from "./NoOpSetVerifier";
import NoOpStringVerifier from "./NoOpStringVerifier";
import NoOpUriVerifier from "./NoOpUriVerifier";
import NoOpArrayVerifier from "./NoOpArrayVerifier";
import NoOpClassVerifier from "./NoOpClassVerifier";

/**
 * @return {NoOpArrayVerifier} a verifier for the <code>Array</code>
 */
NoOpObjectVerifier.prototype.asArray = function()
{
	return new NoOpArrayVerifier();
};

/**
 * @return {NoOpObjectVerifier} this
 */
NoOpObjectVerifier.prototype.asArrayConsumer = function()
{
	return this;
};

/**
 * @return {NoOpStringVerifier} a verifier for the object's string representation
 */
NoOpObjectVerifier.prototype.asString = function()
{
	return new NoOpStringVerifier();
};

/**
 * @return {NoOpObjectVerifier} this
 */
NoOpObjectVerifier.prototype.asStringConsumer = function()
{
	return this;
};

/**
 * @return {NoOpNumberVerifier} a verifier for the <code>Number</code>
 */
NoOpObjectVerifier.prototype.asNumber = function()
{
	return new NoOpNumberVerifier();
};

/**
 * @return {NoOpObjectVerifier} this
 */
NoOpObjectVerifier.prototype.asNumberConsumer = function()
{
	return this;
};

/**
 * @return {NoOpSetVerifier} a verifier for the <code>Set</code>
 */
NoOpObjectVerifier.prototype.asSet = function()
{
	return new NoOpSetVerifier();
};

/**
 * @return {NoOpObjectVerifier} a verifier for the <code>Set</code>
 */
NoOpObjectVerifier.prototype.asSetConsumer = function()
{
	return this;
};

/**
 * @return {NoOpMapVerifier} a verifier for the <code>Map</code>
 */
NoOpObjectVerifier.prototype.asMap = function()
{
	return new NoOpMapVerifier();
};

/**
 * @return {NoOpObjectVerifier} a verifier for the <code>Map</code>
 */
NoOpObjectVerifier.prototype.asMapConsumer = function()
{
	return this;
};

/**
 * @return {NoOpInetAddressVerifier} a verifier for the value's Internet address representation
 */
NoOpObjectVerifier.prototype.asInetAddress = function()
{
	return new NoOpInetAddressVerifier();
};

/**
 * @return {NoOpObjectVerifier} this
 */
NoOpObjectVerifier.prototype.asInetAddressConsumer = function()
{
	return this;
};


/**
 * @return {NoOpUriVerifier} a verifier for the <code>URI</code>
 */
NoOpObjectVerifier.prototype.asUri = function()
{
	return new NoOpUriVerifier();
};

/**
 * @return {NoOpObjectVerifier} this
 */
NoOpObjectVerifier.prototype.asUriConsumer = function()
{
	return this;
};

/**
 * @return {NoOpClassVerifier} a verifier for the object's class representation
 */
NoOpObjectVerifier.prototype.asClass = function()
{
	return new NoOpClassVerifier();
};

/**
 * @return {NoOpObjectVerifier} this
 * @throws {TypeError} if <code>consumer</code> is not set
 */
NoOpObjectVerifier.prototype.asClassConsumer = function()
{
	return this;
};


// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {NoOpObjectVerifier as default};