import type {GlobalConfiguration} from "./internal/internal.mjs";
import {Objects} from "./internal/internal.mjs";

/**
 * A verifier's configuration.
 */
class Configuration
{
	private readonly globalConfiguration: GlobalConfiguration;
	private readonly context: Map<string, unknown>;
	private assertionsEnabled: boolean;
	private diffEnabled: boolean;
	private readonly typeToStringConverter: Map<string, (input: unknown) => string>;

	/**
	 * Creates a new configuration without an empty context and without an exception override.
	 *
	 * @param globalConfiguration - the global configuration inherited by all verifiers
	 * @param context - (optional) a map of key-value pairs to append to the exception message
	 * @param assertionsEnabled - (optional) <code>true</code> if <code>assertThat()</code> should invoke
	 *   <code>requireThat()</code>. <code>false</code> if <code>assertThat()</code> should do nothing. If
	 *   <code>undefined</code> defaults to <code>globalConfiguration.assertionsAreEnabled()</code>.
	 * @param diffEnabled - (optional) true if exceptions should show the difference between the actual and
	 *   expected values. If <code>undefined</code> defaults to <code>globalConfiguration.diffEnabled()</code>.
	 * @param typeToStringConverter - (optional) a map from the </code>typeof</code> of a value to a function
	 *   that converts the value to a string
	 * @throws TypeError if <code>context</code> or one of its elements are not an array. If the nested array
	 *   contains less or more than 2 elements. If the keys nested in the context array are not strings.
	 * @throws RangeError if the elements nested in the context array are undefined, null, or are empty
	 */
	constructor(globalConfiguration: GlobalConfiguration,
		context = new Map<string, unknown>(), assertionsEnabled?: boolean, diffEnabled = true,
		typeToStringConverter = new Map<string, (input: unknown) => string>())
	{
		this.globalConfiguration = globalConfiguration;
		Objects.assertThatObjectOf(context, "context", "Map");
		this.context = context;
		if (typeof (assertionsEnabled) === "undefined")
			assertionsEnabled = globalConfiguration.assertionsAreEnabled();
		this.assertionsEnabled = assertionsEnabled;
		if (typeof (diffEnabled) === "undefined")
			diffEnabled = globalConfiguration.isDiffEnabled();
		this.diffEnabled = diffEnabled;
		this.typeToStringConverter = typeToStringConverter;
	}

	/**
	 * Returns a copy of this configuration.
	 * This method is thread-safe.
	 * Other methods may not be.
	 *
	 * @returns a copy of this configuration
	 */
	copy()
	{
		return new Configuration(this.globalConfiguration, new Map<string, unknown>(this.context),
			this.assertionsEnabled, this.diffEnabled,
			new Map<string, (input: unknown) => string>(this.typeToStringConverter));
	}

	/**
	 * Indicates whether <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @returns <code>true</code> if <code>assertThat()</code> should delegate to <code>requireThat()</code>.
	 * <code>false</code> if it shouldn't do anything.
	 */
	assertionsAreEnabled()
	{
		return this.assertionsEnabled;
	}

	/**
	 * Indicates that <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @returns this
	 */
	withAssertionsEnabled()
	{
		if (!this.assertionsEnabled)
			this.assertionsEnabled = true;
		return this;
	}

	/**
	 * Indicates that <code>assertThat()</code> shouldn't do anything.
	 *
	 * @returns this
	 */
	withAssertionsDisabled()
	{
		if (this.assertionsEnabled)
			this.assertionsEnabled = false;
		return this;
	}

	/**
	 * Indicates if exceptions should show the difference between the actual and expected values.
	 *
	 * @returns true by default
	 */
	isDiffEnabled()
	{
		return this.diffEnabled;
	}

	/**
	 * Indicates that exceptions should show the difference between the actual and expected values.
	 *
	 * @returns this
	 */
	withDiff()
	{
		if (!this.diffEnabled)
			this.diffEnabled = true;
		return this;
	}

	/**
	 * Indicates that exceptions should not show the difference between the actual and expected values.
	 *
	 * @returns this
	 */
	withoutDiff()
	{
		if (this.diffEnabled)
			this.diffEnabled = false;
		return this;
	}

	/**
	 * @returns a map of key-value pairs to append to the exception message
	 * @see #putContext
	 */
	getContext()
	{
		return this.context;
	}

	/**
	 * Adds or updates contextual information associated with the exception message.
	 *
	 * @param name - the name of the parameter
	 * @param value - the value of the parameter
	 * @returns this
	 * @throws TypeError if <code>key</code> is not a <code>string</code>
	 * @see #getContext
	 */
	putContext(name: string, value: unknown)
	{
		Objects.requireThatStringIsNotEmpty(name, "name");
		this.context.set(name, value);
		return this;
	}

	/**
	 * Removes contextual information associated with the exception message.
	 *
	 * @param name - the name of the parameter
	 * @returns this
	 * @throws TypeError if <code>name</code> is null
	 */
	removeContext(name: string)
	{
		Objects.requireThatStringIsNotEmpty(name, "name");
		this.context.delete(name);
		return this;
	}

	/**
	 * Returns the <code>String</code> representation of an object. By default, custom handlers are provided for
	 * arrays, <code>number</code> and <code>Set</code>.
	 *
	 * @param value - a value
	 * @returns the <code>String</code> representation of the value
	 * @see #withStringConverter
	 */
	convertToString(value: unknown)
	{
		const valueInfo = Objects.getTypeInfo(value);
		let converter = this.typeToStringConverter.get(valueInfo.type);
		if (!converter)
			converter = (value2: unknown) => Objects.toString(value2);
		return converter(value);
	}

	/**
	 * Indicates that a function should be used to convert a value to a string.
	 * <p>
	 * Please note that <code>type</code> must be an exact match, subclasses do not inherit converters from
	 * their superclass.
	 *
	 * @param type - the
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>
	 * of the type being converted
	 * @param converter - a function that converts an object of the specified type to a string
	 * @returns this
	 * @throws RangeError if any of the parameters are null
	 */
	withStringConverter(type: string, converter: (input: unknown) => string)
	{
		Objects.assertThatTypeOf(type, "type", "string");
		Objects.assertThatTypeOf(converter, "converter", "function");
		this.typeToStringConverter.set(type, converter);
		return this;
	}

	/**
	 * Indicates that the default converter should be used for <code>type</code>.
	 *
	 * @param type - the
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>
	 * of the type being converted
	 * @returns this
	 * @throws RangeError if <code>type</code> is null
	 */
	withoutStringConverter(type: string)
	{
		Objects.assertThatTypeOf(type, "type", "string");
		this.typeToStringConverter.delete(type);
		return this;
	}

	/**
	 * Returns the global configuration.
	 *
	 * @returns the global configuration associated with this object
	 */
	getGlobalConfiguration()
	{
		return this.globalConfiguration;
	}
}

export {Configuration};