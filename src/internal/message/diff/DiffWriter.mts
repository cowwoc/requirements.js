/**
 * Generates the String representation of a diff between `actual` and `expected` values.
 */
interface DiffWriter
{
	/**
	 * Adds text that is equal in `expected` and `actual`.
	 *
	 * @param text - the text to keep in `actual`
	 * @throws RangeError if the writer was already flushed
	 */
	writeEqual(text: string): void;

	/**
	 * Deletes text that is present in `actual` but not `expected`.
	 *
	 * @param text - the text that needs to be deleted from `actual`
	 * @throws RangeError if the writer was already flushed
	 */
	writeDeleted(text: string): void;

	/**
	 * Adds text that is present in `expected` but not `actual`.
	 *
	 * @param text - the text that needs to be inserted into `actual`
	 * @throws RangeError if the writer was already flushed
	 */
	writeInserted(text: string): void;

	/**
	 * @returns the lines of the actual value
	 * @throws RangeError if the writer was already flushed
	 */
	getActualLines(): string[];

	/**
	 * @returns the lines to display after "actual" and before "expected" (empty lines should not be displayed)
	 * @throws RangeError if the writer was already flushed
	 */
	getDiffLines(): string[];

	/**
	 * @returns the lines of the expected value
	 * @throws RangeError if the writer was already flushed
	 */
	getExpectedLines(): string[];

	/**
	 * @returns an array that indicates whether the actual and expected values are equal on each line
	 * @throws RangeError if the writer was already flushed
	 */
	getEqualLines(): boolean[];

	/**
	 * @returns a padding character used to align values vertically
	 */
	getPaddingMarker(): string;

	/**
	 * Flushes the writer's output.
	 */
	flush(): void;
}

export type {DiffWriter};