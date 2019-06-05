/**
 * Generates the singular or plural form of an element type.
 *
 * @ignore
 */
function Pluralizer()
{
	// Intentionally empty
}

Pluralizer.CHARACTER = new Pluralizer();
Pluralizer.CHARACTER.nameOf = function(count)
{
	if (count === 1)
		return "character";
	return "characters";
};

Pluralizer.KEY = new Pluralizer();
Pluralizer.KEY.nameOf = function(count)
{
	if (count === 1)
		return "key";
	return "keys";
};

Pluralizer.VALUE = new Pluralizer();
Pluralizer.VALUE.nameOf = function(count)
{
	if (count === 1)
		return "value";
	return "values";
};

Pluralizer.ENTRY = new Pluralizer();
Pluralizer.ENTRY.nameOf = function(count)
{
	if (count === 1)
		return "entry";
	return "entries";
};

Pluralizer.ELEMENT = new Pluralizer();
Pluralizer.ELEMENT.nameOf = function(count)
{
	if (count === 1)
		return "element";
	return "elements";
};

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {Pluralizer as default};