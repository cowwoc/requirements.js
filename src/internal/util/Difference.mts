import {requireThatValueIsDefined} from "../validator/Objects.mjs";

/**
 * The difference between two collections, irrespective of element ordering.
 *
 * @typeParam E - the type of elements in the actual and other collections
 * @param common - elements that were present in both collections
 * @param onlyInActual - elements that were only present in the value
 * @param onlyInOther - elements that were only present in the other collection
 */
class Difference<E>
{
	public readonly common: Set<E>;
	public readonly onlyInActual: Set<E>;
	public readonly onlyInOther: Set<E>;

	/**
	 * Creates a new instance.
	 *
	 * @param common - the elements that are common to both arrays
	 * @param onlyInActual - the elements that are only found in the actual value
	 * @param onlyInOther - the elements that are only found in the other value
	 */
	private constructor(common: Set<E>, onlyInActual: Set<E>, onlyInOther: Set<E>)
	{
		requireThatValueIsDefined(common, "common");
		requireThatValueIsDefined(onlyInActual, "onlyInActual");
		requireThatValueIsDefined(onlyInOther, "onlyInOther");
		this.common = common;
		this.onlyInActual = onlyInActual;
		this.onlyInOther = onlyInOther;
	}

	/**
	 * Compares the elements in two collections.
	 *
	 * @typeParam E - the type of elements in the collections
	 * @param value - the value's elements
	 * @param other - the other collection's elements
	 * @returns the elements that were common to both collections, or were only present in the value, or were
	 * only present in the other collection
	 */
	public static actualVsOther<E>(value: E[] | Set<E>, other: E[] | Set<E>)
	{
		const valueAsSet = this.asSet(value);
		const otherAsSet = this.asSet(other);

		const common = this.intersection(valueAsSet, otherAsSet);
		const onlyInValue = this.firstMinusSecond(valueAsSet, otherAsSet);
		const onlyInOther = this.firstMinusSecond(otherAsSet, valueAsSet);
		return new Difference<E>(common, onlyInValue, onlyInOther);
	}

	/**
	 * @param value - an array or set
	 * @returns the Set representation of the value
	 */
	private static asSet<E>(value: E[] | Set<E>): Set<E>
	{
		if (value instanceof Set)
			return value;
		return new Set<E>(value);
	}

	/**
	 * @param first - a set
	 * @param second - a set
	 * @returns the elements found in both sets
	 */
	private static intersection<E>(first: Set<E>, second: Set<E>)
	{
		return new Set<E>([...first].filter(x => second.has(x)));
	}

	/**
	 * @param first - a set
	 * @param second - a set
	 * @returns the elements found in the first set but not the second set
	 */
	private static firstMinusSecond<E>(first: Set<E>, second: Set<E>)
	{
		return new Set<E>([...first].filter(x => !second.has(x)));
	}

	/**
	 * @returns `true` if both collections contain the same elements, irrespective of ordering
	 */
	public areTheSame()
	{
		return this.onlyInActual.size === 0 && this.onlyInOther.size === 0;
	}

	/**
	 * @returns `true` if the collections contain different elements
	 */
	public areDifferent()
	{
		return this.onlyInActual.size > 0 || this.onlyInOther.size > 0;
	}
}

export {Difference};