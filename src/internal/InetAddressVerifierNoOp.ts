import {ObjectVerifierNoOp} from "./internal";

/**
 * An implementation of <code>InetAddressVerifier</code> that does nothing.
 */
class InetAddressVerifierNoOp extends ObjectVerifierNoOp
{
	static readonly INSTANCE = new InetAddressVerifierNoOp();

	/**
	 * @return {InetAddressVerifierNoOp} the updated verifier
	 */
	isIpV4(): this
	{
		return this;
	}

	/**
	 * @return {InetAddressVerifierNoOp} the updated verifier
	 */
	isIpV6(): this
	{
		return this;
	}

	/**
	 * @return {InetAddressVerifierNoOp} the updated verifier
	 */
	isHostname(): this
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {InetAddressVerifierNoOp as default};