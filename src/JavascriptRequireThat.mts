/*
 * Copyright (c) 2017 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */

import {
	type NumberValidator,
	type BooleanValidator,
	type ArrayValidator,
	type SetValidator,
	type MapValidator,
	type StringValidator,
	type ObjectValidator
} from "./internal/internal.mjs";

/**
 * Creates validators for the Javascript API that throw errors immediately on validation failure.
 */
interface JavascriptRequireThat
{
	/**
	 * Validates the state of a `number`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails.
	 *
	 * @typeParam T - the type of the value
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	requireThatNumber<T extends number | undefined | null>(value: T, name: string): NumberValidator<T>;

	/**
	 * Validates the state of a `boolean`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails.
	 *
	 * @typeParam T - the type of the value
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	requireThatBoolean<T extends boolean | undefined | null>(value: T, name: string): BooleanValidator<T>;

	/**
	 * Validates the state of an array.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails.
	 *
	 * @typeParam T - the type of the value
	 * @typeParam E - the type of elements in the collection
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	requireThatArray<T extends E[] | undefined | null, E>(value: T, name: string): ArrayValidator<T, E>;

	/**
	 * Validates the state of a `Set`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails.
	 *
	 * @typeParam T - the type of the value
	 * @typeParam E - the type of elements in the set
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	requireThatSet<T extends Set<E> | undefined | null, E>(value: T, name: string): SetValidator<T, E>;

	/**
	 * Validates the state of a `Map`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails.
	 *
	 * @typeParam T - the type of the value
	 * @typeParam K - the type of keys in the map
	 * @typeParam V - the type of values in the map
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	requireThatMap<T extends Map<K, V> | undefined | null, K, V>(value: T, name: string): MapValidator<T, K, V>;

	/**
	 * Validates the state of a `string`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails.
	 *
	 * @typeParam T - the type of the value
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	requireThatString<T extends string | undefined | null>(value: T, name: string): StringValidator<T>;

	/**
	 * Validates the state of an `object`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails.
	 *
	 * @typeParam T - the type of the value
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	requireThatObject<T extends object | undefined | null>(value: T, name: string): ObjectValidator<T>;
}

export type {JavascriptRequireThat};