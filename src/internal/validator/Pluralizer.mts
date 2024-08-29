/**
 * Generates the singular or plural form of an element type.
 */
class Pluralizer
{
	private readonly prefix: string;
	private readonly singularSuffix: string;
	private readonly pluralSuffix: string;
	static readonly CHARACTER = new Pluralizer("character", "", "s");
	static readonly KEY = new Pluralizer("key", "", "s");
	static readonly VALUE = new Pluralizer("value", "", "s");
	static readonly ELEMENT = new Pluralizer("element", "", "s");
	static readonly ENTRY = new Pluralizer("entr", "y", "ies");

	/**
	 * @param prefix - the prefix common to both singular and plural forms
	 * @param singularSuffix - the suffix to append to the singular form of the word
	 * @param pluralSuffix - the suffix to append to the plural form of the word
	 */
	constructor(prefix: string, singularSuffix: string, pluralSuffix: string)
	{
		this.prefix = prefix;
		this.singularSuffix = singularSuffix;
		this.pluralSuffix = pluralSuffix;
	}

	/**
	 * @param count - a number of elements
	 * @returns the singular or plural form of the element type
	 */
	nameOf(count: number)
	{
		if (count === 1)
			return this.prefix + this.singularSuffix;
		return this.prefix + this.pluralSuffix;
	}
}

export {Pluralizer};