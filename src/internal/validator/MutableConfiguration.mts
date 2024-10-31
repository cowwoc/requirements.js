/*
 * Copyright (c) 2019 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import {
	internalValueToString,
	MutableStringMappers,
	Configuration
} from "../internal.mjs";

/**
 * Determines the behavior of a validator.
 */
class MutableConfiguration
{
	private readonly _stringMappers: MutableStringMappers;
	private _allowDiff: boolean;
	private _recordStacktrace: boolean;
	private _throwOnFailure: boolean;
	private _errorTransformer: (error: Error) => Error;

	/**
	 * Creates a new configuration.
	 *
	 * @param allowDiff           - `true` if error messages may include a diff that compares actual and
	 *   expected values
	 * @param stringMappers     - the configuration used to map contextual values to a String
	 * @param recordStacktrace - `true` if the error stack trace must be recorded when a validation failure
	 *   occurs. If `false`, the error type remains the same, but the stack trace points to the invocation
	 *   of `elseGetError()`. Users who only plan to
	 *   {@link ValidationFailures.getMessages|list of failure messages} instead of retrieving an error
	 *   may see a performance improvement if this value is set to `false`.
	 * @param throwOnFailure    - `true` if an error is thrown on validation failure.
	 * @param errorTransformer  - a function that transforms the validation error into a suitable runtime
	 *                            error or error
	 * @throws TypeError if any of the arguments are `undefined` or `null`
	 */
	private constructor(allowDiff: boolean, stringMappers: MutableStringMappers, recordStacktrace: boolean,
	                    throwOnFailure: boolean, errorTransformer: (error: Error) => Error)
	{
		this._allowDiff = allowDiff;
		this._stringMappers = stringMappers;
		this._recordStacktrace = recordStacktrace;
		this._throwOnFailure = throwOnFailure;
		this._errorTransformer = errorTransformer;
	}

	/**
	 * @param configuration - the immutable configuration
	 * @returns a mutable copy of the configuration
	 */
	public static from(configuration: Configuration): MutableConfiguration
	{
		return new MutableConfiguration(configuration.allowDiff(),
			MutableStringMappers.from(configuration.stringMappers()), configuration.recordStacktrace(),
			configuration.throwOnFailure(), configuration.errorTransformer());
	}

	/**
	 * Returns an immutable copy of this configuration.
	 *
	 * @returns an immutable copy of this configuration
	 */
	public toImmutable()
	{
		return new Configuration(this._allowDiff, this._stringMappers.toImmutable(), this._recordStacktrace,
			this._throwOnFailure, this._errorTransformer);
	}

	/**
	 * Returns `true` if error messages may include a diff that compares actual and expected values.
	 *
	 * @returns `true` by default
	 */
	public allowDiff(): boolean;
	/**
	 * Specifies whether error messages may include a diff that compares actual and expected values.
	 *
	 * @param mayDiff - `true` if error messages may include a diff, `false` otherwise
	 * @returns this
	 */
	public allowDiff(mayDiff: boolean): this;
	public allowDiff(mayDiff?: boolean): boolean | this
	{
		if (mayDiff === undefined)
			return this._allowDiff;
		this._allowDiff = mayDiff;
		return this;
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
	 * Returns `true` if error stack traces should reference the code that triggers a validation
	 * failure. When set to `false`, the error type remains unchanged, but the stack trace location is
	 * undefined. Users who only plan to {@link ValidationFailures.getMessages|list of failure messages}
	 * instead of errors may experience a performance improvement if this value is set to `false`.
	 *
	 * @returns `true` if errors must be recorded when a validation failure occurs
	 */
	public recordStacktrace(): boolean;
	/**
	 * Specifies whether error stack traces should reference the code that triggers a validation failure.
	 * When set to `false`, the error type remains unchanged, but the stack trace location is
	 * undefined. Users who only plan to {@link ValidationFailures.getMessages|list of failure messages}
	 * instead of errors may experience a performance improvement if this value is set to `false`.
	 *
	 * @param recordStacktrace - `true` if errors must be recorded when a validation failure occurs
	 * @returns this
	 */
	public recordStacktrace(recordStacktrace: boolean): this;
	public recordStacktrace(recordStacktrace?: boolean): boolean | this
	{
		if (recordStacktrace === undefined)
			return this._recordStacktrace;
		this._recordStacktrace = recordStacktrace;
		return this;
	}

	/**
	 * Returns `true` if an error is thrown on validation failure.
	 *
	 * @returns `true` if an error is thrown on validation failure
	 */
	public throwOnFailure(): boolean;
	/**
	 * Specifies whether an error is thrown on validation failure.
	 *
	 * @param throwOnFailure - `true` if an error is thrown on validation failure
	 * @returns this
	 */
	public throwOnFailure(throwOnFailure: boolean): this;
	public throwOnFailure(throwOnFailure?: boolean): boolean | this
	{
		if (throwOnFailure === undefined)
			return this._throwOnFailure;
		this._throwOnFailure = throwOnFailure;
		return this;
	}

	/**
	 * Returns a function that transforms the validation error into a suitable runtime error or error.
	 * The input and output of the function must be subclasses of `RuntimeError` or
	 * `Error`. If the function returns `null` the input error will be thrown.
	 *
	 * @returns a function that transforms the validation error
	 */
	public errorTransformer(): (error: Error) => Error;
	/**
	 * Transform the validation error into a suitable runtime error or error. If the function returns
	 * `undefined` or `null` then the input error will be thrown.
	 *
	 * @param errorTransformer - a function that transforms the validation error
	 * @throws TypeError if `errorTransformer` is `undefined` or `null`
	 * @returns this
	 */
	public errorTransformer(errorTransformer: (error: Error) => Error): this;
	public errorTransformer(errorTransformer?: (error: Error) => Error): ((error: Error) => Error) | this
	{
		if (errorTransformer === undefined)
			return this._errorTransformer;
		this._errorTransformer = errorTransformer;
		return this;
	}

	public toString()
	{
		return `Configuration[allowDiff=${this._allowDiff}, stringMappers=\
${internalValueToString(this._stringMappers)}, recordStacktrace: ${this._recordStacktrace}, \
throwOnFailure: ${this._throwOnFailure}]`;
	}
}

export {MutableConfiguration};