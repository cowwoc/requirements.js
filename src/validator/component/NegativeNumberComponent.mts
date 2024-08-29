/*
 * Copyright (c) 2019 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * Methods that validators for numbers that may be negative must contain.
 *
 * @typeParam S - the type of this validator
 */
interface NegativeNumberComponent<S>
{
	/**
	 * Ensures that the value is negative. `-0.0` is considered to be zero *and* negative.
	 *
	 * @throws TypeError  if the value is `undefined` or `null`
	 * @throws RangeError if the value is:
	 *                    <ul>
	 *                      <li>not negative</li>
	 *                      <li>not a number</li>
	 *                    </ul>
	 * @returns this
	 */
	isNegative(): S;

	/**
	 * Ensures that the value is not a negative number. `-0.0` is considered to be zero *and* negative.
	 *
	 * @throws TypeError  if the value is `undefined` or `null`
	 * @throws RangeError if the value is a negative number
	 * @returns this
	 */
	isNotNegative(): S;
}

export type {NegativeNumberComponent};