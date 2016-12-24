import * as URI from "urijs";

/**
 * Creates a new UriVerifier.
 *
 * @constructor
 * @param {URI} actual the actual value
 * @param {String} name   the name of the value
 * @param {Configuration} config the instance configuration
 *
 * @property {URI} actual the actual value
 * @property {String} name the name of the value
 * @property {Configuration} config the instance configuration
 * @author Gili Tzabari
 */
function UriVerifier(actual, name, config)
{
	Object.defineProperty(this, "actual",
		{
			value: actual
		});
	Object.defineProperty(this, "name",
		{
			value: name
		});
	Object.defineProperty(this, "config",
		{
			value: config
		});
}
UriVerifier.prototype = Object.create(UriVerifier.prototype);
UriVerifier.prototype.constructor = UriVerifier;

/**
 * Ensures that the URI is absolute.
 *
 * @return {UriVerifier} this
 * @throws {TypeError} if the path is not absolute
 */
UriVerifier.prototype.isAbsolute = function()
{
	if (!this.actual.is("absolute"))
		throw new TypeError(this.name + " must be absolute: " + this.actual.toString());
	return this;
};

/**
 * Ensures that the URI is relative.
 *
 * @return {UriVerifier} this
 * @throws {TypeError} if the path is not a relative
 */
UriVerifier.prototype.isRelative = function()
{
	if (!this.actual.is("relative"))
		throw new TypeError(this.name + " must be relative: " + this.actual.toString());
	return this;
};

export default UriVerifier;