/*
 * Copyright (c) 2017 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */

import {
	type BooleanValidator,
	type StringValidator,
	type NumberValidator,
	type ObjectValidator,
	type ArrayValidator,
	type SetValidator,
	type MapValidator,
} from "./internal/internal.mjs";

/**
 * Creates validators for the Javascript API that capture errors on validation failure rather than throwing
 * them immediately.
 */
interface JavascriptCheckIf
{
	/**
	 * Validates the state of a `number`.
	 * <p>
	 * The returned validator captures errors on validation failure rather than throwing them immediately.
	 * These errors can be retrieved or thrown once the validation completes. Errors unrelated to
	 * validation failures are thrown immediately.
	 *
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	checkIf(value: number, name: string): NumberValidator;

	/**
	 * Validates the state of a `boolean`.
	 * <p>
	 * The returned validator captures errors on validation failure rather than throwing them immediately.
	 * These errors can be retrieved or thrown once the validation completes. Errors unrelated to
	 * validation failures are thrown immediately.
	 *
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	checkIf(value: boolean, name: string): BooleanValidator;

	/**
	 * Validates the state of an `object`.
	 * <p>
	 * The returned validator captures errors on validation failure rather than throwing them immediately.
	 * These errors can be retrieved or thrown once the validation completes. Errors unrelated to
	 * validation failures are thrown immediately.
	 *
	 * @typeParam T - the type of the value
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	checkIf<T>(value: T, name: string): ObjectValidator<T>;

	/**
	 * Validates the state of an array.
	 * <p>
	 * The returned validator captures errors on validation failure rather than throwing them immediately.
	 * These errors can be retrieved or thrown once the validation completes. Errors unrelated to
	 * validation failures are thrown immediately.
	 *
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is `null`
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	checkIf<E>(value: E[], name: string): ArrayValidator<E>;

	/**
	 * Validates the state of a `Set`.
	 * <p>
	 * The returned validator captures errors on validation failure rather than throwing them immediately.
	 * These errors can be retrieved or thrown once the validation completes. Errors unrelated to
	 * validation failures are thrown immediately.
	 *
	 * @typeParam E - the type of elements in the set
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is null
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	checkIf<E>(value: Set<E>, name: string): SetValidator<E>;

	/**
	 * Validates the state of a `Map`.
	 * <p>
	 * The returned validator captures errors on validation failure rather than throwing them immediately.
	 * These errors can be retrieved or thrown once the validation completes. Errors unrelated to
	 * validation failures are thrown immediately.
	 *
	 * @typeParam K - the type of keys in the map
	 * @typeParam V - the type of values in the map
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is null
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	checkIf<K, V>(value: Map<K, V>, name: string): MapValidator<K, V>;

	/**
	 * Validates the state of a `string`.
	 * <p>
	 * The returned validator captures errors on validation failure rather than throwing them immediately.
	 * These errors can be retrieved or thrown once the validation completes. Errors unrelated to
	 * validation failures are thrown immediately.
	 *
	 * @param value - the value
	 * @param name  - the name of the value
	 * @returns a validator for the value
	 * @throws TypeError if `name` is null
	 * @throws RangeError if `name` contains whitespace or is empty
	 */
	checkIf(value: string, name: string): StringValidator;
}

export type {JavascriptCheckIf};