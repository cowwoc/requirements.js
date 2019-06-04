import Configuration from "../Configuration.js";
import Objects from "./Objects.js";
import Sugar from "sugar";
import ExceptionBuilder from "./ExceptionBuilder.js";
import ContextGenerator from "./ContextGenerator.js";
import GlobalRequirements from "../GlobalRequirements.js";

// Avoid circular dependencies by doing the following:
// * Declare the class without methods that trigger circular dependencies
// * Load the dependencies
// * Add the missing methods

/**
 * @param {ObjectVerifier} objectVerifier an instance of ObjectVerifier
 * @param {object} expected the expected value
 * @return {Array<Array<string>>} the list of name-value pairs to append to the exception message
 */
function getContext(objectVerifier, expected)
{
	const contextGenerator = new ContextGenerator(objectVerifier.config, GlobalRequirements.diffGenerator);
	return contextGenerator.getContext("Actual", objectVerifier.actual, "Expected", expected);
}

/**
 * Verifies an object.
 */
class ObjectVerifier
{
	/**
	 * Creates a new ObjectVerifier.
	 *
	 * @param {Configuration} configuration the instance configuration
	 * @param {object} actual the actual value
	 * @param {string} name   the name of the value
	 * @throws {TypeError}  if <code>name</code> or <code>config</code> are null or undefined
	 * @throws {RangeError} if <code>name</code> is empty
	 */
	constructor(configuration, actual, name)
	{
		Objects.assertThatTypeOf(configuration, "configuration", "Configuration");
		Objects.verifyName(name, "name");
		Object.defineProperty(this, "actual",
			{
				value: actual
			});
		Object.defineProperty(this, "name",
			{
				value: name
			});
		Object.defineProperty(this, "config",
			{
				value: configuration
			});
	}


