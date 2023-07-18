/**
 * Map helper functions.
 */
class Maps
{
	/**
	 * Appends to a <code>string</code> map value.
	 *
	 * @param map - a map
	 * @param key - the map key
	 * @param value - the value to append
	 */
	static appendToValue<K>(map: Map<K, string>, key: K, value: string)
	{
		const oldValue = map.get(key);
		if (typeof (oldValue) === "undefined")
			map.set(key, value);
		else
			map.set(key, oldValue + value);
	}

	/**
	 * @param map - a map
	 * @returns the map sorted by its keys
	 */
	static sortByKeys<K, V>(map: Map<K, V>)
	{
		// https://stackoverflow.com/a/31159284/14731
		return new Map([...map.entries()].sort());
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {Maps as default};