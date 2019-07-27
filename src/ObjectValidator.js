import ArrayValidatorNoOp from "./internal/circular_dependency/ArrayValidatorNoOpBase.js";
import ObjectValidator from "./internal/circular_dependency/ObjectValidatorBase.js";
import ObjectValidatorNoOp from "./internal/circular_dependency/ObjectValidatorNoOp.js";
import ArrayValidator from "./ArrayValidator.js";
import InetAddressValidator from "./InetAddressValidator.js";
import MapValidator from "./MapValidator.js";
import NumberValidator from "./NumberValidator.js";
import SetValidator from "./SetValidator.js";
import StringValidator from "./StringValidator.js";
import URI from "urijs";
import UriValidator from "./UriValidator.js";
import ClassValidator from "./ClassValidator.js";
import NumberValidatorNoOp from "./internal/NumberValidatorNoOp.js";
import SetValidatorNoOp from "./internal/SetValidatorNoOp.js";
import MapValidatorNoOp from "./internal/MapValidatorNoOp.js";
import InetAddressValidatorNoOp from "./internal/InetAddressValidatorNoOp.js";
import UriValidatorNoOp from "./internal/UriValidatorNoOp.js";
import ClassValidatorNoOp from "./internal/ClassValidatorNoOp.js";
import Objects from "./internal/Objects.js";
import Sugar from "sugar-object";
import ContextGenerator from "./internal/ContextGenerator.js";
import GlobalConfiguration from "./GlobalConfiguration.js";
import ValidationFailure from "./ValidationFailure.js";

/**
 * @param {ObjectValidator} objectValidator an instance of ObjectValidator
 * @param {object} expected the expected value
 * @return {Array<Array<string>>} the list of name-value pairs to append to the exception message
 * @ignore
 */
function getContext(objectValidator, expected)
{
	const contextGenerator = new ContextGenerator(objectValidator.config, GlobalConfiguration.diffGenerator);
	return contextGenerator.getContext("Actual", objectValidator.actual, "Expected", expected);
}

/**
 * Ensures that the actual value is equal to a value.
 *
 * @param {object} expected the expected value
 * @param {string} [name] the name of the expected value
 * @return {ObjectValidator} the updated validator
 * @throws {TypeError}  if <code>name</code> is null
 * @throws {RangeError} if <code>name</code> is empty; if the actual value is not equal to value
 */
ObjectValidator.prototype.isEqualTo = function(expected, name)
{
	if (typeof (name) !== "undefined")
		Objects.requireThatStringNotEmpty(name, "name");
	if (!Sugar.Object.isEqual(this.actual, expected))
	{
		const context = getContext(this, expected);
		let failure;
		if (name)
		{
			failure = new ValidationFailure(this.config, RangeError.prototype,
				this.name + " must be equal to " + name).
				addContextList(context);
		}
		else
		{
			failure = new ValidationFailure(this.config, RangeError.prototype,
				this.name + " had an unexpected value.").
				addContextList(context);
		}
		this.failures.push(failure);
	}
	return this;
};

/**
 * Ensures that the actual value is not equal to a value.
 *
 * @param {object} value the value to compare to
 * @param {string} [name] the name of the expected value
 * @return {ObjectValidator} the updated validator
 * @throws {TypeError}  if <code>name</code> is null
 * @throws {RangeError} if <code>name</code> is empty; if the actual value is equal to <code>value</code>
 */
ObjectValidator.prototype.isNotEqualTo = function(value, name)
{
	if (typeof (name) !== "undefined")
		Objects.requireThatStringNotEmpty(name, "name");
	if (Sugar.Object.isEqual(this.actual, value))
	{
		let failure;
		if (name)
		{
			failure = new ValidationFailure(this.config, RangeError.prototype,
				this.name + " may not be equal to " + name).
				addContext("Actual", this.actual);
		}
		else
		{
			failure = new ValidationFailure(this.config, RangeError.prototype,
				this.name + " may not be equal to " + this.config.convertToString(value));
		}
		this.failures.push(failure);
	}
	return this;
};