	/**
	 * Ensures that the actual value is equal to a value.
	 *
	 * @param {object} expected the expected value
	 * @param {string} [name] the name of the expected value
	 * @return {ObjectVerifier} this
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value is not equal to value
	 */
	isEqualTo(expected, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		if (Sugar.Object.isEqual(this.actual, expected))
			return this;
		const context = getContext(this, expected);
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must be equal to " + name).
				addContextList(context).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " had an unexpected value.").
			addContextList(context).
			build();
	}

	/**
	 * Ensures that the actual value is not equal to a value.
	 *
	 * @param {object} value the value to compare to
	 * @param {string} [name] the name of the expected value
	 * @return {ObjectVerifier} this
	 * @throws {TypeError}  if <code>name</code> is null
	 * @throws {RangeError} if <code>name</code> is empty; if the actual value is equal to <code>value</code>
	 */
	isNotEqualTo(value, name)
	{
		if (typeof (name) !== "undefined")
			Objects.requireThatStringNotEmpty(name, "name");
		if (!Sugar.Object.isEqual(this.actual, value))
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " may not be equal to " + name).
				addContext("Actual", this.actual).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not be equal to " +
			this.config.convertToString(value)).build();
	}

	/**
	 * Ensures that the actual value is a primitive. To check if the actual value is an object, use
	 * <code>isInstanceOf(Object)</code>.
	 *
	 * @return {ObjectVerifier} this
	 * @throws {RangeError} if the actual value is not a <code>string</code>, <code>number</code>,
	 * <code>bigint</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, or <code>symbol</code>)
	 */
	isPrimitive()
	{
		if (Objects.isPrimitive(this.actual))
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be a primitive").
			addContext("Actual", Objects.getTypeOf(this.actual)).
			build();
	}

	/**
	 * Ensures that the type of the actual value has the specified name.
	 *
	 * If the actual value is undefined, the name is "undefined".
	 * If the actual value is null, the name is "null".
	 * If the actual value is a primitive boolean, the name is "boolean".
	 * If the actual value is a boolean object, the name is "Boolean".
	 * If the actual value is a primitive number, the name is "number".
	 * If the actual value is a number object, the name is "Number".
	 * If the actual value is a primitive bigint, the name is "bigint".
	 * If the actual value is a bigint object, the name is "BigInt".
	 * If the actual value is a primitive string, the name is "string".
	 * If the actual value is a string object, the name is "String".
	 * If the actual value is a primitive symbol, the name is "symbol".
	 * If the actual value is a symbol object, the name is "Symbol".
	 * If the actual value is an array, the name is "Array".
	 * If the actual value is a named function or a class constructor, the name is "Function".
	 * If the actual value is an anonymous function, the name is "AnonymousFunction".
	 * If the actual value is an arrow function, the name is "ArrowFunction".
	 * If the actual value is a class instance, the name is the class name.
	 *
	 * @param {string} type the name of the type to compare to
	 * @return {ObjectVerifier} this
	 * @throws {RangeError} if the actual value does not have the specified <code>type</code>
	 */
	isTypeOf(type)
	{
		Objects.requireThatStringNotEmpty(type, "type");
		const typeOfActual = Objects.getTypeOf(this.actual);
		if (typeOfActual === type)
			return this;
		let message;
		switch (type)
		{
			case "undefined":
			case "null":
			{
				message = type + ".";
				break;
			}
			case "AnonymousFunction":
			{
				message = "an anonymous function.";
				break;
			}
			case "ArrowFunction":
			{
				message = "an arrow function.";
				break;
			}
			case "Array":
			{
				message = "an Array.";
				break;
			}
			default:
			{
				message = "a " + type + ".";
				break;
			}
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be " + message).
			addContext("Actual", typeOfActual).
			build();
	}

	/**
	 * Ensures that the actual value is an object that is an instance of the specified type.
	 *
	 * @param {object} type the type to compare to
	 * @return {ObjectVerifier} this
	 * @throws {TypeError}  if <code>type</code> is undefined, null, anonymous function or an arrow function
	 * @throws {RangeError} if the actual value is not an instance of <code>type</code>
	 */
	isInstanceOf(type)
	{
		if (this.actual instanceof type)
			return this;
		const typeOfType = Objects.getTypeOf(type);
		switch (typeOfType)
		{
			case "undefined":
			case "null":
			case "AnonymousFunction":
			case "ArrowFunction":
			case "boolean":
			case "number":
			case "bigint":
			case "string":
			case "Array":
			{
				throw new ExceptionBuilder(this.config, TypeError, "type must be a class.").
					addContext("Actual", typeOfType).
					build();
			}
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be an instance of " + typeOfType).
			addContext("Actual", Objects.getTypeOf(this.actual)).
			build();
	}

	/**
	 * Ensures that the actual value is null.
	 *
	 * @return {ObjectVerifier} this
	 * @throws {RangeError} if the actual value is not null
	 */
	isNull()
	{
		if (this.actual === null)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be null.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is not null.
	 *
	 * @return {ObjectVerifier} this
	 * @throws {RangeError} if the actual value is null
	 */
	isNotNull()
	{
		if (this.actual !== null)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not be null").
			build();
	}

	/**
	 * Ensures that the actual value is defined.
	 *
	 * @return {ObjectVerifier} this
	 * @throws {RangeError} if the actual value is undefined
	 */
	isDefined()
	{
		if (typeof (this.actual) !== "undefined")
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be defined").
			build();
	}

	/**
	 * Ensures that the actual value is undefined.
	 *
	 * @return {ObjectVerifier} this
	 * @throws {RangeError} if the actual value is not undefined
	 */
	isNotDefined()
	{
		if (typeof (this.actual) === "undefined")
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be undefined.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that value is not undefined or null.
	 *
	 * @return {ObjectVerifier} this
	 * @throws {TypeError} if the value is undefined or null
	 */
	isSet()
	{
		if (typeof (this.actual) !== "undefined" && this.actual !== null)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be set.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that value is not undefined or null.
	 *
	 * @return {ObjectVerifier} this
	 * @throws {TypeError} if the value is not undefined or null
	 */
	isNotSet()
	{
		if (typeof (this.actual) === "undefined" || this.actual === null)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not be set.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * @return {object} the actual value
	 * @throws RangeError if the verifier does not have access to the actual value (e.g. if
	 * {@link Verifiers#assertThat() assertThat()} is used when assertions are disabled, the verifier does not need to
	 * retain a reference to the actual value)
	 * @see #getActualIfPresent()
	 */
	getActual()
	{
		return this.actual;
	}

	/**
	 * Returns the actual value.
	 *
	 * @return {object} <code>undefined</code> if the verifier does not have access to the actual value
	 * @see #getActualLines()
	 */
	getActualIfPresent()
	{
		return this.actual;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an explanation.
export {ObjectVerifier as default};