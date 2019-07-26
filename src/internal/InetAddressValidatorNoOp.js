import ObjectValidatorNoOp from "./circular_dependency/ObjectValidatorNoOp";

/**
 * An implementation of <code>InetAddressValidator</code> that does nothing.
 */
class InetAddressValidatorNoOp extends ObjectValidatorNoOp
{
	/**
	 * @return {InetAddressValidatorNoOp} the updated validator
	 */
	isIpV4()
	{
		return this;
	}

	/**
	 * @return {InetAddressValidatorNoOp} the updated validator
	 */
	isIpV6()
	{
		return this;
	}

	/**
	 * @return {InetAddressValidatorNoOp} the updated validator
	 */
	isHostname()
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {InetAddressValidatorNoOp as default};