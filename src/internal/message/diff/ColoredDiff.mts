/*
 * Copyright (c) 2016 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
/**
 * A terminal that supports ANSI color codes.
 */
interface ColoredDiff
{
	/**
	 * @param text - the text that did not change
	 * @returns the (possibly decorated) text
	 */
	decorateEqualText(text: string): string;

	/**
	 * @param text - the text that was deleted
	 * @returns the (possibly decorated) text
	 */
	decorateDeletedText(text: string): string;

	/**
	 * @param text - the text that was inserted
	 * @returns the (possibly decorated) text
	 */
	decorateInsertedText(text: string): string;

	/**
	 * @param text - the padding
	 * @returns the (possibly decorated) text
	 */
	decoratePadding(text: string): string;
}

export type {ColoredDiff};