/**
 * Ensures that the actual value is a primitive. To check if the actual value is an object, use
 * <code>isInstanceOf(Object)</code>.
 *
 * @return {ObjectValidator|ObjectValidatorNoOp} the updated validator
 * @throws {RangeError} if the actual value is not a <code>string</code>, <code>number</code>,
 *   <code>bigint</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, or
 *   <code>symbol</code>)
 */
ObjectValidator.prototype.isPrimitive = function()
{
	if (this.actual === null)
	{
		const failure = new ValidationFailure(this.config, TypeError.prototype, this.name + " may not be null");
		this.failures.push(failure);
		return new ObjectValidatorNoOp(this.failures);
	}
	if (!Objects.isPrimitive(this.actual))
	{
		const failure = new ValidationFailure(this.config, RangeError.prototype,
			this.name + " must be a primitive").
			addContext("Actual", Objects.getTypeOf(this.actual));
		this.failures.push(failure);
	}
	return this;
};

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
 * @return {ObjectValidator} the updated validator
 * @throws {RangeError} if the actual value does not have the specified <code>type</code>
 */
ObjectValidator.prototype.isTypeOf = function(type)
{
	Objects.requireThatStringNotEmpty(type, "type");
	const typeOfActual = Objects.getTypeOf(this.actual);
	if (typeOfActual !== type)
	{
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
		const failure = new ValidationFailure(this.config, RangeError.prototype,
			this.name + " must be " + message).
			addContext("Actual", typeOfActual);
		this.failures.push(failure);
	}
	return this;
};

/**
 * Ensures that the actual value is an object that is an instance of the specified type.
 *
 * @param {object} type the type to compare to
 * @return {ObjectValidator} the updated validator
 * @throws {TypeError}  if <code>type</code> is undefined, null, anonymous function or an arrow function
 * @throws {RangeError} if the actual value is not an instance of <code>type</code>
 */
ObjectValidator.prototype.isInstanceOf = function(type)
{
	if (!(this.actual instanceof type))
	{
		const typeOfType = Objects.getTypeOf(type);
		let failure;
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
				failure = new ValidationFailure(this.config, TypeError.prototype, "type must be a class.").
					addContext("Actual", typeOfType);
				break;
			}
			default:
			{
				failure = new ValidationFailure(this.config, RangeError.prototype,
					this.name + " must be an instance of " + typeOfType).
					addContext("Actual", Objects.getTypeOf(this.actual));
				break;
			}
		}
		this.failures.push(failure);
	}
	return this;
};

/**
 * Ensures that the actual value is null.
 *
 * @return {ObjectValidator} the updated validator
 * @throws {RangeError} if the actual value is not null
 */
ObjectValidator.prototype.isNull = function()
{
	if (this.actual !== null)
	{
		const failure = new ValidationFailure(this.config, RangeError.prototype, this.name + " must be null.").
			addContext("Actual", this.actual);
		this.failures.push(failure);
	}
	return this;
};

/**
 * Ensures that the actual value is not null.
 *
 * @return {ObjectValidator} the updated validator
 * @throws {RangeError} if the actual value is null
 */
ObjectValidator.prototype.isNotNull = function()
{
	if (this.actual === null)
	{
		const failure = new ValidationFailure(this.config, RangeError.prototype, this.name + " may not be null");
		this.failures.push(failure);
	}
	return this;
};

/**
 * Ensures that the actual value is defined.
 *
 * @return {ObjectValidator} the updated validator
 * @throws {RangeError} if the actual value is undefined
 */
ObjectValidator.prototype.isDefined = function()
{
	if (typeof (this.actual) === "undefined")
	{
		const failure = new ValidationFailure(this.config, RangeError.prototype, this.name + " must be defined");
		this.failures.push(failure);
	}
	return this;
};

/**
 * Ensures that the actual value is undefined.
 *
 * @return {ObjectValidator} the updated validator
 * @throws {RangeError} if the actual value is not undefined
 */
ObjectValidator.prototype.isNotDefined = function()
{
	if (typeof (this.actual) !== "undefined")
	{
		const failure = new ValidationFailure(this.config, RangeError.prototype,
			this.name + " must be undefined.").
			addContext("Actual", this.actual);
		this.failures.push(failure);
	}
	return this;
};

/**
 * Ensures that value is not undefined or null.
 *
 * @return {ObjectValidator} the updated validator
 * @throws {TypeError} if the value is undefined or null
 */
