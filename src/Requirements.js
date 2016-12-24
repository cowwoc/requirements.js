import RequirementVerifier from "./RequirementVerifier";

// TODO: Ensure that the method names and Javadoc match in the Java and JS APIs

const delegate = new RequirementVerifier();

/**
 * Verifies an object.
 *
 * @function
 * @param {Object} actual the actual value
 * @param {String} name the name of the value
 * @return {ObjectVerifier} a verifier
 */
const requireThat = function(actual, name)
{
	return delegate.requireThat(actual, name);
};

export default requireThat;