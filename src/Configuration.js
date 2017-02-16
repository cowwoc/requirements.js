import Utilities from "./Utilities";

/**
 * A verifier's configuration.
 * <p>
 * This class is immutable.
 *
 * @class
 * @author Gili Tzabari
 */

class Configuration {
	/**
	 * Creates a new configuration without an empty context and without an exception override.
	 *
	 * @constructor
	 * @param {Verifiers} internalVerifier the verifier that can be used to check a verifier's own parameters
	 * @param {Error} [exception = null] the type of exception that will be thrown if a verification fails, {@code null}
	 *   to throw the default exception type
	 * @param {Array.<Array>} [context = []] a list of key-value pairs to append to the exception message
	 * @param {Boolean} [assertionsEnabled = false] true if {@code assertThat()} should invoke {@code requireThat()};
	 *   false if {@code assertThat()} should do nothing
	 * @throws {TypeError} if {@code internalVerifier} is undefined or null; {@code context} or one of its elements are
	 *   not an array; if the nested array contains less or more than 2 elements; if the elements nested in the context
	 *   array are not strings
	 * @throws {RangeError} if the elements nested in the context array are undefined, null, or are empty
	 */
	constructor(internalVerifier, exception, context, assertionsEnabled)
	{
		if (typeof(internalVerifier) === "undefined")
		{
			throw new TypeError("internalVerifier must be set.\n" +
				"Actual: " + internalVerifier);
		}
		Object.defineProperty(this, "internalVerifier",
			{
				enumerable: true,
				value: internalVerifier
			});
		if (typeof(exception) === "undefined")
			exception = null;
		Object.defineProperty(this, "exception",
			{
				value: exception
			});
		if (typeof(context) === "undefined")
			context = [];
		else
			Utilities.verifyContext(context);
		Object.defineProperty(this, "context",
			{
				value: context
			});
		if (typeof(assertionsEnabled) === "undefined")
			assertionsEnabled = false;
		Object.defineProperty(this, "assertionsEnabled",
			{
				value: assertionsEnabled
			});
	}

	/**
	 * Returns the type of exception that will be thrown if a verification fails.
	 *
	 * @return {Boolean} true if {@code assertThat()} should delegate to {@code requireThat()}; false if it
	 *         shouldn't do anything
	 * @see #withException(Class)
	 * @see #withDefaultException()
	 */
	assertionsAreEnabled()
	{
		return this.assertionsEnabled;
	}

	/**
	 * Indicates that {@code assertThat()} should invoke {@code requireThat()}.
	 *
	 * @return {Configuration} a verifier with the updated configuration
	 */
	withAssertionsEnabled()
	{
		if (this.assertionsEnabled)
			return this;
		return new Configuration(this.internalVerifier, this.exception, this.context, true);
	}

	/**
	 * Indicates that {@code assertThat()} shouldn't do anything.
	 *
	 * @return {Configuration} a verifier with the updated configuration
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
	 * @return {ExceptionConstructor} {@code null} if the default exception type will be thrown
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
	 * {@code <init>(message)}
	 *
	 * @param {ExceptionConstructor} exception the type of exception to throw
	 * @return {Configuration} this
	 * @throws {TypeError} if {@code exception} is not set
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
	 * @return {Configuration} this
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
	 * @param {String} key   a key
	 * @param {Object} value a value
	 * @return {Configuration} a new verifier with the specified context
	 * @throws {TypeError} if {@code key} or {@code value} are not a {@code String}
	 * @see #getContext()
	 */
	addContext(key, value)
	{
		if (typeof(key) !== "string")
		{
			throw new TypeError("key must be a String.\n" +
				"Actual: " + Utilities.getTypeOf(key));
		}
		if (typeof(value) !== "string")
		{
			throw new TypeError("value must be a String.\n" +
				"Actual: " + Utilities.getTypeOf(value));
		}
		const newContext = [...this.context, [key, value]];
		return new Configuration(this.internalVerifier, this.exception, newContext);
	}
}

export default Configuration;