ObjectValidator.prototype.isSet = function()
{
	if (typeof (this.actual) === "undefined" || this.actual === null)
	{
		const failure = new ValidationFailure(this.config, RangeError.prototype, this.name + " must be set.").
			addContext("Actual", this.actual);
		this.failures.push(failure);
	}
	return this;
};

/**
 * Ensures that value is not undefined or null.
 *
 * @return {ObjectValidator} the updated validator
 * @throws {TypeError} if the value is not undefined or null
 */
ObjectValidator.prototype.isNotSet = function()
{
	if (typeof (this.actual) !== "undefined" && this.actual !== null)
	{
		const failure = new ValidationFailure(this.config, RangeError.prototype, this.name + " may not be set.").
			addContext("Actual", this.actual);
		this.failures.push(failure);
	}
	return this;
};

/**
 * Returns the actual value. The return value is <code>undefined</code> if
 * {@link ObjectVerifier#assertThat(Object, String) assertThat()} was invoked and assertions are disabled
 * (in which case the value is discarded) is <code>false</code>.
 *
 * @return {object} the actual value
 */
ObjectValidator.prototype.getActual = function()
{
	return this.actual;
};

/**
 * @return {StringValidator} a validator for the object's string representation
 */
ObjectValidator.prototype.asString = function()
{
	let newName;
	if (typeof (this.actual) === "string")
		newName = this.name;
	else
		newName = this.name + ".asString()";
	return new StringValidator(this.config, this.config.convertToString(this.actual), newName);
};

/**
 * @param {Function} consumer a function that accepts a {@link StringValidator} for the string representation
 *   of the actual value
 * @return {ObjectValidator} the updated validator
 * @throws {TypeError} if <code>consumer</code> is not set
 */
ObjectValidator.prototype.asStringConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.asString());
	return this;
};

/**
 * @return {ArrayValidator|ArrayValidatorNoOp} a validator for the <code>Array</code>
 */
ObjectValidator.prototype.asArray = function()
{
	const typeOfActual = Objects.getTypeOf(this.actual);
	switch (typeOfActual)
	{
		case "Array":
			return new ArrayValidator(this.config, this.actual, this.name);
		default:
		{
			const failure = new ValidationFailure(this.config, TypeError.prototype,
				this.name + " must be an Array.").
				addContext("Actual", this.actual).
				addContext("Type", typeOfActual);
			this.failures.push(failure);
			return new ArrayValidatorNoOp(this.failures);
		}
	}
};

/**
 * @param {Function} consumer a function that accepts a {@link ArrayValidator} for the actual value
 * @return {ObjectValidator} the updated validator
 * @throws {TypeError} if <code>consumer</code> is not set
 */
ObjectValidator.prototype.asArrayConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.asArray());
	return this;
};

/**
 * @return {NumberValidator|NumberValidatorNoOp} a validator for the <code>Number</code>
 */
ObjectValidator.prototype.asNumber = function()
{
	const typeOfActual = Objects.getTypeOf(this.actual);
	switch (typeOfActual)
	{
		case "number":
			return new NumberValidator(this.config, this.actual, this.name);
		default:
		{
			const failure = new ValidationFailure(this.config, TypeError.prototype,
				this.name + " must be a Number.").
				addContext("Actual", this.actual).
				addContext("Type", typeOfActual);
			this.failures.push(failure);
			return new NumberValidatorNoOp(this.failures);
		}
	}
};

/**
 * @param {Function} consumer a function that accepts a {@link NumberValidator} for the actual value
 * @return {ObjectValidator} the updated validator
 * @throws {TypeError} if <code>consumer</code> is not set
 */
ObjectValidator.prototype.asNumberConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.asNumber());
	return this;
};

/**
 * @return {SetValidator|SetValidatorNoOp} a validator for the <code>Set</code>
 */
ObjectValidator.prototype.asSet = function()
{
	const typeOfActual = Objects.getTypeOf(this.actual);
	switch (typeOfActual)
	{
		case "Set":
			return new SetValidator(this.config, this.actual, this.name);
		default:
		{
			const failure = new ValidationFailure(this.config, TypeError.prototype, this.name + " must be a Set.").
				addContext("Actual", this.actual).
				addContext("Type", typeOfActual);
			this.failures.push(failure);
			return new SetValidatorNoOp(this.failures);
		}
	}
};

