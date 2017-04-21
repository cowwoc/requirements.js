import ObjectVerifier from "./internal/ObjectVerifier";

/**
 * Verifies a <code>URI</code>.
 *
 * @class
 * @author Gili Tzabari
 */
class UriVerifier extends ObjectVerifier {
	/**
	 * Ensures that the URI is absolute.
	 *
	 * @return {UriVerifier} this
	 * @throws {RangeError} if the path is not absolute
	 */
	isAbsolute()
	{
		if (!this.actual.is("absolute"))
			throw new RangeError(this.name + " must be absolute: " + this.actual.toString());
		return this;
	}

	/**
	 * Ensures that the URI is relative.
	 *
	 * @return {UriVerifier} this
	 * @throws {RangeError} if the path is not a relative
	 */
	isRelative()
	{
		if (!this.actual.is("relative"))
			throw new RangeError(this.name + " must be relative: " + this.actual.toString());
		return this;
	}
}

export default UriVerifier;