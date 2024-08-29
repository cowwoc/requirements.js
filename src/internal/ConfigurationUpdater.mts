/*
 * Copyright (c) 2019 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */

import {
	type MutableStringMappers,
	ValidationFailures
} from "./internal.mjs";

const typedocWorkaround: null | ValidationFailures = null;
// noinspection PointlessBooleanExpressionJS
if (typedocWorkaround !== null)
	console.log("WORKAROUND: https://github.com/microsoft/tsdoc/issues/348");

/**
 * Updates the configuration used by new validators.
 */
interface ConfigurationUpdater
{
	/**
	 * Returns `true` if error messages may include a diff that compares actual and expected values.
	 *
	 * @returns `true` by default
	 */
	allowDiff(): boolean;

	/**
	 * Specifies that error messages may include a diff that compares actual and expected values.
	 *
	 * @param allowDiff - `true` by default
	 * @returns this
	 */
	allowDiff(allowDiff: boolean): ConfigurationUpdater;

	allowDiff(mayDiff?: boolean): boolean | ConfigurationUpdater;

	/**
	 * Returns the configuration used to map contextual values to a String. Supports common types such as
	 * arrays or numbers.
	 *
	 * @returns a function that takes an object and returns the `string` representation of the object
	 */
	stringMappers(): MutableStringMappers;

	/**
	 * Returns `true` if error stack traces should reference the code that triggers a validation
	 * failure. When set to `false`, the error type remains unchanged, but the stack trace location is
	 * undefined. Users who only plan to {@link ValidationFailures.getMessages|list of failure messages}
	 * instead of errors may experience a performance improvement if this value is set to `false`.
	 *
	 * @returns `true` if errors must be recorded when a validation failure occurs
	 */
	recordStacktrace(): boolean;

	/**
	 * Specifies whether error stack traces should reference the code that triggers a validation failure.
	 * When set to `false`, the error type remains unchanged, but the stack trace location is
	 * undefined. Users who only plan to {@link ValidationFailures.getMessages|list of failure messages}
	 * instead of errors may experience a performance improvement if this value is set to `false`.
	 *
	 * @param recordStacktrace - `true` if errors must be recorded when a validation failure occurs
	 * @returns this
	 */
	recordStacktrace(recordStacktrace: boolean): ConfigurationUpdater;

	recordStacktrace(recordStacktrace?: boolean): boolean | ConfigurationUpdater;

	/**
	 * Returns a function that transforms the validation error before it is thrown or returned. If the function
	 * returns `undefined` or `null`, it’s treated as if it returned the input error.
	 *
	 * @returns a function that transforms the validation error
	 */
	errorTransformer(): (error: Error) => Error;

	/**
	 * Sets a function that transforms the validation error before it is thrown or returned. If the function
	 * returns `undefined` or `null`, it’s treated as if it returned the input error.
	 *
	 * @param errorTransformer - a function that transforms the validation error before it is thrown or returned
	 * @returns this
	 */
	errorTransformer(errorTransformer: (error: Error) => Error): ConfigurationUpdater;

	errorTransformer(errorTransformer?: (error: Error) => Error): ((error: Error) => Error) | ConfigurationUpdater;

	/**
	 * Applies the changes to the configuration.
	 */
	close(): void;
}

export type {ConfigurationUpdater};