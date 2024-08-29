/*
* Copyright (c) 2019 Gili Tzabari
* Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
*/
import {
	StringMappers,
	requireThatValueIsNotNull,
	ValidationFailures
} from "./internal.mjs";

const typedocWorkaround: null | ValidationFailures = null;
// noinspection PointlessBooleanExpressionJS
if (typedocWorkaround !== null)
	console.log("WORKAROUND: https://github.com/microsoft/tsdoc/issues/348");

/**
 * Determines the behavior of a validator.
 */
class Configuration
{
	/**
	 * The default configuration.
	 */
	public static readonly DEFAULT: Configuration = new Configuration();
	private readonly _stringMappers: StringMappers;
	private readonly _allowDiff: boolean;
	private readonly _recordStacktrace: boolean;
	private readonly _throwOnFailure: boolean;
	private readonly _errorTransformer: (error: Error) => Error;

	/**
	 * Creates a new configuration that:
	 * <ul>
	 * <li>Has an empty context.</li>
	 * <li>Throws an error on failure.</li>
	 * <li>Records the error stack trace when a validation failure occurs.</li>
	 * <li>May include a diff that compares the actual and expected values.</li>
	 * </ul>
	 *
	 * @param allowDiff  - `true` if error messages may include a diff that compares actual and expected values
	 * @param stringMappers - the configuration used to map contextual values to a string
	 * @param recordStacktrace - `true` if the error stack trace must be recorded when a validation failure
	 *   occurs. If `false`, the error type remains the same, but the stack trace points to the invocation
	 *   of `elseGetError()`. Users who only plan to
	 *   {@link ValidationFailures.getMessages|list of failure messages} instead of retrieving an error
	 *   may see a performance improvement if this value is set to `false`.
	 * @param throwOnFailure  - `true` if an error is thrown on validation failure
	 * @param errorTransformer - a function that transforms the validation error before it is thrown or
	 *   returned
	 * @throws TypeError if any of the arguments are `undefined` or `null`
	 */
	constructor(allowDiff = true, stringMappers = StringMappers.DEFAULT, recordStacktrace = true,
	            throwOnFailure = true, errorTransformer: (error: Error) => Error = e => e)
	{
		requireThatValueIsNotNull(stringMappers, "stripMappers");
		requireThatValueIsNotNull(errorTransformer, "errorTransformer");
		this._allowDiff = allowDiff;
		this._stringMappers = stringMappers;
		this._recordStacktrace = recordStacktrace;
		this._throwOnFailure = throwOnFailure;
		this._errorTransformer = errorTransformer;
	}

	/**
	 * Returns `true` if error messages may include a diff that compares actual and expected values.
	 *
	 * @returns `true` by default
	 */
	public allowDiff()
	{
		return this._allowDiff;
	}

	/**
	 * Returns the configuration used to map contextual values to a String. Supports common types such as
	 * arrays, numbers, collections, maps, paths and errors.
	 *
	 * @returns a function that takes an object and returns the `string` representation of the object
	 */
	public stringMappers()
	{
		return this._stringMappers;
	}

	/**
	 * Returns `true` if the error stack trace must be recorded when a validation failure occurs. If `false`,
	 * the error type remains the same, but the stack trace points to the invocation of
	 * `elseGetError()`. Users who only plan to
	 * {@link ValidationFailures.getMessages|list of failure messages} instead of retrieving an error
	 * may see a performance improvement if this value is set to `false`.
	 *
	 * @returns `true` if error stack traces must be recorded when a validation failure occurs
	 */
	public recordStacktrace()
	{
		return this._recordStacktrace;
	}

	/**
	 * Returns `true` if an error is thrown on validation failure.
	 *
	 * @returns `true` if an error is thrown on validation failure
	 */
	public throwOnFailure()
	{
		return this._throwOnFailure;
	}

	/**
	 * Returns a function that transforms validation errors before they are thrown or recorded.
	 *
	 * If the function returns `undefined` or `null`, it’s treated as if it returned the input error.
	 *
	 * @returns a function that transforms the validation error
	 */
	public errorTransformer()
	{
		return this._errorTransformer;
	}

	public toString()
	{
		return `Configuration[allowDiff=${this._allowDiff}, , stringMappers=${this._stringMappers.toString()},\
recordStacktrace: ${this._recordStacktrace}, throwOnFailure: ${this._throwOnFailure}`;
	}
}

export {Configuration};