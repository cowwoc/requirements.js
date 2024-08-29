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
	type ObjectValidator,
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
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is null
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	requireThat(value: number, name: string): NumberValidator;

	/**
	 * Validates the state of a `boolean`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails.
	 *
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is null
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	requireThat(value: boolean, name: string): BooleanValidator;

	/**
	 * Validates the state of an `object`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails.
	 *
	 * @typeParam T - the type of the value
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is null
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	requireThat<T>(value: T, name: string): ObjectValidator<T>;

	/**
	 * Validates the state of an array.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails.
	 *
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is null
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	requireThat<E>(value: E[], name: string): ArrayValidator<E>;

	/**
	 * Validates the state of a `Set`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails.
	 *
	 * @typeParam E - the type of elements in the set
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is null
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	requireThat<E>(value: Set<E>, name: string): SetValidator<E>;

	/**
	 * Validates the state of a `Map`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails.
	 *
	 * @typeParam K - the type of keys in the map
	 * @typeParam V - the type of values in the map
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is null
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	requireThat<K, V>(value: Map<K, V>, name: string): MapValidator<K, V>;

	/**
	 * Validates the state of a `string`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails.
	 *
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is null
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	requireThat(value: string, name: string): StringValidator;
}

export type {JavascriptRequireThat};