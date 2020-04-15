import Objects from "../Objects";

/**
 * A line item in an exception context.
 *
 * @ignore
 */
class ContextLine
{
	/**
	 * Creates a new line.
	 *
	 * @param {string} key   the key associated with the value (empty string if absent)
	 * @param {object} value a value
	 * @throws {TypeError} if the key is not a string
	 */
	constructor(key, value)
	{
		Objects.assertThatTypeOf(key, "key", "string");
		Object.defineProperty(this, "key",
			{
				value: key
			});
		Object.defineProperty(this, "value",
			{
				value
			});
	}

	/**
	 * @return {string} the key associated with the value (empty string is absent)
	 */
	getKey()
	{
		return this.key;
	}

	/**
	 * @return {object} a value
	 */
	getValue()
	{
		return this.value;
	}

	toString()
	{
		let result = "";
		if (this.key.length !== 0)
			result += this.key + ":";
		result += this.value;
		return result;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ContextLine as default};