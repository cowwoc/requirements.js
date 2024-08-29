/*
 * Copyright (c) 2017 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */

import {
	MainApplicationScope,
	type Validators,
	JavascriptValidatorsImpl,
	type NumberValidator,
	type BooleanValidator,
	type ArrayValidator,
	type SetValidator,
	type MapValidator,
	type StringValidator,
	type JavascriptRequireThat,
	type JavascriptAssertThat,
	type JavascriptCheckIf,
	Configuration,
	type GlobalConfiguration,
	type ObjectValidator,
	AssertionError
} from "./internal/internal.mjs";

const typedocWorkaround: null | AssertionError = null;
// noinspection PointlessBooleanExpressionJS
if (typedocWorkaround !== null)
	console.log("WORKAROUND: https://github.com/microsoft/tsdoc/issues/348");

/**
 * Creates validators for the Javascript API with an independent configuration.
 * <p>
 * A factory that creates different types of validators.
 * <p>
 * There are three kinds of validators:
 * <ul>
 *   <li>`requireThat` for method preconditions.</li>
 *   <li>`assertThat` for class invariants, and method postconditions.</li>
 *   <li>`checkIf` for returning multiple validation failures.</li>
 * </ul>
 */
abstract class JavascriptValidators
	implements Validators<JavascriptValidators>, JavascriptRequireThat, JavascriptAssertThat, JavascriptCheckIf
{
	/**
	 * Creates a new instance using the default configuration.
	 *
	 * @returns an instance of this interface
	 */
	static newInstance(): JavascriptValidators
	{
		return new JavascriptValidatorsImpl(MainApplicationScope.INSTANCE, Configuration.DEFAULT);
	}

	abstract copy(): JavascriptValidators;

	abstract getContext(): Map<string, unknown>;

	abstract withContext(value: unknown, name: string): JavascriptValidators;

	abstract getGlobalConfiguration(): GlobalConfiguration;

	abstract removeContext(name: string): JavascriptValidators;

	abstract requireThat(value: number, name: string): NumberValidator;
	abstract requireThat(value: boolean, name: string): BooleanValidator;
	abstract requireThat<E>(value: E[], name: string): ArrayValidator<E>;
	abstract requireThat<E>(value: Set<E>, name: string): SetValidator<E>;
	abstract requireThat<K, V>(value: Map<K, V>, name: string): MapValidator<K, V>;
	abstract requireThat(value: string, name: string): StringValidator;
	abstract requireThat<T>(value: T, name: string): ObjectValidator<T>;

	abstract assertThat(value: number, name?: string): NumberValidator;
	abstract assertThat(value: boolean, name?: string): BooleanValidator;
	abstract assertThat<E>(value: E[], name?: string): ArrayValidator<E>;
	abstract assertThat<E>(value: Set<E>, name?: string): SetValidator<E>;
	abstract assertThat<K, V>(value: Map<K, V>, name?: string): MapValidator<K, V>;
	abstract assertThat(value: string, name?: string): StringValidator;
	abstract assertThat<T>(value: T, name?: string): ObjectValidator<T>;

	abstract checkIf(value: number, name?: string): NumberValidator;
	abstract checkIf(value: boolean, name?: string): BooleanValidator;
	abstract checkIf<E>(value: E[], name?: string): ArrayValidator<E>;
	abstract checkIf<E>(value: Set<E>, name?: string): SetValidator<E>;
	abstract checkIf<K, V>(value: Map<K, V>, name?: string): MapValidator<K, V>;
	abstract checkIf(value: string, name?: string): StringValidator;
	abstract checkIf<T>(value: T, name?: string): ObjectValidator<T>;
}

export {JavascriptValidators};