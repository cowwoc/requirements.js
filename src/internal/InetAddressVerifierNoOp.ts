import {
	InetAddressVerifier,
	ObjectVerifierNoOp
} from "./internal";

/**
 * An implementation of <code>InetAddressVerifier</code> that does nothing.
 */
class InetAddressVerifierNoOp extends ObjectVerifierNoOp
	implements InetAddressVerifier
{
	static readonly INSTANCE = new InetAddressVerifierNoOp();

	/**
	 * @return {InetAddressVerifier} the updated verifier
	 */
	isIpV4(): InetAddressVerifier
	{
		return this;
	}

	/**
	 * @return {InetAddressVerifier} the updated verifier
	 */
	isIpV6(): InetAddressVerifier
	{
		return this;
	}

	/**
	 * @return {InetAddressVerifier} the updated verifier
	 */
	isHostname(): InetAddressVerifier
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {InetAddressVerifierNoOp as default};