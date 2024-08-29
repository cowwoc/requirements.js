/*
 * Copyright (c) 2019 Gili Tzabari
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import isEqual from "lodash.isequal";
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
	collectionContainsExactly,
	collectionContainsSameNullity
} from "../internal.mjs";

/**
 * Validates the state of a collection.
 *
 * @typeParam S - the type of validator returned by the methods
 * @typeParam T - the type the collection
 * @typeParam E - the type of elements in the array
 */
abstract class AbstractCollectionValidator<S, T extends E[] | Set<E>, E>
	extends AbstractValidator<S, T>
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
	 * @throws TypeError if `name` is null
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

	public isEmpty(): S
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && this.getLength(v) === 0))
		{
			this.addRangeError(
				objectIsEmpty(this).toString());
		}
		return this.self();
	}

	/**
	 * @param value - the collection
	 * @returns the length of the collection
	 */
	protected getLength(value: T)
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

	public isNotEmpty(): S
	{
		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && this.getLength(v) !== 0))
		{
			this.addRangeError(
				objectIsNotEmpty(this).toString());
		}
		return this.self();
	}

	contains(expected: E): S;
	contains(expected: E, name?: string): S
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && this.collectionContainsElement(v, expected)))
		{
			this.addRangeError(
				collectionContains(this, name ?? null, expected).toString());
		}
		return this.self();
	}

	/**
	 * Indicates if an array contains at least one element of another array.
	 *
	 * @param value - a collection
	 * @param element - an element
	 * @returns true if `value` contains the element
	 */
	protected collectionContainsElement(value: T, element: E): boolean
	{
		// Set.has(), indexOf(), includes() do not work for multidimensional arrays:
		// http://stackoverflow.com/a/24943461/14731
		const valueAsArray = this.collectionAsArray(value);
		for (let i = 0; i < valueAsArray.length; ++i)
		{
			if (isEqual(valueAsArray[i], element))
				return true;
		}
		return false;
	}

	doesNotContain(unwanted: E): S;
	doesNotContain(unwanted: E, name?: string): S
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && !this.collectionContainsElement(v, unwanted)))
		{
			this.addRangeError(
				collectionDoesNotContain(this, name ?? null, unwanted).toString());
		}
		return this.self();
	}

	containsExactly(expected: E[], name?: string): S;
	containsExactly(expected: Set<E>, name?: string): S;
	containsExactly(expected: E[] | Set<E>, name?: string): S
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		const difference = this.value.undefinedOrNullToInvalid().
			map(v => Difference.actualVsOther(v, expected)).or(null);
		if (difference === null || difference.areDifferent())
		{
			this.addRangeError(
				collectionContainsExactly(this, difference, name ?? null, expected, this.pluralizer).
					toString());
		}
		return this.self();
	}

	doesNotContainExactly(unwanted: E[], name?: string): S;
	doesNotContainExactly(unwanted: Set<E>, name?: string): S;
	doesNotContainExactly(unwanted: E[] | Set<E>, name?: string): S
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		const difference = this.value.undefinedOrNullToInvalid().
			map(v => Difference.actualVsOther(v, unwanted)).or(null);
		if (difference === null || difference.areTheSame())
		{
			this.addRangeError(
				collectionDoesNotContainExactly(this, name ?? null, unwanted, this.pluralizer).toString());
		}
		return this.self();
	}

	containsAny(expected: E[], name?: string): S;
	containsAny(expected: Set<E>, name?: string): S;
	containsAny(expected: E[] | Set<E>, name?: string): S
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		const definedOrNull = this.value.or(null);

		if (definedOrNull == null ||
			this.isDisjoint(this.collectionAsSet(definedOrNull), this.collectionAsSet(expected)))
		{
			this.addRangeError(
				collectionContainsAny(this, name ?? null, expected, this.pluralizer).toString());
		}
		return this.self();
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

	doesNotContainAny(unwanted: E[], name?: string): S;
	doesNotContainAny(unwanted: Set<E>, name?: string): S;
	doesNotContainAny(unwanted: E[] | Set<E>, name?: string): S
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		const difference = this.value.undefinedOrNullToInvalid().map(v => Difference.actualVsOther(v, unwanted)).
			or(null);
		if (difference === null || difference.common.size !== 0)
		{
			this.addRangeError(
				collectionDoesNotContainAny(this, difference, name ?? null, unwanted, this.pluralizer).
					toString());
		}
		return this.self();
	}

	containsAll(expected: E[], name?: string): S;
	containsAll(expected: Set<E>, name?: string): S;
	containsAll(expected: E[] | Set<E>, name?: string): S
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		const difference = this.value.undefinedOrNullToInvalid().map(v => Difference.actualVsOther(v, expected)).
			or(null);
		if (difference === null || difference.onlyInOther.size !== 0)
		{
			this.addRangeError(
				collectionContainsAll(this, difference, name ?? null, expected, this.pluralizer).
					toString());
		}
		return this.self();
	}

	doesNotContainAll(unwanted: E[], name?: string): S;
	doesNotContainAll(unwanted: Set<E>, name?: string): S;
	doesNotContainAll(unwanted: E[] | Set<E>, name?: string): S
	{
		if (name !== undefined)
			this.requireThatNameIsUnique(name);

		if (this.value.isNull())
			this.onNull();
		if (this.value.validationFailed(v => v != null && !this.collectionContainsAll(v, unwanted)))
		{
			this.addRangeError(
				collectionDoesNotContainAll(this, name ?? null, unwanted, this.pluralizer).
					toString());
		}
		return this.self();
	}

	/**
	 * Indicates if an array contains all elements of another array.
	 *
	 * @param value - the value
	 * @param expected - a collection of expected elements
	 * @returns true if `value` contains all the `expected` elements
	 */
	private collectionContainsAll(value: T, expected: E[] | Set<E>): boolean
	{
		// WORKAROUND: Replace with Set.isSupersetOf() once Typescript supports ES2024
		for (const element of this.collectionAsArray(expected))
		{
			if (!this.collectionContainsElement(value, element))
				return false;
		}
		return true;
	}

	doesNotContainDuplicates(): S
	{
		if (this.value.isNull())
			this.onNull();
		const duplicates = this.value.undefinedOrNullToInvalid().map(v =>
			this.getDuplicates(this.collectionAsArray(v)));
		if (duplicates.validationFailed(v => v.size === 0))
		{
			this.addRangeError(
				collectionDoesNotContainDuplicates(this, duplicates.or(null), this.pluralizer).
					toString());
		}
		return this.self();
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

	public containsSameNullity(): S
	{
		if (this.value.validationFailed(v =>
		{
			let numberOfNulls = 0;
			for (const element of v)
				if (element == null)
					++numberOfNulls;
			return numberOfNulls == this.getLength(v);
		}))
		{
			this.addRangeError(
				collectionContainsSameNullity(this).toString());
		}
		return this.self();
	}

	length(): UnsignedNumberValidator
	{
		if (this.value.isNull())
			this.onNull();
		return new ObjectSizeValidatorImpl(this.scope, this._configuration, this, this.name + ".length()",
			this.value.undefinedOrNullToInvalid().map(v => this.getLength(v)), this.pluralizer, this.context,
			this.failures);
	}
}

export {AbstractCollectionValidator};