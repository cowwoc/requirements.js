/*
 * Copyright (c) 2016 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import {
	IllegalStateError,
	NEWLINE_MARKER,
	NEWLINE_PATTERN,
	type DiffWriter,
	sortByKeys,
	assertThatType,
	Type,
	assert
} from "../../internal.mjs";

/**
 * Base implementation for all diff writers.
 */
abstract class AbstractDiffWriter implements DiffWriter
{
	/**
	 * Maps each line number to its associated actual value.
	 */
	protected readonly lineToActualLine = new Map<number, string>();
	/**
	 * Maps each line number to its associated expected value.
	 */
	protected readonly lineToExpectedLine = new Map<number, string>();
	/**
	 * Maps each line number to an indication of whether the actual and expected values are equal.
	 */
	protected readonly lineToEqualLine = new Map<number, boolean>();
	/**
	 * A padding character used to align values vertically.
	 */
	private readonly paddingMarker: string;
	/**
	 * The final list of lines in the actual value.
	 */
	private readonly actualLines: string[] = [];
	/**
	 * The final list of lines in the expected value.
	 */
	private readonly expectedLines: string[] = [];
	/**
	 * The final list that indicates which lines contain actual and expected values that are equal.
	 */
	private readonly equalLines: boolean[] = [];
	/**
	 * The current line number of the actual value.
	 */
	protected actualLineNumber = 0;
	/**
	 * The current line number of the expected value.
	 */
	protected expectedLineNumber = 0;
	/**
	 * `true` if the writer has been flushed.
	 */
	protected flushed = false;

	/**
	 * @param paddingMarker - a padding character used to align values vertically
	 * @throws TypeError if `paddingMarker` is `undefined` or `null`
	 * @throws RangeError if `paddingMarker` is empty
	 */
	protected constructor(paddingMarker: string)
	{
		assertThatType(paddingMarker, "paddingMarker", Type.STRING);
		assert(paddingMarker.length !== 0, undefined, "paddingMarker may not be empty");
		this.paddingMarker = paddingMarker;
	}

	/**
	 * Invoked before flushing the writer.
	 */
	protected abstract beforeFlush(): void;

	/**
	 * Invoked after flushing the writer.
	 */
	protected abstract afterFlush(): void;

	public getPaddingMarker(): string
	{
		return this.paddingMarker;
	}

	/**
	 * Adds a new line for the actual value.
	 *
	 * @param number - the line number to add
	 */
	protected addActualLine(number: number): void
	{
		this.lineToActualLine.set(number, "");
		if (!this.lineToEqualLine.has(this.actualLineNumber))
			this.lineToEqualLine.set(this.actualLineNumber, true);
	}

	/**
	 * Adds a new line for the expected value.
	 *
	 * @param number - the line number to initialize
	 */
	protected addExpectedLine(number: number): void
	{
		this.lineToExpectedLine.set(number, "");
		if (!this.lineToEqualLine.has(this.expectedLineNumber))
			this.lineToEqualLine.set(this.expectedLineNumber, true);
	}

	/**
	 * Splits text into one or more lines.
	 *
	 * @param text - some text
	 * @param lineConsumer - consumes one line at a time
	 * @throws IllegalStateError if the writer has already been flushed
	 */
	public splitLines(text: string, lineConsumer: (line: string) => void): void
	{
		if (this.flushed)
			throw new IllegalStateError("Writer has already been flushed");
		const lines = text.split(NEWLINE_PATTERN);
		let line;
		for (let i = 0; i < lines.length; ++i)
		{
			const isLastLine = i === lines.length - 1;
			line = "";
			line += lines[i];
			if (!isLastLine)
				line += NEWLINE_MARKER;
			if (line.length !== 0)
				lineConsumer(line);
			if (!isLastLine)
			{
				this.writeActualNewline();
				this.writeExpectedNewline();
			}
		}
	}

	/**
	 * Ends the current line.
	 *
	 * @throws IllegalStateError if the writer has already been flushed
	 */
	protected writeActualNewline(): void
	{
		if (this.flushed)
			throw new IllegalStateError("Writer has already been flushed");
		++this.actualLineNumber;
		this.addActualLine(this.actualLineNumber);
		if (!this.lineToExpectedLine.get(this.actualLineNumber))
			this.addExpectedLine(this.actualLineNumber);
	}

	/**
	 * Ends the current line.
	 *
	 * @throws IllegalStateError if the writer has already been flushed
	 */
	public writeExpectedNewline(): void
	{
		if (this.flushed)
			throw new IllegalStateError("Writer has already been flushed");
		++this.expectedLineNumber;
		this.addExpectedLine(this.expectedLineNumber);
		if (!this.lineToActualLine.get(this.expectedLineNumber))
			this.addActualLine(this.expectedLineNumber);
	}

	public flush(): void
	{
		if (this.flushed)
			return;
		this.flushed = true;
		this.beforeFlush();

		for (const actualLine of sortByKeys(this.lineToActualLine).values())
			this.actualLines.push(actualLine);
		Object.freeze(this.actualLines);

		for (const expectedLine of sortByKeys(this.lineToExpectedLine).values())
			this.expectedLines.push(expectedLine);
		Object.freeze(this.expectedLines);

		for (const equalLine of sortByKeys(this.lineToEqualLine).values())
			this.equalLines.push(equalLine);
		Object.freeze(this.equalLines);

		this.afterFlush();
	}

	public getActualLines(): string[]
	{
		if (!this.flushed)
			throw new IllegalStateError("Writer must be flushed");
		return this.actualLines;
	}

	public getExpectedLines(): string[]
	{
		if (!this.flushed)
			throw new IllegalStateError("Writer must be flushed");
		return this.expectedLines;
	}

	public getEqualLines(): boolean[]
	{
		if (!this.flushed)
			throw new IllegalStateError("Writer must be flushed");
		return this.equalLines;
	}

	public abstract getDiffLines(): string[];

	public abstract writeEqual(text: string): void;

	public abstract writeDeleted(text: string): void;

	public abstract writeInserted(text: string): void;
}

export {AbstractDiffWriter};