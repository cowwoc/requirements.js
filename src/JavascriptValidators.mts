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
	type UnknownValidator,
	AssertionError
} from "./internal/internal.mjs";

const typedocWorkaround: null | AssertionError = null;
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// noinspection PointlessBooleanExpressionJS
if (typedocWorkaround !== null)
	console.log("WORKAROUND: https://github.com/microsoft/tsdoc/issues/348");

/* eslint-enable @typescript-eslint/no-unnecessary-condition */

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
	public static newInstance(): JavascriptValidators
	{
		return new JavascriptValidatorsImpl(MainApplicationScope.INSTANCE, Configuration.DEFAULT);
	}

	public abstract copy(): JavascriptValidators;

	public abstract getContext(): Map<string, unknown>;

	public abstract withContext(value: unknown, name: string): this;

	public abstract getGlobalConfiguration(): GlobalConfiguration;

	public abstract removeContext(name: string): this;

	public abstract requireThatNumber<T extends number | undefined | null>
	(value: T, name: string): NumberValidator<T>;

	public abstract requireThatBoolean<T extends boolean | undefined | null>
	(value: T, name: string): BooleanValidator<T>;

	public abstract requireThatArray<T extends E[] | undefined | null, E>
	(value: T, name: string): ArrayValidator<T, E>;

	public abstract requireThatSet<T extends Set<E> | undefined | null, E>
	(value: T, name: string): SetValidator<T, E>;

	public abstract requireThatMap<T extends Map<K, V> | undefined | null, K, V>
	(value: T, name: string): MapValidator<T, K, V>;

	public abstract requireThatString<T extends string | undefined | null>
	(value: T, name: string): StringValidator<T>;

	public abstract requireThat<T>(value: T, name: string): UnknownValidator<T>;

	public abstract assertThatNumber<T extends number | undefined | null>
	(value: T, name?: string): NumberValidator<T>;

	public abstract assertThatBoolean<T extends boolean | undefined | null>
	(value: T, name?: string): BooleanValidator<T>;

	public abstract assertThatArray<T extends E[] | undefined | null, E>
	(value: T, name?: string): ArrayValidator<T, E>;

	public abstract assertThatSet<T extends Set<E> | undefined | null, E>
	(value: T, name?: string): SetValidator<T, E>;

	public abstract assertThatMap<T extends Map<K, V> | undefined | null, K, V>
	(value: T, name?: string): MapValidator<T, K, V>;

	public abstract assertThatString<T extends string | undefined | null>
	(value: T, name?: string): StringValidator<T>;

	public abstract assertThat<T>(value: T, name?: string): UnknownValidator<T>;

	public abstract checkIfNumber<T extends number | undefined | null>
	(value: T, name?: string): NumberValidator<T>;

	public abstract checkIfBoolean<T extends boolean | undefined | null>
	(value: T, name?: string): BooleanValidator<T>;

	public abstract checkIfArray<T extends E[] | undefined | null, E>
	(value: T, name?: string): ArrayValidator<T, E>;

	public abstract checkIfSet<T extends Set<E> | undefined | null, E>
	(value: T, name?: string): SetValidator<T, E>;

	public abstract checkIfMap<T extends Map<K, V> | undefined | null, K, V>
	(value: T, name?: string): MapValidator<T, K, V>;

	public abstract checkIfString<T extends string | undefined | null>
	(value: T, name?: string): StringValidator<T>;

	public abstract checkIf<T>(value: T, name?: string): UnknownValidator<T>;
}

export {JavascriptValidators};