import type {
	ObjectValidator,
	ObjectVerifier
} from "./internal/internal.mjs";
import {
	Configuration,
	MainGlobalConfiguration,
	Objects,
	ObjectValidatorImpl,
	ObjectVerifierImpl
} from "./internal/internal.mjs";

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
	 * @param configuration - the instance configuration
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
	 * @param actual - the actual value
	 * @param name - the name of the value
	 * @returns a verifier
	 * @throws TypeError  if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	requireThat(actual: unknown, name: string): ObjectVerifier
	{
		return new ObjectVerifierImpl(this.validateThat(actual, name));
	}

	/**
	 * Verifies requirements only if assertions are enabled.
	 *
	 * @param requirements - the requirements to verify
	 * @returns the value returned by the operation, or <code>undefined</code> if assertions are disabled
	 * @throws TypeError  if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 * @see #assertThat
	 */
	assertThatAndReturn<V>(requirements: (requirements: Requirements) => V)
	{
		Objects.requireThatValueIsDefinedAndNotNull(requirements, "requirements");
		if (this.config.assertionsAreEnabled())
			return requirements(this.copy());
		return undefined;
	}

	/**
	 * Verifies requirements only if assertions are enabled.
	 *
	 * @param requirements - the requirements to verify
	 * @throws TypeError  if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	assertThat(requirements: (requirements: Requirements) => void)
	{
		Objects.requireThatValueIsDefinedAndNotNull(requirements, "requirements");
		if (this.config.assertionsAreEnabled())
			requirements(this.copy());
	}

	/**
	 * Returns a copy of this configuration.
	 *
	 * @returns a copy of this configuration
	 */
	copy()
	{
		return new Requirements(this.config.copy());
	}

	/**
	 * Validates the requirements of an object.
	 *
	 * @param actual - the actual value
	 * @param name - the name of the value
	 * @returns validator for the value
	 * @throws TypeError  if <code>name</code> is null
	 * @throws RangeError if <code>name</code> is empty
	 */
	validateThat(actual: unknown, name: string): ObjectValidator
	{
		Objects.verifyName(name, "name");
		return new ObjectValidatorImpl(this.config, actual, name, []);
	}

	/**
	 * Indicates whether <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @returns true if <code>assertThat()</code> should delegate to <code>requireThat()</code>; false if it
	 *   shouldn't do anything
	 */
	assertionsAreEnabled()
	{
		return this.config.assertionsAreEnabled();
	}

	/**
	 * Indicates that <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @returns this
	 */
	withAssertionsEnabled()
	{
		this.config.withAssertionsEnabled();
		return this;
	}

	/**
	 * Indicates that <code>assertThat()</code> shouldn't do anything.
	 *
	 * @returns this
	 */
	withAssertionsDisabled()
	{
		this.config.withAssertionsDisabled();
		return this;
	}

	/**
	 * Indicates if exceptions should show the difference between the actual and expected values.
	 *
	 * @returns true by default
	 */
	isDiffEnabled()
	{
		return this.config.isDiffEnabled();
	}

	/**
	 * Indicates that exceptions should show the difference between the actual and expected values.
	 *
	 * @returns this
	 */
	withDiff()
	{
		this.config.withDiff();
		return this;
	}

	/**
	 * Indicates that exceptions should not show the difference between the actual and expected
	 * values.
	 *
	 * @returns this
	 */
	withoutDiff()
	{
		this.config.withoutDiff();
		return this;
	}

	/**
	 * @returns a map of key-value pairs to append to the exception message
	 * @see #putContext
	 */
	getContext()
	{
		return this.config.getContext();
	}

	/**
	 * Appends contextual information to the exception message.
	 *
	 * @param key - a key
	 * @param value - a value
	 * @returns this
	 * @throws TypeError if <code>key</code> is not a string
	 * @see #getContext
	 */
	putContext(key: string, value: unknown)
	{
		this.config.putContext(key, value);
		return this;
	}
}

export {Requirements};