/*
 * Copyright (c) 2016 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import {
	AbstractDiffWriter,
	IllegalStateError,
	DIFF_EQUAL,
	DIFF_DELETE,
	DIFF_INSERT,
	appendToValue,
	sortByKeys
} from "../../internal.mjs";

/**
 * A diff writer that does not use ANSI escape codes.
 */
class TextOnly extends AbstractDiffWriter
{
	/**
	 * A padding character used to align values vertically.
	 */
	static readonly DIFF_PADDING = " ";
	private lineToDiffLine: Map<number, string> = new Map<number, string>();
	private diffLines: string[] = [];

	constructor()
	{
		super(TextOnly.DIFF_PADDING);
		this.addActualLine(0);
		this.addExpectedLine(0);
	}

	addActualLine(number: number)
	{
		super.addActualLine(number);
		this.addDiffLine(number);
	}

	addExpectedLine(number: number)
	{
		super.addExpectedLine(number);
		this.addDiffLine(number);
	}

	private addDiffLine(number: number)
	{
		if (this.lineToDiffLine.get(number) === undefined)
			this.lineToDiffLine.set(number, "");
	}

	public writeEqual(text: string)
	{
		if (this.flushed)
			throw new IllegalStateError("Writer was already flushed");
		if (text.length === 0)
			return;
		this.splitLines(text, (line: string) =>
		{
			appendToValue(this.lineToActualLine, this.actualLineNumber, line);

			const length = line.length;
			if (this.expectedLineNumber === this.actualLineNumber)
				appendToValue(this.lineToDiffLine, this.actualLineNumber, DIFF_EQUAL.repeat(length));
			else
			{
				const paddingMarker = this.getPaddingMarker();
				appendToValue(this.lineToExpectedLine, this.actualLineNumber, paddingMarker.repeat(length));
				appendToValue(this.lineToDiffLine, this.actualLineNumber, DIFF_EQUAL.repeat(length));

				appendToValue(this.lineToActualLine, this.expectedLineNumber, paddingMarker.repeat(length));
				appendToValue(this.lineToDiffLine, this.expectedLineNumber, DIFF_EQUAL.repeat(length));
			}
			appendToValue(this.lineToExpectedLine, this.expectedLineNumber, line);
		});
	}

	public writeDeleted(text: string)
	{
		if (this.flushed)
			throw new IllegalStateError("Writer was already flushed");
		if (text.length === 0)
			return;
		this.splitLines(text, (line: string) =>
		{
			appendToValue(this.lineToActualLine, this.actualLineNumber, line);
			const length = line.length;
			appendToValue(this.lineToDiffLine, this.actualLineNumber, DIFF_DELETE.repeat(length));
			appendToValue(this.lineToExpectedLine, this.actualLineNumber,
				this.getPaddingMarker().repeat(length));
			this.lineToEqualLine.set(this.actualLineNumber, false);
		});
	}

	public writeInserted(text: string)
	{
		if (this.flushed)
			throw new IllegalStateError("Writer was already flushed");
		if (text.length === 0)
			return;
		this.splitLines(text, (line: string) =>
		{
			const length = line.length;
			appendToValue(this.lineToActualLine, this.expectedLineNumber,
				this.getPaddingMarker().repeat(length));
			appendToValue(this.lineToDiffLine, this.expectedLineNumber, DIFF_INSERT.repeat(length));
			appendToValue(this.lineToExpectedLine, this.expectedLineNumber, line);
			this.lineToEqualLine.set(this.expectedLineNumber, false);
		});
	}

	protected beforeFlush()
	{
	}

	public afterFlush()
	{
		for (const diffLine of sortByKeys(this.lineToDiffLine).values())
			this.diffLines.push(diffLine);
		Object.freeze(this.diffLines);
	}

	public getDiffLines()
	{
		if (!this.flushed)
			throw new RangeError("Writer must be flushed");
		return this.diffLines;
	}
}

export {TextOnly};