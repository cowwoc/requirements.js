/*
 * Copyright (c) 2017 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */

import {
	type BooleanValidator,
	type SetValidator,
	type MapValidator,
	type StringValidator,
	type NumberValidator,
	type ObjectValidator,
	type ArrayValidator,
	AssertionError
} from "./internal/internal.mjs";

const typedocWorkaround: null | AssertionError = null;
// noinspection PointlessBooleanExpressionJS
if (typedocWorkaround !== null)
	console.log("WORKAROUND: https://github.com/microsoft/tsdoc/issues/348");

/**
 * Creates validators for the Javascript API that throw `AssertionError` immediately on validation failure.
 */
interface JavascriptAssertThat
{
	/**
	 * Validates the state of a `number`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails. This error is then
	 * converted into an {@link AssertionError}. Errors unrelated to validation failures are not converted.
	 *
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	assertThat(value: number, name?: string): NumberValidator;

	/**
	 * Validates the state of a `boolean`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails. This error is then
	 * converted into an {@link AssertionError}. Errors unrelated to validation failures are not converted.
	 *
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	assertThat(value: boolean, name?: string): BooleanValidator;

	/**
	 * Validates the state of an `object`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails. This error is then
	 * converted into an {@link AssertionError}. Errors unrelated to validation failures are not converted.
	 *
	 * @typeParam T - the type of the value
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	assertThat<T>(value: T, name?: string): ObjectValidator<T>;

	/**
	 * Validates the state of an array.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails. This error is then
	 * converted into an {@link AssertionError}. Errors unrelated to validation failures are not converted.
	 *
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	assertThat<E>(value: E[], name?: string): ArrayValidator<E>;

	/**
	 * Validates the state of a `Set`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails. This error is then
	 * converted into an {@link AssertionError}. Errors unrelated to validation failures are not converted.
	 *
	 * @typeParam E - the type of elements in the set
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	assertThat<E>(value: Set<E>, name?: string): SetValidator<E>;

	/**
	 * Validates the state of a `Map`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails. This error is then
	 * converted into an {@link AssertionError}. Errors unrelated to validation failures are not converted.
	 *
	 * @typeParam K - the type of keys in the map
	 * @typeParam V - the type of values in the map
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	assertThat<K, V>(value: Map<K, V>, name?: string): MapValidator<K, V>;

	/**
	 * Validates the state of a `string`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails. This error is then
	 * converted into an {@link AssertionError}. Errors unrelated to validation failures are not converted.
	 *
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	assertThat(value: string, name?: string): StringValidator;
}

export type {JavascriptAssertThat};