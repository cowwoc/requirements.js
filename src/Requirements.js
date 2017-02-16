import Verifiers from "./Verifiers";

const delegate = new Verifiers();

/**
 * Verifies an object.
 *
 * @function
 * @param {Object} actual the actual value
 * @param {String} name the name of the value
 * @return {ObjectVerifier} a verifier
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty
 */
function requireThat(actual, name)
{
	return delegate.requireThat(actual, name);
}

/**
 * Same as {@link #requireThat(Object, String)} but does nothing if assertions are disabled.
 *
 * @function
 * @param {Object} actual the actual value
 * @param {String} name the name of the value
 * @return {ObjectVerifier} a verifier
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty
 */
function assertThat(actual, name)
{
	return delegate.assertThat(actual, name);
}

export {requireThat, assertThat};