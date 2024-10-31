/**
 * Appends to a `string` map value.
 *
 * @param map - a map
 * @param key - the map key
 * @param value - the value to append
 */
function appendToValue<K>(map: Map<K, string>, key: K, value: string)
{
	const oldValue = map.get(key);

	if (oldValue === undefined)
		map.set(key, value);
	else
		map.set(key, oldValue + value);
}

/**
 * @param map - a map
 * @returns the map sorted by its keys
 */
function sortByKeys<K, V>(map: Map<K, V>)
{
	// https://stackoverflow.com/a/31159284/14731
	return new Map([...map.entries()].sort());
}

export {
	appendToValue,
	sortByKeys
};