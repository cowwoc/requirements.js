/** @module */
import ObjectVerifier from "./ObjectVerifier.js";
import Requirements from "./Requirements.js";

const delegate = new Requirements();

/**
 * Verifies an object.
 *
 * @function
 * @param {object} actual the actual value
 * @param {string} name the name of the value
 * @return {ObjectVerifier} a verifier
 * @throws {TypeError}  if <code>name</code> is null
 * @throws {RangeError} if <code>name</code> is empty
 */
function requireThat(actual, name)
{
	return delegate.requireThat(actual, name);
}

// WORKAROUND: https://github.com/jsdoc3/jsdoc/issues/1533
/**
 * Same as [requireThat()]{@link module:DefaultRequirements~requireThat} but does nothing if assertions are disabled. By
 * default, assertions are disabled. See
 * {@link module:GlobalRequirements~GlobalRequirements.assertionsAreEnabled GlobalRequirements.assertionsAreEnabled} to
 * change the default.
 *
 * @function
 * @param {object} actual the actual value
 * @param {string} name the name of the value
 * @return {ObjectVerifier} a verifier
 * @throws {TypeError}  if <code>name</code> is null
 * @throws {RangeError} if <code>name</code> is empty
 * @see {@link module:GlobalRequirements~GlobalRequirements.assertionsAreEnabled
 * GlobalRequirements.assertionsAreEnabled}
 */
function assertThat(actual, name)
{
	return delegate.assertThat(actual, name);
}

export {requireThat, assertThat};