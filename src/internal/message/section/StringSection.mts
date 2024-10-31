import type {MessageSection} from "./MessageSection.mjs";
import {assertThatValueIsNotNull} from "../../validator/Objects.mjs";

/**
 * A string that is added to the error context.
 */
class StringSection implements MessageSection
{
	public readonly value: string;

	constructor(value: string)
	{
		assertThatValueIsNotNull(value, "value");
		this.value = value;
	}

	getMaxKeyLength(): number
	{
		return 0;
	}

	getLines(): string[]
	{
		return [this.value];
	}
}

export {StringSection};