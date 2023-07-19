import type {Configuration} from "./internal/internal.mjs";
import {Objects} from "./internal/internal.mjs";

/**
 * A line item in an exception context.
 */
class ContextLine
{
	/**
	 * The instance configuration.
	 */
	public readonly config: Configuration;
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
	 * @param configuration - the instance configuration
	 * @param key - the key associated with the value (empty string if absent)
	 * @param value - a value
	 * @throws TypeError if the key is not a string
	 */
	constructor(configuration: Configuration, key: string, value: unknown)
	{
		Objects.assertThatTypeOf(key, "key", "string");
		this.config = configuration;
		this.key = key;
		this.value = value;
	}

	toString(): string
	{
		let result = "";
		if (this.key.length !== 0)
			result += this.key + ":";
		result += this.config.convertToString(this.value);
		return result;
	}
}

export {ContextLine};