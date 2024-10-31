import {assertThatValueIsNotNull} from "../validator/Objects.mjs";

/**
 * Wraps a String to prevent it from being quoted when used as a context value.
 */
class UnquotedStringValue
{
	private readonly value: string;

	/**
	 * Creates a new instance.
	 *
	 * @param value - the string
	 * @throws TypeError if `value` is null
	 */
	public constructor(value: string)
	{
		assertThatValueIsNotNull(value, "value");
		this.value = value;
	}

	public toString(): string
	{
		return this.value;
	}
}

export {UnquotedStringValue};