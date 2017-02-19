import ArrayVerifier from "./ArrayVerifier";
import Configuration from "./Configuration";
import MapVerifier from "./MapVerifier";
import NoOpArrayVerifier from "./NoOpArrayVerifier";
import NoOpMapVerifier from "./NoOpMapVerifier";
import NoOpNumberVerifier from "./NoOpNumberVerifier";
import NoOpObjectVerifier from "./NoOpObjectVerifier";
import NoOpSetVerifier from "./NoOpSetVerifier";
import NoOpStringVerifier from "./NoOpStringVerifier";
import NoOpUriVerifier from "./NoOpUriVerifier";
import NumberVerifier from "./NumberVerifier";
import ObjectVerifier from "./ObjectVerifier";
import SetVerifier from "./SetVerifier";
import StringVerifier from "./StringVerifier";
import UriVerifier from "./UriVerifier";
import Utilities from "./Utilities";

/**
 * An entry point for verifying API requirements.
 * <p>
 * Unlike {@link Requirements}, instances of this class are configurable.
 * <p>
 * This class is immutable.
 *
 * @class
 * @author Gili Tzabari
 */
class Verifiers {
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
		if (typeof(configuration) === "undefined")
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
	 * @return {ObjectVerifier|StringVerifier|ArrayVerifier|NumberVerifier|SetVerifier|MapVerifier|UriVerifier} a verifier
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	requireThat(actual, name)
	{
		Utilities.verifyName(name, "name");
		switch (Utilities.getTypeOf(actual))
		{
			case "String":
				//noinspection JSCheckFunctionSignatures
				return new StringVerifier(this.config, actual, name);
			case "Array":
				//noinspection JSCheckFunctionSignatures
				return new ArrayVerifier(this.config, actual, name);
			case "Number":
				//noinspection JSCheckFunctionSignatures
				return new NumberVerifier(this.config, actual, name);
			case "Set":
				//noinspection JSCheckFunctionSignatures
				return new SetVerifier(this.config, actual, name);
			case "Map":
				//noinspection JSCheckFunctionSignatures
				return new MapVerifier(this.config, actual, name);
			case "URI":
				//noinspection JSCheckFunctionSignatures
				return new UriVerifier(this.config, actual, name);
			case "Object":
			default:
				return new ObjectVerifier(this.config, actual, name);
		}
		// TODO: See https://github.com/dsheiko/bycontract and https://github.com/muroc/offensive.js for related projects
	}

	/**
	 * Same as {@link #requireThat(Object, String)} but does nothing if assertions are disabled.
	 *
	 * @function
	 * @param {Object} actual the actual value
	 * @param {String} name   the name of the value
	 * @return {ObjectVerifier|StringVerifier|ArrayVerifier|NumberVerifier|SetVerifier|MapVerifier|UriVerifier} a verifier
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	assertThat(actual, name)
	{
		Utilities.verifyName(name, "name");
		if (this.config.assertionsAreEnabled())
			return this.requireThat(actual, name);
		switch (Utilities.getTypeOf(actual))
		{
			case "String":
				//noinspection JSCheckFunctionSignatures
				return new NoOpStringVerifier(this.config, actual, name);
			case "Array":
				//noinspection JSCheckFunctionSignatures
				return new NoOpArrayVerifier(this.config, actual, name);
			case "Number":
				//noinspection JSCheckFunctionSignatures
				return new NoOpNumberVerifier(this.config, actual, name);
			case "Set":
				//noinspection JSCheckFunctionSignatures
				return new NoOpSetVerifier(this.config, actual, name);
			case "Map":
				//noinspection JSCheckFunctionSignatures
				return new NoOpMapVerifier(this.config, actual, name);
			case "URI":
				//noinspection JSCheckFunctionSignatures
				return new NoOpUriVerifier(this.config, actual, name);
			case "Object":
			default:
				return new NoOpObjectVerifier(this.config, actual, name);
		}
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
	 * @return {Verifiers} a verifier with the updated configuration
	 */
	withAssertionsEnabled()
	{
		const newConfig = this.config.withAssertionsEnabled();
		if (newConfig === this.config)
			return this;
		return new Verifiers(newConfig);
	}

	/**
	 * Indicates that <code>assertThat()</code> shouldn't do anything.
	 *
	 * @return {Verifiers} a verifier with the updated configuration
	 */
	withAssertionsDisabled()
	{
		const newConfig = this.config.withAssertionsDisabled();
		if (newConfig === this.config)
			return this;
		return new Verifiers(newConfig);
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
	 * @return {Verifiers} a verifier with the updated configuration
	 * @throws {TypeError} if <code>exception</code> is not set
	 * @see #getException()
	 */
	withException(exception)
	{
		const newConfig = this.config.withException(exception);
		if (newConfig === this.config)
			return this;
		return new Verifiers(newConfig);
	}

	/**
	 * Throws the default exception type if a verification fails.
	 *
	 * @return {Verifiers} a verifier with the updated configuration
	 * @see #getException()
	 */
	withDefaultException()
	{
		const newConfig = this.config.withDefaultException();
		if (newConfig === this.config)
			return this;
		return new Verifiers(newConfig);
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
	 * @return {Verifiers} a verifier with the updated configuration
	 * @throws {TypeError} if <code>key</code> is not a String
	 * @see #getContext()
	 */
	addContext(key, value)
	{
		return new Verifiers(this.config.addContext(key, value));
	}
}

export default Verifiers;