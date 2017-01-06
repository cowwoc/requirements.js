import Utilities from "./Utilities";
import Configuration from "./Configuration";
import ObjectVerifier from "./ObjectVerifier";
import StringVerifier from "./StringVerifier";
import NumberVerifier from "./NumberVerifier";
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
 * @throws {TypeError} if {@code config} is null
 * @author Gili Tzabari
 */
function RequirementVerifier(config)
{
	if (config === null)
		throw new TypeError("config may not be null.");
	if (config === undefined)
		config = new Configuration(this);
	Object.defineProperty(this, "config",
		{
			value: config
		});
}

/**
 * Verifies an object.
 *
 * @function
 * @param {Object} actual the actual value
 * @param {String} name   the name of the value
 * @return {ObjectVerifier|StringVerifier|ArrayVerifier|NumberVerifier|UriVerifier} a verifier
 * @throws {TypeError} if {@code name} is null
 * @throws {RangeError} if {@code name} is empty
 */
RequirementVerifier.prototype.requireThat = function(actual, name)
{
	Utilities.verifyName(name, "name");
	switch (Utilities.getTypeName(actual))
	{
		case "String":
			//noinspection JSCheckFunctionSignatures
			return new StringVerifier(actual, name, this.config);
		case "Array":
			//noinspection JSCheckFunctionSignatures
			return new ArrayVerifier(actual, name, this.config);
		case "Number":
			//noinspection JSCheckFunctionSignatures
			return new NumberVerifier(actual, name, this.config);
		case "Object":
		{
			//noinspection JSCheckFunctionSignatures
			switch (Utilities.getObjectClass(actual))
			{
				case "URI":
					return new UriVerifier(actual, name, this.config);
			}
		}
		default:
			return new ObjectVerifier(actual, name, this.config);
	}
	// TODO: See https://github.com/dsheiko/bycontract and https://github.com/muroc/offensive.js for related projects
};

export default RequirementVerifier;