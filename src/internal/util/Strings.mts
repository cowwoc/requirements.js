import {
	Type,
	type ClassConstructor,
	assertThatType,
	getSuperclass,
	type StringMapper,
	internalValueToString
} from "../internal.mjs";

class SearchResult
{
	/**
	 * The start index (inclusive) of the matched text.
	 */
	readonly start: number;
	/**
	 * The end index (exclusive) of the matched text.
	 */
	readonly end: number;

	constructor(start: number, end: number)
	{
		this.start = start;
		this.end = end;
	}
}

/**
 * Returns the last consecutive occurrence of `target` within `source`.
 * The last occurrence of the empty string `""` is considered to occur at the index value
 * `source.length()`.
 * <p>
 * The returned index is the largest value `k` for which
 * `source.startsWith(target, k)` consecutively. If no such value of `k` exists, then
 * `-1` is returned.
 *
 * @param source - the string to search within
 * @param target - the string to search for
 * @returns the index of the last consecutive occurrence of `target` in `source`,
 *   or `-1` if there is no such occurrence.
 */
function lastConsecutiveIndexOf(source: string, target: string)
{
	assertThatType(source, "source", Type.STRING);
	assertThatType(target, "target", Type.STRING);
	const lengthOfTarget = target.length;
	let result = -1;
	if (lengthOfTarget === 0)
		return result;

	for (let i = source.length - lengthOfTarget; i >= 0; i -= lengthOfTarget)
	{
		if (!source.startsWith(target, i))
			return result;
		result = i;
	}
	return result;
}

/**
 * Returns the last occurrence of `target` in `source`.
 *
 * @param source - the string to search within
 * @param target - the regular expression to search for
 * @returns null if no match was found
 */
function lastIndexOf(source: string, target: RegExp): SearchResult | null
{
	// RegExp is stateful: https://stackoverflow.com/a/11477448/14731
	let flags = target.flags;
	if (!flags.includes("g"))
		flags += "g";
	const matcher = new RegExp(target.source, flags);
	let match;
	let searchResult: SearchResult | null = null;
	while (true)
	{
		match = matcher.exec(source);
		if (!match)
			break;
		searchResult = new SearchResult(match.index, match.index + match[0].length);
	}
	return searchResult;
}

/**
 * @param source - the string to search within
 * @param target - the string to search for
 * @returns true if `source` only contains (potentially multiple) occurrences of
 *   `target` or if `source` is empty
 */
function containsOnly(source: string, target: string)
{
	return source.length === 0 || lastConsecutiveIndexOf(source, target) === 0;
}

const builtInMapper = (v: unknown) => `${internalValueToString(v)}`;

/**
 * Returns a StringMapper for a value or the closest ancestor that has an associated mapper.
 *
 * @param value - a value
 * @param typeToMapper - a mapping from the name of a type to the string representation of its values
 * @returns the StringMapper for the value
 */
function getMapper(value: unknown, typeToMapper: Map<Type, StringMapper>): StringMapper
{
	const type = Type.of(value);
	let mapper = typeToMapper.get(type);
	if (mapper !== undefined)
		return mapper;
	if (type.isPrimitive())
		return builtInMapper;

	const superclass = getSuperclass(value as ClassConstructor<unknown>);
	if (superclass === null)
		return builtInMapper;
	const superclassType = Type.of(superclass);
	mapper = typeToMapper.get(superclassType);
	if (mapper !== undefined)
		return mapper;
	return getMapper(superclass, typeToMapper);
}

/**
 * @param value - a string
 * @returns true if the string does not contain any leading or trailing whitespace
 */
function valueIsStripped(value: string): boolean
{
	return /^\S+.*\S+$/.test(value);
}

export {
	lastConsecutiveIndexOf,
	lastIndexOf,
	containsOnly,
	getMapper,
	valueIsStripped
};