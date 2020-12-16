import {
	InetAddressAsserter,
	ObjectAsserterNoOp
} from "./internal";

/**
 * An implementation of <code>InetAddressAsserter</code> that does nothing.
 */
class InetAddressAsserterNoOp extends ObjectAsserterNoOp
	implements InetAddressAsserter
{
	static readonly INSTANCE = new InetAddressAsserterNoOp();

	/**
	 * @return {InetAddressAsserter} the updated asserter
	 */
	isIpV4(): InetAddressAsserter
	{
		return this;
	}

	/**
	 * @return {InetAddressAsserter} the updated asserter
	 */
	isIpV6(): InetAddressAsserter
	{
		return this;
	}

	/**
	 * @return {InetAddressAsserter} the updated asserter
	 */
	isHostname(): InetAddressAsserter
	{
		return this;
	}
}

// "export default X" exports by value, whereas "export X as default" exports by reference.
// See http://stackoverflow.com/a/39277065/14731 and https://github.com/rollup/rollup/issues/1378 for an
// explanation.
export {InetAddressAsserterNoOp as default};