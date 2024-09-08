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
	type UnknownValidator,
	type ArrayValidator,
	AssertionError
} from "./internal/internal.mjs";

const typedocWorkaround: null | AssertionError = null;
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// noinspection PointlessBooleanExpressionJS
if (typedocWorkaround !== null)
	console.log("WORKAROUND: https://github.com/microsoft/tsdoc/issues/348");

/* eslint-enable @typescript-eslint/no-unnecessary-condition */

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
	 * @typeParam T - the type of the value
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	assertThatNumber<T extends number | undefined | null>(value: T, name?: string): NumberValidator<T>;

	/**
	 * Validates the state of a `boolean`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails. This error is then
	 * converted into an {@link AssertionError}. Errors unrelated to validation failures are not converted.
	 *
	 * @typeParam T - the type of the value
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	assertThatBoolean<T extends boolean | undefined | null>(value: T, name?: string): BooleanValidator<T>;

	/**
	 * Validates the state of an array.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails. This error is then
	 * converted into an {@link AssertionError}. Errors unrelated to validation failures are not converted.
	 *
	 * @typeParam T - the type of the value
	 * @typeParam E - the type of elements in the collection
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	assertThatArray<T extends E[] | undefined | null, E>(value: T, name?: string): ArrayValidator<T, E>;

	/**
	 * Validates the state of a `Set`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails. This error is then
	 * converted into an {@link AssertionError}. Errors unrelated to validation failures are not converted.
	 *
	 * @typeParam T - the type of the value
	 * @typeParam E - the type of elements in the set
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	assertThatSet<T extends Set<E> | undefined | null, E>(value: T, name?: string): SetValidator<T, E>;

	/**
	 * Validates the state of a `Map`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails. This error is then
	 * converted into an {@link AssertionError}. Errors unrelated to validation failures are not converted.
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
	assertThatMap<T extends Map<K, V> | undefined | null, K, V>(value: T, name?: string): MapValidator<T, K, V>;

	/**
	 * Validates the state of a `string`.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails. This error is then
	 * converted into an {@link AssertionError}. Errors unrelated to validation failures are not converted.
	 *
	 * @typeParam T - the type of the value
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	assertThatString<T extends string | undefined | null>(value: T, name?: string): StringValidator<T>;

	/**
	 * Validates the state of an unknown value or a value that does not have a specialized validator.
	 * <p>
	 * The returned validator throws an error immediately if a validation fails. This error is then
	 * converted into an {@link AssertionError}. Errors unrelated to validation failures are not converted.
	 *
	 * @typeParam T - the type of the value
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	assertThat<T>(value: T, name?: string): UnknownValidator<T>;
}

export type {JavascriptAssertThat};