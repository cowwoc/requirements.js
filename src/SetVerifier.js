import Utilities from "./Utilities";
import ObjectVerifier from "./ObjectVerifier";
import ContainerSizeVerifier from "./ContainerSizeVerifier";

/**
 * Creates a new SetVerifier.
 *
 * @constructor
 * @param {Set} actual the actual value
 * @param {String} name   the name of the value
 * @param {Configuration} config the instance configuration
 * @throws {TypeError} if {@code name} or {@code config} are null or undefined; if {@code actual} is not a {@code Set}
 * @throws {RangeError} if {@code name} is empty
 * @author Gili Tzabari
 */
function SetVerifier(actual, name, config)
{
	Utilities.verifyValue(actual, "actual", Set);
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
			value: config
		});
	Object.defineProperty(this, "asObject",
		{
			value: new ObjectVerifier(this.actual, this.name, config)
		});
}

/**
 * @return {ContainerSizeVerifier} a verifier for the size of the Set
 */
SetVerifier.prototype.size = function()
{
	return new ContainerSizeVerifier(this.actual, this.actual.size, this.name, this.name + ".size", Pluralizer.ELEMENT,
		this.config);
};

/**
 * Overrides the type of exception that will get thrown if a requirement fails.
 * <p>
 * The exception class must define the following constructors:
 * <p>
 * {@code <init>(String message)}
 *
 * @param {Error} exception the type of exception to throw, {@code null} to throw the default exception
 *                  type
 * @return {SetVerifier} a configuration with the specified exception override
 * @see #getException()
 */
SetVerifier.prototype.withException = function(exception)
{
	const newConfig = this.config.withException(exception);
	if (newConfig === this.config)
		return this;
	return new SetVerifier(this.actual, this.name, newConfig);
};
SetVerifier.prototype = Object.create(SetVerifier.prototype);
SetVerifier.prototype.constructor = SetVerifier;

export default SetVerifier;