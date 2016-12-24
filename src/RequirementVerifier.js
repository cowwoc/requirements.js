import Utilities from "./Utilities";
import Configuration from "./Configuration";
import ObjectVerifier from "./ObjectVerifier";
import StringVerifier from "./StringVerifier";
import ArrayVerifier from "./ArrayVerifier";
import UriVerifier from "./UriVerifier";

/**
 * Verifies a value.
 * <p>
 * Unlike {@link Requirements}, instances of this class can be configured prior to initiating
 * verification. Doing so causes the same configuration to get reused across runs.
 *
 * @constructor
 * @param {Configuration} [config] (optional) the instance configuration
 *
 * @property {Configuration} config the instance configuration
 * @author Gili Tzabari
 */
function RequirementVerifier(config)
{
	if (config === undefined)
		config = new Configuration(this);
	Object.defineProperty(this, "config",
		{
			value: config
		});
}
RequirementVerifier.prototype = Object.create(RequirementVerifier.prototype);
RequirementVerifier.prototype.constructor = RequirementVerifier;

/**
 * Verifies an object.
 *
 * @function
 * @param {Object} actual the actual value
 * @param {String} name   the name of the value
 * @return {ObjectVerifier|StringVerifier|ArrayVerifier|UriVerifier} a verifier
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty
 */
RequirementVerifier.prototype.requireThat = function(actual, name)
{
	if (name !== undefined)
		new StringVerifier(name, "name", this.config).isNotNull().trim().isNotEmpty();
	switch (Utilities.getClassName(actual))
	{
		case "String":
			//noinspection JSCheckFunctionSignatures
			return new StringVerifier(actual, name, this.config);
		case "Array":
			//noinspection JSCheckFunctionSignatures
			return new ArrayVerifier(actual, name, this.config);
		case "URI":
			//noinspection JSCheckFunctionSignatures
			return new UriVerifier(actual, name, this.config);
		default:
			return new ObjectVerifier(actual, name, this.config);
	}
	// TODO: See https://github.com/dsheiko/bycontract and https://github.com/muroc/offensive.js for related projects
};

export default RequirementVerifier;