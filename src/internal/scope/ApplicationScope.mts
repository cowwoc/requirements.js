/*
 * Copyright (c) 2016 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import {
	type GlobalConfiguration,
	type ProcessScope
} from "../../internal/internal.mjs";

/**
 * The configuration of an application. A process may contain multiple applications.
 */
interface ApplicationScope extends ProcessScope
{
	/**
	 * @returns the global configuration inherited by all validators
	 */
	getGlobalConfiguration(): GlobalConfiguration;
}

/**
 * @param value - a value
 * @returns true if the value is an instance of `ApplicationScope`
 */
function isApplicationScope(value: unknown): value is ApplicationScope
{
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	return (value as ApplicationScope).getGlobalConfiguration !== undefined;
}

export {
	type ApplicationScope,
	isApplicationScope
};