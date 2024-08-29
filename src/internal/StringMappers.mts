import {
	Type,
	internalValueToString,
	type StringMapper,
	getMapper,
	quoteString
} from "./internal.mjs";

/**
 * Returns the String representation of an object.
 */
class StringMappers
{
	/**
	 * The default mapper configuration.
	 */
	public static readonly DEFAULT = new StringMappers();
	public readonly typeToMapper: Map<Type, StringMapper>;

	/**
	 * Creates a new instance. If `typeToMapper` is `undefined` the new instance uses the
	 * default mappings. Otherwise, it contains a copy of the `typeToMapper` mappings.
	 *
	 * @param typeToMapper - a mapping from the name of a type to the string representation of its values
	 * @throws TypeError if `typeToMapper` is `undefined` or `null`
	 */
	public constructor(typeToMapper?: Map<Type, StringMapper>)
	{
		if (typeToMapper === undefined)
		{
			this.typeToMapper = new Map<Type, StringMapper>();
			this.typeToMapper.set(Type.STRING, (value: unknown) => quoteString(value as string));
			this.typeToMapper.set(Type.ARRAY,
				(value: unknown, seen?: Set<unknown>) => this.arrayToString(value as boolean[], seen));
			this.typeToMapper.set(Type.namedClass("Set"),
				(value: unknown, seen?: Set<unknown>) => this.setToString(value as Set<unknown>, seen));
			this.typeToMapper.set(Type.namedClass("Map"),
				(value: unknown, seen?: Set<unknown>) => this.mapToString(value as Map<unknown, unknown>, seen));
			this.typeToMapper.set(Type.namedClass("Error"),
				(value: unknown) => this.errorToString(value as Error));
			this.typeToMapper.set(Type.namedClass("Type"), (value: unknown) => (value as Type).toString());
		}
		else
			this.typeToMapper = new Map<Type, StringMapper>(typeToMapper);
	}

	/**
	 * @param array - an array
	 * @param seen - the objects that we've seen before
	 * @returns the "deep" String representation of the array
	 */
	private arrayToString(array: unknown[], seen?: Set<unknown>)
	{
		if (seen === undefined)
			seen = new Set<unknown>();
		// We cannot use Arrays.deepToString(array) because it does not delegate to StringMappers.toString()
		const elements: string[] = [];
		for (const element of array)
		{
			if (element !== null && Array.isArray(element))
			{
				if (seen.add(element))
					elements.push(this.valueToString(element, seen));
				else
					elements.push("...");
			}
			else
				elements.push(this.valueToString(element, seen));
		}
		return `[${elements.join(", ")}]`;
	}

	/**
	 * Returns the string representation of a value using the mappers.
	 *
	 * @param value - a value
	 * @param seen - the objects that we've seen before
	 * @returns the string representation of the value
	 */
	private valueToString(value: unknown, seen: Set<unknown>)
	{
		const mapper = getMapper(value, this.typeToMapper);
		return mapper(value, seen);
	}

	/**
	 * @param set - a Set of elements
	 * @param seen - the objects that we've seen before
	 * @returns the string representation of the set
	 */
	private setToString(set: Set<unknown>, seen?: Set<unknown>)
	{
		if (seen === undefined)
			seen = new Set<unknown>();
		return this.orderedToString([...set], seen);
	}

	/**
	 * @param list - an ordered list of values
	 * @param seen - the objects that we've seen before
	 * @returns the string representation of `list`
	 */
	private orderedToString(list: unknown[], seen: Set<unknown>)
	{
		let joiner = "[";
		for (const element of list)
		{
			if (element === list)
				joiner += "(this Collection)";
			else
			{
				const elementToString = getMapper(element, this.typeToMapper);
				joiner += elementToString(element, seen);
			}
		}
		return joiner + "]";
	}

	/**
	 * @param map - a Map of elements
	 * @param seen - the objects that we've seen before
	 * @returns the String representation of the map
	 */
	private mapToString(map: Map<unknown, unknown>, seen?: Set<unknown>)
	{
		if (seen === undefined)
			seen = new Set<unknown>();
		return this.mapEntriesToString([...map.entries()], seen);
	}

	/**
	 * @param entries - map entries
	 * @param seen - the objects that we've seen before
	 * @returns the String representation of the entries
	 */
	private mapEntriesToString(entries: [unknown, unknown][], seen: Set<unknown>)
	{
		let joiner = "{";
		for (const entry of entries)
		{
			const key = entry[0];
			const value = entry[1];
			let keyAsString: string;
			if (key === entries)
				keyAsString = "(this Map)";
			else
				keyAsString = getMapper(key, this.typeToMapper)(key, seen);
			let valueAsString;
			if (value === entries)
				valueAsString = "(this Map)";
			else
				valueAsString = getMapper(value, this.typeToMapper)(value, seen);
			joiner += `${keyAsString} = ${valueAsString}`;
		}
		return joiner + "}";
	}

	/**
	 * @param error - an `Error`
	 * @returns the string representation of the error
	 */
	private errorToString(error: Error)
	{
		if (error.stack === undefined)
			return "";
		return error.stack;
	}

	/**
	 * Returns the string representation of the mappers.
	 *
	 * @returns the string representation of the mappers
	 */
	public toString(): string
	/**
	 * Returns the string representation of a value using the mappers.
	 *
	 * @param value - a value
	 * @returns the string representation of the value
	 */
	// Retain separate methods because their documentation is different.
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	public toString(value: unknown): string
	public toString(value?: unknown)
	{
		const mapper = getMapper(value, this.typeToMapper);
		if (mapper === undefined)
			return internalValueToString(this.typeToMapper);
		else
			return mapper(value);
	}
}

export {StringMappers};