/**
 * @param {Function} consumer a function that accepts a {@link SetValidator} for the actual value
 * @return {ObjectValidator} the updated validator
 * @throws {TypeError} if <code>consumer</code> is not set
 */
ObjectValidator.prototype.asSetConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.asSet());
	return this;
};


/**
 * @return {MapValidator|MapValidatorNoOp} a validator for the <code>Map</code>
 */
ObjectValidator.prototype.asMap = function()
{
	const typeOfActual = Objects.getTypeOf(this.actual);
	switch (typeOfActual)
	{
		case "Map":
			return new MapValidator(this.config, this.actual, this.name);
		default:
		{
			const failure = new ValidationFailure(this.config, TypeError.prototype,
				this.name + " must be a Map.").
				addContext("Actual", this.actual).
				addContext("Type", typeOfActual);
			this.failures.push(failure);
			return new MapValidatorNoOp(this.failures);
		}
	}
};

/**
 * @param {Function} consumer a function that accepts a {@link MapValidator} for the actual value
 * @return {ObjectValidator} the updated validator
 * @throws {TypeError} if <code>consumer</code> is not set; if the actual value is not a <code>Map</code>
 */
ObjectValidator.prototype.asMapConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.asMap());
	return this;
};

/**
 * @param {string} value a String
 * @return {boolean} true if the String is a valid IPv4 address; false otherwise
 * @ignore
 */
function isIpV4Impl(value)
{
	// See https://blogs.msdn.microsoft.com/oldnewthing/20060522-08/?p=31113
	const match = value.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
	return match !== null && match[1] <= 255 && match[2] <= 255 && match[3] <= 255 && match[4] <= 255;
}

/**
 * @param {string} value a String
 * @return {boolean} true if the String is a valid IPv6 address; false otherwise
 * @ignore
 */
function isIpV6Impl(value)
{
	// See https://blogs.msdn.microsoft.com/oldnewthing/20060522-08/?p=31113 and
	// https://4sysops.com/archives/ipv6-tutorial-part-4-ipv6-address-syntax/
	const components = value.split(":");
	if (components.length < 2 || components.length > 8)
		return false;
	if (components[0] !== "" || components[1] !== "")
	{
		// Address does not begin with a zero compression ("::")
		if (!components[0].match(/^[\da-f]{1,4}/i))
		{
			// Component must contain 1-4 hex characters
			return false;
		}
	}

	let numberOfColons = 0;
	let numberOfZeroCompressions = 0;
	for (let i = 1; i < components.length; ++i)
	{
		++numberOfColons;
		const component = components[i];
		if (component === "")
			continue;
		if (numberOfColons === 2)
			++numberOfZeroCompressions;
		if (numberOfZeroCompressions > 1 || numberOfColons > 2)
		{
			// Zero compression can only occur once in an address
			return false;
		}
		numberOfColons = 0;
		if (!component.match(/^[\da-f]{1,4}/i))
		{
			// Component must contain 1-4 hex characters
			return false;
		}
	}
	if (numberOfColons === 2)
	{
		++numberOfZeroCompressions;
		numberOfColons = 0;
	}
	// Lines may not end with a colon. If they end with a zero compression, it must have been the first one.
	return numberOfColons === 0 && numberOfZeroCompressions <= 1;
}

/**
 * @param {string} value a String
 * @return {boolean} true if the String is a valid hostname; false otherwise
 * @ignore
 */
function isHostnameImpl(value)
{
	// See http://serverfault.com/a/638270/15584 and
	// https://blogs.msdn.microsoft.com/oldnewthing/20120412-00/?p=7873
	const components = value.split(".");

	// Top-level domain names may not be empty or all-numeric
	const topLevelDomain = components[components.length - 1];
	if (topLevelDomain.match(/^[a-zA-Z-]+$/) === null)
		return false;

	let sum = 0;
	for (let i = 0; i < components.length; ++i)
	{
		const label = components[i];
		// label may not be empty. It must consist of only the ASCII alphabetic and numeric characters, plus the
		// hyphen.
		if (label.match(/^[a-zA-Z0-9-]+$/) === null)
			return false;
		const length = label.length;
		if (length > 63)
			return false;
		if (label.startsWith("-") || label.endsWith("-"))
		{
			// If the hyphen is used, it is not permitted to appear at either the beginning or end of a label.
			return false;
		}
		// Each label is prefixed by a byte denoting its length
		sum += 1 + length;
	}
	// The last label is terminated by a byte denoting a length of zero
	++sum;
	return sum <= 255;
}

