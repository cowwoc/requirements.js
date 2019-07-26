import ObjectVerifierNoOp from "./circular_dependency/ObjectVerifierNoOpBase";

/**
 * An implementation of <code>InetAddressVerifier</code> that does nothing.
 */
class InetAddressVerifierNoOp extends ObjectVerifierNoOp
{
	/**
	 * @return {InetAddressVerifierNoOp} the updated verifier
	 */
	isIpV4()
	{
		return this;
	}

	/**
	 * @return {InetAddressVerifierNoOp} the updated verifier
	 */
	isIpV6()
	{
		return this;
	}

	/**
	 * @return {InetAddressVerifierNoOp} the updated verifier
	 */
	isHostname()
	{
		return this;
	}
}

InetAddressVerifierNoOp.INSTANCE = new InetAddressVerifierNoOp();

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {InetAddressVerifierNoOp as default};