// DESIGN:
// * Declare the class without methods that trigger circular dependencies
// * Load the dependencies
// * Add the missing methods

import Objects from "../Objects";
import Configuration from "../../Configuration";

/**
 * Validates the requirements of an object.
 */
class ObjectValidator
{
	/**
	 * Creates a new ObjectValidator.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {object} actual the actual value
	 * @param {string} name   the name of the value
	 * @return {ObjectValidator} a new validator
	 * @throws {TypeError}  if <code>name</code> or <code>config</code> are null or undefined
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	constructor(configuration, actual, name)
	{
		Objects.assertThatTypeOf(configuration, "configuration", "Configuration");
		Objects.verifyName(name, "name");
		Object.defineProperty(this, "config",
			{
				value: configuration
			});
		Object.defineProperty(this, "actual",
			{
				value: actual,
				writable: true
			});
		Object.defineProperty(this, "name",
			{
				value: name
			});
		Object.defineProperty(this, "failures",
			{
				value: []
			});
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ObjectValidator as default};