/**
 * Generates the singular or plural form of an element type.
 */
class Pluralizer
{
	private readonly singular: string;
	private readonly plural: string;
	static readonly CHARACTER = new Pluralizer("character", "characters");
	static readonly KEY = new Pluralizer("key", "keys");
	static readonly VALUE = new Pluralizer("value", "values");
	static readonly ELEMENT = new Pluralizer("element", "elements");
	static readonly ENTRY = new Pluralizer("entry", "entries");

	/**
	 * @param singular - the singular form of the element
	 * @param plural - the plural form of the element
	 */
	constructor(singular: string, plural: string)
	{
		this.singular = singular;
		this.plural = plural;
	}

	/**
	 * @param count - a number of elements
	 * @param name - the name of the parameter containing the number of elements (`null` if absent)
	 * @returns the singular or plural form of the element type (in lowercase)
	 */
	nameOf(count: number, name: string | null)
	{
		if (count === 1 && name === null)
			return this.singular;
		return this.plural;
	}
}

export {Pluralizer};