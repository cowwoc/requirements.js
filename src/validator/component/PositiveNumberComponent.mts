/*
 * Copyright (c) 2019 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * Methods that validators for numbers that may be positive must contain.
 *
 * @typeParam S - the type of this validator
 */
interface PositiveNumberComponent<S>
{
	/**
	 * Ensures that the value is positive.
	 *
	 * @throws TypeError  if the value is `undefined` or `null`
	 * @throws RangeError if the value is:
	 *                    <ul>
	 *                      <li>not positive</li>
	 *                      <li>not a number</li>
	 *                    </ul>
	 * @returns this
	 */
	isPositive(): S;

	/**
	 * Ensures that the value is not a positive number.
	 *
	 * @throws TypeError  if the value is `undefined` or `null`
	 * @throws RangeError if the value is a positive number
	 * @returns this
	 */
	isNotPositive(): S;
}

export type {PositiveNumberComponent};