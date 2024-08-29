import {
	Type,
	type StringMapper,
	StringMappers,
	internalValueToString
} from "./internal.mjs";

/**
 * Returns the String representation of
 */
class MutableStringMappers
{
	private readonly typeToMapper: Map<Type, StringMapper>;

	/**
	 * Creates a new instance.
	 *
	 * @param typeToMapper - a mapping from the name of a type to the string representation of its values
	 */
	public constructor(typeToMapper: Map<Type, StringMapper>)
	{
		this.typeToMapper = new Map<Type, StringMapper>(typeToMapper);
	}

	/**
	 * Returns a mutable copy of the StringMappers.
	 *
	 * @param mappers - a `StringMappers` object
	 * @returns a mutable copy of the StringMappers
	 */
	public static from(mappers: StringMappers)
	{
		return new MutableStringMappers(mappers.typeToMapper);
	}

	/**
	 * Returns an immutable copy of the mapper configuration.
	 *
	 * @returns an immutable copy of the mapper configuration
	 */
	public toImmutable(): StringMappers
	{
		return new StringMappers(this.typeToMapper);
	}

	/**
	 * Sets the function that maps a value of the given type to a string. This method is useful for customizing
	 * the formatting of validation failure messages.
	 *
	 * @param type   - a type
	 * @param mapper - a function that returns the String representation of the type's instances
	 * @returns this
	 */
	public put(type: Type, mapper: StringMapper)
	{
		this.typeToMapper.set(type, mapper);
		return this;
	}

	/**
	 * Removes a mapper for a type.
	 *
	 * @param type - the type
	 * @returns this
	 */
	public remove(type: Type)
	{
		this.typeToMapper.delete(type);
		return this;
	}

	/**
	 * Returns the string representation of this instance
	 *
	 * @returns the string representation of this instance
	 */
	public toString(): string
	{
		return internalValueToString(this.typeToMapper);
	}
}

export {MutableStringMappers};