/**
 * @return {InetAddressValidator|InetAddressValidatorNoOp} a validator for the value's Internet address
 *   representation
 */
ObjectValidator.prototype.asInetAddress = function()
{
	const typeOfActual = Objects.getTypeOf(this.actual);
	switch (typeOfActual)
	{
		case "undefined":
		case "null":
			break;
		default:
		{
			if (isIpV4Impl(this.actual))
				return new InetAddressValidator(this.config, this.actual, this.name, true, false, false);
			if (isIpV6Impl(this.actual))
				return new InetAddressValidator(this.config, this.actual, this.name, false, true, false);
			if (isHostnameImpl(this.actual))
				return new InetAddressValidator(this.config, this.actual, this.name, false, false, true);
			break;
		}
	}
	const failure = new ValidationFailure(this.config, RangeError.prototype,
		this.name + " must contain a valid IP address or hostname.").
		addContext("Actual", this.actual).
		addContext("Type", typeOfActual);
	this.failures.push(failure);
	return new InetAddressValidatorNoOp(this.failures);
};

/**
 * @param {Function} consumer a function that accepts an {@link InetAddressValidator} for the value's Internet
 *   address representation
 * @return {StringValidator} the updated validator
 * @throws {TypeError} if <code>consumer</code> is not set
 * @throws {RangeError} if the actual value does not contain a valid Internet address format
 */
ObjectValidator.prototype.asInetAddressConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.asInetAddress());
	return this;
};

/**
 * @return {UriValidator|UriValidatorNoOp} a validator for the <code>URI</code>
 */
ObjectValidator.prototype.asUri = function()
{
	const typeOfActual = Objects.getTypeOf(this.actual);
	switch (typeOfActual)
	{
		case "undefined":
		case "null":
			break;
		default:
		{
			const actualAsUri = new URI(this.actual);
			if (actualAsUri.is("url") || actualAsUri.is("urn"))
				return new UriValidator(this.config, actualAsUri, this.name);
		}
	}
	const failure = new ValidationFailure(this.config, TypeError.prototype,
		this.name + " must contain a valid URI.").
		addContext("Actual", this.actual).
		addContext("Type", typeOfActual);
	this.failures.push(failure);
	return new UriValidatorNoOp(this.failures);
};

/**
 * @param {Function} consumer a function that accepts a {@link UriValidator} for the URI representation of the
 *   actual value
 * @return {ObjectValidator} the updated validator
 * @throws {TypeError} if <code>consumer</code> is not set
 */
ObjectValidator.prototype.asUriConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.asUri());
	return this;
};

/**
 * @return {ClassValidator|ClassValidatorNoOp} a validator for the object's class representation
 */
ObjectValidator.prototype.asClass = function()
{
	const typeOfActual = Objects.getTypeOf(this.actual);
	switch (typeOfActual)
	{
		case "undefined":
		case "null":
			break;
		default:
		{
			const actualAsUri = new URI(this.actual);
			if (actualAsUri.is("url") || actualAsUri.is("urn"))
				return new ClassValidator(this.config, actualAsUri, this.name);
			break;
		}
	}
	const failure = new ValidationFailure(this.config, TypeError.prototype,
		this.name + " must contain a class.").
		addContext("Actual", this.actual).
		addContext("Type", typeOfActual);
	this.failures.push(failure);
	return new ClassValidatorNoOp(this.failures);
};

/**
 * @param {Function} consumer a function that accepts a {@link ClassValidator} for the class representation of
 *   the actual value
 * @return {ObjectValidator} the updated validator
 * @throws {TypeError} if <code>consumer</code> is not set
 */
ObjectValidator.prototype.asClassConsumer = function(consumer)
{
	Objects.requireThatIsSet(consumer, "consumer");
	consumer(this.asClass());
	return this;
};

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ObjectValidator as default};