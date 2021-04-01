/** @module DefaultRequirements */
import {
	ObjectAsserter,
	ObjectValidator,
	ObjectVerifier,
	Requirements
} from "./internal/internal";

const delegate = new Requirements();

/**
 * Verifies the requirements an object.
 *
 * @function
 * @param {object} actual the actual value
 * @param {string} name the name of the value
 * @return {ObjectVerifier} a verifier
 * @throws {TypeError}  if <code>name</code> is null
 * @throws {RangeError} if <code>name</code> is empty
 */
function requireThat(actual: unknown, name: string): ObjectVerifier
{
	return delegate.requireThat(actual, name);
}

// WORKAROUND: https://github.com/jsdoc3/jsdoc/issues/1533
/**
 * Same as {@link module:DefaultRequirements~requireThat requireThat()} but does nothing if assertions are
 * disabled. By default, assertions are disabled. See
 * {@link GlobalConfiguration#assertionsAreEnabled GlobalConfiguration.assertionsAreEnabled} to change the
 *   default.
 *
 * @function
 * @param {object} actual the actual value
 * @param {string} name the name of the value
 * @return {ObjectAsserter} an asserter
 * @throws {TypeError}  if <code>name</code> is null
 * @throws {RangeError} if <code>name</code> is empty
 * @see {@link GlobalConfiguration#assertionsAreEnabled GlobalConfiguration.assertionsAreEnabled}
 */
function assertThat(actual: unknown, name: string): ObjectAsserter
{
	return delegate.assertThat(actual, name);
}

/**
 * Validates the requirements of an object.
 *
 * @function
 * @param {object} actual the actual value
 * @param {string} name the name of the value
 * @return {ObjectValidator} a validator
 * @throws {TypeError}  if <code>name</code> is null
 * @throws {RangeError} if <code>name</code> is empty
 * @see {@link GlobalConfiguration#assertionsAreEnabled GlobalConfiguration.assertionsAreEnabled}
 */
function validateThat(actual: unknown, name: string): ObjectValidator
{
	return delegate.validateThat(actual, name);
}

export {
	requireThat,
	assertThat,
	validateThat
};