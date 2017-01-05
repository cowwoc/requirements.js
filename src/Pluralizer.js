function Pluralizer()
{
};


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

export default Pluralizer;