/** @module */
import Configuration from "./Configuration.js";
import NoOpObjectVerifier from "./NoOpObjectVerifier.js";
import ObjectVerifier from "./ObjectVerifier.js";
import Objects from "./internal/Objects.js";

/**
 * Verifies the requirements of types from the Javascript core API.
 * <p>
 * This class is immutable.
 */
class Requirements
{
	/**
	 * Verifies a value.
	 * <p>
	 * Unlike {@link Requirements}, instances of this class can be configured prior to initiating verification.
	 * Doing so causes the same configuration to get reused across runs.
	 *
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
	 * @param {object} actual the actual value
	 * @param {string} name   the name of the value
	 * @return {ObjectVerifier} a verifier
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	requireThat(actual, name)
	{
		Objects.verifyName(name, "name");
		return new ObjectVerifier(this.config, actual, name);
		// TODO: Related projects:
		// * http://chaijs.com/
		// * https://github.com/dsheiko/bycontract
		// * https://github.com/muroc/offensive.js for related projects
		//
		// TODO: Respond to
		// http://stackoverflow.com/questions/18785586/javascript-equivalent-to-guavas-preconditions
	}

	// WORKAROUND: https://github.com/jsdoc3/jsdoc/issues/1533
	/**
	 * Same as [requireThat()]{@link module:Requirements~Requirements#requireThat} but does nothing if
	 * assertions are disabled.
	 *
	 * @function
	 * @param {object} actual the actual value
	 * @param {string} name   the name of the value
	 * @return {ObjectVerifier|NoOpObjectVerifier} a verifier
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	assertThat(actual, name)
	{
		Objects.verifyName(name, "name");
		if (this.config.assertionsAreEnabled())
			return this.requireThat(actual, name);
		return NoOpObjectVerifier.INSTANCE;
	}

	/**
	 * Returns the type of exception that will be thrown if a verification fails.
	 *
	 * @return {boolean} true if <code>assertThat()</code> should delegate to <code>requireThat()</code>; false
	 *   if it shouldn't do anything
	 * @see #withException
	 * @see #withDefaultException
	 */
	assertionsAreEnabled()
	{
		return this.config.assertionsAreEnabled();
	}

	/**
	 * Indicates that <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @return {Requirements} a verifier with the updated configuration
	 */
	withAssertionsEnabled()
	{
		const newConfig = this.config.withAssertionsEnabled();
		if (newConfig === this.config)
			return this;
		return new Requirements(newConfig);
	}

	/**
	 * Indicates that <code>assertThat()</code> shouldn't do anything.
	 *
	 * @return {Requirements} a verifier with the updated configuration
	 */
	withAssertionsDisabled()
	{
		const newConfig = this.config.withAssertionsDisabled();
		if (newConfig === this.config)
			return this;
		return new Requirements(newConfig);
	}

	/**
	 * Returns the type of exception that will be thrown if a verification fails.
	 *
	 * @return {Error} <code>null</code> if the default exception type will be thrown
	 * @see #withException
	 * @see #withDefaultException
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
	 * @param {Error} exception the type of exception to throw
	 * @return {Requirements} a verifier with the updated configuration
	 * @throws {TypeError} if <code>exception</code> is not set
	 * @see #getException
	 */
	withException(exception)
	{
		const newConfig = this.config.withException(exception);
		if (newConfig === this.config)
			return this;
		return new Requirements(newConfig);
	}

	/**
	 * Throws the default exception type if a verification fails.
	 *
	 * @return {Requirements} a verifier with the updated configuration
	 * @see #getException
	 */
	withDefaultException()
	{
		const newConfig = this.config.withDefaultException();
		if (newConfig === this.config)
			return this;
		return new Requirements(newConfig);
	}

	/**
	 * @return {Array<Array>} an array of key-value pairs to append to the exception message
	 * @see #putContext
	 */
	getContext()
	{
		return this.config.getContext();
	}

	/**
	 * Appends contextual information to the exception message.
	 *
	 * @param {string} key   a key
	 * @param {object} value a value
	 * @return {Requirements} a verifier with the updated configuration
	 * @throws {TypeError} if <code>key</code> is not a string
	 * @see #getContext
	 */
	putContext(key, value)
	{
		return new Requirements(this.config.putContext(key, value));
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {Requirements as default};