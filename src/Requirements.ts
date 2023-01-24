/** @module Requirements */
import
{
	Configuration,
	MainGlobalConfiguration,
	ObjectAsserter,
	ObjectAsserterNoOp,
	Objects,
	ObjectValidator,
	ObjectValidatorImpl,
	ObjectVerifier,
	ObjectVerifierImpl
} from "./internal/internal.js";

/**
 * Verifies the requirements of types from the Javascript core API.
 */
class Requirements
{
	private readonly config: Configuration;

	/**
	 * Verifies a value.
	 * <p>
	 * Unlike {@link Requirements}, instances of this class can be configured prior to initiating verification.
	 * Doing so causes the same configuration to get reused across runs.
	 *
	 * @param {Configuration} configuration the instance configuration
	 */
	constructor(configuration?: Configuration)
	{
		if (typeof (configuration) === "undefined")
			configuration = new Configuration(MainGlobalConfiguration.INSTANCE);
		this.config = configuration;
	}

	/**
	 * Verifies the requirements of an object.
	 *
	 * @function
	 * @param {object} actual the actual value
	 * @param {string} name   the name of the value
	 * @return {ObjectVerifier} a verifier
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	requireThat(actual: unknown, name: string): ObjectVerifier
	{
		return new ObjectVerifierImpl(this.validateThat(actual, name));
	}

	// WORKAROUND: https://github.com/jsdoc3/jsdoc/issues/1533
	/**
	 * Same as [requireThat()]{@link module:Requirements~Requirements#requireThat} but does nothing if
	 * assertions are disabled.
	 *
	 * @function
	 * @param {object} actual the actual value
	 * @param {string} name   the name of the value
	 * @return {ObjectAsserter} an asserter
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	assertThat(actual: unknown, name: string): ObjectAsserter
	{
		Objects.verifyName(name, "name");
		if (this.config.assertionsAreEnabled())
			return this.requireThat(actual, name);
		return ObjectAsserterNoOp.INSTANCE;
	}

	/**
	 * Validates the requirements of an object.
	 *
	 * @function
	 * @param {object} actual the actual value
	 * @param {string} name   the name of the value
	 * @return {ObjectValidator} validator for the value
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	validateThat(actual: unknown, name: string): ObjectValidator
	{
		Objects.verifyName(name, "name");
		return new ObjectValidatorImpl(this.config, actual, name);
	}

	/**
	 * Indicates whether <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @return {boolean} true if <code>assertThat()</code> should delegate to <code>requireThat()</code>; false
	 *   if it shouldn't do anything
	 */
	assertionsAreEnabled(): boolean
	{
		return this.config.assertionsAreEnabled();
	}

	/**
	 * Indicates that <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @return {Requirements} a verifier with the updated configuration
	 */
	withAssertionsEnabled(): Requirements
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
	withAssertionsDisabled(): Requirements
	{
		const newConfig = this.config.withAssertionsDisabled();
		if (newConfig === this.config)
			return this;
		return new Requirements(newConfig);
	}

	/**
	 * Indicates if exceptions should show the difference between the actual and expected values.
	 *
	 * @return {boolean} true by default
	 */
	isDiffEnabled(): boolean
	{
		return this.config.isDiffEnabled();
	}

	/**
	 * Indicates that exceptions should show the difference between the actual and expected values.
	 *
	 * @return {Requirements} a verifier with the updated configuration
	 */
	withDiff(): Requirements
	{
		const newConfig = this.config.withDiff();
		if (newConfig === this.config)
			return this;
		return new Requirements(newConfig);
	}

	/**
	 * Indicates that exceptions should not show the difference between the actual and expected
	 * values.
	 *
	 * @return {Requirements} a verifier with the updated configuration
	 */
	withoutDiff(): Requirements
	{
		const newConfig = this.config.withoutDiff();
		if (newConfig === this.config)
			return this;
		return new Requirements(newConfig);
	}

	/**
	 * @return {Map<string, object>} a map of key-value pairs to append to the exception message
	 * @see #putContext
	 */
	getContext(): Map<string, unknown>
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
	putContext(key: string, value: unknown): Requirements
	{
		return new Requirements(this.config.putContext(key, value));
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {Requirements as default};