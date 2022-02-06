/**
 * Describes the type of a variable.
 */
class VariableType
{
	public readonly type: "undefined" | "null" | "boolean" | "number" | "bigint" | "array" | "string" |
		"symbol" | "function" | "class" | "object";
	public readonly name: null | string;

	/**
	 * Creates a new VariableType.
	 *
	 * @param {"undefined" | "null" | "boolean" | "number" | "bigint" | "array" | "string" | "symbol" |
	 * 	"function" | "class" | "object"} type the name of the type
	 * @param {null | string} [name = null] the name of the type (the function or class name)
	 * @throws {RangeError} if neither <code>type</code> or <code>name</code> are set. If <code>type</code>
	 * does not have a name (e.g. "number" or "array") but <code>name</code> is set.
	 */
	constructor(type: "undefined" | "null" | "boolean" | "number" | "bigint" | "array" | "string" | "symbol" |
		"function" | "class" | "object", name: null | string = null)
	{
		switch (type)
		{
			case "undefined":
			case "null":
			case "boolean" :
			case "number" :
			case "bigint":
			case "array":
			case "string":
			case "symbol":
				if (name !== null)
					throw new RangeError(type + " may not have a name");
		}
		this.type = type;
		this.name = name;
	}

	/**
	 * @return {string} the string representation of this object
	 */
	toString(): string
	{
		let result;
		switch (this.type)
		{
			case "function":
			case "class":
			{
				result = "a ";
				break;
			}
			case "object":
			{
				result = "an ";
				break;
			}
			default:
				return this.type;
		}
		result += this.type;
		if (this.name !== null)
			result += " named " + this.name;
		return result;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {VariableType as default};