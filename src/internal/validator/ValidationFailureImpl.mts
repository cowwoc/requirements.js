/*
 * Copyright (c) 2019 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import {
	requireThatStringIsNotEmpty,
	internalValueToString,
	type ErrorBuilder,
	Configuration,
	type ValidationFailure,
	assertThatInstanceOf,
	assertThatType,
	isErrorBuilder,
	Type
} from "../internal.mjs";

class ValidationFailureImpl implements ValidationFailure
{
	private readonly message: string;
	private readonly errorBuilder: ErrorBuilder | null;
	private error: Error | null;
	private readonly errorTransformer: (error: Error) => Error;
	private transformedError: Error | null = null;

	/**
	 * @param configuration    - the validator's configuration
	 * @param message          - the failure message
	 * @param errorBuilder - returns the error associated with the failure message
	 * @throws AssertionError if:
	 * <ul>
	 *   <li>Any of the arguments are `undefined` or `null`.</li>
	 *   <li>The error message contains leading or trailing whitespace, or is empty.</li>
	 * </ul>
	 */
	public constructor(configuration: Configuration, message: string, errorBuilder: ErrorBuilder)
	{
		assertThatInstanceOf(configuration, "configuration", Configuration);
		requireThatStringIsNotEmpty(message, "message");
		assertThatType(errorBuilder, "errorBuilder",
			Type.namedClass("ErrorBuilder", () => isErrorBuilder(errorBuilder)));

		this.message = message;
		if (configuration.recordStacktrace())
		{
			this.errorBuilder = errorBuilder;
			this.error = null;
		}
		else
		{
			this.errorBuilder = null;
			this.error = errorBuilder(message);
		}
		this.errorTransformer = configuration.errorTransformer();
	}

	public getMessage()
	{
		return this.message;
	}

	public getType()
	{
		return this.getTransformedError().name;
	}

	public getError(): Error
	{
		return this.getTransformedError();
	}

	private getTransformedError()
	{
		if (this.transformedError === null)
		{
			if (this.error === null)
				this.error = (this.errorBuilder as ErrorBuilder)(this.message);
			this.transformedError = this.errorTransformer(this.error);
		}
		return this.transformedError;
	}

	public toString()
	{
		return `error: ${internalValueToString(this.error)}`;
	}
}

export {ValidationFailureImpl};