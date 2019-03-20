import NoOpArrayVerifier from "./NoOpArrayVerifier";
import NoOpInetAddressVerifier from "./NoOpInetAddressVerifier";
import NoOpMapVerifier from "./NoOpMapVerifier";
import NoOpNumberVerifier from "./NoOpNumberVerifier";
import NoOpObjectVerifier from "./internal/NoOpObjectVerifier";
import NoOpSetVerifier from "./NoOpSetVerifier";
import NoOpStringVerifier from "./NoOpStringVerifier";
import NoOpUriVerifier from "./NoOpUriVerifier";

// DESIGN:
// * internal/NoOpObjectVerifier declares NoOpObjectVerifier without any circular dependencies.
// * First we load internal/NoOpObjectVerifier.
// * Next we load the circular dependencies (classes that depend on NoOpObjectVerifier and vice-versa).
// * Finally, we add methods to ObjectVerifier that reference the circular dependencies.

/**
 * @return {NoOpStringVerifier} a verifier for the object's string representation
 */
NoOpObjectVerifier.prototype.asString = function()
{
	return new NoOpStringVerifier();
};

/**
 * @return {NoOpArrayVerifier} a verifier for the <code>Array</code>
 */
NoOpObjectVerifier.prototype.asArray = function()
{
	return new NoOpArrayVerifier();
};

/**
 * @return {NoOpNumberVerifier} a verifier for the <code>Number</code>
 */
NoOpObjectVerifier.prototype.asNumber = function()
{
	return new NoOpNumberVerifier();
};

/**
 * @return {NoOpSetVerifier} a verifier for the <code>Set</code>
 */
NoOpObjectVerifier.prototype.asSet = function()
{
	return new NoOpSetVerifier();
};

/**
 * @return {NoOpMapVerifier} a verifier for the <code>Map</code>
 */
NoOpObjectVerifier.prototype.asMap = function()
{
	return new NoOpMapVerifier();
};

/**
 * @return {NoOpInetAddressVerifier} a verifier for the value's Internet address representation
 */
NoOpObjectVerifier.prototype.asInetAddress = function()
{
	return new NoOpInetAddressVerifier();
};

/**
 * @return {NoOpUriVerifier} a verifier for the <code>URI</code>
 */
NoOpObjectVerifier.prototype.asUri = function()
{
	return new NoOpUriVerifier();
};

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {NoOpObjectVerifier as default};