import RequirementVerifier from "./RequirementVerifier";
import "babel-polyfill";
// babel-polyfill needed for Object.entries(). See http://stackoverflow.com/a/35382020/14731.

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
const requireThat = function(actual, name)
{
	return delegate.requireThat(actual, name);
};

export default requireThat;