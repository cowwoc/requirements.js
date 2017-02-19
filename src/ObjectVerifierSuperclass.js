import ExceptionBuilder from "./ExceptionBuilder";
import Sugar from "sugar";
import Utilities from "./Utilities";

// DESIGN: See ObjectVerifier.js

/**
 * Verifies an object.
 *
 * @class
 * @author Gili Tzabari
 */
class ObjectVerifier {
	/**
	 * Creates a new ObjectVerifier.
	 *
	 * @constructor
	 * @param {Configuration} configuration the instance configuration
	 * @param {Object} actual the actual value
	 * @param {String} name   the name of the value
	 * @throws {TypeError} if {@code name} or {@code config} are null or undefined
	 * @throws {RangeError} if {@code name} is empty
	 */
	constructor(configuration, actual, name)
	{
		if (typeof(configuration) === "undefined" || configuration === null)
		{
			throw new TypeError("configuration must be set.\n" +
				"Actual: " + Utilities.getTypeOf(configuration));
		}
		Utilities.verifyName(name, "name");
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
	 * @param {Object} expected the expected value
	 * @param {String} [name] the name of the expected value
	 * @return {ObjectVerifier} this
	 * @throws {TypeError} if {@code name} is null
	 * @throws {RangeError} if {@code name} is empty; if the actual value is not equal to value
	 */
	isEqualTo(expected, name)
	{
		// TODO: Add colored diff support using https://code.google.com/p/google-diff-match-patch/,
		// https://github.com/marak/colors.js/ and https://github.com/adamschwartz/log/
		if (typeof(name) !== "undefined")
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
		if (Sugar.Object.isEqual(this.actual, expected))
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " must be equal to " + name).
				addContext("Actual", this.actual).
				addContext("Expected", expected).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " had an unexpected value.").
			addContext("Actual", this.actual).
			addContext("Expected", expected).
			build();
	}

	/**
	 * Ensures that the actual value is not equal to a value.
	 *
	 * @param {Array} value the value to compare to
	 * @param {String} [name] the name of the expected value
	 * @return {ObjectVerifier} this
	 * @throws {TypeError} if {@code name} is null
	 * @throws {RangeError} if {@code name} is empty; if the actual value is equal to {@code value}
	 */
	isNotEqualTo(value, name)
	{
		if (typeof(name) !== "undefined")
			this.config.internalVerifier.requireThat(name, "name").isNotNull().isInstanceOf(String).trim().isNotEmpty();
		if (!Sugar.Object.isEqual(this.actual, value))
			return this;
		if (name)
		{
			throw new ExceptionBuilder(this.config, RangeError, this.name + " may not be equal to " + name).
				addContext("Actual", this.actual).
				build();
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not be equal to " +
			Utilities.toString(value)).build();
	}

	/**
	 * Ensures that an array contains the actual value.
	 *
	 * @param {Array.<Array>} array an array
	 * @return {ObjectVerifier} this
	 * @throws {TypeError}  if {@code array} is not an {@code Array}
	 * @throws {RangeError} if {@code array} does not contain the actual value
	 */
	isInArray(array)
	{
		this.config.internalVerifier.requireThat(array, "array").isInstanceOf(Array);
		if (array.indexOf(this.actual) !== -1)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be one of " +
			Utilities.toString(array) + ".").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * Ensures that the actual value is an instance of a type.
	 *
	 * Primitive types are wrapped before evaluation. For example, "someValue" is treated as a String object.
	 *
	 * @param {Function} type the type to compare to
	 * @return {ObjectVerifier} this
	 * @throws {TypeError}  if {@code type} is undefined, null, anonymous function, arrow function or an object
	 * @throws {RangeError} if the actual value is not an instance of {@code type}
	 */
	isInstanceOf(type)
	{
		if (Utilities.instanceOf(this.actual, type))
			return this;
		let message;
		const typeName = Utilities.getTypeOf(type);
		switch (typeName)
		{
			case "Undefined":
			case "Null":
			{
				message = typeName.toLowerCase() + ".";
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
			case "Boolean":
			case "Number":
			case "String":
			{
				message = "a " + typeName + ".";
				break;
			}
			default:
			{
				message = "an instance of  " + typeName + ".";
				break;
			}
		}
		throw new ExceptionBuilder(this.config, RangeError, this.name + " must be " + message).
			addContext("Actual", Utilities.getTypeOf(this.actual)).
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
		if (typeof(this.actual) !== "undefined")
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
		if (typeof(this.actual) === "undefined")
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
		if (typeof(this.actual) !== "undefined" && this.actual !== null)
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
		if (typeof(this.actual) === "undefined" || this.actual === null)
			return this;
		throw new ExceptionBuilder(this.config, RangeError, this.name + " may not be set.").
			addContext("Actual", this.actual).
			build();
	}

	/**
	 * @param {Function} consumer a function that accepts a {@code StringVerifier} for the number's string representation
	 * @return {ObjectVerifier} this
	 * @throws {TypeError} if {@code consumer} is not set
	 */
	asStringConsumer(consumer)
	{
		this.config.internalVerifier.requireThat(consumer, "consumer").isSet();
		consumer(this.asString());
		return this;
	}

	/**
	 * @return {Object} the actual value
	 * @throws RangeError if if the verifier does not have access to the actual value (e.g. if {@link
		*   Verifiers#assertThat() assertThat()} is used when assertions are disabled, the verifier does not need to retain
	 *   a reference to the actual value)
	 * @see #getActualIfPresent()
	 */
	getActual()
	{
		return this.actual;
	}

	/**
	 * Returns the actual value.
	 *
	 * @return {Object} {@code undefined} if the verifier does not have access to the actual value
	 * @see #getActual()
	 */
	getActualIfPresent()
	{
		return this.actual;
	}
}

export default ObjectVerifier;