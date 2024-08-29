import type {MessageSection} from "./MessageSection.mjs";
import {requireThatValueIsNotNull} from "../../internal.mjs";

/**
 * A section of key-pair pairs that contain contextual information related to a validation failure.
 */
class ContextSection implements MessageSection
{
	public readonly value: Map<string, string>;

	constructor(value: Map<string, string>)
	{
		requireThatValueIsNotNull(value, "value");
		this.value = value;
	}

	getMaxKeyLength(): number
	{
		let maxKeyLength = 0;
		for (const key of this.value.keys())
			maxKeyLength = Math.max(maxKeyLength, key.length);
		return maxKeyLength;
	}

	getLines(maxKeyLength: number): string[]
	{
		// Align the colons vertically
		const lines = [];
		for (const [key, value] of this.value.entries())
			lines.push(key.padEnd(maxKeyLength) + ": " + value);
		return lines;
	}
}

export {ContextSection};