/*
 * Copyright (c) 2016 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import {
	AbstractDiffWriter,
	IllegalStateError,
	type ColoredDiff,
	appendToValue
} from "../../internal.mjs";

/**
 * Base implementation for all color diff writers.
 */
abstract class AbstractColorWriter extends AbstractDiffWriter
	implements ColoredDiff
{
	/**
	 * A padding character used to align values vertically.
	 */
	static readonly DIFF_PADDING = "/";
	/**
	 * Maps from a line number in the actual value to the decoration at the end of the line.
	 */
	private lineToActualDecoration: Map<number, DecorationType> = new Map<number, DecorationType>();
	/**
	 * Maps from a line number in the expected value to the decoration at the end of the line.
	 */
	private lineToExpectedDecoration: Map<number, DecorationType> = new Map<number, DecorationType>();

	protected constructor()
	{
		super(AbstractColorWriter.DIFF_PADDING);
		this.addActualLine(0);
		this.addExpectedLine(0);
	}

	public addActualLine(number: number): void
	{
		super.addActualLine(number);
		this.lineToActualDecoration.set(number, DecorationType.UNDECORATED);
	}

	public addExpectedLine(number: number): void
	{
		super.addExpectedLine(number);
		this.lineToExpectedDecoration.set(number, DecorationType.UNDECORATED);
	}

	public writeEqual(text: string): void
	{
		if (this.flushed)
			throw new IllegalStateError("Writer was already flushed");
		if (text.length === 0)
			return;
		this.splitLines(text, (line: string) =>
		{
			const actualDecoration = this.lineToActualDecoration.get(this.actualLineNumber);
			if (actualDecoration === DecorationType.EQUAL)
				appendToValue(this.lineToActualLine, this.actualLineNumber, line);
			else
			{
				appendToValue(this.lineToActualLine, this.actualLineNumber, this.decorateEqualText(line));
				this.lineToActualDecoration.set(this.actualLineNumber, DecorationType.EQUAL);
			}

			if (this.expectedLineNumber !== this.actualLineNumber)
			{
				const length = line.length;
				const padding = this.decoratePadding(this.getPaddingMarker().repeat(length));
				appendToValue(this.lineToExpectedLine, this.actualLineNumber, padding);
				this.lineToExpectedDecoration.set(this.actualLineNumber, DecorationType.EQUAL);

				appendToValue(this.lineToActualLine, this.expectedLineNumber, padding);
				this.lineToActualDecoration.set(this.expectedLineNumber, DecorationType.EQUAL);
			}

			const expectedDecoration = this.lineToExpectedDecoration.get(this.expectedLineNumber);
			if (expectedDecoration === DecorationType.EQUAL)
				appendToValue(this.lineToExpectedLine, this.expectedLineNumber, line);
			else
			{
				appendToValue(this.lineToExpectedLine, this.expectedLineNumber, this.decorateEqualText(line));
				this.lineToExpectedDecoration.set(this.expectedLineNumber, DecorationType.EQUAL);
			}
		});
	}

	public writeDeleted(text: string): void
	{
		if (this.flushed)
			throw new IllegalStateError("Writer was already flushed");
		if (text.length === 0)
			return;
		this.splitLines(text, (line: string) =>
		{
			const actualDecoration = this.lineToActualDecoration.get(this.actualLineNumber);
			if (actualDecoration === DecorationType.DELETE)
				appendToValue(this.lineToActualLine, this.actualLineNumber, line);
			else
			{
				appendToValue(this.lineToActualLine, this.actualLineNumber, this.decorateDeletedText(line));
				this.lineToActualDecoration.set(this.actualLineNumber, DecorationType.DELETE);
			}

			const expectedDecoration = this.lineToExpectedDecoration.get(this.actualLineNumber);
			const padding = this.getPaddingMarker().repeat(line.length);
			if (expectedDecoration === DecorationType.DELETE)
				appendToValue(this.lineToExpectedLine, this.actualLineNumber, padding);
			else
			{
				appendToValue(this.lineToExpectedLine, this.actualLineNumber,
					this.decoratePadding(padding));
				this.lineToExpectedDecoration.set(this.actualLineNumber, DecorationType.DELETE);
			}
			this.lineToEqualLine.set(this.actualLineNumber, false);
		});
	}

	public writeInserted(text: string): void
	{
		if (this.flushed)
			throw new IllegalStateError("Writer was already flushed");
		if (text.length === 0)
			return;
		this.splitLines(text, (line: string) =>
		{
			const actualDecoration = this.lineToActualDecoration.get(this.expectedLineNumber);
			const padding = this.getPaddingMarker().repeat(line.length);
			if (actualDecoration === DecorationType.INSERT)
				appendToValue(this.lineToActualLine, this.expectedLineNumber, this.decoratePadding(padding));
			else
			{
				appendToValue(this.lineToActualLine, this.expectedLineNumber, this.decoratePadding(padding));
				this.lineToActualDecoration.set(this.expectedLineNumber, DecorationType.INSERT);
			}

			const expectedDecoration = this.lineToExpectedDecoration.get(this.expectedLineNumber);
			if (expectedDecoration === DecorationType.INSERT)
				appendToValue(this.lineToExpectedLine, this.expectedLineNumber, line);
			else
			{
				appendToValue(this.lineToExpectedLine, this.expectedLineNumber, this.decorateInsertedText(line));
				this.lineToExpectedDecoration.set(this.expectedLineNumber, DecorationType.INSERT);
			}
			this.lineToEqualLine.set(this.expectedLineNumber, false);
		});
	}

	protected beforeFlush()
	{
		for (const entry of this.lineToActualDecoration.entries())
			this.lineToActualDecoration.set(entry[0], DecorationType.UNDECORATED);
		for (const entry of this.lineToExpectedDecoration.entries())
			this.lineToExpectedDecoration.set(entry[0], DecorationType.UNDECORATED);
	}

	public getDiffLines(): string[]
	{
		if (!this.flushed)
			throw new IllegalStateError("Writer must be flushed");
		return [];
	}

	protected abstract afterFlush(): void;

	public abstract decorateDeletedText(text: string): string;

	public abstract decorateEqualText(text: string): string;

	public abstract decorateInsertedText(text: string): string;

	public abstract decoratePadding(text: string): string;
}

/**
 * Possible types of decorations.
 */
enum DecorationType
{
	UNDECORATED,
	DELETE,
	INSERT,
	EQUAL
}

export {AbstractColorWriter};