import RequirementVerifier from "./RequirementVerifier";

const delegate = new RequirementVerifier();

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

export default requireThat;