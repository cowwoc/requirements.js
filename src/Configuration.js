import GlobalConfiguration from "./GlobalConfiguration";
import Requirements from "./Requirements";
import Utilities from "./Utilities";

/**
 * A verifier's configuration.
 * <p>
 * This class is immutable.
 */
class Configuration
{
	/**
	 * Creates a new configuration without an empty context and without an exception override.
	 *
	 * @param {Requirements} internalVerifier the verifier that can be used to check a verifier's own parameters
	 * @param {Error} [exception=null] the type of exception that will be thrown if a verification fails,
	 *   <code>null</code> to throw the default exception type
	 * @param {Array.<Array>} [context=[]] a list of key-value pairs to append to the exception message
	 * @param {boolean} [assertionsEnabled=false] true if <code>assertThat()</code> should invoke
	 *   <code>requireThat()</code>; false if <code>assertThat()</code> should do nothing
	 * @throws {TypeError} if <code>internalVerifier</code> is undefined or null; <code>context</code> or one of its
	 *   elements are not an array; if the nested array contains less or more than 2 elements; if the keys nested in the
	 *   context array are not strings
	 * @throws {RangeError} if the elements nested in the context array are undefined, null, or are empty
	 */
	constructor(internalVerifier, exception, context, assertionsEnabled)
	{
		if (typeof (internalVerifier) === "undefined")
		{
			throw new TypeError("internalVerifier must be set.\n" +
				"Actual: " + internalVerifier);
		}
		Object.defineProperty(this, "internalVerifier",
			{
				enumerable: true,
				value: internalVerifier
			});
		if (typeof (exception) === "undefined")
			exception = null;
		Object.defineProperty(this, "exception",
			{
				value: exception
			});
		if (typeof (context) === "undefined")
			context = [];
		else
			Utilities.verifyContext(context);
		Object.defineProperty(this, "context",
			{
				value: context
			});
		if (typeof (assertionsEnabled) === "undefined")
			assertionsEnabled = GlobalConfiguration.assertionsAreEnabled;
		Object.defineProperty(this, "assertionsEnabled",
			{
				value: assertionsEnabled
			});
	}

	/**
	 * Returns the type of exception that will be thrown if a verification fails.
	 *
	 * @return {boolean} true if <code>assertThat()</code> should delegate to <code>requireThat()</code>; false if it
	 *         shouldn't do anything
	 * @see #withException(Class)
	 * @see #withDefaultException()
	 */
	assertionsAreEnabled()
	{
		return this.assertionsEnabled;
	}

	/**
	 * Indicates that <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @return {Configuration} the updated configuration
	 */
	withAssertionsEnabled()
	{
		if (this.assertionsEnabled)
			return this;
		return new Configuration(this.internalVerifier, this.exception, this.context, true);
	}

	/**
	 * Indicates that <code>assertThat()</code> shouldn't do anything.
	 *
	 * @return {Configuration} the updated configuration
	 */
	withAssertionsDisabled()
	{
		if (!this.assertionsEnabled)
			return this;
		return new Configuration(this.internalVerifier, this.exception, this.context, false);
	}

	/**
	 * Returns the type of exception that will be thrown if a verification fails.
	 *
	 * @return {Error} <code>null</code> if the default exception type will be thrown
	 * @see #withException(Class)
	 * @see #withDefaultException()
	 */
	getException()
	{
		return this.exception;
	}

	/**
	 * Overrides the type of exception that will get thrown if a verification fails.
	 * <p>
	 * The exception class must define the following constructor:
	 * <p>
	 * <code><init>(message)</code>
	 *
	 * @param {Error} exception the type of exception to throw
	 * @return {Configuration} the updated configuration
	 * @throws {TypeError} if <code>exception</code> is not set
	 * @see #getException()
	 */
	withException(exception)
	{
		if (!Utilities.extends(exception, Error))
		{
			const type = Utilities.getTypeOf(exception);
			switch (type)
			{
				case "Undefined":
					throw new TypeError("exception may not be undefined");
				case "Null":
					throw new TypeError("exception may not be null");
				default:
				{
					throw new TypeError("exception must be an Error.\n" +
						"Actual: " + type);
				}
			}
		}
		if (exception === this.exception)
			return this;
		return new Configuration(this.internalVerifier, exception, this.context);
	}

	/**
	 * Throws the default exception type if a verification fails.
	 *
	 * @return {Configuration} the updated configuration
	 * @see #getException()
	 */
	withDefaultException()
	{
		if (this.exception === null)
			return this;
		return new Configuration(this.internalVerifier, null, this.context);
	}

	/**
	 * @return {Array.<Array>} an array of key-value pairs to append to the exception message
	 * @see #addContext(String, Object)
	 */
	getContext()
	{
		return this.context;
	}

	/**
	 * Appends contextual information to the exception message.
	 *
	 * @param {string} key   a key
	 * @param {Object} value a value
	 * @return {Configuration} the updated configuration
	 * @throws {TypeError} if <code>key</code> is not a <code>String</code>
	 * @see #getContext()
	 */
	addContext(key, value)
	{
		if (typeof (key) !== "string")
		{
			throw new TypeError("key must be a String.\n" +
				"Actual: " + Utilities.getTypeOf(key));
		}
		const newContext = [...this.context, [key, value]];
		return new Configuration(this.internalVerifier, this.exception, newContext);
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {Configuration as default};