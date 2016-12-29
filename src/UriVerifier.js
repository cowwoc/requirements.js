import Utilities from "./Utilities";
import * as URI from "urijs";

/**
 * Creates a new UriVerifier.
 *
 * @constructor
 * @param {URI} actual the actual value
 * @param {String} name   the name of the value
 * @param {Configuration} config the instance configuration
 * @throws {TypeError} if {@code name} or {@code config} are null or undefined; if {@code actual} is not a {@code URI}
 * @throws {RangeError} if {@code name} is empty
 * @author Gili Tzabari
 */
function UriVerifier(actual, name, config)
{
	Utilities.verifyValue(actual, "actual", URI);
	Utilities.verifyName(name, "name");
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