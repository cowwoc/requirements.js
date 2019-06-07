import GlobalConfiguration from "./GlobalConfiguration.js";
import Requirements from "./Requirements.js";
import Objects from "./internal/Objects.js";

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
	 * <code>null</code> to throw the default exception type
	 * @param {Map} [context=[]] a map of key-value pairs to append to the exception message
	 * @param {boolean} [assertionsEnabled=false] true if <code>assertThat()</code> should invoke
	 * <code>requireThat()</code>; false if <code>assertThat()</code> should do nothing
	 * @param {boolean} [diffEnabled=true] true if exceptions should show the difference between the actual and expected
	 * values
	 * @param {Map} [typeToStringConverter={}] a map from an object type (per {@link Objects#getTypeOf}) to a
	 * function that converts the object to a String
	 * @throws {TypeError} if <code>internalVerifier</code> is undefined or null; <code>context</code> or one of its
	 * elements are not an array; if the nested array contains less or more than 2 elements; if the keys nested in the
	 * context array are not strings
	 * @throws {RangeError} if the elements nested in the context array are undefined, null, or are empty
	 */
	constructor(internalVerifier, exception, context, assertionsEnabled, diffEnabled, typeToStringConverter)
	{
		Objects.assertThatTypeOf(internalVerifier, "internalVerifier", "Requirements");
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
			context = new Map();
		else
			Objects.assertThatTypeOf(context, "context", "Map");
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
		if (typeof (diffEnabled) === "undefined")
			diffEnabled = true;
		Object.defineProperty(this, "diffEnabled",
			{
				value: diffEnabled
			});
		if (typeof (typeToStringConverter) === "undefined")
			typeToStringConverter = new Map();
		else
			Objects.assertThatTypeOf(typeToStringConverter, "typeToStringConverter", "Map");
		Object.defineProperty(this, "typeToStringConverter",
			{
				value: typeToStringConverter
			});
	}

	/**
	 * Returns the type of exception that will be thrown if a verification fails.
	 *
	 * @return {boolean} true if <code>assertThat()</code> should delegate to <code>requireThat()</code>; false if it
	 * shouldn't do anything
	 * @see #withException
	 * @see #withDefaultException
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
	 * @see #withException
	 * @see #withDefaultException
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
	 * @see #getException
	 */
	withException(exception)
	{
		if (!Objects.extends(exception, Error))
		{
			throw new TypeError("exception must extend Error.\n" +
				"Actual: " + exception + "\n" +
				"Type  : " + Objects.getTypeOf(exception));
		}
		if (exception === this.exception)
			return this;
		return new Configuration(this.internalVerifier, exception, this.context);
	}

	/**
	 * Throws the default exception type if a verification fails.
	 *
	 * @return {Configuration} the updated configuration
	 * @see #getException
	 */
	withDefaultException()
	{
		if (this.exception === null)
			return this;
		return new Configuration(this.internalVerifier, null, this.context);
	}

	/**
	 * Indicates if exceptions should show the difference between the actual and expected values.
	 *
	 * @return {boolean} true by default
	 */
	isDiffEnabled()
	{
		return this.diffEnabled;
	}

	/**
	 * Indicates that exceptions should show the difference between the actual and expected values.
	 *
	 * @return {Configuration} a verifier with the updated configuration
	 */
	withDiff()
	{
		if (this.diffEnabled)
			return this;
		return new Configuration(this.internalVerifier, this.exception, this.context, this.assertionsEnabled, true,
			this.typeToStringConverter);
	}

	/**
	 * Indicates that exceptions should not show the difference between the actual and expected
	 * values.
	 *
	 * @return {Configuration} a verifier with the updated configuration
	 */
	withoutDiff()
	{
		if (this.diffEnabled)
			return this;
		return new Configuration(this.internalVerifier, this.exception, this.context, this.assertionsEnabled, false,
			this.typeToStringConverter);
	}

	/**
	 * @return {Map<string, string>} an array of key-value pairs to append to the exception message
	 * @see #putContext
	 */
	getContext()
	{
		return this.context;
	}

	/**
	 * Adds or updates contextual information associated with the exception message.
	 *
	 * @param {string} name the name of the parameter
	 * @param {object} value the value of the parameter
	 * @return {Configuration} the updated configuration
	 * @throws {TypeError} if <code>key</code> is not a <code>String</code>
	 * @see #getContext
	 */
	putContext(name, value)
	{
		Objects.requireThatStringNotEmpty(name, "name");
		const newContext = new Map(this.context);
		newContext.set(name, value);
		return new Configuration(this.internalVerifier, this.exception, newContext, this.assertionsEnabled,
			this.diffEnabled, this.typeToStringConverter);
	}

	/**
	 * Removes contextual information associated with the exception message.
	 *
	 * @param {string} name the name of the parameter
	 * @return {Configuration} the updated configuration
	 * @throws {TypeError} if <code>name</code> is null
	 */
	removeContext(name)
	{
		Objects.requireThatStringNotEmpty(name, "name");
		const newContext = new Map(this.context);
		if (!newContext.delete(name))
			return this;
		return new Configuration(this.internalVerifier, this.exception, newContext);
	}

	/**
	 * Returns the <code>String</code> representation of an object. By default, custom handlers are provided for
	 * arrays, <code>Number</code> and <code>Set</code>.
	 *
	 * @param {object} o an object
	 * @return {string} the <code>String</code> representation of the object
	 * @see #withStringConverter
	 */
	convertToString(o)
	{
		const type = Objects.getTypeOf(o);
		let converter = this.typeToStringConverter.get(type);
		if (!converter)
			converter = o2 => Objects.toString(o2);
		return converter(o);
	}

	/**
	 * Indicates that a function should be used to convert an object to a String.
	 * <p>
	 * Please note that <code>type</code> must be an exact match, subclasses will not match the type of their superclass.
	 *
	 * @param {string} type the type of object (per {@link Objects#getTypeOf}) being converted
	 * @param {Function} converter a function that converts an object of the specified type to a String
	 * @return {Configuration} the updated configuration
	 * @throws {RangeError} if any of the parameters are null
	 */
	withStringConverter(type, converter)
	{
		Objects.assertThatTypeOf(type, "type", "string");
		Objects.assertThatTypeOf(converter, "converter", "Function");
		const newTypeToStringConverter = new Map(this.typeToStringConverter);
		newTypeToStringConverter.set(type, converter);
		return new Configuration(this.internalVerifier, this.exception, this.context, this.assertionsEnabled,
			this.diffEnabled, newTypeToStringConverter);
	}

	/**
	 * Indicates that an object's <code>convertToString()</code> method should be used to convert it to a String.
	 *
	 * @param {string} type the type of object (per {@link Objects#getTypeOf}) being converted
	 * @return {Configuration} the updated  configuration
	 * @throws {RangeError} if <code>type</code> is null
	 */
	withoutStringConverter(type)
	{
		Objects.assertThatTypeOf(type, "type", "string");
		const newTypeToStringConverter = new Map(this.typeToStringConverter);
		if (!newTypeToStringConverter.delete(type))
			return this;
		return new Configuration(this.internalVerifier, this.exception, this.context, this.assertionsEnabled,
			this.diffEnabled, newTypeToStringConverter);
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {Configuration as default};