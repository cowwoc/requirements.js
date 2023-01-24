import
{
	GlobalConfiguration,
	Objects
} from "./internal/internal.js";

/**
 * A verifier's configuration.
 */
class Configuration
{
	private readonly globalConfiguration: GlobalConfiguration;
	private readonly context: Map<string, unknown>;
	private readonly assertionsEnabled: boolean;
	private readonly diffEnabled: boolean;
	private readonly typeToStringConverter: Map<string, (input: unknown) => string>;

	/**
	 * Creates a new configuration without an empty context and without an exception override.
	 *
	 * @param {GlobalConfiguration} globalConfiguration the global configuration inherited by all verifiers
	 * @param {Map<string, string>} [context] a map of key-value pairs to append to the exception message
	 * @param {boolean} [assertionsEnabled] <code>true</code> if <code>assertThat()</code> should invoke
	 *   <code>requireThat()</code>. <code>false</code> if <code>assertThat()</code> should do nothing. If
	 *   <code>undefined</code> defaults to <code>globalConfiguration.assertionsAreEnabled()</code>.
	 * @param {boolean} [diffEnabled] true if exceptions should show the difference between the actual and
	 *   expected values. If <code>undefined</code> defaults to <code>globalConfiguration.diffEnabled()</code>.
	 * @param {Map<string, Function>} [typeToStringConverter] a map from the </code>typeof</code> of a value
	 *   to a function that converts the value to a string
	 * @throws {TypeError} if <code>context</code> or one of its elements are not an array. If the nested array
	 *   contains less or more than 2 elements. If the keys nested in the context array are not strings.
	 * @throws {RangeError} if the elements nested in the context array are undefined, null, or are empty
	 */
	constructor(globalConfiguration: GlobalConfiguration,
		context: Map<string, unknown> = new Map<string, unknown>(),
		assertionsEnabled?: boolean, diffEnabled = true,
		typeToStringConverter: Map<string, (input: unknown) => string> =
			new Map<string, (input: unknown) => string>())
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
	 * Indicates whether <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @return {boolean} <code>true</code> if <code>assertThat()</code> should delegate to
	 *   <code>requireThat()</code>. <code>false</code> if it shouldn't do anything.
	 */
	assertionsAreEnabled(): boolean
	{
		return this.assertionsEnabled;
	}

	/**
	 * Indicates that <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @return {Configuration} the updated configuration
	 */
	withAssertionsEnabled(): Configuration
	{
		if (this.assertionsEnabled)
			return this;
		return new Configuration(this.globalConfiguration, this.context, true, this.diffEnabled,
			this.typeToStringConverter);
	}

	/**
	 * Indicates that <code>assertThat()</code> shouldn't do anything.
	 *
	 * @return {Configuration} the updated configuration
	 */
	withAssertionsDisabled(): Configuration
	{
		if (!this.assertionsEnabled)
			return this;
		return new Configuration(this.globalConfiguration, this.context, false, this.diffEnabled,
			this.typeToStringConverter);
	}

	/**
	 * Indicates if exceptions should show the difference between the actual and expected values.
	 *
	 * @return {boolean} true by default
	 */
	isDiffEnabled(): boolean
	{
		return this.diffEnabled;
	}

	/**
	 * Indicates that exceptions should show the difference between the actual and expected values.
	 *
	 * @return {Configuration} the updated configuration
	 */
	withDiff(): Configuration
	{
		if (this.diffEnabled)
			return this;
		return new Configuration(this.globalConfiguration, this.context, this.assertionsEnabled, true,
			this.typeToStringConverter);
	}

	/**
	 * Indicates that exceptions should not show the difference between the actual and expected
	 * values.
	 *
	 * @return {Configuration} the updated configuration
	 */
	withoutDiff(): Configuration
	{
		if (!this.diffEnabled)
			return this;
		return new Configuration(this.globalConfiguration, this.context, this.assertionsEnabled, false,
			this.typeToStringConverter);
	}

	/**
	 * @return {Map<string, object>} a map of key-value pairs to append to the exception message
	 * @see #putContext
	 */
	getContext(): Map<string, unknown>
	{
		return this.context;
	}

	/**
	 * Adds or updates contextual information associated with the exception message.
	 *
	 * @param {string} name the name of the parameter
	 * @param {object} value the value of the parameter
	 * @return {Configuration} the updated configuration
	 * @throws {TypeError} if <code>key</code> is not a <code>string</code>
	 * @see #getContext
	 */
	putContext(name: string, value: unknown): Configuration
	{
		Objects.requireThatStringNotEmpty(name, "name");
		const newContext = new Map<string, unknown>(this.context);
		newContext.set(name, value);
		return new Configuration(this.globalConfiguration, newContext, this.assertionsEnabled, this.diffEnabled,
			this.typeToStringConverter);
	}

	/**
	 * Removes contextual information associated with the exception message.
	 *
	 * @param {string} name the name of the parameter
	 * @return {Configuration} the updated configuration
	 * @throws {TypeError} if <code>name</code> is null
	 */
	removeContext(name: string): Configuration
	{
		Objects.requireThatStringNotEmpty(name, "name");
		const newContext = new Map(this.context);
		if (!newContext.delete(name))
			return this;
		return new Configuration(this.globalConfiguration, newContext, this.assertionsEnabled, this.diffEnabled,
			this.typeToStringConverter);
	}

	/**
	 * Returns the <code>String</code> representation of an object. By default, custom handlers are provided for
	 * arrays, <code>number</code> and <code>Set</code>.
	 *
	 * @param {object} value a value
	 * @return {string} the <code>String</code> representation of the value
	 * @see #withStringConverter
	 */
	convertToString(value: unknown): string
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
	 * @param {string} type the
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>
	 * of the type being converted
	 * @param {Function} converter a function that converts an object of the specified type to a string
	 * @return {Configuration} the updated configuration
	 * @throws {RangeError} if any of the parameters are null
	 */
	withStringConverter(type: string, converter: (input: unknown) => string): Configuration
	{
		Objects.assertThatTypeOf(type, "type", "string");
		Objects.assertThatTypeOf(converter, "converter", "function");
		const newTypeToStringConverter = new Map<string, (input: unknown) => string>(this.typeToStringConverter);
		newTypeToStringConverter.set(type, converter);
		return new Configuration(this.globalConfiguration, this.context, this.assertionsEnabled, this.diffEnabled,
			newTypeToStringConverter);
	}

	/**
	 * Indicates that the default converter should be used for <code>type</code>.
	 *
	 * @param {string} type the
	 * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>
	 * of the type being converted
	 * @return {Configuration} the updated configuration
	 * @throws {RangeError} if <code>type</code> is null
	 */
	withoutStringConverter(type: string): Configuration
	{
		Objects.assertThatTypeOf(type, "type", "string");
		const newTypeToStringConverter = new Map(this.typeToStringConverter);
		if (!newTypeToStringConverter.delete(type))
			return this;
		return new Configuration(this.globalConfiguration, this.context, this.assertionsEnabled, this.diffEnabled,
			newTypeToStringConverter);
	}

	/**
	 * Returns the global configuration.
	 *
	 * @return {GlobalConfiguration} the global configuration associated with this object
	 */
	getGlobalConfiguration(): GlobalConfiguration
	{
		return this.globalConfiguration;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {Configuration as default};