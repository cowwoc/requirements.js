/** @module */
import Configuration from "./Configuration.js";
import Objects from "./internal/Objects.js";
import ObjectVerifier from "./ObjectVerifier.js";
import ObjectValidator from "./ObjectValidator.js";
import ObjectVerifierNoOp from "./internal/ObjectVerifierNoOp.js";
import ObjectValidatorNoOp from "./internal/ObjectValidatorNoOp.js";
import ArrayVerifier from "./ArrayVerifier.js";
import ArrayValidator from "./ArrayValidator.js";
import ArrayVerifierNoOp from "./internal/ArrayVerifierNoOp.js";
import ArrayValidatorNoOp from "./internal/ArrayValidatorNoOp.js";
import MainGlobalConfiguration from "./internal/MainGlobalConfiguration.js";

// Add methods that were stripped to avoid circular dependencies

/* eslint-disable no-unused-vars */
const initObjectValidatorNoOp = ObjectValidatorNoOp;
const initObjectValidator = ObjectValidator;
const initArrayVerifier = ArrayVerifier;
const initArrayValidator = ArrayValidator;
const initArrayVerifierNoOp = ArrayVerifierNoOp;
const initArrayValidatorNoOp = ArrayValidatorNoOp;

/* eslint-enable no-unused-vars */

/**
 * Verifies the requirements of types from the Javascript core API.
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
			configuration = new Configuration(MainGlobalConfiguration.INSTANCE);
		Object.defineProperty(this, "config",
			{
				value: configuration
			});
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
	requireThat(actual, name)
	{
		return new ObjectVerifier(this.validateThat(actual, name));
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
	 * @return {ObjectVerifier|ObjectVerifierNoOp} a verifier
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	assertThat(actual, name)
	{
		Objects.verifyName(name, "name");
		if (this.config.assertionsAreEnabled())
			return this.requireThat(actual, name);
		return ObjectVerifierNoOp.INSTANCE;
	}

	/**
	 * Validates the requirements of an object.
	 *
	 * @function
	 * @param {object} actual the actual value
	 * @param {string} name   the name of the value
	 * @return {ObjectValidator} a validator for the value
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	validateThat(actual, name)
	{
		Objects.verifyName(name, "name");
		return new ObjectValidator(this.config, actual, name);
	}

	/**
	 * Indicates whether <code>assertThat()</code> should invoke <code>requireThat()</code>.
	 *
	 * @return {boolean} true if <code>assertThat()</code> should delegate to <code>requireThat()</code>; false
	 *   if it shouldn't do anything
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
	 * Indicates if exceptions should show the difference between the actual and expected values.
	 *
	 * @return {boolean} true by default
	 */
	isDiffEnabled()
	{
		return this.config.isDiffEnabled();
	}

	/**
	 * Indicates that exceptions should show the difference between the actual and expected values.
	 *
	 * @return {Requirements} a verifier with the updated configuration
	 */
	withDiff()
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
	withoutDiff()
	{
		const newConfig = this.config.withoutDiff();
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
	 * @return {Requirements} the updated configuration
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