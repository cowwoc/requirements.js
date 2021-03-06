import {Objects} from "../internal";

/**
 * A line item in an exception context.
 */
class ContextLine
{
	/**
	 * The key associated with the value (empty string is absent).
	 */
	public readonly key: string;
	/**
	 * A value.
	 */
	public readonly value: unknown;

	/**
	 * Creates a new line.
	 *
	 * @param {string} key   the key associated with the value (empty string if absent)
	 * @param {object} value a value
	 * @throws {TypeError} if the key is not a string
	 */
	constructor(key: string, value: unknown)
	{
		Objects.assertThatTypeOf(key, "key", "string");
		this.key = key;
		this.value = value;
	}

	toString(): string
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