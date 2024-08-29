/*
 * Copyright (c) 2019 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * Methods that all number validators must contain.
 *
 * @typeParam S - the type of this validator
 */
interface NumberComponent<S>
{
	/**
	 * Returns the value that is being validated.
	 *
	 * @returns the validated value
	 * @throws IllegalStateError if a previous validation failed
	 */
	getValue(): number;

	/**
	 * Ensures that the value is a multiple of `factor`.
	 *
	 * @param factor - the number being multiplied
	 * @returns this
	 * @throws TypeError  if the value is `undefined` or `null`
	 * @throws RangeError if the value is not a multiple of `factor`
	 */
	isMultipleOf(factor: number): S;

	/**
	 * Ensures that the value is a multiple of `factor`.
	 *
	 * @param factor - the number being multiplied
	 * @param name   - the name of the factor
	 * @returns this
	 * @throws TypeError  if the value or `name` are `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace or is empty. If
	 *                                  the value is not a multiple of `factor`.
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	isMultipleOf(factor: number, name: string): S;

	/**
	 * Ensures that the value is not a multiple of `factor`.
	 *
	 * @param factor - the number being multiplied
	 * @returns this
	 * @throws TypeError  if the value is `undefined` or `null`
	 * @throws RangeError if the value is a multiple of `factor`
	 */
	isNotMultipleOf(factor: number): S;

	/**
	 * Ensures that the value is not a multiple of `factor`.
	 *
	 * @param factor - the number being multiplied
	 * @param name   - the name of the factor
	 * @returns this
	 * @throws TypeError  if the value or `name` are `null`
	 * @throws RangeError if `name` contains whitespace or is empty. If
	 *                                  the value is a multiple of `factor`.
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	isNotMultipleOf(factor: number, name: string): S;

	/**
	 * Ensures that the value is less than an upper bound.
	 *
	 * @param maximumExclusive - the exclusive upper bound
	 * @returns this
	 * @throws TypeError  if the value is `undefined` or `null`
	 * @throws RangeError if the value is greater than or equal to `maximumExclusive`
	 */
	isLessThan(maximumExclusive: number): S;

	/**
	 * Ensures that the value is less than an upper bound.
	 *
	 * @param maximumExclusive - the exclusive upper bound
	 * @param name             - the name of the upper bound
	 * @returns this
	 * @throws TypeError  if the value or `name` are `undefined` or `null`
	 * @throws RangeError if `name` contains a leading, trailing whitespace or is empty. If
	 *                                  the value is greater than or equal to `maximumExclusive`.
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	isLessThan(maximumExclusive: number, name: string): S;

	/**
	 * Ensures that the value is less than or equal to a maximum value.
	 *
	 * @param maximumInclusive - the inclusive upper value
	 * @returns this
	 * @throws TypeError  if the value is `undefined` or `null`
	 * @throws RangeError if the value is greater than `maximumInclusive`
	 */
	isLessThanOrEqualTo(maximumInclusive: number): S;

	/**
	 * Ensures that the value is less than or equal to a maximum value.
	 *
	 * @param maximumInclusive - the maximum value
	 * @param name             - the name of the maximum value
	 * @returns this
	 * @throws TypeError  if the value or `name` are `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace or is empty. If
	 *                                  the value is greater than `maximumInclusive`.
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	isLessThanOrEqualTo(maximumInclusive: number, name: string): S;

	/**
	 * Ensures that the value is greater than or equal to a minimum value.
	 *
	 * @param minimumInclusive - the minimum value
	 * @returns this
	 * @throws TypeError  if the value is `undefined` or `null`
	 * @throws RangeError if the value is less than `minimumInclusive`
	 */
	isGreaterThanOrEqualTo(minimumInclusive: number): S;

	/**
	 * Ensures that the value is greater than or equal a minimum value.
	 *
	 * @param minimumInclusive - the minimum value
	 * @param name             - the name of the minimum value
	 * @returns this
	 * @throws TypeError  if the value or `name` are `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace or is empty. If
	 *                                  the value is less than `minimumInclusive`.
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	isGreaterThanOrEqualTo(minimumInclusive: number, name: string): S;

	/**
	 * Ensures that the value is greater than a lower bound.
	 *
	 * @param minimumExclusive - the exclusive lower bound
	 * @returns this
	 * @throws TypeError  if the value is `undefined` or `null`
	 * @throws RangeError if the value is less than `minimumExclusive`
	 */
	isGreaterThan(minimumExclusive: number): S;

	/**
	 * Ensures that the value is greater than a lower bound.
	 *
	 * @param minimumExclusive - the exclusive lower bound
	 * @param name             - the name of the lower bound
	 * @returns this
	 * @throws TypeError  if the value or `name` are `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace or is empty. If
	 *                                  the value is less than `minimumExclusive`.
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	isGreaterThan(minimumExclusive: number, name: string): S;

	/**
	 * Ensures that the value is within a range.
	 *
	 * @param minimumInclusive - the lower bound of the range (inclusive)
	 * @param maximumExclusive - the upper bound of the range (exclusive)
	 * @returns this
	 * @throws TypeError  if the value is `undefined` or `null`
	 * @throws RangeError if `minimumInclusive` is greater than `maximumExclusive`. If the value is less than
	 * `minimumInclusive`. If the value is greater than or equal to `maximumExclusive`.
	 */
	isBetween(minimumInclusive: number, maximumExclusive: number): S;

	/**
	 * Ensures that the value is within a range.
	 *
	 * @param minimum          - the lower bound of the range
	 * @param minimumInclusive - `true` if the lower bound of the range is inclusive
	 * @param maximum          - the upper bound of the range
	 * @param maximumInclusive - `true` if the upper bound of the range is inclusive
	 * @returns this
	 * @throws TypeError  if the value is `undefined` or `null`
	 * @throws RangeError if `minimum` is greater than `maximum`. If
	 * `minimumInclusive` is `true`, and the value is less than `minimum`.
	 * If `minimumInclusive` is `false`, and the value is less than or equal to
	 * `minimum`. If `maximumInclusive` is `true` and the value is greater
	 * than `maximum`. If `maximumInclusive` is `false`, and the value is
	 * greater than or equal to `maximum`.
	 */
	isBetween(minimum: number, minimumInclusive: boolean, maximum: number, maximumInclusive: boolean): S;

	/**
	 * Ensures that the value is a finite number.
	 *
	 * @returns this
	 * @throws TypeError     if the value is `undefined` or `null`
	 * @throws RangeError if value is not a number or is an infinite number
	 * @see {@link isNumber}
	 * @see {@link Number.isFinite}
	 */
	isFinite(): S;

	/**
	 * Ensures that the value is an infinite number.
	 *
	 * @returns this
	 * @throws TypeError if the value is `undefined` or `null`
	 * @throws RangeError if value is not a number or is a finite number
	 * @see {@link isNumber}
	 * @see {@link Number.isFinite}
	 */
	isInfinite(): S;

	/**
	 * Ensures that the value is a well-defined number.
	 *
	 * @returns this
	 * @throws TypeError if the value is `undefined` or `null`
	 * @throws RangeError if value is not a well-defined number
	 * @see #isNotNumber()
	 */
	isNumber(): S;

	/**
	 * Ensures that the value is the result of a mathematically undefined numerical operation (such as division
	 * by zero) or don't have a representation in real numbers (such as the square-root of -1).
	 *
	 * @returns this
	 * @throws NullPointerError     if the value is `undefined` or `null`
	 * @throws RangeError if value is a well-defined number
	 */
	isNotNumber(): S;
}

export type {NumberComponent};