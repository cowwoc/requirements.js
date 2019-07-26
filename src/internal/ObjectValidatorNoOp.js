import ArrayValidatorNoOp from "./circular_dependency/ArrayValidatorNoOpBase.js";
import ObjectValidatorNoOp from "./circular_dependency/ObjectValidatorNoOp.js";
import InetAddressValidatorNoOp from "./InetAddressValidatorNoOp.js";
import MapValidatorNoOp from "./MapValidatorNoOp.js";
import NumberValidatorNoOp from "./NumberValidatorNoOp.js";
import SetValidatorNoOp from "./SetValidatorNoOp.js";
import StringValidatorNoOp from "./StringValidatorNoOp.js";
import UriValidatorNoOp from "./UriValidatorNoOp.js";
import ClassValidatorNoOp from "./ClassValidatorNoOp.js";

/**
 * @return {ArrayValidatorNoOp} a validator for the <code>Array</code>
 */
ObjectValidatorNoOp.prototype.asArray = function()
{
	return new ArrayValidatorNoOp(this.failures);
};

/**
 * @return {ObjectValidatorNoOp} the updated validator
 */
ObjectValidatorNoOp.prototype.asArrayConsumer = function()
{
	return this;
};

/**
 * @return {StringValidatorNoOp} a validator for the object's string representation
 */
ObjectValidatorNoOp.prototype.asString = function()
{
	return new StringValidatorNoOp(this.failures);
};

/**
 * @return {ObjectValidatorNoOp} the updated validator
 */
ObjectValidatorNoOp.prototype.asStringConsumer = function()
{
	return this;
};

/**
 * @return {NumberValidatorNoOp} a validator for the <code>Number</code>
 */
ObjectValidatorNoOp.prototype.asNumber = function()
{
	return new NumberValidatorNoOp(this.failures);
};

/**
 * @return {ObjectValidatorNoOp} the updated validator
 */
ObjectValidatorNoOp.prototype.asNumberConsumer = function()
{
	return this;
};

/**
 * @return {SetValidatorNoOp} a validator for the <code>Set</code>
 */
ObjectValidatorNoOp.prototype.asSet = function()
{
	return new SetValidatorNoOp(this.failures);
};

/**
 * @return {ObjectValidatorNoOp} a validator for the <code>Set</code>
 */
ObjectValidatorNoOp.prototype.asSetConsumer = function()
{
	return this;
};

/**
 * @return {MapValidatorNoOp} a validator for the <code>Map</code>
 */
ObjectValidatorNoOp.prototype.asMap = function()
{
	return new MapValidatorNoOp(this.failures);
};

/**
 * @return {ObjectValidatorNoOp} a validator for the <code>Map</code>
 */
ObjectValidatorNoOp.prototype.asMapConsumer = function()
{
	return this;
};

/**
 * @return {InetAddressValidatorNoOp} a validator for the value's Internet address representation
 */
ObjectValidatorNoOp.prototype.asInetAddress = function()
{
	return new InetAddressValidatorNoOp(this.failures);
};

/**
 * @return {ObjectValidatorNoOp} the updated validator
 */
ObjectValidatorNoOp.prototype.asInetAddressConsumer = function()
{
	return this;
};


/**
 * @return {UriValidatorNoOp} a validator for the <code>URI</code>
 */
ObjectValidatorNoOp.prototype.asUri = function()
{
	return new UriValidatorNoOp(this.failures);
};

/**
 * @return {ObjectValidatorNoOp} the updated validator
 */
ObjectValidatorNoOp.prototype.asUriConsumer = function()
{
	return this;
};

/**
 * @return {ClassValidatorNoOp} a validator for the object's class representation
 */
ObjectValidatorNoOp.prototype.asClass = function()
{
	return new ClassValidatorNoOp(this.failures);
};

/**
 * @return {ObjectValidatorNoOp} the updated validator
 * @throws {TypeError} if <code>consumer</code> is not set
 */
ObjectValidatorNoOp.prototype.asClassConsumer = function()
{
	return this;
};


// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {ObjectValidatorNoOp as default};