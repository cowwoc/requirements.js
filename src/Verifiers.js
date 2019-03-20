import Configuration from "./Configuration";
import NoOpObjectVerifier from "./NoOpObjectVerifier";
import ObjectVerifier from "./ObjectVerifier";
import Utilities from "./Utilities";

/**
 * Verifies the requirements of types from the Javascript core API.
 * <p>
 * This class is immutable.
 *
 * @class
 * @author Gili Tzabari
 */
class JavascriptVerifier
{
	/**
	 * Verifies a value.
	 * <p>
	 * Unlike {@link Requirements}, instances of this class can be configured prior to initiating
	 * verification. Doing so causes the same configuration to get reused across runs.
	 *
	 * @constructor
	 * @param {Configuration} [configuration] the instance configuration
	 */
	constructor(configuration)
	{
		if (typeof (configuration) === "undefined")
			configuration = new Configuration(this);
		Object.defineProperty(this, "config",
			{
				value: configuration
			});
	}

	/**
	 * Verifies an object.
	 *
	 * @function
	 * @param {Object} actual the actual value
	 * @param {String} name   the name of the value
	 * @return {ObjectVerifier} a verifier
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	requireThat(actual, name)
	{
		Utilities.verifyName(name, "name");
		return new ObjectVerifier(this.config, actual, name);
		// TODO: Related projects:
		// * http://chaijs.com/
		// * https://github.com/dsheiko/bycontract
		// * https://github.com/muroc/offensive.js for related projects
		//
		// TODO: Respond to http://stackoverflow.com/questions/18785586/javascript-equivalent-to-guavas-preconditions
	}

	/**
	 * Same as {@link #requireThat(Object, String)} but does nothing if assertions are disabled.
	 *
	 * @function
	 * @param {Object} actual the actual value
	 * @param {String} name   the name of the value
	 * @return {ObjectVerifier} a verifier
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	assertThat(actual, name)
	{
		Utilities.verifyName(name, "name");
		if (this.config.assertionsAreEnabled())
			return this.requireThat(actual, name);
		return new NoOpObjectVerifier(this.config, actual, name);
	}

	/**
	 * Returns the type of exception that will be thrown if a verification fails.
	 *
	 * @return {Boolean} true if <code>assertThat()</code> should delegate to <code>requireThat()</code>; false if it
	 *         shouldn't do anything
	 * @see #withException(Class)
	 * @see #withDefaultException()
	 */
	assertionsAreEnabled()
	{
		return this.config.assertionsAreEnabled();
	}

	/**
	 * Indicates that <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @return {JavascriptVerifier} a verifier with the updated configuration
	 */
	withAssertionsEnabled()
	{
		const newConfig = this.config.withAssertionsEnabled();
		if (newConfig === this.config)
			return this;
		return new JavascriptVerifier(newConfig);
	}

	/**
	 * Indicates that <code>assertThat()</code> shouldn't do anything.
	 *
	 * @return {JavascriptVerifier} a verifier with the updated configuration
	 */
	withAssertionsDisabled()
	{
		const newConfig = this.config.withAssertionsDisabled();
		if (newConfig === this.config)
			return this;
		return new JavascriptVerifier(newConfig);
	}

	/**
	 * Returns the type of exception that will be thrown if a verification fails.
	 *
	 * @return {ExceptionConstructor} <code>null</code> if the default exception type will be thrown
	 * @see #withException(Class)
	 * @see #withDefaultException()
	 */
	getException()
	{
		return this.config.getException();
	}

	/**
	 * Overrides the type of exception that will get thrown if a verification fails.
	 * <p>
	 * The exception class must define the following constructor:
	 * <p>
	 * <code><init>(message)</code>
	 *
	 * @param {ExceptionConstructor} exception the type of exception to throw
	 * @return {JavascriptVerifier} a verifier with the updated configuration
	 * @throws {TypeError} if <code>exception</code> is not set
	 * @see #getException()
	 */
	withException(exception)
	{
		const newConfig = this.config.withException(exception);
		if (newConfig === this.config)
			return this;
		return new JavascriptVerifier(newConfig);
	}

	/**
	 * Throws the default exception type if a verification fails.
	 *
	 * @return {JavascriptVerifier} a verifier with the updated configuration
	 * @see #getException()
	 */
	withDefaultException()
	{
		const newConfig = this.config.withDefaultException();
		if (newConfig === this.config)
			return this;
		return new JavascriptVerifier(newConfig);
	}

	/**
	 * @return {Array.<Array>} an array of key-value pairs to append to the exception message
	 * @see #addContext(String, Object)
	 */
	getContext()
	{
		return this.config.getContext();
	}

	/**
	 * Appends contextual information to the exception message.
	 *
	 * @param {String} key   a key
	 * @param {Object} value a value
	 * @return {JavascriptVerifier} a verifier with the updated configuration
	 * @throws {TypeError} if <code>key</code> is not a String
	 * @see #getContext()
	 */
	addContext(key, value)
	{
		return new JavascriptVerifier(this.config.addContext(key, value));
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {JavascriptVerifier as default};