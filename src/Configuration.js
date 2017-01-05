import ExceptionBuilder from "./ExceptionBuilder";
import Utilities from "./Utilities";

/**
 * Creates a new configuration without an empty context and without an exception override.
 *
 * @constructor
 * @param {RequirementVerifier} internalVerifier the verifier that can be used to check a verifier's own parameters
 * @param {Error} [exceptionOverride] the type of exception to throw, {@code null} to throw the default exception
 *                  type
 * @param {Array<Object>} [context] a list of key-value pairs to append to the exception message
 * @throws {TypeError} if {@code internalVerifier} is undefined or null
 * @author Gili Tzabari
 */
function Configuration(internalVerifier, exceptionOverride, context)
{
	if (internalVerifier === undefined)
	{
		throw new TypeError("internalVerifier must be set.\n" +
			"Actual: " + internalVerifier);
	}
	Object.defineProperty(this, "internalVerifier",
		{
			enumerable: true,
			value: internalVerifier
		});
	if (exceptionOverride === undefined)
		exceptionOverride = null;
	Object.defineProperty(this, "exceptionOverride",
		{
			value: exceptionOverride
		});
	if (context === undefined)
		context = [];
	Object.defineProperty(this, "context",
		{
			value: []
		});
}

/**
 * Overrides the type of exception that will get thrown if a requirement fails.
 *
 * The exception class must define the following constructor:
 *
 * {@code <init>(message)}
 *
 * @param {Error} exception the type of exception to throw, {@code null} to throw the default exception
 *                  type
 * @return {Configuration} a configuration with the specified exception override
 * @throws {TypeError} if {@code exception} is undefined; if {@code exception} is not null or an {@code Error}
 * @see #getException()
 */
Configuration.prototype.withException = function(exception)
{
	switch (Utilities.getTypeName(exception))
	{
		case "Undefined":
			throw new TypeError("exception may not be undefined");
		case "Function":
		{
			if (Utilities.extends(exception, Error))
				break;
		}
		default:
		{
			throw new TypeError("exception must be an Error.\n" +
				"Actual: " + Utilities.getTypeName(exception));
		}
	}
	if (exception === this.exceptionOverride)
		return this;
	return new Configuration(this.internalVerifier, exception, this.context);
};

/**
 * @return {Error} the type of exception to throw, {@code null} to throw the default exception type
 * @see #withException(Class)
 */
Configuration.prototype.getException = function()
{
	return this.exceptionOverride;
};

/**
 * Appends contextual information to the exception message.
 *
 * @param {String} key   a key
 * @param {Object} value a value
 * @return {Configuration} a new verifier with the specified context
 * @throws {TypeError} if {@code key} is not a String
 * @throws {RangeError} if {@code key} is not set
 * @see #getContext()
 */
Configuration.prototype.addContext = function(key, value)
{
	if (typeof(key) !== "string")
	{
		throw new TypeError("key must be a String.\n" +
			"Actual: " + Utilities.getTypeName(key));
	}
	if (!key)
	{
		throw new RangeError("key must be set.\n" +
			"Actual: " + Utilities.getTypeName(key));
	}
	const newContext = [...this.context, {key: value}];
	return new Configuration(this.internalVerifier, this.exceptionOverride, newContext);
};

/**
 * Sets the contextual information to append to the exception message.
 *
 * @param {Array<Object>} context the contextual information
 * @return {Configuration} a configuration with the specified context
 * @throws {TypeError} if {@code context} is not an Array
 * @throws {RangeError} if {@code context} is undefined or null, or if it contains entries that would be rejected by
 *   {@link #addContext}
 * @see #getContext()
 */
Configuration.prototype.withContext = function(context)
{
	if (context === this.context)
		return this;
	if (!Array.isArray(context))
	{
		throw new TypeError("context must be an array.\n" +
			"Actual: " + Utilities.getTypeName(context));
	}
	if (!context)
	{
		throw new RangeError("context must be set.\n" +
			"Actual: " + Utilities.getTypeName(context));
	}
	let i = 0;
	for (let entry of context)
	{
		let key = Object.keys(entry)[0];
		if (typeof(key) !== "string")
		{
			throw new TypeError("context.key must be a String at index " + i + ".\n" +
				"Actual: " + Utilities.getTypeName(key));
		}
		if (!key)
		{
			throw new RangeError("context.key must be set at index " + i + ".\n" +
				"Actual: " + Utilities.getTypeName(key));
		}
		++i;
	}
	return new Configuration(this.internalVerifier, this.exceptionOverride, this.context);
};

/**
 * @return {List<Object>} a list of key-value pairs to append to the exception message
 * @see #addContext(String, Object)
 */
Configuration.prototype.getContext = function()
{
	return this.context;
};

/**
 * Builds an exception.
 *
 * @param {ExceptionConstructor} type the type of the exception
 * @param {String} message an explanation of what went wrong
 * @throws {TypeError} if {@code type} or {@code message} are null
 * @return {ExceptionBuilder} the exception builder
 */
Configuration.prototype.exceptionBuilder = function(type, message)
{
	const result = new ExceptionBuilder(type, message, this.context);
	if (this.exceptionOverride != null)
		result.type(this.exceptionOverride);
	return result;
};

export default Configuration;