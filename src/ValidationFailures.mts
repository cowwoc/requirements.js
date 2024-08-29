/*
 * Copyright (c) 2024 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import {
	requireThatInstanceOf,
	MultipleFailuresError,
	type ValidationFailure,
	requireThatTypeCategory,
	TypeCategory,
	isValidationFailure
} from "./internal/internal.mjs";

/**
 * A collection of validation failures.
 */
class ValidationFailures
{
	/**
	 * A collection that does not contain any failures.
	 */
	public static readonly EMPTY = new ValidationFailures([]);
	private readonly failures: ValidationFailure[];

	/**
	 * Creates a new instance.
	 *
	 * @param failures - the validation failures
	 * @throws TypeError if `failures` is `undefined` or `null`
	 */
	public constructor(failures: ValidationFailure[])
	{
		requireThatTypeCategory(failures, "failures", TypeCategory.ARRAY,
			v => Array.isArray(v) && v.every(element => isValidationFailure(element)));
		this.failures = [...failures];
	}

	/**
	 * Checks if any validation has failed.
	 *
	 * @returns `false` if at least one validation has failed
	 */
	public isEmpty()
	{
		return this.failures.length === 0;
	}

	/**
	 * Returns the list of failed validations.
	 *
	 * @returns an unmodifiable list of failed validations
	 */
	public getFailures()
	{
		return [...this.failures];
	}

	/**
	 * Throws an error if a validation failed; otherwise, returns `true`.
	 *
	 * @returns true if the validation passed
	 * @throws RangeError if a method precondition was violated
	 * @throws AssertionError if a class invariant or method postcondition was violated
	 * @throws MultipleFailuresError if more than one validation failed. This error contains a list of the
	 * failures
	 */
	public throwOnFailure()
	{
		if (this.failures.length === 0)
			return true;
		if (this.failures.length === 1)
		{
			const failure = this.failures[0];
			throw failure.getError();
		}
		throw new MultipleFailuresError(this.failures);
	}

	/**
	 * Returns the validation failure messages.
	 *
	 * @returns an empty list if the validation was successful
	 */
	public getMessages()
	{
		const messages = [];
		for (const failure of this.failures)
			messages.push(failure.getMessage());
		return messages;
	}

	/**
	 * Returns the error for the validation failures, if any.
	 *
	 * <ol>
	 *   <li>Returns `null` if no validation has failed.</li>
	 *   <li>Returns `MultipleFailuresError` if there were multiple failures.</li>
	 *   <li>Returns `Throwable` if there was one failure.</li>
	 * </ol>
	 *
	 * @returns the error or `null` if no validation has failed
	 */
	public getError()
	{
		if (this.failures.length === 0)
			return null;
		if (this.failures.length === 1)
		{
			const failure = this.failures[0];
			return failure.getError();
		}
		return new MultipleFailuresError(this.failures);
	}

	/**
	 * Adds validation failures into this collection.
	 *
	 * @param failures - the failures to add
	 * @returns this
	 * @throws TypeError if `failures` is `undefined` or `null`
	 */
	public addAll(failures: ValidationFailures)
	{
		requireThatInstanceOf(failures, "failures", ValidationFailures);
		this.failures.push(...failures.failures);
		return this;
	}
}

export {ValidationFailures};