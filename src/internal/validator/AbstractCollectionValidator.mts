/*
 * Copyright (c) 2019 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import {
	type ApplicationScope,
	Type,
	assertThatType,
	Pluralizer,
	Configuration,
	type ValidationFailure,
	AbstractValidator,
	ValidationTarget,
	Difference,
	requireThatValueIsNotNull,
	objectIsEmpty,
	objectIsNotEmpty,
	type UnsignedNumberValidator,
	ObjectSizeValidatorImpl,
	collectionContains,
	collectionDoesNotContainExactly,
	collectionContainsAny,
	collectionDoesNotContainAny,
	collectionContainsAll,
	collectionDoesNotContainAll,
	collectionDoesNotContainDuplicates,
	collectionDoesNotContain,
	collectionContainsExactly
} from "../internal.mjs";
import {isDeepStrictEqual} from "util";

/**
 * Validates the state of a collection.
 *
 * @typeParam T - the type the collection
 * @typeParam E - the type of elements in the array
 */
abstract class AbstractCollectionValidator<T extends undefined | null | E[] | Set<E>, E>
	extends AbstractValidator<T>
{
	protected readonly pluralizer: Pluralizer;

	/**
	 * @param scope         - the application configuration
	 * @param configuration - the validator configuration
	 * @param name          - the name of the value
	 * @param value         - the value
	 * @param pluralizer    - the type of items in the array
	 * @param context       - the contextual information set by a parent validator or the user
	 * @param failures      - the list of validation failures
	 * @throws TypeError if `name` is `undefined` or `null`
	 * @throws RangeError if `name` contains whitespace, or is empty
	 * @throws AssertionError if `scope`, `configuration`, `value`, `context` or `failures` are null
	 */
	public constructor(scope: ApplicationScope, configuration: Configuration, name: string,
	                   value: ValidationTarget<T>, pluralizer: Pluralizer, context: Map<string, unknown>,
	                   failures: ValidationFailure[])
	{
		super(scope, configuration, name, value, context, failures);

		requireThatValueIsNotNull(pluralizer, "pluralizer");
		this.pluralizer = pluralizer;
	}

	public isEmpty(): this
	{
		if (this.value.validationFailed(v => this.getLength(v) === 0))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				objectIsEmpty(this).toString());
		}
		return this;
	}

	/**
	 * @param value - the collection
	 * @returns the length of the collection
	 */
	protected getLength(value: E[] | Set<E>)
	{
		return this.collectionAsArray(value).length;
	}

	/**
	 * @param value - the value
	 * @returns the array representation of the value
	 */
	protected collectionAsArray(value: E[] | Set<E>): E[]
	{
		if (Array.isArray(value))
			return value;
		assertThatType(value, "value", Type.namedClass("Set"));
		return Array.from(value);
	}

	/**
	 * @param value - the value
	 * @returns the array representation of the value
	 */
	protected collectionAsSet(value: E[] | Set<E>): Set<E>
	{
		if (value instanceof Set)
			return value;
		assertThatType(value, "value", Type.ARRAY);
		return new Set<E>(value);
	}

	public isNotEmpty(): this
	{
		if (this.value.validationFailed(v => this.getLength(v) !== 0))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				objectIsNotEmpty(this).toString());
		}
		return this;
	}

	contains(expected: E): this;
	contains(expected: E, name?: string): this
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.validationFailed(v => this.collectionContainsElement(v, expected)))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				collectionContains(this, name ?? null, expected).toString());
		}
		return this;
	}

	/**
	 * Indicates if an array contains at least one element of another array.
	 *
	 * @param value - a collection
	 * @param element - an element
	 * @returns true if `value` contains the element
	 */
	protected collectionContainsElement(value: E[] | Set<E>, element: E): boolean
	{
		// Set.has(), indexOf(), includes() do not work for multidimensional arrays:
		// http://stackoverflow.com/a/24943461/14731
		const valueAsArray = this.collectionAsArray(value);
		for (let i = 0; i < valueAsArray.length; ++i)
		{
			if (isDeepStrictEqual(valueAsArray[i], element))
				return true;
		}
		return false;
	}

	doesNotContain(unwanted: E): this;
	doesNotContain(unwanted: E, name?: string): this
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.validationFailed(v => !this.collectionContainsElement(v, unwanted)))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				collectionDoesNotContain(this, name ?? null, unwanted).toString());
		}
		return this;
	}

	containsExactly(expected: E[], name?: string): this;
	containsExactly(expected: Set<E>, name?: string): this;
	containsExactly(expected: E[] | Set<E>, name?: string): this
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		const difference = this.value.undefinedOrNullToInvalid().
			map(v => Difference.actualVsOther(v, expected)).or(null);
		if (difference === null || !difference.areTheSame())
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				collectionContainsExactly(this, difference, name ?? null, expected, this.pluralizer).
					toString());
		}
		return this;
	}

	doesNotContainExactly(unwanted: E[], name?: string): this;
	doesNotContainExactly(unwanted: Set<E>, name?: string): this;
	doesNotContainExactly(unwanted: E[] | Set<E>, name?: string): this
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		const difference = this.value.undefinedOrNullToInvalid().
			map(v => Difference.actualVsOther(v, unwanted)).or(null);
		if (difference === null || !difference.areDifferent())
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				collectionDoesNotContainExactly(this, name ?? null, unwanted, this.pluralizer).toString());
		}
		return this;
	}

	containsAny(expected: E[], name?: string): this;
	containsAny(expected: Set<E>, name?: string): this;
	containsAny(expected: E[] | Set<E>, name?: string): this
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.validationFailed(v =>
			!this.isDisjoint(this.collectionAsSet(v), this.collectionAsSet(expected))))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				collectionContainsAny(this, name ?? null, expected, this.pluralizer).toString());
		}
		return this;
	}

	/**
	 * @param first - a set
	 * @param second - a second set
	 * @returns `true` if the sets do not contain any of the same elements
	 */
	private isDisjoint(first: Set<E>, second: Set<E>)
	{
		// WORKAROUND: Can be replaced by Set.isDisjointFrom() once Typescript supports ES2024
		for (const v of first)
			if (second.has(v))
				return false;
		return true;
	}

	doesNotContainAny(unwanted: E[], name?: string): this;
	doesNotContainAny(unwanted: Set<E>, name?: string): this;
	doesNotContainAny(unwanted: E[] | Set<E>, name?: string): this
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		const difference = this.value.undefinedOrNullToInvalid().
			map(v => Difference.actualVsOther(v, unwanted)).or(null);
		if (difference === null || !(difference.common.size === 0))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				collectionDoesNotContainAny(this, difference, name ?? null, unwanted, this.pluralizer).
					toString());
		}
		return this;
	}

	containsAll(expected: E[], name?: string): this;
	containsAll(expected: Set<E>, name?: string): this;
	containsAll(expected: E[] | Set<E>, name?: string): this
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		const difference = this.value.undefinedOrNullToInvalid().
			map(v => Difference.actualVsOther(v, expected)).or(null);
		if (difference === null || difference.onlyInOther.size !== 0)
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				collectionContainsAll(this, difference, name ?? null, expected, this.pluralizer).
					toString());
		}
		return this;
	}

	doesNotContainAll(unwanted: E[], name?: string): this;
	doesNotContainAll(unwanted: Set<E>, name?: string): this;
	doesNotContainAll(unwanted: E[] | Set<E>, name?: string): this
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.validationFailed(v => !this.collectionContainsAll(v, unwanted)))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				collectionDoesNotContainAll(this, name ?? null, unwanted, this.pluralizer).
					toString());
		}
		return this;
	}

	/**
	 * Indicates if an array contains all elements of another array.
	 *
	 * @param value - the value
	 * @param expected - a collection of expected elements
	 * @returns true if `value` contains all the `expected` elements
	 */
	private collectionContainsAll(value: E[] | Set<E>, expected: E[] | Set<E>): boolean
	{
		// WORKAROUND: Replace with Set.isSupersetOf() once Typescript supports ES2024
		for (const element of this.collectionAsArray(expected))
		{
			if (!this.collectionContainsElement(value, element))
				return false;
		}
		return true;
	}

	doesNotContainDuplicates(): this
	{
		const duplicates = this.value.undefinedOrNullToInvalid().map(v =>
			this.getDuplicates(this.collectionAsArray(v)));
		if (duplicates.validationFailed(v => v.size === 0))
		{
			this.failOnUndefinedOrNull();
			this.addRangeError(
				collectionDoesNotContainDuplicates(this, duplicates.or(null), this.pluralizer).
					toString());
		}
		return this;
	}

	/**
	 * @param value - the value
	 * @returns the duplicate elements in the value
	 */
	protected getDuplicates(value: E[]): Set<E>
	{
		const unique = new Set<E>();
		const duplicates = new Set<E>();
		for (let i = 0; i < value.length; ++i)
		{
			const element = value[i];
			if (unique.has(element))
				duplicates.add(element);
			else
				unique.add(element);
		}
		return duplicates;
	}

	length(): UnsignedNumberValidator
	{
		this.failOnUndefinedOrNull();
		return new ObjectSizeValidatorImpl(this.scope, this._configuration, this, this.name + ".length()",
			this.value.undefinedOrNullToInvalid().map(v => this.getLength(v)), this.pluralizer, this.context,
			this.failures);
	}
}

export {AbstractCollectionValidator};