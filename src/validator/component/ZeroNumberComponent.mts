/*
 * Copyright (c) 2019 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * Methods that validators for numbers that may be zero must contain.
 */
interface ZeroNumberComponent
{
	/**
	 * Ensures that the value is zero. `-0.0` is considered to be zero *and* negative.
	 *
	 * @throws TypeError  if the value is `undefined` or `null`
	 * @throws RangeError if the value is:
	 *                    <ul>
	 *                      <li>not zero</li>
	 *                      <li>not a number</li>
	 *                    </ul>
	 * @returns this
	 */
	isZero(): this;

	/**
	 * Ensures that the value is not zero. `-0.0` is considered to be zero *and* negative.
	 *
	 * @throws TypeError  if the value is `undefined` or `null`
	 * @throws RangeError if the value is zero
	 * @returns this
	 */
	isNotZero(): this;
}

export type {ZeroNumberComponent};