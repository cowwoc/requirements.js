/**
 * A section of a text that contains contextual information related to a validation failure.
 */
interface MessageSection
{
	/**
	 * @returns if the section contains key-value pairs, returns the maximum length of all keys; otherwise
	 *   returns 0
	 */
	getMaxKeyLength(): number;

	/**
	 * @param maxKeyLength - the maximum key length across all sections
	 * @returns an array of this section's lines
	 */
	getLines(maxKeyLength: number): string[];
}

export type {MessageSection};