/**
 * Map helper functions.
 *
 * @ignore
 */
class Maps
{
	/**
	 * Appends to a <code>string</code> map value.
	 *
	 * @param {Map} map a map
	 * @param {object} key the map key
	 * @param {string} text the text to append
	 */
	static appendToValue(map, key, text)
	{
		const oldValue = map.get(key);
		map.set(key, oldValue + text);
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {Maps as default};