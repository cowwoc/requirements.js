import Objects from "./Objects.js";

/**
 * String helper functions.
 *
 * @ignore
 */
class Strings
{
	/**
	 * Returns the index within <code>source</code> of the last consecutive occurrence of <code>target</code>.
	 * The last occurrence of the empty string <code>""</code> is considered to occur at the index value
	 * <code>source.length()</code>.
	 * <p>
	 * The returned index is the largest value <code>k</code> for which
	 * <code>source.startsWith(target, k)</code> consecutively. If no such value of <code>k</code> exists, then
	 * <code>-1</code> is returned.
	 *
	 * @param {string} source the string to search within
	 * @param {string} target the string to search for
	 * @return {number} the index of the last consecutive occurrence of <code>target</code> in
	 *   <code>source</code>, or <code>-1</code> if there is no such occurrence.
	 */
	static lastConsecutiveIndexOf(source, target)
	{
		Objects.assertThatTypeOf(source, "source", "string");
		Objects.assertThatTypeOf(target, "target", "string");
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
	 * @param {string} source the string to search within
	 * @param {string} target the string to search for
	 * @return {boolean} true if <code>source</code> only contains (potentially multiple) occurrences of
	 *   <code>target</code> or if <code>source</code> is empty
	 * @ignore
	 */
	static containsOnly(source, target)
	{
		return this.lastConsecutiveIndexOf(source, target) === 0;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {Strings as default};